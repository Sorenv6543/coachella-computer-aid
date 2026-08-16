<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import heroImage from '@/assets/images/illustrations/hero/hero-106-senior-center-outdoor.png'

const { t } = useI18n()
</script>

<template>
  <section class="cca-hero" aria-labelledby="cca-hero-heading">
    <v-container class="cca-hero__container">
      <v-row align="center" class="cca-hero__row">
        <v-col cols="12" md="6" order="2" order-md="1" class="cca-hero__text">
          <h1 id="cca-hero-heading" class="cca-hero__headline cca-display">
            {{ t('home.hero.title') }}
          </h1>
          <p class="cca-hero__subheadline">{{ t('home.hero.subtitle') }}</p>
          <p class="cca-hero__body">{{ t('home.hero.body') }}</p>
          <div class="cca-hero__ctas">
            <v-btn
              color="primary"
              variant="flat"
              rounded="8"
              size="large"
              min-height="48"
              class="cca-hero__cta-primary"
            >
              {{ t('home.hero.ctaPrimary') }}
            </v-btn>
            <v-btn
              color="on-surface"
              variant="outlined"
              rounded="8"
              size="large"
              min-height="48"
              class="cca-hero__cta-secondary"
            >
              {{ t('home.hero.ctaSecondary') }}
            </v-btn>
          </div>
        </v-col>

        <v-col cols="12" md="6" order="1" order-md="2" class="cca-hero__media">
          <v-card class="cca-hero__image-card" rounded="lg" elevation="0">
            <v-img
              :src="heroImage"
              :alt="t('home.hero.imageAlt')"
              cover
              aspect-ratio="1.75"
              class="cca-hero__image"
            />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped lang="scss">
.cca-hero {
  background: rgb(var(--v-theme-background));
  padding-block: var(--cca-space-6);

  @media (min-width: 960px) {
    padding-block: var(--cca-space-8);
  }
}

.cca-hero__container {
  max-width: var(--cca-container-max);
}

.cca-hero__text {
  padding-block: var(--cca-space-5);
}

.cca-hero__headline {
  font-size: clamp(36px, 5vw, 48px);
  font-weight: 700;
  line-height: 1.2;
  margin: 0 0 var(--cca-space-3);
  color: rgb(var(--v-theme-on-background));
}

.cca-hero__subheadline {
  font-family: 'Archivo', sans-serif;
  font-weight: 600;
  font-size: clamp(20px, 2.4vw, 28px);
  line-height: 1.4;
  color: rgb(var(--v-theme-on-background));
  margin-bottom: var(--cca-space-3);
}

.cca-hero__body {
  font-size: 16px;
  line-height: 1.6;
  color: rgb(var(--v-theme-on-background));
  max-width: 46ch;
  margin-bottom: var(--cca-space-6);
}

.cca-hero__ctas {
  display: flex;
  flex-wrap: wrap;
  gap: var(--cca-space-4);
}

.cca-hero__cta-secondary {
  border-width: 2px !important;
}

.cca-hero__image-card {
  box-shadow: 0px 20px 46px -22px rgba(var(--v-theme-clay), 0.34) !important;
  overflow: hidden;
}

.cca-hero__image {
  border-radius: inherit;
}
</style>
