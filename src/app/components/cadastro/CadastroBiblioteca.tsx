"use client";

import { useEffect, useState, useRef } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import styles from "./cadBiblioteca.module.css";
import api from "@/lib/api";
import { Livro } from "@/types/livro";

export default function Biblioteca() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [query, setQuery] = useState("");
  const [filtroGenero, setFiltroGenero] = useState("");
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [genero, setGenero] = useState("");
  const [ano_publicacao, setAnoPublicacao] = useState("");
  const [isbn, setIsbn] = useState("");
  const [urlCapa, setUrlCapa] = useState("");
  const [avaliacao, setAvaliacao] = useState<number>(0);
  const [lendo, setLendo] = useState<boolean>(false);
  const [paginasTotal, setPaginasTotal] = useState<number>(0);
  const [paginasLidas, setPaginasLidas] = useState<number>(0);
  const [finalidade, setFinalidade] = useState("");
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [livroSelecionado, setLivroSelecionado] = useState<Livro | null>(null);

  // 👉 Referência para o formulário
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    carregarLivros();
  }, []);

  async function carregarLivros() {
    const res = await api.get("/livros");
    setLivros(res.data);
  }

  async function handleCadastro(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      titulo: titulo.trim(),
      autor: autor.trim(),
      genero,
      ano_publicacao: Number(ano_publicacao),
      isbn: isbn.trim(),
      url_capa: urlCapa.trim(),
      avaliacao,
      lendo,
      paginas_total: paginasTotal,
      paginas_lidas: paginasLidas,
      finalidade,
    };

    try {
      if (editandoId) {
        await api.put(`/livros/${editandoId}`, payload);
      } else {
        await api.post("/livros", payload);
      }
      await carregarLivros();
      resetForm();
      setEditandoId(null);
    } catch (err: unknown) {
      let errorMessage = "Erro desconhecido";
      if (isAxiosError(err)) {
        errorMessage = err.response?.data?.error || "Erro na requisição";
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      alert("Erro ao cadastrar livro: " + errorMessage);
    }
  }

  function resetForm() {
    setTitulo("");
    setAutor("");
    setGenero("");
    setAnoPublicacao("");
    setIsbn("");
    setUrlCapa("");
    setAvaliacao(0);
    setLendo(false);
    setPaginasTotal(0);
    setPaginasLidas(0);
    setFinalidade("");
  }

  async function excluirLivro(id: number) {
    if (confirm("Deseja realmente excluir este livro?")) {
      await api.delete(`/livros/${id}`);
      await carregarLivros();
    }
  }

  const livrosFiltrados = livros.filter((livro) => {
    const busca = query.toLowerCase();
    const correspondeBusca =
      livro.titulo.toLowerCase().includes(busca) ||
      livro.autor.toLowerCase().includes(busca);
    const correspondeGenero = filtroGenero ? livro.genero === filtroGenero : true;
    return correspondeBusca && correspondeGenero;
  });

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>📚 Biblioteca</h2>

      {/* --- Formulário --- */}
      <form ref={formRef} onSubmit={handleCadastro} className={styles.form}>
        <h3 className={styles.formTitle}>
          {editandoId ? "Editar Livro" : "Cadastrar novo livro"}
        </h3>

        <label className={styles.label}>Título</label>
        <input
          className={styles.input}
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />

        <label className={styles.label}>Autor</label>
        <input
          className={styles.input}
          type="text"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
          required
        />

        <label className={styles.label}>Ano de publicação</label>
        <input
          className={styles.input}
          type="number"
          value={ano_publicacao}
          onChange={(e) => setAnoPublicacao(e.target.value)}
        />

        <label className={styles.label}>ISBN</label>
        <input
          className={styles.input}
          type="text"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          required
        />

        <label className={styles.label}>Gênero</label>
        <select
          className={styles.input}
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
        >
          <option value="">Selecione o gênero</option>
          <option value="Romance">Romance</option>
          <option value="Programação">Programação</option>
          <option value="Fantasia">Fantasia</option>
          <option value="Autoajuda">Autoajuda</option>
        </select>

        <label className={styles.label}>URL da capa</label>
        <input
          className={styles.input}
          type="text"
          value={urlCapa}
          onChange={(e) => setUrlCapa(e.target.value)}
        />

        <label className={styles.label}>Avaliação</label>
        <div className={styles.stars}>
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={i < avaliacao ? styles.starFull : styles.starEmpty}
              onClick={() => setAvaliacao(i + 1)}
              style={{ cursor: "pointer" }}
            >
              ★
            </span>
          ))}
        </div>

        <label className={styles.label}>📖 Está lendo?</label>
        <select
          className={styles.input}
          value={lendo ? "sim" : "nao"}
          onChange={(e) => setLendo(e.target.value === "sim")}
        >
          <option value="nao">Não</option>
          <option value="sim">Sim</option>
        </select>

        <label className={styles.label}>📘 Total de páginas</label>
        <input
          className={styles.input}
          type="number"
          min="0"
          value={paginasTotal}
          onChange={(e) => setPaginasTotal(Number(e.target.value))}
        />

        <label className={styles.label}>📗 Páginas lidas</label>
        <input
          className={styles.input}
          type="number"
          min="0"
          max={paginasTotal}
          value={paginasLidas}
          onChange={(e) => setPaginasLidas(Number(e.target.value))}
        />

        <label className={styles.label}>🎯 Finalidade</label>
        <input
          className={styles.input}
          type="text"
          value={finalidade}
          onChange={(e) => setFinalidade(e.target.value)}
          placeholder="Ex: estudo, lazer..."
        />

        <button className={styles.button} type="submit">
          {editandoId ? "Salvar Alterações" : "Adicionar Livro"}
        </button>
      </form>

      {/* --- Filtros --- */}
    <div className={styles.filtersContainer}>
  <input
    type="text"
    className={styles.searchInput}
    placeholder="Buscar por título ou autor"
    value={query}
    onChange={(e) => setQuery(e.target.value)}
  />

  <select
    className={styles.selectGenero}
    value={filtroGenero}
    onChange={(e) => setFiltroGenero(e.target.value)}
  >
    <option value="">Todos os gêneros</option>
    <option value="Fantasia">Fantasia</option>
    <option value="Romance">Romance</option>
    <option value="Drama">Drama</option>
    <option value="Tecnologia">Tecnologia</option>
  </select>
