"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { setupAdmin } from "@/app/admin/actions";

export function SetupForm() {
  const router = useRouter();
  const [setupToken, setSetupToken] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("パスワードが一致しません");
      return;
    }
    setLoading(true);
    setError(null);
    const result = await setupAdmin(setupToken, username, password);
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
      <p className="text-sm text-slate-500">
        初回のご利用です。管理画面用のユーザー名とパスワードを設定してください。
      </p>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">セットアップコード</label>
        <input
          value={setupToken}
          onChange={(e) => setSetupToken(e.target.value)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-teal-600 focus:outline-none"
          autoFocus
        />
        <span className="text-xs text-slate-400">
          サーバーの環境変数(ADMIN_SETUP_TOKEN)に設定した合言葉です。
        </span>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">ユーザー名</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-teal-600 focus:outline-none"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">パスワード(8文字以上)</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-teal-600 focus:outline-none"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">パスワード(確認)</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-teal-600 focus:outline-none"
        />
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "設定中..." : "設定してログイン"}
      </Button>
    </form>
  );
}
