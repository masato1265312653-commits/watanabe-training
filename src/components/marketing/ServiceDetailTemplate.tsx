import Image from "next/image";
import { CheckCircle2, Clock, Users2 } from "lucide-react";
import type { Service } from "@/lib/types";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SERVICE_ICONS } from "./service-icons";

export function ServiceDetailTemplate({ service }: { service: Service }) {
  const Icon = SERVICE_ICONS[service.icon];

  return (
    <div>
      <section className="bg-teal-50/60">
        <Container
          className={
            service.image
              ? "grid items-center gap-10 py-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]"
              : "flex flex-col gap-6 py-16"
          }
        >
          <div className="flex flex-col gap-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-700 text-white">
              <Icon size={28} />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-teal-700">
                  {service.category === "individual" ? "個人向けサービス" : "チーム・団体向けサービス"}
                </span>
                {service.comingSoon && (
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-500">
                    準備中
                  </span>
                )}
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {service.name}
              </h1>
              <p className="max-w-2xl text-base text-slate-600 leading-relaxed">
                {service.description}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
              {service.durationMinutes && (
                <span className="flex items-center gap-1.5">
                  <Clock size={16} className="text-teal-700" />
                  目安 {service.durationMinutes}分〜
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Users2 size={16} className="text-teal-700" />
                対応エリア: 神奈川県・東京都
              </span>
            </div>
            <div>
              {service.comingSoon ? (
                <Button size="lg" disabled>
                  準備中(2027年4月 提供開始予定)
                </Button>
              ) : (
                <Button href={`/contact?service=${service.slug}`} size="lg">
                  お問い合わせ・予約
                </Button>
              )}
            </div>
          </div>
          {service.image && (
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-teal-100/40">
              <Image
                src={service.image}
                alt={service.name}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-contain"
                priority
              />
            </div>
          )}
        </Container>
      </section>

      <section className="py-16">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <SectionHeading title="提供内容" />
            <ul className="flex flex-col gap-3">
              {service.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-teal-600" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <SectionHeading title="こんな方におすすめ" />
            <ul className="flex flex-col gap-3">
              {service.targets.map((target) => (
                <li key={target} className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-teal-600" />
                  {target}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container className="flex flex-col gap-6">
          <SectionHeading title="料金" />
          {service.comingSoon ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-8 text-center text-sm text-slate-500">
              現在準備中のため、料金は未定です。2027年4月の鍼灸師資格取得後、提供を開始する予定です。
            </div>
          ) : (
            <>
              <div className="overflow-hidden rounded-2xl border border-slate-200">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-500">
                    <tr>
                      <th className="px-6 py-3 font-medium">メニュー</th>
                      <th className="px-6 py-3 font-medium">料金</th>
                    </tr>
                  </thead>
                  <tbody>
                    {service.priceOptions.map((option) => (
                      <tr key={option.label} className="border-t border-slate-100">
                        <td className="px-6 py-4 text-slate-700">{option.label}</td>
                        <td className="px-6 py-4 font-semibold text-slate-900">
                          {option.price > 0 ? `${option.price.toLocaleString()}円` : "要相談"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {service.priceNote && (
                <p className="text-sm text-slate-500">※ {service.priceNote}</p>
              )}
            </>
          )}
        </Container>
      </section>

      <CtaBanner
        title={`${service.name}についてのご相談・お問い合わせ`}
        description="ご不明な点やご相談は、お問い合わせフォームからお気軽にご連絡ください。"
      />
    </div>
  );
}
