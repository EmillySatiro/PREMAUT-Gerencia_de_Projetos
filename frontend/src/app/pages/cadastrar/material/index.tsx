"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import TopBar from '@/app/components/TopBar';
import './styles.css';
import Image from '@/app/components/assets/images';
import Icons from '@/app/components/assets/icons';

export default function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [arquivo, setArquivo] = useState<File | null>(null);
  const [capa, setCapa] = useState<File | null>(null);
  const [nomeArquivo, setNomeArquivo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [urlArquivo, setUrlArquivo] = useState('');
  const [capaUrl, setCapaUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    const buscarArquivo = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3001/api/materiais/${id}`);

        if (!response.ok) {
          throw new Error('Arquivo não encontrado');
        }

        const dados = await response.json();
        setNomeArquivo(dados.nome || '');
        setDescricao(dados.descricao || '');
        setUrlArquivo(dados.url || '');
        setCapaUrl(dados.capa_url || '');
      } catch (error) {
        alert('Erro ao carregar os dados do arquivo');
      } finally {
        setLoading(false);
      }
    };

    buscarArquivo();
  }, [id]);

  const handleArquivoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setArquivo(e.target.files[0]);
    }
  };

  const handleCapaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCapa(e.target.files[0]);
    }
  };

  const uploadArquivoParaStorage = async (file: File, tipo: 'arquivo' | 'capa'): Promise<string | null> => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      console.log(`📤 Enviando ${tipo}:`, file.name, file.type, file.size);

      const response = await fetch('http://localhost:3001/api/materiais', {
        method: 'POST',
        body: formData,
      });

      console.log(`📊 Response status: ${response.status} ${response.statusText}`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ Erro do servidor (${response.status}):`, errorText);
        throw new Error(`Erro ao fazer upload: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      return data.url;
    } catch (error) {
      alert(`Erro ao enviar ${tipo}`);
      return null;
    }
  };

  const atualizarMetadados = async () => {
    if (!id) return;

    setSalvando(true);
    try {
      let novaUrlArquivo = urlArquivo;
      let novaCapaUrl = capaUrl;

      if (arquivo) {
        const url = await uploadArquivoParaStorage(arquivo, 'arquivo');
        if (url) novaUrlArquivo = url;
      }

      if (capa) {
        const url = await uploadArquivoParaStorage(capa, 'capa');
        if (url) novaCapaUrl = url;
      }

      const response = await fetch(`http://localhost:3001/api/materiais/${id}/metadados`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: nomeArquivo,
          descricao: descricao,
          url: novaUrlArquivo,
          capa_url: novaCapaUrl,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar arquivo');
      }

      const dadosAtualizados = await response.json();
      console.log('✅ Arquivo atualizado:', dadosAtualizados);

      alert('Arquivo atualizado com sucesso!');
      
      setUrlArquivo(dadosAtualizados.url);
      setCapaUrl(dadosAtualizados.capa_url);
      setArquivo(null);
      setCapa(null);

    } catch (error) {
      console.error('❌ Erro ao atualizar:', error);
      alert('Erro ao atualizar arquivo');
    } finally {
      setSalvando(false);
    }
  };

  const criarNovoArquivo = async () => {
    setSalvando(true);
    try {
      if (!arquivo) {
        alert('Por favor, selecione um arquivo');
        setSalvando(false);
        return;
      }

      if (!nomeArquivo.trim()) {
        alert('Por favor, insira o nome do arquivo');
        setSalvando(false);
        return;
      }

      let urlArquivoNovo = '';
      let capaUrlNova = '';

      if (arquivo) {
        const url = await uploadArquivoParaStorage(arquivo, 'arquivo');
        if (!url) {
          setSalvando(false);
          return;
        }
        urlArquivoNovo = url;
      }

      if (capa) {
        const url = await uploadArquivoParaStorage(capa, 'capa');
        if (url) capaUrlNova = url;
      }

      // Pega o professorId da URL
      const professorId = searchParams.get('professorId');

      const response = await fetch('http://localhost:3001/api/materiais/novo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: nomeArquivo,
          descricao: descricao,
          url: urlArquivoNovo,
          capa_url: capaUrlNova,
          professor_id: professorId // Envia o ID do professor se existir
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao criar registro no banco');
      }

      const data = await response.json();
      console.log('✅ Arquivo criado:', data);

      alert('Arquivo criado com sucesso!');

      if (professorId) {
        router.push('/perfil/professor');
      } else {
        router.back();
      }

    } catch (error) {
      alert('Erro ao criar arquivo');
    } finally {
      setSalvando(false);
    }
  };

  const handleCadastrar = () => {
    if (id) {
      // Modo edição
      atualizarMetadados();
    } else {
      // Modo criação
      criarNovoArquivo();
    }
  };

  const handleBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <main className="upload-page">
        <TopBar background_image={Image.fundoTopBottom} />
        <div className="upload-content">
          <p style={{ textAlign: 'center', padding: '2rem', color: '#fff' }}>
            Carregando dados...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="upload-page">
      <TopBar background_image={Image.fundoTopBottom} />

      <div className="upload-content">
        <button className="back-button" onClick={handleBack}>
          <img src={Icons.mdi_arrow_back} alt="Voltar" width="54" height="54" />
        </button>

        <div className="upload-container">
          <div className="upload-grid">
            <div className="upload-left">
              <div className="upload-box">
                <input
                  type="file"
                  onChange={handleArquivoChange}
                  className="file-input"
                  id="arquivoInput"
                  accept=".pdf,.doc,.docx"
                  disabled={salvando}
                />
                <label htmlFor="arquivoInput" className="upload-label">
                  <div className="upload-icon-cloud">
                    <img src={Icons.cloud} alt="Upload" />
                  </div>
                  <p className="upload-text">
                    {urlArquivo
                      ? 'Arquivo já cadastrado - Clique para substituir'
                      : 'Clique aqui para escolher um arquivo'}
                  </p>
                </label>
                {arquivo && <p className="file-selected">📄 {arquivo.name}</p>}
                {!arquivo && urlArquivo && (
                  <p className="file-selected">
                    📄 Arquivo atual: <a href={urlArquivo} target="_blank" rel="noopener noreferrer">Ver arquivo</a>
                  </p>
                )}
              </div>

              <div className="upload-box">
                <input
                  type="file"
                  onChange={handleCapaChange}
                  className="file-input"
                  id="capaInput"
                  accept="image/*"
                  disabled={salvando}
                />
                <label htmlFor="capaInput" className="upload-label">
                  <div className="upload-icon-image">
                    {capaUrl && !capa ? (
                      <img
                        src={capaUrl}
                        alt="Capa atual"
                        style={{ maxWidth: '100%', maxHeight: '150px', objectFit: 'contain' }}
                      />
                    ) : (
                      <img src={Icons.majesticonsImage} alt="Upload" />
                    )}
                  </div>
                  <p className="upload-text">
                    {capaUrl
                      ? 'Clique para substituir a capa'
                      : 'Clique aqui para escolher a capa'}
                  </p>
                </label>
                {capa && <p className="file-selected">🖼️ {capa.name}</p>}
              </div>
            </div>

            <div className="upload-right">
              <div className="form-group">
                <label className="form-label">Nome do Arquivo</label>
                <input
                  type="text"
                  className="form-input"
                  value={nomeArquivo}
                  onChange={(e) => setNomeArquivo(e.target.value)}
                  placeholder=""
                  disabled={salvando}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Descrição</label>
                <textarea
                  className="form-textarea"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder=""
                  disabled={salvando}
                />
              </div>
            </div>
          </div>

          <div className="button-container">
            <button
              className="cadastrar-btn"
              onClick={handleCadastrar}
              disabled={salvando}
            >
              {salvando ? 'Salvando...' : (id ? 'Atualizar' : 'Cadastrar')}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}