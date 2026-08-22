<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import missionImage from '@/assets/images/illustrations/characters/all-017-full-cast-group.webp'

const { t } = useI18n()
</script>

<template>
  <section class="cca-mission" aria-labelledby="cca-mission-heading">
    <v-container class="cca-mission__container">
      <v-row justify="center">
        <v-col cols="12" md="10" lg="8" class="cca-mission__col">
          <h2 id="cca-mission-heading" class="cca-mission__headline cca-display">
            {{ t('home.mission.title') }}
          </h2>

          <v-card class="cca-mission__image-card" rounded="lg" elevation="0">
            <v-img
              :src="missionImage"
              :alt="t('home.mission.imageAlt')"
              aspect-ratio="1.6"
              class="cca-mission__image"
            />
          </v-card>

          <blockquote class="cca-mission__quote">
            {{ t('home.mission.quote') }}
          </blockquote>

          <p class="cca-mission__body">
            {{ t('home.mission.body') }}
          </p>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped lang="scss">
.cca-mission {
  background: rgb(var(--v-theme-background));
  padding-block: var(--cca-space-6);

  @media (min-width: 960px) {
    padding-block: var(--cca-space-8);
  }
}

.cca-mission__container {
  max-width: var(--cca-container-max);
}

.cca-mission__col {
  max-width: 800px;
  margin-inline: auto;
  text-align: center;
}

.cca-mission__headline {
  font-size: clamp(28px, 4vw, 36px);
  font-weight: 700;
  line-height: 1.3;
  color: rgb(var(--v-theme-on-background));
  margin: 0 0 var(--cca-space-6);
}

.cca-mission__image-card {
  box-shadow: 0px 20px 46px -22px rgba(var(--v-theme-clay), 0.34) !important;
  overflow: hidden;
  margin-bottom: var(--cca-space-6);
}

.cca-mission__image {
  border-radius: inherit;
}

.cca-mission__quote {
  font-style: italic;
  font-size: 20px;
  line-height: 1.5;
  font-weight: 600;
  color: rgb(var(--v-theme-on-background));
  border-inline-start: 4px solid rgb(var(--v-theme-clay));
  padding-inline-start: var(--cca-space-5);
  margin: 0 0 var(--cca-space-6);
  text-align: start;
}

.cca-mission__body {
  font-size: 16px;
  line-height: 1.6;
  color: rgb(var(--v-theme-on-background));
  max-width: 65ch;
  margin-inline: auto;
}
</style>
