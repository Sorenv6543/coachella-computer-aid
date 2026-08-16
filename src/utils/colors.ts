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
  error: '#DC3545',
} as const

export type CcaColorToken = keyof typeof ccaColors
