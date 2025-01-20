import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDevelopment = mode === 'development';

  return {
    plugins: [react()],
    server: {
      open: true,
      port: 80,
      host: true, // Позволяет прослушивать все интерфейсы (0.0.0.0)
      https: false, // Установите true, если используете 443 и сертификаты
    },
    build: {
      outDir: './build',
      chunkSizeWarningLimit: 1000,
      sourcemap: isDevelopment, // Включает sourcemaps только для development
    },
  };
});
