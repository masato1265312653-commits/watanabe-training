import type { Metadata } from "next";
import { MapPin, Car } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBanner } from "@/components/layout/CtaBanner";

export const metadata: Metadata = {
  title: "アクセス | 渡邊 将人 コンディショニング",
  description: "対応エリアやアクセス方法についてご案内します。",
};

export default function AccessPage() {
  return (
    <div>
      <section className="bg-teal-50/60 py-16">
        <Container>
          <SectionHeading
            eyebrow="Access"
            title="対応エリア"
            description="神奈川県・東京都を中心に、出張施術・出張トレーニングにも対応しています。詳細な会場・アクセス情報はご予約確定後にご案内します。"
          />
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="mx-auto flex max-w-2xl flex-col gap-6">
            <div className="flex items-start gap-3 rounded-2xl border border-slate-200 p-5">
              <Car size={22} className="mt-0.5 shrink-0 text-teal-700" />
              <div>
                <h3 className="font-semibold text-slate-900">出張対応</h3>
                <p className="mt-1 text-sm text-slate-500">
                  ご自宅や練習会場への出張施術・出張トレーニングも承っています。対応可否はお問い合わせください。
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border border-slate-200 p-5">
              <MapPin size={22} className="mt-0.5 shrink-0 text-teal-700" />
              <div>
                <h3 className="font-semibold text-slate-900">対応エリア</h3>
                <p className="mt-1 text-sm text-slate-500">
                  神奈川県全域、東京都全域が基本対応エリアです。エリア外のご相談もお気軽にお問い合わせください。
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CtaBanner />
    </div>
  );
}
