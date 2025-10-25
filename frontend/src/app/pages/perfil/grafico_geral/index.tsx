"use client";

import React, { useState } from 'react';
import TopBar from "@/app/components/TopBar";
import './styles.css';
import Image from '@/app/components/assets/images';
import Icons from '@/app/components/assets/icons';

export default function HomePage() {
  const [selectedType, setSelectedType] = useState('Filtrar');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const options = ['INCIDENTES', 'OCORRÊNCIAS', 'OBSERVAÇÕES', 'EVOLUÇÃO'];

  return (
    <div className="relatorio-container">
      <TopBar background_image='' />
      <div className="relatorio-content">
        <button className="back-button">
          <img src={Icons.mdi_arrow_back} alt="Voltar" width="54" height="54" />
        </button>

        <div className="header-section">
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
                  <path d="M4 6L8 10L12 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
          <div className="graph-container">
            <img src={Image.grafico} alt="Gráfico" className="responsive-graph" />
          </div>
        </div>
      </div>
    </div>
  );
}
