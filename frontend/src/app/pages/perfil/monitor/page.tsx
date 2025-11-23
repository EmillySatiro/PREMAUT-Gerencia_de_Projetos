'use client';

import React, { useState, useEffect } from 'react';
import TopBar from "@/app/components/TopBar";
import Image from '@/app/components/assets/images';
import Icons from '@/app/components/assets/icons';
import { useRouter } from 'next/navigation';

interface PerfilMonitor {
  nome: string;
  email: string;
  genero: string;
  telefone: string;
  nascimento: string;
  nascimentoISO?: string;
  dataCadastro: string;
  inicio_periodo?: string;
  fim_periodo?: string;
  curso?: string;
  professor?: string;
}

interface Aluno {
  link_id: number;
  id: string;
  nome: string;
  nascimento: string;
}

interface PacienteDisponivel {
  id: string;
  nome: string;
}

export default function ScreenMonitor() {
  const [perfil, setPerfil] = useState<PerfilMonitor | null>(null);
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Estado para o menu "Adicionar"
  const [showAddMenu, setShowAddMenu] = useState(false);

  // Estado para o modal de vincular
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [availablePatients, setAvailablePatients] = useState<PacienteDisponivel[]>([]);
  const [selectedPatient, setSelectedPatient] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/auth/login");
      return;
    }

    const user = JSON.parse(userData);
    if (user.tipo_usuario !== "monitor") {
      alert("Acesso negado.");
      router.push("/auth/login");
      return;
    }

    // 1. Busca Perfil
    fetch(`/api/monitor/perfil/${user.id}`, {
      headers: { "Content-Type": "application/json" },
    })
      .then(res => {
        if (!res.ok) throw new Error("Erro ao carregar perfil");
        return res.json();
      })
      .then(data => {
        setPerfil(data.perfil);
      })
      .catch(err => {
        console.error(err);
        router.push("/auth/login");
      });

    // 2. Busca Alunos Vinculados
    fetchLinkedStudents(user.id);

  }, [router]);

  const fetchLinkedStudents = (monitorId: string) => {
    fetch(`/api/monitor/pacientes/${monitorId}`)
      .then(res => res.json())
      .then(data => {
        setAlunos(data.alunos || []);
        setLoading(false);
      })
      .catch(err => console.error(err));
  };

  const handleEditClick = () => {
    router.push("/editar/monitor");
  };

  const handleAddClick = () => {
    setShowAddMenu(!showAddMenu);
  };

  const handleCadastrarClick = () => {
    router.push("/cadastrar/paciente");
  };

  const handleVincularClick = () => {
    setShowAddMenu(false);
    const userData = localStorage.getItem("user");
    if (!userData) return;
    const user = JSON.parse(userData);

    // Busca pacientes disponíveis
    fetch(`/api/monitor/pacientes/disponiveis/${user.id}`)
      .then(res => res.json())
      .then(data => {
        setAvailablePatients(data.pacientes || []);
        setShowLinkModal(true);
      })
      .catch(err => alert("Erro ao buscar pacientes disponíveis."));
  };

  const handleSaveLink = async () => {
    if (!selectedPatient) return;

    const userData = localStorage.getItem("user");
    if (!userData) return;
    const user = JSON.parse(userData);

    try {
      const res = await fetch("/api/monitor/pacientes/vincular", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          monitorId: user.id,
          pacienteId: selectedPatient
        })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Erro ao vincular");
      }

      alert("Paciente vinculado com sucesso!");
      setShowLinkModal(false);
      setSelectedPatient("");
      fetchLinkedStudents(user.id); // Atualiza a lista
    } catch (error: any) {
      alert(error.message);
    }
  };

  // TELA DE CARREGAMENTO
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-xl font-medium text-gray-700">Carregando perfil...</div>
      </div>
    );
  }

  // ERRO AO CARREGAR
  if (!perfil) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-xl text-red-500">Erro ao carregar perfil.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative" onClick={() => showAddMenu && setShowAddMenu(false)}>
      <TopBar background_image={Image.fundoSomos} />

      <main className="flex-1 bg-white px-8 py-10">
        {/* CABEÇALHO DO PERFIL */}
        <section className="flex flex-col md:flex-row items-center gap-6 mb-10">
          <div className="relative">
            <img src={Icons.circuloPerfil} alt="Foto" className="w-24 h-24 rounded-full border border-gray-200" />
            <img src={Icons.mdi_user} alt="Ícone" className="absolute inset-0 w-24 h-24 p-6 opacity-70" />
          </div>

          <div className="flex flex-col md:flex-row md:items-center w-full justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-semibold text-gray-800">{perfil.nome}</h2>
                <span className="text-sm bg-[#FFDFA4] text-[#2A5387] px-3 py-1 rounded-full">Monitor</span>
              </div>
              <span className="text-xs text-gray-500 mt-1 block">
                cadastrado em: {perfil.dataCadastro}
              </span>
            </div>

            <button
              onClick={handleEditClick}
              className="mt-4 md:mt-0 flex items-center gap-2 bg-white border border-[#FFDFA4] text-[#FFDFA4] rounded-full px-4 py-2 text-sm hover:bg-[#FFF8EA] transition">
              <img src={Icons.lapisAmarelo} alt="Editar" className="w-4 h-4" />
              Editar perfil
            </button>
          </div>
        </section>

        {/* INFORMAÇÕES BÁSICAS */}
        <section className="grid md:grid-cols-2 gap-8 mb-10">
          <div className="border border-[#FFDFA4] rounded-xl p-6 max-w-md">
            <h3 className="font-semibold text-gray-700 mb-3">Informações básicas</h3>
            <ul className="text-sm text-gray-600 space-y-3">
              <li className="flex items-center gap-2">
                <img src={Icons.genero} alt="Gênero" className="w-5 h-5" />
                <span>Gênero: {perfil.genero}</span>
              </li>
              <li className="flex items-center gap-2">
                <img src={Icons.aniversario} alt="Aniversário" className="w-5 h-5" />
                <span>Aniversário: {perfil.nascimento}</span>
              </li>
              <li className="flex items-center gap-2">
                <img src={Icons.telefone} alt="Telefone" className="w-4 h-4" />
                <span>Telefone: {perfil.telefone}</span>
              </li>
              <li className="flex items-center gap-2">
                <img src={Icons.email} alt="E-mail" className="w-5 h-5" />
                <span>E-mail: {perfil.email}</span>
              </li>
            </ul>
          </div>

          {/* INFORMAÇÕES DE SUPORTE (dinâmico) */}
          <div className="border border-[#FFDFA4] rounded-xl p-3 max-w-sm mx-auto flex flex-col justify-center h-[140px]">
            <h3 className="font-semibold text-gray-700 mb-3 text-center">Informações</h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600">
              <li><strong>Início da Orientação:</strong> {perfil.inicio_periodo || "Não informado"}</li>
              <li><strong>Fim do Período:</strong> {perfil.fim_periodo || "Não informado"}</li>
              <li><strong>Curso:</strong> {perfil.curso || "Não informado"}</li>
              <li><strong>Especialidade:</strong> {perfil.professor || "Não informado"}</li>
            </ul>
          </div>

          {/* ALUNOS VINCULADOS */}
          <div className="col-span-2 bg-[#FFF4E1] rounded-xl p-6">
            <h3 className="font-semibold text-gray-800 text-lg text-center">Alunos vinculados</h3>
          </div>

          <div className="col-span-2 rounded-xl p-12 bg-[url('/assets/images/fundo_top_bottom.png')] bg-center bg-cover min-h-[700px] flex flex-col items-start relative">

            {/* Botão Adicionar com Menu */}
            <div className="relative mb-10">
              <button
                onClick={(e) => { e.stopPropagation(); handleAddClick(); }}
                className="flex items-center gap-2 bg-[#FCDFA1] text-[#2A5387] px-5 py-3 rounded-[15.82px] font-medium shadow-md hover:bg-[#fae7bb] transition"
              >
                <img src={Icons.lapisCinza} alt="Adicionar" className="w-5 h-5" />
                Adicionar
              </button>

              {showAddMenu && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-10 overflow-hidden">
                  <button
                    onClick={handleCadastrarClick}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 text-gray-700 text-sm border-b border-gray-100"
                  >
                    Cadastrar novo paciente
                  </button>
                  <button
                    onClick={handleVincularClick}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 text-gray-700 text-sm"
                  >
                    Vincular paciente existente
                  </button>
                </div>
              )}
            </div>

            {/* Lista de Alunos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full justify-items-center">
              {alunos.length === 0 ? (
                <div className="col-span-3 text-gray-500 italic">Nenhum aluno vinculado.</div>
              ) : (
                alunos.map((aluno) => (
                  <div key={aluno.link_id} className="relative bg-white rounded-2xl shadow-lg w-[280px] h-[230px] flex flex-col items-center justify-center transition transform hover:scale-105 hover:shadow-xl">
                    <img src={Icons.icone_3pontos} alt="Opções" className="absolute top-4 right-4 w-6 h-6 opacity-80 cursor-pointer" />
                    <div className="w-20 h-20 rounded-full bg-gray-300 mb-5 flex items-center justify-center text-2xl text-white font-bold">
                      {aluno.nome.charAt(0)}
                    </div>
                    <h3 className="text-gray-800 font-medium mb-4 text-lg">{aluno.nome}</h3>
                    <button
                      onClick={() => router.push(`/perfil/paciente?id=${aluno.id}`)}
                      className="bg-[#4da1a9] text-white text-sm px-5 py-2 rounded-[20px] hover:bg-[#3a8289] transition"
                    >
                      Verificar perfil
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Modal de Vincular */}
      {showLinkModal && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50" onClick={(e) => e.stopPropagation()}>
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Vincular Paciente</h3>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Selecione o paciente:</label>
              <select
                value={selectedPatient}
                onChange={(e) => setSelectedPatient(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFDFA4]"
              >
                <option value="">Selecione...</option>
                {availablePatients.map(p => (
                  <option key={p.id} value={p.id}>{p.nome}</option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLinkModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveLink}
                disabled={!selectedPatient}
                className="px-6 py-2 bg-[#6d94c5] text-white font-semibold rounded-lg hover:bg-[#5a7da8] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Vincular
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}