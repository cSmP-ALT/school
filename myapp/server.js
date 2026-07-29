import express from 'express';
import cors from 'cors';
import conexion from './conexion.js';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = 3000;
const SECRET_KEY = 'farmacia_secreta_2026';

// Middleware
app.use(cors());
app.use(express.json());

// ============================================
// 🔐 RUTAS DE AUTENTICACIÓN (LOGIN Y REGISTRO)
// ============================================

// Registrar nuevo usuario
app.post('/api/register', async (req, res) => {
    const { nombre, correo, password, telefono, direccion, rol } = req.body;

    conexion.query('SELECT * FROM usuarios WHERE correo = ?', [correo], (error, resultados) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        if (resultados.length > 0) {
            return res.status(400).json({ mensaje: 'El correo ya está registrado' });
        }

        const sql = 'INSERT INTO usuarios (nombre, correo, password, telefono, direccion, rol) VALUES (?, ?, ?, ?, ?, ?)';
        conexion.query(sql, [nombre, correo, password, telefono, direccion, rol || 'cliente'], (error, resultado) => {
            if (error) {
                return res.status(500).json({ error: error.message });
            }
            res.status(201).json({ 
                mensaje: 'Usuario registrado exitosamente',
                id: resultado.insertId 
            });
        });
    });
});

// Iniciar sesión (Login) - VERSIÓN CON TEXTO PLANO PARA PRUEBAS
app.post('/api/login', (req, res) => {
    const { correo, password } = req.body;

    conexion.query('SELECT * FROM usuarios WHERE correo = ?', [correo], (error, resultados) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        if (resultados.length === 0) {
            return res.status(401).json({ mensaje: 'Correo o contraseña incorrectos' });
        }

        const usuario = resultados[0];
        
        // COMPARACIÓN DIRECTA (TEXTO PLANO) - SOLO PARA PRUEBAS
        if (usuario.password !== password) {
            return res.status(401).json({ mensaje: 'Correo o contraseña incorrectos' });
        }

        const token = jwt.sign(
            { id: usuario.id_usuario, correo: usuario.correo, nombre: usuario.nombre, rol: usuario.rol },
            SECRET_KEY,
            { expiresIn: '24h' }
        );

        res.json({
            mensaje: 'Inicio de sesión exitoso',
            token,
            usuario: {
                id: usuario.id_usuario,
                nombre: usuario.nombre,
                correo: usuario.correo,
                rol: usuario.rol
            }
        });
    });
});

// ============================================
// 📋 RUTAS PARA CLIENTES
// ============================================

// Obtener todos los clientes
app.get('/api/clientes', (req, res) => {
    conexion.query('SELECT id_cliente as id, nombre, correo, telefono, direccion FROM clientes', (error, resultados) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json(resultados);
    });
});

// Obtener un cliente por ID
app.get('/api/clientes/:id', (req, res) => {
    const { id } = req.params;
    conexion.query('SELECT id_cliente as id, nombre, correo, telefono, direccion FROM clientes WHERE id_cliente = ?', [id], (error, resultados) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        if (resultados.length === 0) {
            return res.status(404).json({ mensaje: 'Cliente no encontrado' });
        }
        res.json(resultados[0]);
    });
});

// Crear nuevo cliente
app.post('/api/clientes', (req, res) => {
    const { nombre, correo, telefono, direccion } = req.body;
    const sql = 'INSERT INTO clientes (nombre, correo, telefono, direccion) VALUES (?, ?, ?, ?)';
    conexion.query(sql, [nombre, correo, telefono, direccion], (error, resultado) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.status(201).json({ 
            mensaje: 'Cliente creado exitosamente',
            id: resultado.insertId 
        });
    });
});

// Actualizar cliente
app.put('/api/clientes/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, correo, telefono, direccion } = req.body;
    const sql = 'UPDATE clientes SET nombre = ?, correo = ?, telefono = ?, direccion = ? WHERE id_cliente = ?';
    conexion.query(sql, [nombre, correo, telefono, direccion, id], (error, resultado) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Cliente no encontrado' });
        }
        res.json({ mensaje: 'Cliente actualizado exitosamente' });
    });
});

