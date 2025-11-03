import ConfigApp from "../components/config/config";

const API_URL = `${ConfigApp.URL_API}/api/materiais`;

// Função para buscar materiais da API
export async function buscarMateriais() {
  console.log(API_URL);
  const res = await fetch(`${API_URL}`);
  if (!res.ok) throw new Error('Erro ao buscar materiais');
  return res.json();
}

export async function uploadArquivo(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(API_URL, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) throw new Error('Erro ao fazer upload');
  return res.json();
}