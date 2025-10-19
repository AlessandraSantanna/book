"use client";

import { useEffect, useState, useRef } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import styles from "./cadBiblioteca.module.css";
import api from "@/lib/api";
import { Livro } from "@/types/livro";
import { isAxiosError } from "axios";

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

        {/* Campos do formulário */}
        {/* ... (mantém os inputs como estão, sem alterações) */}

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
              <Image
                src={livro.url_capa}
                alt={`Capa do livro ${livro.titulo}`}
                width={200}
                height={300}
                className={styles.image}
              />
            ) : (
              <div className={styles.noCover}>Sem capa</div>
            )}

            <div className={styles.bookTitle}>{livro.titulo}</div>
            <div className={styles.bookAuthor}>
              {livro.autor} • {livro.ano_publicacao}
            </div>

            {livro.finalidade && (
              <div className={styles.bookPurpose}>🎯 {livro.finalidade}</div>
            )}

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
                aria-label="Editar livro"
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
                  formRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <Pencil size={20} />
              </button>

              <button aria-label="Excluir livro" onClick={() => excluirLivro(livro.id)}>
                <Trash2 size={20} />
              </button>

              <button aria-label="Visualizar livro" onClick={() => setLivroSelecionado(livro)}>
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
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.modalClose}
              onClick={() => setLivroSelecionado(null)}
            >
              ✖
            </button>
            <h3 className={styles.modalTitle}>{livroSelecionado.titulo}</h3>
            {livroSelecionado.url_capa && (
            <Image
              src={livroSelecionado.url_capa}
              alt={`Capa do livro ${livroSelecionado.titulo}`}
              width={200}
              height={300}
              className={styles.image}
/>
            )}
            <p><b>Autor:</b> {livroSelecionado.autor}</p>
            <p><b>Ano:</b> {livroSelecionado.ano_publicacao}</p>
            <p><b>Gênero:</b> {livroSelecionado.genero}</p>
            <p><b>ISBN:</b> {livroSelecionado.isbn}</p>
            <p><b>Lendo:</b> {livroSelecionado.lendo ? "Sim" : "Não"}</p>
            <p>
              <b>Páginas:</b>{" "}
              {livroSelecionado.paginas_lidas}/{livroSelecionado.paginas_total}
            </p>
            <p><b>Finalidade:</b> {livroSelecionado.finalidade}</p>
            <p><b>Avaliação:</b> {livroSelecionado.avaliacao}</p>
          </div>
        </div>
      )}

      <div className={styles.footerButtons}>
        <Link className={styles.linkBtn} href="/landing">
          Ir para Minha Estante
        </Link>
        <Link className={styles.linkBtn} href="/login">
          Sair
        </Link>
      </div>
    </section>
  );
}
