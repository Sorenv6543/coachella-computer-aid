<script setup lang="ts">
import { reactive, ref, watch, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import SurveyStepWho from './survey-steps/SurveyStepWho.vue'
import SurveyStepNeeds from './survey-steps/SurveyStepNeeds.vue'
import SurveyStepPreference from './survey-steps/SurveyStepPreference.vue'
import SurveyStepDetails from './survey-steps/SurveyStepDetails.vue'
import SurveyStepThankYou from './survey-steps/SurveyStepThankYou.vue'

const dialogOpen = defineModel<boolean>({ default: false })
const { t } = useI18n()

const TOTAL_STEPS = 4
const THANK_YOU_STEP = TOTAL_STEPS + 1

interface WorkshopSurveyAnswers {
  who: string
  needs: string[]
  preference: string
  details: string
}

const currentStep = ref(1)
const answers = reactive<WorkshopSurveyAnswers>({
  who: '',
  needs: [],
  preference: '',
  details: '',
})

function resetSurvey() {
  currentStep.value = 1
  answers.who = ''
  answers.needs = []
  answers.preference = ''
  answers.details = ''
}

// Reopening the dialog always starts fresh — nothing here is precious
// enough to survive an accidental close, and stale answers would be
// confusing to land back on.
watch(dialogOpen, (isOpen) => {
  if (!isOpen) return
  resetSurvey()
  nextTick(() => {
    document.getElementById('cca-survey-heading')?.focus()
  })
})

// Move focus to the new step's heading on every change so keyboard and
// screen-reader users don't lose their place (see each SurveyStep*.vue's
// #cca-survey-heading, which is the only element with that id at any
// given time since steps are mutually exclusive).
watch(currentStep, () => {
  nextTick(() => {
    document.getElementById('cca-survey-heading')?.focus()
  })
})

function goBack() {
  if (currentStep.value > 1 && currentStep.value <= TOTAL_STEPS) {
    currentStep.value -= 1
  }
}

function goNext() {
  if (currentStep.value < TOTAL_STEPS) {
    currentStep.value += 1
  } else if (currentStep.value === TOTAL_STEPS) {
    submitSurvey()
  }
}

function submitSurvey() {
  const payload: WorkshopSurveyAnswers = {
    who: answers.who,
    needs: [...answers.needs],
    preference: answers.preference,
    details: answers.details,
  }
  // TODO: wire to backend once Supabase (or another store) is connected
  console.log('Workshop survey submitted:', payload)
  currentStep.value = THANK_YOU_STEP
}

function closeDialog() {
  dialogOpen.value = false
}

defineExpose({ currentStep, answers, goBack, goNext, submitSurvey, closeDialog })
</script>

<template>
  <v-dialog v-model="dialogOpen" max-width="560" scrollable aria-labelledby="cca-survey-heading">
    <v-card class="cca-survey-dialog" rounded="12">
      <v-btn
        icon="mdi-close"
        variant="text"
        color="on-surface"
        :aria-label="t('home.workshops.survey.closeLabel')"
        size="48"
        class="cca-survey-dialog__close"
        @click="closeDialog"
      />

      <div v-if="currentStep <= TOTAL_STEPS" class="cca-visually-hidden" aria-live="polite">
        {{ t('home.workshops.survey.stepOfLabel', { current: currentStep, total: TOTAL_STEPS }) }}
      </div>

      <v-card-text class="cca-survey-dialog__body">
        <SurveyStepWho v-if="currentStep === 1" v-model="answers.who" />
        <SurveyStepNeeds v-else-if="currentStep === 2" v-model="answers.needs" />
        <SurveyStepPreference v-else-if="currentStep === 3" v-model="answers.preference" />
        <SurveyStepDetails v-else-if="currentStep === 4" v-model="answers.details" />
        <SurveyStepThankYou v-else @close="closeDialog" />
      </v-card-text>

      <v-card-actions v-if="currentStep <= TOTAL_STEPS" class="cca-survey-dialog__actions">
        <v-btn
          v-if="currentStep > 1"
          variant="outlined"
          color="on-surface"
          rounded="8"
          size="large"
          min-height="48"
          @click="goBack"
        >
          {{ t('home.workshops.survey.backButton') }}
        </v-btn>
        <v-spacer />
        <v-btn
          color="primary"
          variant="flat"
          rounded="8"
          size="large"
          min-height="48"
          @click="goNext"
        >
          {{
            currentStep === TOTAL_STEPS
              ? t('home.workshops.survey.submitButton')
              : t('home.workshops.survey.nextButton')
          }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped lang="scss">
.cca-survey-dialog {
  position: relative;
  padding: var(--cca-space-6) var(--cca-space-5) var(--cca-space-5);
}

.cca-survey-dialog__close {
  position: absolute;
  top: var(--cca-space-3);
  right: var(--cca-space-3);
}

.cca-survey-dialog__body {
  padding-block: var(--cca-space-4) 0;
}

.cca-survey-dialog__actions {
  padding-block: var(--cca-space-5) 0;
}
</style>
