import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeToggleButton from "../app/landing/ThemeToggleButton";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "📚 BookShelfBook",
  description: "biblioteca pessoal",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
  {/* 🔧 Botão de tema fixo no canto superior direito */}
  <div className="fixed top-4 right-4 z-50">
    <ThemeToggleButton />
  </div>

  {/* Conteúdo da página */}
  {children}

  <footer className="bg-pink-100 text-black py-6 text-center">
    <p>
      BookShelf by Grupo 18 Bits - Alessandra, Vanessa e Layan. Todos os
      direitos reservados.
    </p>
  </footer>
</body>
    </html>
  );
}
