import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.scss';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState(''); // Nuevo estado para username
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!name.trim()) {
      setError('Por favor ingresa tu nombre');
      setLoading(false);
      return;
    }

    if (!username.trim()) { // Validación para username
      setError('Por favor ingresa un nombre de usuario');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          username: username, // Enviar username
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('loggedInUser', JSON.stringify(data.user));
        alert(`¡Registro exitoso! ${name}, has sido redirigido a la página principal.`);
        navigate('/');
        window.location.reload();
      } else {
        setError(data.message || 'Error en el registro. Inténtalo de nuevo.');
      }
    } catch (err) {
      setError('Error de conexión con el servidor. Inténtalo de nuevo más tarde.');
      console.error('Error en registro:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-bg">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Registrarse</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="text"
          placeholder="Nombre completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={loading}
        />
        <input // Nuevo campo para username
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          disabled={loading}
        />
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
          placeholder="Contraseña (mín. 6 caracteres)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength="6"
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>
        <p className="auth-link">
          ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
        </p>
      </form>
    </div>
  );
}

export default Register;
// La línea de setError que estaba aquí suelta ha sido eliminada ya que causaría un error.
// setError(data.error || 'Error en el registro. Intenta con: eve.holt@reqres.in si el problema persiste.'); // Elimina esta línea
