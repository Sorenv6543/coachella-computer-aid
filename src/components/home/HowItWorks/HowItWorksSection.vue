<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import StepCard from './StepCard.vue'
import step1Image from '@/assets/images/illustrations/ui/ui-816-how-it-works-step-1.webp'
import step2Image from '@/assets/images/illustrations/ui/ui-817-how-it-works-step-2.webp'
import step3Image from '@/assets/images/illustrations/ui/ui-818-how-it-works-step-3.webp'
import step4Image from '@/assets/images/illustrations/ui/ui-819-how-it-works-step-4.webp'

const { t } = useI18n()

// 4 steps per Homepage/Sections.md §6, in fixed sequence — order matters
// here (unlike Services' unordered grid), so the template renders these
// inside an <ol>/<li> rather than plain <v-row>/<v-col> divs.
const steps = computed(() => [
  { key: 'contactUs', image: step1Image },
  { key: 'weListen', image: step2Image },
  { key: 'weTeach', image: step3Image },
  { key: 'youSucceed', image: step4Image },
])
</script>

<template>
  <section class="cca-how-it-works" aria-labelledby="cca-how-it-works-heading">
    <v-container class="cca-how-it-works__container">
      <div class="cca-how-it-works__intro">
        <h2 id="cca-how-it-works-heading" class="cca-how-it-works__headline cca-display">
          {{ t('home.howItWorks.title') }}
        </h2>
        <p class="cca-how-it-works__lead">{{ t('home.howItWorks.intro') }}</p>
      </div>

      <!-- Explicit role="list"/"listitem" backstop `list-style: none` (below)
      combined with the row's `display: flex` from removing the implicit
      list/listitem AT roles in Safari/VoiceOver — without it, VoiceOver
      users get no step-position cue, since StepCard hides the numbered
      badge from the a11y tree on the assumption the <ol>/<li> already
      conveys it. -->
      <v-row tag="ol" role="list" class="cca-how-it-works__grid">
        <v-col
          v-for="(step, index) in steps"
          :key="step.key"
          tag="li"
          role="listitem"
          cols="12"
          sm="6"
          md="3"
          class="cca-how-it-works__step"
        >
          <StepCard
            :step-number="index + 1"
            :image-src="step.image"
            :title="t(`home.howItWorks.steps.${step.key}.title`)"
            :description="t(`home.howItWorks.steps.${step.key}.description`)"
          />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped lang="scss">
.cca-how-it-works {
  // Cream background — this section sits between Services (cream) and the
  // not-yet-wired-in CTASection (full-bleed orange, built on sibling branch
  // feat/cta-section), so staying on the neutral token here is what keeps
  // the eventual Services -> HowItWorks -> CTA sequence from clashing.
  background: rgb(var(--v-theme-background));
  padding-block: var(--cca-space-6);

  @media (min-width: 960px) {
    padding-block: var(--cca-space-8);
  }
}

.cca-how-it-works__container {
  max-width: var(--cca-container-max);
}

.cca-how-it-works__intro {
  max-width: 720px;
  margin: 0 auto var(--cca-space-6);
  text-align: center;
}

.cca-how-it-works__headline {
  font-size: clamp(28px, 4vw, 36px);
  font-weight: 700;
  line-height: 1.3;
  color: rgb(var(--v-theme-on-background));
  margin: 0 0 var(--cca-space-3);
}

.cca-how-it-works__lead {
  font-size: 16px;
  line-height: 1.6;
  color: rgb(var(--v-theme-on-background));
  margin: 0;
}

.cca-how-it-works__grid {
  list-style: none;
  margin: 0;
  padding: 0;
  position: relative;
}

// The "connected flow" line called for in the spec. A single line drawn
// across the row (rather than a per-column pseudo-element on each step)
// avoids gaps at the v-row gutters and doesn't need first/last-child
// visibility toggling. It's inset 12.5% on each side so it runs roughly
// between the first and last badge centers across 4 equal-width columns,
// and sits at `top: 20px` to match StepCard's 40px badge (see the comment
// on `.cca-step-card__badge` — keep these two in sync).
//
// Each step's card is opaque and stacks above this line (z-index below,
// step column above), so the line only shows through in the gutters
// between cards — it reads as connecting segments rather than a line
// running underneath the cards' content.
//
// Skipped below the 4-up `md` layout: at `sm` (2x2) and mobile (stacked)
// the cards' heights vary with copy length, so a line trying to connect
// them would either misalign or need to span through card bodies. Order is
// still fully conveyed there by the badges themselves plus the underlying
// <ol>/<li> structure.
.cca-how-it-works__grid::before {
  content: '';
  display: none;
  position: absolute;
  top: 20px;
  left: 12.5%;
  right: 12.5%;
  height: 2px;
  background: rgb(var(--v-theme-clay));
  z-index: 0;

  @media (min-width: 960px) {
    display: block;
  }
}

.cca-how-it-works__step {
  position: relative;
  z-index: 1;
}
</style>
