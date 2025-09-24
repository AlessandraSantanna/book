"use client";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Star, Eye, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

interface Livro {
  id: string;
  titulo: string;
  autor: string;
  ano: string;
  genero: string;
  capa?: string;
  avaliacao: number;
}

export default function CadastroBiblioteca() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [query, setQuery] = useState("");
  const [filtroGenero, setFiltroGenero] = useState("");

  // Campos do formulário
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [ano, setAno] = useState("");
  const [genero, setGenero] = useState("");
  const [capa, setCapa] = useState("");
  const [avaliacao, setAvaliacao] = useState(0);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);


  // Carrega livros salvos
 

useEffect(() => {
  const livrosSalvos = localStorage.getItem("livros");
  if (livrosSalvos) {
    setLivros(JSON.parse(livrosSalvos));
  }
  setCarregando(false);
}, []);



  // Salva livros no localStorage
  useEffect(() => {
    localStorage.setItem("livros", JSON.stringify(livros));
  }, [livros]);



  function handleCadastro(e: React.FormEvent) {
    e.preventDefault();

    if (editandoId) {
      setLivros((prev) =>
        prev.map((livro) =>
          livro.id === editandoId
            ? { ...livro, titulo, autor, ano, genero, capa, avaliacao }
            : livro
        )
      );
      setEditandoId(null);
    } else {
      const novoLivro: Livro = {
        id: crypto.randomUUID(),
        titulo,
        autor,
        ano,
        genero,
        capa,
        avaliacao,
      };
      setLivros((prev) => [...prev, novoLivro]);
    }

    // Limpa os campos
    setTitulo("");
    setAutor("");
    setAno("");
    setGenero("");
    setCapa("");
    setAvaliacao(0);
  }

  function excluirLivro(id: string) {
    const confirmacao = confirm("Deseja realmente excluir este livro?");
    if (confirmacao) {
      setLivros((prev) => prev.filter((livro) => livro.id !== id));
    }
  }

  const livrosFiltrados = livros.filter((livro) => {
    const busca = query.toLowerCase();
    const correspondeBusca =
      livro.titulo.toLowerCase().includes(busca) ||
      livro.autor.toLowerCase().includes(busca);
    const correspondeGenero = filtroGenero
      ? livro.genero === filtroGenero
      : true;
    return correspondeBusca && correspondeGenero;
  });

 const [livroSelecionado, setLivroSelecionado] = useState<Livro | null>(null);

    if (carregando) return null;

  
  return (
  <section className="py-16 px-6 bg-white">
    <h2 className="text-3xl font-bold text-center mb-8">📚 Biblioteca</h2>

    {/* Formulário */}
    <form
      onSubmit={handleCadastro}
      className="max-w-4xl mx-auto bg-pink-50 p-6 rounded-lg shadow-md mb-10 space-y-4"
    >
      <h3 className="text-xl font-bold text-pink-800">
        {editandoId ? "Editar livro" : "Cadastrar novo livro"}
      </h3>
      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        className="w-full px-4 py-2 border border-pink-300 rounded-lg placeholder:text-gray-800"
        required
      />
      <input
        type="text"
        placeholder="Autor"
        value={autor}
        onChange={(e) => setAutor(e.target.value)}
        className="w-full px-4 py-2 border border-pink-300 rounded-lg placeholder:text-gray-800"
        required
      />
      <input
        type="text"
        placeholder="Ano de publicação"
        value={ano}
        onChange={(e) => setAno(e.target.value)}
        className="w-full px-4 py-2 border border-pink-300 rounded-lg placeholder:text-gray-800"
      />
      <select
        value={genero}
        onChange={(e) => setGenero(e.target.value)}
        className="w-full px-4 py-2 border border-pink-300 rounded-lg"
      >
        <option value="">Selecione o gênero</option>
        <option value="Romance">Romance</option>
        <option value="Fábula">Fábula</option>
        <option value="Fantasia">Fantasia</option>
        <option value="Autoajuda">Autoajuda</option>
      </select>
      <input
        type="url"
        placeholder="URL da capa"
        value={capa}
        onChange={(e) => setCapa(e.target.value)}
        className="w-full px-4 py-2 border border-pink-300 rounded-lg placeholder:text-gray-800"
      />
      <div>
        <label className="block text-pink-800 font-semibold mb-1">Avaliação</label>
        <input
          type="number"
          placeholder="Avaliação (1 a 5)"
          value={avaliacao}
          onChange={(e) => setAvaliacao(Number(e.target.value))}
          min={1}
          max={5}
          className="w-full px-4 py-2 border border-pink-300 rounded-lg placeholder:text-gray-800"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition"
      >
        {editandoId ? "Salvar alterações" : "Adicionar Livro"}
      </button>
    </form>

    {/* Busca e Filtro */}
    <div className="max-w-4xl mx-auto flex flex-wrap gap-4 mb-8">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar por título ou autor..."
        className="flex-1 px-4 py-2 border border-pink-300 rounded-lg placeholder:text-gray-800"
      />
      <select
        value={filtroGenero}
        onChange={(e) => setFiltroGenero(e.target.value)}
        className="px-4 py-2 border border-pink-300 rounded-lg"
      >
        <option value="">Todos os gêneros</option>
        <option value="Romance">Romance</option>
        <option value="Fábula">Fábula</option>
        <option value="Fantasia">Fantasia</option>
        <option value="Autoajuda">Autoajuda</option>
      </select>
    </div>

    {/* Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {livrosFiltrados.map((livro) => (
        <div key={livro.id} className="bg-pink-50 p-4 rounded-lg shadow-md">
          {livro.capa ? (
            <Image
              src={livro.capa}
              alt={livro.titulo}
              width={200}
              height={300}
              className="object-cover rounded mb-4 mx-auto"
            />
          ) : (
            <div className="w-full h-[300px] bg-pink-200 flex items-center justify-center rounded mb-4">
              <span className="text-pink-700">Sem capa</span>
            </div>
          )}
          <h3 className="text-lg font-semibold text-pink-800 text-center">{livro.titulo}</h3>
          <p className="text-sm text-pink-700 text-center">{livro.autor} • {livro.ano}</p>
          <div className="flex justify-center mt-2 mb-2 text-yellow-400">
            {[...Array(5)].map((_, i) =>
              i < livro.avaliacao ? <FaStar key={i} /> : <FaRegStar key={i} />
            )}
          </div>
          <div className="text-center mb-4">
            <span className="inline-block bg-pink-200 text-pink-800 px-3 py-1 rounded-full text-sm">
              {livro.genero}
            </span>
          </div>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => {
                setEditandoId(livro.id);
                setTitulo(livro.titulo);
                setAutor(livro.autor);
                setAno(livro.ano);
                setGenero(livro.genero);
                setCapa(livro.capa || "");
                setAvaliacao(livro.avaliacao);
              }}
              className="text-pink-600 hover:text-pink-800"
            >
              <Pencil size={20} />
            </button>
            <button
              onClick={() => excluirLivro(livro.id)}
              className="text-pink-600 hover:text-pink-800"
            >
              <Trash2 size={20} />
            </button>
            <button
              onClick={() => setLivroSelecionado(livro)}
              className="text-pink-600 hover:text-pink-800"
            >
              <Eye size={20} />
            </button>
          </div>
        </div>
      ))}
    </div>

    {/* Modal de visualização */}
    {livroSelecionado && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
          <button
            onClick={() => setLivroSelecionado(null)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          >
            ✖
          </button>
          <h3 className="text-2xl font-bold text-pink-700 mb-2">{livroSelecionado.titulo}</h3>
          <p className="text-sm text-gray-700 mb-1"><strong>Autor:</strong> {livroSelecionado.autor}</p>
          <p className="text-sm text-gray-700 mb-1"><strong>Ano:</strong> {livroSelecionado.ano}</p>
          <p className="text-sm text-gray-700 mb-1"><strong>Gênero:</strong> {livroSelecionado.genero}</p>
          <p className="text-sm text-gray-700 mb-4">
            <strong>Avaliação:</strong>{" "}
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                className={`inline ${i < livroSelecionado.avaliacao ? "text-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </p>
          {livroSelecionado.capa ? (
            <Image
              src={livroSelecionado.capa}
              alt={livroSelecionado.titulo}
              width={200}
              height={300}
              className="rounded mx-auto"
            />
          ) : (
            <div className="w-full h-[300px] bg-pink-200 flex items-center justify-center rounded">
              <span className="text-pink-700">Sem capa</span>
            </div>
          )}
        </div>
      </div>
    )}

    {/* Botão para voltar à landing */}
    <div className="text-center mt-12">
      <Link
        href="/landing"
        className="inline-block bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-pink-700 transition"
      >
        Ir para Minha Estante
      </Link>
    </div>
  </section>
);
}