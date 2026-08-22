import { fileURLToPath, URL } from 'node:url'
import { configDefaults, defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [
    vue({ template: { transformAssetUrls } }),
    vuetify({ autoImport: true }),
    vueDevTools({ launchEditor: 'code' }),
  ],
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
    setupFiles: ['./src/vitest.setup.ts'],
    // Vitest's default exclude list doesn't know about project-local git
    // worktrees (.worktrees/, worktrees/) — without this, running the
    // suite from the main checkout while a worktree is checked out nested
    // inside it double-collects every spec file from both locations.
    exclude: [...configDefaults.exclude, '**/.worktrees/**', '**/worktrees/**'],
    server: {
      // Vitest externalizes node_modules packages to Node's raw ESM loader
      // by default, which can't handle vuetify's side-effect .css imports —
      // force it through Vite's own transform pipeline instead.
      deps: { inline: ['vuetify'] },
    },
  },
})
