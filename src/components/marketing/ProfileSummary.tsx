import Image from "next/image";
import Link from "next/link";
import { Award, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile } from "@/lib/data/profile";

export function ProfileSummary() {
  return (
    <section className="bg-white py-20">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:items-center">
        <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
          <div className="relative h-40 w-40 overflow-hidden rounded-full">
            <Image
              src="/images/trainer-portrait.jpg"
              alt={profile.name}
              fill
              sizes="160px"
              className="object-cover"
              priority
            />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              {profile.name}
              <span className="ml-1 font-normal text-slate-500">/{profile.nameRomaji}</span>
            </h3>
            <p className="text-sm text-slate-500">{profile.title}</p>
          </div>
          <Link
            href="/profile"
            className="flex items-center gap-1 text-sm font-semibold text-teal-700 hover:gap-2"
          >
            プロフィールをもっと見る
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="flex flex-col gap-6">
          <SectionHeading eyebrow="Profile" title={profile.story.title} />
          <ul className="grid gap-3 sm:grid-cols-2">
            {profile.qualifications.map((q) => (
              <li
                key={q}
                className="flex items-start gap-2 rounded-xl bg-teal-50/70 p-3 text-sm text-slate-700"
              >
                <Award size={18} className="mt-0.5 shrink-0 text-teal-700" />
                {q}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
