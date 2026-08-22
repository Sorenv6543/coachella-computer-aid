<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const who = defineModel<string>({ default: '' })
const { t } = useI18n()

const WHO_OPTIONS = [
  'self',
  'parentGrandparent',
  'familyMember',
  'friendNeighbor',
  'workColleague',
] as const
</script>

<template>
  <div class="cca-survey-step">
    <h2 id="cca-survey-heading" tabindex="-1" class="cca-survey-step__question">
      {{ t('home.workshops.survey.who.question') }}
    </h2>
    <fieldset class="cca-survey-step__fieldset" aria-labelledby="cca-survey-heading">
      <v-radio-group v-model="who" color="clay" hide-details density="default">
        <v-radio
          v-for="option in WHO_OPTIONS"
          :key="option"
          :value="option"
          :label="t(`home.workshops.survey.who.options.${option}`)"
        />
      </v-radio-group>
    </fieldset>
  </div>
</template>

<style scoped lang="scss">
.cca-survey-step__question {
  font-size: clamp(22px, 3vw, 26px);
  font-weight: 700;
  line-height: 1.3;
  color: rgb(var(--v-theme-on-surface));
  margin: 0 0 var(--cca-space-4);

  // This heading is programmatically focused on every step change (see
  // WorkshopsSurveyDialog.vue) so keyboard/screen-reader users don't lose
  // their place — always show the ring on focus, not just :focus-visible,
  // since that focus is never a stray mouse click.
  &:focus {
    outline: 3px solid rgb(var(--v-theme-on-surface));
    outline-offset: 3px;
  }
}

.cca-survey-step__fieldset {
  border: none;
  margin: 0;
  padding: 0;
}
</style>
