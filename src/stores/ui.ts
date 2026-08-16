import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
  state: () => ({ mobileNavOpen: false }),
  actions: {
    toggleMobileNav() {
      this.mobileNavOpen = !this.mobileNavOpen
    },
  },
})
