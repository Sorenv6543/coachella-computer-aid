<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import ServiceCard from './ServiceCard.vue'
import stayConnectedImage from '@/assets/images/illustrations/ui/ui-810-services-stay-connected-card.webp'
import staySafeImage from '@/assets/images/illustrations/ui/ui-811-services-stay-safe-card.webp'
import learnImage from '@/assets/images/illustrations/ui/ui-812-services-learn-card.webp'
import repairImage from '@/assets/images/illustrations/ui/ui-813-services-repair-card.webp'
import getConnectedImage from '@/assets/images/illustrations/ui/ui-814-services-wi-fi-card.webp'

const { t } = useI18n()

// 6 core services per Homepage/Sections.md. "Additional Services" (remote
// assistance, workshops, internet access resources) are out of scope for
// this section — ui-815 (remote) is left for a future section rather than
// expanded into here. "navigateOnline" has no illustration yet (catalog
// #841, planned) so it renders ServiceCard's placeholder block.
const services = computed(() => [
  { key: 'learn', image: learnImage },
  { key: 'stayConnected', image: stayConnectedImage },
  { key: 'getConnected', image: getConnectedImage },
  { key: 'staySafe', image: staySafeImage },
  { key: 'deviceSupport', image: repairImage },
  { key: 'navigateOnline', image: undefined },
])
</script>

<template>
  <section class="cca-services" aria-labelledby="cca-services-heading">
    <v-container class="cca-services__container">
      <div class="cca-services__intro">
        <h2 id="cca-services-heading" class="cca-services__headline cca-display">
          {{ t('home.services.title') }}
        </h2>
        <p class="cca-services__lead">{{ t('home.services.intro') }}</p>
      </div>

      <v-row class="cca-services__grid">
        <v-col v-for="service in services" :key="service.key" cols="12" sm="6" md="4">
          <ServiceCard
            :image-src="service.image"
            :title="t(`home.services.items.${service.key}.title`)"
            :description="t(`home.services.items.${service.key}.description`)"
          />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped lang="scss">
.cca-services {
  // Cream background (not surface/white) so the card's white surface, clay
  // border, and shadow all stay visible — matches WhoWeHelpSection.
  background: rgb(var(--v-theme-background));
  padding-block: var(--cca-space-6);

  @media (min-width: 960px) {
    padding-block: var(--cca-space-8);
  }
}

.cca-services__container {
  max-width: var(--cca-container-max);
}

.cca-services__intro {
  max-width: 720px;
  margin: 0 auto var(--cca-space-6);
  text-align: center;
}

.cca-services__headline {
  font-size: clamp(28px, 4vw, 36px);
  font-weight: 700;
  line-height: 1.3;
  color: rgb(var(--v-theme-on-background));
  margin: 0 0 var(--cca-space-3);
}

.cca-services__lead {
  font-size: 16px;
  line-height: 1.6;
  color: rgb(var(--v-theme-on-background));
  margin: 0;
}
</style>
