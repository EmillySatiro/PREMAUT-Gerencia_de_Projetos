import { supabase } from "../lib/supabaseClient";

export interface Paciente {
  id?: string;
  nome: string;
  genero?: string;
  nivel_suporte?: string;
  nascimento?: string;
  comodidade?: string;
  telefone?: string;
  email?: string;
  remedios?: string;
  estereotipia?: string;
  reforco_positivo?: string;
  reforco_negativo?: string;
}

// Criar paciente
export async function criarPaciente(paciente: Paciente) {
  const { data, error } = await supabase.from("pacientes").insert([paciente]);
  if (error) throw new Error(error.message);
  return data;
}

// Listar todos os pacientes
export async function listarPacientes() {
  const { data, error } = await supabase.from("pacientes").select("*");
  if (error) throw new Error(error.message);
  return data;
}

// Buscar paciente por ID
export async function buscarPacientePorId(id: string) {
  const { data, error } = await supabase.from("pacientes").select("*").eq("id", id).single();
  if (error) throw new Error(error.message);
  return data;
}

// Deletar paciente
export async function deletarPaciente(id: string) {
  const { error } = await supabase.from("pacientes").delete().eq("id", id);
  if (error) throw new Error(error.message);
  return { message: "Paciente deletado com sucesso" };
}
