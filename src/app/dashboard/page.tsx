"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{ nome: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

 useEffect(() => {
  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith("user="))
    ?.split("=")[1];

  if (cookieValue) {
    try {
      const parsed = JSON.parse(decodeURIComponent(cookieValue));
      setUser(parsed);
      setIsLoading(false);

      // ⏳ Redireciona após 5 segundos
      setTimeout(() => {
        router.push("/landing"); // substitua com a rota desejada
      }, 3000);
    } catch (error) {
      console.error("Erro ao ler cookie:", error);
      router.replace("/landing");
    }
  } else {
    router.replace("/landing");
  }
}, [router]);


  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-pink-100">
        <p className="text-pink-600 text-xl font-semibold">Carregando...</p>
      </div>
    );
  }

  if (!user) return null; // evita piscar antes do redirect

  return (
    <div className="flex min-h-screen items-center justify-center bg-pink-100">
      <div className="bg-white shadow-lg rounded-3xl p-10 text-center max-w-md">
        <Image
          src="/Livros.jpg"
          alt="Livros"
          width={300}
          height={200}
          className="mx-auto mb-6 rounded-lg shadow"
        />
        <h1 className="text-3xl font-bold text-pink-600 mb-4">
          Boas vindas, {user.nome} ✨
        </h1>
        <p className="text-gray-600">Estamos felizes em ter você aqui 💖</p>
      </div>
    </div>
  );
}
