import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const geistSans = localFont({
  src: "./fonts/geist-latin.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

const notoSansJP = localFont({
  src: [
    { path: "./fonts/noto-sans-jp-latin.woff2", weight: "400" },
    { path: "./fonts/noto-sans-jp-latin.woff2", weight: "500" },
    { path: "./fonts/noto-sans-jp-latin.woff2", weight: "700" },
    { path: "./fonts/noto-sans-jp-latin.woff2", weight: "900" },
  ],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

export const metadata: Metadata = {
  title: "渡邊 将人 コンディショニング | スポーツトレーナー帯同・整体・鍼灸・パーソナルトレーニング",
  description:
    "神奈川県・東京都対応。スポーツチームへのトレーナー帯同をメインに、整体施術、鍼灸施術、パーソナルトレーニングを提供する渡邊 将人の公式サイトです。お問い合わせフォームからお気軽にご相談・ご予約いただけます。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${notoSansJP.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
