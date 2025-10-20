import React from "react";
import "./styles.css";

const Cadastro: React.FC = () => {
  return (
    <div className="container">
      <div className="card">
        <h2>Cadastro</h2>
        <form>
          <input type="text" placeholder="Nome completo" required />
          <input type="email" placeholder="E-mail" required />
          <input type="password" placeholder="Senha" required />
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;
