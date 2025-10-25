"use client";

import React, { useState } from "react";
import TopBar from "../../components/TopBar";
import "./styles.css";

export default function CadastroEvento() {
    const [data, setData] = useState("");
    const [criador, setCriador] = useState("");
    const [localizacao, setLocalizacao] = useState("");
    const [descricao, setDescricao] = useState("");
    const [titulo, setTitulo] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ data, criador, localizacao, descricao });
    };

    return (
        <div
            className=""
            style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
        >
            {/* TopBar fixada no topo */}
            <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 }}>
            <TopBar background_image="/assets/images/fundo_somos.jpg" />
            </div>

            <div
            className="relatorio-content"
            style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                // Espaço para a TopBar fixa (ajuste o valor se a TopBar tiver outra altura)
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
                <label htmlFor="titulo">Titulo</label>
                <input
                id="titulo"
                type="text"
                placeholder="Digite o título"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                />
            </div>

            <form className="form" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", flex: 1 }}>
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

                <div className="actions">
                <button className="submit-button" type="submit">
                    CADASTRAR
                </button>
                </div>
            </form>
            </div>
        </div>
    );
}