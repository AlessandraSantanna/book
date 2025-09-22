"use client";
import BookSearchBR from "@/app/components/BookSearchBR";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Search, LayoutDashboard } from "lucide-react";
import Funcionalidades from "../components/Funcionalidades/page";

export default function BookShelfLanding() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query) return;

    const res = await fetch(`https://openlibrary.org/search.json?q=${query}`);
    const data = await res.json();
    setResults(data.docs.slice(0, 6)); // mostra apenas 5 resultados
  }

  return (
  <main className="min-h-screen bg-gradient-to-br from-pink-400 to-pink-200 text-gray-900 font-sans">
  {/* Hero Section */}
  <section
    className="relative text-center px-4 py-16 sm:py-20 sm:px-6 bg-[url('/home.jpg')] bg-cover bg-center bg-no-repeat"
  >
    {/* Overlay escuro para contraste */}
    <div className="absolute inset-0 bg-black/40"></div>

    {/* Conteúdo central */}
    <div className="relative z-10 max-w-3xl mx-auto">
      <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-white drop-shadow-lg">
        📚 BookShelf
      </h1>
      <p className="text-lg sm:text-xl text-white drop-shadow max-w-2xl mx-auto">
        Gerencie sua biblioteca pessoal com estilo. Pesquise, cadastre, organize e acompanhe seus livros com uma interface moderna e intuitiva.
      </p>
      <div className="mt-8">
        <Link
          href="/cadLivro"
          className="inline-block bg-pink-100 text-black px-6 py-3 rounded-full hover:bg-pink-400 transition"
        >
          Começar agora
        </Link>
      </div>
    </div>
  </section>
 <BookSearchBR/>
  <Funcionalidades/>

      {/* Público-Alvo */}
      <section className="py-16 px-6 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12">👥 Público-Alvo</h2>
        <ul className="list-disc list-inside max-w-3xl mx-auto text-lg space-y-2">
          <li>Leitores que desejam organizar sua biblioteca pessoal</li>
          <li>Estudantes que acompanham leituras acadêmicas</li>
          <li>Pessoas que registram hábitos e progresso de leitura</li>
        </ul>
      </section>

      {/* Diferenciais */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">🚀 Diferenciais</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-pink-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Visual Minimalista</h3>
            <p>Design limpo e intuitivo para foco total na leitura.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Progresso de Leitura</h3>
            <p>Acompanhe páginas lidas e percentual concluído.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Estantes Customizadas</h3>
            <p>Organize seus livros por temas, estilos ou objetivos.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Expansível</h3>
            <p>Preparado para integração com APIs externas e redes sociais.</p>
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="bg-pink-100 text-black py-6 text-center">
        <p>© 2025 BookShelf by Grupo 18 Bits. Todos os direitos reservados.</p>
      </footer>
     
    </main>
  );
}
