import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.scss';

// Removed the Register function component that was here

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // const MOCKAPI_URL = 'https://682bae33d29df7a95be41cdd.mockapi.io/api/v1'; // Eliminamos MockAPI

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Endpoint de tu backend para el login
      const response = await fetch('/api/auth/login', { // Asegúrate que este sea tu endpoint real
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Asumimos que el backend devuelve un token y datos del usuario
        localStorage.setItem('authToken', data.token); // Guardar el token JWT
        localStorage.setItem('loggedInUser', JSON.stringify(data.user)); // Guardar datos del usuario
        alert('Inicio de sesión exitoso!');
        navigate('/');
        window.location.reload(); // Para asegurar que el estado de autenticación se actualice
      } else {
        // El backend debería devolver un mensaje de error claro
        setError(data.message || 'Error en el inicio de sesión. Verifica tus credenciales.');
      }
    } catch (err) {
      setError('Error de conexión con el servidor. Inténtalo de nuevo más tarde.');
      console.error('Error en login:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-bg">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Cargando...' : 'Ingresar'}
        </button>
        <p className="auth-link">
          ¿No tienes cuenta? <a href="/register">Regístrate</a>
        </p>
      </form>
    </div>
  );
}

export default Login;