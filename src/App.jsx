// ...existing code...
import React, { useState, useEffect } from 'react'
import Contacto from './main/contacto/Contacto'
import Servicios from './main/servicios/Servicios'
import Productos from './main/Productos/Productos'
import Receta from './main/receta/receta'
import FormMenu from './main/FormMenu'
import './App.css'

function App() {
  const [route, setRoute] = useState(window.location.pathname)

  useEffect(() => {
    const handlePopState = () => setRoute(window.location.pathname)
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = (path) => {
    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path)
      setRoute(path)
    }
  }

  const renderPage = () => {
    if (route === '/contacto') return <Contacto onNavigate={navigate} />
    if (route === '/servicios') return <Servicios onNavigate={navigate} />
    if (route === '/productos') return <Productos onNavigate={navigate} />
    if (route === '/receta') return <Receta onNavigate={navigate} />
    if (route === '/formulario') return <FormMenu selectedSection="clientes" onNavigate={navigate} />

    return (
      <section className="home-page">
        <h2>Bienvenido a Farmacia Comandiu</h2>
        <p>Elige una sección para saber más sobre nuestros servicios, productos y contacto.</p>

        <div className="home-cards">
          <article className="home-card">
            <img src="/imagenes/doc.jpeg" alt="Servicios" />
            <div className="home-card-content">
              <h3>Servicios</h3>
              <p>Atención farmacéutica profesional y asesoría personalizada.</p>
              <button className="btn" onClick={() => navigate('/servicios')}>Servicios</button>
            </div>
          </article>

          <article className="home-card">
            <img src="/imagenes/vitaminas.jpeg" alt="Productos" />
            <div className="home-card-content">
              <h3>Productos</h3>
              <p>Encuentra medicamentos, vitaminas, higiene y más.</p>
              <button className="btn" onClick={() => navigate('/productos')}>Productos</button>
            </div>
          </article>

          <article className="home-card">
            <img src="/imagenes/logo.jpeg" alt="Contacto" />
            <div className="home-card-content">
              <h3>Contacto</h3>
              <p>Envía tu consulta y comunícate con nosotros rápidamente.</p>
              <button className="btn" onClick={() => navigate('/contacto')}>Contacto</button>
            </div>
          </article>

          <article className="home-card">
            <img src="/imagenes/receta.jpeg" alt="Receta" />
            <div className="home-card-content">
              <h3>Receta</h3>
              <p>Sube tu receta médica y recibe tus medicamentos sin complicaciones.</p>
              <button className="btn" onClick={() => navigate('/receta')}>Receta</button>
            </div>
          </article>
        </div>
      </section>
    )
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="brand">
          <span className="logo">FC</span>
          <div>
            <h1>Farmacia Comandiu</h1>
            <p>Tu salud, nuestra prioridad</p>
          </div>
        </div>

        <nav className="app-nav">
          <button className="nav-link" onClick={() => navigate('/')}>Inicio</button>
          <button className="nav-link" onClick={() => navigate('/servicios')}>Servicios</button>
          <button className="nav-link" onClick={() => navigate('/productos')}>Productos</button>
          <button className="nav-link" onClick={() => navigate('/contacto')}>Contacto</button>
          <button className="nav-link" onClick={() => navigate('/receta')}>Receta</button>
        <button className="nav-link" onClick={() => navigate('/formulario')}>Menú</button>
        </nav>
      </header>

      <main className="app-main">{renderPage()}</main>

      <footer className="app-footer">© 2026 Farmacia Comandiu</footer>
    </div>
  )
}

export default App
