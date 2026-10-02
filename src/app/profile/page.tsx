import type { Metadata } from "next";
import Image from "next/image";
import { Award, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { profile } from "@/lib/data/profile";

export const metadata: Metadata = {
  title: "プロフィール | 渡邊 将人 コンディショニング",
  description: "渡邊 将人のプロフィール、保有資格をご紹介します。",
};

function EditorialHeading({ en, title }: { en: string; title: string }) {
  return (
    <div className="flex flex-col gap-2 border-b border-slate-200 pb-6 sm:flex-row sm:items-baseline sm:gap-6">
      <h2 className="text-4xl font-black uppercase tracking-tight text-teal-800 sm:text-5xl">
        {en}
      </h2>
      <p className="text-lg font-bold text-slate-900 sm:text-xl">{title}</p>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <div>
      <section className="bg-white">
        <div className="relative h-72 w-full overflow-hidden sm:h-96 lg:h-[28rem]">
          <Image
            src="/images/trainer-action.jpg"
            alt={profile.name}
            fill
            sizes="100vw"
            className="object-cover object-[center_70%]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              {profile.name}
              <span className="ml-2 text-base font-normal text-white/80">
                /{profile.nameRomaji}
              </span>
            </h1>
            <p className="font-semibold text-white/90">{profile.title}</p>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-white/80">
              <MapPin size={16} />
              対応エリア: {profile.areas.join(" / ")}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <Container className="flex flex-col gap-6">
          <Reveal>
            <EditorialHeading en="Story" title={profile.story.title} />
          </Reveal>
          <Reveal delay={100}>
            <div className="flex max-w-3xl flex-col gap-4 lg:max-w-6xl">
              {profile.story.paragraphs.map((paragraph) => (
                <p key={paragraph} className="leading-relaxed text-slate-600">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-slate-100 py-16">
        <Container className="flex flex-col gap-6">
          <Reveal>
            <EditorialHeading en="Career" title="経歴" />
          </Reveal>
          <Reveal delay={100}>
            <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
              {[profile.career.slice(0, 4), profile.career.slice(4)].map((group, i) => (
                <ol key={i} className="relative flex flex-1 flex-col gap-6 border-l-2 border-teal-100 pl-6">
                  {group.map((item) => (
                    <li key={`${item.year}-${item.event}`} className="relative">
                      <span className="absolute top-1 -left-[1.95rem] h-3 w-3 rounded-full border-2 border-teal-600 bg-white" />
                      <span className="block text-sm font-semibold text-teal-700">
                        {item.year}
                      </span>
                      <span className="text-sm text-slate-700">{item.event}</span>
                    </li>
                  ))}
                </ol>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-slate-50 py-16">
        <Container className="flex flex-col gap-4">
          <Reveal>
            <EditorialHeading en="Qualification" title="保有資格" />
          </Reveal>
          <Reveal delay={100}>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {profile.qualifications.map((q) => (
                <li
                  key={q}
                  className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-4 text-sm font-medium text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <Award size={20} className="shrink-0 text-teal-700" />
                  {q}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      <CtaBanner />
    </div>
  );
}
