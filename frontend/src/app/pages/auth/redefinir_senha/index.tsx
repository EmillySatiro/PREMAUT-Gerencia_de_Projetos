import React from "react";
import Link from "next/link";
import './styles.css'; 

const Redefinir_senha: React.FC = () => {
  return (
    <div className="container">
      {/* Conteúdo principal centralizado sobre o fundo */}
      <div className="content">
        <div className="logo-icon">
          <img src="/assets/images/logo_completa.png" alt="Logo PREMAUT" className="logo-img" />
        </div>
        <div className="login-card">
          <div className="login-title">Redefinir senha</div>
          <div className="login-description">
            Crie sua nova senha para acessar o site.
          </div>
            <div className="campo">
              <label htmlFor="email">Nova senha</label>
              <input
                id="email"
                type="text"
                placeholder="Digite sua nova senha"
              />
            </div>

            <div className="campo">
              <label htmlFor="senha">Confirmar nova senha</label>
              <input
                id="senha"
                type="password"
                placeholder="Digite sua nova senha"
              />
            </div>
            <button type="submit" className="login-button">
                              <Link href="./Login">
                                Redefinir
                              </Link>
                            </button>

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
