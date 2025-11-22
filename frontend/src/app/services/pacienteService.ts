import ConfigApp from "../components/config/config";

const API_URL = 'http://localhost:3001/api/pacientes';


export async function getPacienteById(id: string) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error('Erro ao buscar paciente');
  return res.json();
}
