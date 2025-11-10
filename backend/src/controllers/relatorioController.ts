import { Request, Response } from 'express';
import { supabase } from '../services/supabaseClient';

export const getRelatorios = async (req: Request, res: Response) => {
  const { data, error } = await supabase.from('relatorios').select('*');
  if (error) return res.status(500).json({ error: error.message });
  return res.json(data);
};

export const getRelatorioById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('relatorios').select('*').eq('id', Number(id)).single();
  if (error || !data) return res.status(404).json({ error: 'Relatório não encontrado' });
  return res.json(data);
};

export const createRelatorio = async (req: Request, res: Response) => {
  const { assunto, body, tipo, pacienteId } = req.body;
  const { data, error } = await supabase
    .from('relatorios')
    .insert([{ assunto, body, tipo, paciente_id: pacienteId }])
    .select();
  if (error) return res.status(500).json({ error: error.message });
  if (!data) return res.status(500).json({ error: 'Erro ao criar relatório' });
  return res.status(201).json(data[0]);
};

export const updateRelatorio = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { assunto, body, tipo, pacienteId } = req.body;
  console.log('Controller update, id:', id, typeof id);
  const { data, error } = await supabase
    .from('relatorios')
    .update({ assunto, body, tipo, paciente_id: pacienteId })
    .eq('id', Number(id))
    .select();

  if (error) return res.status(500).json({ error: error.message });
  if (!data || data.length === 0) return res.status(404).json({ error: 'Relatório não encontrado' });
  return res.status(200).json(data[0]);
};

export const removeRelatorio = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log('Controller delete, id:', id, typeof id);
  const { error, count } = await supabase
    .from('relatorios')
    .delete({ count: 'exact' })
    .eq('id', Number(id));

  if (error) return res.status(500).json({ error: error.message });
  if (count === 0) return res.status(404).json({ error: 'Relatório não encontrado' });
  return res.status(204).send();
};