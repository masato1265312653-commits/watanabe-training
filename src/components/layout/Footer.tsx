import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { services } from "@/lib/data/services";
import { socialLinks } from "@/lib/data/social";
import { InstagramIcon, XIcon, LineIcon } from "@/components/icons/brand-icons";

const SOCIAL_ICONS: Record<string, typeof InstagramIcon> = {
  Instagram: InstagramIcon,
  X: XIcon,
  LINE: LineIcon,
};

export function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-slate-50">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-700 text-sm font-bold text-white">
              渡
            </span>
            <span className="text-sm font-bold text-slate-900">渡邊 将人</span>
          </div>
          <p className="text-sm leading-relaxed text-slate-500">
            神奈川県・東京都を中心に、整体・鍼灸・パーソナルトレーニング・スポーツチームサポートを提供する個人事業主です。
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-slate-900">サービス</h3>
          <ul className="flex flex-col gap-2">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="text-sm text-slate-500 hover:text-teal-700"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-slate-900">サイト内リンク</h3>
          <ul className="flex flex-col gap-2">
            <li>
              <Link href="/profile" className="text-sm text-slate-500 hover:text-teal-700">
                プロフィール
              </Link>
            </li>
            <li>
              <Link href="/services" className="text-sm text-slate-500 hover:text-teal-700">
                料金
              </Link>
            </li>
            <li>
              <Link href="/qa" className="text-sm text-slate-500 hover:text-teal-700">
                Q&A
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-sm text-slate-500 hover:text-teal-700">
                お問い合わせ
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-slate-900">お問い合わせ</h3>
          <ul className="flex flex-col gap-2.5 text-sm text-slate-500">
            <li className="flex items-center gap-2">
              <MapPin size={16} className="shrink-0 text-teal-700" />
              対応エリア: 神奈川県・東京都
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="shrink-0 text-teal-700" />
              watanabe0503at@gmail.com
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="shrink-0 text-teal-700" />
              070-1418-1812
            </li>
          </ul>

          <div className="flex items-center gap-3 pt-1">
            {socialLinks.map((social) => {
              const Icon = SOCIAL_ICONS[social.name];
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:border-teal-200 hover:text-teal-700"
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>
        </div>
      </Container>

      <div className="border-t border-slate-200 py-5">
        <Container className="flex flex-col items-center justify-between gap-2 text-xs text-slate-400 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Masato Watanabe. All rights reserved.</p>
          <p>本サイトはフロントエンド開発中のプレビュー版です。</p>
        </Container>
      </div>
    </footer>
  );
}
