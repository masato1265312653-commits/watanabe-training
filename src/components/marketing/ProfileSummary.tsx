import Image from "next/image";
import Link from "next/link";
import { Award, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/lib/data/profile";

export function ProfileSummary() {
  return (
    <section className="bg-white">
      <div className="relative h-[70vh] w-full overflow-hidden sm:h-[85vh] lg:h-screen">
        <Image
          src="/images/trainer-action.jpg"
          alt={profile.name}
          fill
          sizes="100vw"
          className="animate-ken-burns object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
          <h2 className="animate-[fade-up_0.9s_ease-out_0.3s_both] text-2xl font-black tracking-wide text-white [text-shadow:0_4px_24px_rgba(0,0,0,0.85),0_2px_6px_rgba(0,0,0,0.7)] sm:text-5xl lg:text-6xl">
            幅広く、深く。
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> </span>
            選手を支えるトレーナー
          </h2>
        </div>
        <div className="absolute inset-x-0 bottom-0 animate-[fade-up_0.9s_ease-out_0.5s_both] p-6 sm:p-10">
          <h3 className="text-lg font-bold text-white sm:text-xl">
            {profile.name}
            <span className="ml-1 font-normal text-white/80">/{profile.nameRomaji}</span>
          </h3>
          <p className="text-sm text-white/90">{profile.title}</p>
        </div>
      </div>

      <Container className="flex flex-col items-center gap-6 py-16">
        <Reveal>
          <SectionHeading title="保有資格" />
        </Reveal>
        <Reveal delay={100} className="w-full">
          <ul className="grid w-full gap-3 sm:grid-cols-2">
            {profile.qualifications.map((q) => (
              <li
                key={q}
                className="flex items-start gap-2 rounded-xl bg-teal-50/70 p-3 text-sm text-slate-700 transition-colors hover:bg-teal-50"
              >
                <Award size={18} className="mt-0.5 shrink-0 text-teal-700" />
                {q}
              </li>
            ))}
          </ul>
        </Reveal>
        <Link
          href="/profile"
          className="flex items-center gap-1 text-sm font-semibold text-teal-700 transition-all hover:gap-2"
        >
          プロフィールをもっと見る
          <ArrowRight size={16} />
        </Link>
      </Container>
    </section>
  );
}
