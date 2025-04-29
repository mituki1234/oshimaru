import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "おしまる | 大島の地域情報ポータル",
  description: "おしまるは大島の地域情報、イベント、チラシなどを電子化して提供する地域密着型ポータルサイトです。",
  keywords: "ポスター,チラシ,大島,イベント,習い事,サークル,チーム,趣味,求人,買い物,お買い物,おしまる",
  metadataBase: new URL('https://oshimaru.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "大島情報局、略しておしまる。",
    description: "おしまるとは、大島の情報（ポスター)などを集めたサービスです。",
    url: 'https://oshimaru.com',
    siteName: 'おしまる',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "おしまる | 大島の地域情報ポータル",
    description: "おしまるは大島の地域情報、イベント、チラシなどを電子化して提供する地域密着型ポータルサイトです。",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${geistSans.variable} ${geistMono.variable} ${notoSansJp.variable}`}>
        {children}
      </body>
    </html>
  );
}