</div>

     {/* --- Cards --- */}
<div className={styles.grid}>
  {livrosFiltrados.map((livro) => (
    <div key={livro.id} className={styles.card}>
      {livro.url_capa ? (
        <img
          src={livro.url_capa}
          alt="Capa do livro"
          className={styles.image}
        />
      ) : (
        <div className={styles.noCover}>Sem capa</div>
      )}

      <div className={styles.bookTitle}>{livro.titulo}</div>
      <div className={styles.bookAuthor}>
        {livro.autor} • {livro.ano_publicacao}
      </div>

      {/* Finalidade */}
      {livro.finalidade && (
        <div className={styles.bookPurpose}>
          🎯 {livro.finalidade}
        </div>
      )}

      {/* Avaliação */}
      <div className={styles.rating}>
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={i < livro.avaliacao ? styles.starFull : styles.starEmpty}
          >
            ★
          </span>
        ))}
      </div>

      <div className={styles.actions}>
        <button
          onClick={() => {
            setEditandoId(livro.id);
            setTitulo(livro.titulo);
            setAutor(livro.autor);
            setGenero(livro.genero);
            setAnoPublicacao(String(livro.ano_publicacao));
            setIsbn(livro.isbn);
            setUrlCapa(livro.url_capa || "");
            setAvaliacao(livro.avaliacao);
            setLendo(livro.lendo);
            setPaginasTotal(livro.paginas_total);
            setPaginasLidas(livro.paginas_lidas);
            setFinalidade(livro.finalidade || "");

            // 🔽 Rolagem suave até o formulário
            formRef.current?.scrollIntoView({ behavior: "smooth" });
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

      {/* --- Modal --- */}
      {livroSelecionado && (
        <div
          className={styles.modalOverlay}
          onClick={() => setLivroSelecionado(null)}
        >
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.modalClose}
              onClick={() => setLivroSelecionado(null)}
            >
              ✖
            </button>
            <h3 className={styles.modalTitle}>{livroSelecionado.titulo}</h3>
            {livroSelecionado.url_capa && (
              <img
                src={livroSelecionado.url_capa}
                alt="Capa do livro"
                style={{ width: "100%", borderRadius: "8px", marginBottom: "1rem" }}
              />
            )}
            <p><b>Autor:</b> {livroSelecionado.autor}</p>
            <p><b>Ano:</b> {livroSelecionado.ano_publicacao}</p>
            <p><b>Gênero:</b> {livroSelecionado.genero}</p>
            <p><b>ISBN:</b> {livroSelecionado.isbn}</p>
            <p><b>Lendo:</b> {livroSelecionado.lendo ? "Sim" : "Não"}</p>
            <p><b>Páginas:</b> {livroSelecionado.paginas_lidas}/{livroSelecionado.paginas_total}</p>
            <p><b>Finalidade:</b> {livroSelecionado.finalidade}</p>
            <p><b>Avaliação:</b> {livroSelecionado.avaliacao}</p>
          </div>
        </div>
      )}

      <div className={styles.footerButtons}>
        <Link className={styles.linkBtn} href="/landing">Ir para Minha Estante</Link>
        <Link className={styles.linkBtn} href="/login">Sair</Link>
      </div>
    </section>
  );
}

function isAxiosError(error: unknown): error is { response?: { data?: { error?: string } } } {
  return (
    typeof error === "object" &&
    error !== null &&
    "response" in error
  );
}
