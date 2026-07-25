import React, { useState } from 'react'
import './Productos.css'

const categorias = [
  {
    nombre: 'Medicamentos',
    descripcion: 'Analgésicos, antivirales, tratamientos para resfriados y más.',
    imagen: '/imagenes/medicina.jpg',
    productos: [
      { nombre: 'Analgésico rápido', precio: 400 },
      { nombre: 'Jarabe para la tos', precio: 750 },
      { nombre: 'Antibiótico oral', precio: 1200 }
    ]
  },
  {
    nombre: 'Belleza',
    descripcion: 'Cremas, maquillaje y cuidado facial para todos los tipos de piel.',
    imagen: '/imagenes/belleza.jpg',
    productos: [
      { nombre: 'Crema hidratante', precio: 950 },
      { nombre: 'Suero facial', precio: 1350 },
      { nombre: 'Base ligera', precio: 680 }
    ]
  },
  {
    nombre: 'Higiene',
    descripcion: 'Jabones, desodorantes, pasta dental y productos esenciales.',
    imagen: '/imagenes/higiene.jpg',
    productos: [
      { nombre: 'Gel antibacterial', precio: 320 },
      { nombre: 'Pasta dental', precio: 450 },
      { nombre: 'Shampoo anticaspa', precio: 780 }
    ]
  },
  {
    nombre: 'Bebés',
    descripcion: 'Pañales, toallitas, cremas y productos suaves para los más pequeños.',
    imagen: '/imagenes/bb.jpg',
    productos: [
      { nombre: 'Pañales talla M', precio: 1100 },
      { nombre: 'Toallitas húmedas', precio: 620 },
      { nombre: 'Champú para bebés', precio: 520 }
    ]
  },
  {
    nombre: 'Vitaminas',
    descripcion: 'Suplementos para energía, defensas y salud diaria.',
    imagen: '/imagenes/vitaminas.jpg',
    productos: [
      { nombre: 'Vitamina C', precio: 700 },
      { nombre: 'Omega 3', precio: 1100 },
      { nombre: 'Multivitamínico', precio: 1450 }
    ]
  },
  {
    nombre: 'Ofertas',
    descripcion: 'Promociones especiales en productos seleccionados.',
    imagen: '/imagenes/ofertas.jpg',
    productos: [
      { nombre: 'Pack de analgésicos', precio: 1200 },
      { nombre: 'Desodorante en promoción', precio: 900 },
      { nombre: 'Crema hidratante oferta', precio: 1400 }
    ]
  }
]

function Productos({ onNavigate }) {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null)
  const [cantidades, setCantidades] = useState({})
  const [mensaje, setMensaje] = useState('')

  const abrirCategoria = (categoria) => {
    setCategoriaSeleccionada(categoria)
    setCantidades({})
    setMensaje('')
  }

  const manejarCantidad = (producto, valor) => {
    const qty = Math.max(1, Math.min(20, Number(valor) || 1))
    setCantidades((prev) => ({ ...prev, [producto]: qty }))
  }

  const agregarProducto = (producto) => {
    const qty = cantidades[producto.nombre] || 1
    setMensaje(`Seleccionaste ${qty} unidad(es) de ${producto.nombre} por $${producto.precio} c/u.`)
  }

  return (
    <section className="productos-page">
      <div className="section-header">
        <h2>Productos</h2>
        <p>Elige la categoría que más te interese.</p>
      </div>

      {!categoriaSeleccionada ? (
        <div className="productos-grid">
          {categorias.map((categoria) => (
            <article
              key={categoria.nombre}
              className="producto-card"
              onClick={() => abrirCategoria(categoria)}
            >
              <img
                className="categoria-image"
                src={categoria.imagen}
                alt={categoria.nombre}
              />
              <div className="producto-card-content">
                <h3>{categoria.nombre}</h3>
                <p>{categoria.descripcion}</p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="categoria-detalle">
          <button className="btn ghost" onClick={() => setCategoriaSeleccionada(null)}>
            ← Volver a categorías
          </button>

          <div className="categoria-header">
            <h3>{categoriaSeleccionada.nombre}</h3>
            <p>{categoriaSeleccionada.descripcion}</p>
          </div>

          <div className="productos-detalle-grid">
            {categoriaSeleccionada.productos
              .filter((producto) => producto.precio >= 200 && producto.precio <= 1500)
              .map((producto) => (
                <article key={producto.nombre} className="producto-detalle-card">
                  <div>
                    <h4>{producto.nombre}</h4>
                    <p>Precio: ${producto.precio}</p>
                  </div>
                  <div className="producto-cantidad">
                    <label>
                      Cantidad
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={cantidades[producto.nombre] || 1}
                        onChange={(e) => manejarCantidad(producto.nombre, e.target.value)}
                      />
                    </label>
                    <button className="btn" onClick={() => agregarProducto(producto)}>
                      Seleccionar
                    </button>
                  </div>
                </article>
              ))}
          </div>

          {mensaje && <p className="productos-mensaje">{mensaje}</p>}
        </div>
      )}

      <button className="btn" onClick={() => onNavigate('/')}>Volver al inicio</button>
    </section>
  )
}

export default Productos