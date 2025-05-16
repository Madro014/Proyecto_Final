import React from 'react';
import './navbar.scss';
import logo from '../../assets/images/logotec.png'; 

function Navbar({ onCartClick, cartItemCount }) {
  // Leer usuario autenticado desde localStorage
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const authToken = localStorage.getItem('authToken');

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img 
          src={logo} 
          alt="Logo Tec" 
          className="navbar-logo"
        />
      </div>
      {/* Ajustamos el 'gap' aquí para reducir el espacio entre el usuario y el carrito */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}> {/* Cambiado de 1.5rem a 1rem */}
        {/* Usuario */}
        {authToken && loggedInUser ? (
          <div className="navbar-user">
            {/* Icono de usuario SVG */}
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
              <path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span className="navbar-username">{loggedInUser.name || loggedInUser.email}</span>
            <button
              className="logout-btn"
              onClick={() => {
                localStorage.removeItem('loggedInUser');
                localStorage.removeItem('authToken');
                window.location.href = '/login'; // Redirigir a login y recargar
              }}
              title="Cerrar sesión"
            >
              Cerrar sesión
            </button>
          </div>
        ) : (
          <a href="/login" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            textDecoration: 'none', 
            color: '#6c5ce7', 
            fontWeight: 600 
          }}>
            {/* Icono de usuario SVG */}
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" style={{ color: '#6c5ce7' }}>
              <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
              <path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Iniciar sesión
          </a>
        )}
        {/* Carrito */}
        <button className="cart-button" onClick={onCartClick} aria-label="Carrito de compras">
          <svg className="cart-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4H5.05822C5.7541 4 6.37631 4.42893 6.59427 5.09346L9.40573 14.9065C9.62369 15.5711 10.2459 16 10.9418 16H17.5C18.1904 16 18.805 15.5786 19.0245 14.9319L20.9763 8.93188C21.2094 8.24238 20.6922 7.5 19.9636 7.5H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="10.5" cy="19.5" r="1.5" fill="currentColor"/>
            <circle cx="17.5" cy="19.5" r="1.5" fill="currentColor"/>
          </svg>
          {cartItemCount > 0 && (
            <span className="cart-badge">{cartItemCount}</span>
          )}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;