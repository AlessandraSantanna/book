import { BookOpen, Search, LayoutDashboard } from "lucide-react";
import Link from "next/link";

export default function Funcionalidades() {
  return (
    <section className="funcionalidades">
      <h2 className="sectionTitle">⚙ Funcionalidades</h2>

      <div className="funcionalidadesGrid">
        {/* Cadastro de Livros */}
        <Link href="/cadLivro" className="funcionalidadeCard">
          <BookOpen size={40} className="funcionalidadeIcon" />
          <h3 className="funcionalidadeTitle">Cadastro de Livros</h3>
          <p className="funcionalidadeText">
            Título, autor, editora, gênero, capa e mais.
          </p>
        </Link>

        {/* Busca e Filtros */}
        <Link href="/cadLivro" className="funcionalidadeCard">
          <Search size={40} className="funcionalidadeIcon" />
          <h3 className="funcionalidadeTitle">Busca e Filtros</h3>
          <p className="funcionalidadeText">
            Organize por gênero, autor ou status de leitura.
          </p>
        </Link>

        {/* Estantes Personalizadas */}
        <Link href="/cadLivro" className="funcionalidadeCard">
          <LayoutDashboard size={40} className="funcionalidadeIcon" />
          <h3 className="funcionalidadeTitle">Estantes Personalizadas</h3>
          <p className="funcionalidadeText">
            Crie coleções como Favoritos, Clássicos ou Para Estudar.
          </p>
        </Link>
      </div>
    </section>
  );
}
