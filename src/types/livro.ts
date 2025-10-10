// src/types/livro.ts

export interface Livro {
  id: number;
  titulo: string;
  autor: string;
  genero: string;
  ano_publicacao: number;
  isbn: string;
  url_capa?: string;          // ✅ Adicionado para suportar capa
  avaliacao: number;
  lendo: boolean;
  paginas_total: number;
  paginas_lidas: number;
  finalidade?: string;
}
