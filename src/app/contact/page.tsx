import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/contact/ContactForm";
import { createAdminClient } from "@/lib/supabase/admin";

export const metadata: Metadata = {
  title: "お問い合わせ・予約 | 渡邊 将人 コンディショニング",
  description: "ご予約やサービス内容に関するご質問など、こちらのフォームからお気軽にお問い合わせください。",
};

export default async function ContactPage() {
  const supabase = createAdminClient();
  const today = new Date().toISOString().slice(0, 10);
  const { data } = await supabase
    .from("closed_dates")
    .select("date")
    .gte("date", today)
    .order("date", { ascending: true });

  const closedDates = (data ?? []).map((d) => d.date as string);

  return (
    <div className="py-16">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <div className="flex flex-col gap-6">
          <SectionHeading
            eyebrow="Contact"
            title="お問い合わせ・予約"
            description="ご予約やサービス内容に関するご質問など、お気軽にお問い合わせください。"
          />
          <ul className="flex flex-col gap-3 text-sm text-slate-600">
            <li className="flex items-center gap-2">
              <Mail size={18} className="text-teal-700" />
              watanabe0503at@gmail.com
            </li>
            <li className="flex items-start gap-2 text-xs text-slate-400">
              <span className="w-[18px] shrink-0" aria-hidden />
              ※ 上記からご返信いたします。届かない場合は迷惑メールフォルダもご確認ください。
            </li>
            <li className="flex items-center gap-2">
              <Phone size={18} className="text-teal-700" />
              070-1418-1812
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={18} className="text-teal-700" />
              対応エリア: 神奈川県・東京都
            </li>
          </ul>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10">
          <ContactForm closedDates={closedDates} />
        </div>
      </Container>
    </div>
  );
}
