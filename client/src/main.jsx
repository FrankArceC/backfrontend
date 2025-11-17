// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
// En main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' // <-- Vuelve a importar App
import './index.css'         // <-- Puedes dejar tu CSS (ya sabemos que no es el problema)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App /> {/* <-- Vuelve a renderizar App */}
  </React.StrictMode>,
)