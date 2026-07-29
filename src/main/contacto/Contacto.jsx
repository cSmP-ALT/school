import React, { useState } from 'react';

const Contacto = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    nombre_remitente: '',  // ✅ Nombre correcto según BD
    correo: '',            // ✅ Nombre correcto según BD
    mensaje: ''            // ✅ Nombre correcto según BD
  });
  const [loading, setLoading] = useState(false);
  const [mensajeExito, setMensajeExito] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMensajeExito('');

    try {
      const response = await fetch('http://localhost:3003/api/mensajes-contacto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre_remitente: formData.nombre_remitente,  // ✅ Campo correcto
          correo: formData.correo,                      // ✅ Campo correcto
          mensaje: formData.mensaje                     // ✅ Campo correcto
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMensajeExito('✅ ¡Mensaje enviado exitosamente!');
        setFormData({ nombre_remitente: '', correo: '', mensaje: '' });
      } else {
        setError('❌ Error: ' + data.error);
      }
    } catch (error) {
      setError('❌ Error de conexión con el servidor');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contacto-page">
      <h2>Contacto</h2>
      <p>Completa el formulario y te responderemos a la brevedad.</p>

      {mensajeExito && <div className="mensaje-exito">{mensajeExito}</div>}
      {error && <div className="mensaje-error">{error}</div>}

      <form onSubmit={handleSubmit} className="contacto-form">
        <div className="form-group">
          <label>Nombre completo:</label>
          <input
            type="text"
            name="nombre_remitente"  // ✅ Campo correcto
            value={formData.nombre_remitente}
            onChange={handleChange}
            required
            placeholder="Tu nombre"
          />
        </div>

        <div className="form-group">
          <label>Correo electrónico:</label>
          <input
            type="email"
            name="correo"           // ✅ Campo correcto
            value={formData.correo}
            onChange={handleChange}
            required
            placeholder="tu@email.com"
          />
        </div>

        <div className="form-group">
          <label>Mensaje:</label>
          <textarea
            name="mensaje"          // ✅ Campo correcto
            value={formData.mensaje}
            onChange={handleChange}
            required
            rows="5"
            placeholder="Escribe tu mensaje..."
          />
        </div>

        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar mensaje'}
        </button>
      </form>

      <button className="btn-volver" onClick={() => onNavigate('/')}>
        Volver al inicio
      </button>
    </section>
  );
};

export default Contacto;