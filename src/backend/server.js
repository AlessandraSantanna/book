import express from "express";
import cors from "cors";
import pool from "./db.js";
import livrosRouter from "./routes/livros.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: [
      "https://book-three-neon.vercel.app", // frontend na Vercel
                   // dev local
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());
app.use("/api/livros", livrosRouter);

app.get("/", (req, res) => {
  res.send("✅ API do Book está online!");
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
