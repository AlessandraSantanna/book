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
    if (typeof window !== "undefined") {
      const livrosSalvos = localStorage.getItem("livros");
      if (livrosSalvos) {
        try {
          setLivros(JSON.parse(livrosSalvos));
        } catch {
          setLivros([]);
        }
      }
      setCarregando(false);
    }
  }, []);

  if (carregando) return null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-400 to-pink-200 text-gray-900 font-sans">
      {/* Hero Section */}
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
              className="inline-block bg-pink-100 text-black px-6 py-3 rounded-full hover:bg-pink-400 transition"
            >
              Começar agora
            </Link>
          </div>
        </div>
      </section>

      <BookSearchBR />
      <Funcionalidades />

      {/* Minha Estante */}
      <section className="py-16 px-6 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12">📖 Minha Estante</h2>
        {livros.length === 0 ? (
          <p className="text-center text-pink-700">Nenhum livro cadastrado ainda.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {livros.map((livro) => (
              <div key={livro.id} className="bg-pink-50 p-4 rounded-lg shadow-md">
                {livro.capa ? (
                  <Image
                    src={livro.capa}
                    alt={livro.titulo}
                    width={200}
                    height={300}
                    className="rounded mb-4 mx-auto"
                  />
                ) : (
                  <div className="w-full h-[300px] bg-pink-200 flex items-center justify-center rounded mb-4">
                    <span className="text-pink-700">Sem capa</span>
                  </div>
                )}
                <h3 className="text-lg font-semibold text-pink-800 text-center">{livro.titulo}</h3>
                <p className="text-sm text-pink-700 text-center">{livro.autor} • {livro.ano}</p>
               <div className="flex justify-center mt-2 mb-2 text-yellow-400">
                 {[...Array(5)].map((_, i) => (
                   i < livro.avaliacao ? <FaStar key={i} /> : <FaRegStar key={i} />
                 ))}
               </div>
                <div className="text-center">
                  <span className="inline-block bg-pink-200 text-pink-800 px-3 py-1 rounded-full text-sm">
                    {livro.genero}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    
      {/* Diferenciais */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">🚀 Diferenciais</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            {
              title: "Visual Minimalista",
              text: "Design limpo e intuitivo para foco total na leitura.",
              bg: "bg-pink-50",
            },
            {
              title: "Progresso de Leitura",
              text: "Acompanhe páginas lidas e percentual concluído.",
              bg: "bg-gray-50",
            },
            {
              title: "Estantes Customizadas",
              text: "Organize seus livros por temas, estilos ou objetivos.",
              bg: "bg-gray-50",
            },
            {
              title: "Expansível",
              text: "Preparado para integração com APIs externas e redes sociais.",
              bg: "bg-gray-50",
            },
          ].map((item, index) => (
            <div key={index} className={`${item.bg} p-6 rounded-lg shadow-md`}>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
         
      </section>
 {/* Rodapé */}
      <footer className="bg-pink-100 text-black py-6 text-center">
        <p>BookShelf by Grupo 18 Bits - Alessandra, Vanessa e Layan. Todos os direitos reservados.</p>
          <p>https://upload.wikimedia.org/wikipedia/commons/7/74/Libri_books2.jpg</p>
      </footer>
     
    </main>
  );
}
