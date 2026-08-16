import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import eslintConfigPrettier from 'eslint-config-prettier'

export default defineConfigWithVueTs(
  { name: 'app/files-to-lint', files: ['src/**/*.{ts,mts,tsx,vue}'] },
  {
    name: 'app/files-to-ignore',
    // tools/illustrations is a separate, pre-existing Node.js pipeline with
    // its own conventions — not part of the Vue app, out of scope here.
    ignores: ['**/dist/**', '**/node_modules/**', 'tools/**'],
  },
  pluginVue.configs['flat/recommended'],
  vueTsConfigs.recommended,
  eslintConfigPrettier,
  {
    name: 'app/pages-single-word-names',
    // Route-level page components are conventionally single-word
    // (src/pages/Home.vue) and aren't reused as generic components.
    files: ['src/pages/**/*.vue'],
    rules: { 'vue/multi-word-component-names': 'off' },
  },
)
