import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "StackAudit — AI Spend Audit",
  description:
    "Find out where you're overspending on AI tools. Free audit in 2 minutes.",
  openGraph: {
    title: "StackAudit — AI Spend Audit",
    description:
      "Find out where you're overspending on AI tools. Free audit in 2 minutes.",
    url: "https://stack-audit-tool.netlify.app",
    siteName: "StackAudit",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "StackAudit — AI Spend Audit",
    description:
      "Find out where you're overspending on AI tools. Free audit in 2 minutes."
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full  text-gray-600`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

