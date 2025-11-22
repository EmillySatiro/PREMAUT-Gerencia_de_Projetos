"use client";

import React, { useState } from "react";
import TopBar from "../../components/TopBar";
import "./styles.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

export default function CadastroEvento() {
  const [data, setData] = useState("");
  const [criador, setCriador] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [descricao, setDescricao] = useState("");
  const [titulo, setTitulo] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validação mínima
    if (!titulo.trim() || !data || !localizacao.trim()) {
      setError("Preencha pelo menos título, data e localização.");
      return;
    }

    // Constrói payload dinamicamente
    const payload: Record<string, any> = {
      titulo: titulo.trim(),
      data,
      localizacao: localizacao.trim(),
      descricao: descricao.trim(),
    };
    if (criador.trim()) {
      payload.criador = criador.trim();
    }

    setLoading(true);
    try {
    // usa AbortController para timeout e melhor tratamento de erro
    const controller = new AbortController();
    const timeout = 10000; // 10s
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    let res: Response;
    try {
      res = await fetch(`${API_URL}/eventos`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeoutId);
    }

    // tratamento de erro da resposta
    if (!res.ok) {
      const contentType = res.headers.get("content-type") ?? "";
      const errText = await res.text().catch(() => "");
      let errMsg: string | null = `Erro ${res.status}`;

      if (errText) {
        if (contentType.includes("application/json")) {
        try {
          const parsed = JSON.parse(errText);
          // tenta extrair possíveis campos comuns de erro
          errMsg =
            parsed?.error ??
            parsed?.message ??
            parsed?.mensagem ??
            (typeof parsed === "string" ? parsed : JSON.stringify(parsed));
        } catch {
          errMsg = errText;
        }
        } else {
        errMsg = errText;
        }
      }

      throw new Error(errMsg || `Erro ${res.status}`);
    }

      const result = await res.json().catch(() => null);
      setSuccess("Evento cadastrado com sucesso!");
      // limpa campos
      setTitulo("");
      setData("");
      setCriador("");
      setLocalizacao("");
      setDescricao("");
      console.log("Resposta do backend:", result);
    } catch (err: unknown) {
      console.error(err);
      const message =
        err instanceof Error
          ? err.message
          : typeof err === "string"
          ? err
          : JSON.stringify(err) || "Erro ao conectar com o backend.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 }}>
        <TopBar background_image="/assets/images/fundo_somos.jpg" />
      </div>

      <div
        className="relatorio-content"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          paddingTop: 80,
        }}
      >
        <button
          className="back-button"
          type="button"
          onClick={() => window.history.back()}
        >
          <img
            src="/assets/images/mdi_arrow-up.svg"
            alt="Voltar"
            width="54"
            height="54"
          />
        </button>

        <div style={{ marginTop: "50px", marginBottom: "50px" }}>
          <h1 className="titulo">Cadastro de Evento</h1>
        </div>

        <div className="campo">
          <label htmlFor="titulo">Título</label>
          <input
            id="titulo"
            type="text"
            placeholder="Digite o título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>

        <form
          className="form"
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", flex: 1 }}
        >
          <div className="linha">
            <div className="campo metade">
              <label htmlFor="data">Data</label>
              <input
                id="data"
                type="date"
                value={data}
                onChange={(e) => setData(e.target.value)}
              />
            </div>

            <div className="campo metade">
              <label htmlFor="criador">Criador do evento</label>
              <input
                id="criador"
                type="text"
                placeholder="Nome do criador"
                value={criador}
                onChange={(e) => setCriador(e.target.value)}
              />
            </div>
          </div>

          <div className="campo">
            <label htmlFor="localizacao">Localização</label>
            <input
              id="localizacao"
              type="text"
              placeholder="Digite o local"
              value={localizacao}
              onChange={(e) => setLocalizacao(e.target.value)}
            />
          </div>

          <div className="campo" style={{ flex: 1 }}>
            <label htmlFor="descricao">Descrição</label>
            <textarea
              id="descricao"
              rows={4}
              placeholder="Descreva o evento"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              style={{ height: "100%" }}
            />
          </div>

          {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}
          {success && (
            <div style={{ color: "green", marginBottom: 8 }}>{success}</div>
          )}

          <div className="actions">
            <button className="submit-button" type="submit" disabled={loading}>
              {loading ? "Cadastrando..." : "CADASTRAR"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
