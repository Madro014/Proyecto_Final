import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Caja.scss';

function Caja() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    email: '',
    direccion: '',
    ciudad: '',
    codigoPostal: '',
    pais: '',
    numeroTarjeta: '',
    fechaExpiracion: '',
    cvv: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    // Aquí iría la lógica para procesar el pago
    console.log('Datos del formulario:', formData);
    // Simular procesamiento
    setTimeout(() => {
      alert('¡Pago procesado exitosamente! (Simulación)');
      setIsProcessing(false);
      navigate('/'); // Redirigir a la home o a una página de confirmación
      // Considera limpiar el carrito aquí si el pago es exitoso
    }, 2000);
  };

  return (
    <div className="caja-page-container">
      <button onClick={() => navigate(-1)} className="back-btn-caja">
        ← Volver al carrito
      </button>
      <div className="caja-form-wrapper">
        <h2>Formulario de Pago</h2>
        <form onSubmit={handleSubmit} className="caja-form">
          <fieldset>
            <legend>Información Personal y de Envío</legend>
            <div className="form-group">
              <label htmlFor="nombreCompleto">Nombre Completo</label>
              <input type="text" id="nombreCompleto" name="nombreCompleto" value={formData.nombreCompleto} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="direccion">Dirección de Envío</label>
              <input type="text" id="direccion" name="direccion" value={formData.direccion} onChange={handleChange} required />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="ciudad">Ciudad</label>
                <input type="text" id="ciudad" name="ciudad" value={formData.ciudad} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="codigoPostal">Código Postal</label>
                <input type="text" id="codigoPostal" name="codigoPostal" value={formData.codigoPostal} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="pais">País</label>
              <input type="text" id="pais" name="pais" value={formData.pais} onChange={handleChange} required />
            </div>
          </fieldset>

          <fieldset>
            <legend>Información de Pago</legend>
            <div className="form-group">
              <label htmlFor="numeroTarjeta">Número de Tarjeta</label>
              <input type="text" id="numeroTarjeta" name="numeroTarjeta" placeholder="XXXX XXXX XXXX XXXX" value={formData.numeroTarjeta} onChange={handleChange} required />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fechaExpiracion">Fecha de Expiración</label>
                <input type="text" id="fechaExpiracion" name="fechaExpiracion" placeholder="MM/AA" value={formData.fechaExpiracion} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="cvv">CVV</label>
                <input type="text" id="cvv" name="cvv" placeholder="XXX" value={formData.cvv} onChange={handleChange} required />
              </div>
            </div>
          </fieldset>

          <button type="submit" className="submit-payment-btn" disabled={isProcessing}>
            {isProcessing ? 'Procesando...' : 'Realizar Pago'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Caja;