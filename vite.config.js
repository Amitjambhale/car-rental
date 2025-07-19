// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Accept connections from any IP
    port: 5173,
    strictPort: true, // Use fixed port
    cors: true,
    origin: 'https://example.com', // Required for HMR to work over ngrok

    // ⛔ REMOVE allowedHosts – it doesn’t help in Vite 5+!
    // ✅ Add this workaround (no longer blocks unknown hosts)
    hmr: {
      protocol: 'wss',
      host: 'localhost',
      clientPort: 443,
    },

    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
});
