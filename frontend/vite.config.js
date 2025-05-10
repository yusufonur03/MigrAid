import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy /api requests to the backend server
      '/api': {
        target: 'http://localhost:3004', // Assuming backend runs on port 3004
        changeOrigin: true, // Needed for virtual hosted sites
        secure: false,      // Set to true if your backend is HTTPS and has a valid cert
        // rewrite: (path) => path.replace(/^\/api/, ''), // Uncomment if backend doesn't expect /api prefix
      },
    },
  },
});