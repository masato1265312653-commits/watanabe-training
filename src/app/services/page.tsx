import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { PricingTable } from "@/components/marketing/PricingTable";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { PaymentNotice } from "@/components/layout/PaymentNotice";

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

      <PaymentNotice />

      <CtaBanner />
    </div>
  );
}
