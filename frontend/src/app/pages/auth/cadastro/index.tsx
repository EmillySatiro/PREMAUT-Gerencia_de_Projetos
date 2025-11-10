"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "./styles.css";

<<<<<<<< HEAD:frontend/src/app/pages/auth/cadastro/index.tsx
import Icons from "@/app/components/assets/icons";
import LogoCompleta from "@/app/components/logo_completa";

export default function cadastro() {
========
export default function Cadastro() {
>>>>>>>> c88651cd9cdafce2b0dce3f13e5eaadeb57a3fc2:frontend/src/app/pages/cadastro/index.tsx
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [genero, setGenero] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [nascimento, setNascimento] = useState("");
<<<<<<<< HEAD:frontend/src/app/pages/auth/cadastro/index.tsx
  const [confirmarSenha, setConfirmarSenha] = useState("");
========
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);
>>>>>>>> c88651cd9cdafce2b0dce3f13e5eaadeb57a3fc2:frontend/src/app/pages/cadastro/index.tsx

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

<<<<<<<< HEAD:frontend/src/app/pages/auth/cadastro/index.tsx
  return (
    <div className="editar-perfil-container">

      <div className="logo-icon">
          <LogoCompleta />
      </div>

========
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
      setTimeout(() => router.push("/Login"), 1500);
    } catch (erro: any) {
      console.error("Erro no cadastro:", erro);
      setMensagem(erro.message || "Erro ao cadastrar usuário.");
    } finally {
      setCarregando(false);
    }

  };

  return (
    <div className="editar-perfil-container">
>>>>>>>> c88651cd9cdafce2b0dce3f13e5eaadeb57a3fc2:frontend/src/app/pages/cadastro/index.tsx
      <div className="perfil-card">
        <div className="icone-perfil">
<<<<<<<< HEAD:frontend/src/app/pages/auth/cadastro/index.tsx
          <img src={Icons.mdi_user} alt="Perfil" />
========
          <img src="/assets/images/mdi_user.svg" alt="Ícone de Perfil" />
>>>>>>>> c88651cd9cdafce2b0dce3f13e5eaadeb57a3fc2:frontend/src/app/pages/cadastro/index.tsx
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
<<<<<<<< HEAD:frontend/src/app/pages/auth/cadastro/index.tsx
            <div className="linha">
              <div className="campo">
                <label>Senha</label>
                <input
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
              </div>

              <div className="campo">
                <label>Confirmar Senha</label>
                <input
                  type="password"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                />
              </div>
            </div>
========
>>>>>>>> c88651cd9cdafce2b0dce3f13e5eaadeb57a3fc2:frontend/src/app/pages/cadastro/index.tsx
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

<<<<<<<< HEAD:frontend/src/app/pages/auth/cadastro/index.tsx
          <button type="submit" className="botao-salvar">
            <Link href="./Login">
              Cadastrar
            </Link>
========
          <button type="submit" className="botao-salvar" disabled={carregando}>
            {carregando ? "Cadastrando..." : "Cadastrar"}
>>>>>>>> c88651cd9cdafce2b0dce3f13e5eaadeb57a3fc2:frontend/src/app/pages/cadastro/index.tsx
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
            <Link href="/Login" className="link">
              Entrar
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
