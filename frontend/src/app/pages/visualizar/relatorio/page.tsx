"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getRelatorioById } from '@/app/services/relatorioService';
import { getPacienteById } from '@/app/services/pacienteService'; // Importe o serviço de paciente
import TopBar from '@/app/components/TopBar';
import FormSection from '@/app/components/form_relatorio';
import PatientHeader from '@/app/components/paciente_header';
import ReportInfo from '@/app/components/report_info';
import './styles.css';

export default function RelatorioPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [relatorio, setRelatorio] = useState<any>(null);
  const [paciente, setPaciente] = useState<any>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
      async function fetchData() {
        if (!id) return;

        try {
          setCarregando(true);
          
          // 1. Busca o relatório pelo ID
          const dataRelatorio = await getRelatorioById(id);
          setRelatorio(dataRelatorio);

          // 2. Se o relatório possui um paciente vinculado, busca os detalhes dele
          if (dataRelatorio && dataRelatorio.paciente_id) {
             try {
                 // Usa o serviço correto que aponta para o backend
                 const dataPaciente = await getPacienteById(dataRelatorio.paciente_id);
                 setPaciente(dataPaciente);
             } catch (err) {
                 console.error('Erro ao buscar dados do paciente', err);
             }
          }
        } catch (e: any) {
          setErro(e.message || 'Erro ao buscar dados.');
        } finally {
          setCarregando(false);
        }
      }
      fetchData();
    }, [id]);

  // Função auxiliar para calcular a idade
  const calcularIdade = (dataNascimento: string) => {
      if (!dataNascimento) return "Não informado";
      const hoje = new Date();
      const nascimento = new Date(dataNascimento);
      let idade = hoje.getFullYear() - nascimento.getFullYear();
      const m = hoje.getMonth() - nascimento.getMonth();
      
      // Ajusta se ainda não fez aniversário este ano
      if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
          idade--;
      }
      return `${idade} anos`;
  };

  if (carregando) return <div className="flex justify-center items-center h-screen">Carregando...</div>;
  if (erro) return <div className="flex justify-center items-center h-screen text-red-500">{erro}</div>;

  return (
    <div className="relatorio-container">
      <TopBar background_image='' />
      <div className="relatorio-content">
        <PatientHeader 
          patientName={paciente?.nome || "Paciente não identificado"} 
          onBackClick={() => window.history.back()}
        >
          <ReportInfo 
            date={relatorio?.created_at ? new Date(relatorio.created_at).toLocaleDateString('pt-BR') : '-'}
            age={calcularIdade(paciente?.nascimento)}
            responsible={paciente?.responsavel || "Em desenvolvimento..."}
            professionalResponsible={relatorio?.profissional_responsavel || "Em desenvolvimento..."}
          />
        </PatientHeader>
        
        <FormSection
          labelText="Assunto:"
          assuntoValue={relatorio?.assunto || ''}
          onAssuntoChange={() => {}} // Função vazia para modo somente leitura
          bodyValue={relatorio?.body || ''}
          onBodyChange={() => {}} // Função vazia para modo somente leitura
          assuntoPlaceholder=""
          bodyPlaceholder=""
        />
      </div>
    </div>
  );
}