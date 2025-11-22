import { Request, Response } from 'express';
import { supabase } from '../services/supabaseClient';

export const getMateriais = async (req: Request, res: Response) => {
  try {
    const { professorId } = req.query;

    let query = supabase.from('arquivos').select('*');

    if (professorId) {
      // Se tiver professorId, busca primeiro na tabela de relacionamento
      const { data: links, error: linkError } = await supabase
        .from('Professor_Arquivos')
        .select('arquivo_id')
        .eq('professor_id', professorId);

      if (linkError) {
        throw linkError;
      }

      const arquivoIds = links.map((link: any) => link.arquivo_id);

      // Filtra os arquivos pelos IDs encontrados
      if (arquivoIds.length > 0) {
        query = query.in('id', arquivoIds);
      } else {
        // Se não tiver arquivos vinculados, retorna lista vazia
        return res.status(200).json([]);
      }
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar materiais' });
  }
};

export const createArquivo = async (req: Request, res: Response) => {
  try {
    const { nome, descricao, url, capa_url, professor_id } = req.body;

    // 1. Cria o arquivo na tabela arquivos
    const { data: arquivo, error: arquivoError } = await supabase
      .from('arquivos')
      .insert([
        {
          nome,
          descricao,
          url,
          capa_url,
        },
      ])
      .select()
      .single();

    if (arquivoError) {
      throw arquivoError;
    }

    // 2. Se tiver professor_id, cria o vínculo na tabela Professor_Arquivos
    if (professor_id && arquivo) {
      const { error: linkError } = await supabase
        .from('Professor_Arquivos')
        .insert([
          {
            professor_id,
            arquivo_id: arquivo.id,
          },
        ]);

      if (linkError) {
        console.error('Erro ao vincular arquivo ao professor:', linkError);
        // Não vamos falhar a requisição se o vínculo falhar, mas logamos o erro
      }
    }

    res.status(201).json(arquivo);
  } catch (error) {
    console.error('Erro ao criar arquivo:', error);
    res.status(500).json({ error: 'Erro ao criar arquivo' });
  }
};

export const uploadArquivo = async (req: Request, res: Response) => {
  console.log('📤 Upload request received');
  console.log('Headers:', req.headers);
  console.log('File present:', !!req.file);

  const file = req.file;
  if (!file) {
    console.log('❌ No file in request');
    return res.status(400).json({ error: 'Arquivo não enviado' });
  }

  console.log('📁 File details:', {
    originalname: file.originalname,
    mimetype: file.mimetype,
    size: file.size,
    hasBuffer: !!file.buffer
  });

  try {
    console.log('☁️ Uploading to Supabase storage...');

    // Adiciona timestamp ao nome do arquivo para evitar conflitos
    const timestamp = Date.now();
    const fileExtension = file.originalname.split('.').pop();
    const fileNameWithoutExt = file.originalname.replace(/\.[^/.]+$/, '');
    const uniqueFileName = `${fileNameWithoutExt}_${timestamp}.${fileExtension}`;

    const { data, error } = await supabase.storage
      .from('arquivos')
      .upload(`uploads/${uniqueFileName}`, file.buffer, { upsert: true });

    if (error) {
      console.error('❌ Supabase upload error:', error);
      return res.status(500).json({ error: error.message });
    }

    console.log('✅ File uploaded successfully:', data);

    const { data: publicUrlData } = supabase.storage
      .from('arquivos')
      .getPublicUrl(data?.path || '');

    const url = publicUrlData.publicUrl;
    console.log('🔗 Public URL generated:', url);

    return res.status(201).json({ url });
  } catch (error: any) {
    console.error('❌ Unexpected error during upload:', error);
    return res.status(500).json({ error: error.message || 'Erro desconhecido' });
  }
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