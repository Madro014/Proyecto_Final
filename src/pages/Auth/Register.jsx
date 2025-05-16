import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.scss';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // Aunque ReqRes no lo usa, lo mantenemos por si se cambia de API
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validar que el nombre no esté vacío, aunque no se envíe a ReqRes
    if (!name.trim()) {
        setError('El nombre es requerido.');
        setLoading(false);
        return;
    }

    // --- INICIO: SIMULACIÓN DE REGISTRO EXITOSO ---
    // Esta sección simula un registro exitoso para que puedas continuar con el desarrollo
    // si la API de reqres.in está presentando problemas o requiriendo una API key.
    console.log('Simulando registro para:', { name, email, password });

    // Simular un pequeño retraso como si fuera una llamada de red
    setTimeout(() => {
      alert('Usuario registrado exitosamente (SIMULADO). Por favor, inicia sesión.');
      // ReqRes normalmente no devuelve el nombre en el registro,
      // y se espera que el usuario inicie sesión después.
      navigate('/login');
      setLoading(false); // Asegúrate de detener la carga
    }, 1000); // Simula 1 segundo de espera
    // --- FIN: SIMULACIÓN DE REGISTRO EXITOSO ---

    /*
    // --- CÓDIGO ORIGINAL DE LA LLAMADA A LA API (COMENTADO PARA LA SIMULACIÓN) ---
    try {
      const response = await fetch('https://reqres.in/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // ReqRes solo espera email y password para el registro
        body: JSON.stringify({ email, password }), 
      });

      const data = await response.json();

      if (response.ok && data.id && data.token) {
        alert('Usuario registrado exitosamente con ReqRes. Por favor, inicia sesión.');
        // No guardamos el usuario aquí, ya que ReqRes no devuelve el nombre
        // y el registro exitoso solo da un ID y token.
        // El usuario deberá iniciar sesión para establecer la "sesión".
        navigate('/login'); 
      } else {
        setError(data.error || 'Error al registrar. Verifica los datos.'); // Aquí se captura "Missing API key." si data.error es eso
        alert(data.error || 'Error al registrar. Verifica los datos.');
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
        <h2>Registrarse</h2>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        <input
          type="text"
          placeholder="Nombre completo"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          disabled={loading}
        />
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
          placeholder="Contraseña (mín. 6 caracteres)" // ReqRes puede tener sus propias validaciones
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Creando cuenta...' : 'Crear cuenta'}
        </button>
        <p>¿Ya tienes cuenta? <a href="/login">Inicia sesión</a></p>
      </form>
    </div>
  );
}

export default Register;