const API_URL = 'http://localhost:3001/api/relatorios';

export async function getRelatorioById(id: string) {
  const url = `${API_URL}/${id}`;
  console.log('Buscando relatório em:', url);
  const res = await fetch(url);
  console.log('Status da resposta:', res.status);
  let data = null;
  try {
    data = await res.json();
    console.log('Resposta JSON:', data);
  } catch (e) {
    console.log('Erro ao fazer parse do JSON:', e);
  }
  if (!res.ok) throw new Error(data?.error || 'Erro desconhecido');
  return data;
}