"use client";

import React, { useState, useEffect } from 'react';
import TopBar from "@/app/components/TopBar";
import Icons from '@/app/components/assets/icons';
import Image from '@/app/components/assets/images';
import './styles.css';

// Tipo compatível com o que o backend retorna de /pacientes
type Paciente = {
  id: string;
  nome: string;
  // ...adicione outros campos se precisar...
};

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        setLoading(true);
        setError(null);

        // 🔴 AJUSTE AQUI PARA CASAR COM O PREFIXO DO BACKEND
        // Se no backend estiver app.use('/api/pacientes', pacientesRoutes);
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
        const res = await fetch(`${API_BASE}/api/pacientes`);
        // Se no seu código for app.use('/pacientes', pacientesRoutes);
        // use: const res = await fetch(`${API_BASE}/pacientes`);

        if (!res.ok) {
          throw new Error(`Erro ao buscar pacientes: ${res.status}`);
        }

        const data: Paciente[] = await res.json();
        setPacientes(data || []);
      } catch (err: any) {
        console.error("Erro ao buscar pacientes:", err);
        setError(err.message || "Erro inesperado");
        setPacientes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPacientes();
  }, []);

  const handleOptionsClick = (id: string) => {
    console.log(`Opções abertas para o paciente ID: ${id}`);
  };

  const pacientesFiltrados = pacientes.filter((paciente) =>
    paciente.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relatorio-container" >
      <TopBar background_image={Image.fundoTopBottom} />
      <div className="relatorio-content">
        <div className="header-section">
          <div className="search_bar">
            <input 
              type="text" 
              placeholder="Pesquisar paciente..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <img src={Icons.lupa} alt="Pesquisar" />
          </div>
        </div>

        {loading && (
          <p style={{ padding: 16 }}>Carregando pacientes...</p>
        )}

        {error && !loading && (
          <p style={{ padding: 16, color: 'red' }}>Erro: {error}</p>
        )}

        {!loading && !error && (
          <div className="cards">
            {pacientesFiltrados.map((paciente) => (
              <div className="card" key={paciente.id}>
                <button 
                  className="options-button" 
                  onClick={() => handleOptionsClick(paciente.id)}
                  aria-label="Opções"
                >
                  &#8942; {/* Símbolo de três pontos verticais */}
                </button>
                <div className="infos">
                  <div className="circle_image">
                    {/* Usa o mesmo ícone padrão de perfil */}
                    <img src={Icons.circuloPerfil} alt={`Foto de ${paciente.nome}`} />
                  </div>
                  <h1>{paciente.nome}</h1>
                  <button className="submit-button">
                    Verificar perfil
                  </button>
                </div>
              </div>
            ))}

            {pacientesFiltrados.length === 0 && (
              <p style={{ padding: 16 }}>Nenhum paciente encontrado.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
