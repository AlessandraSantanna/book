"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";
import Link from "next/link";

const inputClassName =
  "w-full rounded-lg border border-pink-300 p-2 focus:border-pink-500 focus:ring-2 focus:ring-pink-400 outline-none";

export default function Login() {
  const [state, formAction, isPending] = useActionState(loginAction, {
    message: "",
    sucesso: false,
  });

  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-pink-100 text-black">
      {/* Lado esquerdo: mensagem promocional */}
      <section className="flex flex-col justify-center items-center bg-pink-200 p-10 text-center">
        <h1 className="text-4xl font-bold text-pink-800 mb-4">📚 Organize sua leitura!</h1>
        <p className="text-lg text-pink-900 max-w-md mb-6">
          O BookShelf é um sistema 100% online para gerenciar sua biblioteca pessoal.
          Cadastre-se gratuitamente e comece agora mesmo a organizar seus livros.
        </p>
        <div className="flex gap-4">
          
          <Link
            href="/cadastro"
            className="bg-white text-pink-600 border border-pink-600 px-6 py-2 rounded-full hover:bg-pink-50 transition"
          >
            Cadastre-se
          </Link>
        </div>
      </section>

      {/* Lado direito: formulário de login */}
      <section className="flex flex-col justify-center items-center bg-white p-10">
        <form
          action={formAction}
          className="w-full max-w-sm rounded-xl bg-white p-6 shadow-md flex flex-col gap-4"
        >
          <h2 className="text-3xl font-bold text-pink-700 mb-4 text-center">Acesse</h2>

          <input
            type="text"
            name="email"
            placeholder="Usuário ou e-mail"
            className={inputClassName}
          />

          <input
            type="password"
            name="senha"
            placeholder="Senha"
            className={inputClassName}
          />

          <button
            type="submit"
            className="bg-pink-600 text-white py-2 rounded hover:bg-pink-400 transition"
          >
            {isPending ? "Entrando..." : "Entrar"}
          </button>

          <div className="text-right text-sm">
            <Link href="/esqueci-senha" className="text-pink-600 hover:underline">
              Esqueci a senha
            </Link>
          </div>

          {state?.message && (
            <p className="text-center text-pink-700 mt-2">{state.message}</p>
          )}
        </form>
      </section>
    </main>
  );
}
