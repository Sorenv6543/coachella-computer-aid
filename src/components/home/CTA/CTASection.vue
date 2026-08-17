<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <section class="cca-cta" aria-labelledby="cca-cta-heading">
    <v-container class="cca-cta__container">
      <div class="cca-cta__col">
        <h2 id="cca-cta-heading" class="cca-cta__headline cca-display">
          {{ t('home.cta.title') }}
        </h2>
        <p class="cca-cta__body">{{ t('home.cta.body') }}</p>
        <div class="cca-cta__ctas">
          <v-btn href="#cca-services-heading"
            color="surface"
            variant="flat"
            rounded="8"
            size="large"
            min-height="48"
            class="cca-cta__cta-primary"
          >
            {{ t('home.cta.ctaPrimary') }}
          </v-btn>
          <v-btn
            color="on-primary"
            variant="outlined"
            rounded="8"
            size="large"
            min-height="48"
            class="cca-cta__cta-secondary"
          >
            {{ t('home.cta.ctaSecondary') }}
          </v-btn>
        </div>
      </div>
    </v-container>
  </section>
</template>

<style scoped lang="scss">
// Orange section background with charcoal (on-primary) text — the spec calls
// for white text here, but white-on-orange measures ~2.07:1 (fails WCAG AA's
// 4.5:1 for body text and even 3:1 for large text). Charcoal-on-orange
// measures ~6:1. Same reasoning vuetify.ts already documents for on-primary
// on the Navbar/Hero buttons; this section just applies it to a full-bleed
// background instead of a button fill.
.cca-cta {
  background: rgb(var(--v-theme-primary));
  padding-block: var(--cca-space-6);

  @media (min-width: 960px) {
    padding-block: var(--cca-space-8);
  }
}

.cca-cta__container {
  max-width: var(--cca-container-max);
}

.cca-cta__col {
  max-width: 700px;
  margin-inline: auto;
  text-align: center;
}

.cca-cta__headline {
  // Spec calls for a flat 42px; clamped instead so it stays responsive and
  // in line with the other section H2s (clamp 28-36px) while still reading
  // as the largest, most emphatic headline after the H1 in Hero.
  font-size: clamp(28px, 5vw, 40px);
  font-weight: 700;
  line-height: 1.3;
  color: rgb(var(--v-theme-on-primary));
  margin: 0 0 var(--cca-space-4);
}

.cca-cta__body {
  font-size: 18px;
  line-height: 1.6;
  color: rgb(var(--v-theme-on-primary));
  max-width: 55ch;
  margin: 0 auto var(--cca-space-6);
}

.cca-cta__ctas {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--cca-space-4);
}

.cca-cta__cta-primary {
  // White surface + charcoal text + 2px charcoal border, matching the
  // brand's secondary-button treatment. Both the text (charcoal-on-white,
  // ~12.6:1) and the border edge (charcoal-on-orange, ~6:1) clear WCAG
  // 1.4.3/1.4.11 against this orange background — a white-bg/orange-text
  // combo (per the literal spec) would fail at ~2.07:1 either way round.
  border: 2px solid rgb(var(--v-theme-on-surface));
}

.cca-cta__cta-secondary {
  // Outlined charcoal-on-orange (~6:1), same treatment as the primary
  // button's border — clears WCAG 1.4.3/1.4.11 against this background.
  border-width: 2px !important;
}
</style>
