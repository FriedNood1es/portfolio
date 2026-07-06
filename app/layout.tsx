import type { Metadata } from "next";
import { Martian_Mono, Sometype_Mono } from "next/font/google";
import { identity } from "@/lib/content";
import "./globals.css";

const display = Martian_Mono({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "700", "800"],
});

const body = Sometype_Mono({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "700"],
});

const title = "Kent Lozano — Software Developer, Web & Mobile";
const description =
  "Kent Lozano builds web and mobile software with Flutter, TypeScript, React, and Next.js. Creator of bastaFDA, a medicine-verification app using TensorFlow Lite and OCR.";
const siteUrl = `https://${identity.site}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: identity.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
