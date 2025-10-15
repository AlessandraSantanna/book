import pkg from 'pg';
const { Pool } = pkg;

// URL de conexão que você forneceu
const pool = new Pool({
  connectionString: 'postgresql://bookdb_orp5_user:QfpV00AwioM6Qx3hEGAV0WMAn6NK4NB3@dpg-d3mqgfj3fgac73a1c0g0-a.oregon-postgres.render.com:5432/bookdb_orp5',
  ssl: {
    rejectUnauthorized: false, // necessário para algumas conexões remotas
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