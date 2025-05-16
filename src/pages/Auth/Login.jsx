import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.scss';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Estado para feedback de carga
  const [error, setError] = useState(''); // Estado para mensajes de error
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // --- INICIO: SIMULACIÓN DE LOGIN EXITOSO ---
    // Esta sección simula un login exitoso para desarrollo si reqres.in tiene problemas.
    console.log('Simulando login para:', { email, password });

    // Simular un pequeño retraso como si fuera una llamada de red
    setTimeout(() => {
      // Usar el email proporcionado para simular datos de usuario
      // y un token simulado.
      localStorage.setItem('authToken', 'fake-simulated-token-for-login');
      localStorage.setItem('loggedInUser', JSON.stringify({
        email: email, // Puedes usar el email ingresado
        name: email.split('@')[0] // O una simulación del nombre
      }));
      alert('Inicio de sesión exitoso (SIMULADO).');
      navigate('/'); // Redirige al home
      window.location.reload(); // Para que Navbar se actualice
      setLoading(false); // Asegúrate de detener la carga
    }, 1000); // Simula 1 segundo de espera
    // --- FIN: SIMULACIÓN DE LOGIN EXITOSO ---

    /*
    // --- CÓDIGO ORIGINAL DE LA LLAMADA A LA API (COMENTADO PARA LA SIMULACIÓN) ---
    try {
      const response = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        // Guardar token y datos simulados del usuario
        localStorage.setItem('authToken', data.token);
        // ReqRes no devuelve el nombre, así que lo simulamos o usamos el email
        localStorage.setItem('loggedInUser', JSON.stringify({ 
          email: email, 
          name: email.split('@')[0] // Usar la parte local del email como nombre
        }));
        alert('Inicio de sesión exitoso');
        navigate('/'); // Redirige al home
        window.location.reload(); // Para que Navbar se actualice
      } else {
        setError(data.error || 'Correo o contraseña incorrectos');
        alert(data.error || 'Correo o contraseña incorrectos');
      }
    } catch (err) {
      setError('Error de conexión. Inténtalo de nuevo.');
      alert('Error de conexión. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
    // --- FIN DEL CÓDIGO ORIGINAL ---
    */
  };

  return (
    <div className="auth-bg">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        <input
          type="email"
          placeholder="Correo electrónico (ej: eve.holt@reqres.in)"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
        <p>¿No tienes cuenta? <a href="/register">Regístrate</a></p>
      </form>
    </div>
  );
}

export default Login;