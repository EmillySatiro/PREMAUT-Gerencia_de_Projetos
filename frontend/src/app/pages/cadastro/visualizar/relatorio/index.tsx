"use client";

import React, { useState } from 'react';
import TopBar from '@/app/components/TopBar';
import FormSection from '@/app/components/form_relatorio';
import PatientHeader from '@/app/components/paciente_header';
import ReportInfo from '@/app/components/report_info';
import './styles.css';

export default function HomePage() {
  const [assunto, setAssunto] = useState('');
  const [body, setBody] = useState('');

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
          <ReportInfo 
            date="05/10/2025"
            age="7 anos"
            responsible="[Nome do responsável]"
            professionalResponsible="[Seu nome / cargo]"
          />
        </PatientHeader>

        <FormSection
          labelText="Assunto:" 
          assuntoValue="mordeu o coleguinha" 
          onAssuntoChange={setAssunto}
          bodyValue="Durante a atividade de grupo, o paciente apresentou comportamento agressivo, mordendo um colega após uma disputa por um brinquedo. O episódio ocorreu por volta das 10h15, na sala de terapia, sendo a ação rápida e resultando apenas em uma marca leve, sem ferimento grave. A equipe interveio prontamente, separando as crianças e garantindo a segurança de ambos. Em seguida, foi realizada uma breve conversa com o paciente, buscando acalmá-lo e orientá-lo sobre a importância de não machucar os colegas, retomando-se depois a atividade com supervisão direta. O comportamento observado parece estar relacionado à frustração e dificuldade em compartilhar o brinquedo, indicando possíveis desafios no controle de impulsos e na autorregulação emocional."
          onBodyChange={setBody}
          assuntoPlaceholder=""
          bodyPlaceholder=""
        />
      </div>
    </div>
  );
}