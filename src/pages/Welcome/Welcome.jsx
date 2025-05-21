import React, { useState, useEffect } from 'react';
import Spline from '@splinetool/react-spline'; // Cambiado de '@splinetool/react-spline/next'
import './Welcome.scss'; // Asegúrate que la ruta al archivo SCSS sea correcta

export default function Welcome() {
  const [showCard, setShowCard] = useState(false); // Inicia como false
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      try {
        const user = JSON.parse(loggedInUser);
        setUserName(user.name || 'Usuario');
        setShowCard(true); // Muestra la tarjeta solo si hay usuario

        // Ocultar la tarjeta después de unos segundos
        const timer = setTimeout(() => {
          setShowCard(false);
        }, 7000); // Mostrar durante 7 segundos

        // Limpiar el temporizador si el componente se desmonta o el usuario cambia
        return () => clearTimeout(timer);
      } catch (error) {
        console.error("Error al parsear datos del usuario desde localStorage:", error);
        setUserName('Usuario'); // Fallback
        setShowCard(false); // No mostrar si hay error
      }
    } else {
      setShowCard(false); // Asegúrate de que no se muestre si no hay usuario
      setUserName(''); // Limpia el nombre de usuario
    }
  }, []); // El array de dependencias vacío significa que esto se ejecuta solo al montar y desmontar

  // Si showCard es falso, no renderizar nada
  if (!showCard) {
    return null;
  }

  return (
    <div className="welcome-card-overlay">
      <div className="welcome-card">
        <button className="welcome-card-close-btn" onClick={() => setShowCard(false)}>
          &times; {/* Este es el símbolo de 'X' (multiplicación) */}
        </button>
        <h2>¡Bienvenido, {userName}!</h2>
        <p>Nos alegra tenerte aquí. Juega un rato con esto:</p>
        <div className="spline-container">
          <Spline
            scene="https://prod.spline.design/DTrtkPh80Fjlfuu1/scene.splinecode" 
          />
        </div>
        {/* Opcional: Botón para cerrar manualmente la tarjeta */}
        {/* <button onClick={() => setShowCard(false)}>Cerrar</button> */}
      </div>
    </div>
  );
}