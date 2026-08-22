<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Default $0 — the slider starts at "still fully welcome," not at a
// suggested fee, so nobody has to drag it down to ask for free help.
const contribution = ref(0)

const formattedContribution = computed(() => `$${contribution.value}`)

// Full readout text for the slider's live aria-valuetext, e.g. "$40 per
// session" — read aloud by screen readers on every value change without a
// separate aria-live region (see template comment on the v-slider).
const sliderValueText = computed(
  () => `${formattedContribution.value} ${t('home.payWhatYouCan.perSessionLabel')}`,
)

// Cool-to-warm progression as the pledge grows: sky -> sage -> clay. Only
// tokens whose *-darken-1 (or clay, already the darkest orange-family token)
// variant clears the 3:1 WCAG 1.4.11 non-text-contrast floor against this
// section's white surface are used here — the lighter base tokens
// (secondary/sage/primary) measure ~2.1-2.5:1 and would make the thumb
// nearly invisible, especially at $0 which is what every visitor sees on
// load. This is supplementary reinforcement only — the numeric readout
// below is fixed charcoal and is the actual source of truth for the value,
// so no information is conveyed by color alone (WCAG 1.4.1). Token names
// match vuetify.ts's theme.colors exactly, since they're reused directly in
// both the v-slider `color` prop and the readout's inline style below.
const sliderColor = computed(() => {
  if (contribution.value < 25) return 'sky-darken-1'
  if (contribution.value < 50) return 'sage-darken-1'
  return 'clay'
})
</script>

<template>
  <section class="cca-pay-what-you-can" aria-labelledby="cca-pay-what-you-can-heading">
    <v-container class="cca-pay-what-you-can__container">
      <div class="cca-pay-what-you-can__col">
        <h2 id="cca-pay-what-you-can-heading" class="cca-pay-what-you-can__headline cca-display">
          {{ t('home.payWhatYouCan.title') }}
        </h2>
        <p class="cca-pay-what-you-can__subheading">{{ t('home.payWhatYouCan.subheading') }}</p>
        <p class="cca-pay-what-you-can__intro">{{ t('home.payWhatYouCan.intro') }}</p>

        <div class="cca-pay-what-you-can__slider-block">
          <!-- Purely visual for sighted users — hidden from the a11y tree
          since it would otherwise double-announce alongside the v-slider's
          own aria-valuetext below (native slider value announcements fire
          on every keypress independent of any aria-live region here, and
          during a pointer drag the model value — and so this div — updates
          continuously, not just on release). The full "$40 per session"
          phrase lives once, on the slider itself, as the actual source of
          truth for assistive tech. -->
          <div
            class="cca-pay-what-you-can__readout"
            :style="{
              borderColor: `rgb(var(--v-theme-${sliderColor}))`,
              backgroundColor: `rgba(var(--v-theme-${sliderColor}), 0.12)`,
            }"
            aria-hidden="true"
          >
            <span class="cca-pay-what-you-can__readout-amount">{{ formattedContribution }}</span>
            <span class="cca-pay-what-you-can__readout-label">
              {{ t('home.payWhatYouCan.perSessionLabel') }}
            </span>
          </div>

          <!-- thumb-label (not "always"): the floating value bubble only
          shows while actively dragging/focused, so it never sits rendered
          at the same time as static page chrome above — avoiding any
          overlap with the readout pill 24px above the track edge. It's a
          bonus for sighted pointer/keyboard users tracking the thumb
          without shifting gaze to the pill; aria-valuetext below is the
          source of truth for assistive tech. -->
          <v-slider
            v-model="contribution"
            :min="0"
            :max="75"
            :step="1"
            :color="sliderColor"
            :track-fill-color="sliderColor"
            thumb-label
            hide-details
            :aria-label="t('home.payWhatYouCan.sliderAriaLabel')"
            :aria-valuetext="sliderValueText"
            class="cca-pay-what-you-can__slider"
          >
            <template #thumb-label="{ modelValue }"> ${{ modelValue }} </template>
          </v-slider>
        </div>

        <p class="cca-pay-what-you-can__supporting">{{ t('home.payWhatYouCan.supportingText') }}</p>
      </div>
    </v-container>
  </section>
</template>

<style scoped lang="scss">
// White surface background — this section sits between HowItWorks (cream)
// and CTA (orange), so `surface` is what keeps it visually distinct from
// the cream section directly above it in the page flow.
.cca-pay-what-you-can {
  background: rgb(var(--v-theme-surface));
  padding-block: var(--cca-space-6);

  @media (min-width: 960px) {
    padding-block: var(--cca-space-8);
  }
}

