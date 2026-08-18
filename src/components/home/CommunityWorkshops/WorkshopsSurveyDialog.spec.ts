import { describe, it, expect, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import vuetify from '@/plugins/vuetify'
import i18n from '@/plugins/i18n'
import WorkshopsSurveyDialog from './WorkshopsSurveyDialog.vue'

function mountDialog() {
  return mount(WorkshopsSurveyDialog, {
    props: { modelValue: true },
    global: { plugins: [vuetify, i18n] },
  })
}

describe('WorkshopsSurveyDialog', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('starts on step 1 with empty answers', () => {
    const wrapper = mountDialog()
    expect(wrapper.vm.currentStep).toBe(1)
    expect(wrapper.vm.answers).toEqual({ who: '', needs: [], preference: '', details: '' })
  })

  it('advances with goNext and returns with goBack', async () => {
    const wrapper = mountDialog()

    wrapper.vm.goNext()
    await nextTick()
    expect(wrapper.vm.currentStep).toBe(2)

    wrapper.vm.goBack()
    await nextTick()
    expect(wrapper.vm.currentStep).toBe(1)
  })

  it('does not go below step 1', async () => {
    const wrapper = mountDialog()
    wrapper.vm.goBack()
    await nextTick()
    expect(wrapper.vm.currentStep).toBe(1)
  })

  it('builds the submit payload and advances to the thank-you step', () => {
    const wrapper = mountDialog()
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    wrapper.vm.answers.who = 'self'
    wrapper.vm.answers.needs = ['smartphone', 'email']
    wrapper.vm.answers.preference = 'oneOnOne'
    wrapper.vm.answers.details = 'My phone keeps freezing.'
    wrapper.vm.currentStep = 4

    wrapper.vm.submitSurvey()

    expect(logSpy).toHaveBeenCalledWith('Workshop survey submitted:', {
      who: 'self',
      needs: ['smartphone', 'email'],
      preference: 'oneOnOne',
      details: 'My phone keeps freezing.',
    })
    expect(wrapper.vm.currentStep).toBe(5)
  })

  it('resets step and answers each time the dialog reopens', async () => {
    const wrapper = mountDialog()
    wrapper.vm.answers.who = 'self'
    wrapper.vm.currentStep = 3

    await wrapper.setProps({ modelValue: false })
    await wrapper.setProps({ modelValue: true })

    expect(wrapper.vm.currentStep).toBe(1)
    expect(wrapper.vm.answers).toEqual({ who: '', needs: [], preference: '', details: '' })
  })
})
