"use client";

import React, { useState } from 'react';
import TopBar from '@/app/components/TopBar';
import './styles.css';
import Image from '@/app/components/assets/images';
import Icons from '@/app/components/assets/icons';

export default function HomePage() {
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [capa, setCapa] = useState<File | null>(null);
  const [nomeArquivo, setNomeArquivo] = useState('');
  const [descricao, setDescricao] = useState('');

  const handleArquivoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setArquivo(e.target.files[0]);
    }
  };

  const handleCapaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCapa(e.target.files[0]);
    }
  };

  const handleCadastrar = () => {
    console.log({
      arquivo,
      capa,
      nomeArquivo,
      descricao
    });
  };

  const handleBack = () => {
    console.log('Voltar');
  };

  return (
    <main className="upload-page">
      <TopBar background_image={Image.fundoTopBottom} />
      
      <div className="upload-content">
        <button className="back-button" onClick={handleBack}>
          <img src={Icons.mdi_arrow_back} alt="Voltar" width="54" height="54" />
        </button>

        <div className="upload-container">
          <div className="upload-grid">
            <div className="upload-left">
              <div className="upload-box">
                <input
                  type="file"
                  onChange={handleArquivoChange}
                  className="file-input"
                  id="arquivoInput"
                  accept=".pdf,.doc,.docx"
                />
                <label htmlFor="arquivoInput" className="upload-label">
                  <div className="upload-icon-cloud">
                    <img src={Icons.cloud} alt="Upload" />
                  </div>
                  <p className="upload-text">Clique aqui para escolher um arquivo</p>
                </label>
                {arquivo && <p className="file-selected">{arquivo.name}</p>}
              </div>

              <div className="upload-box">
                <input
                  type="file"
                  onChange={handleCapaChange}
                  className="file-input"
                  id="capaInput"
                  accept="image/*"
                />
                <label htmlFor="capaInput" className="upload-label">
                  <div className="upload-icon-image">
                    <img src={Icons.majesticonsImage} alt="Upload" />
                  </div>
                  <p className="upload-text">Clique aqui para escolher a capa</p>
                </label>
                {capa && <p className="file-selected">{capa.name}</p>}
              </div>
            </div>

            <div className="upload-right">
              <div className="form-group">
                <label className="form-label">Nome do Arquivo</label>
                <input
                  type="text"
                  className="form-input"
                  value={nomeArquivo}
                  onChange={(e) => setNomeArquivo(e.target.value)}
                  placeholder=""
                />
              </div>

              <div className="form-group">
                <label className="form-label">Descrição</label>
                <textarea
                  className="form-textarea"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder=""
                />
              </div>
            </div>
          </div>

          <div className="button-container">
            <button className="cadastrar-btn" onClick={handleCadastrar}>
              Cadastrar
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}