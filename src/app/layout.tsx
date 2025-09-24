import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


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
    icon: "/favicon.png", // ✅ caminho para o ícone
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased   document.documentElement.classList.add("dark");
;`}
      
      >
        
        {children}
        {/* Rodapé */}
      <footer className="bg-pink-100 text-black py-6 text-center">
        <p>BookShelf by Grupo 18 Bits - Alessandra, Vanessa e Layan. Todos os direitos reservados.</p>
          <p> link da imagem de url:https://upload.wikimedia.org/wikipedia/commons/7/74/Libri_books2.jpg</p>
      </footer>
      </body>
    </html>
  );
}
