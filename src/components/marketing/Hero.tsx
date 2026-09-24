import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CheckCircle2 } from "lucide-react";
import { profile } from "@/lib/data/profile";
import { socialLinks } from "@/lib/data/social";
import { InstagramIcon, XIcon, LineIcon } from "@/components/icons/brand-icons";

const POINTS = [
  "スポーツチーム・団体への帯同実績多数",
  "神奈川県・東京都で個人からチームまで対応",
  "年齢・競技レベルを問わずオーダーメイド対応",
];

const SOCIAL_ICONS: Record<string, typeof InstagramIcon> = {
  Instagram: InstagramIcon,
  X: XIcon,
  LINE: LineIcon,
};

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
      <Container className="relative flex flex-col items-center gap-10 py-20 sm:py-28 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col items-start gap-8">
          <span className="rounded-full border border-teal-200 bg-white px-4 py-1.5 text-xs font-semibold tracking-wide text-teal-700">
            神奈川県・東京都 対応
          </span>
          <h1 className="max-w-2xl text-[1.75rem] font-black leading-tight tracking-tighter text-slate-900 sm:text-5xl sm:tracking-tight">
            <span className="block whitespace-nowrap">チームの怪我予防から</span>
            <span className="block whitespace-nowrap">パフォーマンスアップを、</span>
            <span className="text-teal-700">専属トレーナー</span>で。
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
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = SOCIAL_ICONS[social.name];
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-colors hover:border-teal-200 hover:text-teal-700"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="relative order-first aspect-[2/3] w-72 shrink-0 overflow-hidden rounded-3xl shadow-xl lg:order-none sm:w-96 lg:w-[28rem]">
          <Image
            src="/images/trainer-portrait.jpg"
            alt={profile.name}
            fill
            sizes="(min-width: 1024px) 384px, (min-width: 640px) 320px, 256px"
            className="object-cover"
            priority
          />
        </div>
      </Container>
    </section>
  );
}
