import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/demo-portfolio/',   // 👈 ADD THIS LINE (VERY IMPORTANT)  FOR GITHUB CANNOT TAKE REACT+ VITE CODES FOR THAT WE HAVE TO CRAETE DIST FOLDER THEN GITHUB KNOW DIST FOLDER HAVE IDEX.HTML, AND CSS FILES
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    strictPort: true,
  },
})
