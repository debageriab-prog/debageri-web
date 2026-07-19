import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Debageri AB — IT Consultancy in Gothenburg",
    template: "%s | Debageri AB",
  },
  description:
    "Debageri AB is a Swedish IT consultancy based in Gothenburg. Senior engineers. Flexible compensation. Real work.",
  keywords: ["IT consultancy", "Gothenburg", "Sweden", "software engineers", "Java", "embedded"],
  authors: [{ name: "Debageri AB" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_SE",
    siteName: "Debageri AB",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
