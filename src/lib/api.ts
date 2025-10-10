import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api", // ✅ inclui o /api prefixo});
  });

export default api;
