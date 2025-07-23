// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // or 'localhost' if only local access is needed
    port: 5173,
    strictPort: true, // Don't auto-switch port
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
});
