<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import AppNavbar from '@/components/shared/AppNavbar.vue'

const { t } = useI18n()
</script>

<template>
  <v-app>
    <a href="#cca-main-content" class="cca-skip-link">{{ t('common.skipToContent') }}</a>
    <AppNavbar />
    <v-main id="cca-main-content">
      <router-view />
    </v-main>
  </v-app>
</template>

<style scoped>
.cca-skip-link {
  position: absolute;
  top: -100%;
  left: var(--cca-space-4);
  z-index: 100;
  padding: var(--cca-space-3) var(--cca-space-5);
  background: rgb(var(--v-theme-on-surface));
  color: #fff;
  border-radius: 8px;
  font-weight: 700;
  text-decoration: none;
  transition: top 0.15s ease;
}

.cca-skip-link:focus-visible {
  top: var(--cca-space-3);
}
</style>
