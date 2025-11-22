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

export const getRelatorioStats = async (req: Request, res: Response) => {
  const { paciente_id } = req.query;

  if (!paciente_id) {
    return res.status(400).json({ error: 'paciente_id é obrigatório' });
  }

  try {
    // Busca relatórios do paciente filtrando pelos tipos
    // Usamos ilike ou or para garantir que pegue maiúsculas/minúsculas se necessário
    const { data, error } = await supabase
      .from('relatorios')
      .select('created_at, tipo')
      .eq('paciente_id', paciente_id)
      // Filtrando tipos. Ajuste as strings conforme estão salvas no seu banco exato
      .in('tipo', ['incidente', 'autocorreção', 'Incidente', 'Autocorreção']);

    if (error) throw error;

    // Processamento dos dados para o gráfico
    const stats: Record<string, { incidente: number; autocorrecao: number }> = {};

    data.forEach((relatorio: any) => {
      // Extrai a data (YYYY-MM-DD) para agrupar
      const dataIso = new Date(relatorio.created_at).toISOString().split('T')[0];
      
      if (!stats[dataIso]) {
        stats[dataIso] = { incidente: 0, autocorrecao: 0 };
      }

      const tipo = relatorio.tipo.toLowerCase();
      if (tipo.includes('incidente')) {
        stats[dataIso].incidente++;
      } else if (tipo.includes('autocorreção') || tipo.includes('autocorrecao')) {
        stats[dataIso].autocorrecao++;
      }
    });

    // Converte o objeto em array ordenado por data
    const result = Object.keys(stats).map(date => ({
      date, // Data original para ordenação
      displayDate: new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }), // Data formatada para o gráfico
      incidente: stats[date].incidente,
      autocorrecao: stats[date].autocorrecao
    })).sort((a, b) => a.date.localeCompare(b.date));

    return res.status(200).json(result);

  } catch (error: any) {
    console.error('Erro ao buscar estatísticas:', error);
    return res.status(500).json({ error: error.message });
  }
};