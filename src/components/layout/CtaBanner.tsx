import { Fragment } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function CtaBanner({
  title = "まずはお気軽にご相談ください",
  description = "ご不明な点やご相談は、お問い合わせフォームから\nお気軽にご連絡ください。",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="bg-khaki-800">
      <Container className="flex flex-col items-center gap-6 py-16 text-center">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">{title}</h2>
        <p className="max-w-xl text-sm text-khaki-100 sm:text-base">
          {description.split("\n").map((line, i, lines) => (
            <Fragment key={i}>
              {line}
              {i < lines.length - 1 && <br className="sm:hidden" />}
            </Fragment>
          ))}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button href="/contact" variant="secondary" size="lg">
            お問い合わせ・予約
          </Button>
        </div>
      </Container>
    </section>
  );
}
