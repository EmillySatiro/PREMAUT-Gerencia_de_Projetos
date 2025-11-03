import { Request, Response } from 'express';
import { supabase } from '../services/supabaseClient';

export const getMateriais = async (req: Request, res: Response) => {
  const { data, error } = await supabase.from('arquivos').select('*');
  if (error) return res.status(500).json({ error: error.message });
  return res.json(data);
};

export const uploadArquivo = async (req: Request, res: Response) => {
  const file = req.file;
  if (!file) return res.status(400).json({ error: 'Arquivo não enviado' });

  const { data, error } = await supabase.storage
    .from('arquivos')
    .upload(`uploads/${file.originalname}`, file.buffer, { upsert: false });

  if (error) return res.status(500).json({ error: error.message });

  const { data: publicUrlData } = supabase.storage
    .from('arquivos')
    .getPublicUrl(data?.path || '');

  const url = publicUrlData.publicUrl;
  return res.status(201).json({ url });
};

export const updateArquivo = async (req: Request, res: Response) => {
  const file = req.file;
  const { filename } = req.params;
  if (!file) return res.status(400).json({ error: 'Arquivo não enviado' });

  const { data, error } = await supabase.storage
    .from('arquivos')
    .upload(`uploads/${filename}`, file.buffer, { upsert: true });

  if (error) return res.status(500).json({ error: error.message });

  const { data: publicUrlData } = supabase.storage
    .from('arquivos')
    .getPublicUrl(data?.path || '');

  const url = publicUrlData.publicUrl;
  return res.status(200).json({ url });
};

export const removeArquivo = async (req: Request, res: Response) => {
  const { filename } = req.params;
  const { error } = await supabase.storage
    .from('arquivos')
    .remove([`uploads/${filename}`]);

  if (error) return res.status(500).json({ error: error.message });
  return res.status(204).send();
};