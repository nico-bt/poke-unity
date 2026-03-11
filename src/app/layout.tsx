import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { verifySession } from "@/lib/session";
import Header from "@/components/Header";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pokemon CookUnity expansion",
  description: "Pokemon Card Game",
  creator: "Nico Battaglia",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await verifySession();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased root`}
      >
        <div className="mx-auto max-w-[1200px]">
          <Header session={session} />
          {children}
        </div>

        <Toaster containerStyle={{ top: 120 }} />
      </body>
    </html>
  );
}
