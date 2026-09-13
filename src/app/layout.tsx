import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
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
