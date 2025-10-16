"use client";

import React, { useState } from 'react';
import TopBar from '../../components/TopBar';
import './styles.css';

export default function HomePage() {
  const [assunto, setAssunto] = useState('');
  const [selectedType, setSelectedType] = useState('INCIDENTES');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const options = ['INCIDENTES', 'OCORRÊNCIAS', 'OBSERVAÇÕES', 'EVOLUÇÃO'];

  const handleSubmit = () => {
    console.log({ assunto, selectedType });
  };

  return (
    <div className="relatorio-container" >
      <TopBar background_image='' />

      <div className="relatorio-content">
        <button className="back-button">
          <img src="/assets/images/mdi_arrow-up.svg" alt="Voltar" width="54" height="54" />
        </button>

        <div className="header-section">
          <div className="patient-info">
            <div className="avatar">
              <img src="/assets/images/mdi_user.svg" alt="Icon" />
            </div>
            <div className="patient-name-section">
              <h2>Nome do paciente</h2>
              <span className="badge">Paciente</span>
            </div>
          </div>

          <div className="type-selector">
            <div className="dropdown">
              <button 
                className="type-button active"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {selectedType}
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 16 16" 
                  fill="none"
                  style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
                >
                  <path d="M4 6L8 10L12 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  {options.map((option) => (
                    <button
                      key={option}
                      className={`dropdown-item ${selectedType === option ? 'selected' : ''}`}
                      onClick={() => {
                        setSelectedType(option);
                        setIsDropdownOpen(false);
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="form-section">
          <label className="form-label">Assunto:</label>
          <textarea
            className="form-textarea"
            value={assunto}
            onChange={(e) => setAssunto(e.target.value)}
            placeholder=""
          />
        </div>

        <button className="submit-button" onClick={handleSubmit}>
          CADASTRAR
        </button>
      </div>
    </div>
  );
}