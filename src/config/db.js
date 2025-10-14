import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // ✅ usa variável do Render
  ssl: {
    rejectUnauthorized: false, // obrigatório para Render/PostgreSQL
  },
});

pool
  .connect()
  .then(() => console.log("✅ Conectado ao PostgreSQL Render com sucesso!"))
  .catch((err) => console.error("❌ Erro ao conectar ao banco:", err));

export default pool;
