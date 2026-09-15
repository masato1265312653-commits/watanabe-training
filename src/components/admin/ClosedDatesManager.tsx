"use client";

import { useState, useTransition, type FormEvent } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { addClosedDate, removeClosedDate } from "@/app/admin/actions";

export type ClosedDate = {
  date: string;
  reason: string | null;
};

export function ClosedDatesManager({ closedDates }: { closedDates: ClosedDate[] }) {
  const [items, setItems] = useState(closedDates);
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  async function handleAdd(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!date) {
      setError("日付を選択してください");
      return;
    }
    if (items.some((item) => item.date === date)) {
      setError("その日付はすでに登録されています");
      return;
    }
    const result = await addClosedDate(date, reason);
    if (!result.success) {
      setError(result.message);
      return;
    }
    setItems((prev) => [...prev, { date, reason: reason.trim() || null }].sort((a, b) => a.date.localeCompare(b.date)));
    setDate("");
    setReason("");
  }

  function handleRemove(target: string) {
    setItems((prev) => prev.filter((item) => item.date !== target));
    startTransition(() => {
      removeClosedDate(target);
    });
  }

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5">
      <form onSubmit={handleAdd} className="flex flex-wrap items-end gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-700">休業日を追加</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-teal-600 focus:outline-none"
          />
        </div>
        <div className="flex flex-1 flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-700">理由(任意)</label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="例: 出張のため"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-teal-600 focus:outline-none"
          />
        </div>
        <Button type="submit" size="md">
          追加
        </Button>
      </form>
      {error && <p className="text-xs text-red-500">{error}</p>}

      {items.length === 0 ? (
        <p className="text-sm text-slate-500">設定されている休業日はありません。</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {items.map((item) => (
            <li
              key={item.date}
              className="flex items-center justify-between gap-3 rounded-lg bg-slate-50 px-3 py-2 text-sm"
            >
              <span className="text-slate-700">
                {new Date(`${item.date}T00:00:00`).toLocaleDateString("ja-JP", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  weekday: "short",
                })}
                {item.reason && <span className="ml-2 text-slate-400">({item.reason})</span>}
              </span>
              <button
                type="button"
                onClick={() => handleRemove(item.date)}
                className="text-slate-400 hover:text-red-500"
                aria-label="削除"
              >
                <X size={16} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
