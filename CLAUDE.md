# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repository is

Coachella Computer Aid (CCA) is a community tech-education nonprofit. This repo holds both **brand/planning/asset production** for the CCA site and, as of the site scaffold + first homepage components landing, the **beginning of the actual Vue app**. Concretely, that means:

- `docs/` — an Obsidian vault of planning docs (mission, strategy, design language, tech stack decisions). Numbered folders (`01-Project-Foundation` … `06-Assets`) form the intended reading order; `docs/README.md` is the hub, cross-linked via `[[wikilink]]`s.
- `tools/illustrations/` — a Node.js pipeline that generates and tracks the site's 300-item illustration catalog (see below). This is separate build tooling from the app itself.
- `files/` — finished static HTML/PDF deliverables (Brand Bible, Character Poses, Illustration Library) built *from* the illustration catalog, for stakeholder review.
- `src/` — the actual Vue app: `src/assets/images/illustrations/` holds the exported PNG assets organized by category; `src/components/`, `src/pages/`, `src/plugins/`, `src/router/`, `src/stores/`, `src/utils/`, `src/locales/` hold real app code (see Tech-Stack below). Don't assume `src/` is asset-only — check what's actually there.
- `.claude/agents/` — project subagents for building the site (see Subagents below).

The frontend stack (Vue 3 + Vite + Vuetify 4 + Pinia + Vue Router + vue-i18n — see `docs/05-Technical/Tech-Stack.md` and `docs/06-Assets/Architecture-Reference.md`) is scaffolded and buildable: `npm install && npm run dev`. Supabase is still planned, not wired up. Built so far: the app shell (`App.vue`, theme, i18n, routing) and the homepage `AppNavbar`/`HeroSection` components, with EN/ES copy and a passed accessibility audit. Most of the homepage (and the rest of the site) is still unbuilt — check `docs/03-Website-Design/Homepage/Sections.md`'s MVP priority ranking for what's next.

There are two `CLAUDE.md` files in this repo with different scopes: this one (repo-wide dev workflow) and `docs/CLAUDE.md` (navigation guide for building the future site *from* the vault's brand/design docs — read that one when the task is "build a component" or "write copy," not "work on the illustration pipeline").

## Illustration pipeline

The catalog (`tools/illustrations/manifest.json`, 300 items across categories `characters`, `hero`, `service`, `icon`, `background`, `device`, `ui`, `workshop`, `marketing`, `community`) is the single source of truth. Everything else — prompts, candidates, picks, exported assets — is generated or reconciled from it.

**Status model** (see `tools/illustrations/README.md`): every catalog item is `exported` (a real file on disk matches its id — computed, never hand-edited), `designed` (hand-set `true` in the manifest: already drawn in a kit/brand-bible doc but not exported standalone), or `planned` (neither). Only `designed` is human-maintained; `exported` always derives from disk so it can't drift.

**Naming convention:** `<character-or-subject>-<NNN>-<slug>.png`, where `NNN` is the zero-padded catalog id (e.g. `robert-002-laptop.png`). `*-character-sheet.png` files are reference sheets, excluded from the catalog count. Anything without a `-NNN-` group is reported as non-conforming by `scan.mjs`.

### Commands

Top-level reconciliation (run from `tools/illustrations/`):
```bash
node scan.mjs                    # reconcile catalog vs src/assets, regenerate status.generated.*, report
node scan.mjs --dry              # report only, write nothing
```
`status.generated.js`/`.json` are derived output — never hand-edit; they're git-ignored.

Prompt → candidate → pick pipeline (run from `tools/illustrations/prompts/`):
```bash
node build-prompts.mjs --tool gemini --variants 3   # manifest -> prompts-all-gemini.md (style from STYLE-LOCK.md)
node generate-images.mjs                             # batch-generate via Gemini API (needs GEMINI_API_KEY)
node generate-images.mjs --dry                        # preview without calling the API
node scan-candidates.mjs                              # index candidates/ -> picker-data.generated.js
node apply-picks.mjs --dry                             # preview canonical filenames from picks.json
node apply-picks.mjs --clean                           # copy chosen candidates into src/assets/images/illustrations/<category>/
```
Then re-run `node ../scan.mjs` so applied picks flip to `exported`.

Candidates are saved into `candidates/` as `<id>-<n>.<ext>` (e.g. `001-1.png`, `001-2.png`, `001-3.png`); open `picker.html` (serve the folder, e.g. `python3 -m http.server`, so images load) to review and export `picks.json`. Picks and progress persist in the browser's `localStorage` — use the picker's "Import picks" button to load an on-disk `picks.json` into that state, and "Export picks.json" to save decisions back to the repo.

`generate-images.mjs` attaches each character's `-character-sheet.png` as a reference image automatically for every `characters`-category slot (pairs/group shots attach every sheet involved), so regenerated character art stays visually consistent — pass `--only <ids> --force` to regenerate specific slots, `--no-ref` to disable reference-image attachment.

## Subagents

Five project-scoped subagents live in `.claude/agents/` (Claude Code auto-delegates from each `description`, or invoke explicitly: "Use the accessibility-check subagent on HeroSection.vue"):

| Agent | Does | Writes code? |
|---|---|---|
| `vuetify-builder` | Vue 3 + Vuetify components on brand | yes |
| `content-brand` | On-brand English copy + tone linting | copy only |
| `bilingual-content` | Matched EN/ES copy pairs, i18n key parity | copy only |
| `accessibility-check` | WCAG 2.1 AA audit | no — review only |
| `docs-sync` | Vault link/README/drift upkeep | docs only |

Intended handoff when building a page: `vuetify-builder` scaffolds with placeholder copy → `content-brand` writes the English copy → `bilingual-content` produces the Spanish pair → `accessibility-check` audits (PASS or NEEDS FIXES) → `docs-sync` updates affected docs/READMEs.

## Brand constraints that apply everywhere

From `tools/illustrations/prompts/STYLE-LOCK.md` and the Brand Bible — relevant any time you're producing visuals or copy for CCA:

- Palette only: cream `#FDF6EC`, sand `#F8E9D5`, orange `#F4A259`, clay `#B95E23`, sky `#78B8D9`, sage `#8BAE7B`, charcoal `#343434`.
- Flat vector illustration, rounded soft shapes, warm golden lighting, not photorealistic, no dark/cold tones, no text or logos baked into illustrations.
- Six recurring characters with fixed descriptors (see `docs/01-Project-Foundation/Brand-Bible.md`): Robert (72, retired teacher, blue cardigan, glasses, silver hair), Maria (68, orange cardigan, brown bun), Helen (76, sage cardigan, silver hair), Carlos (veteran, sage shirt, grey mustache), Ana (28, volunteer, orange top, dark ponytail, backpack), David (wheelchair user, sky-blue shirt, headset, glasses).
- Copy voice: warm, patient, plain-language, anxiety-reducing, bilingual EN/ES, WCAG AA minimum. CCA's users skew older, disabled, and low digital-literacy — the accessibility-check subagent's test is "would an anxious 80-year-old, possibly with low vision or a tremor, be able to use this without help?"
