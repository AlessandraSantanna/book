import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // vai pegar do .env
  headers: { "Content-Type": "application/json" },
});

export default api;
