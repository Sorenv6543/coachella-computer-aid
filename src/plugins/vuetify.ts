import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import { ccaColors } from '@/utils/colors'

// Vuetify 4 changed the default theme from 'light' to 'system' — defaultTheme
// must be set explicitly or the app renders using the OS light/dark
// preference instead of the brand theme.
export default createVuetify({
  theme: {
    defaultTheme: 'cca',
    themes: {
      cca: {
        dark: false,
        colors: {
          background: ccaColors.cream,
          surface: ccaColors.white,
          primary: ccaColors.orange,
          // Charcoal on orange (~6:1), not white (~2.1:1, fails WCAG AA's
          // 4.5:1 minimum) — matches the verified B2 prototype.
          'on-primary': ccaColors.charcoal,
          secondary: ccaColors.sky,
          'on-secondary': '#173544',
          error: ccaColors.error,
          success: ccaColors.sage,
          info: ccaColors.sky,
          warning: '#E0A458',
          'on-surface': ccaColors.charcoal,
          'on-background': ccaColors.charcoal,
          sage: ccaColors.sage,
          'sage-darken-1': ccaColors.sageDark,
          sky: ccaColors.sky,
          'sky-darken-1': ccaColors.skyDark,
          clay: ccaColors.clay,
          sand: ccaColors.sand,
          'sand-darken-1': ccaColors.sandDark,
        },
      },
    },
  },
})
