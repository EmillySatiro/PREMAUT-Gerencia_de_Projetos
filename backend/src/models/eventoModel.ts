import { supabase } from "../lib/supabaseClient";

export interface Evento {
  id?: number;
  titulo: string;
  data: string; // formato YYYY-MM-DD
  localizacao: string;
  descricao: string;
}

// Criar novo evento
export async function criarEvento(evento: Evento): Promise<Evento> {
  const { data, error } = await supabase
    .from("eventos")
    .insert(evento)
    .select()
    .single();

  if (error) throw error;
  return data as Evento;
}

// Listar todos os eventos
export async function listarEventos(): Promise<Evento[]> {
  const { data, error } = await supabase.from("eventos").select("*");
  if (error) throw error;
  return data as Evento[];
}

// Buscar evento por ID
export async function buscarEventoPorId(id: number): Promise<Evento | null> {
  const { data, error } = await supabase
    .from("eventos")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data as Evento;
}

// Deletar evento
export async function deletarEvento(id: number): Promise<void> {
  const { error } = await supabase.from("eventos").delete().eq("id", id);
  if (error) throw error;
}
