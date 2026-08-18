# Community Workshops Section — Design Spec

Date: 2026-08-18
Status: Approved, ready for implementation planning

## Purpose

Add a "Community Workshops" homepage section that tells visitors workshops
are coming soon and invites them to fill out a short needs-assessment survey
("What technology challenges would you or someone you love like help
with?"). No workshops are scheduled yet, so this replaces the
calendar/listing concept originally sketched in
`docs/03-Website-Design/Homepage/Sections.md` section 8 with a "coming soon +
tell us what you need" teaser, matching what CCA actually needs right now
(input to plan the first workshops).

The survey must feel like a quick, friendly question — not an application
or intake form. CCA's audience skews older, less digitally confident, and
easily discouraged by anything that feels bureaucratic.

## Non-goals

- No backend/data persistence in this pass. Supabase is planned but not
  wired up anywhere in the app yet (see repo `CLAUDE.md`). Submission is
  stubbed (see Data flow below); wiring to real storage is a future,
  separate task.
- No new route/page. Everything lives on the existing homepage (`/`), which
  is still the app's only route.
- No workshop calendar/listing UI — that's out of scope until workshops
  are actually scheduled.

## Component architecture

```
src/components/home/CommunityWorkshops/
  CommunityWorkshops.vue         # teaser section, added to Home.vue
  WorkshopsSurveyDialog.vue      # orchestrator: v-dialog shell, step state,
                                  # answers object, back/next/submit logic
  survey-steps/
    SurveyStepWho.vue            # Q1 — single-select (v-radio-group)
    SurveyStepNeeds.vue          # Q2 — multi-select (v-checkbox list)
    SurveyStepPreference.vue     # Q3 — single-select (v-radio-group)
    SurveyStepDetails.vue        # Q4 — free text (v-textarea)
    SurveyStepThankYou.vue       # confirmation state after submit
```

`CommunityWorkshops.vue` follows the same shape as every other homepage
section in this repo (`CTASection.vue`, `PayWhatYouCanSection.vue`): a
single flat `.vue` file, `section.cca-workshops` root with `aria-labelledby`,
`v-container`, scoped SCSS, copy via `t('home.workshops.*')`. It renders a
headline, "coming soon" line, body copy, and a "Tell Us What You Need"
button that sets `dialogOpen = true` (a local `ref`, no store).

`WorkshopsSurveyDialog.vue` receives `dialogOpen` as a `v-model` from the
teaser section. It owns all wizard state (`currentStep`, `answers`) and
renders the active step component. Each `SurveyStep*.vue` component is a
dumb view: it receives only its own slice of `answers` via
`modelValue`/`update:modelValue`, has no knowledge of its position in the
wizard, and emits nothing else. This keeps each question independently
readable while wizard mechanics (progress, navigation, submit-stub) live in
exactly one place — `WorkshopsSurveyDialog.vue`.

`SurveyStepThankYou.vue` is a static confirmation view shown after submit;
it takes no props beyond what's needed to render copy and a close button.

## Data flow & state

```ts
// WorkshopsSurveyDialog.vue
const currentStep = ref(1) // 1-4 = questions, 5 = thank-you
const answers = reactive({
  who: '',                 // 'self' | 'parentGrandparent' | 'familyMember'
                            // | 'friendNeighbor' | 'workColleague'
  needs: [] as string[],   // subset of a fixed option-key list (see below)
  preference: '',          // 'group' | 'oneOnOne' | 'atHome' | 'online' | 'notSure'
  details: '',             // free text
})
```

- Opening the dialog always resets `currentStep` to `1` and `answers` to
  its empty shape — no persistence across opens.
- `Next`/`Back` increment/decrement `currentStep`. Nothing is required to
  advance — every question is skippable, including Q1.
- On step 4's "Next" (functionally "Submit"): build the payload object,
  log it via `console.log` behind a
  `// TODO: wire to backend once Supabase (or another store) is connected`
  comment, then set `currentStep = 5`.
- Closing the dialog (X, Esc, backdrop click) at any point discards
  `answers` with no confirmation prompt — consistent with "don't make it
  feel like an application."
- `needs` option keys: `smartphone`, `computer`, `tablet`, `email`,
  `videoCalls`, `internet`, `wifi`, `smartTv`, `healthcare`, `government`,
  `safety`, `passwords`, `accessibility`, `printing`, `somethingElse`.

## Homepage placement

`CommunityWorkshops.vue` is added to `src/pages/Home.vue` between
`PayWhatYouCanSection` and `CTASection`:

```
Hero → Mission → WhoWeHelp → Services → HowItWorks → PayWhatYouCan
     → CommunityWorkshops → CTA
```

This matches where the section was already (incorrectly) wired in before
this spec — see the stray `WorkshopsSection` import removed from `Home.vue`
earlier in this session — and keeps the final "Get Help Today" CTA as the
page's last word.

## i18n key structure

New top-level `home.workshops` block in `src/locales/en.json` /
`es.json`. Keys only — actual copy is written during implementation by the
`content-brand` / `bilingual-content` subagents per this repo's standard
handoff (vuetify-builder scaffolds with placeholder copy → content-brand
writes English → bilingual-content produces the Spanish pair →
accessibility-check audits).

```
home.workshops.title
home.workshops.comingSoon
home.workshops.body
home.workshops.ctaButton

home.workshops.survey.stepOfLabel        # "Step {current} of {total}"
home.workshops.survey.backButton
home.workshops.survey.nextButton
home.workshops.survey.submitButton
home.workshops.survey.closeLabel         # aria-label for dialog close

home.workshops.survey.who.question
home.workshops.survey.who.options.{self, parentGrandparent, familyMember, friendNeighbor, workColleague}

home.workshops.survey.needs.question
home.workshops.survey.needs.hint         # "Select all that apply"
home.workshops.survey.needs.options.{smartphone, computer, tablet, email, videoCalls, internet, wifi, smartTv, healthcare, government, safety, passwords, accessibility, printing, somethingElse}

home.workshops.survey.preference.question
home.workshops.survey.preference.options.{group, oneOnOne, atHome, online, notSure}

home.workshops.survey.details.question
home.workshops.survey.details.placeholder

home.workshops.survey.thankYou.title
home.workshops.survey.thankYou.body
home.workshops.survey.thankYou.closeButton
```

## Accessibility

- `v-dialog` uses Vuetify's built-in focus trap; closing returns focus to
  the "Tell Us What You Need" button that opened it.
- Each step's question is a heading or `<legend>` so screen readers
  announce it immediately on step change, paired with a visually-hidden
  `aria-live="polite"` region announcing `stepOfLabel` ("Step 2 of 4") so
  progress isn't silent.
- `v-radio-group`/checkbox groups use a `<fieldset>`/`<legend>` (or
  Vuetify's label prop) so question text is programmatically tied to its
  options.
- All interactive controls (radios, checkboxes, Back/Next/Close buttons)
  meet this repo's established 48×48px minimum touch target, using the
  same override pattern as `PayWhatYouCanSection.vue`'s slider thumb where
  Vuetify's defaults fall short.
- Focus moves to the new step's heading (not just the first control) on
  Next/Back, so keyboard and screen-reader users don't lose their place.
- Q4's textarea has a visible label, not just a placeholder.
- Final contrast/touch-target/semantics pass performed by the
  `accessibility-check` subagent once built, per this repo's standard
  homepage-section workflow.

## Testing

- `CommunityWorkshops.vue` and each `SurveyStep*.vue`: no dedicated test
  files, matching this repo's existing convention (no other homepage
  section — `Hero`, `Mission`, `Services`, etc. — has component tests;
  `src/App.spec.ts` is the only spec in the repo, a shell-level smoke
  test).
- `WorkshopsSurveyDialog.vue`: one Vitest spec covering step advancement,
  back navigation, and that the submit-stub builds the expected payload
  object — since it's the one piece in this feature with actual state
  logic.
- Manual verification: `npm run dev`, click through the full wizard
  forward/back, submit, confirm the thank-you step and console-logged
  payload, then a pass with the `accessibility-check` subagent.

## Build handoff

Standard repo workflow per `CLAUDE.md`: `vuetify-builder` scaffolds all
components with placeholder copy → `content-brand` writes English copy →
`bilingual-content` produces the Spanish pair and confirms i18n key parity
→ `accessibility-check` audits (PASS or NEEDS FIXES) → `docs-sync` updates
`docs/03-Website-Design/Homepage/Sections.md` section 8 to reflect the
"coming soon + survey" design actually built (superseding the
calendar/listing sketch) and any other affected docs.
