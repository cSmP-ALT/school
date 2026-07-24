import React, { useState } from 'react';

const Receta = () => {
  const [doctor, setDoctor] = useState('');
  const [paciente, setPaciente] = useState('');
  const [fecha, setFecha] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [archivo, setArchivo] = useState(null);
  const [mensaje, setMensaje] = useState('');

  const handleArchivoChange = (event) => {
    const file = event.target.files[0];
    setArchivo(file || null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!doctor || !paciente || !fecha || !descripcion || !archivo) {
      setMensaje('Por favor completa todos los campos y carga tu receta médica.');
      return;
    }

    // Aquí se puede agregar lógica para enviar el archivo a un servidor
    setMensaje(`Receta médica cargada correctamente: ${archivo.name}`);
    setDoctor('');
    setPaciente('');
    setFecha('');
    setDescripcion('');
    setArchivo(null);
    event.target.reset();
  };

  return (
    <div style={{ maxWidth: 520, margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Cargar receta médica</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '12px' }}>
          <label htmlFor="doctor">Doctor:</label>
          <input
            id="doctor"
            type="text"
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
          />
        </div>
        <div style={{ marginBottom: '12px' }}>
          <label htmlFor="paciente">Paciente:</label>
          <input
            id="paciente"
            type="text"
            value={paciente}
            onChange={(e) => setPaciente(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
          />
        </div>
        <div style={{ marginBottom: '12px' }}>
          <label htmlFor="fecha">Fecha:</label>
          <input
            id="fecha"
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
          />
        </div>
        <div style={{ marginBottom: '12px' }}>
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows="4"
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
          />
        </div>
        <div style={{ marginBottom: '12px' }}>
          <label htmlFor="archivo">Archivo de receta:</label>
          <input
            id="archivo"
            type="file"
            accept="image/*,.pdf"
            onChange={handleArchivoChange}
            style={{ display: 'block', marginTop: '4px' }}
          />
          {archivo && <p style={{ marginTop: '8px' }}>Archivo seleccionado: {archivo.name}</p>}
        </div>
        <button type="submit" style={{ padding: '10px 16px', cursor: 'pointer' }}>
          Cargar receta
        </button>
      </form>
      {mensaje && <p style={{ marginTop: '16px' }}>{mensaje}</p>}
    </div>
  );
};

export default Receta;
