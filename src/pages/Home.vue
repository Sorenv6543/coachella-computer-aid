<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

function toggleLocale() {
  locale.value = locale.value === 'en' ? 'es' : 'en'
}
</script>

<template>
  <v-container class="py-16 text-center">
    <h1 class="cca-display">{{ t('home.hero.title') }}</h1>
    <p class="mt-4">{{ t('home.hero.subtitle') }}</p>
    <v-btn color="primary" size="large" class="mt-6" @click="toggleLocale">
      {{ t('common.toggleLanguage') }}
    </v-btn>
  </v-container>
</template>
