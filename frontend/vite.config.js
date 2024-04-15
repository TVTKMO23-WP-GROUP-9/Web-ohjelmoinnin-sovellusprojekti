import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: path.resolve(__dirname, '../.env') })


export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@content': path.resolve(__dirname, 'src/components/content'),
      '@css': path.resolve(__dirname, 'src/css'),
      '@functions': path.resolve(__dirname, 'src/functions'),
      '@auth': path.resolve(__dirname, 'src/components/auth'),
    }
  },

  define: {
    'process.env': {
      VITE_APP_BACKEND_URL: JSON.stringify(process.env.VITE_APP_BACKEND_URL)
    }
  }
})