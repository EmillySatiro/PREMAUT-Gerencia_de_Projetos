'use client';

import React from 'react';
import TopBar from '../../components/TopBar';

export default function ScreenFamilly() {
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
                  Nome do Familiar
                </h2>
                <span className="text-sm bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">
                  Familiar
                </span>
              </div>
              <span className="text-xs text-gray-500 mt-1 block">
                cadastrado em: 28 maio 2024
              </span>
            </div>

            <button className="mt-4 md:mt-0 flex items-center gap-2 bg-white border border-emerald-400 text-emerald-700 rounded-full px-4 py-2 text-sm hover:bg-emerald-50 transition">
              <img
                src="/assets/images/lapis.png"
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
          <div className="border border-emerald-200 rounded-xl p-6">
            <h3 className="font-semibold text-gray-700 mb-3">Informações básicas</h3>
            <ul className="text-sm text-gray-600 space-y-3">
              <li className="flex items-center gap-2">
                <img
                  src="/assets/images/perfil_pequeno.png"
                  alt="Aluno vinculado"
                  className="w-5 h-5"
                />
                <span>Aluno vinculado: Fulano de tal</span>
              </li>
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
                  src="/assets/images/email.png"
                  alt="Telefone"
                  className="w-5 h-5"
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
          <div className="border border-emerald-200 rounded-xl p-6">
            <h3 className="font-semibold text-gray-700 mb-3">Informações de suporte</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>
                <strong>Nível de suporte:</strong> N1
              </li>
              <li>
                <strong>Estereotipia:</strong> Balançar o corpo repetidamente, bater ou sacudir as mãos, rodar objetos de forma insistente.
              </li>
              <li>
                <strong>Comorbidades:</strong> TDAH
              </li>
              <li>
                <strong>Medicação:</strong> Metilfenidato
              </li>
              <li>
                <strong>Reforçador positivo:</strong> A criança ganha um elogio ou doce ao guardar os brinquedos.
              </li>
              <li>
                <strong>Reforçador negativo:</strong> A pessoa coloca o cinto de segurança e o som irritante do carro para.
              </li>
              <li>
                <strong>Atividade física:</strong> Futebol
              </li>
            </ul>
          </div>
        </section>

        {/* Gráfico e estatísticas - layout em duas colunas */}
        <section
          className="border border-emerald-200 rounded-xl p-8 mb-10 grid md:grid-cols-2 gap-6 items-center"
          style={{ backgroundColor: 'rgb(210, 233, 223)' }}
        >
          {/* Coluna Esquerda - dados */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex flex-col gap-8 mb-6">
              <div className="text-center md:text-left">
                <p className="text-5xl font-bold text-gray-800">43</p>
                <p className="text-base text-gray-700 font-medium">INCIDENTES</p>
              </div>
              <div className="text-center md:text-left">
                <p className="text-5xl font-bold text-gray-800">34</p>
                <p className="text-base text-gray-700 font-medium">AUTOCORREÇÃO</p>
              </div>
            </div>

            <button className="bg-white text-gray-700 rounded-lg px-6 py-2 shadow-sm hover:bg-gray-50">
              VISUALIZAR
            </button>
          </div>

          {/* Coluna Direita - gráfico */}
          <div className="w-full flex justify-center">
            <img
              src="/assets/images/grafico.png"
              alt="Gráfico de incidentes e autocorreção"
              className="w-full max-w-2xl rounded-lg shadow-md"
            />
          </div>
        </section>

        {/* Relatórios */}
        <section>
          <h3
            className="text-lg font-semibold text-gray-700 mb-4 px-2 py-1 rounded-md"
            style={{ backgroundColor: 'rgb(210, 233, 223)' }}
          >
            Relatórios
          </h3>

          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="relative flex justify-between items-center bg-white rounded-xl shadow-md shadow-gray-200 p-4 hover:shadow-lg transition overflow-hidden"
              >
                {/* Background translúcido */}
                <div
                  className="absolute inset-0 opacity-10 bg-cover bg-center"
                  style={{
                    backgroundImage: "url('/assets/images/fundo_somos.jpg')",
                  }}
                ></div>

                {/* Conteúdo */}
                <div className="relative flex items-center gap-3">
                  <img
                    src="/assets/images/relatorio.png"
                    alt="Ícone de relatório"
                    className="w-6 h-6"
                  />
                  <p className="text-gray-700 text-sm font-medium">
                    Mordeu o coleguinha
                  </p>
                </div>
                <span className="relative text-xs text-gray-500">25 set 2024</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
