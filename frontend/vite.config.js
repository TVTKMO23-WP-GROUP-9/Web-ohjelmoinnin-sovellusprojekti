import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@content': path.resolve(__dirname, 'src/components/content'),
      '@css': path.resolve(__dirname, 'src/css'),
      '@functions': path.resolve(__dirname, 'src/functions'),
      '@images': path.resolve(__dirname, 'src/images')
    }
  }
})
