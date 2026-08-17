<script setup lang="ts">
withDefaults(
  defineProps<{
    imageSrc: string
    title: string
    description: string
  }>(),
  {},
)
</script>

<template>
  <v-card class="cca-audience-card" rounded="12" elevation="0">
    <v-img
      :src="imageSrc"
      alt=""
      aria-hidden="true"
      cover
      aspect-ratio="1.37"
      class="cca-audience-card__image"
    />
    <div class="cca-audience-card__body">
      <h3 class="cca-audience-card__title">{{ title }}</h3>
      <p class="cca-audience-card__description">{{ description }}</p>
    </div>
  </v-card>
</template>

<style scoped lang="scss">
// Card spec per Design-Language.md calls for a 1px sand border, but sand
// measures ~1.1-1.2:1 against both the white card and cream page background
// — effectively invisible. Clay measures 4.48:1 on white, clearing the 3:1
// non-text UI minimum with room to spare, so card boundaries stay
// perceptible for low-vision users instead of relying solely on a faint
// shadow.
.cca-audience-card {
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

.cca-audience-card__image {
  border-radius: inherit;
}

.cca-audience-card__body {
  padding: var(--cca-space-5);
}

.cca-audience-card__title {
  font-size: 20px;
  font-weight: 700;
  line-height: 1.4;
  color: rgb(var(--v-theme-on-surface));
  margin: 0 0 var(--cca-space-3);
}

.cca-audience-card__description {
  // Card descriptions are supporting body copy, not captions — kept at the
  // 16px body-text floor rather than the 14px the section spec suggests, so
  // it stays readable for CCA's older/low-vision audience.
  font-size: 16px;
  line-height: 1.6;
  color: rgb(var(--v-theme-on-surface));
  margin: 0;
}
</style>
