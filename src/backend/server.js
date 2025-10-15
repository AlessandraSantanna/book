import express from "express";
import cors from "cors";
import pool from "./db.js";
import livrosRouter from "./routes/livros.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use("/api/livros", livrosRouter);

// Rota raiz
app.get("/", (req, res) => {
  res.send("✅ API do Book está online!");
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
