'use client';

import React, { useState, useEffect } from 'react';
import TopBar from "@/app/components/TopBar";
import Image from '@/app/components/assets/images';
import { useRouter } from 'next/navigation';

interface ProfessorPerfilEdit {
    nome: string;
    email: string;
    genero: string;
    telefone: string;
    nascimento: string;
    nascimentoISO?: string;
    inicio_orientacao: string;
    fim_orientacao: string;
    curso: string;
    especialidade: string;
}

export default function EditScreenProfessor() {
    const [formData, setFormData] = useState<ProfessorPerfilEdit | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (!userData) {
            router.push("/auth/login");
            return;
        }

        const user = JSON.parse(userData);
        if (user.tipo_usuario !== "professor") {
            alert("Acesso negado.");
            router.push("/auth/login");
            return;
        }

        // Busca dados para edição
        fetch(`/api/professor/${user.id}`, {
            headers: { "Content-Type": "application/json" },
        })
            .then(res => {
                if (!res.ok) throw new Error("Erro ao carregar dados");
                return res.json();
            })
            .then(data => {
                // Formata a data para DD/MM/YYYY se existir
                const perfil = data.perfil;
                if (perfil.nascimento) {
                    // Assumindo que vem ISO YYYY-MM-DD
                    const [year, month, day] = perfil.nascimento.split("-");
                    perfil.nascimento = `${day}/${month}/${year}`;
                }
                setFormData(perfil);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
                router.push("/perfil/professor");
            });
    }, [router]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (formData) {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    // Máscara de data DD/MM/YYYY
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 8) value = value.slice(0, 8);

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

        // Converte DD/MM/YYYY para YYYY-MM-DD
        let nascimentoISO = null;
        if (formData.nascimento && formData.nascimento.length === 10) {
            const parts = formData.nascimento.split("/");
            if (parts.length === 3) {
                nascimentoISO = `${parts[2]}-${parts[1]}-${parts[0]}`;
            }
        }

        try {
            const res = await fetch(`/api/professor/${user.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    nascimento: nascimentoISO,
                }),
            });

            if (!res.ok) {
                const errData = await res.json();
                const errorMessage = errData.details || errData.error || "Erro ao atualizar perfil";
                throw new Error(errorMessage);
            }

            alert("Perfil atualizado com sucesso!");
            router.push("/perfil/professor");
        } catch (error: any) {
            console.error(error);
            alert(`Erro ao atualizar perfil: ${error.message}`);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <div className="text-xl font-medium text-gray-700">Carregando...</div>
            </div>
        );
    }

    if (!formData) return null;

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <TopBar background_image={Image.fundoSomos} />

            <main className="flex-1 px-8 py-10 max-w-4xl mx-auto w-full">

                {/* Header com Voltar */}
                <div className="flex items-center justify-between mb-8">
                    <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        <span className="text-lg font-medium">Voltar</span>
                    </button>
                    <h1 className="text-2xl font-bold text-gray-800">Editar Perfil</h1>
                    <div className="w-20"></div> {/* Spacer */}
                </div>

                <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Dados Pessoais */}
                        <div className="col-span-1 md:col-span-2">
                            <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Dados Pessoais</h3>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                            <input
                                type="text"
                                name="nome"
                                value={formData.nome || ""}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFDFA4]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email || ""}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFDFA4]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Gênero</label>
                            <select
                                name="genero"
                                value={formData.genero || ""}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFDFA4]"
                            >
                                <option value="">Selecione</option>
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
                                value={formData.telefone || ""}
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
                                value={formData.nascimento || ""}
                                onChange={handleDateChange}
                                maxLength={10}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFDFA4]"
                            />
                        </div>

                        {/* Dados do Professor */}
                        <div className="col-span-1 md:col-span-2 mt-4">
                            <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Dados da Orientação</h3>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Curso</label>
                            <input
                                type="text"
                                name="curso"
                                placeholder="Ex: Psicologia"
                                value={formData.curso || ""}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFDFA4]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Especialidade</label>
                            <input
                                type="text"
                                name="especialidade"
                                placeholder="Ex: Neuropsicologia"
                                value={formData.especialidade || ""}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFDFA4]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Início da Orientação</label>
                            <input
                                type="text"
                                name="inicio_orientacao"
                                placeholder="Ex: 2024.1"
                                value={formData.inicio_orientacao || ""}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFDFA4]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Fim da Orientação</label>
                            <input
                                type="text"
                                name="fim_orientacao"
                                placeholder="Ex: 2024.2"
                                value={formData.fim_orientacao || ""}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFDFA4]"
                            />
                        </div>

                    </div>

                    <div className="flex justify-end mt-10">
                        <button
                            onClick={handleSave}
                            className="bg-[#6d94c5] text-white font-semibold py-3 px-8 rounded-lg shadow hover:bg-[#5a7da8] transition duration-200"
                        >
                            Salvar Edição
                        </button>
                    </div>

                </div>
            </main>
        </div>
    );
}
