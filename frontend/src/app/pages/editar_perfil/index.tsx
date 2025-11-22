"use client";

import React, { useEffect, useState } from "react";
import "./styles.css";

const API_BASE =
  (process.env.NEXT_PUBLIC_API_URL as string) ||
  (process.env.REACT_APP_API_URL as string) ||
  "http://localhost:3001";

// Ajuste para o endpoint que retorna os dados do usuário autenticado
const PERFIL_ROUTE = "/api/usuarios/me";

async function safeJson(res: Response) {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return { raw: text };
  }
}

function formatToInputDate(value?: string) {
  if (!value) return "";
  // aceita ISO com hora (ex: 2023-05-01T00:00:00.000Z) ou já yyyy-mm-dd
  const d = value.split("T")[0];
  return d;
}

export default function EditarPerfil() {
  const [nome, setNome] = useState("");
  const [genero, setGenero] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetchPerfil() {
      setInitialLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE}${PERFIL_ROUTE}`, {
          method: "GET",
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });

        if (res.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login";
          return;
        }

        const dados = await safeJson(res);

        if (!res.ok) {
          console.error("Erro ao buscar perfil:", dados);
          return;
        }

        if (!mounted) return;

        setNome(dados.nome || "");
        setGenero(dados.genero || "");
        setTelefone(dados.telefone || "");
        setEmail(dados.email || "");
        setNascimento(formatToInputDate(dados.nascimento));
      } catch (err) {
        console.error("Falha ao carregar perfil:", err);
      } finally {
        if (mounted) setInitialLoading(false);
      }
    }

    fetchPerfil();
    return () => {
      mounted = false;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}${PERFIL_ROUTE}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          nome,
          genero,
          telefone,
          email,
          nascimento,
        }),
      });

      if (res.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
      }

      const dados = await safeJson(res);

      if (!res.ok) {
        throw new Error(dados.message || "Erro ao atualizar perfil");
      }

      alert("✅ Perfil atualizado com sucesso!");
      console.log("Perfil atualizado:", dados);
    } catch (erro: any) {
      console.error("Erro ao atualizar perfil:", erro);
      alert(`❌ Falha ao atualizar perfil. ${erro?.message || ""}`);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="editar-perfil-container">
        <div className="topbar-wrapper">
          <img
            src="/assets/images/solar_heart-broken.svg"
            alt="Coração"
            className="h-10 w-10"
          />
          <span className="premautTitle" style={{ marginLeft: 8 }}>
            PREMAUT
          </span>
        </div>
        <div className="perfil-card">
          <p>Carregando dados do perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="editar-perfil-container">
      <div className="topbar-wrapper">
        <img
          src="/assets/images/solar_heart-broken.svg"
          alt="Coração"
          className="h-10 w-10"
        />
        <span className="premautTitle" style={{ marginLeft: 8 }}>
          PREMAUT
        </span>
      </div>

      <div className="perfil-card">
        <button className="voltar" onClick={() => window.history.back()}>
          <img src="/assets/images/mdi_arrow-up.svg" alt="Voltar" width="32" />
        </button>

        <div className="icone-perfil">
          <img src="/assets/images/mdi_user.svg" alt="Perfil" />
        </div>

        <form className="form-perfil" onSubmit={handleSubmit}>
          <div className="linha">
            <div className="campo">
              <label>Nome</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Digite seu nome"
                required
              />
            </div>

            <div className="campo">
              <label>Telefone</label>
              <input
                type="tel"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                placeholder="(99) 99999-9999"
              />
            </div>
          </div>

          <div className="linha">
            <div className="campo">
              <label>Gênero</label>
              <select value={genero} onChange={(e) => setGenero(e.target.value)}>
                <option value="">Selecione</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
              </select>
            </div>

            <div className="campo">
              <label>Nascimento</label>
              <input
                type="date"
                value={nascimento}
                onChange={(e) => setNascimento(e.target.value)}
              />
            </div>
          </div>

          <div className="linha">
            <div className="campo email-campo">
              <label>E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@exemplo.com"
                required
              />
            </div>
          </div>

          <button type="submit" className="botao-salvar" disabled={loading}>
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </form>
      </div>
    </div>
  );
}
