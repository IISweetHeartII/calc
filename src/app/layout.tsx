import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://clac.vercel.app"),
  title: "탈출각 - 투자 계산기",
  description: "물타기 계산, 목표 평단가 역산 등 투자자를 위한 유틸리티",
  keywords: [
    "투자 계산기",
    "물타기 계산",
    "평단가 계산",
    "목표 평단가",
    "손익 계산",
    "주식 계산기",
    "코인 계산기",
  ],
  authors: [{ name: "탈출각" }],
  creator: "탈출각",
  publisher: "탈출각",
  manifest: "/manifest.json",
  icons: {
    icon: "/images/nano-banana.svg",
    shortcut: "/images/nano-banana.svg",
    apple: "/images/nano-banana.svg",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://clac.vercel.app",
    siteName: "탈출각",
    title: "탈출각 - 투자 계산기",
    description: "물타기 계산, 목표 평단가 역산 등 투자자를 위한 유틸리티",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "탈출각 - 투자 계산기",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "탈출각 - 투자 계산기",
    description: "물타기 계산, 목표 평단가 역산 등 투자자를 위한 유틸리티",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
