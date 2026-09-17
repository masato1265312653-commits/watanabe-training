import type { Metadata } from "next";
import Image from "next/image";
import { Award, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { profile } from "@/lib/data/profile";

export const metadata: Metadata = {
  title: "プロフィール | 渡邊 将人 コンディショニング",
  description: "渡邊 将人のプロフィール、保有資格をご紹介します。",
};

export default function ProfilePage() {
  return (
    <div>
      <section className="bg-teal-50/60">
        <div className="relative h-64 w-full overflow-hidden sm:h-80 lg:h-[26rem]">
          <Image
            src="/images/trainer-action.jpg"
            alt={profile.name}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
        <Container className="py-8">
          <div className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              {profile.name}
              <span className="ml-2 text-base font-normal text-slate-500">
                /{profile.nameRomaji}
              </span>
            </h1>
            <p className="text-teal-700 font-semibold">{profile.title}</p>
            <p className="flex items-center justify-center gap-1.5 text-sm text-slate-500 sm:justify-start">
              <MapPin size={16} />
              対応エリア: {profile.areas.join(" / ")}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container className="flex flex-col gap-6">
          <SectionHeading title={profile.story.title} />
          <div className="flex max-w-3xl flex-col gap-4">
            {profile.story.paragraphs.map((paragraph) => (
              <p key={paragraph} className="leading-relaxed text-slate-600">
                {paragraph}
              </p>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-slate-100 py-16">
        <Container className="flex flex-col gap-6">
          <SectionHeading title="経歴" />
          <ol className="flex flex-col gap-4">
            {profile.career.map((item) => (
              <li key={`${item.year}-${item.event}`} className="flex items-baseline gap-4">
                <span className="w-16 shrink-0 text-sm font-semibold text-teal-700">
                  {item.year}
                </span>
                <span className="text-sm text-slate-700">{item.event}</span>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-slate-50 py-16">
        <Container className="flex flex-col gap-4">
          <SectionHeading title="保有資格" />
          <ul className="grid gap-3 sm:grid-cols-2">
            {profile.qualifications.map((q) => (
              <li
                key={q}
                className="flex items-center gap-3 rounded-xl bg-white p-4 text-sm text-slate-700 shadow-sm"
              >
                <Award size={20} className="shrink-0 text-teal-700" />
                {q}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBanner />
    </div>
  );
}
