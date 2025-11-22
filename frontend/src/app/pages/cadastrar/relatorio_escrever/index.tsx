"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import TopBar from '@/app/components/TopBar';
import FormSection from '@/app/components/form_relatorio';
import TypeDropdown from '@/app/components/type_dropdown';
import PatientHeader from '@/app/components/paciente_header';
import './styles.css';

export default function HomePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pacienteId = searchParams.get('pacienteId');

  const [assunto, setAssunto] = useState('');
  const [body, setBody] = useState('');
  const [selectedType, setSelectedType] = useState('INCIDENTES');
  const [patientName, setPatientName] = useState('Carregando...');

  const options = ['INCIDENTES', 'OCORRÊNCIAS', 'OBSERVAÇÕES', 'EVOLUÇÃO', 'AUTOCORREÇÃO'];

  useEffect(() => {
    if (pacienteId) {
      fetch(`/api/pacientes/${pacienteId}`)
        .then(res => res.json())
        .then(data => {
          if (data.nome) setPatientName(data.nome);
        })
        .catch(err => console.error("Erro ao buscar paciente:", err));
    } else {
      setPatientName("Paciente não identificado");
    }
  }, [pacienteId]);

  const handleSubmit = async () => {
    if (!pacienteId) {
      alert("Erro: Paciente não identificado.");
      return;
    }
    if (!assunto || !body) {
      alert("Preencha todos os campos.");
      return;
    }

    try {
      const res = await fetch('/api/relatorios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assunto,
          body,
          tipo: selectedType, // Ajuste conforme o backend espera (ex: Capitalized ou lowercase)
          pacienteId
        })
      });

      if (res.ok) {
        alert("Relatório criado com sucesso!");
        router.push(`/perfil/paciente?id=${pacienteId}`);
      } else {
        const err = await res.json();
        alert(`Erro ao criar relatório: ${err.error || 'Erro desconhecido'}`);
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao conectar com o servidor.");
    }
  };

  const handleBack = () => {
    if (pacienteId) {
      router.push(`/perfil/paciente?id=${pacienteId}`);
    } else {
      router.back();
    }
  };

  return (
    <div className="relatorio-container">
      <TopBar background_image='' />

      <div className="relatorio-content">
        <PatientHeader
          patientName={patientName}
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