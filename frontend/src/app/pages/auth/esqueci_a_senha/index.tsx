import React from "react";
import Link from "next/link";
import './styles.css'; 

const Esqueci_a_senha: React.FC = () => {
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
            Digite o seu e-mail para recuperar sua conta.
            Chegará um código de confirmação no seu e-mail , 
            clique em continuar para digitar o código. 
          </div>
            <div className="campo">
            <label htmlFor="email">E-mail </label>
            <input
                id="email"
                type="text"
                placeholder="Digite seu e-mail"
            />
            </div>

            <Link href="./Codigo" className="login-button">
              Continuar
            </Link>

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
