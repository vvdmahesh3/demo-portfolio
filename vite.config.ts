// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,        // ✅ frontend will always run on 5173
    strictPort: true,  // ✅ if 5173 is busy, fail instead of switching
  },
});
