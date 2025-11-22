'use client';

import React from 'react';
import TopBar from '../components/TopBar';

export default function ScreenProfessor() {
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
                                    Nome do Professor
                                </h2>
                                <span className="text-sm bg-[#FFCBBD] text-[#2A5387] px-3 py-1 rounded-full">
                                    Professor
                                </span>
                            </div>
                            <span className="text-xs text-gray-500 mt-1 block">
                                cadastrado em: 28 maio 2024
                            </span>
                        </div>

                        <button className="mt-4 md:mt-0 flex items-center gap-2 bg-white border border-[#FFCBBD] text-[#FFCBBD] rounded-full px-4 py-2 text-sm hover:bg-[#FFEBE5] transition">
                            <img
                                src="/assets/images/lapisrosa.svg"
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
                    <div className="border border-[#FFCBBD] rounded-xl p-6 max-w-md">
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
                    <div className="border border-[#FFCBBD] rounded-xl p-3 max-w-sm mx-auto flex flex-col justify-center h-[140px]">
                        <h3 className="font-semibold text-gray-700 mb-3 text-center">Informações</h3>

                        <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600">
                            <li>
                                <strong>Período da Monitoria:</strong> 2024.1
                            </li>
                            <li>
                                <strong>Fim do Período da Monitoria:</strong> 2024.2
                            </li>
                            <li>
                                <strong>Curso:</strong> Psicologia
                            </li>
                            <li>
                                <strong>Professor responsável:</strong> Taylor Swift
                            </li>
                        </ul>
                    </div>

                    {/* Monitores vinculados */}
                    <div className="col-span-2 bg-[#FAE0D9] rounded-xl p-6">
                        <h3 className="font-semibold text-gray-800 text-lg text-center">Monitores vinculados</h3>
                    </div>

                    {/* Div com fundo top */}
                    <div
                        className="col-span-2 rounded-xl p-12 bg-[url('/assets/images/fundo_top_bottom.png')] bg-center bg-cover min-h-[700px] flex flex-col items-start"
                        aria-hidden="true"
                    >
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

                {/* Conteúdos publicados */}
                <div className="col-span-2 bg-[#FAE0D9] rounded-xl p-6">
                    <h3 className="font-semibold text-gray-800 text-lg text-center">Monitores vinculados</h3>
                </div>
                {/* Grid de colunas */}
                <div className="grid md:grid-cols-3 gap-8 mb-10 mt-5">
                    {/* Coluna 1: Livro publicado */}
                    <div className="flex flex-col items-start gap-4">
                        {/* Botão Adicionar */}
                        <button className="flex items-center gap-2 bg-[#FAE0D9] text-[#4A4A4A] px-5 py-3 rounded-[15.82px] font-medium shadow-md hover:bg-[#FFF1ED] transition">
                            <img
                                src="/assets/images/pencialcinza.svg"
                                alt="Adicionar"
                                className="w-5 h-5"
                            />
                            Adicionar
                        </button>

                        {/* Container do livro */}
                        <div className="w-[314px] h-[574px] rounded-[24.75px] border-2 border-[#FED5CA] flex items-center justify-center bg-[url('/assets/images/fundo_girassol.jpg')] bg-cover bg-center">
                            <img
                                src="/assets/images/capa_livro.jpg"
                                alt="Capa do livro"
                                className="w-[234px] h-[324px] object-cover rounded"
                            />
                        </div>
                    </div>

                    {/* Coluna intermediária: espaçamento */}
                    <div></div>

                    {/* Coluna 3: Eventos criados */}
                    <div className="flex flex-col items-end gap-4">
                        {/* Botão Criar evento */}
                        <button className="flex items-center gap-2 bg-[#FAE0D9] text-[#4A4A4A] px-5 py-3 rounded-[15.82px] font-medium shadow-md hover:bg-[#FFF1ED] transition">
                            <img
                                src="/assets/images/pencialcinza.svg"
                                alt="Criar evento"
                                className="w-5 h-5"
                            />
                            Criar evento
                        </button>

                        {/* Container de eventos */}
                        <div className="w-[382px] h-[532px] rounded-xl overflow-hidden relative bg-[url('/assets/images/fundo_somos.jpg')] bg-cover bg-center flex flex-col">
                            {/* Cabeçalho */}
                            <div className="flex justify-between items-center bg-[#F5F5F5] px-4 py-2">
                                <h3 className="font-semibold text-gray-800">Eventos criados</h3>
                                <div className="w-6 h-6 rounded-full bg-[#FAE0D9] flex items-center justify-center">
                                    <img
                                        src="/assets/images/solar_bell-broken.svg"
                                        alt="Notificação"
                                        className="w-3 h-3"
                                    />
                                </div>
                            </div>

                            {/* Lista de eventos */}
                            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
                                {[
                                    { title: 'Evento1', time: '2h atrás', place: 'Administrador' },
                                    { title: 'Evento2', time: '2h atrás', place: 'Administrador' },
                                    { title: 'Evento3', time: '4h atrás', place: 'Cantina' },
                                ].map((event, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-3 bg-[#4DA1A954] p-2 rounded shadow-sm backdrop-blur-[30%]"
                                    >
                                        <div className="w-10 h-10 bg-[#F38E00] rounded-[10px] flex-shrink-0"></div>
                                        <div className="flex flex-col">
                                            <span className="font-medium text-gray-800">{event.title}</span>
                                            <span className="text-xs text-gray-500">
                                                {event.time} - {event.place}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
