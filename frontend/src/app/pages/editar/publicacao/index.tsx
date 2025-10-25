"use client";

import React, { useState } from 'react';
import TopBar from '../../components/TopBar';
import './styles.css';

export default function HomePage() {
  const [assunto, setAssunto] = useState('');
  const [selectedType, setSelectedType] = useState('INCIDENTES');
  const [fileName, setFileName] = useState('');
  const [descricao, setDescricao] = useState('');
  
  const handleSubmit = () => {
    console.log({ assunto, selectedType, fileName, descricao });
  };

  const handleFileUpload = () => {
    // Implementar lógica de upload
    alert('Funcionalidade de upload será implementada');
  };

  const handleImageChange = () => {
    // Implementar lógica de troca de imagem
    alert('Funcionalidade de troca de imagem será implementada');
  };

  return (
    <div className="relatorio-container" >
      <TopBar background_image='/assets/images/fundo_top_bottom.png' />
      <button className="back-button">
        <img src="/assets/images/mdi_arrow-up.svg" alt="Voltar" width="54" height="54" />
      </button>
      <div className="relatorio-content">
          <div className="esquerda">
            <div className="upload_arq" onClick={handleFileUpload}>
                <img src="/assets/images/Upload_to_the_Cloud.png" alt="Upload" />
                <p>Clique aqui para substituir um arquivo</p>
            </div>
            <div className="substituir_image" onClick={handleImageChange}>
                <img src="/assets/images/majesticons_image.png" alt="Imagem" />
                <p>Clique aqui para escolher uma nova capa</p>
            </div>
          </div>
          
          <div className="direita">
              <div className="label_arquivo">
                <p>Nome do arquivo</p>
                <input 
                  type="text" 
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="Digite o nome do arquivo"
                />
              </div>
              <div className="descricao_label">
                <p>Descrição</p>
                <textarea
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Digite a descrição do arquivo"
                ></textarea>
              </div>
          </div>
      </div>
      <button className="submit-button" onClick={handleSubmit}>
        Editar
      </button>
    </div>
  );
}

