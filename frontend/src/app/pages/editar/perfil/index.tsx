"use client";

import React, { useState } from "react";
import TopBar from "../../components/TopBar";
import "./styles.css";

export default function EditarPerfil() {
  const [nome, setNome] = useState("");
  const [genero, setGenero] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [nascimento, setNascimento] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ nome, genero, telefone, email, nascimento });
  };


  return (
    <div className="editar-perfil-container">
     
    <div
      className="topbar-wrapper"
    >
      <img src="/assets/images/solar_heart-broken.svg" alt="Coração" className="h-10 w-10" />
      <span className="premautTitle" style={{ marginLeft: 8 }}>PREMAUT</span>
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
              />
            </div>

            <div className="campo">
              <label>Telefone</label>
              <input
                type="tel"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
              />
            </div>
          </div>

          <div className="linha">
            <div className="campo">
              <label>Gênero</label>
              <select
                value={genero}
                onChange={(e) => setGenero(e.target.value)}
              >
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
              />
            </div>
          </div>

          <button type="submit" className="botao-salvar">
            Salvar
          </button>

         
        </form>
      </div>
    </div>
  );
}
