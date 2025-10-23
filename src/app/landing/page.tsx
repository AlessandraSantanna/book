"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaStar, FaRegStar } from "react-icons/fa";
import Funcionalidades from "../components/Funcionalidades/Funcionalidades";
import BookSearchBR from "../components/BookSearchBR";

interface Livro {
  id: number;
  titulo: string;
  autor: string;
  ano?: number;
  capa?: string;
  url_capa?: string;
  avaliacao: number;
  genero: string;
  lendo?: boolean;
  paginas_total?: number;
  paginas_lidas?: number;
  finalidade?: string;
}

export default function BookShelfLanding() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLivros() {
      try {
        const res = await fetch("https://book-vt3q.onrender.com");
        if (!res.ok) throw new Error("Erro ao buscar livros");
        const data = await res.json();
        setLivros(data);
      } catch (error) {
        console.error("Erro ao buscar livros:", error);
        setErro("Erro ao buscar livros.");
      } finally {
        setCarregando(false);
      }
    }
    fetchLivros();
  }, []);

  // 📊 Estatísticas gerais
 
  const lendo = livros.filter((l) => l.lendo).length;
  const finalizados = livros.filter(
    (l) => !l.lendo && l.paginas_lidas === l.paginas_total
  ).length;
  const paginasLidas = livros.reduce((acc, l) => acc + (l.paginas_lidas || 0), 0);
  const paginasTotais = livros.reduce((acc, l) => acc + (l.paginas_total || 0), 0);

  if (carregando) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-pink-50">
        <p className="text-pink-600 text-xl font-semibold">
          Carregando livros...
        </p>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-500">
        <p>{erro}</p>
      </div>
    );
  }

  return (
    <main className="container p-6">
      {/* Hero Section */}
      <section className="card text-center mb-10">
        <h1 className="title text-4xl font-bold text-pink-600 mb-4">📚 BookShelf</h1>
        <p className="subtitle text-gray-600 mb-6">
          Gerencie sua biblioteca pessoal com estilo. Cadastre, organize e acompanhe seus livros com uma interface moderna e intuitiva.
        </p>
        <Link
          href="/cadLivro"
          className="primaryBtn bg-pink-500 text-white px-6 py-3 rounded-lg shadow hover:bg-pink-600 transition"
        >
          Cadastrar novo livro
        </Link>
      </section>

      {/* 📊 Estatísticas da estante */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-blue-100 text-blue-800 rounded-xl p-4 shadow-md text-center">
          <h2 className="text-lg font-semibold">Lendo agora</h2>
          <p className="text-3xl font-bold">{lendo}</p>
        </div>
        <div className="bg-green-100 text-green-800 rounded-xl p-4 shadow-md text-center">
          <h2 className="text-lg font-semibold">Finalizados</h2>
          <p className="text-3xl font-bold">{finalizados}</p>
        </div>
        <div className="bg-purple-100 text-purple-800 rounded-xl p-4 shadow-md text-center">
          <h2 className="text-lg font-semibold">Páginas lidas/Total</h2>
          <p className="text-3xl font-bold">
            {paginasLidas} / {paginasTotais || "?"}
          </p>
        </div>
      </section>

      {/* Minha Estante */}
      <section className="card">
        <h2 className="title text-2xl font-semibold text-pink-600 mb-4">
          📖 Minha Estante
        </h2>
        {livros.length === 0 ? (
          <p className="text-gray-500 text-center">
            Nenhum livro cadastrado ainda.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {livros.map((livro) => (
              <div
                key={livro.id}
                className="card bg-white p-4 rounded-lg shadow text-center hover:shadow-lg transition"
              >
                {livro.url_capa?.trim().startsWith("http") ? (
                  <Image
                    src={livro.url_capa.trim()}
                    alt={livro.titulo}
                    width={180}
                    height={260}
                    className="mx-auto mb-3 rounded-md"
                  />
                ) : (
                  <div className="bg-gray-200 text-gray-500 h-[260px] flex items-center justify-center rounded-md mb-3">
                    Sem capa
                  </div>
                )}

                <h3 className="font-semibold text-lg">{livro.titulo}</h3>
                <p className="text-sm text-gray-500">
                  {livro.autor} {livro.ano && `• ${livro.ano}`}
                </p>

                {/* Avaliação */}
                <div className="flex justify-center my-2 text-yellow-400">
                  {[...Array(5)].map((_, i) =>
                    i < Math.round(livro.avaliacao) ? (
                      <FaStar key={i} />
                    ) : (
                      <FaRegStar key={i} />
                    )
                  )}
                </div>

                {/* Gênero */}
                <span className="text-xs text-pink-500 block mb-2">
                  {livro.genero}
                </span>

                {/* Status leitura */}
                <p
                  className={`text-xs px-2 py-1 rounded-full mb-2 ${
                    livro.lendo
                      ? "bg-blue-200 text-blue-800"
                      : livro.paginas_lidas === livro.paginas_total
                      ? "bg-green-200 text-green-800"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {livro.lendo
                    ? "📖 Lendo"
                    : livro.paginas_lidas === livro.paginas_total
                    ? "✅ Finalizado"
                    : "⏸️ Pendente"}
                </p>

                {/* Barra de progresso */}
                {livro.paginas_total ? (
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div
                      className="bg-indigo-500 h-2 rounded-full"
                      style={{
                        width: `${
                          ((livro.paginas_lidas || 0) / livro.paginas_total) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                ) : null}

                {/* Finalidade */}
                {livro.finalidade && (
                  <p className="text-xs text-gray-500 italic">
                    🎯 {livro.finalidade}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Extras */}
      <div className="mt-10">
        <Funcionalidades />
        <BookSearchBR />
      </div>
    </main>
  );
}
