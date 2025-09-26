"use client";
import styles from "./Cadastro.module.css";
import { useEffect, useState } from "react";

export default function ThemeToggleButton() {
  const [tema, setTema] = useState<"light" | "dark">(() => {
    // inicializador seguro (rodará só no client)
    if (typeof window === "undefined") return "light";
    const saved = localStorage.getItem("tema") as "light" | "dark" | null;
    if (saved) return saved;
    // opcional: respeitar preferência do sistema
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  });

  // quando 'tema' mudar, atualiza classe no <html> e localStorage
  useEffect(() => {
    if (tema === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("tema", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("tema", "light");
    }
  }, [tema]);

  const alternarTema = () => {
    setTema((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
   
 <button
  type="button"
  onClick={alternarTema}
  aria-label="Alternar tema"
  className="fixed top-4 right-4 z-[9999] bg-pink-700 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-md hover:opacity-80 transition"
>
  {tema === "dark" ? "☀️" : "🌙"}
</button>
  );
}