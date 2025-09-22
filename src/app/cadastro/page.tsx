"use client";
import React, { useState } from "react";
import Link from "next/link";
import styles from "./Cadastro.module.css";

const Cadastro: React.FC = () => {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ nome, sobrenome, email, senha });
    alert("Cadastro enviado (simulação) — veja o console.");
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>✨ Cadastro</h1>
        <p className={styles.subtitle}>Crie sua conta e aproveite a plataforma</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            className={styles.input}
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <input
            className={styles.input}
            placeholder="Sobrenome"
            value={sobrenome}
            onChange={(e) => setSobrenome(e.target.value)}
            required
          />
          <input
            type="email"
            className={styles.input}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className={styles.input}
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          <button type="submit" className={styles.primaryBtn}>
            Criar Conta
          </button>
         <Link href="/login"
            className={styles.primaryBtn}>
            Ir para Home
          </Link>
          <p className={styles.smallText}>
            Já possui cadastro?{" "}
            <Link href="/login" className={styles.link}>
              Entrar
            </Link>
          </p>

          <div className={styles.separatorWrap}>
            <div className={styles.line} />
            <div className={styles.sepText}>Ou entre com</div>
            <div className={styles.line} />
          </div>

          <div className={styles.socials}>
            <button type="button" className={styles.socialBtnGoogle}>
              Google
            </button>
            <button type="button" className={styles.socialBtnFacebook}>
              Facebook
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;
