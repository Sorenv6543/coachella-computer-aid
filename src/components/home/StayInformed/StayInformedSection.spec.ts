import { describe, it, expect, vi, afterEach } from 'vitest'
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
  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('emailRules', () => {
    it('rejects an empty email', () => {
      const wrapper = mountSection()
      const [required] = wrapper.vm.emailRules
      expect(required('')).not.toBe(true)
    })

    it('rejects a malformed email', () => {
      const wrapper = mountSection()
      const [, format] = wrapper.vm.emailRules
      expect(format('not-an-email')).not.toBe(true)
      expect(format('missing-at-sign.com')).not.toBe(true)
      expect(format('user@nodot')).not.toBe(true)
    })

    it('accepts a well-formed email', () => {
      const wrapper = mountSection()
      const [required, format] = wrapper.vm.emailRules
      expect(required('robert@example.com')).toBe(true)
      expect(format('robert@example.com')).toBe(true)
    })
  })

  it('does not submit or flip to the success state when the email is invalid', async () => {
    const wrapper = mountSection()
    wrapper.vm.email = 'not-an-email'

    await wrapper.vm.handleSubmit()

    expect(wrapper.vm.submitted).toBe(false)
  })

  it('submits and flips to the success state for a valid email, with name optional', async () => {
    const wrapper = mountSection()
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    wrapper.vm.email = 'maria@example.com'

    await wrapper.vm.handleSubmit()

    expect(wrapper.vm.submitted).toBe(true)
    expect(logSpy).toHaveBeenCalledWith('Stay informed signup submitted:', {
      name: '',
      email: 'maria@example.com',
    })
  })

  it('marks the email field invalid only after a failed submit attempt', async () => {
    const wrapper = mountSection()
    wrapper.vm.email = 'not-an-email'
    expect(wrapper.vm.emailInvalid).toBe(false)

    await wrapper.vm.handleSubmit()

    expect(wrapper.vm.emailInvalid).toBe(true)
  })

  it('clears the invalid flag as soon as the email is corrected, without resubmitting', async () => {
    const wrapper = mountSection()
    wrapper.vm.email = 'not-an-email'
    await wrapper.vm.handleSubmit()
    expect(wrapper.vm.emailInvalid).toBe(true)

    wrapper.vm.email = 'fixed@example.com'

    expect(wrapper.vm.emailInvalid).toBe(false)
  })
})
