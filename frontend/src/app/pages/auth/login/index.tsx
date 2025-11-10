"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import './styles.css';

const Login: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);
    setMensagem("");

    try {
      const resposta = await fetch("http://localhost:3001/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await resposta.json();

      if (!resposta.ok) {
        throw new Error(data.error || "Erro ao fazer login.");
      }

      setMensagem(data.message);
      setTimeout(() => router.push("/home"), 1000);
    } catch (erro: any) {
      setMensagem(erro.message || "Erro ao fazer login.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="container">
      {/* Conteúdo principal centralizado sobre o fundo */}
      <div className="content">
        <div className="logo-icon">
          <img src="/assets/images/logo_completa.png" alt="Logo PREMAUT" className="logo-img" />
        </div>
        <div className="login-card">
          <div className="login-title">Entrar</div>
          <div className="login-description">
            Bem-vindo ao PREMAUT, um projeto que apoia, acolhe e inclui pessoas com autismo.
          </div>

          <form onSubmit={handleSubmit}>
            <div className="campo">
              <label htmlFor="email">E-mail / Usuário</label>
              <input
                id="email"
                type="text"
                placeholder="Digite seu e-mail ou usuário"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="campo">
              <label htmlFor="senha">Senha</label>
              <input
                id="senha"
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="login-button" disabled={carregando}>
              {carregando ? "Entrando..." : "Entrar"}
            </button>
          </form>

          {mensagem && <p className="mensagem-feedback">{mensagem}</p>}

          <div className="register-link">
            <span>Não possui cadastro? </span>
            <Link href="./cadastro" className="register-link-highlight">
              <span>Cadastre-se</span>
            </Link>
          </div>
          <div className="register-link2">
            <Link href="./esqueci_a_senha" className="register-link-highlight2">
              <span>Esqueceu sua senha?</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
