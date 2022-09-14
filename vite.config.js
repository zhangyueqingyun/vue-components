import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const { resolve } = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
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
