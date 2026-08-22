<script setup lang="ts">
defineProps<{
  imageSrc?: string
  title: string
  description: string
}>()
</script>

<template>
  <v-card class="cca-service-card" rounded="12" elevation="0">
    <v-img
      v-if="imageSrc"
      :src="imageSrc"
      alt=""
      aria-hidden="true"
      cover
      aspect-ratio="1.37"
      class="cca-service-card__image"
    />
    <div
      v-else
      class="cca-service-card__image cca-service-card__image--placeholder"
      aria-hidden="true"
    >
      <v-icon
        icon="mdi-calendar-check-outline"
        size="40"
        class="cca-service-card__placeholder-icon"
      />
    </div>
    <div class="cca-service-card__body">
      <h3 class="cca-service-card__title">{{ title }}</h3>
      <p class="cca-service-card__description">{{ description }}</p>
    </div>
  </v-card>
</template>

<style scoped lang="scss">
// Mirrors AudienceCard.vue's card spec exactly: clay border (sand measures
// ~1.1-1.2:1 and is effectively invisible — see Design-Language.md's Cards
// section for the full rationale), 16px body text floor for CCA's
// older/low-vision audience.
.cca-service-card {
  background: rgb(var(--v-theme-surface));
  border: 1px solid rgb(var(--v-theme-clay));
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.08) !important;
  overflow: hidden;
  height: 100%;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.12) !important;
  }
}

.cca-service-card__image {
  border-radius: inherit;
}

.cca-service-card__image--placeholder {
  aspect-ratio: 1.37;
  background: rgb(var(--v-theme-sand));
  display: flex;
  align-items: center;
  justify-content: center;
}

// Sand-on-white is ~1.2:1 (see the border rationale above) — a bare fill
// would look broken rather than "art coming soon," so the icon carries a
// clay-on-sand pairing (3.76:1, clears the 3:1 non-text minimum) as the
// actual visual cue.
.cca-service-card__placeholder-icon {
  color: rgb(var(--v-theme-clay));
}

.cca-service-card__body {
  padding: var(--cca-space-5);
}

.cca-service-card__title {
  font-size: 20px;
  font-weight: 700;
  line-height: 1.4;
  color: rgb(var(--v-theme-on-surface));
  margin: 0 0 var(--cca-space-3);
}

.cca-service-card__description {
  font-size: 16px;
  line-height: 1.6;
  color: rgb(var(--v-theme-on-surface));
  margin: 0;
}
</style>
