import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// 📚 Listar todos os livros
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM livros");
    res.json(rows);
  } catch (err) {
    console.error("Erro ao listar livros:", err);
    res.status(500).json({ error: "Erro ao buscar livros" });
  }
});

// ➕ Criar novo livro
router.post("/", async (req, res) => {
  try {
    const { titulo, autor, genero, ano_publicacao, isbn, url_capa, avaliacao } = req.body;

    if (!titulo?.trim() || !autor?.trim() || !isbn?.trim()) {
      return res.status(400).json({ error: "Campos obrigatórios ausentes." });
    }

    const [result] = await pool.query(
      "INSERT INTO livros (titulo, autor, genero, ano_publicacao, isbn, url_capa, avaliacao) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [titulo, autor, genero, ano_publicacao, isbn, url_capa, avaliacao]
    );

    res.status(201).json({
      id: result.insertId,
      titulo,
      autor,
      genero,
      ano_publicacao,
      isbn,
      url_capa,
      avaliacao,
    });
  } catch (err) {
    console.error("Erro ao cadastrar livro:", err);
    res.status(500).json({ error: "Erro ao cadastrar livro" });
  }
});

// ✏️ Atualizar livro
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, autor, genero, ano_publicacao, isbn, url_capa, avaliacao } = req.body;

    const [verifica] = await pool.query("SELECT * FROM livros WHERE id=?", [id]);
    if (verifica.length === 0) {
      return res.status(404).json({ error: "Livro não encontrado." });
    }

    await pool.query(
      "UPDATE livros SET titulo=?, autor=?, genero=?, ano_publicacao=?, isbn=?, url_capa=?, avaliacao=? WHERE id=?",
      [titulo, autor, genero, ano_publicacao, isbn, url_capa, avaliacao, id]
    );

    res.json({
      id,
      titulo,
      autor,
      genero,
      ano_publicacao,
      isbn,
      url_capa,
      avaliacao,
    });
  } catch (err) {
    console.error("Erro ao atualizar livro:", err);
    res.status(500).json({ error: "Erro ao atualizar livro" });
  }
});

// 🗑️ Excluir livro
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM livros WHERE id=?", [id]);
    res.json({ message: "Livro excluído com sucesso" });
  } catch (err) {
    console.error("Erro ao excluir livro:", err);
    res.status(500).json({ error: "Erro ao excluir livro" });
  }
});

export default router;
