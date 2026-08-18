# App Architecture Reference

**Source Code Folder Structure & Organization**

---

## 📁 `src/` — Application Root

Complete source directory structure organized by concern.

### `src/assets/` — Static Assets

#### `src/assets/images/`
- **`hero/`** — Hero section images
- **`illustrations/`** — Categorized illustration assets
- **`icons/`** — Icon assets
- **`backgrounds/`** — Background images

#### `src/assets/fonts/`
Font files (Nunito Sans, Archivo, etc.)

#### `src/assets/styles/`
Global stylesheets, theme definitions, CSS variables

---

## 🧩 `src/components/` — Vue Components

Organized by responsibility and hierarchy.

### `src/components/ui/` — Reusable UI Components

Low-level components used throughout the site:

- **`buttons/`** — Button component variations (primary, secondary, sizes)
- **`cards/`** — Card component (container, metadata, actions)
- **`chips/`** — Chip/tag components for labels, filters
- **`forms/`** — Form components (input, select, textarea, checkbox, radio)
- **`typography/`** — Text components (headings, body, captions)
- **`navigation/`** — Navigation components (nav bar, breadcrumbs, menu)
- **`feedback/`** — User feedback components (alerts, modals, notifications)
- **`layout/`** — Layout components (containers, grids, sections)

### `src/components/home/` — Homepage Section Components

Each section becomes its own component:

- **`Hero/`** — Hero section with large illustration
- **`Mission/`** — Mission statement section
- **`Audience/`** — Who we help cards (audience segments)
- **`Services/`** — Service offerings organized by goals
- **`HowItWorks/`** — Step-by-step how service works
- **`PayWhatYouCan/`** — Pay-what-you-can pricing slider section
- **`Workshops/`** *(planned)* — Upcoming workshops and locations
- **`Testimonials/`** *(planned)* — Success stories and reviews
- **`Survey/`** *(planned)* — Community feedback/survey component
- **`CTA/`** — Call-to-action section

### `src/components/shared/` — Cross-Page Components

Components used on multiple pages:

- Header/Navigation
- Footer
- Sidebar
- Modals (reusable overlays)
- Forms (contact, newsletter signup, etc.)

---

## 📄 `src/pages/` — Page Components

Each route becomes a page component:

- **`Home.vue`** — Homepage (aggregates home section components)
- **`Services.vue`** — Services overview or directory
- **`Workshops.vue`** — Workshop listings and details
- **`Resources.vue`** — Resource library (guides, FAQs, videos)
- **`Community.vue`** — Community stories and updates
- **`Contact.vue`** — Contact form and information

---

## 🗄️ `src/stores/` — State Management (Pinia)

Global application state using Pinia:

- **`user.ts`** — User authentication and profile state
- **`workshops.ts`** — Workshop listings and registration
- **`appointments.ts`** — Appointment data
- **`ui.ts`** — UI state (modals, notifications, theme)
- **`resources.ts`** — Resource library state

---

## 🛣️ `src/router/` — Vue Router Configuration

- **`index.ts`** — Route definitions and navigation
- **`guards.ts`** — Navigation guards (auth checks, redirects)

---

## 🎣 `src/composables/` — Reusable Logic

Vue 3 Composition API composables:

- **`useAuth.ts`** — Authentication logic
- **`useFetch.ts`** — Data fetching with caching
- **`useLocalStorage.ts`** — Local storage management
- **`useAnimation.ts`** — Animation utilities
- **`useAccessibility.ts`** — A11y helpers

---

## 🔌 `src/plugins/` — Vue Plugins

Third-party and custom Vue plugins:

- **`vuetify.ts`** — Vuetify configuration and theme
- **`analytics.ts`** — Analytics integration
- **`i18n.ts`** — Internationalization (English/Spanish)

---

## 📝 `src/types/` — TypeScript Definitions

Type definitions and interfaces:

- **`models.ts`** — Data model types (User, Workshop, Appointment, etc.)
- **`api.ts`** — API response types
- **`components.ts`** — Component prop types

---

## 🛠️ `src/utils/` — Utility Functions

Helper functions and utilities:

- **`formatting.ts`** — Date, time, currency formatting
- **`validation.ts`** — Form validation rules
- **`api.ts`** — API client setup
- **`constants.ts`** — Application constants
- **`colors.ts`** — Brand color utilities

---

## 🎨 Theme Configuration

Vuetify theme lives in `src/plugins/vuetify.ts`, named `cca` (set as `defaultTheme` — Vuetify 4 no longer defaults to `light`). Colors are pulled from `ccaColors` in `src/utils/colors.ts` rather than hardcoded inline:

```typescript
// src/plugins/vuetify.ts (theme 'cca'), resolved against src/utils/colors.ts
const cca = {
  dark: false,
  colors: {
    background: '#FDF6EC',        // ccaColors.cream
    surface: '#FFFFFF',           // ccaColors.white
    primary: '#F4A259',           // ccaColors.orange
    'on-primary': '#343434',      // ccaColors.charcoal (verified ~6:1 contrast on orange)
    secondary: '#78B8D9',         // ccaColors.sky
    'on-secondary': '#173544',    // literal, not in ccaColors
    error: '#DC3545',             // ccaColors.error
    success: '#8BAE7B',           // ccaColors.sage
    info: '#78B8D9',              // ccaColors.sky
    warning: '#E0A458',           // literal, not in ccaColors
    'on-surface': '#343434',      // ccaColors.charcoal
    'on-background': '#343434',   // ccaColors.charcoal
    sage: '#8BAE7B',              // ccaColors.sage
    'sage-darken-1': '#5E7E4F',   // ccaColors.sageDark
    sky: '#78B8D9',               // ccaColors.sky
    'sky-darken-1': '#3B7A9B',    // ccaColors.skyDark
    clay: '#B95E23',              // ccaColors.clay
    sand: '#F8E9D5',              // ccaColors.sand
    'sand-darken-1': '#EED9BC',   // ccaColors.sandDark
  },
}
```

Note: there is no `accent` key in the real theme (removed/never added) and `text` isn't a Vuetify color key — `on-surface`/`on-background` serve that role.

---

## 📦 Build Output

After `npm run build`:

- **`dist/`** — Production-ready static files
- Optimized, minified, tree-shaken
- Ready for Vercel, Netlify, or static hosting

---

## 🔗 Related Documents

- [[../../03-Website-Design/Design-Language.md|Design Language]] — Visual specifications
- [[../../05-Technical/Tech-Stack.md|Tech Stack]] — Technology and dependencies
- [[../../01-Project-Foundation/Brand-Bible.md|Brand Bible]] — Brand guidelines

---

**Status:** Architecture Reference  
**Last Updated:** August 17, 2026
