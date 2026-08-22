<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Same real contact info as AppFooter.vue — reused literally (not wired
// through a shared config) since this is the only other place it appears.
const phoneDigits = '17604067770'
const email = 'help@coachellacomputeraid.com'
</script>

<template>
  <section class="cca-stay-informed" aria-labelledby="cca-stay-informed-heading">
    <v-container class="cca-stay-informed__container">
      <div class="cca-stay-informed__col">
        <h2 id="cca-stay-informed-heading" class="cca-stay-informed__headline cca-display">
          {{ t('home.stayInformed.title') }}
        </h2>
        <p class="cca-stay-informed__coming-soon">{{ t('home.stayInformed.comingSoon') }}</p>
        <p class="cca-stay-informed__body">{{ t('home.stayInformed.body') }}</p>

        <div class="cca-stay-informed__contact">
          <v-btn
            :href="`tel:+${phoneDigits}`"
            color="primary"
            variant="flat"
            rounded="8"
            size="large"
            min-height="48"
            class="cca-stay-informed__contact-btn"
          >
            {{ t('home.stayInformed.phoneCta') }}
          </v-btn>
          <v-btn
            :href="`mailto:${email}`"
            color="on-surface"
            variant="outlined"
            rounded="8"
            size="large"
            min-height="48"
            class="cca-stay-informed__contact-btn"
          >
            {{ t('home.stayInformed.emailCta', { email }) }}
          </v-btn>
        </div>
      </div>
    </v-container>
  </section>
</template>

<style scoped lang="scss">
// White/surface background — this section sits between CommunityWorkshops
// (cream/background token) above and CTA (orange/primary token) below, so
// surface keeps the cream -> white -> orange alternation the rest of the
// homepage sections follow, same rationale PayWhatYouCanSection documents
// for its own placement between two non-white sections.
.cca-stay-informed {
  background: rgb(var(--v-theme-surface));
  padding-block: var(--cca-space-6);

  @media (min-width: 960px) {
    padding-block: var(--cca-space-8);
  }
}

.cca-stay-informed__container {
  max-width: var(--cca-container-max);
}

.cca-stay-informed__col {
  max-width: 700px;
  margin-inline: auto;
  text-align: center;
}

.cca-stay-informed__headline {
  font-size: clamp(28px, 4vw, 36px);
  font-weight: 700;
  line-height: 1.3;
  color: rgb(var(--v-theme-on-surface));
  margin: 0 0 var(--cca-space-3);
}

.cca-stay-informed__coming-soon {
  font-size: 18px;
  font-weight: 600;
  line-height: 1.4;
  color: rgb(var(--v-theme-on-surface));
  margin: 0 0 var(--cca-space-4);
}

.cca-stay-informed__body {
  font-size: 16px;
  line-height: 1.6;
  color: rgb(var(--v-theme-on-surface));
  max-width: 55ch;
  margin: 0 auto var(--cca-space-6);
}

.cca-stay-informed__contact {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--cca-space-4);
}

// Matches HeroSection's outlined-button treatment: default outlined-variant
// border width reads too thin at this size to reliably clear WCAG 1.4.11's
// 3:1 non-text contrast floor.
.cca-stay-informed__contact-btn.v-btn--variant-outlined {
  border-width: 2px !important;
}
</style>
