"use client";

import React, { useState } from 'react';
import TopBar from '../../components/TopBar';
import './styles.css';

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Exemplo de dados de alunos
  const alunos = [
    { id: 1, nome: "Fulano de Tal", imagem: "/assets/images/profile-placeholder.jpg" },
    { id: 2, nome: "Ciclano Silva", imagem: "/assets/images/profile-placeholder.jpg" },
    { id: 3, nome: "Beltrano Santos", imagem: "/assets/images/profile-placeholder.jpg" },
  ];
  
  const handleOptionsClick = (id: number) => {
    console.log(`Opções abertas para o aluno ID: ${id}`);
  };

  return (
    <div className="relatorio-container" >
      <TopBar background_image='/assets/images/fundo_top_bottom.png' />
        <div className="relatorio-content">
           <div className="header-section">
              <div className="search_bar">
                <input 
                  type="text" 
                  placeholder="Pesquisar aluno..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img src="/assets/images/lupa.svg" alt="Pesquisar" />
              </div>
           </div>
           <div className="cards">
                {alunos.map(aluno => (
                  <div className="card" key={aluno.id}>
                    <button 
                      className="options-button" 
                      onClick={() => handleOptionsClick(aluno.id)}
                      aria-label="Opções"
                    >
                      &#8942; {/* Símbolo de três pontos verticais */}
                    </button>
                    <div className="infos">
                        <div className="circle_image">
                          <img src={aluno.imagem} alt={`Foto de ${aluno.nome}`} />
                        </div>
                        <h1>{aluno.nome}</h1>
                        <button className="submit-button">
                          Verificar perfil
                        </button>
                    </div>
                  </div>
                ))}
           </div>
        </div>
    </div>
  );
}
