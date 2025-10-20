import React from "react";

import './styles.css'; 

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

          <div className="login-button">Entrar</div>

          <div className="register-link">
            <span>Não possui cadastro? </span>
            <div className="register-link-highlight">
              <span>Cadastre-se</span>
            </div>
          </div>
        </div>
        </div>
      </div>
    );
};

export default Login;
