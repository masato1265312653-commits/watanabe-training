"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const NAV_LINKS = [
  { href: "/services", label: "料金" },
  { href: "/profile", label: "プロフィール" },
  { href: "/qa", label: "Q&A" },
  { href: "/access", label: "アクセス" },
  { href: "/contact", label: "お問い合わせ" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-700 text-sm font-bold text-white">
            渡
          </span>
          <span className="text-sm font-bold tracking-tight text-slate-900 sm:text-base">
            渡邊 将人
            <span className="ml-1 font-normal text-slate-500">
              コンディショニング
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-teal-800"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href="/contact" size="md">
            お問い合わせ・予約
          </Button>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="メニューを開く"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </Container>

      {open && (
        <div className="border-t border-slate-100 bg-white lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-teal-50"
              >
                {link.label}
              </Link>
            ))}
            <Button href="/contact" className="mt-2 w-full">
              お問い合わせ・予約
            </Button>
          </Container>
        </div>
      )}
    </header>
  );
}
