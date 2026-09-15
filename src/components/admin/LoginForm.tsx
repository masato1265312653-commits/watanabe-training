"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { login } from "@/app/admin/actions";

export function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const result = await login(username, password);
    setLoading(false);
    if (!result.success) {
      setError(result.message);
      return;
    }
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-sm flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-8"
    >
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">ユーザー名</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-teal-600 focus:outline-none"
          autoFocus
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">パスワード</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-teal-600 focus:outline-none"
        />
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "確認中..." : "ログイン"}
      </Button>
    </form>
  );
}
