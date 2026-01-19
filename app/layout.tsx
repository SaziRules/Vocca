import type { Metadata } from "next";
import { Geist, Geist_Mono, Great_Vibes } from "next/font/google";
import "./globals.css";
import TopNav from "@/components/TopNav";
import RightNav from "@/components/RightNav";
import MagneticCursor from "@/components/Magneticcursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  weight: "400",
  variable: "--font-script",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vocca - Luxury Artisan Chocolates",
  description: "Premium handcrafted chocolates with Middle Eastern flavors from Dubai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${greatVibes.variable} antialiased`}
      >
        <MagneticCursor />
        <TopNav />
        <RightNav />
        {children}
      </body>
    </html>
  );
}