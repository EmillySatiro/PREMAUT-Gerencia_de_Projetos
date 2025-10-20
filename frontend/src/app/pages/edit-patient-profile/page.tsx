'use client';

import React from 'react';
import TopBar from '../components/TopBar';

export default function ScreenPaciente() {
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
              alt="Foto do paciente"
              className="w-24 h-24 rounded-full border border-gray-200"
            />
            <img
              src="/assets/images/mdi_user.svg"
              alt="Ícone de paciente"
              className="absolute inset-0 w-24 h-24 p-6 opacity-70"
            />
          </div>

          {/* Informações do paciente */}
          <div className="flex flex-col md:flex-row md:items-center w-full justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Nome do paciente
                </h2>
                <span
                  className="text-sm text-white px-3 py-1 rounded-full"
                  style={{ backgroundColor: '#335B8D' }}
                >
                  Paciente
                </span>
              </div>
              <span className="text-xs text-gray-500 mt-1 block">
                cadastrado em: 28 maio 2024
              </span>
            </div>

            <button
              className="mt-4 md:mt-0 flex items-center gap-2 bg-white border text-sm rounded-full px-4 py-2 hover:bg-gray-50 transition"
              style={{ borderColor: '#335B8D', color: '#335B8D' }}
            >
              <img
                src="/assets/images/lapis_azul.png"
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
                <strong>Gênero:</strong> Feminino
              </li>
              <li>
                <strong>Aniversário:</strong> 2 Setembro 2005
              </li>
              <li>
                <strong>Telefone:</strong> (89) 99400-0000
              </li>
              <li>
                <strong>E-mail:</strong> fulano@gmail.com
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
                <p className="text-gray-800 font-semibold">N1</p>
              </div>

              <div>
                <p className="text-gray-500 font-medium">Comorbidades</p>
                <p className="text-gray-800 font-semibold">TDAH</p>
              </div>

              <div>
                <p className="text-gray-500 font-medium">Medicação</p>
                <p className="text-gray-800 font-semibold">Metilfenidato</p>
              </div>

              <div>
                <p className="text-gray-500 font-medium">Atividade Física</p>
                <p className="text-gray-800 font-semibold">Futebol</p>
              </div>
            </div>

            {/* Coluna Direita */}
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-gray-500 font-medium">Estereotipia</p>
                <p className="text-gray-800 font-semibold">
                  Balançar o corpo repetidamente, bater ou sacudir as mãos, rodar objetos
                  de forma insistente.
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
                      A criança ganha um elogio ou doce ao guardar os brinquedos.
                    </span>
                  </li>
                  <li>
                    <span className="text-gray-500 font-medium">
                      Reforçador negativo
                    </span>
                    <br />
                    <span className="text-gray-800">
                      A pessoa coloca o cinto de segurança e o som irritante do carro para.
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
                  43
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
                  34
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

          {/* Direita */}
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
          <div className="flex items-center justify-between mb-4">
            <h3
              className="text-lg font-semibold text-white px-4 py-2 rounded-md"
              style={{ backgroundColor: '#335B8D' }}
            >
              Relatórios
            </h3>

            <button
              className="flex items-center gap-2 text-white px-4 py-2 rounded-md shadow-md hover:opacity-90 transition"
              style={{ backgroundColor: '#335B8D' }}
            >
              <img
                src="/assets/images/lapis_branco.png"
                alt="Ícone escrever"
                className="w-4 h-4"
              />
              Escrever
            </button>
          </div>

          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="relative flex justify-between items-center bg-white rounded-xl shadow-md shadow-gray-200 p-4 hover:shadow-lg transition overflow-hidden"
              >
                {/* Fundo translúcido */}
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
                <span className="relative text-xs text-gray-500">
                  25 set 2024
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
