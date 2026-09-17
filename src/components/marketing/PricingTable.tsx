import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { services } from "@/lib/data/services";
import { SERVICE_ICONS } from "./service-icons";

export function PricingTable() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((service) => {
        const Icon = SERVICE_ICONS[service.icon];
        return (
          <div
            key={service.slug}
            className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white"
          >
            {service.image && (
              <div className="relative aspect-[4/3] w-full bg-slate-50">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover object-top"
                />
              </div>
            )}
            <div className="flex flex-1 flex-col gap-5 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="flex items-center gap-2 text-base font-bold text-slate-900">
                    {service.name}
                    {service.comingSoon && (
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-500">
                        準備中
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-slate-500">{service.tagline}</p>
                </div>
              </div>

              <ul className="grid flex-1 grid-cols-[1fr_auto] items-baseline gap-x-3 gap-y-2 text-sm">
                {service.priceOptions.map((option) => (
                  <li
                    key={option.label}
                    className="col-span-2 grid grid-cols-subgrid border-b border-dashed border-slate-200 pb-2"
                  >
                    <span className="text-slate-600">{option.label}</span>
                    <span className="whitespace-nowrap text-right font-semibold text-slate-900">
                      {option.price > 0
                        ? `${option.price.toLocaleString()}円`
                        : "要相談"}
                    </span>
                  </li>
                ))}
              </ul>
              {service.priceNote && (
                <p className="text-xs text-slate-500">※ {service.priceNote}</p>
              )}

              {service.comingSoon ? (
                <Button className="w-full" disabled>
                  準備中(2027年4月 提供開始予定)
                </Button>
              ) : (
                <Button href={`/contact?service=${service.slug}`} className="w-full">
                  お問い合わせ・予約
                </Button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
