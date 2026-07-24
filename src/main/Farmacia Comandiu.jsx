import React, { useState } from 'react'

function Contacto({ onNavigate }) {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  })
  const [status, setStatus] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.nombre || !form.email || !form.mensaje) {
      setStatus('Por favor completa todos los campos.')
      return
    }

    setStatus('Gracias por tu mensaje. Te responderemos pronto.')
    setForm({ nombre: '', email: '', mensaje: '' })
  }

  return (
    <div className="contact-page">
      <h2>Contacto</h2>
      <p>Escríbeme por el siguiente formulario y te responderé pronto.</p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre</label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          value={form.nombre}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Correo electrónico</label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="mensaje">Mensaje</label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows="5"
          value={form.mensaje}
          onChange={handleChange}
          required
        />

        <div className="contact-buttons">
          <button className="btn" type="submit">Enviar</button>
          <button
            className="btn ghost"
            type="button"
            onClick={() => onNavigate('/')}
          >
            Volver al inicio
          </button>
        </div>
      </form>

      {status && <p className="form-status">{status}</p>}
    </div>
  )
}

export default Contacto