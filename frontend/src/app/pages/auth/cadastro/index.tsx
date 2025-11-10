"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "./styles.css";
import Icons from "@/app/components/assets/icons";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [genero, setGenero] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validações básicas
    if (!nome || !email || !senha || !confirmarSenha) {
      setMensagem("⚠️ Preencha todos os campos obrigatórios.");
      return;
    }

    if (senha !== confirmarSenha) {
      setMensagem("⚠️ As senhas não coincidem.");
      return;
    }

    setCarregando(true);
    setMensagem("");

    try {
      const resposta = await fetch("http://localhost:3001/api/usuarios/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          genero,
          telefone,
          email,
          senha,
          nascimento,
        }),
      });

      // Tenta ler JSON, mas cuidado se não vier JSON
      let data;
      try {
        data = await resposta.json();
      } catch (err) {
        throw new Error("Resposta do servidor não é JSON");
      }

      if (!resposta.ok) {
        throw new Error(data.error || data.mensagem || "Erro ao cadastrar usuário.");
      }

      setMensagem("Usuário cadastrado com sucesso!");
      setTimeout(() => router.push("./login"), 1500);
    } catch (erro: any) {
      console.error("Erro no cadastro:", erro);
      setMensagem(erro.message || "Erro ao cadastrar usuário.");
    } finally {
      setCarregando(false);
    }

  };

  return (
    <div className="editar-perfil-container">
      <div className="perfil-card">
        <div className="icone-perfil">
            <img src={Icons.mdi_user} alt="Ícone de Perfil" />
        </div>

        <form className="form-perfil" onSubmit={handleSubmit}>
          <div className="linha">
            <div className="campo">
              <label>Nome *</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
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
              <label>Senha *</label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>

            <div className="campo">
              <label>Confirmar Senha *</label>
              <input
                type="password"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                required
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
                <option value="Outro">Outro</option>
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
              <label>E-mail *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="botao-salvar" disabled={carregando}>
            {carregando ? "Cadastrando..." : "Cadastrar"}
          </button>

          {mensagem && (
            <p
              className={`mensagem-feedback ${
                mensagem.startsWith("✅")
                  ? "mensagem-sucesso"
                  : "mensagem-erro"
              }`}
            >
              {mensagem}
            </p>
          )}

          <p className="link-login">
            Já tem uma conta?{" "}
            <Link href="/auth/login" className="link">
              Entrar
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
