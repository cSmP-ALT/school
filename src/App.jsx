import React, { useState, useEffect } from 'react'
import Contacto from './main/contacto/Contacto'
import Servicios from './main/servicios/Servicios'
import Productos from './main/Productos/Productos'
import Receta from './main/receta/receta'
import FormMenu from './main/FormMenu'
import './App.css'

function App() {
  const [route, setRoute] = useState(window.location.pathname)
  
  // Estados para el login
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [mensaje, setMensaje] = useState('')
  const [usuarioLogueado, setUsuarioLogueado] = useState(null)

  // Verificar si hay sesión guardada al cargar
  useEffect(() => {
    const token = localStorage.getItem('token')
    const usuario = localStorage.getItem('usuario')
    if (token && usuario) {
      setUsuarioLogueado(JSON.parse(usuario))
    }
  }, [])

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

  // ============================================
  // 🔐 FUNCIÓN PARA INICIAR SESIÓN
  // ============================================
  
  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMensaje('')

    try {
      console.log('Intentando login...');
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correo: correo,
          password: password
        })
      });
      
      const data = await response.json();
      console.log('✅ Respuesta:', data);
      
      if (response.ok) {
        setMensaje('✅ Login exitoso!')
        setUsuarioLogueado(data.usuario)
        localStorage.setItem('token', data.token)
        localStorage.setItem('usuario', JSON.stringify(data.usuario))
        alert('✅ Login exitoso! Bienvenido ' + data.usuario.nombre)
        setCorreo('')
        setPassword('')
      } else {
        setMensaje('❌ Error: ' + data.mensaje)
        alert('❌ Error: ' + data.mensaje)
      }
    } catch (error) {
      console.error('❌ Error:', error);
      setMensaje('❌ Error de conexión. ¿El servidor está corriendo?')
      alert('❌ Error de conexión. ¿El servidor está corriendo en el puerto 3000?')
    } finally {
      setLoading(false)
    }
  }

  // ============================================
  // 🔐 FUNCIÓN PARA CERRAR SESIÓN
  // ============================================
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    setUsuarioLogueado(null)
    setMensaje('Sesión cerrada')
    alert('Sesión cerrada correctamente')
  }

  // ============================================
  // 🎨 RENDERIZAR PÁGINA
  // ============================================

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

        {/* ============================================ */}
        {/* 🔐 FORMULARIO DE LOGIN */}
        {/* ============================================ */}
        <div style={{
          maxWidth: '400px',
          margin: '20px auto',
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9'
        }}>
          <h3 style={{ marginTop: 0 }}>Iniciar Sesión</h3>
          
          {mensaje && (
            <div style={{
              padding: '10px',
              marginBottom: '10px',
              backgroundColor: mensaje.includes('✅') ? '#d4edda' : '#f8d7da',
              color: mensaje.includes('✅') ? '#155724' : '#721c24',
              borderRadius: '4px',
              border: '1px solid ' + (mensaje.includes('✅') ? '#c3e6cb' : '#f5c6cb')
            }}>
              {mensaje}
            </div>
          )}

          {usuarioLogueado ? (
            <div>
              <p style={{ color: 'green' }}>✅ Conectado como: <strong>{usuarioLogueado.nombre}</strong></p>
              <p>Rol: {usuarioLogueado.rol}</p>
              <button
                onClick={handleLogout}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Correo electrónico:
                </label>
                <input
                  type="email"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  required
                  placeholder="admin@farmacia.com"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Contraseña:
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="admin123"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: loading ? '#6c757d' : '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontSize: '16px'
                }}
              >
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </button>
            </form>
          )}
        </div>

        {/* ============================================ */}
        {/* 📋 CARDS DE LA PÁGINA PRINCIPAL */}
        {/* ============================================ */}
        <div className="home-cards">
          <article className="home-card">
            <img src="./imagenes/doc.jpeg" alt="Servicios" />
            <div className="home-card-content">
              <h3>Servicios</h3>
              <p>Atención farmacéutica profesional y asesoría personalizada.</p>
              <button className="btn" onClick={() => navigate('/servicios')}>Servicios</button>
            </div>
          </article>

          <article className="home-card">
            <img src="./imagenes/vitaminas.jpeg" alt="Productos" />
            <div className="home-card-content">
              <h3>Productos</h3>
              <p>Encuentra medicamentos, vitaminas, higiene y más.</p>
              <button className="btn" onClick={() => navigate('/productos')}>Productos</button>
            </div>
          </article>

          <article className="home-card">
            <img src="./imagenes/logo.jpeg" alt="Contacto" />
            <div className="home-card-content">
              <h3>Contacto</h3>
              <p>Envía tu consulta y comunícate con nosotros rápidamente.</p>
              <button className="btn" onClick={() => navigate('/contacto')}>Contacto</button>
            </div>
          </article>

          <article className="home-card">
            <img src="./imagenes/receta.jpeg" alt="Receta" />
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
          {usuarioLogueado && (
            <span style={{ color: 'white', marginLeft: '15px', fontWeight: 'bold' }}>
              👤 {usuarioLogueado.nombre}
            </span>
          )}
        </nav>
      </header>

      <main className="app-main">{renderPage()}</main>

      <footer className="app-footer">© 2026 Farmacia Comandiu</footer>
    </div>
  )
}

export default App