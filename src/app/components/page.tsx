"use client";

import Link from "next/link";
import { BookOpen, Search, LayoutDashboard } from "lucide-react";

export default function BookShelfLanding() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 to-pink-600 text-pink-600 font-sans">
      {/* Hero Section */}
      <section className="text-center py-20 px-6">
        <h1 className="text-5xl font-bold mb-4">📚 BookShelf</h1>
        <p className="text-xl max-w-2xl mx-auto">
          Gerencie sua biblioteca pessoal com estilo. Cadastre, organize e acompanhe seus livros com uma interface moderna e intuitiva.
        </p>
        <div className="mt-8">
          <Link
            href="/bookshelf/app"
            className="bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-pink-700 transition"
          >
            Começar agora
          </Link>
        </div>
      </section>

      {/* Funcionalidades */}
      <section className="py-16 px-6 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12">⚙ Funcionalidades</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-pink-50 p-6 rounded-lg shadow-md text-center">
            <BookOpen size={40} className="mx-auto mb-4 text-pink-600" />
            <h3 className="text-xl font-semibold mb-2">Cadastro de Livros</h3>
            <p>Título, autor, editora, gênero, capa, páginas e mais.</p>
          </div>
          <div className="bg-pink-50 p-6 rounded-lg shadow-md text-center">
            <Search size={40} className="mx-auto mb-4 text-pink-600" />
            <h3 className="text-xl font-semibold mb-2">Busca e Filtros</h3>
            <p>Organize por gênero, autor ou status de leitura.</p>
          </div>
          <div className="bg-pink-50 p-6 rounded-lg shadow-md text-center">
            <LayoutDashboard size={40} className="mx-auto mb-4 text-pink-600" />
            <h3 className="text-xl font-semibold mb-2">Estantes Personalizadas</h3>
            <p>Crie coleções como Favoritos, Clássicos ou Para Estudar.</p>
          </div>
        </div>
      </section>

      {/* Tecnologias */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">🧰 Tecnologias</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center text-pink-800 font-medium">
          <span>React</span>
          <span>Next.js</span>
          <span>TailwindCSS</span>
          <span>Node.js</span>
          <span>PostgreSQL</span>
          <span>MongoDB</span>
          <span>JWT / NextAuth</span>
          <span>Google Books API</span>
        </div>
      </section>

      {/* Público-Alvo */}
      <section className="py-16 px-6 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12">👥 Público-Alvo</h2>
        <ul className="list-disc list-inside max-w-3xl mx-auto text-lg space-y-2">
          <li>Leitores que desejam organizar sua biblioteca pessoal</li>
          <li>Estudantes que acompanham leituras acadêmicas</li>
          <li>Pessoas que registram hábitos e progresso de leitura</li>
        </ul>
      </section>

      {/* Diferenciais */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">🚀 Diferenciais</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-pink-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Visual Minimalista</h3>
            <p>Design limpo e intuitivo para foco total na leitura.</p>
          </div>
          <div className="bg-pink-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Progresso de Leitura</h3>
            <p>Acompanhe páginas lidas e percentual concluído.</p>
          </div>
          <div className="bg-pink-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Estantes Customizadas</h3>
            <p>Organize seus livros por temas, estilos ou objetivos.</p>
          </div>
          <div className="bg-pink-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Expansível</h3>
            <p>Preparado para integração com APIs externas e redes sociais.</p>
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="bg-pink-700 text-white py-6 text-center">
        <p>© 2025 BookShelf by Alessandra. Todos os direitos reservados.</p>
      </footer>
    </main>
  );
}
