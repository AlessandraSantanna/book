//app/components/cadastro/page.tsx

"use client";

import { useState } from "react";
import Link from "next/link";

export default function CadastroLivro() {
  const [livro, setLivro] = useState({
    titulo: "",
    autor: "",
    editora: "",
    genero: "",
    paginas: "",
    capa: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setLivro((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Livro cadastrado:", livro);
    // Aqui você pode enviar para backend ou salvar localmente
  }

  return (
    <section className="py-16 px-6 bg-white">
      <h2 className="text-3xl font-bold text-center mb-8">📘 Cadastro de Livros</h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-pink-50 p-8 rounded-lg shadow-md space-y-6"
      >
        <input
          type="text"
          name="titulo"
          value={livro.titulo}
          onChange={handleChange}
          placeholder="Título"
          className="w-full px-4 py-2 border border-pink-300 rounded-lg"
          required
        />
        <input
          type="text"
          name="autor"
          value={livro.autor}
          onChange={handleChange}
          placeholder="Autor"
          className="w-full px-4 py-2 border border-pink-300 rounded-lg"
          required
        />
        <input
          type="text"
          name="editora"
          value={livro.editora}
          onChange={handleChange}
          placeholder="Editora"
          className="w-full px-4 py-2 border border-pink-300 rounded-lg"
        />
        <select
          name="genero"
          value={livro.genero}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-pink-300 rounded-lg"
        >
          <option value="">Selecione o gênero</option>
          <option value="Romance">Romance</option>
          <option value="Ficção">Ficção</option>
          <option value="Autoajuda">Autoajuda</option>
          <option value="Acadêmico">Acadêmico</option>
          <option value="Fantasia">Fantasia</option>
        </select>
        <input
          type="number"
          name="paginas"
          value={livro.paginas}
          onChange={handleChange}
          placeholder="Número de páginas"
          className="w-full px-4 py-2 border border-pink-300 rounded-lg"
        />
        <input
          type="url"
          name="capa"
          value={livro.capa}
          onChange={handleChange}
          placeholder="URL da imagem da capa"
          className="w-full px-4 py-2 border border-pink-300 rounded-lg"
        />

        <button
          type="submit"
          className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition"
        >
          Cadastrar Livro
        </button>
      <Link
        href="/landing"
        className="block text-center w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition"
      >
         Ir para Home
      </Link>

      </form>
    </section>
  );
}
