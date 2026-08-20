import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      '/login': 'http://localhost:3001',
      '/messages': 'http://localhost:3001',
      '/send-message': 'http://localhost:3001'
    },
  },
})
