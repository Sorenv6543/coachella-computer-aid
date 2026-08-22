import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import vuetify from '@/plugins/vuetify'
import i18n from '@/plugins/i18n'
import StayInformedSection from './StayInformedSection.vue'

function mountSection() {
  return mount(StayInformedSection, {
    global: { plugins: [vuetify, i18n] },
  })
}

describe('StayInformedSection', () => {
  it('renders the coming-soon heading', () => {
    const wrapper = mountSection()
    expect(wrapper.find('#cca-stay-informed-heading').exists()).toBe(true)
  })

  it('links to the real phone and email contact, not a form', () => {
    const wrapper = mountSection()
    const links = wrapper.findAll('a')

    expect(links.some((link) => link.attributes('href') === 'tel:+17604067770')).toBe(true)
    expect(
      links.some((link) => link.attributes('href') === 'mailto:help@coachellacomputeraid.com'),
    ).toBe(true)
    expect(wrapper.find('form').exists()).toBe(false)
  })
})
