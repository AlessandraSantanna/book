// routes/livros.js
import express from "express";
import pool from "../db.js";

const router = express.Router();

// LISTAR
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM livros");
    res.json(result.rows);
  } catch (err) {
    console.error("Erro ao listar livros:", err);
    res.status(500).json({ error: "Erro ao buscar livros" });
  }
});

// CRIAR
router.post("/", async (req, res) => {
  try {
    const {
      titulo = "",
      autor = "",
      genero = null,
      ano_publicacao = null,
      isbn = "",
      url_capa = null,
      avaliacao = 0,
      lendo = false,
      paginas_total = 0,
      paginas_lidas = 0,
      finalidade = null,
    } = req.body;

    if (!titulo.trim() || !autor.trim() || !isbn.trim()) {
      return res.status(400).json({ error: "titulo, autor e isbn são obrigatórios" });
    }

    const insertQuery = `
      INSERT INTO livros
      (titulo, autor, genero, ano_publicacao, isbn, url_capa, avaliacao, lendo, paginas_total, paginas_lidas, finalidade)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *;
    `;

    const values = [
      titulo.trim(),
      autor.trim(),
      genero,
      ano_publicacao ? Number(ano_publicacao) : null,
      isbn.trim(),
      url_capa || null,
      Number(avaliacao) || 0,
      lendo ? true : false,
      Number(paginas_total) || 0,
      Number(paginas_lidas) || 0,
      finalidade || null,
    ];

    const result = await pool.query(insertQuery, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Erro ao cadastrar livro:", err);
    res.status(500).json({ error: "Erro ao cadastrar livro" });
  }
});

// ATUALIZAR
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      titulo = "",
      autor = "",
      genero = null,
      ano_publicacao = null,
      isbn = "",
      url_capa = null,
      avaliacao = 0,
      lendo = false,
      paginas_total = 0,
      paginas_lidas = 0,
      finalidade = null,
    } = req.body;

    const verifica = await pool.query("SELECT id FROM livros WHERE id = $1", [id]);
    if (verifica.rows.length === 0)
      return res.status(404).json({ error: "Livro não encontrado" });

    const updateQuery = `
      UPDATE livros SET
        titulo=$1, autor=$2, genero=$3, ano_publicacao=$4, isbn=$5, url_capa=$6,
        avaliacao=$7, lendo=$8, paginas_total=$9, paginas_lidas=$10, finalidade=$11
      WHERE id=$12
      RETURNING *;
    `;

    const values = [
      titulo.trim(),
      autor.trim(),
      genero,
      ano_publicacao ? Number(ano_publicacao) : null,
      isbn.trim(),
      url_capa || null,
      Number(avaliacao) || 0,
      lendo ? true : false,
      Number(paginas_total) || 0,
      Number(paginas_lidas) || 0,
      finalidade || null,
      id,
    ];

    const result = await pool.query(updateQuery, values);
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Erro ao atualizar livro:", err);
    res.status(500).json({ error: "Erro ao atualizar livro" });
  }
});

// EXCLUIR
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const verifica = await pool.query("SELECT id FROM livros WHERE id = $1", [id]);
    if (verifica.rows.length === 0)
      return res.status(404).json({ error: "Livro não encontrado" });

    await pool.query("DELETE FROM livros WHERE id = $1", [id]);
    res.status(204).send();
  } catch (err) {
    console.error("Erro ao excluir livro:", err);
    res.status(500).json({ error: "Erro ao excluir livro" });
  }
});

export default router;
