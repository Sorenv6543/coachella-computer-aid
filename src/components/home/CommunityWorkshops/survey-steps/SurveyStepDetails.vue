<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const details = defineModel<string>({ default: '' })
const { t } = useI18n()
</script>

<template>
  <div class="cca-survey-step">
    <h2 id="cca-survey-heading" tabindex="-1" class="cca-survey-step__question">
      {{ t('home.workshops.survey.details.question') }}
    </h2>
    <v-textarea
      v-model="details"
      aria-labelledby="cca-survey-heading"
      :placeholder="t('home.workshops.survey.details.placeholder')"
      rows="5"
      hide-details
      variant="outlined"
    />
  </div>
</template>

<style scoped lang="scss">
.cca-survey-step__question {
  font-size: clamp(22px, 3vw, 26px);
  font-weight: 700;
  line-height: 1.3;
  color: rgb(var(--v-theme-on-surface));
  margin: 0 0 var(--cca-space-4);

  &:focus {
    outline: 3px solid rgb(var(--v-theme-on-surface));
    outline-offset: 3px;
  }
}
</style>
