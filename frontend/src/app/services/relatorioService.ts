import ConfigApp from "../components/config/config";

const API_URL = 'http://localhost:3001/api/relatorios';

export async function buscarMateriais() {
  const res = await fetch(`${API_URL}`);
  if (!res.ok) throw new Error('Erro ao buscar materiais');
  return res.json();
}

export async function getRelatorioById(id: string) {
  const url = `${API_URL}/${id}`;
  const res = await fetch(url);
  let data = await res.json();
  if (!res.ok) throw new Error(data?.error || 'Erro desconhecido');
  return data;
}