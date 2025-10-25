import React from "react";

import './styles.css'; 
import Link from "next/link";
const Codigo: React.FC = () => {
  return (
    <div className="container">
      {/* Conteúdo principal centralizado sobre o fundo */}
      <div className="content">
        <div className="logo-icon">
          <img src="/assets/images/logo_completa.png" alt="Logo PREMAUT" className="logo-img" />
        </div>
        <div className="login-card">
          <div className="login-title">Esqueceu sua  senha</div>
          <div className="login-description">
           Digite o código que mandamos para seu e-mail. Logo em seguida redefina sua senha. 
          </div>
            <div className="campo">
            <label htmlFor="email">Código</label>
            <input
                id="email"
                type="text"
                placeholder="Digite o código"
            />
            </div>

            <div className="login-button">
            <Link href="./Redefinir_senha">Redefinir</Link>
            </div>

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

export default Codigo;
