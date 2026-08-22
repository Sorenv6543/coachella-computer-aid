<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AudienceCard from './AudienceCard.vue'
import seniorsImage from '@/assets/images/illustrations/ui/ui-804-audience-seniors-badge.webp'
import disabilitiesImage from '@/assets/images/illustrations/ui/ui-805-audience-disabilities-badge.webp'
import spanishSpeakingFamiliesImage from '@/assets/images/illustrations/ui/ui-806-audience-immigrant-families-badge.webp'
import veteransImage from '@/assets/images/illustrations/ui/ui-807-audience-veterans-badge.webp'
import lowIncomeFamiliesImage from '@/assets/images/illustrations/ui/ui-808-audience-low-income-families-badge.webp'
import everyoneImage from '@/assets/images/illustrations/ui/ui-809-audience-everyone-badge.webp'

const { t } = useI18n()

const audiences = computed(() => [
  { key: 'seniors', image: seniorsImage },
  { key: 'disabilities', image: disabilitiesImage },
  { key: 'spanishSpeakingFamilies', image: spanishSpeakingFamiliesImage },
  { key: 'veterans', image: veteransImage },
  { key: 'lowIncomeFamilies', image: lowIncomeFamiliesImage },
  { key: 'everyone', image: everyoneImage },
])
</script>

<template>
  <section class="cca-who-we-help" aria-labelledby="cca-who-we-help-heading">
    <v-container class="cca-who-we-help__container">
      <div class="cca-who-we-help__intro">
        <h2 id="cca-who-we-help-heading" class="cca-who-we-help__headline cca-display">
          {{ t('home.whoWeHelp.title') }}
        </h2>
        <p class="cca-who-we-help__lead">{{ t('home.whoWeHelp.intro') }}</p>
      </div>

      <v-row class="cca-who-we-help__grid">
        <v-col v-for="audience in audiences" :key="audience.key" cols="12" sm="6" md="4">
          <AudienceCard
            :image-src="audience.image"
            :title="t(`home.whoWeHelp.audiences.${audience.key}.title`)"
            :description="t(`home.whoWeHelp.audiences.${audience.key}.description`)"
          />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped lang="scss">
.cca-who-we-help {
  background: rgb(var(--v-theme-background));
  padding-block: var(--cca-space-6);

  @media (min-width: 960px) {
    padding-block: var(--cca-space-8);
  }
}

.cca-who-we-help__container {
  max-width: var(--cca-container-max);
}

.cca-who-we-help__intro {
  max-width: 720px;
  margin: 0 auto var(--cca-space-6);
  text-align: center;
}

.cca-who-we-help__headline {
  font-size: clamp(28px, 4vw, 36px);
  font-weight: 700;
  line-height: 1.3;
  color: rgb(var(--v-theme-on-background));
  margin: 0 0 var(--cca-space-3);
}

.cca-who-we-help__lead {
  font-size: 16px;
  line-height: 1.6;
  color: rgb(var(--v-theme-on-background));
  margin: 0;
}
</style>
