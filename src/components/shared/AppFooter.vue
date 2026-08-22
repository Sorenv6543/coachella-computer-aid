<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import logoMark from '@/assets/images/illustrations/icon/icon-960-cca-logo-mark.webp'
import mountainStrip from '@/assets/images/illustrations/ui/ui-839-footer-mountain-strip.webp'
import { navLinks } from '@/config/navLinks'

const { t } = useI18n()

const currentYear = computed(() => new Date().getFullYear())

const phoneDigits = '17604067770'
const phoneDisplay = '(760) 406-7770'
const email = 'help@coachellacomputeraid.com'
</script>

<template>
  <footer class="cca-footer" :aria-label="t('footer.ariaLabel')">
    <img :src="mountainStrip" alt="" aria-hidden="true" class="cca-footer__strip" />

    <v-container class="cca-footer__container">
      <div class="cca-footer__grid">
        <div class="cca-footer__col cca-footer__col--about">
          <div class="cca-footer__brand">
            <v-avatar size="40" color="sand" class="cca-footer__logo">
              <v-img :src="logoMark" alt="" cover />
            </v-avatar>
            <span class="cca-footer__wordmark cca-display">{{ t('nav.brand') }}</span>
          </div>
          <p class="cca-footer__tagline">{{ t('footer.about.tagline') }}</p>
        </div>

        <nav class="cca-footer__col" :aria-label="t('footer.quickLinksHeading')">
          <h2 class="cca-footer__heading">{{ t('footer.quickLinksHeading') }}</h2>
          <ul class="cca-footer__links">
            <li v-for="link in navLinks" :key="link.key">
              <router-link v-if="link.href" :to="link.href" class="cca-footer__link">
                {{ t(link.key) }}
              </router-link>
              <span v-else class="cca-footer__link cca-footer__link--disabled" aria-disabled="true">
                {{ t(link.key) }}
                <span class="cca-footer__link-note">{{ t('footer.comingSoon') }}</span>
              </span>
            </li>
          </ul>
        </nav>

        <div class="cca-footer__col">
          <h2 class="cca-footer__heading">{{ t('footer.contactHeading') }}</h2>
          <ul class="cca-footer__contact-list">
            <li>
              <a :href="`tel:+${phoneDigits}`" class="cca-footer__link">{{ phoneDisplay }}</a>
            </li>
            <li>
              <a :href="`mailto:${email}`" class="cca-footer__link">{{ email }}</a>
            </li>
            <li class="cca-footer__location">{{ t('footer.location') }}</li>
          </ul>
          <!-- Only "/" is a route today (src/router/index.ts) and this footer
               is global, so the anchor always resolves — revisit once a
               second route ships, since a bare "#cca-cta-heading" hash would
               silently no-op off the homepage. -->
          <v-btn
            href="#cca-cta-heading"
            color="surface"
            variant="flat"
            rounded="8"
            min-height="48"
            class="cca-footer__cta"
          >
            {{ t('nav.cta') }}
          </v-btn>
        </div>
      </div>

      <div class="cca-footer__legal">
        {{ t('footer.copyright', { year: currentYear }) }}
      </div>
    </v-container>
  </footer>
</template>

<style scoped lang="scss">
.cca-footer {
  position: relative;
  background: rgb(var(--v-theme-on-surface));
}

.cca-footer__strip {
  display: block;
  width: 100%;
  // The source art (ui-839) is a full 1184x864 landscape illustration (sky,
  // cloud, sun, mountains), not a literal thin banner — a short bar height
  // with object-fit: cover crops it down to a razor-thin, illegible sliver.
  // Anchoring to the bottom and giving it real height keeps the mountain
  // silhouette + sun recognizable as it meets the footer. Sits flush against
  // the section above (no footer padding here) so there's no charcoal gap
  // between the previous section and the start of the illustration.
  height: clamp(120px, 18vw, 240px);
  object-fit: cover;
  object-position: center bottom;
}

.cca-footer__container {
  max-width: var(--cca-container-max);
  padding-block: var(--cca-space-6) var(--cca-space-5);

  @media (min-width: 960px) {
    padding-block: var(--cca-space-8) var(--cca-space-5);
  }
}

.cca-footer__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--cca-space-6);

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 960px) {
    grid-template-columns: 2fr 1fr 1fr;
  }
}

.cca-footer__col {
  display: flex;
  flex-direction: column;
  gap: var(--cca-space-3);
}

.cca-footer__brand {
  display: flex;
  align-items: center;
  gap: var(--cca-space-3);
}

.cca-footer__wordmark {
  font-weight: 700;
  font-size: 20px;
  // Cream, not on-surface — this section's background IS on-surface
  // (charcoal), so text needs the light color instead (~14.9:1 contrast).
  color: rgb(var(--v-theme-background));
}

.cca-footer__tagline {
  font-size: 16px;
  line-height: 1.6;
  color: rgb(var(--v-theme-background));
  max-width: 40ch;
  margin: 0;
}

.cca-footer__heading {
  font-size: 18px;
  font-weight: 700;
  color: rgb(var(--v-theme-background));
  margin: 0;
}

.cca-footer__links,
.cca-footer__contact-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--cca-space-2);
}

.cca-footer__link {
  display: inline-flex;
  align-items: center;
  gap: var(--cca-space-2);
  min-height: 48px;
  padding-inline: var(--cca-space-2);
  margin-inline-start: calc(-1 * var(--cca-space-2));
  font-size: 16px;
  font-weight: 600;
  color: rgb(var(--v-theme-background));
  text-decoration: none;
  border-bottom: 2px solid transparent;
  width: fit-content;

  &:hover,
  &:focus-visible {
    border-bottom-color: rgb(var(--v-theme-primary));
  }
}

.cca-footer__link--disabled {
  opacity: 0.5;
  cursor: default;
  pointer-events: none;
}

// Text cue, not color/opacity alone, so the "not a real link yet" state
// reads for low-vision users too — see accessibility audit warning 2.
.cca-footer__link-note {
  font-size: 14px;
  font-weight: 400;
  font-style: italic;
}

.cca-footer__location {
  font-size: 16px;
  color: rgb(var(--v-theme-background));
  opacity: 0.85;
}

.cca-footer__cta {
  align-self: flex-start;
  margin-top: var(--cca-space-2);
  font-weight: 700;
  // Charcoal text on the light "surface" fill — matches the on-primary
  // contrast fix already applied to Navbar/Hero/CTA buttons rather than
  // white text on white, which would be invisible.
  color: rgb(var(--v-theme-on-surface));
}

.cca-footer__legal {
  margin-top: var(--cca-space-6);
  padding-top: var(--cca-space-4);
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  font-size: 14px;
  color: rgb(var(--v-theme-background));
  opacity: 0.75;
  text-align: center;
}
</style>
