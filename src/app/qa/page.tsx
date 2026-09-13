import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { faqs } from "@/lib/data/faq";

export const metadata: Metadata = {
  title: "Q&A | 渡邊 将人 コンディショニング",
  description: "ご予約・キャンセル・対応エリアなど、よくいただくご質問にお答えします。",
};

export default function QaPage() {
  return (
    <div>
      <section className="bg-teal-50/60 py-16">
        <Container>
          <SectionHeading
            eyebrow="Q&A"
            title="よくあるご質問"
            description="ご予約前に気になる点をまとめました。掲載のない内容はお気軽にお問い合わせください。"
          />
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <FaqAccordion items={faqs} />
        </Container>
      </section>

      <CtaBanner />
    </div>
  );
}