.cca-pay-what-you-can__container {
  max-width: var(--cca-container-max);
}

.cca-pay-what-you-can__col {
  max-width: 700px;
  margin-inline: auto;
  text-align: center;
}

// Spec calls for a flat orange (36px/700) headline, but literal primary
// orange (#F4A259) on this section's white surface measures ~2.07:1 —
// far under WCAG AA's 3:1 floor for large text, let alone 4.5:1. Clay
// (#B95E23), already a registered theme token, measures ~4.5:1 here, which
// clears the 3:1 large-text threshold this 36px/700 headline qualifies for
// (though not the stricter 4.5:1 normal-text minimum — don't reuse this
// color at body-copy sizes). Same non-negotiable-contrast reasoning
// CTASection documents for its own primary/on-primary swap.
.cca-pay-what-you-can__headline {
  font-size: clamp(28px, 4vw, 36px);
  font-weight: 700;
  line-height: 1.3;
  color: rgb(var(--v-theme-clay));
  margin: 0 0 var(--cca-space-3);
}

.cca-pay-what-you-can__subheading {
  font-size: 18px;
  font-weight: 600;
  line-height: 1.4;
  color: rgb(var(--v-theme-on-surface));
  margin: 0 0 var(--cca-space-4);
}

.cca-pay-what-you-can__intro {
  font-size: 16px;
  line-height: 1.6;
  color: rgb(var(--v-theme-on-surface));
  max-width: 55ch;
  margin: 0 auto var(--cca-space-6);
}

.cca-pay-what-you-can__slider-block {
  margin-bottom: var(--cca-space-6);
}

.cca-pay-what-you-can__readout {
  display: inline-flex;
  align-items: baseline;
  gap: var(--cca-space-2);
  padding: var(--cca-space-3) var(--cca-space-5);
  border: 2px solid;
  border-radius: 999px;
  margin-bottom: var(--cca-space-5);
  transition:
    border-color 0.25s ease,
    background-color 0.25s ease;
}

.cca-pay-what-you-can__readout-amount {
  // Text color is fixed charcoal regardless of sliderColor — kept
  // independent so the color shift is purely decorative reinforcement
  // (readout border/fill and slider track, see sliderColor comment in the
  // script block) and never the sole carrier of the value (WCAG 1.4.1).
  font-size: clamp(28px, 4vw, 32px);
  font-weight: 700;
  line-height: 1.2;
  color: rgb(var(--v-theme-on-surface));
}

.cca-pay-what-you-can__readout-label {
  font-size: 16px;
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
}

.cca-pay-what-you-can__slider {
  max-width: 480px;
  margin-inline: auto;

  // Vuetify's built-in invisible touch target on the thumb defaults to
  // 42px (see VSliderThumb's $slider-thumb-touch-size) — 6px short of this
  // app's 48x48px minimum touch target for elderly/low-dexterity users.
  // Scoped styles are unlayered and Vuetify's own component CSS is
  // @layer'd, so this plain override wins the cascade without touching the
  // visible thumb size. Same pattern as main.scss's focus-ring override.
  :deep(.v-slider-thumb__surface::after) {
    width: 48px;
    height: 48px;
  }

  // Vuetify's default keyboard focus signal is a ~12%-opacity currentColor
  // halo (`.v-slider-thumb--focused .v-slider-thumb__surface::before`) —
  // too faint to locate reliably, especially layered on the thumb's own
  // fill color. Same unlayered-beats-`@layer`'d-component-CSS pattern as
  // the touch-target override above and main.scss's button/list-item
  // focus rings: a solid, high-contrast ring independent of sliderColor.
  :deep(.v-slider-thumb:focus-visible) {
    outline: 3px solid rgb(var(--v-theme-on-surface));
    outline-offset: 3px;
    border-radius: 50%;
  }

  // Vuetify's default thumb-label (the "$X" bubble shown while dragging)
  // colors itself from the theme's surface-variant/on-surface-variant
  // pair, which this app's vuetify.ts never overrides — so it silently
  // inherits Vuetify's stock light-preset values (#424242 / #EEEEEE),
  // which composite to ~3.65:1 against this section's background, below
  // the 4.5:1 this ~11px text needs. Fixed charcoal-on-white instead,
  // independent of sliderColor, verified ~12.45:1.
  :deep(.v-slider-thumb__label) {
    background: rgb(var(--v-theme-on-surface));
    color: rgb(var(--v-theme-surface));
  }
}

.cca-pay-what-you-can__supporting {
  font-size: 16px;
  line-height: 1.6;
  color: rgb(var(--v-theme-on-surface));
  max-width: 55ch;
  margin: 0 auto;
}
</style>
