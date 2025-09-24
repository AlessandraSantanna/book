"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaStar, FaRegStar } from "react-icons/fa";


import BookSearchBR from "@/app/components/BookSearchBR";
import Funcionalidades from "../components/Funcionalidades/Funcionalidades";

interface Livro {
  id: string;
  titulo: string;
  autor: string;
  ano: string;
  genero: string;
  capa?: string;
  avaliacao: number;
}

export default function BookShelfLanding() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    // Aplica tema salvo
    const temaSalvo = localStorage.getItem("tema");
    if (temaSalvo === "dark") {
      document.documentElement.classList.add("dark");
    }

    // Carrega livros salvos
    const livrosSalvos = localStorage.getItem("livros");
    if (livrosSalvos) {
      try {
        setLivros(JSON.parse(livrosSalvos));
      } catch {
        setLivros([]);
      }
    }
    setCarregando(false);
  }, []);

  const alternarTema = () => {
  document.documentElement.classList.toggle("dark"); // ← aplica no <html>
  const temaAtual = document.documentElement.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("tema", temaAtual); // salva a preferência
  console.log("Tema atual:", temaAtual);
};
  if (carregando) return null;

  return (
<main className="min-h-screen bg-white dark:bg-black text-black dark:text-green-300 font-sans">      {/* Hero Section */}
      <section className="relative text-center px-4 py-16 sm:py-20 sm:px-6 bg-[url('/home.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-white drop-shadow-lg">📚 BookShelf</h1>
          <p className="text-lg sm:text-xl text-white drop-shadow max-w-2xl mx-auto">
            Gerencie sua biblioteca pessoal com estilo...
          </p>
          <div className="mt-8">
            <Link
              href="/cadLivro"
  className="inline-block bg-pink-100 text-black dark:bg-pink-700 dark:text-white px-6 py-3 rounded-full hover:bg-pink-400 dark:hover:bg-pink-600 transition"
>
  Começar agora
</Link>
          </div>
        </div>
      </section>

      {/* Minha Estante */}
      <section className="py-16 px-6 bg-white dark:bg-gray-900">
        <h2 className="text-3xl font-bold text-center mb-12">📖 Minha Estante</h2>
        {livros.length === 0 ? (
          <p className="text-center text-pink-700 dark:text-pink-300">Nenhum livro cadastrado ainda.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {livros.map((livro) => (
              <div key={livro.id} className="bg-pink-50 dark:bg-gray-800 p-4 rounded-lg shadow-md">
                {livro.capa ? (
                  <Image
                    src={livro.capa}
                    alt={livro.titulo}
                    width={200}
                    height={300}
                    className="rounded mb-4 mx-auto object-cover"
                  />
                ) : (
                  <div className="w-full h-[300px] bg-pink-200 dark:bg-gray-700 flex items-center justify-center rounded mb-4">
                    <span className="text-pink-700 dark:text-pink-300">Sem capa</span>
                  </div>
                )}
                <h3 className="text-lg font-semibold text-pink-800 dark:text-pink-200 text-center">{livro.titulo}</h3>
                <p className="text-sm text-pink-700 dark:text-pink-300 text-center">
                  {livro.autor} • {livro.ano}
                </p>
                <div className="flex justify-center mt-2 mb-2 text-yellow-400">
                  {[...Array(5)].map((_, i) =>
                    i < livro.avaliacao ? <FaStar key={i} /> : <FaRegStar key={i} />
                  )}
                </div>
                <div className="text-center">
                  <span className="inline-block bg-pink-200 dark:bg-pink-800 text-pink-800 dark:text-white px-3 py-1 rounded-full text-sm">
                    {livro.genero}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Botão de alternância de tema */}
        <div className="text-center mt-12">
         <button
  onClick={alternarTema}
  className="bg-pink-600 dark:bg-green-700 text-white dark:text-yellow-300 px-6 py-3 rounded-full hover:bg-pink-700 dark:hover:bg-green-800 transition"
>
  Alternar Team
</button>
        </div>
      </section>

      <Funcionalidades />
      <BookSearchBR />
    
      
    </main>
  );
}
