import React, { useState, useEffect } from 'react';

const Productos = ({ onNavigate }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    categoria: ''
  });
  const [mensaje, setMensaje] = useState('');

  // Cargar productos al iniciar
  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const response = await fetch('http://localhost:3003/api/productos');
      const data = await response.json();
      setProductos(data);
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar productos:', error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');

    try {
      const response = await fetch('http://localhost:3003/api/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          precio: parseFloat(formData.precio),
          stock: parseInt(formData.stock)
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMensaje('✅ Producto creado exitosamente');
        setFormData({ nombre: '', descripcion: '', precio: '', stock: '', categoria: '' });
        cargarProductos(); // Recargar la lista
      } else {
        setMensaje('❌ Error: ' + data.error);
      }
    } catch (error) {
      setMensaje('❌ Error de conexión con el servidor');
      console.error('Error:', error);
    }
  };

  if (loading) return <div>Cargando productos...</div>;

  return (
    <section className="productos-page">
      <h2>Productos</h2>

      {mensaje && <div className={mensaje.includes('✅') ? 'mensaje-exito' : 'mensaje-error'}>{mensaje}</div>}

      <h3>Agregar nuevo producto</h3>
      <form onSubmit={handleSubmit} className="producto-form">
        <div className="form-group">
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Nombre del producto"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Descripción"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            placeholder="Precio"
            step="0.01"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Stock"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            placeholder="Categoría"
          />
        </div>
        <button type="submit" className="btn">Agregar producto</button>
      </form>

      <h3>Lista de productos</h3>
      <div className="productos-lista">
        {productos.length === 0 ? (
          <p>No hay productos registrados</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Categoría</th>
              </tr>
            </thead>
            <tbody>
              {productos.map(producto => (
                <tr key={producto.id}>
                  <td>{producto.nombre}</td>
                  <td>{producto.descripcion}</td>
                  <td>${producto.precio}</td>
                  <td>{producto.stock}</td>
                  <td>{producto.categoria}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <button className="btn-volver" onClick={() => onNavigate('/')}>
        Volver al inicio
      </button>
    </section>
  );
};

export default Productos;