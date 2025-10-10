"use client";
import styles from "./Cadastro.module.css";
import { useEffect, useState } from "react";

export default function ThemeToggleButton() {
  const [mounted, setMounted] = useState(false);
  const [tema, setTema] = useState<"light" | "dark">("light");

  useEffect(() => {
    setMounted(true);

    const saved = localStorage.getItem("tema") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const initial = saved || (prefersDark ? "dark" : "light");
    setTema(initial);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (tema === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("tema", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("tema", "light");
    }
  }, [tema, mounted]);

  const alternarTema = () => {
    setTema((prev) => (prev === "dark" ? "light" : "dark"));
  };

  if (!mounted) return null;

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
