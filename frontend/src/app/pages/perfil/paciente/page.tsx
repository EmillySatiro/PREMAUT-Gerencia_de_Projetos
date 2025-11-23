'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import TopBar from "@/app/components/TopBar";
import Icons from '@/app/components/assets/icons';
import Image from '@/app/components/assets/images';
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

interface Paciente {
  id: string;
  nome: string;
  genero: string;
  nascimento: string;
  telefone: string;
  email: string;
  nivel_suporte: string;
  comodidade: string; // comorbidade?
  remedios: string;
  estereotipia: string;
  reforco_positivo: string;
  reforco_negativo: string;
  created_at: string;
}

interface Relatorio {
  id: number;
  assunto: string;
  tipo: string;
  created_at: string;
}

interface ChartDataPoint {
  date: string;
  displayDate: string;
  incidentes: number;
  autocorrecao: number;
}

export default function ScreenPaciente() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get('id');

  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [relatorios, setRelatorios] = useState<Relatorio[]>([]);
  const [loading, setLoading] = useState(true);

  // Estados para estatísticas e gráfico
  const [stats, setStats] = useState({ incidentes: 0, autocorrecao: 0 });
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);

  useEffect(() => {
    if (!id) {
      // Se não tiver ID, talvez redirecionar ou mostrar erro?
      // Por enquanto, apenas para de carregar
      setLoading(false);
      return;
    }

    // Busca dados do paciente
    const fetchPaciente = fetch(`/api/pacientes/${id}`).then(res => res.json());
    // Busca relatórios do paciente
    const fetchRelatorios = fetch(`/api/relatorios/paciente/${id}`).then(res => res.json());

    Promise.all([fetchPaciente, fetchRelatorios])
      .then(([pacienteData, relatoriosData]) => {
        if (pacienteData.error) throw new Error(pacienteData.error);
        setPaciente(pacienteData);

        if (Array.isArray(relatoriosData)) {
          setRelatorios(relatoriosData);
          processStatsAndChart(relatoriosData);
        }

        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const processStatsAndChart = (data: Relatorio[]) => {
    // 1. Calcular Totais
    const totalIncidentes = data.filter(r => r.tipo?.toLowerCase().includes('incidente')).length;
    const totalAutocorrecao = data.filter(r => r.tipo?.toLowerCase().includes('autocorreção') || r.tipo?.toLowerCase().includes('autocorrecao')).length;

    setStats({ incidentes: totalIncidentes, autocorrecao: totalAutocorrecao });

    // 2. Agrupar por Data para o Gráfico
    const groupedData: Record<string, ChartDataPoint> = {};

    data.forEach(relatorio => {
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

    // Ordenar por data
    const chartArray = Object.values(groupedData).sort((a, b) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    setChartData(chartArray);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Carregando...</div>;
  }

  if (!paciente) {
    return <div className="flex justify-center items-center h-screen">Paciente não encontrado.</div>;
  }

  // Formata data
  const dataNascimento = new Date(paciente.nascimento).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  const dataCadastro = new Date(paciente.created_at).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  return (
    <div className="min-h-screen flex flex-col">
      {/* TopBar */}
      <TopBar background_image={Image.fundoSomos} />

      {/* Conteúdo principal */}
      <main className="flex-1 bg-white px-8 py-10">
        {/* Cabeçalho do perfil */}
        <section className="flex flex-col md:flex-row items-center gap-6 mb-10">
          {/* Ícone do usuário */}
          <div className="relative">
            <img
              src={Icons.circuloPerfil}
              alt="Foto do paciente"
              className="w-24 h-24 rounded-full border border-gray-200"
            />
            <img
              src={Icons.mdi_user}
              alt="Ícone de paciente"
              className="absolute inset-0 w-24 h-24 p-6 opacity-70"
            />
          </div>

          {/* Informações do paciente */}
          <div className="flex flex-col md:flex-row md:items-center w-full justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {paciente.nome}
                </h2>
                <span
                  className="text-sm text-white px-3 py-1 rounded-full"
                  style={{ backgroundColor: '#335B8D' }}
                >
                  Paciente
                </span>
              </div>
              <span className="text-xs text-gray-500 mt-1 block">
                cadastrado em: {dataCadastro}
              </span>
            </div>

            <button
              onClick={() => router.push(`/editar/paciente?id=${id}`)}
              className="mt-4 md:mt-0 flex items-center gap-2 bg-white border text-sm rounded-full px-4 py-2 hover:bg-gray-50 transition"
              style={{ borderColor: '#335B8D', color: '#335B8D' }}
            >
              <img
                src={Icons.lapisAzul}
                alt="Editar"
                className="w-4 h-4"
              />
              Editar perfil
            </button>
          </div>
        </section>

        {/* Blocos de informações */}
        <section className="grid md:grid-cols-2 gap-8 mb-10">
          {/* Informações básicas */}
          <div
            className="border rounded-xl p-6"
            style={{ borderColor: '#335B8D' }}
          >
            <h3 className="font-semibold text-gray-700 mb-3">
              Informações básica
            </h3>
            <ul className="text-sm text-gray-600 space-y-3">
              <li>
                <strong>Gênero:</strong> {paciente.genero}
              </li>
              <li>
                <strong>Aniversário:</strong> {dataNascimento}
              </li>
              <li>
                <strong>Telefone:</strong> {paciente.telefone}
              </li>
              <li>
                <strong>E-mail:</strong> {paciente.email}
              </li>
            </ul>
          </div>
          {/* Informações de suporte */}
          <div
            className="border rounded-xl p-6"
            style={{ borderColor: '#335B8D' }}
          >
            <h3 className="font-semibold text-gray-800 mb-4">
              Informações de suporte
            </h3>

            <div className="grid md:grid-cols-2 gap-8 text-sm">
              {/* Coluna Esquerda */}
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-gray-500 font-medium">Nível de Suporte</p>
                  <p className="text-gray-800 font-semibold">{paciente.nivel_suporte || "Não informado"}</p>
                </div>

                <div>
                  <p className="text-gray-500 font-medium">Comorbidades</p>
                  <p className="text-gray-800 font-semibold">{paciente.comodidade || "Não informado"}</p>
                </div>

                <div>
                  <p className="text-gray-500 font-medium">Medicação</p>
                  <p className="text-gray-800 font-semibold">{paciente.remedios || "Não informado"}</p>
                </div>

                <div>
                  <p className="text-gray-500 font-medium">Atividade Física</p>
                  <p className="text-gray-800 font-semibold">Futebol</p> {/* Hardcoded por enquanto ou falta campo */}
                </div>
              </div>

              {/* Coluna Direita */}
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-gray-500 font-medium">Estereotipia</p>
                  <p className="text-gray-800 font-semibold">
                    {paciente.estereotipia || "Não informado"}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 font-medium">Reforçador</p>
                  <ul className="list-disc ml-4 space-y-2">
                    <li>
                      <span className="text-gray-500 font-medium">
                        Reforçador positivo
                      </span>
                      <br />
                      <span className="text-gray-800">
                        {paciente.reforco_positivo || "Não informado"}
                      </span>
                    </li>
                    <li>
                      <span className="text-gray-500 font-medium">
                        Reforçador negativo
                      </span>
                      <br />
                      <span className="text-gray-800">
                        {paciente.reforco_negativo || "Não informado"}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </section>

        {/* Gráfico e estatísticas */}
        <section
          className="border rounded-xl p-8 mb-10 grid md:grid-cols-2 gap-6 items-center"
          style={{ borderColor: '#335B8D', backgroundColor: '#E8EEF6' }}
        >
          {/* Esquerda */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex flex-col gap-8 mb-6">
              <div className="text-center md:text-left">
                <p
                  className="text-5xl font-bold text-gray-800"
                  style={{ color: '#335B8D' }}
                >
                  {stats.incidentes}
                </p>
                <p className="text-base text-gray-700 font-medium">
                  INCIDENTES
                </p>
              </div>
              <div className="text-center md:text-left">
                <p
                  className="text-5xl font-bold text-gray-800"
                  style={{ color: '#335B8D' }}
                >
                  {stats.autocorrecao}
                </p>
                <p className="text-base text-gray-700 font-medium">
                  AUTOCORREÇÃO
                </p>
              </div>
            </div>

            <button
              className="text-white rounded-lg px-6 py-2 shadow-sm hover:opacity-90 transition"
              style={{ backgroundColor: '#335B8D' }}
            >
              VISUALIZAR
            </button>
          </div>

          {/* Direita - Gráfico */}
          <div className="w-full flex justify-center h-[300px] bg-white rounded-xl p-4 shadow-sm">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#ccc" vertical={false} />
                  <XAxis
                    dataKey="displayDate"
                    tick={{ fontSize: 12, fill: '#666' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    allowDecimals={false}
                    tick={{ fontSize: 12, fill: '#666' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
                  />
                  <Legend verticalAlign="top" height={36} />
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
                    stroke="#10b981" // Verde (ou use #335B8D se preferir azul do tema)
                    strokeWidth={3}
                    dot={{ r: 4, strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                    name="Autocorreção"
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <p>Sem dados suficientes para o gráfico.</p>
              </div>
            )}
          </div>
        </section>

        {/* Relatórios */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3
              className="text-lg font-semibold text-white px-4 py-2 rounded-md"
              style={{ backgroundColor: '#335B8D' }}
            >
              Relatórios
            </h3>

            <button
              onClick={() => router.push(`/cadastrar/relatorio_escrever?pacienteId=${id}`)}
              className="flex items-center gap-2 text-white px-4 py-2 rounded-md shadow-md hover:opacity-90 transition"
              style={{ backgroundColor: '#335B8D' }}
            >
              <img
                src={Icons.lapisBranco}
                alt="Ícone escrever"
                className="w-4 h-4"
              />
              Escrever
            </button>
          </div>

          <div className="space-y-4">
            {relatorios.length === 0 ? (
              <p className="text-gray-500 italic">Nenhum relatório encontrado.</p>
            ) : (
              relatorios.map((relatorio) => (
                <div
                  key={relatorio.id}
                  className="relative flex justify-between items-center bg-white rounded-xl shadow-md shadow-gray-200 p-4 hover:shadow-lg transition overflow-hidden"
                >
                  {/* Fundo translúcido */}
                  <div
                    className="absolute inset-0 opacity-10 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${Image.fundoSomos})`,
                    }}
                  ></div>

                  {/* Conteúdo */}
                  <div className="relative flex flex-col gap-1">
                    <div className="flex items-center gap-3">
                      <img
                        src={Icons.relatorio}
                        alt="Ícone de relatório"
                        className="w-6 h-6"
                      />
                      <p className="text-gray-700 text-sm font-medium">
                        {relatorio.assunto}
                      </p>
                    </div>
                    {/* Exibe o tipo com cor condicional */}
                    <p className={`text-xs font-semibold ml-9 ${relatorio.tipo?.toLowerCase().includes('incidente') ? 'text-red-500' :
                      relatorio.tipo?.toLowerCase().includes('autocorreção') || relatorio.tipo?.toLowerCase().includes('autocorrecao') ? 'text-green-500' : 'text-gray-500'
                      }`}>
                      {relatorio.tipo}
                    </p>
                  </div>
                  <span className="relative text-xs text-gray-500">
                    {new Date(relatorio.created_at).toLocaleDateString("pt-BR", { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
