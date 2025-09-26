// components/ThemeToggleScript.tsx
"use client";
import { useEffect } from "react";

export default function ThemeToggleScript() {
  useEffect(() => {
    const html = document.documentElement;
    const botao = document.getElementById("themeToggle");

    // Aplica o tema salvo
    const temaSalvo = localStorage.getItem("tema");
    if (temaSalvo === "dark") {
      html.classList.add("dark");
    }

    // Alterna o tema ao clicar no botão
    if (botao) {
      botao.addEventListener("click", () => {
        html.classList.toggle("dark");
        const temaAtual = html.classList.contains("dark") ? "dark" : "light";
        localStorage.setItem("tema", temaAtual);
      });
    }
  }, []);

  return null; // este componente só executa JS
}
