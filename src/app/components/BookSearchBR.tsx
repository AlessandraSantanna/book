"use client";

import { useState } from "react";
import Image from "next/image";

export default function BookSearchBR() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query) return;

    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&langRestrict=pt&maxResults=6`
    );
    const data = await res.json();
    setResults(data.items || []);
  }

  return (
    <section className="py-16 px-6 bg-white">
      <h2 className="text-3xl font-bold text-center mb-8">🔍 Pesquisar Livros </h2>
      <form onSubmit={handleSearch} className="max-w-xl mx-auto flex gap-4 mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Digite o título do livro..."
          className="flex-1 px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <button
          type="submit"
          className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition"
        >
          Buscar
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {results.map((book: any, index) => {
          const info = book.volumeInfo;
          return (
            <div key={index} className="bg-pink-50 p-4 rounded-lg shadow-md">
              {info.imageLinks?.thumbnail ? (
                <Image
                  src={info.imageLinks.thumbnail}
                  alt={info.title}
                  width={200}
                  height={300}
                  className="rounded mb-4 mx-auto"
                />
              ) : (
                <div className="w-full h-[300px] bg-pink-200 flex items-center justify-center rounded mb-4">
                  <span className="text-pink-700">Sem capa</span>
                </div>
              )}
              <h3 className="text-lg font-semibold text-pink-800 text-center">{info.title}</h3>
              <p className="text-sm text-pink-700 text-center">
                {info.authors?.[0] || "Autor desconhecido"}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
