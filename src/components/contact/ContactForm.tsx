"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { clsx } from "clsx";
import { Button } from "@/components/ui/Button";
import { services, getServiceBySlug } from "@/lib/data/services";
import { submitInquiry } from "@/app/contact/actions";

type InquiryType = "reservation" | "general";

type FormState = {
  inquiryType: InquiryType;
  serviceSlug: string;
  preferredDate: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  website: string;
};

export function ContactForm({ closedDates = [] }: { closedDates?: string[] }) {
  const searchParams = useSearchParams();
  const presetSlug = searchParams.get("service");
  const presetValid = !!presetSlug && !!getServiceBySlug(presetSlug);

  const [form, setForm] = useState<FormState>({
    inquiryType: presetValid ? "reservation" : "general",
    serviceSlug: presetValid && presetSlug ? presetSlug : "",
    preferredDate: "",
    name: "",
    email: "",
    phone: "",
    message: "",
    website: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const needsDate = form.inquiryType === "reservation" && form.serviceSlug !== "team-support";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const nextErrors: typeof errors = {};
    if (!form.name.trim()) nextErrors.name = "お名前を入力してください";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      nextErrors.email = "メールアドレスの形式が正しくありません";
    if (form.inquiryType === "reservation" && !form.serviceSlug)
      nextErrors.serviceSlug = "ご希望のメニューを選択してください";
    if (needsDate && !form.preferredDate) nextErrors.preferredDate = "ご希望日を選択してください";
    if (needsDate && form.preferredDate && closedDates.includes(form.preferredDate))
      nextErrors.preferredDate = "その日は休業日です。別の日をお選びください";
    if (!form.message.trim()) nextErrors.message = "お問い合わせ内容を入力してください";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    setSubmitError(null);
    const result = await submitInquiry(form);
    setSubmitting(false);

    if (!result.success) {
      setSubmitError(result.message);
      return;
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-white p-10 text-center">
        <CheckCircle2 size={48} className="text-teal-600" />
        <h2 className="text-lg font-bold text-slate-900">
          お問い合わせありがとうございました
        </h2>
        <p className="max-w-sm text-sm text-slate-500">
          内容を確認の上、担当よりご連絡いたします。
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="absolute left-[-9999px] top-auto" aria-hidden="true">
        <label htmlFor="website">住所</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">お問い合わせ内容</label>
        <div className="grid gap-3 sm:grid-cols-2">
          {(
            [
              { value: "reservation", label: "ご予約について" },
              { value: "general", label: "ご相談・その他のお問い合わせ" },
            ] as const
          ).map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setForm((f) => ({ ...f, inquiryType: option.value }))}
              className={clsx(
                "rounded-lg border px-4 py-2.5 text-left text-sm font-medium transition-colors",
                form.inquiryType === option.value
                  ? "border-teal-700 bg-teal-50/70 text-teal-800"
                  : "border-slate-200 text-slate-600 hover:border-teal-200"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {form.inquiryType === "reservation" && (
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-700">ご希望のメニュー</label>
          <select
            value={form.serviceSlug}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                serviceSlug: e.target.value,
                preferredDate: e.target.value === "team-support" ? "" : f.preferredDate,
              }))
            }
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-teal-600 focus:outline-none"
          >
            <option value="">選択してください</option>
            {services.map((service) => (
              <option key={service.slug} value={service.slug}>
                {service.name}
              </option>
            ))}
          </select>
          {errors.serviceSlug && (
            <span className="text-xs text-red-500">{errors.serviceSlug}</span>
          )}
        </div>
      )}

      {needsDate && (
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-700">ご希望日</label>
          <input
            type="date"
            value={form.preferredDate}
            onChange={(e) => setForm((f) => ({ ...f, preferredDate: e.target.value }))}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-teal-600 focus:outline-none"
          />
          {errors.preferredDate && (
            <span className="text-xs text-red-500">{errors.preferredDate}</span>
          )}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-700">お名前</label>
          <input
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="山田 太郎"
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-teal-600 focus:outline-none"
          />
          {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-700">電話番号(任意)</label>
          <input
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            placeholder="090-1234-5678"
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-teal-600 focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label className="text-sm font-medium text-slate-700">メールアドレス</label>
          <input
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            placeholder="you@example.com"
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-teal-600 focus:outline-none"
          />
          {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
        </div>
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label className="text-sm font-medium text-slate-700">
            {form.inquiryType === "reservation" ? "ご希望の時間帯・その他ご要望" : "お問い合わせ内容"}
          </label>
          <textarea
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            rows={5}
            placeholder={
              form.inquiryType === "reservation"
                ? "ご希望の時間帯(午前中・18時以降など)やご要望をご記入ください"
                : "ご質問・ご相談内容をご記入ください"
            }
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-teal-600 focus:outline-none"
          />
          {errors.message && <span className="text-xs text-red-500">{errors.message}</span>}
        </div>
      </div>
      {submitError && <p className="text-sm text-red-500">{submitError}</p>}
      <Button type="submit" className="self-start" disabled={submitting}>
        {submitting ? "送信中..." : "送信する"}
      </Button>
    </form>
  );
}
