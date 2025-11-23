'use client';

import React, { useEffect, useState } from 'react';
import TopBar from "@/app/components/TopBar";
import Image from '@/app/components/assets/images';
import Icons from '@/app/components/assets/icons';
import { FiTrash2 } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

interface ProfessorPerfil {
    id: string;
    nome: string;
    email: string;
    telefone: string;
    genero: string;
    nascimento: string;
    criado_em: string;
    tipo_usuario: string;
    inicio_orientacao?: string;
    fim_orientacao?: string;
    curso?: string;
    especialidade?: string;
}

interface Monitor {
    link_id: number;
    id: string;
    nome: string;
    email: string;
    genero: string;
    nascimento: string;
}

interface MonitorDisponivel {
    id: string;
    nome: string;
}

interface Material {
    id: number;
    nome: string;
    descricao: string;
    url: string;
    capa_url: string;
}

interface Evento {
    id: number;
    titulo: string;
    data: string;
    localizacao: string;
    descricao: string;
    criador: string;
}

export default function ScreenProfessor() {
    const [usuario, setUsuario] = useState<ProfessorPerfil | null>(null);
    const [monitores, setMonitores] = useState<Monitor[]>([]);
    const [materiais, setMateriais] = useState<Material[]>([]);
    const [eventos, setEventos] = useState<Evento[]>([]);
    const [loading, setLoading] = useState(true);

    // Estados para vinculação
    const [showLinkModal, setShowLinkModal] = useState(false);
    const [availableMonitors, setAvailableMonitors] = useState<MonitorDisponivel[]>([]);
    const [selectedMonitor, setSelectedMonitor] = useState("");

    // Estado para carrossel de materiais
    const [currentMaterialIndex, setCurrentMaterialIndex] = useState(0);

    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');

        if (storedUser) {
            const user = JSON.parse(storedUser);

            // 1. Busca Perfil
            fetch(`/api/professor/${user.id}`)
                .then(res => res.json())
                .then(data => {
                    setUsuario(data.perfil);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Erro ao buscar usuário:", err);
                    setLoading(false);
                });

            // 2. Busca Monitores Vinculados
            fetchLinkedMonitors(user.id);

            // 3. Busca Materiais
            fetchMateriais(user.id);

            // 4. Busca Eventos
            fetchEventos(user.id);
        } else {
            setLoading(false);
        }
    }, []);

    const fetchLinkedMonitors = (professorId: string) => {
        fetch(`/api/professor-monitores/${professorId}`)
            .then(res => res.json())
            .then(data => setMonitores(data.monitores || []))
            .catch(err => console.error("Erro ao buscar monitores:", err));
    };

    const fetchMateriais = (professorId: string) => {
        fetch(`/api/materiais?professorId=${professorId}`)
            .then(res => res.json())
            .then(data => setMateriais(data || []))
            .catch(err => console.error("Erro ao buscar materiais:", err));
    };

    const fetchEventos = (professorId: string) => {
        fetch(`/api/eventos?criador=${professorId}`)
            .then(res => res.json())
            .then(data => setEventos(data || []))
            .catch(err => console.error("Erro ao buscar eventos:", err));
    };

    const handleAddMonitorClick = () => {
        if (!usuario) return;
        fetch(`/api/professor-monitores/disponiveis/${usuario.id}`)
            .then(res => res.json())
            .then(data => {
                setAvailableMonitors(data.monitores || []);
                setShowLinkModal(true);
            })
            .catch(err => alert("Erro ao buscar monitores disponíveis."));
    };

    const handleLinkMonitor = async () => {
        if (!selectedMonitor || !usuario) return;
        try {
            const res = await fetch("/api/professor-monitores/vincular", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ professorId: usuario.id, monitorId: selectedMonitor })
            });
            if (!res.ok) throw new Error("Erro ao vincular monitor");
            alert("Monitor vinculado com sucesso!");
            setShowLinkModal(false);
            setSelectedMonitor("");
            fetchLinkedMonitors(usuario.id);
        } catch (error: any) {
            alert(error.message);
        }
    };

    const handleDeleteEvento = async (eventoId: number) => {
        if (!confirm("Tem certeza que deseja excluir este evento?")) return;
        try {
            const res = await fetch(`/api/eventos/${eventoId}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Erro ao excluir evento");
            if (usuario) fetchEventos(usuario.id);
        } catch (error) {
            console.error("Erro ao excluir evento:", error);
            alert("Erro ao excluir evento.");
        }
    };

    const nextMaterial = () => {
        setCurrentMaterialIndex((prev) => (prev + 1) % materiais.length);
    };

    const prevMaterial = () => {
        setCurrentMaterialIndex((prev) => (prev - 1 + materiais.length) % materiais.length);
    };

    if (loading) return <div className="flex justify-center items-center h-screen">Carregando...</div>;
    if (!usuario) return <div className="flex justify-center items-center h-screen">Usuário não encontrado.</div>;

    const dataNascimento = usuario.nascimento
        ? new Date(usuario.nascimento).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" })
        : "Não informado";

    const dataCadastro = usuario.criado_em
        ? new Date(usuario.criado_em).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" })
        : "Data desconhecida";

    return (
        <div className="min-h-screen flex flex-col">
            <TopBar background_image={Image.fundoSomos} />
            <main className="flex-1 bg-white px-8 py-10">
                {/* Cabeçalho do perfil */}
                <section className="flex flex-col md:flex-row items-center gap-6 mb-10">
                    <div className="relative">
                        <img src={Icons.circuloPerfil} alt="Foto" className="w-24 h-24 rounded-full" />
                        <img src={Icons.mdi_user} alt="User" className="absolute inset-0 w-24 h-24 p-6 opacity-70" />
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center w-full justify-between">
                        <div>
                            <div className="flex items-center gap-3">
                                <h2 className="text-2xl font-semibold text-gray-800">{usuario.nome}</h2>
                                <span className="text-sm bg-[#FFCBBD] text-[#2A5387] px-3 py-1 rounded-full">Professor</span>
                            </div>
                            <span className="text-xs text-gray-500 mt-1 block">cadastrado em: {dataCadastro}</span>
                        </div>
                        <button onClick={() => router.push('/editar/professor')} className="mt-4 md:mt-0 flex items-center gap-2 bg-white border border-[#FFCBBD] text-[#FFCBBD] rounded-full px-4 py-2 text-sm hover:bg-[#FFEBE5] transition">
                            <img src={Icons.lapisRosa} alt="Editar" className="w-4 h-4" />
                            Editar perfil
                        </button>
                    </div>
                </section>

                {/* Blocos de informações */}
                <section className="grid md:grid-cols-2 gap-8 mb-10">
                    <div className="border border-[#FFCBBD] rounded-xl p-6 max-w-md">
                        <h3 className="font-semibold text-gray-700 mb-3">Informações básicas</h3>
                        <ul className="text-sm text-gray-600 space-y-3">
                            <li className="flex items-center gap-2"><img src={Icons.genero} alt="Gênero" className="w-5 h-5" /><span>Gênero: {usuario.genero}</span></li>
                            <li className="flex items-center gap-2"><img src={Icons.aniversario} alt="Aniversário" className="w-5 h-5" /><span>Aniversário: {dataNascimento}</span></li>
                            <li className="flex items-center gap-2"><img src={Icons.telefone} alt="Telefone" className="w-4 h-4" /><span>Telefone: {usuario.telefone}</span></li>
                            <li className="flex items-center gap-2"><img src={Icons.email} alt="E-mail" className="w-5 h-5" /><span>E-mail: {usuario.email}</span></li>
                        </ul>
                    </div>
                    <div className="border border-[#FFCBBD] rounded-xl p-3 max-w-sm mx-auto flex flex-col justify-center h-[140px]">
                        <h3 className="font-semibold text-gray-700 mb-3 text-center">Informações</h3>
                        <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600">
                            <li><strong>Período da Orientação:</strong> {usuario.inicio_orientacao || "Não informado"}</li>
                            <li><strong>Fim do Período da Orientação:</strong> {usuario.fim_orientacao || "Não informado"}</li>
                            <li><strong>Curso:</strong> {usuario.curso || "Não informado"}</li>
                            <li><strong>Especialidade:</strong> {usuario.especialidade || "Não informado"}</li>
                        </ul>
                    </div>

                    {/* Monitores vinculados */}
                    <div className="col-span-2 bg-[#FAE0D9] rounded-xl p-6">
                        <h3 className="font-semibold text-gray-800 text-lg text-center">Monitores vinculados</h3>
                    </div>

                    <div className="col-span-2 rounded-xl p-12 bg-[url('/assets/images/fundo_top_bottom.png')] bg-center bg-cover min-h-[700px] flex flex-col items-start relative" aria-hidden="true">
                        <div className="relative mb-10">
                            <button onClick={handleAddMonitorClick} className="flex items-center gap-2 bg-[#FAE0D9] text-[#4A4A4A] px-5 py-3 rounded-[15.82px] font-medium shadow-md hover:bg-[#FFF1ED] transition">
                                <img src={Icons.lapisCinza} alt="Adicionar" className="w-5 h-5" />
                                Adicionar
                            </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full justify-items-center">
                            {monitores.length === 0 ? (
                                <div className="col-span-3 text-gray-500 italic">Nenhum monitor vinculado.</div>
                            ) : (
                                monitores.map((monitor) => (
                                    <div key={monitor.link_id} className="relative bg-white rounded-2xl shadow-lg w-[280px] h-[230px] flex flex-col items-center justify-center transition transform hover:scale-105 hover:shadow-xl">
                                        <img src={Icons.icone_3pontos} alt="Opções" className="absolute top-4 right-4 w-6 h-6 opacity-80 cursor-pointer" />
                                        <div className="w-20 h-20 rounded-full bg-gray-300 mb-5 flex items-center justify-center text-2xl text-white font-bold">{monitor.nome.charAt(0)}</div>
                                        <h3 className="text-gray-800 font-medium mb-4 text-lg">{monitor.nome}</h3>
                                        <button onClick={() => router.push(`/perfil/monitor?id=${monitor.id}`)} className="bg-[#4da1a9] text-white text-sm px-5 py-2 rounded-[20px] hover:bg-[#3a8289] transition">Verificar perfil</button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </section>

                {/* Conteúdos publicados */}
                <div className="col-span-2 bg-[#FAE0D9] rounded-xl p-6">
                    <h3 className="font-semibold text-gray-800 text-lg text-center">Conteúdos publicados</h3>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-10 mt-5">
                    {/* Coluna 1: Materiais */}
                    <div className="flex flex-col items-start gap-4">
                        <button
                            onClick={() => router.push(`/cadastrar/upload?professorId=${usuario.id}`)}
                            className="flex items-center gap-2 bg-[#FAE0D9] text-[#4A4A4A] px-5 py-3 rounded-[15.82px] font-medium shadow-md hover:bg-[#FFF1ED] transition"
                        >
                            <img src={Icons.lapisCinza} alt="Adicionar" className="w-5 h-5" />
                            Adicionar
                        </button>

                        <div className="w-[314px] h-[574px] rounded-[24.75px] border-2 border-[#FED5CA] flex items-center justify-center bg-[url('/assets/images/fundo_girassol.jpg')] bg-cover bg-center relative">
                            {materiais.length > 0 ? (
                                <>
                                    {materiais.length > 1 && (
                                        <button
                                            onClick={prevMaterial}
                                            className="absolute left-4 z-10 bg-[#FAE0D9] hover:bg-[#FED5CA] text-gray-700 hover:text-gray-900 rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                                            aria-label="Material anterior"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>
                                    )}


                                    <div className="flex flex-col items-center gap-4">
                                        <img
                                            key={materiais[currentMaterialIndex].id}
                                            src={materiais[currentMaterialIndex].capa_url || Image.capaLivro}
                                            alt={materiais[currentMaterialIndex].nome}
                                            className="w-[234px] h-[324px] object-cover rounded-xl shadow-2xl"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = Image.capaLivro;
                                            }}
                                        />
                                        <div className="bg-gradient-to-r from-[#FAE0D9] to-[#FED5CA] px-6 py-3 rounded-2xl shadow-lg max-w-[280px]">
                                            <p className="text-gray-800 font-bold text-base text-center leading-tight line-clamp-2">
                                                {materiais[currentMaterialIndex].nome}
                                            </p>
                                        </div>
                                    </div>

                                    {materiais.length > 1 && (
                                        <button
                                            onClick={nextMaterial}
                                            className="absolute right-4 z-10 bg-[#FAE0D9] hover:bg-[#FED5CA] text-gray-700 hover:text-gray-900 rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                                            aria-label="Próximo material"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    )}
                                </>
                            ) : (
                                <p className="text-white font-medium bg-black/20 px-4 py-2 rounded">Nenhum material</p>
                            )}
                        </div>
                    </div>

                    {/* Coluna intermediária: espaçamento */}
                    <div></div>

                    {/* Coluna 3: Eventos */}
                    <div className="flex flex-col items-end gap-4">
                        <button
                            onClick={() => router.push(`/cadastrar/evento?professorId=${usuario.id}`)}
                            className="flex items-center gap-2 bg-[#FAE0D9] text-[#4A4A4A] px-5 py-3 rounded-[15.82px] font-medium shadow-md hover:bg-[#FFF1ED] transition"
                        >
                            <img src={Icons.lapisCinza} alt="Criar evento" className="w-5 h-5" />
                            Criar evento
                        </button>

                        <div className="w-[382px] h-[532px] rounded-xl overflow-hidden relative bg-[url('/assets/images/fundo_somos.jpg')] bg-cover bg-center flex flex-col">
                            <div className="flex justify-between items-center bg-[#F5F5F5] px-4 py-2">
                                <h3 className="font-semibold text-gray-800">Eventos criados</h3>
                                <div className="w-6 h-6 rounded-full bg-[#FAE0D9] flex items-center justify-center">
                                    <img src={Icons.solarHeartBroken} alt="Notificação" className="w-3 h-3" />
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
                                {eventos.length === 0 ? (
                                    <p className="text-center text-gray-500 mt-10">Nenhum evento criado.</p>
                                ) : (
                                    eventos.map((event) => (
                                        <div key={event.id} className="flex items-center justify-between gap-3 bg-[#4DA1A954] p-2 rounded shadow-sm backdrop-blur-[30%]">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-[#F38E00] rounded-[10px] flex-shrink-0"></div>
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-gray-800">{event.titulo}</span>
                                                    <span className="text-xs text-gray-500">
                                                        {new Date(event.data).toLocaleDateString()} - {event.localizacao}
                                                    </span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleDeleteEvento(event.id)}
                                                className="p-1 hover:bg-red-100 rounded transition opacity-60 hover:opacity-100"
                                                title="Excluir evento"
                                            >
                                                <FiTrash2 size={16} color="#ef4444" />
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {showLinkModal && (
                <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50" onClick={(e) => e.stopPropagation()}>
                    <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Vincular Monitor</h3>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Selecione o monitor:</label>
                            <select value={selectedMonitor} onChange={(e) => setSelectedMonitor(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFDFA4]">
                                <option value="">Selecione...</option>
                                {availableMonitors.map(m => <option key={m.id} value={m.id}>{m.nome}</option>)}
                            </select>
                        </div>
                        <div className="flex justify-end gap-3">
                            <button onClick={() => setShowLinkModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">Cancelar</button>
                            <button onClick={handleLinkMonitor} disabled={!selectedMonitor} className="px-6 py-2 bg-[#6d94c5] text-white font-semibold rounded-lg hover:bg-[#5a7da8] transition disabled:opacity-50 disabled:cursor-not-allowed">Vincular</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
