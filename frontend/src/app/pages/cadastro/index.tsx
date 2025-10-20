import React from "react";

import './styles.css'; 
const Cadastro: React.FC = () => {
  return (
   <div className="container">
        <div className="logo-icon">
      <img src="/assets/images/logo_completa.png" alt="Logo PREMAUT" />
    </div>
  <div className="card">
    <div className="title">Cadastro</div>
    
    <div className="avatar-outer">
      <div className="avatar-inner-container">
        <div className="avatar-inner"></div>
      </div>
    </div>
    
    <label className="label nome">Nome</label>
    <label className="label telefone">Telefone</label>
    <label className="label nascimento">Nascimento</label>
    <label className="label genero">Gênero</label>
    <label className="label senha">Senha</label>
    <label className="label email">E-mail</label>
    
    <button className="button">
      <span className="button-text">Cadastrar</span>
    </button>
    
    <div className="register-link">
      Já tem cadastro? <span className="register-link-highlight"><span>Login</span></span>
    </div>
    
    <div className="decor1"><div className="decor1-inner"></div></div>
    <div className="decor2"></div>
  </div>
</div>
  );
};

export default Cadastro;
