import React from 'react';
import './Carga.scss';
import logo from '../../assets/images/logotec.png'; // Importa tu logo

function Carga() {
  return (
    <div className="carga-page-container">
      <div className="carga-content">
        <img src={logo} alt="Tech Shop Logo" className="carga-logo" />
        <p className="carga-texto">
          Cargando, bienvenido a Tech Shop
        </p>
      </div>
    </div>
  );
}

export default Carga;