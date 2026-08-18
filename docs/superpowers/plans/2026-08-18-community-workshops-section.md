# Community Workshops Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a "Community Workshops" homepage section (coming-soon teaser + a 4-question needs-assessment survey wizard in a modal dialog) to the CCA site.

**Architecture:** A flat teaser section component (`CommunityWorkshops.vue`, matching every other homepage section's shape) opens a `v-dialog`-based wizard (`WorkshopsSurveyDialog.vue`) that owns all step/answer state and renders one of five small, dumb step components at a time. Submission is stubbed (console-logged) since no backend is wired up yet.

**Tech Stack:** Vue 3.5 `<script setup>` + `defineModel`/`defineExpose`, Vuetify 4.1.9 (`v-dialog`, `v-radio-group`, `v-checkbox`, `v-textarea`), vue-i18n 11 (Composition API `useI18n`), Vitest 4 + `@vue/test-utils` 2.4.

**Spec:** `docs/superpowers/specs/2026-08-18-community-workshops-section-design.md`

## Global Constraints

- Brand palette only: cream `#FDF6EC`, sand `#F8E9D5`, orange `#F4A259`, clay `#B95E23`, sky `#78B8D9`, sage `#8BAE7B`, charcoal `#343434` — use the existing Vuetify theme tokens (`primary`, `on-surface`, `clay`, `background`, etc.), never raw hex.
- 48×48px minimum touch target on every interactive control (buttons, radios, checkboxes) — this app's established floor for its elderly/low-dexterity audience.
- 16px minimum body text; WCAG 2.1 AA contrast everywhere (4.5:1 normal text, 3:1 large text/non-text UI).
- All user-facing copy ships in both English (`src/locales/en.json`) and Spanish (`src/locales/es.json`) — same key structure, no key drift.
- No backend call on survey submit — Supabase isn't wired up anywhere in this app yet. Submission stubs to `console.log` behind a `// TODO: wire to backend once Supabase (or another store) is connected` comment.
- No new route — everything lives on the existing `/` homepage.
- Follow this repo's established homepage-section shape: one flat `.vue` file per section, `section.cca-<name>` root with `aria-labelledby`, `v-container`, scoped SCSS, copy via `t('home.<section>.*')` — see `src/components/home/CTA/CTASection.vue` and `src/components/home/PayWhatYouCan/PayWhatYouCanSection.vue` as the reference pattern.
- No dedicated test files for purely presentational components (matches this repo's existing convention — no other homepage section has one). Only the stateful `WorkshopsSurveyDialog.vue` gets a Vitest spec.

---

### Task 1: Add `home.workshops` i18n keys (English + Spanish)

**Files:**
- Modify: `src/locales/en.json` (insert `workshops` block between `payWhatYouCan` and `cta`, matching `Home.vue`'s section order)
- Modify: `src/locales/es.json` (same insertion point)

**Interfaces:**
- Produces: every `t('home.workshops.*')` key later tasks bind to — see the exact key list below. Any component using a key not listed here is a bug.

- [ ] **Step 1: Insert the English keys**

In `src/locales/en.json`, the `home` object currently reads (line ~120-133):

```json
    "payWhatYouCan": {
      "title": "Everyone Deserves Help",
      "subheading": "Pay What You Can",
      "intro": "Technology shouldn't be a luxury. Here's how it works:",
      "perSessionLabel": "per session",
      "sliderAriaLabel": "Choose the amount you'd like to pay per session, from $0 to $75.",
      "supportingText": "If you're able to contribute, thank you — it helps us stay here for our neighbors. If not, we're still here for you. This is community care, not charity."
    },
    "cta": {
```

Replace it with (inserting the new `workshops` block before `cta`):

```json
    "payWhatYouCan": {
      "title": "Everyone Deserves Help",
      "subheading": "Pay What You Can",
      "intro": "Technology shouldn't be a luxury. Here's how it works:",
      "perSessionLabel": "per session",
      "sliderAriaLabel": "Choose the amount you'd like to pay per session, from $0 to $75.",
      "supportingText": "If you're able to contribute, thank you — it helps us stay here for our neighbors. If not, we're still here for you. This is community care, not charity."
    },
    "workshops": {
      "title": "Community Workshops",
      "comingSoon": "Coming soon to communities throughout the Coachella Valley.",
      "body": "We're planning our first workshops, and we'd like to hear from you. What technology challenges would you or someone you love like help with?",
      "ctaButton": "Tell Us What You Need",
      "survey": {
        "stepOfLabel": "Step {current} of {total}",
        "backButton": "Back",
        "nextButton": "Next",
        "submitButton": "Submit",
        "closeLabel": "Close survey",
        "who": {
          "question": "Who are you filling this out for?",
          "options": {
            "self": "Myself",
            "parentGrandparent": "A parent or grandparent",
            "familyMember": "A family member",
            "friendNeighbor": "A friend or neighbor",
            "workColleague": "Someone I work with or support"
          }
        },
        "needs": {
          "question": "What would you like help with?",
          "hint": "Select all that apply",
          "options": {
            "smartphone": "Using a smartphone",
            "computer": "Using a computer",
            "tablet": "Using a tablet",
            "email": "Email",
            "videoCalls": "Video calls with family",
            "internet": "Getting connected to the internet",
            "wifi": "Wi-Fi",
            "smartTv": "Smart TV / streaming",
            "healthcare": "Online healthcare",
            "government": "Government websites / applications",
            "safety": "Online safety & scams",
            "passwords": "Passwords & accounts",
            "accessibility": "Accessibility features",
            "printing": "Printing / scanning",
            "somethingElse": "Something else"
          }
        },
        "preference": {
          "question": "What would you prefer?",
          "options": {
            "group": "A small group workshop",
            "oneOnOne": "One-on-one help",
            "atHome": "Help at home",
            "online": "Online/video help",
            "notSure": "I'm not sure"
          }
        },
        "details": {
          "question": "What is the biggest technology problem you're dealing with?",
          "placeholder": "Tell us a little about it — there's no wrong answer."
        },
        "thankYou": {
          "title": "Thank You!",
          "body": "We've heard you. As we plan our first workshops, this helps us know exactly what to cover. We'll be in touch when workshops are ready.",
          "closeButton": "Close"
        }
      }
    },
    "cta": {
```

- [ ] **Step 2: Insert the matching Spanish keys**

In `src/locales/es.json`, find the equivalent `payWhatYouCan` → `cta` boundary (same structure as `en.json`) and insert:

```json
    "workshops": {
      "title": "Talleres Comunitarios",
      "comingSoon": "Próximamente en comunidades de todo el Valle de Coachella.",
      "body": "Estamos planificando nuestros primeros talleres y nos encantaría escucharle. ¿Con qué retos de tecnología le gustaría que le ayudáramos a usted o a alguien que quiere?",
      "ctaButton": "Cuéntenos Qué Necesita",
      "survey": {
        "stepOfLabel": "Paso {current} de {total}",
        "backButton": "Atrás",
        "nextButton": "Siguiente",
        "submitButton": "Enviar",
        "closeLabel": "Cerrar encuesta",
        "who": {
          "question": "¿Para quién está completando esto?",
          "options": {
            "self": "Para mí",
            "parentGrandparent": "Un padre o abuelo",
            "familyMember": "Un familiar",
            "friendNeighbor": "Un amigo o vecino",
            "workColleague": "Alguien a quien apoyo o con quien trabajo"
          }
        },
        "needs": {
          "question": "¿Con qué le gustaría recibir ayuda?",
          "hint": "Seleccione todas las que correspondan",
          "options": {
            "smartphone": "Usar un teléfono inteligente",
            "computer": "Usar una computadora",
            "tablet": "Usar una tableta",
            "email": "Correo electrónico",
            "videoCalls": "Videollamadas con la familia",
            "internet": "Conectarse a internet",
            "wifi": "Wi-Fi",
            "smartTv": "Televisor inteligente / transmisión (streaming)",
            "healthcare": "Portales de salud en línea",
            "government": "Sitios web / solicitudes del gobierno",
            "safety": "Seguridad en línea y estafas",
            "passwords": "Contraseñas y cuentas",
            "accessibility": "Funciones de accesibilidad",
            "printing": "Imprimir / escanear",
            "somethingElse": "Algo más"
          }
        },
        "preference": {
          "question": "¿Qué preferiría?",
          "options": {
            "group": "Un taller en grupo pequeño",
            "oneOnOne": "Ayuda individual",
            "atHome": "Ayuda en casa",
            "online": "Ayuda en línea / por video",
            "notSure": "No estoy seguro/a"
          }
        },
        "details": {
          "question": "¿Cuál es el mayor problema de tecnología que está enfrentando?",
          "placeholder": "Cuéntenos un poco más — no hay una respuesta incorrecta."
        },
        "thankYou": {
          "title": "¡Gracias!",
          "body": "Le escuchamos. Esto nos ayuda a saber exactamente qué cubrir mientras planificamos nuestros primeros talleres. Nos pondremos en contacto cuando estén listos.",
          "closeButton": "Cerrar"
        }
      }
    },
```

(Insert immediately before that file's `"cta": {` entry, same position as in `en.json`.)

- [ ] **Step 3: Verify both files are valid JSON**

Run:
```bash
node -e "JSON.parse(require('fs').readFileSync('src/locales/en.json', 'utf8')); JSON.parse(require('fs').readFileSync('src/locales/es.json', 'utf8')); console.log('valid')"
```
Expected: `valid` printed, no error.

- [ ] **Step 4: Run type-check**

Run: `npm run type-check`
Expected: passes (these are plain JSON edits, but this confirms nothing else broke).

- [ ] **Step 5: Commit**

```bash
git add src/locales/en.json src/locales/es.json
git commit -m "$(cat <<'EOF'
Add i18n keys for Community Workshops section and survey

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 2: Global a11y fixes + `SurveyStepWho.vue`

**Files:**
- Modify: `src/assets/styles/main.scss`
- Create: `src/components/home/CommunityWorkshops/survey-steps/SurveyStepWho.vue`

**Interfaces:**
- Consumes: `home.workshops.survey.who.*` keys from Task 1.
- Produces: `SurveyStepWho.vue` — props: `modelValue: string` (via `defineModel`), event: `update:modelValue`. Renders an `<h2 id="cca-survey-heading" tabindex="-1">` that `WorkshopsSurveyDialog.vue` (Task 7) will focus on step change. Also produces two new global CSS rules (`.v-label`, `.v-selection-control`) and a `.cca-visually-hidden` utility class that Tasks 3, 4, and 7 all depend on.

- [ ] **Step 1: Add the global selection-control fixes and a visually-hidden utility to `main.scss`**

This is the first task to use `v-radio`/`v-checkbox` anywhere in the app, so two real Vuetify default-style bugs surface now: `.v-label` renders at `opacity: var(--v-medium-emphasis-opacity)` (0.6), which composites on-surface charcoal text down to ~3.85:1 on this app's light backgrounds — under WCAG AA's 4.5:1 floor for the 16px labels these controls render. And Vuetify's default selection-control touch target (`--v-selection-control-size`, density="default") is 40px, 8px short of this app's 48px minimum.

Add to the end of `src/assets/styles/main.scss`:

```scss

// Vuetify's VLabel defaults to `opacity: var(--v-medium-emphasis-opacity)`
// (0.6) — on-surface charcoal at 60% opacity over this app's light
// backgrounds composites to ~3.85:1, under WCAG AA's 4.5:1 floor for the
// 16px labels v-checkbox/v-radio render. Full opacity + explicit on-surface
// color fixes every selection-control label site-wide. Same "unlayered
// beats Vuetify's @layer'd component CSS" pattern as the focus-ring
// override above.
.v-label {
  opacity: 1;
  color: rgb(var(--v-theme-on-surface));
}

// Vuetify's default selection-control touch target is 40px
// (`--v-selection-control-size`, density="default") — 8px short of this
// app's 48x48px minimum for elderly/low-dexterity users. Same override
// pattern as PayWhatYouCanSection's slider-thumb touch-target fix.
.v-selection-control {
  --v-selection-control-size: 48px;
}

// Standard visually-hidden utility: keeps content in the accessibility
// tree (screen readers, aria-live announcements) while removing it from
// visual layout entirely.
.cca-visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

- [ ] **Step 2: Create `SurveyStepWho.vue`**

Create `src/components/home/CommunityWorkshops/survey-steps/SurveyStepWho.vue`:

```vue
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
```

- [ ] **Step 3: Type-check**

Run: `npm run type-check`
Expected: passes.

- [ ] **Step 4: Commit**

```bash
git add src/assets/styles/main.scss src/components/home/CommunityWorkshops/survey-steps/SurveyStepWho.vue
git commit -m "$(cat <<'EOF'
Add global selection-control a11y fixes and survey Q1 (who) step

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 3: `SurveyStepNeeds.vue`

**Files:**
- Create: `src/components/home/CommunityWorkshops/survey-steps/SurveyStepNeeds.vue`

**Interfaces:**
- Consumes: `home.workshops.survey.needs.*` keys from Task 1; `.cca-visually-hidden`, `.v-label`/`.v-selection-control` fixes from Task 2.
- Produces: `SurveyStepNeeds.vue` — props: `modelValue: string[]` (via `defineModel`), event: `update:modelValue`.

- [ ] **Step 1: Create the component**

Create `src/components/home/CommunityWorkshops/survey-steps/SurveyStepNeeds.vue`:

```vue
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
```

Note: multiple `v-checkbox` components sharing the same array `v-model` with distinct `value` props is native Vuetify behavior — each checkbox toggles its own membership in the shared array without any manual push/splice code.

- [ ] **Step 2: Type-check**

Run: `npm run type-check`
Expected: passes.

- [ ] **Step 3: Commit**

```bash
git add src/components/home/CommunityWorkshops/survey-steps/SurveyStepNeeds.vue
git commit -m "$(cat <<'EOF'
Add survey Q2 (needs, multi-select) step

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 4: `SurveyStepPreference.vue`

**Files:**
- Create: `src/components/home/CommunityWorkshops/survey-steps/SurveyStepPreference.vue`

**Interfaces:**
- Consumes: `home.workshops.survey.preference.*` keys from Task 1.
- Produces: `SurveyStepPreference.vue` — props: `modelValue: string` (via `defineModel`), event: `update:modelValue`.

- [ ] **Step 1: Create the component**

Create `src/components/home/CommunityWorkshops/survey-steps/SurveyStepPreference.vue`:

```vue
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const preference = defineModel<string>({ default: '' })
const { t } = useI18n()

const PREFERENCE_OPTIONS = ['group', 'oneOnOne', 'atHome', 'online', 'notSure'] as const
</script>

<template>
  <div class="cca-survey-step">
    <h2 id="cca-survey-heading" tabindex="-1" class="cca-survey-step__question">
      {{ t('home.workshops.survey.preference.question') }}
    </h2>
    <fieldset class="cca-survey-step__fieldset" aria-labelledby="cca-survey-heading">
      <v-radio-group v-model="preference" color="clay" hide-details density="default">
        <v-radio
          v-for="option in PREFERENCE_OPTIONS"
          :key="option"
          :value="option"
          :label="t(`home.workshops.survey.preference.options.${option}`)"
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
```

- [ ] **Step 2: Type-check**

Run: `npm run type-check`
Expected: passes.

- [ ] **Step 3: Commit**

```bash
git add src/components/home/CommunityWorkshops/survey-steps/SurveyStepPreference.vue
git commit -m "$(cat <<'EOF'
Add survey Q3 (preference) step

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 5: `SurveyStepDetails.vue`

**Files:**
- Create: `src/components/home/CommunityWorkshops/survey-steps/SurveyStepDetails.vue`

**Interfaces:**
- Consumes: `home.workshops.survey.details.*` keys from Task 1.
- Produces: `SurveyStepDetails.vue` — props: `modelValue: string` (via `defineModel`), event: `update:modelValue`.

- [ ] **Step 1: Create the component**

Create `src/components/home/CommunityWorkshops/survey-steps/SurveyStepDetails.vue`:

```vue
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
```

- [ ] **Step 2: Type-check**

Run: `npm run type-check`
Expected: passes.

- [ ] **Step 3: Commit**

```bash
git add src/components/home/CommunityWorkshops/survey-steps/SurveyStepDetails.vue
git commit -m "$(cat <<'EOF'
Add survey Q4 (free-text details) step

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 6: `SurveyStepThankYou.vue`

**Files:**
- Create: `src/components/home/CommunityWorkshops/survey-steps/SurveyStepThankYou.vue`

**Interfaces:**
- Consumes: `home.workshops.survey.thankYou.*` keys from Task 1.
- Produces: `SurveyStepThankYou.vue` — no props, emits `close: []` (caught by `WorkshopsSurveyDialog.vue` in Task 7 to close the dialog).

- [ ] **Step 1: Create the component**

Create `src/components/home/CommunityWorkshops/survey-steps/SurveyStepThankYou.vue`:

```vue
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
```

- [ ] **Step 2: Type-check**

Run: `npm run type-check`
Expected: passes.

- [ ] **Step 3: Commit**

```bash
git add src/components/home/CommunityWorkshops/survey-steps/SurveyStepThankYou.vue
git commit -m "$(cat <<'EOF'
Add survey thank-you confirmation step

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 7: `WorkshopsSurveyDialog.vue` + Vitest spec

**Files:**
- Create: `src/components/home/CommunityWorkshops/WorkshopsSurveyDialog.vue`
- Test: `src/components/home/CommunityWorkshops/WorkshopsSurveyDialog.spec.ts`

**Interfaces:**
- Consumes: `SurveyStepWho.vue`, `SurveyStepNeeds.vue`, `SurveyStepPreference.vue`, `SurveyStepDetails.vue`, `SurveyStepThankYou.vue` (Tasks 2-6); `home.workshops.survey.*` keys (Task 1).
- Produces: `WorkshopsSurveyDialog.vue` — prop/event: `modelValue: boolean` (via `defineModel`, controls dialog visibility). Exposes (via `defineExpose`, consumed by this task's own spec and by nothing else): `currentStep: Ref<number>`, `answers: { who: string; needs: string[]; preference: string; details: string }`, `goBack(): void`, `goNext(): void`, `submitSurvey(): void`, `closeDialog(): void`. Task 8 (`CommunityWorkshops.vue`) only consumes the `modelValue` v-model — it does not touch the exposed internals.

- [ ] **Step 1: Write the failing spec**

Create `src/components/home/CommunityWorkshops/WorkshopsSurveyDialog.spec.ts`:

```ts
import { describe, it, expect, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import vuetify from '@/plugins/vuetify'
import i18n from '@/plugins/i18n'
import WorkshopsSurveyDialog from './WorkshopsSurveyDialog.vue'

function mountDialog() {
  return mount(WorkshopsSurveyDialog, {
    props: { modelValue: true },
    global: { plugins: [vuetify, i18n] },
  })
}

describe('WorkshopsSurveyDialog', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('starts on step 1 with empty answers', () => {
    const wrapper = mountDialog()
    expect(wrapper.vm.currentStep).toBe(1)
    expect(wrapper.vm.answers).toEqual({ who: '', needs: [], preference: '', details: '' })
  })

  it('advances with goNext and returns with goBack', async () => {
    const wrapper = mountDialog()

    wrapper.vm.goNext()
    await nextTick()
    expect(wrapper.vm.currentStep).toBe(2)

    wrapper.vm.goBack()
    await nextTick()
    expect(wrapper.vm.currentStep).toBe(1)
  })

  it('does not go below step 1', async () => {
    const wrapper = mountDialog()
    wrapper.vm.goBack()
    await nextTick()
    expect(wrapper.vm.currentStep).toBe(1)
  })

  it('builds the submit payload and advances to the thank-you step', () => {
    const wrapper = mountDialog()
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    wrapper.vm.answers.who = 'self'
    wrapper.vm.answers.needs = ['smartphone', 'email']
    wrapper.vm.answers.preference = 'oneOnOne'
    wrapper.vm.answers.details = 'My phone keeps freezing.'
    wrapper.vm.currentStep = 4

    wrapper.vm.submitSurvey()

    expect(logSpy).toHaveBeenCalledWith('Workshop survey submitted:', {
      who: 'self',
      needs: ['smartphone', 'email'],
      preference: 'oneOnOne',
      details: 'My phone keeps freezing.',
    })
    expect(wrapper.vm.currentStep).toBe(5)
  })

  it('resets step and answers each time the dialog reopens', async () => {
    const wrapper = mountDialog()
    wrapper.vm.answers.who = 'self'
    wrapper.vm.currentStep = 3

    await wrapper.setProps({ modelValue: false })
    await wrapper.setProps({ modelValue: true })

    expect(wrapper.vm.currentStep).toBe(1)
    expect(wrapper.vm.answers).toEqual({ who: '', needs: [], preference: '', details: '' })
  })
})
```

- [ ] **Step 2: Run the spec to confirm it fails**

Run: `npm run test -- WorkshopsSurveyDialog`
Expected: FAIL — `WorkshopsSurveyDialog.vue` does not exist yet (module not found).

- [ ] **Step 3: Create `WorkshopsSurveyDialog.vue`**

Create `src/components/home/CommunityWorkshops/WorkshopsSurveyDialog.vue`:

```vue
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
  if (isOpen) resetSurvey()
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
        <v-btn color="primary" variant="flat" rounded="8" size="large" min-height="48" @click="goNext">
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
```

- [ ] **Step 4: Run the spec to confirm it passes**

Run: `npm run test -- WorkshopsSurveyDialog`
Expected: PASS, all 5 tests green.

- [ ] **Step 5: Type-check**

Run: `npm run type-check`
Expected: passes.

- [ ] **Step 6: Commit**

```bash
git add src/components/home/CommunityWorkshops/WorkshopsSurveyDialog.vue src/components/home/CommunityWorkshops/WorkshopsSurveyDialog.spec.ts
git commit -m "$(cat <<'EOF'
Add survey wizard dialog orchestrating the 5 step components

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 8: `CommunityWorkshops.vue` teaser section

**Files:**
- Create: `src/components/home/CommunityWorkshops/CommunityWorkshops.vue`

**Interfaces:**
- Consumes: `WorkshopsSurveyDialog.vue` (Task 7, via its `modelValue` v-model only); `home.workshops.title/comingSoon/body/ctaButton` keys (Task 1).
- Produces: `CommunityWorkshops.vue` — no props/emits; a self-contained homepage section for `Home.vue` (Task 9) to import and render.

- [ ] **Step 1: Create the component**

Create `src/components/home/CommunityWorkshops/CommunityWorkshops.vue`:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import WorkshopsSurveyDialog from './WorkshopsSurveyDialog.vue'

const { t } = useI18n()
const dialogOpen = ref(false)
</script>

<template>
  <section class="cca-workshops" aria-labelledby="cca-workshops-heading">
    <v-container class="cca-workshops__container">
      <div class="cca-workshops__col">
        <h2 id="cca-workshops-heading" class="cca-workshops__headline cca-display">
          {{ t('home.workshops.title') }}
        </h2>
        <p class="cca-workshops__coming-soon">{{ t('home.workshops.comingSoon') }}</p>
        <p class="cca-workshops__body">{{ t('home.workshops.body') }}</p>
        <v-btn
          color="primary"
          variant="flat"
          rounded="8"
          size="large"
          min-height="48"
          @click="dialogOpen = true"
        >
          {{ t('home.workshops.ctaButton') }}
        </v-btn>
      </div>
    </v-container>

    <WorkshopsSurveyDialog v-model="dialogOpen" />
  </section>
</template>

<style scoped lang="scss">
// Cream background (not surface/white) — this section sits directly below
// PayWhatYouCan's white/surface section, so cream keeps it visually
// distinct without competing with CTA's orange below. Same rationale
// ServicesSection documents for its own cream-vs-white alternation.
.cca-workshops {
  background: rgb(var(--v-theme-background));
  padding-block: var(--cca-space-6);

  @media (min-width: 960px) {
    padding-block: var(--cca-space-8);
  }
}

.cca-workshops__container {
  max-width: var(--cca-container-max);
}

.cca-workshops__col {
  max-width: 700px;
  margin-inline: auto;
  text-align: center;
}

// Clay headline on this section's cream background: cream (#FDF6EC) is
// close enough to white that this measures effectively the same ~4.5:1 as
// PayWhatYouCanSection's verified clay-on-white headline — clears the 3:1
// large-text floor this 36px/700 headline qualifies for. Don't reuse clay
// at body-copy sizes (same rule PayWhatYouCanSection documents).
.cca-workshops__headline {
  font-size: clamp(28px, 4vw, 36px);
  font-weight: 700;
  line-height: 1.3;
  color: rgb(var(--v-theme-clay));
  margin: 0 0 var(--cca-space-3);
}

.cca-workshops__coming-soon {
  font-size: 18px;
  font-weight: 600;
  line-height: 1.4;
  color: rgb(var(--v-theme-on-surface));
  margin: 0 0 var(--cca-space-4);
}

.cca-workshops__body {
  font-size: 16px;
  line-height: 1.6;
  color: rgb(var(--v-theme-on-surface));
  max-width: 55ch;
  margin: 0 auto var(--cca-space-6);
}
</style>
```

- [ ] **Step 2: Type-check**

Run: `npm run type-check`
Expected: passes.

- [ ] **Step 3: Commit**

```bash
git add src/components/home/CommunityWorkshops/CommunityWorkshops.vue
git commit -m "$(cat <<'EOF'
Add Community Workshops teaser section

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 9: Wire into `Home.vue`, sync docs, verify end-to-end

**Files:**
- Modify: `src/pages/Home.vue`
- Modify: `docs/03-Website-Design/Homepage/Sections.md`

**Interfaces:**
- Consumes: `CommunityWorkshops.vue` (Task 8).

- [ ] **Step 1: Add `CommunityWorkshops` to `Home.vue`**

In `src/pages/Home.vue`, add the import and place the component between `PayWhatYouCanSection` and `CTASection`:

```vue
<script setup lang="ts">
import HeroSection from '@/components/home/Hero/HeroSection.vue'
import MissionSection from '@/components/home/Mission/MissionSection.vue'
import WhoWeHelpSection from '@/components/home/Audience/WhoWeHelpSection.vue'
import ServicesSection from '@/components/home/Services/ServicesSection.vue'
import HowItWorksSection from '@/components/home/HowItWorks/HowItWorksSection.vue'
import PayWhatYouCanSection from '@/components/home/PayWhatYouCan/PayWhatYouCanSection.vue'
import CommunityWorkshops from '@/components/home/CommunityWorkshops/CommunityWorkshops.vue'
import CTASection from '@/components/home/CTA/CTASection.vue'
</script>

<template>
  <HeroSection />
  <MissionSection />
  <WhoWeHelpSection />
  <ServicesSection />
  <HowItWorksSection />
  <PayWhatYouCanSection />
  <CommunityWorkshops />
  <CTASection />
</template>
```

- [ ] **Step 2: Update the Sections.md doc to match what was actually built**

In `docs/03-Website-Design/Homepage/Sections.md`, replace the `## 8️⃣ Community Workshops Section` block (currently a calendar/listing sketch) with:

```markdown
## 8️⃣ Community Workshops Section

**Purpose:** Announce upcoming workshops are coming, and collect a needs-assessment survey to inform what the first workshops should cover

**Status:** No workshops are scheduled yet — this section is a "coming soon" teaser, not a calendar/listing (that's a future section once workshops exist to list).

### Layout
- Centered single-column teaser (headline, coming-soon line, body copy, CTA button) — matches CTASection/PayWhatYouCanSection's layout
- "Tell Us What You Need" button opens a modal survey dialog

### Survey
A 4-question wizard, one question per screen (not a single long form), reached via the teaser's CTA button:
1. Who are you filling this out for? (single-select)
2. What would you like help with? (multi-select, 15 options)
3. What would you prefer? (single-select: group/one-on-one/at home/online/not sure)
4. What is the biggest technology problem you're dealing with? (free text)

Back navigation is allowed; nothing is required to advance. Submission is stubbed (no backend wired up yet) and ends on a thank-you confirmation screen.

### Components
- `CommunityWorkshops.vue` (teaser section)
- `WorkshopsSurveyDialog.vue` (wizard orchestrator)
- `survey-steps/SurveyStepWho.vue`, `SurveyStepNeeds.vue`, `SurveyStepPreference.vue`, `SurveyStepDetails.vue`, `SurveyStepThankYou.vue`

See `docs/superpowers/specs/2026-08-18-community-workshops-section-design.md` for the full design.
```

- [ ] **Step 3: Run the full check suite**

Run:
```bash
npm run type-check && npm run test && npm run build
```
Expected: all three pass with no errors.

- [ ] **Step 4: Manual verification in the browser**

Run `npm run dev`, open the homepage, and:
- Confirm the Community Workshops section renders between Pay What You Can and the final CTA.
- Click "Tell Us What You Need" — dialog opens on step 1.
- Click through Next on all 4 steps without selecting anything (confirms nothing is required), reach the thank-you screen, confirm the payload appears in the browser console.
- Reopen the dialog — confirm it resets to step 1 with no prior answers.
- Tab through a step with the keyboard — confirm focus lands on the step heading after Next/Back, and the close button/Back/Next all have a visible focus ring.
- Switch the site to Spanish (language toggle) and confirm all survey copy is translated.

- [ ] **Step 5: Commit**

```bash
git add src/pages/Home.vue docs/03-Website-Design/Homepage/Sections.md
git commit -m "$(cat <<'EOF'
Wire Community Workshops section into the homepage

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```
