// server.js
import express from "express";
import cors from "cors";
import livrosRoutes from "./routes/livros.js";
import pool from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/livros", livrosRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
  try {
    await pool.query("SELECT NOW()");
    console.log("✅ Conectado ao PostgreSQL Render com sucesso!");
  } catch (err) {
    console.error("Erro ao conectar ao banco:", err);
  }
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
});

