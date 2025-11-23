'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import TopBar from "@/app/components/TopBar";
import Image from '@/app/components/assets/images';

interface PacienteEdit {
    nome: string;
    genero: string;
    nascimento: string;
    nascimentoISO?: string;
    telefone: string;
    email: string;
    nivel_suporte: string;
    comodidade: string;
    remedios: string;
    estereotipia: string;
    reforco_positivo: string;
    reforco_negativo: string;
}

export default function EditScreenPaciente() {
    const [formData, setFormData] = useState<PacienteEdit | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    useEffect(() => {
        if (!id) {
            alert("ID do paciente não encontrado.");
            router.back();
            return;
        }

        // Busca dados para edição
        fetch(`/api/pacientes/editar/${id}`, {
            headers: { "Content-Type": "application/json" },
        })
            .then(res => {
                if (!res.ok) throw new Error("Erro ao carregar dados");
                return res.json();
            })
            .then(data => {
                const perfil = data.perfil;
                // Formata data se necessário (assumindo YYYY-MM-DD do banco)
                // Se vier timestamp, precisaria converter.
                // Vamos assumir que o input date aceita YYYY-MM-DD
                setFormData(perfil);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
                alert("Erro ao carregar dados do paciente.");
                router.back();
            });
    }, [id, router]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        if (formData) {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSave = async () => {
        if (!formData || !id) return;

        try {
            const res = await fetch(`/api/pacientes/editar/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.details || errData.error || "Erro ao atualizar");
            }

            alert("Paciente atualizado com sucesso!");
            router.push(`/perfil/paciente?id=${id}`);
        } catch (error: any) {
            console.error(error);
            alert(`Erro ao atualizar: ${error.message}`);
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
                    <h1 className="text-2xl font-bold text-gray-800">Editar Paciente</h1>
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
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#335B8D]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email || ""}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#335B8D]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Gênero</label>
                            <select
                                name="genero"
                                value={formData.genero || ""}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#335B8D]"
                            >
                                <option value="">Selecione</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Feminino">Feminino</option>
                                <option value="Outro">Outro</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                            <input
                                type="text"
                                name="telefone"
                                value={formData.telefone || ""}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#335B8D]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Data de Nascimento</label>
                            <input
                                type="date"
                                name="nascimento"
                                value={formData.nascimento || ""}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#335B8D]"
                            />
                        </div>

                        {/* Dados de Suporte */}
                        <div className="col-span-1 md:col-span-2 mt-4">
                            <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Informações de Suporte</h3>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nível de Suporte</label>
                            <select
                                name="nivel_suporte"
                                value={formData.nivel_suporte || ""}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#335B8D]"
                            >
                                <option value="">Selecione</option>
                                <option value="N1">Nível 1 (Suporte Leve)</option>
                                <option value="N2">Nível 2 (Suporte Moderado)</option>
                                <option value="N3">Nível 3 (Suporte Substancial)</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Comorbidades</label>
                            <input
                                type="text"
                                name="comodidade"
                                placeholder="Ex: TDAH, Ansiedade"
                                value={formData.comodidade || ""}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#335B8D]"
                            />
                        </div>

                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Medicação</label>
                            <input
                                type="text"
                                name="remedios"
                                value={formData.remedios || ""}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#335B8D]"
                            />
                        </div>

                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Estereotipia</label>
                            <textarea
                                name="estereotipia"
                                rows={3}
                                value={formData.estereotipia || ""}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#335B8D]"
                            />
                        </div>

                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Reforçador Positivo</label>
                            <textarea
                                name="reforco_positivo"
                                rows={2}
                                value={formData.reforco_positivo || ""}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#335B8D]"
                            />
                        </div>

                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Reforçador Negativo</label>
                            <textarea
                                name="reforco_negativo"
                                rows={2}
                                value={formData.reforco_negativo || ""}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#335B8D]"
                            />
                        </div>

                    </div>

                    <div className="mt-8 flex justify-end">
                        <button
                            onClick={handleSave}
                            className="bg-[#335B8D] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#2a4a75] transition shadow-md"
                        >
                            Salvar Alterações
                        </button>
                    </div>

                </div>
            </main>
        </div>
    );
}
