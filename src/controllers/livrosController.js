import pool from "../config/db.js";

// Listar todos
export const getLivros = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM livros");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Criar
export const createLivro = async (req, res) => {
  try {
    const { titulo, autor, ano, genero, capa, avaliacao } = req.body;
    const [result] = await pool.query(
      "INSERT INTO livros (titulo, autor, ano, genero, capa, avaliacao) VALUES (?, ?, ?, ?, ?, ?)",
      [titulo, autor, ano, genero, capa, avaliacao]
    );
    res.json({ id: result.insertId, titulo, autor, ano, genero, capa, avaliacao });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Atualizar
export const updateLivro = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, autor, ano, genero, capa, avaliacao } = req.body;
    await pool.query(
      "UPDATE livros SET titulo=?, autor=?, ano=?, genero=?, capa=?, avaliacao=? WHERE id=?",
      [titulo, autor, ano, genero, capa, avaliacao, id]
    );
    res.json({ id, titulo, autor, ano, genero, capa, avaliacao });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Deletar
export const deleteLivro = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM livros WHERE id=?", [id]);
    res.json({ message: "Livro deletado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
