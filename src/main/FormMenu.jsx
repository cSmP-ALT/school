import React, { useEffect, useState } from 'react'
import './form-menu.css'

const formConfigs = {
  clientes: {
    title: 'Clientes',
    description: 'Registra datos de clientes para guardar en la base de datos.',
    fields: [
      { name: 'id_cliente', label: ' Cliente', type: 'text' },
      { name: 'nombre', label: 'Nombre', type: 'text' },
      { name: 'correo', label: 'Correo electrónico', type: 'email' },
      { name: 'telefono', label: 'Teléfono', type: 'tel' },
      { name: 'direccion', label: 'Dirección', type: 'text' }
    ]
  },
  detalles_ventas: {
    title: 'Detalles de ventas',
    description: 'Registra los detalles de cada venta con producto y precio unitario.',
    fields: [
      { name: 'id_detalle', label: ' Detalle', type: 'text' },
      { name: 'id_venta', label: 'ID Venta', type: 'text' },
      { name: 'id_producto', label: 'ID Producto', type: 'text' },
      { name: 'cantidad', label: 'Cantidad', type: 'number' },
      { name: 'precio_unitario', label: 'Precio unitario', type: 'number' }
    ]
  },
  productos: {
    title: 'Productos',
    description: 'Registra productos con su stock, precio y proveedor.',
    fields: [
      { name: 'id_producto', label: ' Producto', type: 'text' },
      { name: 'nombre', label: 'Nombre', type: 'text' },
      { name: 'descripcion', label: 'Descripción', type: 'text' },
      { name: 'precio', label: 'Precio', type: 'number' },
      { name: 'stock', label: 'Stock', type: 'number' },
      { name: 'imagen_url', label: 'URL de imagen', type: 'url' },
      { name: 'id_proveedor', label: 'ID Proveedor', type: 'text' }
    ]
  },
  proveedores: {
    title: 'Proveedores',
    description: 'Registra los datos de los proveedores.',
    fields: [
      { name: 'id_proveedor', label: ' Proveedor', type: 'number' },
      { name: 'nombre_empresa', label: 'Nombre de empresa', type: 'text' },
      { name: 'telefono', label: 'Teléfono', type: 'tel' },
      { name: 'correo', label: 'Correo electrónico', type: 'email' }
    ]
  },
  servicios: {
    title: 'Servicios',
    description: 'Registra servicios con su nombre, descripción, precio e imagen.',
    fields: [
      { name: 'id_servicio', label: ' Servicio', type: 'text' },
      { name: 'nombre_servicio', label: 'Nombre del servicio', type: 'text' },
      { name: 'descripcion', label: 'Descripción', type: 'text' },
      { name: 'precio', label: 'Precio', type: 'number' },
      { name: 'imagen_url', label: 'URL de imagen', type: 'url' }
    ]
  },
  ventas: {
    title: 'Ventas',
    description: 'Registra ventas con cliente, fecha y total.',
    fields: [
      { name: 'id_venta', label: ' Venta', type: 'text' },
      { name: 'id_cliente', label: ' Cliente', type: 'text' },
      { name: 'fecha_venta', label: 'Fecha de venta', type: 'date' },
      { name: 'total', label: 'Total', type: 'number' }
    ]
  }
}

const formOptions = Object.keys(formConfigs)

const getInitialForm = (selected) => {
  const config = formConfigs[selected] || formConfigs.clientes
  return config.fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
}

function FormMenu({ selectedSection, onNavigate }) {
  const [activeForm, setActiveForm] = useState(selectedSection || 'clientes')
  const [formValues, setFormValues] = useState(getInitialForm(activeForm))
  const [status, setStatus] = useState('')
  const [savedData, setSavedData] = useState(null)

  useEffect(() => {
    const section = selectedSection && formConfigs[selectedSection] ? selectedSection : 'clientes'
    setActiveForm(section)
  }, [selectedSection])

  useEffect(() => {
    setFormValues(getInitialForm(activeForm))
    setStatus('')
    setSavedData(null)
  }, [activeForm])

  const handleSectionChange = (event) => {
    setActiveForm(event.target.value)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const requiredFields = formConfigs[activeForm].fields
    const missingField = requiredFields.find((field) => !formValues[field.name])

    if (missingField) {
      setStatus(`Completa el campo "${missingField.label}" antes de guardar.`)
      setSavedData(null)
      return
    }

    setStatus('Formulario guardado correctamente en la base de datos.')
    setSavedData({ ...formValues, tipo: activeForm })
  }

  const activeConfig = formConfigs[activeForm]

  return (
    <section className="form-menu-page">
      <div className="section-header">
        <h2>Menú de formularios</h2>
        <p>Selecciona una sección para ver los campos necesarios y guardarla.</p>
      </div>

      <div className="form-menu-selector">
        <label htmlFor="form-section">Sección</label>
        <select id="form-section" value={activeForm} onChange={handleSectionChange}>
          {formOptions.map((option) => (
            <option key={option} value={option}>
              {formConfigs[option].title}
            </option>
          ))}
        </select>
      </div>

      <div className="form-menu-description">
        <h3>{activeConfig.title}</h3>
        <p>{activeConfig.description}</p>
      </div>

      <form className="form-menu" onSubmit={handleSubmit}>
        {activeConfig.fields.map((field) => (
          <label key={field.name} htmlFor={field.name} className="form-menu-field">
            {field.label}
            {field.type === 'text' || field.type === 'email' || field.type === 'tel' || field.type === 'number' || field.type === 'url' || field.type === 'date' ? (
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                value={formValues[field.name]}
                onChange={handleChange}
                required
              />
            ) : (
              <textarea
                id={field.name}
                name={field.name}
                value={formValues[field.name]}
                onChange={handleChange}
                required
              />
            )}
          </label>
        ))}

        <div className="form-menu-actions">
          <button className="btn" type="submit">Guardar formulario</button>
          <button className="btn ghost" type="button" onClick={() => onNavigate('/')}>Volver al inicio</button>
        </div>
      </form>

      {status && <p className="form-menu-status">{status}</p>}
      {savedData && (
        <div className="form-menu-result">
          <h4>Registro preparado para guardar:</h4>
          <pre>{JSON.stringify(savedData, null, 2)}</pre>
        </div>
      )}
    </section>
  )
}

export default FormMenu
