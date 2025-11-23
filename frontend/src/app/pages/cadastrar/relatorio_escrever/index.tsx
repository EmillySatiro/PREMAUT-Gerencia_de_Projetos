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
  const pacienteId = searchParams.get("paciente");   

  const [assunto, setAssunto] = useState('');
  const [body, setBody] = useState('');
  const [selectedType, setSelectedType] = useState('incidente');

  const [paciente, setPaciente] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const tiposValidos = ['incidente', 'autocorreção'];

  useEffect(() => {
    if (!pacienteId) return;

    const loadPaciente = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/pacientes/${pacienteId}`);
        if (!res.ok) throw new Error("Erro ao buscar paciente");

        const data = await res.json();
        setPaciente(data);
      } catch (err) {
        console.error("Erro ao carregar paciente:", err);
      }
    };

    loadPaciente();
  }, [pacienteId]);

  const handleSubmit = async () => {
    if (!pacienteId) {
      alert("Paciente ID é obrigatório");
      return;
    }

    const payload = {
      assunto,
      body,
      tipo: selectedType,
      paciente_id: pacienteId.trim()
    };

    console.log("Payload enviado:", payload);

    try {
      let url = "http://localhost:3001/api/relatorios";
      let method = "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error("Erro API:", err);
        throw new Error("Erro ao salvar relatório");
      }

      alert("Relatório salvo com sucesso!");
      console.log("✅ Relatório salvo:", await res.json());
    } catch {
      alert("Erro ao salvar relatório");
    }
  };

  return (
    <div className="relatorio-container">
      <TopBar background_image='' />

      <div className="relatorio-content">

        <PatientHeader
          patientName={paciente ? paciente.nome : "Carregando paciente..."}
          onBackClick={() => router.back()}
        >
          <div className="type-selector">
            <TypeDropdown
              options={tiposValidos}
              selectedType={selectedType}
              onSelectType={setSelectedType}
            />
          </div>
        </PatientHeader>

        {loading ? (
          <p style={{ color: '#fff' }}>Carregando...</p>
        ) : (
          <>
            <FormSection
              labelText="Assunto:"
              assuntoValue={assunto}
              onAssuntoChange={setAssunto}
              bodyValue={body}
              onBodyChange={setBody}
            />

            <button className="submit-button" onClick={handleSubmit}>
              {"CADASTRAR"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
