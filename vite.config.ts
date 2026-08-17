/// <reference types="vitest/config" />
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineConfig({
  plugins: [vue({ template: { transformAssetUrls } }), vuetify({ autoImport: true })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  define: {
    __VUE_I18N_FULL_INSTALL__: true,
    __VUE_I18N_LEGACY_API__: false,
    __INTLIFY_PROD_DEVTOOLS__: false,
  },
  server: {
    middlewareMode: false,
  },
  build: {
    sourcemap: process.env.VITE_SOURCEMAP === 'true',
  },
  test: {
    environment: 'happy-dom',
    css: true,
    server: {
      // Vitest externalizes node_modules packages to Node's raw ESM loader
      // by default, which can't handle vuetify's side-effect .css imports —
      // force it through Vite's own transform pipeline instead.
      deps: { inline: ['vuetify'] },
    },
  },
})
