"use client";

import React, { useState } from 'react';
import TopBar from '@/app/components/TopBar';
import FormSection from '@/app/components/form_relatorio';
import TypeDropdown from '@/app/components/type_dropdown';
import PatientHeader from '@/app/components/paciente_header';
import './styles.css';

export default function HomePage() {
  const [assunto, setAssunto] = useState('');
  const [body, setBody] = useState('');
  const [selectedType, setSelectedType] = useState('INCIDENTES');

  const options = ['INCIDENTES', 'OCORRÊNCIAS', 'OBSERVAÇÕES', 'EVOLUÇÃO'];

  const handleSubmit = () => {
    console.log({ assunto, body, selectedType });
  };

  const handleBack = () => {
    console.log('Voltar');
  };

  return (
    <div className="relatorio-container">
      <TopBar background_image='' />

      <div className="relatorio-content">
        <PatientHeader 
          patientName="Nome do paciente" 
          onBackClick={handleBack}
        >
          <div className="type-selector">
            <TypeDropdown 
              options={options}
              selectedType={selectedType}
              onSelectType={setSelectedType}
            />
          </div>
        </PatientHeader>

        <FormSection
          labelText="Assunto:" 
          assuntoValue={assunto} 
          onAssuntoChange={setAssunto}
          bodyValue={body}
          onBodyChange={setBody}
          assuntoPlaceholder=""
          bodyPlaceholder=""
        />
        
        <button className="submit-button" onClick={handleSubmit}>
          CADASTRAR
        </button>
      </div>
    </div>
  );
}