// happy-dom (our Vitest `environment`) does not implement `window.visualViewport`.
// Vuetify's VOverlay location strategies reference it unconditionally
// (`visualViewport?.addEventListener(...)`), and optional chaining doesn't
// guard against a ReferenceError on an undeclared global — only against
// property access on an already-resolved null/undefined value. Any spec
// that mounts an open Vuetify overlay component (v-dialog, v-menu,
// v-select, ...) needs this stub in place before that code runs.
const visualViewportStub = {
  width: 1024,
  height: 768,
  offsetLeft: 0,
  offsetTop: 0,
  pageLeft: 0,
  pageTop: 0,
  scale: 1,
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => false,
}

Object.defineProperty(window, 'visualViewport', {
  value: visualViewportStub as unknown as VisualViewport,
  configurable: true,
  writable: true,
})
