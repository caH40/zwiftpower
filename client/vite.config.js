import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDevelopment = mode === 'development';

  return {
    plugins: [
      react(),
      visualizer({
        filename: 'bundle-stats.html',
        open: true, // Откроет график после сборки
        gzipSize: true,
        brotliSize: true,
      }),
    ],

    server: {
      open: true,
      port: 80,
      host: true, // Позволяет прослушивать все интерфейсы (0.0.0.0)
      https: false, // Установите true, если используете 443 и сертификаты
      allowedHosts: ['stockily-jaunty-whydah.cloudpub.ru'],
    },
    build: {
      outDir: './build',
      chunkSizeWarningLimit: 1000,
      sourcemap: isDevelopment, // Включает sourcemaps только для development
      rollupOptions: {
        output: {
          manualChunks: {
            // Ручное разделение чанков для оптимизации
            vendor: ['react', 'react-dom'],
            ui: ['@mui/material', '@emotion/react', '@emotion/styled'],
            charts: ['chart.js', 'react-chartjs-2'],
            utils: ['axios', 'classnames', 'react-hook-form'],
          },
        },
      },
    },
  };
});
