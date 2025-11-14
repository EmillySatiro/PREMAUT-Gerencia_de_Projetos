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

export const getArquivoPorId = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  console.log('🔍 Buscando arquivo com ID:', id);

  const { data, error } = await supabase
    .from('arquivos')
    .select('*')
    .eq('id', id)
    .single();

  console.log('📊 Resultado:', { data, error });

  if (error) {
    console.error('❌ Erro:', error);
    if (error.code === 'PGRST116') {
      return res.status(404).json({ error: 'Arquivo não encontrado' });
    }
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json(data);
};

export const updateArquivoMetadados = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nome, descricao, url, capa_url } = req.body;

  console.log('🔄 Atualizando arquivo com ID:', id);
  console.log('📝 Dados recebidos:', { nome, descricao, url, capa_url });

  // Validação básica
  if (!nome && !descricao && !url && !capa_url) {
    return res.status(400).json({ 
      error: 'Nenhum campo para atualizar foi enviado' 
    });
  }

  // Monta objeto apenas com campos que foram enviados
  const dadosParaAtualizar: any = {};
  if (nome !== undefined) dadosParaAtualizar.nome = nome;
  if (descricao !== undefined) dadosParaAtualizar.descricao = descricao;
  if (url !== undefined) dadosParaAtualizar.url = url;
  if (capa_url !== undefined) dadosParaAtualizar.capa_url = capa_url;

  const { data, error } = await supabase
    .from('arquivos')
    .update(dadosParaAtualizar)
    .eq('id', id)
    .select()
    .single();

  console.log('📊 Resultado da atualização:', { data, error });

  if (error) {
    console.error('❌ Erro:', error);
    if (error.code === 'PGRST116') {
      return res.status(404).json({ error: 'Arquivo não encontrado' });
    }
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json(data);
};