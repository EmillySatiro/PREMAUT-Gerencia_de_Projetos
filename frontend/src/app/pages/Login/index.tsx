import React from "react";

import './styles.css'; 
import Link from "next/link";

const Login: React.FC = () => {
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
            <div className="campo">
              <label htmlFor="email">E-mail / Usuário</label>
              <input
                id="email"
                type="text"
                placeholder="Digite seu e-mail ou usuário"
              />
            </div>

            <div className="campo">
              <label htmlFor="senha">Senha</label>
              <input
                id="senha"
                type="password"
                placeholder="Digite sua senha"
              />
            </div>
          <Link href="./home" className="login-button">
            Entrar
          </Link>

          <div className="register-link">
            <span>Não possui cadastro? </span>
            <Link href="./cadastro" className="register-link-highlight">
              <span>Cadastre-se</span>
            </Link>
          </div>
          <div className="register-link2">
            <Link href="./Esqueci_a_senha" className="register-link-highlight2">
              <span>Esqueceu sua senha?</span>
            </Link>
          </div>
        </div>
        </div>
      </div>
    );
};

export default Login;
