import React, { useState } from 'react';

const FormMenu = ({ selectedSection, onNavigate }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',        // ✅ Cambiado de 'email' a 'correo'
    telefono: '',
    dirección: ''      // ✅ Cambiado de 'direccion' a 'dirección'
  });
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje('');

    try {
      // Busca esta línea y verifica que dice 3003
const response = await fetch('http://localhost:3003/api/clientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          correo: formData.correo,        // ✅ Nombre correcto
          telefono: formData.telefono,
          dirección: formData.dirección   // ✅ Nombre correcto
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMensaje('✅ Cliente registrado exitosamente');
        setFormData({ nombre: '', correo: '', telefono: '', dirección: '' });
      } else {
        setMensaje('❌ Error: ' + data.error);
      }
    } catch (error) {
      setMensaje('❌ Error de conexión con el servidor');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="form-menu-page">
      <h2>Registro de Clientes</h2>
      
      {mensaje && <div className={mensaje.includes('✅') ? 'mensaje-exito' : 'mensaje-error'}>{mensaje}</div>}

      <form onSubmit={handleSubmit} className="form-menu">
        <div className="form-group">
          <label>Nombre completo:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            placeholder="Tu nombre"
          />
        </div>

        <div className="form-group">
          <label>Correo electrónico:</label>
          <input
            type="email"
            name="correo"           // ✅ Cambiado a 'correo'
            value={formData.correo}
            onChange={handleChange}
            required
            placeholder="tu@email.com"
          />
        </div>

        <div className="form-group">
          <label>Teléfono:</label>
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            placeholder="555-1234"
          />
        </div>

        <div className="form-group">
          <label>Dirección:</label>
          <input
            type="text"
            name="dirección"        // ✅ Cambiado a 'dirección'
            value={formData.dirección}
            onChange={handleChange}
            placeholder="Calle y número"
          />
        </div>

        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrar cliente'}
        </button>
      </form>

      <button className="btn-volver" onClick={() => onNavigate('/')}>
        Volver al inicio
      </button>
    </section>
  );
};

export default FormMenu;
const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje('');

    try {
        const response = await fetch('http://localhost:3003/api/clientes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre: formData.nombre,
                correo: formData.correo,        // ✅ Usa 'correo'
                telefono: formData.telefono,
                dirección: formData.dirección   // ✅ Usa 'dirección'
            })
        });

        const data = await response.json();

        if (response.ok) {
            setMensaje('✅ Cliente registrado exitosamente');
            setFormData({ nombre: '', correo: '', telefono: '', dirección: '' });
        } else {
            setMensaje('❌ Error: ' + data.error);
        }
    } catch (error) {
        setMensaje('❌ Error de conexión con el servidor');
        console.error('Error:', error);
    } finally {
        setLoading(false);
    }
};