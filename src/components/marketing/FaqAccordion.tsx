import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/lib/data/faq";

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <details
          key={item.question}
          className="group rounded-2xl border border-slate-200 bg-white p-5"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-slate-900">
            {item.question}
            <ChevronDown
              size={18}
              className="shrink-0 text-teal-700 transition-transform group-open:rotate-180"
            />
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
