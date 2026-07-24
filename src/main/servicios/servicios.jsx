import React from 'react'
import './servicios.css'

function Servicios({ onNavigate }) {
  return (
    <section className="servicios-page">
      <div className="section-header">
        <h2>Servicios</h2>
        <p>Descubre nuestros servicios farmacéuticos y de bienestar.</p>
      </div>

      <div className="servicios-grid">
        <article className="servicio-card">
          <h3>Asesoría farmacéutica</h3>
          <p>Te ayudamos a elegir el medicamento correcto, revisar interacciones y dosis seguras.</p>
        </article>

        <article className="servicio-card">
          <h3>Vitaminas y Suplementos</h3>
          <p>Descubre nuestra amplia selección de vitaminas y suplementos para cubrir tus necesidades nutricionales.</p>
        </article>

        <article className="servicio-card">
          <h3>Productos naturales</h3>
          <p>Aceites, suplementos y opciones naturales para tu salud y bienestar.</p>
        </article>
      </div>

      <button className="btn" onClick={() => onNavigate('/')}>Volver al inicio</button>
    </section>
  )
}

export default Servicios