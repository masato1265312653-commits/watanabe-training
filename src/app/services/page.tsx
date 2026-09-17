import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { PricingTable } from "@/components/marketing/PricingTable";
import { CtaBanner } from "@/components/layout/CtaBanner";

export const metadata: Metadata = {
  title: "料金 | 渡邊 将人 コンディショニング",
  description:
    "整体施術・鍼灸施術(準備中)・パーソナルトレーニング・スポーツチームサポートの料金をご紹介します。",
};

export default function ServicesPage() {
  return (
    <div>
      <section className="bg-teal-50/60 py-16">
        <Container>
          <SectionHeading
            eyebrow="Pricing"
            title="料金"
            description="表示価格はすべて税込です。詳細な条件はお問い合わせにてご確認ください。"
          />
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <Reveal>
            <PricingTable />
          </Reveal>
        </Container>
      </section>

      <section className="bg-slate-50 py-12">
        <Container>
          <Reveal>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm leading-relaxed text-slate-500">
              <p className="font-semibold text-slate-700">お支払いについて</p>
              <p className="mt-2">現金またはお振込でのお支払いに対応しています。</p>
              <p className="mt-4 font-semibold text-slate-700">キャンセルポリシー</p>
              <p className="mt-2">
                整体施術・パーソナルトレーニングは、ご予約日前日の12時までのご連絡でキャンセル料はかかりません。前日12時以降〜当日のキャンセルは、施術料金の100%をキャンセル料として申し受けます。
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <CtaBanner />
    </div>
  );
}
