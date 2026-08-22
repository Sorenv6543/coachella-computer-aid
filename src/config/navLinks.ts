export interface NavLink {
  key: string
  href: string | null
}

// Only "/" is a registered route today (see src/router/index.ts). The rest
// are placeholders for pages that don't exist yet — hash targets are omitted
// until the corresponding sections land so clicking them doesn't silently
// no-op while changing the URL hash. Shared by AppNavbar and AppFooter so
// both stay in sync as real routes land.
export const navLinks: NavLink[] = [
  { key: 'nav.links.home', href: '/' },
  { key: 'nav.links.services', href: null },
  { key: 'nav.links.workshops', href: null },
  { key: 'nav.links.resources', href: null },
  { key: 'nav.links.community', href: null },
  { key: 'nav.links.contact', href: null },
]
