"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";
import Link from "next/link";
import styles from "./login.module.css";

export default function Login() {
  const [state, formAction, isPending] = useActionState(loginAction, {
    message: "",
    sucesso: false,
  });

  return (
    <main className={styles.main}>
      {/* Lado esquerdo com imagem de fundo rosa */}
      <section className={styles.leftSection}>
        <h1 className={styles.title}>📚 Organize sua leitura!</h1>
        <p className={styles.description}>
          O BookShelf é um sistema 100% online para gerenciar sua biblioteca pessoal.
          Cadastre-se gratuitamente e comece agora mesmo a organizar seus livros.
        </p>
        <div className={styles.buttonGroup}>
          <Link href="/cadastro" className={styles.signupButton}>
            Cadastre-se
          </Link>
        </div>
      </section>

      {/* Lado direito: formulário de login */}
      <section className={styles.rightSection}>
        <form action={formAction} className={styles.form}>
          <h2 className={styles.formTitle}>Acesse</h2>

          <input
            type="text"
            name="email"
            placeholder="Usuário ou e-mail"
            className={styles.input}
          />

          <input
            type="password"
            name="senha"
            placeholder="Senha"
            className={styles.input}
          />

          <button type="submit" className={styles.submitButton}>
            {isPending ? "Entrando..." : "Entrar"}
          </button>

          <div className={styles.forgotPassword}>
            <Link href="/cadastro">Esqueci a senha</Link>
          </div>

          {state?.message && (
            <p className={styles.message}>{state.message}</p>
          )}
        </form>
      </section>
    </main>
  );
}
