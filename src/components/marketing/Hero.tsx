import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CheckCircle2 } from "lucide-react";

const POINTS = [
  "スポーツチーム・団体への帯同実績多数",
  "神奈川県・東京都で個人からチームまで対応",
  "年齢・競技レベルを問わずオーダーメイド対応",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-teal-50 via-white to-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-teal-100/60 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-40 h-80 w-80 rounded-full bg-teal-50 blur-3xl"
      />
      <Container className="relative flex flex-col items-start gap-8 py-20 sm:py-28">
        <span className="rounded-full border border-teal-200 bg-white px-4 py-1.5 text-xs font-semibold tracking-wide text-teal-700">
          神奈川県・東京都 対応
        </span>
        <h1 className="max-w-2xl text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
          チームの怪我予防と
          <br className="hidden sm:block" />
          コンディショニングを、
          <br />
          <span className="text-teal-700">専属トレーナー</span>帯同で。
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
          スポーツチームサポート(トレーナー帯同)をメインに、整体施術・鍼灸施術(準備中)・パーソナルトレーニングまで渡邊 将人が一貫して提供します。年齢もレベルも問わず、あなたに合わせたコンディショニングを。
        </p>

        <ul className="flex flex-col gap-2.5">
          {POINTS.map((point) => (
            <li key={point} className="flex items-center gap-2 text-sm text-slate-600">
              <CheckCircle2 size={18} className="shrink-0 text-teal-600" />
              {point}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center gap-4">
          <Button href="/contact" size="lg">
            お問い合わせ・予約
          </Button>
        </div>
      </Container>
    </section>
  );
}
