<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { VForm } from 'vuetify/components'

const { t } = useI18n()

const formRef = ref<VForm>()
const name = ref('')
const email = ref('')
const submitted = ref(false)
const emailTouched = ref(false)

const emailRules = [
  (value: string) => !!value || t('home.stayInformed.emailRequiredError'),
  (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || t('home.stayInformed.emailInvalidError'),
]

// Drives aria-invalid independent of Vuetify's own visual error state, so
// screen readers announce "invalid entry" on re-focus, not just the
// describedby error text on submit — Vuetify's VField doesn't wire
// aria-invalid itself. Gated on emailTouched so the field isn't announced
// invalid before the visitor has attempted to submit.
const emailInvalid = computed(
  () => emailTouched.value && emailRules.some((rule) => rule(email.value) !== true),
)

async function handleSubmit() {
  emailTouched.value = true
  const result = await formRef.value?.validate()
  if (!result?.valid) return

  const payload = { name: name.value, email: email.value }
  // TODO: wire to backend once Supabase (or another store) is connected
  if (import.meta.env.DEV) console.log('Stay informed signup submitted:', payload)

  submitted.value = true
  // Move focus to the success message so screen reader users — who never
  // saw the form visually disappear — know the submission went through.
  // Same id-reuse + nextTick-then-focus pattern WorkshopsSurveyDialog.vue
  // uses for its own step transitions (see #cca-survey-heading there).
  nextTick(() => {
    document.getElementById('cca-stay-informed-heading')?.focus()
  })
}

defineExpose({ email, emailRules, emailInvalid, submitted, handleSubmit })
</script>

<template>
  <section class="cca-stay-informed" aria-labelledby="cca-stay-informed-heading">
    <v-container class="cca-stay-informed__container">
      <div class="cca-stay-informed__col">
        <template v-if="!submitted">
          <h2 id="cca-stay-informed-heading" class="cca-stay-informed__headline cca-display">
            {{ t('home.stayInformed.title') }}
          </h2>
          <p class="cca-stay-informed__body">{{ t('home.stayInformed.body') }}</p>

          <v-form
            ref="formRef"
            class="cca-stay-informed__form"
            validate-on="submit lazy"
            @submit.prevent="handleSubmit"
          >
            <v-text-field
              v-model="name"
              :label="t('home.stayInformed.nameLabel')"
              type="text"
              autocomplete="name"
              variant="outlined"
              rounded="8"
              color="primary"
              class="cca-stay-informed__field"
            />
            <v-text-field
              v-model="email"
              :label="t('home.stayInformed.emailLabel')"
              type="email"
              autocomplete="email"
              aria-required="true"
              :aria-invalid="emailInvalid"
              variant="outlined"
              rounded="8"
              color="primary"
              :rules="emailRules"
              class="cca-stay-informed__field"
            />
            <v-btn
              type="submit"
              color="primary"
              variant="flat"
              rounded="8"
              size="large"
              min-height="48"
              class="cca-stay-informed__submit"
            >
              {{ t('home.stayInformed.submitButton') }}
            </v-btn>
          </v-form>
        </template>

        <div v-else role="status">
          <h2
            id="cca-stay-informed-heading"
            tabindex="-1"
            class="cca-stay-informed__headline cca-display"
          >
            {{ t('home.stayInformed.successTitle') }}
          </h2>
          <p class="cca-stay-informed__body">{{ t('home.stayInformed.successBody') }}</p>
        </div>
      </div>
    </v-container>
  </section>
</template>

<style scoped lang="scss">
// White/surface background — this section sits between CommunityWorkshops
// (cream/background token) above and CTA (orange/primary token) below, so
// surface keeps the cream -> white -> orange alternation the rest of the
// homepage sections follow, same rationale PayWhatYouCanSection documents
// for its own placement between two non-white sections.
.cca-stay-informed {
  background: rgb(var(--v-theme-surface));
  padding-block: var(--cca-space-6);

  @media (min-width: 960px) {
    padding-block: var(--cca-space-8);
  }
}

.cca-stay-informed__container {
  max-width: var(--cca-container-max);
}

.cca-stay-informed__col {
  max-width: 700px;
  margin-inline: auto;
  text-align: center;
}

.cca-stay-informed__headline {
  font-size: clamp(28px, 4vw, 36px);
  font-weight: 700;
  line-height: 1.3;
  color: rgb(var(--v-theme-on-surface));
  margin: 0 0 var(--cca-space-3);

  // Only applied when this heading is the focus target after submission
  // (the pre-submit heading is never focused programmatically) — matches
  // SurveyStepThankYou.vue's own focus-ring treatment for its thank-you
  // heading. Plain :focus (not :focus-visible) to guarantee the ring shows
  // on this script-driven focus() call across browsers, same reasoning as
  // that file.
  &:focus {
    outline: 3px solid rgb(var(--v-theme-on-surface));
    outline-offset: 3px;
  }
}

.cca-stay-informed__body {
  font-size: 16px;
  line-height: 1.6;
  color: rgb(var(--v-theme-on-surface));
  max-width: 55ch;
  margin: 0 auto var(--cca-space-6);
}

.cca-stay-informed__form {
  max-width: 420px;
  margin-inline: auto;
  text-align: start;
}

.cca-stay-informed__field {
  margin-bottom: var(--cca-space-3);
}

.cca-stay-informed__submit {
  display: block;
  width: 100%;
  margin-top: var(--cca-space-2);
}
</style>
