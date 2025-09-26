import styles from "./login.module.css";

export default function Login() {
  return (
    <main className={styles.main}>
      <section className={styles.sectionLeft}>
        <h1>📚 Organize sua leitura!</h1>
        <p>O BookShelf é um sistema 100% online para gerenciar sua biblioteca pessoal.
           Cadastre-se gratuitamente e comece agora mesmo a organizar seus livros.</p>
      </section>

      <section className={styles.sectionRight}>
        <form className={styles.form}>
          <h2>Acesse</h2>

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

          <button type="submit" className={styles.button}>
            Entrar
          </button>

          <div className={styles.linkRight}>
            <a href="/esqueci-senha">Esqueci a senha</a>
          </div>
        </form>
      </section>
    </main>
  );
}
