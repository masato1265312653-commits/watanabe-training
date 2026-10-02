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

      <section className="relative overflow-hidden bg-slate-50 py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-khaki-200/60 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-khaki-100 blur-3xl"
        />
        <Container className="relative flex flex-col gap-10">
          <Reveal>
            <SectionHeading
              eyebrow="Pricing"
              title="料金表"
              description={"サービスごとの料金の目安です。\n詳細はサービス詳細ページ、またはお問い合わせにてご確認ください。"}
            />
          </Reveal>
          <Reveal delay={100}>
            <PricingTable />
          </Reveal>
        </Container>
      </section>

      <section className="relative overflow-hidden py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-khaki-100 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-khaki-200/60 blur-3xl"
        />
        <Container className="relative flex flex-col gap-10">
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
