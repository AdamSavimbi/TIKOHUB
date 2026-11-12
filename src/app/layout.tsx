import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import "./globals.css";

import { SiteHeader } from "@/components/site-header";
import { siteHeaderContent } from "@/lib/mock/site-header";

// Inter variable font: covers weights 400, 500, 600, 700, 800 in one file.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Archivo, wide heavy italic: used only for the TikoPoa wordmark (owner decision).
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  style: "italic",
  axes: ["wdth"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TikoPoa",
  description: "Find events and get tickets.",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${archivo.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <SiteHeader content={siteHeaderContent} />
        {children}
      </body>
    </html>
  );
}
