import axios from "axios";

// 👉 Força a URL do backend hospedado no Render
const api = axios.create({
  baseURL: "https://book-vt3q.onrender.com/api",
  headers: { "Content-Type": "application/json" },
});

// Adiciona log para conferir se está pegando a URL correta
console.log("🔍 Base URL da API:", api.defaults.baseURL);

export default api;
