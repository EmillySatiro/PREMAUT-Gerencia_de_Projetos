"use client";

import React from 'react';
import '../components/paciente_header.css';

interface PatientHeaderProps {
  patientName: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
  children?: React.ReactNode;
}

export default function PacienteHeader({ 
  patientName, 
  showBackButton = true, 
  onBackClick,
  children 
}: PatientHeaderProps) {
  return (
    <div className="headerContainer">
      {showBackButton && (
        <button className="backButton" onClick={onBackClick}>
          <img src="/assets/images/mdi_arrow-up.svg" alt="Voltar" width="54" height="54" />
        </button>
      )}

      <div className="headerSection">
        <div className="patientInfo">
          <div className="avatar">
            <img src="/assets/images/mdi_user.svg" alt="Icon" />
          </div>
          <div className="patientNameSection">
            <h2>{patientName}</h2>
            <span className="badge">Paciente</span>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}