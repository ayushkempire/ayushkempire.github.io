import type { Metadata } from "next";
import { Instrument_Serif, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://ayushkempire.vercel.app"),
  title: "Ayush Kapoor — Backend Developer",
  description:
    "Backend Developer at CAIR, IIT Mandi. Building scalable full-stack systems with Node.js, TypeScript, PostgreSQL, and Next.js.",
  keywords: [
    "Ayush Kapoor",
    "Backend Developer",
    "Full-stack Developer",
    "Node.js",
    "TypeScript",
    "Next.js",
    "PostgreSQL",
    "IIT Mandi",
  ],
  openGraph: {
    title: "Ayush Kapoor — Backend Developer",
    description:
      "Building scalable full-stack systems with Node.js, TypeScript, PostgreSQL, and Next.js.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${instrument.variable} ${grotesk.variable} ${jetbrains.variable} antialiased`}
    >
      <body className="noise">
        <SmoothScroll>{children}</SmoothScroll>
        <Cursor />
      </body>
    </html>
  );
}
