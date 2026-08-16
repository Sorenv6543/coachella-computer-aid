import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import vuetify from '@/plugins/vuetify'
import i18n from '@/plugins/i18n'
import App from '@/App.vue'
import Home from '@/pages/Home.vue'

describe('App', () => {
  it('renders the Home route with themed content', async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [{ path: '/', component: Home }],
    })
    router.push('/')
    await router.isReady()

    const wrapper = mount(App, {
      global: { plugins: [vuetify, createPinia(), router, i18n] },
    })

    expect(wrapper.text()).toContain("Finally, technology help that's patient with you")
  })
})
