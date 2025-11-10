"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import "./styles.css";

const Redefinir_senha: React.FC = () => {
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState<"erro" | "sucesso" | "">("");
  const [carregando, setCarregando] = useState(false);

  const router = useRouter();
  const params = useSearchParams();

  const email = params.get("email") || "";
  const codigo = params.get("codigo") || "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!novaSenha || !confirmarSenha) {
      setMensagem("Por favor, preencha todos os campos.");
      setTipoMensagem("erro");
      return;
    }

    if (novaSenha !== confirmarSenha) {
      setMensagem("As senhas não coincidem.");
      setTipoMensagem("erro");
      return;
    }

    if (!email || !codigo) {
      setMensagem("Link inválido. Solicite novamente o código de recuperação.");
      setTipoMensagem("erro");
      return;
    }

    setCarregando(true);
    setMensagem("");

    try {
      const resposta = await fetch("http://localhost:3001/api/usuarios/redefinir-senha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, codigo, novaSenha }),
      });

      const data = await resposta.json();

      if (!resposta.ok) {
        throw new Error(data.error || "Erro ao redefinir senha.");
      }

      setMensagem("Senha redefinida com sucesso! Redirecionando para login...");
      setTipoMensagem("sucesso");


      setTimeout(() => {
      router.push("./login");
    }, 2000);
    } catch (erro: any) {
      setMensagem(erro.message || "Erro ao redefinir senha.");
      setTipoMensagem("erro");
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
          <div className="login-title">Redefinir senha</div>
          <div className="login-description">
            Crie sua nova senha para acessar o site.
          </div>

          <form onSubmit={handleSubmit}>
            <div className="campo">
              <label htmlFor="novaSenha">Nova senha</label>
              <input
                id="novaSenha"
                type="password"
                placeholder="Digite sua nova senha"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
              />
            </div>

            <div className="campo">
              <label htmlFor="confirmarSenha">Confirmar nova senha</label>
              <input
                id="confirmarSenha"
                type="password"
                placeholder="Confirme sua nova senha"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
              />
            </div>

            <button type="submit" className="login-button" disabled={carregando}>
              {carregando ? "Redefinindo..." : "Redefinir"}
            </button>
          </form>

          {mensagem && (
            <p className={`mensagem-feedback ${tipoMensagem === "erro" ? "erro" : "sucesso"}`}>
              {mensagem}
            </p>
          )}

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

export default Redefinir_senha;
