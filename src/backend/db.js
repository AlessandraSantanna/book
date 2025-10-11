
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const connection = await mysql.createPool(process.env.DATABASE_URL);
const pool = mysql.createPool({
  uri: process.env.DATABASE_URL,
});

export default connection;






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