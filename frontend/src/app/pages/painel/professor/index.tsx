"use client";

import React, { useState } from 'react';
import TopBar from "@/app/components/TopBar";
import Icons from '@/app/components/assets/icons';
import Image from '@/app/components/assets/images';
import './styles.css';

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Exemplo de dados de alunos
  const alunos = [
    { id: 1, nome: "Fulano de Tal", imagem: Icons.circuloPerfil},
    { id: 2, nome: "Ciclano Silva", imagem: Icons.circuloPerfil },
    { id: 3, nome: "Beltrano Santos", imagem: Icons.circuloPerfil },
  ];
  
  const handleOptionsClick = (id: number) => {
    console.log(`Opções abertas para o aluno ID: ${id}`);
  };

  return (
    <div className="relatorio-container" >
      <TopBar background_image={Image.fundoTopBottom} />
        <div className="relatorio-content">
           <div className="header-section">
              <div className="search_bar">
                <input 
                  type="text" 
                  placeholder="Pesquisar aluno..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img src={Icons.lupa} alt="Pesquisar" />
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
