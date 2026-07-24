import React, { useState } from 'react'
import './contacto.css'

function Contacto({ onNavigate }) {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  })
  const [status, setStatus] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!form.nombre || !form.email || !form.asunto || !form.mensaje) {
      setStatus('Por favor, completa todos los campos.')
      return
    }

    setStatus('Gracias por tu mensaje. Te responderemos pronto.')
    setForm({ nombre: '', email: '', asunto: '', mensaje: '' })
  }

  return (
    <section className="contacto-page">
      <div className="section-header">
        <h2>Contacto</h2>
        <p>Envía tu consulta y te responderemos lo antes posible.</p>
      </div>

      <form className="contacto-form" onSubmit={handleSubmit}>
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

        <label htmlFor="asunto">Asunto</label>
        <select
          id="asunto"
          name="asunto"
          value={form.asunto}
          onChange={handleChange}
          required
        >
          <option value="">— Selecciona un asunto —</option>
          <option value="consulta">Consulta general</option>
          <option value="pedido">Pedido</option>
          <option value="reclamo">Reclamo</option>
          <option value="sugerencia">Sugerencia</option>
          <option value="otro">Otro</option>
        </select>

        <label htmlFor="mensaje">Mensaje</label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows="5"
          value={form.mensaje}
          onChange={handleChange}
          required
        />

        <div className="contacto-buttons">
          <button className="btn" type="submit">Enviar</button>
          <button className="btn ghost" type="button" onClick={() => onNavigate('/')}>
            Volver al inicio
          </button>
        </div>

        {status && <p className="contacto-status">{status}</p>}
      </form>

      <footer className="contacto-footer">
        <div className="contacto-info">
        <p><strong>Dirección:</strong> Camino Real Norte, Municipio de Nicolas Romero</p>
          <p><strong>Teléfono:</strong> +56 5549087860</p>
          <p><strong>Correo:</strong> santiaguinomorales@gmail.com</p>
          <p><strong>Horario de atención:</strong> Lun-Vie 09:00 - 20:00 · Sáb 09:00 - 14:00 · Domingo cerrado</p>
        </div>
      </footer>
    </section>
  )
}

export default Contacto
