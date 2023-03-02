import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const { resolve } = require('path');

import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  },
  css: {
    preprocessorOptions: {
      scss: {
          charset: false,
          // additionalData: `@import "@/assets/styles/global.scss";`
      }
    }
  },
  build: {
    outDir: 'lib',
    lib: {
        entry: resolve(__dirname, 'src/index.js'),
        name: 'vue-components',
        filename: 'vue-components',
        formats: ['esm']
    },
    rollupOptions: {
        external: ['vue'],
        output: {
            globals: {
                vue: 'Vue'
            }
        }
    }
  }
})
