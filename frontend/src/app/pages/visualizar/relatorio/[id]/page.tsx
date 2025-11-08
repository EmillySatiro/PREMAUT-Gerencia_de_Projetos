"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getRelatorioById } from '@/app/services/relatorioService';
import TopBar from '@/app/components/TopBar';
import FormSection from '@/app/components/form_relatorio';
import PatientHeader from '@/app/components/paciente_header';
import ReportInfo from '@/app/components/report_info';
import './styles.css';

export default function RelatorioPage() {
  const params = useParams();
  const id = params.id as string;
  const [relatorio, setRelatorio] = useState<any>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
      async function fetchRelatorio() {
        try {
          const data = await getRelatorioById(id);
          setRelatorio(data);
        } catch (e: any) {
          setErro(e.message || 'Erro ao buscar relatório.');
        } finally {
          setCarregando(false);
        }
      }
      fetchRelatorio();
    }, [id]);

  if (carregando) return <div>Carregando...</div>;
  if (erro) return <div>{erro}</div>;

  return (
    <div className="relatorio-container">
      <TopBar background_image='' />
      <div className="relatorio-content">
        <PatientHeader 
          patientName="Nome do paciente" 
          onBackClick={() => window.history.back()}
        >
          <ReportInfo 
            date={relatorio.created_at?.split('T')[0] || ''}
            age="7 anos"
            responsible="[Nome do responsável]"
            professionalResponsible="[Seu nome / cargo]"
          />
        </PatientHeader>
        <FormSection
          labelText="Assunto:"
          assuntoValue={relatorio.assunto}
          onAssuntoChange={() => {}}
          bodyValue={relatorio.body}
          onBodyChange={() => {}}
          assuntoPlaceholder=""
          bodyPlaceholder=""
        />
      </div>
    </div>
  );
}