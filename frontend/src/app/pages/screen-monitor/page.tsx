'use client';

import React from 'react';
import TopBar from '../components/TopBar';

export default function ScreenMonitor() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* TopBar */}
            <TopBar background_image="/assets/images/fundo_somos.jpg" />

            {/* Conteúdo principal */}
            <main className="flex-1 bg-white px-8 py-10">
            {/* Cabeçalho do perfil */}
            <section className="flex flex-col md:flex-row items-center gap-6 mb-10">
            {/* Ícone do usuário */}
            <div className="relative">
                <img
                src="/assets/images/circulo_perfil.png"
                alt="Foto do usuário"
                className="w-24 h-24 rounded-full border border-gray-200"
                />
                <img
                src="/assets/images/mdi_user.svg"
                alt="Ícone de usuário"
                className="absolute inset-0 w-24 h-24 p-6 opacity-70"
                />
            </div>

            {/* Informações do usuário */}
            <div className="flex flex-col md:flex-row md:items-center w-full justify-between">
                <div>
                <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-semibold text-gray-800">
                    Nome do Monitor
                    </h2>
                    <span className="text-sm bg-[#FFDFA4] text-[#2A5387] px-3 py-1 rounded-full">
                    Monitor
                    </span>
                </div>
                <span className="text-xs text-gray-500 mt-1 block">
                    cadastrado em: 28 maio 2024
                </span>
                </div>

                <button className="mt-4 md:mt-0 flex items-center gap-2 bg-white border border-[#FFDFA4] text-[#FFDFA4] rounded-full px-4 py-2 text-sm hover:bg-[#FFF8EA] transition">
                <img
                    src="/assets/images/lapis_amarelo.png"
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
            <div className="border border-[#FFDFA4] rounded-xl p-6 max-w-md">
                <h3 className="font-semibold text-gray-700 mb-3">Informações básicas</h3>
                <ul className="text-sm text-gray-600 space-y-3">
                <li className="flex items-center gap-2">
                    <img
                    src="/assets/images/genero.png"
                    alt="Gênero"
                    className="w-5 h-5"
                    />
                    <span>Gênero: Feminino</span>
                </li>
                <li className="flex items-center gap-2">
                    <img
                    src="/assets/images/aniversario.png"
                    alt="Aniversário"
                    className="w-5 h-5"
                    />
                    <span>Aniversário: 2 Setembro 2005</span>
                </li>
                <li className="flex items-center gap-2">
                    <img
                    src="/assets/images/telefone.png"
                    alt="Telefone"
                    className="w-4 h-4"
                    />
                    <span>Telefone: (89) 99400-0000</span>
                </li>
                <li className="flex items-center gap-2">
                    <img
                    src="/assets/images/email.png"
                    alt="E-mail"
                    className="w-5 h-5"
                    />
                    <span>E-mail: fulano@gmail.com</span>
                </li>
                </ul>
            </div>

            {/* Informações de suporte */}
            <div className="border border-[#FFDFA4] rounded-xl p-3 max-w-sm mx-auto flex flex-col justify-center h-[140px]">
            <h3 className="font-semibold text-gray-700 mb-3 text-center">Informações</h3>

            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600">
                <li>
                <strong>Início da Orientação:</strong> 2024.1
                </li>
                <li>
                <strong>Fim do Período da Orientação:</strong> 2024.2
                </li>
                <li>
                <strong>Curso:</strong> Psicologia
                </li>
                <li>
                <strong>Especialidade:</strong> Saúde da criança e do adolescente
                </li>
            </ul>
            </div>

            {/* Cria uma div de fundo amarelo que ocupe toda a extensão lateral do site com o título "Alunos vinculados" centralizado apenas*/}
            <div className="col-span-2 bg-[#FFF4E1] rounded-xl p-6">
                <h3 className="font-semibold text-gray-800 text-lg text-center">Alunos vinculados</h3>
            </div>
            {/* Div com o background fundo top */}
            <div
            className="col-span-2 rounded-xl p-12 bg-[url('/assets/images/fundo_top_bottom.png')] bg-center bg-cover min-h-[700px] flex flex-col items-start"
            aria-hidden="true"
            >
            {/* Botão Adicionar */}
            <button className="flex items-center gap-2 bg-[#FCDFA1] text-[#2A5387] px-5 py-3 rounded-[15.82px] font-medium shadow-md hover:bg-[#fae7bb] transition mb-10">
                <img
                src="/assets/images/pencialcinza.svg"
                alt="Adicionar"
                className="w-5 h-5"
                />
                Adicionar
            </button>

            {/* Grid de cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full justify-items-center">
                {[...Array(6)].map((_, i) => (
                <div
                    key={i}
                    className="relative bg-white rounded-2xl shadow-lg w-[280px] h-[230px] flex flex-col items-center justify-center transition transform hover:scale-105 hover:shadow-xl"
                >
                    {/* Ícone de 3 pontos no canto superior direito */}
                    <img
                    src="/assets/images/points3.svg"
                    alt="Opções"
                    className="absolute top-4 right-4 w-6 h-6 opacity-80"
                    />

                    {/* Círculo cinza central */}
                    <div className="w-20 h-20 rounded-full bg-gray-300 mb-5"></div>

                    {/* Nome */}
                    <h3 className="text-gray-800 font-medium mb-4 text-lg">Fulano de Tal</h3>

                    {/* Botão Ver perfil */}
                    <button className="bg-[#4da1a9] text-white text-sm px-5 py-2 rounded-[20px] hover:bg-[#3a8289] transition">
                    Verificar perfil
                    </button>
                </div>
                ))}
            </div>
            </div>

            </section>
            </main>
        </div>
    );
}