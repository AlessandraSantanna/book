import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BookShelfBook",
  description: "biblioteca pessoal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex justify-center py-6 bg-pink-100">
          <Image
            src="/livro.png"
            alt="Livro decorativo"
            width={120}
            height={120}
            className="rounded-lg shadow-md"
          />
        </div>
        {children}
      </body>
    </html>
  );
}
