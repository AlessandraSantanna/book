"use client";

import { useState } from "react";
import Image from "next/image";

interface Book {
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    pageCount?: number;
    language?: string;
    imageLinks?: {
      thumbnail?: string;
    };
  };
}

export default function BookSearchBR() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Book[]>([]);
  const [searched, setSearched] = useState(false);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query) return;

    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
        query
      )}&langRestrict=pt&maxResults=6`
    );
    const data = await res.json();
    setResults(data.items || []);
    setSearched(true);
  }

  return (
    <section className="bookSearch">
      <h2 className="sectionTitle">🔍 Pesquisar Livros</h2>

      <form onSubmit={handleSearch} className="bookSearchForm">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Digite o título do livro..."
          className="bookSearchInput"
        />
        <button type="submit" className="bookSearchBtn">
          Buscar
        </button>
      </form>

      {/* Preview de resultados */}
      <div className="bookSearchGrid">
        {results.length > 0 ? (
          results.map((book, index) => {
            const info = book.volumeInfo;
            return (
              <div key={index} className="bookCard">
                {info.imageLinks?.thumbnail ? (
                  <Image
                    src={info.imageLinks.thumbnail}
                    alt={info.title}
                    width={200}
                    height={300}
                    className="bookImage"
                  />
                ) : (
                  <div className="bookNoCover">
                    <span>Sem capa</span>
                  </div>
                )}

                <h3 className="bookTitle">{info.title}</h3>
                <p className="bookAuthor">
                  {info.authors?.[0] || "Autor desconhecido"}
                </p>

                {info.description && (
                  <p className="bookDescription">
                    {info.description.length > 200
                      ? info.description.slice(0, 200) + "..."
                      : info.description}
                  </p>
                )}

                <p className="bookInfo">
                  {info.pageCount
                    ? `${info.pageCount} páginas`
                    : "Número de páginas não informado"}
                </p>
                <p className="bookInfo">
                  {info.language
                    ? `Idioma: ${info.language.toUpperCase()}`
                    : "Idioma não informado"}
                </p>
              </div>
            );
          })
        ) : searched ? (
          <div className="bookEmpty">
            <p>📭 Nenhum livro encontrado para sua busca.</p>
            <span>Tente outro título ou autor!</span>
          </div>
        ) : null}
      </div>
    </section>
  );
}