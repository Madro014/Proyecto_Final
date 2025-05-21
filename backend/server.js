// backend/server.js
require('dotenv').config(); // Carga variables de entorno desde .env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Importar rutas
const authRoutes = require('./routes/auth'); // Asegúrate que la ruta sea correcta

const app = express();
const PORT = process.env.PORT || 5000; // Puerto para el backend

// Middlewares
app.use(cors()); // Habilita CORS para todas las rutas
app.use(express.json()); // Para parsear JSON en el cuerpo de las solicitudes

// Rutas de la API
app.use('/api/auth', authRoutes); // Rutas de autenticación bajo /api/auth
// app.use('/api/products', productRoutes); // Ejemplo para otras rutas

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Conectado a MongoDB'); // Este mensaje indica una conexión exitosa
    // Iniciar el servidor solo después de una conexión exitosa a la DB
    app.listen(PORT, () => {
      console.log(`Servidor backend corriendo en el puerto ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error al conectar a MongoDB:', err.message); // Este mensaje indica un error en la conexión
    process.exit(1); // Salir si no se puede conectar a la DB
  });