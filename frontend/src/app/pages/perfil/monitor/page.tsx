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
}

export default function ScreenMonitor() {
  const [perfil, setPerfil] = useState<PerfilMonitor | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<PerfilMonitor | null>(null);

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

    // Chama a API com o ID do usuário
    fetch(`/api/monitor/perfil/${user.id}`, {
      headers: { "Content-Type": "application/json" },
    })
      .then(res => {
        if (!res.ok) throw new Error("Erro ao carregar perfil");
        return res.json();
      })
      .then(data => {
        setPerfil(data.perfil);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
        router.push("/auth/login");
      });
  }, [router]);

  // Converte YYYY-MM-DD para DD/MM/YYYY
  const formatDateToBR = (isoDate: string | undefined) => {
    if (!isoDate) return "";
    const [year, month, day] = isoDate.split("-");
    return `${day}/${month}/${year}`;
  };

  // Converte DD/MM/YYYY para YYYY-MM-DD
  const formatDateToISO = (brDate: string) => {
    if (!brDate) return null;
    const parts = brDate.split("/");
    if (parts.length !== 3) return null;
    const [day, month, year] = parts;
    return `${year}-${month}-${day}`;
  };

  const handleEditClick = () => {
    if (perfil) {
      setFormData({
        ...perfil,
        nascimento: formatDateToBR(perfil.nascimentoISO) // Usa a data formatada para edição
      });
      setIsEditing(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (formData) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Máscara de data DD/MM/YYYY
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não é dígito

    if (value.length > 8) value = value.slice(0, 8); // Limita a 8 números

    if (value.length > 4) {
      value = value.replace(/^(\d{2})(\d{2})(\d+)/, "$1/$2/$3");
    } else if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d+)/, "$1/$2");
    }

    if (formData) {
      setFormData({ ...formData, nascimento: value });
    }
  };

  const handleSave = async () => {
    if (!formData) return;

    const userData = localStorage.getItem("user");
    if (!userData) return;
    const user = JSON.parse(userData);

    const nascimentoISO = formatDateToISO(formData.nascimento);

    try {
      const res = await fetch(`/api/monitor/perfil/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          genero: formData.genero,
          telefone: formData.telefone,
          nascimento: nascimentoISO,
        }),
      });

      if (!res.ok) throw new Error("Erro ao atualizar perfil");

      // Atualiza o estado local com os novos dados (recarrega da API para garantir formato correto)
      const updatedRes = await fetch(`/api/monitor/perfil/${user.id}`);
      const updatedData = await updatedRes.json();
      setPerfil(updatedData.perfil);

      setIsEditing(false);
      alert("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar perfil.");
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
    <div className="min-h-screen flex flex-col relative">
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
                <span>Aniversário: {formatDateToBR(perfil.nascimentoISO)}</span>
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

          {/* INFORMAÇÕES DE SUPORTE (fixo) */}
          <div className="border border-[#FFDFA4] rounded-xl p-3 max-w-sm mx-auto flex flex-col justify-center h-[140px]">
            <h3 className="font-semibold text-gray-700 mb-3 text-center">Informações</h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600">
              <li><strong>Início da Orientação:</strong> 2024.1</li>
              <li><strong>Fim do Período:</strong> 2024.2</li>
              <li><strong>Curso:</strong> Psicologia</li>
              <li><strong>Especialidade:</strong> Saúde da criança e do adolescente</li>
            </ul>
          </div>

          {/* ALUNOS VINCULADOS */}
          <div className="col-span-2 bg-[#FFF4E1] rounded-xl p-6">
            <h3 className="font-semibold text-gray-800 text-lg text-center">Alunos vinculados</h3>
          </div>

          <div className="col-span-2 rounded-xl p-12 bg-[url('/assets/images/fundo_top_bottom.png')] bg-center bg-cover min-h-[700px] flex flex-col items-start">
            <button className="flex items-center gap-2 bg-[#FCDFA1] text-[#2A5387] px-5 py-3 rounded-[15.82px] font-medium shadow-md hover:bg-[#fae7bb] transition mb-10">
              <img src={Icons.lapisCinza} alt="Adicionar" className="w-5 h-5" />
              Adicionar
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full justify-items-center">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="relative bg-white rounded-2xl shadow-lg w-[280px] h-[230px] flex flex-col items-center justify-center transition transform hover:scale-105 hover:shadow-xl">
                  <img src={Icons.icone_3pontos} alt="Opções" className="absolute top-4 right-4 w-6 h-6 opacity-80" />
                  <div className="w-20 h-20 rounded-full bg-gray-300 mb-5"></div>
                  <h3 className="text-gray-800 font-medium mb-4 text-lg">Fulano de Tal</h3>
                  <button className="bg-[#4da1a9] text-white text-sm px-5 py-2 rounded-[20px] hover:bg-[#3a8289] transition">
                    Verificar perfil
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* MODAL DE EDIÇÃO */}
      {isEditing && formData && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-8 w-full max-w-lg shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Editar Perfil</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFDFA4]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gênero</label>
                <select
                  name="genero"
                  value={formData.genero}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFDFA4]"
                >
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                  <option value="Outro">Outro</option>
                  <option value="Não informado">Não informado</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                <input
                  type="text"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFDFA4]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data de Nascimento</label>
                <input
                  type="text"
                  name="nascimento"
                  placeholder="DD/MM/YYYY"
                  value={formData.nascimento}
                  onChange={handleDateChange}
                  maxLength={10}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFDFA4]"
                />
                <p className="text-xs text-gray-500 mt-1">Formato: DD/MM/YYYY</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFDFA4]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-[#FFDFA4] text-[#2A5387] font-semibold rounded-lg hover:bg-[#fae7bb] transition"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}