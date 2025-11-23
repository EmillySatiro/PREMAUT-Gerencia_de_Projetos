import { Request, Response } from 'express';
import { supabase } from '../services/supabaseClient';

// Listar todos os eventos
export const getEventos = async (req: Request, res: Response) => {
  try {
    const { criador } = req.query;

    let query = supabase.from('eventos').select('*');

    if (criador) {
      // Se tiver criador (professorId), busca primeiro na tabela de relacionamento
      const { data: links, error: linkError } = await supabase
        .from('Professor_Eventos')
        .select('evento_id')
        .eq('professor_id', criador);

      if (linkError) {
        throw linkError;
      }

      const eventoIds = links.map((link: any) => link.evento_id);

      // Filtra os eventos pelos IDs encontrados
      if (eventoIds.length > 0) {
        query = query.in('id', eventoIds);
      } else {
        // Se não tiver eventos vinculados, retorna lista vazia
        return res.status(200).json([]);
      }
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar eventos' });
  }
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
  try {
    const { titulo, data, localizacao, descricao, criador } = req.body;

    // 1. Cria o evento na tabela eventos
    const { data: evento, error: eventoError } = await supabase
      .from('eventos')
      .insert([
        {
          titulo,
          data,
          localizacao,
          descricao,
        },
      ])
      .select()
      .single();

    if (eventoError) {
      throw eventoError;
    }

    // 2. Se tiver criador (professorId), cria o vínculo na tabela Professor_Eventos
    if (criador && evento) {
      const { error: linkError } = await supabase
        .from('Professor_Eventos')
        .insert([
          {
            professor_id: criador,
            evento_id: evento.id,
          },
        ]);

      if (linkError) {
        console.error('Erro ao vincular evento ao professor:', linkError);
      }
    }

    res.status(201).json(evento);
  } catch (error) {
    console.error('Erro ao criar evento:', error);
    res.status(500).json({ error: 'Erro ao criar evento' });
  }
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