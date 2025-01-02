import { defineConfig } from 'vite';
import commonjs from '@rollup/plugin-commonjs';

export default defineConfig({
  plugins: [commonjs()],
  optimizeDeps: {
    exclude: ['googleapis'],
  },
});