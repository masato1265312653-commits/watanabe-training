import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LoginForm } from "@/components/admin/LoginForm";
import { SetupForm } from "@/components/admin/SetupForm";
import { InquiriesTable, type Inquiry } from "@/components/admin/InquiriesTable";
import { ADMIN_SESSION_COOKIE, isValidSession } from "@/lib/admin-auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { logout } from "./actions";

export const metadata: Metadata = {
  title: "管理画面 | 渡邊 将人 コンディショニング",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const supabase = createAdminClient();
  const { data: credentials } = await supabase
    .from("admin_credentials")
    .select("username, password_hash")
    .eq("id", 1)
    .maybeSingle();

  if (!credentials) {
    return (
      <div className="py-24">
        <Container>
          <SectionHeading title="管理画面の初期設定" align="center" />
          <div className="mt-8">
            <SetupForm />
          </div>
        </Container>
      </div>
    );
  }

  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  const authenticated = isValidSession(session, credentials.password_hash);

  if (!authenticated) {
    return (
      <div className="py-24">
        <Container>
          <SectionHeading title="管理画面ログイン" align="center" />
          <div className="mt-8">
            <LoginForm />
          </div>
        </Container>
      </div>
    );
  }

  const { data } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  const inquiries = (data as Inquiry[]) ?? [];
  const reservations = inquiries
    .filter((i) => i.inquiry_type === "reservation")
    .sort((a, b) => {
      if (!a.preferred_date) return 1;
      if (!b.preferred_date) return -1;
      return a.preferred_date.localeCompare(b.preferred_date);
    });
  const general = inquiries.filter((i) => i.inquiry_type === "general");

  return (
    <div className="py-16">
      <Container className="flex flex-col gap-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <SectionHeading eyebrow="Admin" title="お問い合わせ・予約一覧" />
          <form action={logout}>
            <button
              type="submit"
              className="text-sm font-medium text-slate-500 hover:text-teal-700"
            >
              ログアウト
            </button>
          </form>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              ご予約
              <span className="ml-2 text-sm font-normal text-slate-400">
                {reservations.length}件
              </span>
            </h2>
            <p className="mt-1 text-xs text-slate-400">実施希望日が近い順に表示しています</p>
          </div>
          <InquiriesTable inquiries={reservations} />
        </div>

        <div className="flex flex-col gap-6 border-t border-slate-100 pt-12">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              ご相談・その他のお問い合わせ
              <span className="ml-2 text-sm font-normal text-slate-400">
                {general.length}件
              </span>
            </h2>
            <p className="mt-1 text-xs text-slate-400">受付日時が新しい順に表示しています</p>
          </div>
          <InquiriesTable inquiries={general} />
        </div>
      </Container>
    </div>
  );
}
