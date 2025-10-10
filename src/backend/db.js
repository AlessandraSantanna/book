import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: "localhost",
  user: "root",        // seu usuário MySQL
  password: "123456", // sua senha
  database: "estante_livros",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

console.log("✅ Conexão com o MySQL configurada (usando pool).");