import { BookOpen, Search, LayoutDashboard } from "lucide-react";
import Link from "next/link";


export default function Funcionalidades() {
  return (
   <section className="py-0 px-6 bg-white">
  <h2 className="text-3xl font-bold text-center mb-12">⚙ Funcionalidades</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
    {/* Cadastro de Livros */}
    <Link href="/cadLivro">
      <div className="cursor-pointer bg-pink-50 p-6 rounded-lg shadow-md text-center hover:scale-105 transition-transform duration-300">
        <BookOpen size={40} className="mx-auto mb-4 text-pink-600" />
        <h3 className="text-xl font-semibold mb-2">Cadastro de Livros</h3>
        <p className="text-gray-700">
          Título, autor, editora, gênero, capa, páginas e mais.
        </p>
      </div>
    </Link>
 

        {/* Busca e Filtros */}
          <Link href="/cadLivro">
        <div className="bg-pink-50 p-6 rounded-lg shadow-md text-center hover:scale-105 transition-transform duration-300">
          <Search size={40} className="mx-auto mb-4 text-pink-600" />
          <h3 className="text-xl font-semibold mb-2">Busca e Filtros</h3>
          <p className="text-gray-700">
            Organize por gênero, autor ou status de leitura.
          </p>
        </div>
            </Link>
        {/* Estantes Personalizadas */}
        <Link href="/cadLivro">
        <div className="bg-pink-50 p-6 rounded-lg shadow-md text-center hover:scale-105 transition-transform duration-300">
          <LayoutDashboard size={40} className="mx-auto mb-4 text-pink-600" />
          <h3 className="text-xl font-semibold mb-2">Estantes Personalizadas</h3>
          <p className="text-gray-700">
            Crie coleções como Favoritos, Clássicos ou Para Estudar.
          </p>
        </div>
        </Link>
      </div>
     
    </section>
    
  );
}
