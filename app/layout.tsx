import type { Metadata } from "next";
import { Martian_Mono, Sometype_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Kent Lozano — Software Developer, Web & Mobile",
  description:
    "Kent Lozano builds web and mobile software with Flutter, TypeScript, React, and Next.js. Creator of bastaFDA, a medicine-verification app using TensorFlow Lite and OCR.",
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
