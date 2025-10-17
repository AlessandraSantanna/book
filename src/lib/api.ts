import axios from "axios";

const api = axios.create({
  baseURL: "https://book-vt3q.onrender.com/api", // 👈 backend hospedado no Render
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
