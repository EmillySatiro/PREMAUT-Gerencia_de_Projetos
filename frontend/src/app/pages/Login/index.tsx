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

          <div className="input-label">E-mail/Usuário</div>
          <input className="input-field" type="text" />

          <div className="input-label">Senha</div>
          <input className="input-field" type="password" />

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
