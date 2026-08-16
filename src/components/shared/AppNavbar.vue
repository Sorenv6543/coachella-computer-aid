<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import logoMark from '@/assets/images/illustrations/icon/icon-960-cca-logo-mark.png'

const { t, locale } = useI18n()

const drawerOpen = ref(false)
const navToggleRef = ref<{ $el: HTMLElement }>()

const menuToggleLabel = computed(() =>
  drawerOpen.value ? t('nav.menuClose') : t('nav.menuToggle'),
)

// Only "/" is a registered route today (see src/router/index.ts). The rest
// are placeholders for pages that don't exist yet — flagged in the PR/report
// so they get wired up (or swapped for router `to` targets) as those pages
// land.
const navLinks = [
  { key: 'nav.links.home', href: '/' },
  { key: 'nav.links.services', href: '#services' },
  { key: 'nav.links.workshops', href: '#workshops' },
  { key: 'nav.links.resources', href: '#resources' },
  { key: 'nav.links.community', href: '#community' },
  { key: 'nav.links.contact', href: '#contact' },
]

const toggleLabel = computed(() => t('common.toggleLanguage'))

function toggleLocale() {
  locale.value = locale.value === 'en' ? 'es' : 'en'
}

function closeDrawer() {
  drawerOpen.value = false
  navToggleRef.value?.$el?.focus()
}
</script>

<template>
  <v-app-bar color="surface" height="76" flat class="cca-navbar" :elevation="0">
    <v-container class="cca-navbar__inner d-flex align-center">
      <router-link to="/" class="cca-navbar__brand" :aria-label="t('nav.brandAriaLabel')">
        <v-avatar size="40" color="sand" class="cca-navbar__logo">
          <v-img :src="logoMark" alt="" cover />
        </v-avatar>
        <span class="cca-navbar__wordmark cca-display">{{ t('nav.brand') }}</span>
      </router-link>

      <nav class="cca-navbar__links d-none d-md-flex" :aria-label="t('nav.ariaLabel')">
        <template v-for="link in navLinks" :key="link.key">
          <router-link v-if="link.href.startsWith('/')" :to="link.href" class="cca-navbar__link">
            {{ t(link.key) }}
          </router-link>
          <a v-else :href="link.href" class="cca-navbar__link">
            {{ t(link.key) }}
          </a>
        </template>
      </nav>

      <div class="cca-navbar__actions">
        <v-btn
          variant="text"
          color="on-surface"
          min-height="48"
          class="cca-navbar__lang-toggle"
          :aria-label="t('common.toggleLanguageAriaLabel')"
          @click="toggleLocale"
        >
          {{ toggleLabel }}
        </v-btn>

        <v-btn
          color="primary"
          variant="flat"
          rounded="8"
          min-height="48"
          href="#get-help"
          class="cca-navbar__cta d-none d-md-inline-flex"
        >
          {{ t('nav.cta') }}
        </v-btn>

        <v-app-bar-nav-icon
          ref="navToggleRef"
          class="cca-navbar__toggle d-md-none"
          :aria-label="menuToggleLabel"
          aria-controls="cca-mobile-drawer"
          :aria-expanded="drawerOpen"
          @click="drawerOpen = !drawerOpen"
        />
      </div>
    </v-container>
  </v-app-bar>

  <v-navigation-drawer
    id="cca-mobile-drawer"
    v-model="drawerOpen"
    location="end"
    temporary
    capture-focus
    retain-focus
    width="300"
    class="cca-navbar__drawer d-md-none"
    :aria-label="t('nav.ariaLabel')"
    @keydown.esc="closeDrawer"
  >
    <v-list nav class="py-4">
      <v-list-item
        v-for="link in navLinks"
        :key="link.key"
        :to="link.href.startsWith('/') ? link.href : undefined"
        :href="link.href.startsWith('/') ? undefined : link.href"
        min-height="48"
        class="cca-navbar__drawer-link"
        @click="closeDrawer"
      >
        {{ t(link.key) }}
      </v-list-item>
    </v-list>

    <div class="cca-navbar__drawer-cta pa-4">
      <v-btn
        color="primary"
        variant="flat"
        rounded="8"
        min-height="48"
        block
        href="#get-help"
        @click="closeDrawer"
      >
        {{ t('nav.cta') }}
      </v-btn>
    </div>
  </v-navigation-drawer>
</template>

<style scoped lang="scss">
.cca-navbar {
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.08) !important;
}

.cca-navbar__inner {
  max-width: var(--cca-container-max);
  gap: var(--cca-space-5);
}

.cca-navbar__brand {
  display: flex;
  align-items: center;
  gap: var(--cca-space-3);
  text-decoration: none;
  min-height: 48px;
}

.cca-navbar__wordmark {
  font-weight: 700;
  font-size: 20px;
  color: rgb(var(--v-theme-on-surface));
  white-space: nowrap;
}

.cca-navbar__links {
  flex: 1 1 auto;
  justify-content: center;
  align-items: center;
  gap: var(--cca-space-6);
  margin: 0 var(--cca-space-5);
}

.cca-navbar__link {
  display: inline-flex;
  align-items: center;
  min-height: 48px;
  font-weight: 600;
  font-size: 16px;
  color: rgb(var(--v-theme-on-surface));
  text-decoration: none;
  border-bottom: 2px solid transparent;
  padding: 0 var(--cca-space-1);

  // Clay, not primary orange: orange-on-white/cream measures 2.07:1, failing
  // WCAG 1.4.11's 3:1 minimum for non-text UI indicators. Clay measures
  // 4.48:1 (white) / 4.17:1 (cream), both passing.
  &:hover,
  &:focus-visible {
    border-bottom-color: rgb(var(--v-theme-clay));
  }
}

// Only the underline changes color on the active link (per Sections.md) —
// primary orange text on the white/cream navbar surface fails the 4.5:1
// contrast minimum, so text stays on-surface (charcoal). Clay is used
// instead of primary for the same reason as the hover/focus rule above.
.cca-navbar__link.router-link-exact-active {
  border-bottom-color: rgb(var(--v-theme-clay));
}

.cca-navbar__actions {
  display: flex;
  align-items: center;
  gap: var(--cca-space-3);
  margin-left: auto;
}

.cca-navbar__cta {
  font-weight: 700;
}

.cca-navbar__drawer-link {
  font-weight: 600;
  font-size: 16px;
}
</style>