// Eliminar cliente
app.delete('/api/clientes/:id', (req, res) => {
    const { id } = req.params;
    conexion.query('DELETE FROM clientes WHERE id_cliente = ?', [id], (error, resultado) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Cliente no encontrado' });
        }
        res.json({ mensaje: 'Cliente eliminado exitosamente' });
    });
});

// ============================================
// 📦 RUTAS PARA PRODUCTOS
// ============================================

// Obtener todos los productos
app.get('/api/productos', (req, res) => {
    conexion.query('SELECT id_producto as id, nombre, descripcion, precio, stock, imagen_url, id_proveedor FROM productos', (error, resultados) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json(resultados);
    });
});

// Obtener un producto por ID
app.get('/api/productos/:id', (req, res) => {
    const { id } = req.params;
    conexion.query('SELECT id_producto as id, nombre, descripcion, precio, stock, imagen_url, id_proveedor FROM productos WHERE id_producto = ?', [id], (error, resultados) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        if (resultados.length === 0) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
        res.json(resultados[0]);
    });
});

// Crear nuevo producto
app.post('/api/productos', (req, res) => {
    const { nombre, descripcion, precio, stock, imagen_url, id_proveedor } = req.body;
    const sql = 'INSERT INTO productos (nombre, descripcion, precio, stock, imagen_url, id_proveedor) VALUES (?, ?, ?, ?, ?, ?)';
    conexion.query(sql, [nombre, descripcion, precio, stock, imagen_url, id_proveedor], (error, resultado) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.status(201).json({ 
            mensaje: 'Producto creado exitosamente',
            id: resultado.insertId 
        });
    });
});

// Actualizar stock de un producto
app.put('/api/productos/:id/stock', (req, res) => {
    const { id } = req.params;
    const { stock } = req.body;
    conexion.query('UPDATE productos SET stock = ? WHERE id_producto = ?', [stock, id], (error, resultado) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
        res.json({ mensaje: 'Stock actualizado exitosamente' });
    });
});

// Actualizar producto completo
app.put('/api/productos/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio, stock, imagen_url, id_proveedor } = req.body;
    const sql = 'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ?, imagen_url = ?, id_proveedor = ? WHERE id_producto = ?';
    conexion.query(sql, [nombre, descripcion, precio, stock, imagen_url, id_proveedor, id], (error, resultado) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
        res.json({ mensaje: 'Producto actualizado exitosamente' });
    });
});

// Eliminar producto
app.delete('/api/productos/:id', (req, res) => {
    const { id } = req.params;
    conexion.query('DELETE FROM productos WHERE id_producto = ?', [id], (error, resultado) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
        res.json({ mensaje: 'Producto eliminado exitosamente' });
    });
});

// ============================================
// 💊 RUTAS PARA SERVICIOS
// ============================================

// Obtener todos los servicios
app.get('/api/servicios', (req, res) => {
    conexion.query('SELECT * FROM servicios', (error, resultados) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json(resultados);
    });
});

// Crear nuevo servicio
app.post('/api/servicios', (req, res) => {
    const { nombre, descripcion, precio, duracion } = req.body;
    const sql = 'INSERT INTO servicios (nombre, descripcion, precio, duracion) VALUES (?, ?, ?, ?)';
    conexion.query(sql, [nombre, descripcion, precio, duracion], (error, resultado) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.status(201).json({ 
            mensaje: 'Servicio creado exitosamente',
            id: resultado.insertId 
        });
    });
});

// ============================================
// 📩 RUTAS PARA MENSAJES DE CONTACTO
// ============================================

// Guardar mensaje de contacto
app.post('/api/mensajes-contacto', (req, res) => {
    const { nombre_remitente, correo, mensaje } = req.body;
    const sql = 'INSERT INTO mensajes_contacto (nombre_remitente, correo, mensaje) VALUES (?, ?, ?)';
    conexion.query(sql, [nombre_remitente, correo, mensaje], (error, resultado) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.status(201).json({ 
            mensaje: 'Mensaje enviado exitosamente',
            id: resultado.insertId 
        });
    });
});

// Obtener todos los mensajes de contacto
app.get('/api/mensajes-contacto', (req, res) => {
    conexion.query('SELECT * FROM mensajes_contacto ORDER BY fecha_envio DESC', (error, resultados) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json(resultados);
    });
});

// ============================================
// 📊 RUTAS PARA VENTAS
// ============================================

