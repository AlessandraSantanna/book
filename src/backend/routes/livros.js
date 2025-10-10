// routes/livros.js 
import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// LISTAR (mantém)
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM livros");
    res.json(rows);
  } catch (err) {
    console.error("Erro ao listar livros:", err);
    res.status(500).json({ error: "Erro ao buscar livros" });
  }
});

// CRIAR
router.post("/", async (req, res) => {
  try {
    // parse e defaults seguros
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

    console.log("POST /livros payload:", req.body);

    // validação básica
    if (!titulo.trim() || !autor.trim() || !isbn.trim()) {
      return res.status(400).json({ error: "titulo, autor e isbn são obrigatórios" });
    }

    const [result] = await pool.query(
      `INSERT INTO livros 
       (titulo, autor, genero, ano_publicacao, isbn, url_capa, avaliacao, lendo, paginas_total, paginas_lidas, finalidade)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        titulo.trim(),
        autor.trim(),
        genero,
        ano_publicacao ? Number(ano_publicacao) : null,
        isbn.trim(),
        url_capa || null,
        Number(avaliacao) || 0,
        lendo ? 1 : 0,
        Number(paginas_total) || 0,
        Number(paginas_lidas) || 0,
        finalidade || null,
      ]
    );

    // pegar o registro recém-criado pra garantir formato de retorno
    const [rows] = await pool.query("SELECT * FROM livros WHERE id = ?", [result.insertId]);
    res.status(201).json(rows[0]);
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

    const [verifica] = await pool.query("SELECT id FROM livros WHERE id = ?", [id]);
    if (verifica.length === 0) return res.status(404).json({ error: "Livro não encontrado" });

    await pool.query(
      `UPDATE livros SET
         titulo=?, autor=?, genero=?, ano_publicacao=?, isbn=?, url_capa=?, avaliacao=?, lendo=?, paginas_total=?, paginas_lidas=?, finalidade=?
       WHERE id = ?`,
      [
        titulo.trim(),
        autor.trim(),
        genero,
        ano_publicacao ? Number(ano_publicacao) : null,
        isbn.trim(),
        url_capa || null,
        Number(avaliacao) || 0,
        lendo ? 1 : 0,
        Number(paginas_total) || 0,
        Number(paginas_lidas) || 0,
        finalidade || null,
        id,
      ]
    );

    const [rows] = await pool.query("SELECT * FROM livros WHERE id = ?", [id]);
    res.json(rows[0]);
  } catch (err) {
    console.error("Erro ao atualizar livro:", err);
    res.status(500).json({ error: "Erro ao atualizar livro" });
  }
  });
  // EXCLUIR

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [verifica] = await pool.query("SELECT id FROM livros WHERE id = ?", [id]);
    if (verifica.length === 0) {
      return res.status(404).json({ error: "Livro não encontrado" });
    }

    await pool.query("DELETE FROM livros WHERE id = ?", [id]);
    res.status(204).send(); // Sem conteúdo, mas sucesso
  } catch (err) {
    console.error("Erro ao excluir livro:", err);
    res.status(500).json({ error: "Erro ao excluir livro" });
  }
});



export default router;
