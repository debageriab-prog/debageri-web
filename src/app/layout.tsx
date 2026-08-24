import type { Metadata } from "next";
import { Cairo, Inter } from "next/font/google";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://debageri.se"),
  title: {
    default: "Debageri AB | IT Consultancy in Gothenburg",
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
    <html lang="en" className={`${inter.variable} ${cairo.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        {children}
        <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />
      </body>
    </html>
  );
}
