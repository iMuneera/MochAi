
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "./component/header";
import "./globals.css";
import BlogSection from "./component/Blog";

import MockUpFE, { MockUpBE } from "./component/Mockup";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MoachAi",
  description: "MochAi ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-gray-900 text-white`}>
        {/* Gradient Background */}
        <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 -z-50"></div>

        {/* Floating Glow Effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-40">
          <div className="absolute -left-20 -top-20 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl opacity-20 animate-float1"></div>
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl opacity-20 animate-float2"></div>
        </div>

        <Header />
        {children}
      </body>
    </html>
  );
}