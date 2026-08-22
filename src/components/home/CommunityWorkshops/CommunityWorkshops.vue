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
