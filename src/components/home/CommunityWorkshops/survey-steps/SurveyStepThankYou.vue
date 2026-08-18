<script setup lang="ts">
import { useI18n } from 'vue-i18n'

defineEmits<{ close: [] }>()
const { t } = useI18n()
</script>

<template>
  <div class="cca-survey-step">
    <h2 id="cca-survey-heading" tabindex="-1" class="cca-survey-step__question">
      {{ t('home.workshops.survey.thankYou.title') }}
    </h2>
    <p class="cca-survey-step__body">{{ t('home.workshops.survey.thankYou.body') }}</p>
    <v-btn
      color="primary"
      variant="flat"
      rounded="8"
      size="large"
      min-height="48"
      @click="$emit('close')"
    >
      {{ t('home.workshops.survey.thankYou.closeButton') }}
    </v-btn>
  </div>
</template>

<style scoped lang="scss">
.cca-survey-step__question {
  font-size: clamp(22px, 3vw, 26px);
  font-weight: 700;
  line-height: 1.3;
  color: rgb(var(--v-theme-on-surface));
  margin: 0 0 var(--cca-space-3);

  &:focus {
    outline: 3px solid rgb(var(--v-theme-on-surface));
    outline-offset: 3px;
  }
}

.cca-survey-step__body {
  font-size: 16px;
  line-height: 1.6;
  color: rgb(var(--v-theme-on-surface));
  margin: 0 0 var(--cca-space-5);
}
</style>
