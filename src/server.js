import express from "express";
import cors from "cors";
import livrosRoutes from "./routes/livros.js";

const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.get("/", (req, res) => {
  res.send("Servidor está funcionando! 🚀");
});
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
