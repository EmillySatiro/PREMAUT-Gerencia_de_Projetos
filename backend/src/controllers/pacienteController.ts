import { Request, Response } from "express";
import { supabase } from "../lib/supabaseClient";

export const getPacientes = async (req: Request, res: Response) => {
  const { data, error } = await supabase.from("pacientes").select("*");
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

export const getPacientePorId = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { data, error } = await supabase.from("pacientes").select("*").eq("id", id).single();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

export const postPaciente = async (req: Request, res: Response) => {
  const { nome, genero, nivel_suporte, nascimento, comodidade, telefone, email, remedios, estereotipia, reforco_positivo, reforco_negativo } = req.body;

  const { data, error } = await supabase.from("pacientes").insert([
    { nome, genero, nivel_suporte, nascimento, comodidade, telefone, email, remedios, estereotipia, reforco_positivo, reforco_negativo },
  ]);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

export const deletePaciente = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { error } = await supabase.from("pacientes").delete().eq("id", id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: "Paciente deletado com sucesso" });
};
