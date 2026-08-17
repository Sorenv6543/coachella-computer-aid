<script setup lang="ts">
withDefaults(
  defineProps<{
    stepNumber: number
    imageSrc: string
    title: string
    description: string
  }>(),
  {},
)
</script>

<template>
  <div class="cca-step-card">
    <!-- Decorative — the step's position is already conveyed to assistive
    tech by the <ol>/<li> the parent section wraps these cards in, so the
    number badge itself is hidden from the accessibility tree to avoid
    announcing it twice. -->
    <div class="cca-step-card__badge" aria-hidden="true">{{ stepNumber }}</div>

    <v-card class="cca-step-card__card" rounded="12" elevation="0">
      <v-img
        :src="imageSrc"
        alt=""
        aria-hidden="true"
        cover
        aspect-ratio="1.37"
        class="cca-step-card__image"
      />
      <div class="cca-step-card__body">
        <h3 class="cca-step-card__title">{{ title }}</h3>
        <p class="cca-step-card__description">{{ description }}</p>
      </div>
    </v-card>
  </div>
</template>

<style scoped lang="scss">
.cca-step-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

// Badge is 40px tall with no top margin, so its vertical center sits exactly
// 20px below the column's top edge — HowItWorksSection's connector line
// relies on that fixed 20px offset to line up with every badge. Change
// height/margin here and update the `top` value on
// `.cca-how-it-works__grid::before` in HowItWorksSection.vue together.
.cca-step-card__badge {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  // Orange bg + charcoal text (~6:1), not white (~2.07:1, fails WCAG AA) —
  // same on-primary reasoning documented in vuetify.ts for buttons.
  background: rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-on-primary));
  font-size: 18px;
  font-weight: 700;
  line-height: 1;
  margin-bottom: var(--cca-space-4);
}

// Mirrors ServiceCard.vue's card spec exactly: clay border (sand measures
// ~1.1-1.2:1 and is effectively invisible), 16px body text floor.
.cca-step-card__card {
  width: 100%;
  flex: 1 1 auto;
  background: rgb(var(--v-theme-surface));
  border: 1px solid rgb(var(--v-theme-clay));
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.08) !important;
  overflow: hidden;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.12) !important;
  }
}

.cca-step-card__image {
  border-radius: inherit;
}

.cca-step-card__body {
  padding: var(--cca-space-5);
}

.cca-step-card__title {
  font-size: 20px;
  font-weight: 700;
  line-height: 1.4;
  color: rgb(var(--v-theme-on-surface));
  margin: 0 0 var(--cca-space-3);
}

.cca-step-card__description {
  font-size: 16px;
  line-height: 1.6;
  color: rgb(var(--v-theme-on-surface));
  margin: 0;
}
</style>
