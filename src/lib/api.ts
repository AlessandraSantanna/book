import axios from "axios";

const api = axios.create({
  baseURL: "https://book-vt3q.onrender.com", // 👈 backend hospedado no Render
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
