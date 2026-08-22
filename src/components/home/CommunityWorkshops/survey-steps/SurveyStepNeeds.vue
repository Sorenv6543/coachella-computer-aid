<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const needs = defineModel<string[]>({ default: () => [] })
const { t } = useI18n()

const NEEDS_OPTIONS = [
  'smartphone',
  'computer',
  'tablet',
  'email',
  'videoCalls',
  'internet',
  'wifi',
  'smartTv',
  'healthcare',
  'government',
  'safety',
  'passwords',
  'accessibility',
  'printing',
  'somethingElse',
] as const
</script>

<template>
  <div class="cca-survey-step">
    <h2 id="cca-survey-heading" tabindex="-1" class="cca-survey-step__question">
      {{ t('home.workshops.survey.needs.question') }}
    </h2>
    <p id="cca-survey-needs-hint" class="cca-survey-step__hint">
      {{ t('home.workshops.survey.needs.hint') }}
    </p>
    <fieldset
      class="cca-survey-step__fieldset"
      aria-labelledby="cca-survey-heading cca-survey-needs-hint"
    >
      <v-checkbox
        v-for="option in NEEDS_OPTIONS"
        :key="option"
        v-model="needs"
        :value="option"
        color="clay"
        hide-details
        density="default"
        :label="t(`home.workshops.survey.needs.options.${option}`)"
      />
    </fieldset>
  </div>
</template>

<style scoped lang="scss">
.cca-survey-step__question {
  font-size: clamp(22px, 3vw, 26px);
  font-weight: 700;
  line-height: 1.3;
  color: rgb(var(--v-theme-on-surface));
  margin: 0 0 var(--cca-space-2);

  &:focus {
    outline: 3px solid rgb(var(--v-theme-on-surface));
    outline-offset: 3px;
  }
}

.cca-survey-step__hint {
  font-size: 16px;
  line-height: 1.5;
  color: rgb(var(--v-theme-on-surface));
  margin: 0 0 var(--cca-space-4);
}

.cca-survey-step__fieldset {
  border: none;
  margin: 0;
  padding: 0;
}
</style>
