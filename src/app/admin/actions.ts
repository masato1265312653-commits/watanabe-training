"use server";

import { cookies } from "next/headers";
import {
  ADMIN_SESSION_COOKIE,
  getSessionToken,
  hashPassword,
  safeCompare,
  verifyPassword,
} from "@/lib/admin-auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { isRateLimited, recordAttempt } from "@/lib/rate-limit";

const LOCKOUT_MESSAGE =
  "試行回数が多すぎます。しばらく時間をおいてから再度お試しください。";

async function setSessionCookie(passwordHash: string) {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, getSessionToken(passwordHash), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function setupAdmin(setupToken: string, username: string, password: string) {
  if (await isRateLimited("setup")) {
    return { success: false as const, message: LOCKOUT_MESSAGE };
  }

  const expectedToken = process.env.ADMIN_SETUP_TOKEN;
  if (!expectedToken || !safeCompare(setupToken, expectedToken)) {
    await recordAttempt("setup", false);
    return { success: false as const, message: "セットアップコードが正しくありません" };
  }

  if (!username.trim() || password.length < 8) {
    return {
      success: false as const,
      message: "ユーザー名を入力し、パスワードは8文字以上にしてください",
    };
  }

  const supabase = createAdminClient();
  const { data: existing } = await supabase
    .from("admin_credentials")
    .select("id")
    .eq("id", 1)
    .maybeSingle();

  if (existing) {
    return { success: false as const, message: "既に設定済みです" };
  }

  const password_hash = hashPassword(password);
  const { error } = await supabase
    .from("admin_credentials")
    .insert({ id: 1, username: username.trim(), password_hash });

  if (error) {
    return { success: false as const, message: "設定に失敗しました。時間をおいて再度お試しください。" };
  }

  await recordAttempt("setup", true);
  await setSessionCookie(password_hash);
  return { success: true as const };
}

export async function login(username: string, password: string) {
  if (await isRateLimited("login")) {
    return { success: false as const, message: LOCKOUT_MESSAGE };
  }

  const supabase = createAdminClient();
  const { data } = await supabase
    .from("admin_credentials")
    .select("username, password_hash")
    .eq("id", 1)
    .maybeSingle();

  const valid =
    !!data && data.username === username.trim() && verifyPassword(password, data.password_hash);

  await recordAttempt("login", valid);

  if (!valid) {
    return { success: false as const, message: "ユーザー名またはパスワードが正しくありません" };
  }

  await setSessionCookie(data.password_hash);
  return { success: true as const };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
}

export async function updateInquiryStatus(id: string, status: "new" | "contacted" | "done") {
  const supabase = createAdminClient();
  await supabase.from("inquiries").update({ status }).eq("id", id);
}
