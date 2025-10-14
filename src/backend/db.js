import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;


/*import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql.createPool(process.env.DATABASE_URL + "?ssl={" + 
  JSON.stringify({ rejectUnauthorized: true }) + 
"}");

export default pool;

/*export const pool = mysql.createPool({
  host: "localhost",
  user: "root",        // seu usuário MySQL
  password: "123456", // sua senha
  database: "estante_livros",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

console.log("✅ Conexão com o MySQL configurada (usando pool).");*/