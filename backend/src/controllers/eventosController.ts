import { Request, Response } from 'express';
import { supabase } from '../services/supabaseClient';

// Listar todos os eventos
export const getEventos = async (req: Request, res: Response) => {
  const { data, error } = await supabase.from('eventos').select('*');
  if (error) return res.status(500).json({ error: error.message });
  return res.json(data);
};

// Buscar evento por ID (Inteiro)
export const getEventoById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('eventos')
    .select('*')
    .eq('id', Number(id))
    .single();

  if (error || !data) return res.status(404).json({ error: 'Evento não encontrado' });
  return res.json(data);
};

// Criar novo evento
export const createEvento = async (req: Request, res: Response) => {
  const { titulo, data, localizacao, descricao, criador } = req.body;

  const { data: novoEvento, error } = await supabase
    .from('eventos')
    .insert([{ titulo, data, localizacao, descricao, criador }])
    .select();

  if (error) return res.status(500).json({ error: error.message });
  return res.status(201).json(novoEvento[0]);
};

// Atualizar evento
export const updateEvento = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;

  const { data, error } = await supabase
    .from('eventos')
    .update(updates)
    .eq('id', Number(id))
    .select();

  if (error) return res.status(500).json({ error: error.message });
  if (!data || data.length === 0) return res.status(404).json({ error: 'Evento não encontrado' });
  return res.status(200).json(data[0]);
};

// Deletar evento
export const removeEvento = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { error, count } = await supabase
    .from('eventos')
    .delete({ count: 'exact' })
    .eq('id', Number(id));

  if (error) return res.status(500).json({ error: error.message });
  if (count === 0) return res.status(404).json({ error: 'Evento não encontrado' });
  return res.status(204).send();
};