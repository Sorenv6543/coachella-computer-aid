export const ccaColors = {
  cream: '#FDF6EC',
  sand: '#F8E9D5',
  sandDark: '#EED9BC',
  orange: '#F4A259',
  clay: '#B95E23',
  sky: '#78B8D9',
  skyDark: '#3B7A9B',
  sage: '#8BAE7B',
  sageDark: '#5E7E4F',
  charcoal: '#343434',
  white: '#FFFFFF',
  // Darker than a typical UI red (#DC3545 measured 4.53:1 on white — barely
  // over WCAG's 4.5:1 floor, no margin for rendering variance) so the one
  // piece of text explaining *why* a submission failed has real headroom:
  // ~5.57:1 on white/surface.
  error: '#C62839',
} as const

export type CcaColorToken = keyof typeof ccaColors
