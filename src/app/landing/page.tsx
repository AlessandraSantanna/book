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
    <main className="container">
      {/* Hero Section */}
      <section className="card">
        <h1 className="title">📚 BookShelf</h1>
        <p className="subtitle">
          Gerencie sua biblioteca pessoal com estilo. Cadastre, organize e acompanhe seus livros com uma interface moderna e intuitiva.
        </p>
        <Link href="/cadLivro" className="primaryBtn">
          Começar agora
        </Link>
      </section>

      {/* Minha Estante */}
      <section className="card" style={{ marginTop: "40px" }}>
        <h2 className="title">📖 Minha Estante</h2>
        {livros.length === 0 ? (
          <p className="smallText">Nenhum livro cadastrado ainda.</p>
        ) : (
          <div className="livrosGrid">
            {livros.map((livro) => (
              <div key={livro.id} className="card">
                {livro.capa?.trimEnd() ? (
                  <Image
                    src={livro.capa.trimEnd()}
                    alt={livro.titulo}
                    width={200}
                    height={300}
                  />
                ) : (
                  <div className="livroSemCapa">
                    <span>Sem capa</span>
                  </div>
                )}
                <h3 className="title">{livro.titulo}</h3>
                <p className="subtitle">
                  {livro.autor} • {livro.ano}
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "10px 0",
                    color: "#facc15",
                  }}
                >
                  {[...Array(5)].map((_, i) =>
                    i < livro.avaliacao ? <FaStar key={i} /> : <FaRegStar key={i} />
                  )}
                </div>
                <span className="livroGenero">{livro.genero}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Extras */}
      <Funcionalidades />
      <BookSearchBR />
    </main>
  );
}
