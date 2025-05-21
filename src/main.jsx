import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App'; // Importa el componente App desde App.jsx
// import './App.scss'; // Eliminado: App.jsx ya lo importa
import 'bootstrap/dist/css/bootstrap.min.css'; // Añadido para Bootstrap

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
