"use client";

import { useState, useTransition } from "react";
import { clsx } from "clsx";
import { updateInquiryStatus } from "@/app/admin/actions";
import { getServiceBySlug } from "@/lib/data/services";

export type Inquiry = {
  id: string;
  created_at: string;
  inquiry_type: "reservation" | "general";
  service_slug: string | null;
  preferred_date: string | null;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  status: "new" | "contacted" | "done";
};

const STATUS_LABELS: Record<Inquiry["status"], string> = {
  new: "未対応",
  contacted: "連絡済み",
  done: "完了",
};

const STATUS_STYLES: Record<Inquiry["status"], string> = {
  new: "bg-red-50 text-red-700",
  contacted: "bg-amber-50 text-amber-700",
  done: "bg-slate-100 text-slate-500",
};

export function InquiriesTable({ inquiries }: { inquiries: Inquiry[] }) {
  const [items, setItems] = useState(inquiries);
  const [, startTransition] = useTransition();

  function handleStatusChange(id: string, status: Inquiry["status"]) {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
    startTransition(() => {
      updateInquiryStatus(id, status);
    });
  }

  if (items.length === 0) {
    return <p className="text-sm text-slate-500">まだお問い合わせはありません。</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {items.map((inquiry) => {
        const service = inquiry.service_slug ? getServiceBySlug(inquiry.service_slug) : undefined;
        return (
          <div
            key={inquiry.id}
            className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                {inquiry.inquiry_type === "reservation" && inquiry.preferred_date && (
                  <span className="rounded-full bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-700">
                    実施希望日:{" "}
                    {new Date(`${inquiry.preferred_date}T00:00:00`).toLocaleDateString("ja-JP", {
                      month: "long",
                      day: "numeric",
                      weekday: "short",
                    })}
                  </span>
                )}
                {service && (
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                    {service.name}
                  </span>
                )}
                <span className="text-xs text-slate-400">
                  受付: {new Date(inquiry.created_at).toLocaleString("ja-JP")}
                </span>
              </div>
              <select
                value={inquiry.status}
                onChange={(e) =>
                  handleStatusChange(inquiry.id, e.target.value as Inquiry["status"])
                }
                className={clsx(
                  "rounded-full border-none px-3 py-1 text-xs font-medium focus:outline-none",
                  STATUS_STYLES[inquiry.status]
                )}
              >
                {(Object.keys(STATUS_LABELS) as Inquiry["status"][]).map((s) => (
                  <option key={s} value={s}>
                    {STATUS_LABELS[s]}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-1 text-sm text-slate-700 sm:grid-cols-2">
              <p>
                <span className="text-slate-400">お名前: </span>
                {inquiry.name}
              </p>
              <p>
                <span className="text-slate-400">電話番号: </span>
                {inquiry.phone || "-"}
              </p>
              <p className="sm:col-span-2">
                <span className="text-slate-400">メール: </span>
                {inquiry.email}
              </p>
            </div>
            <p className="whitespace-pre-wrap rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
              {inquiry.message}
            </p>
          </div>
        );
      })}
    </div>
  );
}
