import express from "express";
import cors from "cors";
import { pool } from "./db.js";
import livrosRouter from "./routes/livros.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/livros", livrosRouter);

app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});
