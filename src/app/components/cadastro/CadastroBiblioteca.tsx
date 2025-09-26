"use client";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Star, Eye, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import styles from "./cadBiblioteca.module.css";

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

  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [ano, setAno] = useState("");
  const [genero, setGenero] = useState("");
  const [capa, setCapa] = useState("");
  const [avaliacao, setAvaliacao] = useState(0);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [livroSelecionado, setLivroSelecionado] = useState<Livro | null>(null);

  useEffect(() => {
    const livrosSalvos = localStorage.getItem("livros");
    if (livrosSalvos) {
      setLivros(JSON.parse(livrosSalvos));
    }
    setCarregando(false);
  }, []);

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
    setTitulo("");
    setAutor("");
    setAno("");
    setGenero("");
    setCapa("");
    setAvaliacao(0);
  }

  function excluirLivro(id: string) {
    if (confirm("Deseja realmente excluir este livro?")) {
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

  if (carregando) return null;

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>📚 Biblioteca</h2>

      {/* Formulário */}
      <form onSubmit={handleCadastro} className={styles.form}>
        <h3 className={styles.formTitle}>
          {editandoId ? "Editar livro" : "Cadastrar novo livro"}
        </h3>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className={styles.input}
          required
        />
        <input
          type="text"
          placeholder="Autor"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
          className={styles.input}
          required
        />
        <input
          type="text"
          placeholder="Ano de publicação"
          value={ano}
          onChange={(e) => setAno(e.target.value)}
          className={styles.input}
        />
        <select
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
          className={styles.input}
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
          className={styles.input}
        />
        <div>
          <label className={styles.label}>Avaliação</label>
          <input
            type="number"
            placeholder="Avaliação (1 a 5)"
            value={avaliacao}
            onChange={(e) => setAvaliacao(Number(e.target.value))}
            min={1}
            max={5}
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button}>
          {editandoId ? "Salvar alterações" : "Adicionar Livro"}
        </button>
      </form>

      {/* Busca e Filtro */}
      <div className={styles.filters}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por título ou autor..."
          className={styles.input}
        />
        <select
          value={filtroGenero}
          onChange={(e) => setFiltroGenero(e.target.value)}
          className={styles.input}
        >
          <option value="">Todos os gêneros</option>
          <option value="Romance">Romance</option>
          <option value="Fábula">Fábula</option>
          <option value="Fantasia">Fantasia</option>
          <option value="Autoajuda">Autoajuda</option>
        </select>
      </div>

      {/* Cards */}
      <div className={styles.grid}>
        {livrosFiltrados.map((livro) => (
          <div key={livro.id} className={styles.card}>
            {livro.capa ? (
              <Image
                src={livro.capa}
                alt={livro.titulo}
                width={200}
                height={300}
                className={styles.image}
              />
            ) : (
              <div className={styles.noCover}>Sem capa</div>
            )}
            <h3 className={styles.bookTitle}>{livro.titulo}</h3>
            <p className={styles.bookAuthor}>
              {livro.autor} • {livro.ano}
            </p>
            <div className={styles.stars}>
              {[...Array(5)].map((_, i) =>
                i < livro.avaliacao ? <FaStar key={i} /> : <FaRegStar key={i} />
              )}
            </div>
            <div className={styles.genre}>{livro.genero}</div>
            <div className={styles.actions}>
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
              >
                <Pencil size={20} />
              </button>
              <button onClick={() => excluirLivro(livro.id)}>
                <Trash2 size={20} />
              </button>
              <button onClick={() => setLivroSelecionado(livro)}>
                <Eye size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {livroSelecionado && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button
              onClick={() => setLivroSelecionado(null)}
              className={styles.modalClose}
            >
              ✖
            </button>
            <h3 className={styles.modalTitle}>{livroSelecionado.titulo}</h3>
            <p>
              <strong>Autor:</strong> {livroSelecionado.autor}
            </p>
            <p>
              <strong>Ano:</strong> {livroSelecionado.ano}
            </p>
            <p>
              <strong>Gênero:</strong> {livroSelecionado.genero}
            </p>
            <p>
              <strong>Avaliação:</strong>{" "}
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={
                    i < livroSelecionado.avaliacao ? styles.starFull : styles.starEmpty
                  }
                />
              ))}
            </p>
            {livroSelecionado.capa ? (
              <Image
                src={livroSelecionado.capa}
                alt={livroSelecionado.titulo}
                width={200}
                height={300}
                className={styles.image}
              />
            ) : (
              <div className={styles.noCover}>Sem capa</div>
            )}
          </div>
        </div>
      )}

      {/* Botão para voltar */}
      <div className={styles.footer}>
        <Link href="/landing" className={styles.linkBtn}>
          Ir para Minha Estante
        </Link>
        
      </div>
       <div className={styles.footer}>
        <Link href="/login" className={styles.linkBtn}>
          Sair
        </Link>
        </div>
    </section>
  );
}
