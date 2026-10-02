"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { clsx } from "clsx";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const NAV_LINKS = [
  { href: "/", label: "トップ" },
  { href: "/profile", label: "プロフィール" },
  { href: "/services", label: "料金" },
  { href: "/qa", label: "Q&A" },
  { href: "/access", label: "アクセス" },
  { href: "/contact", label: "お問い合わせ" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const hasHeroPhoto = pathname === "/";

  useEffect(() => {
    if (!hasHeroPhoto) return;
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasHeroPhoto]);

  const transparent = hasHeroPhoto && !scrolled;

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        transparent
          ? "border-transparent bg-transparent"
          : "border-slate-100 bg-white/90 backdrop-blur"
      )}
    >
      <div className="flex h-16 w-full items-center justify-end gap-7 px-6 lg:px-10">
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "text-sm font-semibold transition-colors",
                transparent
                  ? "text-white hover:text-white/80"
                  : "text-slate-700 hover:text-khaki-800"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href="/contact" size="md" variant={transparent ? "outline" : "primary"}>
            お問い合わせ・予約
          </Button>
        </div>

        <button
          type="button"
          className={clsx(
            "flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-300 lg:hidden",
            transparent
              ? "border border-white/40 bg-white/15 text-white backdrop-blur-sm"
              : "bg-khaki-800 text-white"
          )}
          onClick={() => setOpen((v) => !v)}
          aria-label="メニューを開く"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-100 bg-white lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-base font-semibold text-slate-700 hover:bg-khaki-50"
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