// Registrar una venta
app.post('/api/ventas', (req, res) => {
    const { cliente_id, total, metodo_pago, productos } = req.body;
    
    conexion.beginTransaction((err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const sqlVenta = 'INSERT INTO ventas (cliente_id, total, metodo_pago) VALUES (?, ?, ?)';
        conexion.query(sqlVenta, [cliente_id, total, metodo_pago], (error, resultado) => {
            if (error) {
                return conexion.rollback(() => {
                    res.status(500).json({ error: error.message });
                });
            }

            const ventaId = resultado.insertId;
            const sqlDetalle = 'INSERT INTO detalle_ventas (venta_id, producto_id, cantidad, precio_unitario, subtotal) VALUES ?';
            const detalles = productos.map(p => [ventaId, p.producto_id, p.cantidad, p.precio_unitario, p.subtotal]);
            
            conexion.query(sqlDetalle, [detalles], (error) => {
                if (error) {
                    return conexion.rollback(() => {
                        res.status(500).json({ error: error.message });
                    });
                }

                const updates = productos.map(p => {
                    return new Promise((resolve, reject) => {
                        conexion.query(
                            'UPDATE productos SET stock = stock - ? WHERE id_producto = ? AND stock >= ?',
                            [p.cantidad, p.producto_id, p.cantidad],
                            (error, result) => {
                                if (error || result.affectedRows === 0) {
                                    reject(new Error('Stock insuficiente para el producto ' + p.producto_id));
                                } else {
                                    resolve();
                                }
                            }
                        );
                    });
                });

                Promise.all(updates)
                    .then(() => {
                        conexion.commit((err) => {
                            if (err) {
                                return conexion.rollback(() => {
                                    res.status(500).json({ error: err.message });
                                });
                            }
                            res.status(201).json({ 
                                mensaje: 'Venta registrada exitosamente',
                                venta_id: ventaId 
                            });
                        });
                    })
                    .catch((error) => {
                        conexion.rollback(() => {
                            res.status(500).json({ error: error.message });
                        });
                    });
            });
        });
    });
});

// Obtener todas las ventas
app.get('/api/ventas', (req, res) => {
    const sql = `
        SELECT v.*, c.nombre as cliente_nombre 
        FROM ventas v 
        LEFT JOIN clientes c ON v.cliente_id = c.id_cliente 
        ORDER BY v.fecha DESC
    `;
    conexion.query(sql, (error, resultados) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json(resultados);
    });
});

// Obtener detalles de una venta específica
app.get('/api/ventas/:id/detalles', (req, res) => {
    const { id } = req.params;
    const sql = `
        SELECT dv.*, p.nombre as producto_nombre 
        FROM detalle_ventas dv 
        JOIN productos p ON dv.producto_id = p.id_producto 
        WHERE dv.venta_id = ?
    `;
    conexion.query(sql, [id], (error, resultados) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json(resultados);
    });
});

// ============================================
// 🏢 RUTAS PARA PROVEEDORES
// ============================================

// Obtener todos los proveedores
app.get('/api/proveedores', (req, res) => {
    conexion.query('SELECT * FROM proveedores', (error, resultados) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json(resultados);
    });
});

// Crear nuevo proveedor
app.post('/api/proveedores', (req, res) => {
    const { nombre, contacto, telefono, email, direccion } = req.body;
    const sql = 'INSERT INTO proveedores (nombre, contacto, telefono, email, direccion) VALUES (?, ?, ?, ?, ?)';
    conexion.query(sql, [nombre, contacto, telefono, email, direccion], (error, resultado) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.status(201).json({ 
            mensaje: 'Proveedor creado exitosamente',
            id: resultado.insertId 
        });
    });
});

// ============================================
// 🔍 RUTA DE PRUEBA
// ============================================

app.get('/', (req, res) => {
    res.json({ 
        mensaje: 'API de Farmacia Salud y Bienestar',
        version: '1.0.0',
        endpoints: [
            '/api/login - Iniciar sesión',
            '/api/register - Registrar usuario',
            '/api/clientes',
            '/api/productos',
            '/api/servicios',
            '/api/mensajes-contacto',
            '/api/ventas',
            '/api/proveedores'
        ]
    });
});

// ============================================
// 🚀 INICIAR SERVIDOR
// ============================================

app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📊 Base de datos: farmacia_salud_bienestar`);
});