"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { sendCustomerConfirmation, sendOwnerNotification } from "@/lib/mail";
import { getServiceBySlug } from "@/lib/data/services";

const RESUBMIT_COOLDOWN_MS = 60_000;

export type SubmitInquiryInput = {
  inquiryType: "reservation" | "general";
  serviceSlug: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  // Hidden field: real visitors never fill this in. If it has a value,
  // the submission is almost certainly from a bot.
  website?: string;
};

export async function submitInquiry(input: SubmitInquiryInput) {
  if (input.website) {
    // Silently pretend success so bots don't learn their submission was rejected.
    return { success: true as const };
  }

  if (!input.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email) || !input.message.trim()) {
    return { success: false as const, message: "入力内容をご確認ください。" };
  }

  if (input.serviceSlug) {
    const service = getServiceBySlug(input.serviceSlug);
    if (!service) {
      return { success: false as const, message: "入力内容をご確認ください。" };
    }
    if (service.comingSoon) {
      return {
        success: false as const,
        message: "このメニューは現在準備中のため、お申し込みいただけません。",
      };
    }
  }

  const supabase = createAdminClient();

  const { data: recent } = await supabase
    .from("inquiries")
    .select("id")
    .eq("email", input.email)
    .gte("created_at", new Date(Date.now() - RESUBMIT_COOLDOWN_MS).toISOString())
    .limit(1);

  if (recent && recent.length > 0) {
    return {
      success: false as const,
      message: "直前に送信を受け付けています。しばらくしてから再度お試しください。",
    };
  }

  const { error } = await supabase.from("inquiries").insert({
    inquiry_type: input.inquiryType,
    service_slug: input.serviceSlug || null,
    name: input.name,
    email: input.email,
    phone: input.phone || null,
    message: input.message,
  });

  if (error) {
    return { success: false as const, message: "送信に失敗しました。時間をおいて再度お試しください。" };
  }

  try {
    await Promise.all([sendCustomerConfirmation(input), sendOwnerNotification(input)]);
  } catch (err) {
    // The inquiry is already saved; email delivery issues shouldn't block the user.
    console.error("Failed to send inquiry notification email:", err);
  }

  return { success: true as const };
}
