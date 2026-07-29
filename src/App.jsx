import React, { useState, useEffect } from 'react'

function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('/api')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log('Backend no disponible'))
  }, [])

  return (
    <div>
      <h1>Mi Aplicación Full Stack</h1>
      <p>Frontend con React + Vite</p>
      {data && <p>Backend: {JSON.stringify(data)}</p>}
    </div>
  )
}

export default App
