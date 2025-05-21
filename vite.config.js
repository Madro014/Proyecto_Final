import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Redirige las solicitudes que comienzan con /api al servidor backend
      '/api': {
        target: 'http://localhost:5000', // La URL de tu servidor backend
        changeOrigin: true, // Necesario para hosts virtuales
        // No necesitas 'rewrite' aquí porque tu backend ya espera rutas como /api/auth/register
      },
    },
  },
})
