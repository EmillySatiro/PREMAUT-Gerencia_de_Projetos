"use client";


import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import "./styles.css";


const Esqueci_a_senha: React.FC = () => {
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  const router = useRouter();

  const handleEnviarCodigo = async () => {
    if (!email) {
      setMensagem("Por favor, insira seu e-mail.");
      return;
    }

    setCarregando(true);
    setMensagem("");

    try {
      const resposta = await fetch("http://localhost:3001/api/usuarios/esqueci-senha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await resposta.json();

      if (!resposta.ok) {
        throw new Error(data.error || "Erro ao enviar código.");
      }

      setMensagem("Código enviado com sucesso!");

   
      setTimeout(() => {
  
        router.push(`./codigo?email=${encodeURIComponent(email)}`);
      }, 1000);

    } catch (erro: any) {
      setMensagem(erro.message || "Erro ao enviar código.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="container">
      <div className="content">
        <div className="logo-icon">
          <img src="/assets/images/logo_completa.png" alt="Logo PREMAUT" className="logo-img" />
        </div>
        <div className="login-card">
          <div className="login-title">Esqueceu sua senha</div>
          <div className="login-description">
            Digite o seu e-mail para recuperar sua conta.
            Um código de confirmação será enviado para o seu e-mail.
          </div>

          <div className="campo">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="text"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            className="login-button"
            onClick={handleEnviarCodigo}
            disabled={carregando}
          >
            {carregando ? "Enviando..." : "Continuar"}
          </button>

          {mensagem && <p className="mensagem-feedback">{mensagem}</p>}

          <div className="register-link">
            <span>Não possui cadastro? </span>
            <Link href="./cadastro" className="register-link-highlight">
              <span>Cadastre-se</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Esqueci_a_senha;