import { createHash } from "crypto";
import { headers } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";

const WINDOW_MINUTES = 15;
const MAX_FAILED_ATTEMPTS = 5;

export async function getClientIdentifier(): Promise<string> {
  const h = await headers();
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  return createHash("sha256").update(ip).digest("hex");
}

export async function isRateLimited(action: "login" | "setup"): Promise<boolean> {
  const identifier = await getClientIdentifier();
  const supabase = createAdminClient();
  const since = new Date(Date.now() - WINDOW_MINUTES * 60_000).toISOString();

  const { count } = await supabase
    .from("admin_auth_attempts")
    .select("id", { count: "exact", head: true })
    .eq("action", action)
    .eq("identifier", identifier)
    .eq("success", false)
    .gte("created_at", since);

  return (count ?? 0) >= MAX_FAILED_ATTEMPTS;
}

export async function recordAttempt(action: "login" | "setup", success: boolean) {
  const identifier = await getClientIdentifier();
  const supabase = createAdminClient();
  await supabase.from("admin_auth_attempts").insert({ action, identifier, success });
}
