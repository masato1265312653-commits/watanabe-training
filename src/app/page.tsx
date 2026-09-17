import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Hero } from "@/components/marketing/Hero";
import { ProfileSummary } from "@/components/marketing/ProfileSummary";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";
import { PricingTable } from "@/components/marketing/PricingTable";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { faqs } from "@/lib/data/faq";

export default function Home() {
  return (
    <>
      <ProfileSummary />

      <Hero />

      <section className="bg-slate-50 py-20">
        <Container className="flex flex-col gap-10">
          <Reveal>
            <SectionHeading
              eyebrow="Pricing"
              title="料金表"
              description="サービスごとの料金の目安です。詳細はサービス詳細ページ、またはお問い合わせにてご確認ください。"
            />
          </Reveal>
          <Reveal delay={100}>
            <PricingTable />
          </Reveal>
        </Container>
      </section>

      <section className="py-20">
        <Container className="flex flex-col gap-10">
          <Reveal>
            <SectionHeading
              eyebrow="Q&A"
              title="よくあるご質問"
              description="ご予約前に気になる点をまとめました。"
            />
          </Reveal>
          <Reveal delay={100}>
            <FaqAccordion items={faqs} />
          </Reveal>
        </Container>
      </section>

      <Reveal>
        <CtaBanner />
      </Reveal>
    </>
  );
}
