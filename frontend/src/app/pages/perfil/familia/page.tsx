'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import TopBar from '@/app/components/TopBar';
import ImageAssets from '@/app/components/assets/images'; // Renomeei para evitar conflito com o componente Image do Next ou HTML
import Icons from '@/app/components/assets/icons';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// --- Tipos (Interfaces) ---
interface Paciente {
  id: string;
  nome: string;
  genero: string;
  nivel_suporte: string;
  nascimento: string;
  comodidade: string;
  telefone: string;
  email: string;
  remedios: string;
  estereotipia: string;
  reforco_positivo: string;
  reforco_negativo: string;
}

interface Relatorio {
  id: number;
  assunto: string;
  tipo: string;
  created_at: string;
  paciente_id: number | string;
}

// Interface para os dados do gráfico
interface ChartDataPoint {
  date: string;      // Data original para ordenação
  displayDate: string; // Data formatada (dia/mês)
  incidentes: number;
  autocorrecao: number;
}

function ScreenFamillyContent() {
  const searchParams = useSearchParams();
  const idUrl = searchParams.get('id');

  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [relatorios, setRelatorios] = useState<Relatorio[]>([]);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({ incidentes: 0, autocorreceo: 0 });

  const API_URL = process.env.NEXT_PUBLIC_URL_API || 'http://localhost:3001';
  
  // Lógica do ID
  const PACIENTE_ID = idUrl || "5f8d04f6-8864-4c1f-9638-7c7a05996e1d";

  useEffect(() => {
    async function fetchData() {
      if (!PACIENTE_ID) return;

      try {
        setLoading(true);

        // 1. Buscar dados do Paciente
        const resPaciente = await fetch(`${API_URL}/api/pacientes/${PACIENTE_ID}`);
        if (resPaciente.ok) {
          const dataPaciente = await resPaciente.json();
          setPaciente(dataPaciente);
        } else {
          console.error("Erro ao buscar paciente:", resPaciente.statusText);
          setPaciente(null);
        }

        // 2. Buscar Relatórios
        const resRelatorios = await fetch(`${API_URL}/api/relatorios`);
        if (resRelatorios.ok) {
          const dataRelatorios: Relatorio[] = await resRelatorios.json();

          // Filtragem local pelo ID do paciente
          const meusRelatorios = dataRelatorios.filter(r => String(r.paciente_id) === String(PACIENTE_ID));
          setRelatorios(meusRelatorios);

          // 3. Calcular Estatísticas Totais
          const totalIncidentes = meusRelatorios.filter(r => r.tipo?.toLowerCase().includes('incidente')).length;
          const totalAutocorreceo = meusRelatorios.filter(r => r.tipo?.toLowerCase().includes('autocorreção') || r.tipo?.toLowerCase().includes('autocorrecao')).length;
          
          setStats({ incidentes: totalIncidentes, autocorreceo: totalAutocorreceo });

          // 4. Processar Dados para o Gráfico (Agrupar por Data)
          const groupedData: Record<string, ChartDataPoint> = {};

          meusRelatorios.forEach(relatorio => {
            // Extrai apenas a data YYYY-MM-DD
            const dataIso = new Date(relatorio.created_at).toISOString().split('T')[0];
            
            if (!groupedData[dataIso]) {
              groupedData[dataIso] = {
                date: dataIso,
                displayDate: new Date(relatorio.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
                incidentes: 0,
                autocorrecao: 0
              };
            }

            const tipo = relatorio.tipo?.toLowerCase() || '';
            if (tipo.includes('incidente')) {
              groupedData[dataIso].incidentes += 1;
            } else if (tipo.includes('autocorreção') || tipo.includes('autocorrecao')) {
              groupedData[dataIso].autocorrecao += 1;
            }
          });

          // Transformar objeto em array e ordenar por data
          const chartArray = Object.values(groupedData).sort((a, b) => 
            new Date(a.date).getTime() - new Date(b.date).getTime()
          );

          setChartData(chartArray);

        } else {
          console.error("Erro ao buscar relatórios:", resRelatorios.statusText);
        }

      } catch (error) {
        console.error("Erro de conexão com o backend:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [API_URL, PACIENTE_ID]);

  // Funções utilitárias de formatação
  const formatarData = (dataISO: string) => {
    if (!dataISO) return "Data inválida";
    const data = new Date(dataISO);
    return data.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatarDataCurta = (dataISO: string) => {
    if (!dataISO) return "";
    return new Date(dataISO).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando dados do paciente...</div>;
  }

  if (!paciente) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-gray-600 mb-4">Paciente não encontrado.</p>
        <button onClick={() => window.location.reload()} className="text-emerald-600 hover:underline">Tentar novamente</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar background_image={ImageAssets.fundoSomos}/>

      <main className="flex-1 bg-white px-8 py-10">
        {/* Cabeçalho do perfil */}
        <section className="flex flex-col md:flex-row items-center gap-6 mb-10">
          <div className="relative">
            <img
              src={Icons.circuloPerfil}
              alt="Foto do usuário"
              className="w-24 h-24 rounded-full border border-gray-200"
            />
            <img
              src={Icons.mdi_user}
              alt="Ícone de usuário"
              className="absolute inset-0 w-24 h-24 p-6 opacity-70"
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-center w-full justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Familiar Responsável
                </h2>
                <span className="text-sm bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">
                  Familiar
                </span>
              </div>
              <span className="text-xs text-gray-500 mt-1 block">
                Visualizando perfil de: <span className="font-bold text-emerald-600">{paciente.nome}</span>
              </span>
            </div>

            <button className="mt-4 md:mt-0 flex items-center gap-2 bg-white border border-emerald-400 text-emerald-700 rounded-full px-4 py-2 text-sm hover:bg-emerald-50 transition">
              <img src={Icons.lapisVerde} alt="Editar" className="w-4 h-4" />
              Editar perfil
            </button>
          </div>
        </section>

        {/* Informações Básicas */}
        <section className="grid md:grid-cols-2 gap-8 mb-10">
          <div className="border border-emerald-200 rounded-xl p-6">
            <h3 className="font-semibold text-gray-700 mb-3">Informações básicas</h3>
            <ul className="text-sm text-gray-600 space-y-3">
              <li className="flex items-center gap-2">
                <img src={Icons.mdi_user_pequeno} alt="Aluno" className="w-5 h-5" />
                <span>Aluno vinculado: <strong>{paciente.nome}</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <img src={Icons.genero} alt="Gênero" className="w-5 h-5" />
                <span>Gênero: {paciente.genero || "-"}</span>
              </li>
              <li className="flex items-center gap-2">
                <img src={Icons.aniversario} alt="Nascimento" className="w-5 h-5" />
                <span>Aniversário: {formatarData(paciente.nascimento || "")}</span>
              </li>
              <li className="flex items-center gap-2">
                <img src={Icons.telefone} alt="Telefone" className="w-5 h-5" />
                <span>Telefone: {paciente.telefone || "-"}</span>
              </li>
              <li className="flex items-center gap-2">
                <img src={Icons.email} alt="E-mail" className="w-5 h-5" />
                <span>E-mail: {paciente.email || "-"}</span>
              </li>
            </ul>
          </div>

          <div className="border border-emerald-200 rounded-xl p-6">
            <h3 className="font-semibold text-gray-700 mb-3">Informações de suporte</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li><strong>Nível de suporte:</strong> {paciente.nivel_suporte || "-"}</li>
              <li><strong>Estereotipia:</strong> {paciente.estereotipia || "Nenhuma relatada"}</li>
              <li><strong>Comorbidades:</strong> {paciente.comodidade || "Nenhuma relatada"}</li>
              <li><strong>Medicação:</strong> {paciente.remedios || "Nenhuma"}</li>
              <li><strong>Reforçador positivo:</strong> {paciente.reforco_positivo || "-"}</li>
              <li><strong>Reforçador negativo:</strong> {paciente.reforco_negativo || "-"}</li>
              <li><strong>Atividade física:</strong> Futebol</li>
            </ul>
          </div>
        </section>

        {/* Gráfico e Estatísticas */}
        <section
          className="border border-emerald-200 rounded-xl p-8 mb-10 grid md:grid-cols-2 gap-6 items-center"
          style={{ backgroundColor: 'rgb(210, 233, 223)' }}
        >
          <div className="flex flex-col items-center md:items-start">
            <div className="flex flex-col gap-8 mb-6">
              <div className="text-center md:text-left">
                <p className="text-5xl font-bold text-gray-800">{stats.incidentes}</p>
                <p className="text-base text-gray-700 font-medium uppercase">INCIDENTES</p>
              </div>
              <div className="text-center md:text-left">
                <p className="text-5xl font-bold text-gray-800">{stats.autocorreceo}</p>
                <p className="text-base text-gray-700 font-medium uppercase">AUTOCORREÇÃO</p>
              </div>
            </div>
            <button className="bg-white text-gray-700 rounded-lg px-6 py-2 shadow-sm hover:bg-gray-50 transition">
              VER DETALHES
            </button>
          </div>
          
          {/* Área do Gráfico Real */}
          <div className="w-full flex justify-center bg-white rounded-lg p-2 h-[300px]">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#ccc" vertical={false} />
                  <XAxis 
                    dataKey="displayDate" 
                    tick={{fontSize: 12, fill: '#666'}} 
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    allowDecimals={false} 
                    tick={{fontSize: 12, fill: '#666'}} 
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
                  />
                  <Legend verticalAlign="top" height={36}/>
                  <Line 
                    type="monotone" 
                    dataKey="incidentes" 
                    stroke="#ef4444" // Vermelho
                    strokeWidth={3}
                    dot={{ r: 4, strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                    name="Incidentes"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="autocorrecao" 
                    stroke="#10b981" // Verde Emerald
                    strokeWidth={3}
                    dot={{ r: 4, strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                    name="Autocorreção"
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <p>Sem dados suficientes para gerar o gráfico.</p>
              </div>
            )}
          </div>
        </section>

        {/* Relatórios Recentes */}
        <section>
          <h3 className="text-lg font-semibold text-gray-700 mb-4 px-2 py-1 rounded-md" style={{ backgroundColor: 'rgb(210, 233, 223)' }}>
            Relatórios Recentes
          </h3>
          <div className="space-y-4">
            {relatorios.length === 0 ? (
              <p className="text-gray-500 text-sm">Nenhum relatório encontrado para este aluno.</p>
            ) : (
              relatorios.slice(0, 5).map((relatorio) => ( // Limitando a 5 relatórios para não poluir
                <div key={relatorio.id} className="relative flex justify-between items-center bg-white rounded-xl shadow-md shadow-gray-200 p-4 hover:shadow-lg transition overflow-hidden">
                  <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: `url(${ImageAssets.fundoSomos})` }}></div>
                  <div className="relative flex items-center gap-3">
                    <img src={Icons.relatorio} alt="Ícone" className="w-6 h-6" />
                    <div className="flex flex-col">
                        <p className="text-gray-700 text-sm font-medium">{relatorio.assunto}</p>
                        <span className={`text-xs font-bold ${relatorio.tipo?.toLowerCase().includes('incidente') ? 'text-red-500' : 'text-emerald-600'}`}>
                          {relatorio.tipo}
                        </span>
                    </div>
                  </div>
                  <span className="relative text-xs text-gray-500">{formatarDataCurta(relatorio.created_at)}</span>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default function ScreenFamilly() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Carregando...</div>}>
      <ScreenFamillyContent />
    </Suspense>
  );
}