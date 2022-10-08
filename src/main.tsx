import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
//DICA - ! irá informar ao TS que o arquivo irá existir
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
