# Character Art Audit — 2026-08-14

Visual inspection of every file in `src/assets/images/illustrations/characters/`,
compared against the Brand Bible v1.0 character descriptors and each character's
own reference sheet. Verdict per file below.

## Descriptors used (Brand Bible v1.0)

| Character | Canonical look |
|---|---|
| Robert | 72, retired teacher, blue cardigan, glasses, silver hair |
| Maria | 68, orange sweater/cardigan, brown bun |
| Helen | 76, sage cardigan, silver hair, most joyful |
| Carlos | veteran, sage shirt, grey mustache |
| Ana | 28, volunteer, orange top, dark ponytail, backpack |
| David | wheelchair user, sky blue shirt, headset, glasses |

## Results

### ❌ Robert — 2 of 3 poses are the wrong person

| File | Verdict | Detail |
|---|---|---|
| `robert-character-sheet.png` | ✅ reference | Matches descriptor: silver hair, round glasses, sky-blue cardigan over cream shirt, grey trousers. |
| `robert-001-portrait.png` | ❌ **wrong person** | An elderly **woman** — silver wavy bob, pearl earrings, blue open cardigan. No glasses. Not Robert at any age. |
| `robert-002-laptop.png` | ✅ match | Same man as the sheet (hair, glasses, cardigan, cream shirt); style and palette on-lock, desert mug detail. |
| `robert-003-video-call.png` | ❌ **wrong person** | A **young** person — dark brown hair in a bun, cream crew-neck sweater, tan pants, no glasses. Zero overlap with Robert's descriptor. |

### ❌ Maria — 2 of 3 poses don't match

| File | Verdict | Detail |
|---|---|---|
| `maria-character-sheet.png` | ✅ reference | Matches descriptor: dark-brown bun, hoop earrings, orange open cardigan over cream top, medium skin tone, navy trousers. |
| `maria-004-portrait.png` | ❌ **identity drift** | Right silhouette (bun + orange knit) but **white/platinum hair and pale skin** — reads as a different, older, lighter-complexioned woman. Also crew-neck sweater instead of the cardigan. |
| `maria-005-smartphone.png` | ❌ **wrong people + wrong style** | Two characters, neither is Maria: a young **blonde** woman in orange holding the phone, plus a companion with **sage-green hair**. Simplified blob-figure style (no proper facial structure) that matches neither the sheet nor STYLE-LOCK. |
| `maria-006-library.png` | ✅ match | Same woman as the sheet — dark bun, orange cardigan, medium skin, correct age; warm library scene consistent with style lock. |

### ✅ Helen — identity consistent (one style/IP note)

| File | Verdict | Detail |
|---|---|---|
| `helen-character-sheet.png` | ✅ reference | Silver wavy hair, sage cardigan, cream top, khaki pants, laughing. Note: this sheet is drawn with **heavy cartoon outlines**, unlike the flat-vector Robert/Maria/Carlos/Ana/David sheets — the sheet itself drifts from the house style. |
| `helen-007-portrait.png` | ✅ match | Same woman, flat-vector style, on-palette. |
| `helen-008-videocall.png` | ⚠️ match, with issues | Identity is clearly Helen (sage cardigan, silver hair, joyful). But: heavy-outline cartoon style like the sheet (not the flat style of the rest of the pool), and the tablet has a visible **Apple logo** — third-party trademark; should be regenerated with a generic device. |

### ✅ Carlos — consistent

| File | Verdict | Detail |
|---|---|---|
| `carlos-character-sheet.png` | ✅ reference | Grey hair, grey mustache, sage button-up, navy trousers, medium-dark skin. |
| `carlos-009-portrait.png` | ✅ match | Same man; slightly slimmer build and marginally lighter skin than the sheet, but unmistakably the same character. Acceptable. |
| `carlos-010-va-portal.png` | ✅ match | Same man at a laptop showing a "VA Service Portal / My Benefits" page, US flag, desert window view — on-brief for the veteran story and on-style. |

### ✅ Ana — consistent

| File | Verdict | Detail |
|---|---|---|
| `ana-character-sheet.png` | ✅ reference | Late-20s, dark ponytail, coral/orange tee, sage backpack, grey pants, sneakers. |
| `ana-011-portrait.png` | ✅ match | Same character, same outfit and backpack. |
| `ana-012-homevisit.png` | ✅ match | Same character arriving at a desert home (palm, cactus, gravel yard) — place anchor on-brief. |
| `ana-013-teaching.png` | ✅ match | Same Ana helping a senior at a laptop. (The senior is Robert-adjacent — blue cardigan-ish sweater, glasses, silver hair — a reasonable crossover.) |

### ✅ David — consistent

| File | Verdict | Detail |
|---|---|---|
| `david-character-sheet.png` | ✅ reference | Short dark hair, round glasses, sky-blue polo, neck headset, manual wheelchair with sage frame. |
| `david-014-portrait.png` | ✅ match | Same character and chair, flat style, on-palette. |
| `david-015-accessibility.png` | ✅ match | Same David using a phone on a wheelchair-mounted arm with a voice-control waveform — on-brief accessibility story. |

## Summary

| Character | Status | Files needing regeneration |
|---|---|---|
| Robert | ❌ broken | `robert-001-portrait.png`, `robert-003-video-call.png` |
| Maria | ❌ broken | `maria-004-portrait.png`, `maria-005-smartphone.png` |
| Helen | ⚠️ minor | `helen-008-videocall.png` (style drift + Apple logo); consider re-doing the character sheet in flat style |
| Carlos | ✅ ok | — |
| Ana | ✅ ok | — |
| David | ✅ ok | — |

**4 files are unusable** (wrong person), **1 file has a trademark problem** (Apple
logo) plus style drift, and **Helen's reference sheet** is drawn in a different
rendering style than the other five sheets.

## Likely cause

Consistent with the hypothesis in the project context: the failed poses were
generated **without the character sheet fed back as a reference image** (or
predate `prompts/STYLE-LOCK.md`). Supporting evidence:

- Failures cluster in the earliest ids (001, 003, 004, 005) — the first
  generation batch. Every pose generated later (006, 009–015) is consistent.
- The failures are *identity* failures (wrong person entirely), which is the
  signature of a text-only prompt with no reference image: the model kept the
  clothing color words but re-rolled the face, age, and hair.
- `maria-005` additionally re-rolled the *style*, which text-only prompts do
  when the style paragraph is under-weighted — STYLE-LOCK.md was written to fix
  exactly this.

## Remediation status

**Update, 2026-08-14 (later same day):** `generate-images.mjs` now attaches each
character's `-character-sheet.png` as a reference image automatically for every
`characters`-category slot (pairs/group shots attach every sheet involved) —
this was a real gap in the pipeline, not just a one-off prompting mistake: the
script only ever sent text prompts, so nothing enforced STYLE-LOCK.md's "keep
consistent across every image" instruction with an actual visual anchor. See
the header comment in that file for details, and its README for the flag
(`--no-ref` to disable and reproduce the old behavior).

**Update, 2026-08-14 (same day, later still):** the API run that generated
this catalog had already produced 3 raw candidates per slot in
`tools/illustrations/prompts/candidates/` — 898 of 900 target images across
all 300 catalog slots. Before spending anything new, all 3 raw candidates were
checked by hand for the 5 flagged slots:

- **Robert #1, #3 and Maria #4, #5: confirmed unfixable from the existing
  pool.** Every one of the 12 raw candidates across these 4 slots has the same
  wrong-person problem as the one that got picked — the whole batch came from
  the same reference-less prompt, so there was never a good option to choose.
  These 4 files have been **removed** from
  `src/assets/images/illustrations/characters/` (not left in place wrong) —
  `robert-001-portrait.png`, `robert-003-video-call.png`,
  `maria-004-portrait.png`, `maria-005-smartphone.png`. `scan.mjs` now
  correctly reports these 4 slots as `planned` again instead of falsely
  `exported`. They still need real regeneration:

  ```
  node generate-images.mjs --only 1,3,4,5 --force
  ```

  (id 8 dropped from this list — see next point.) This environment has **no
  `GEMINI_API_KEY`**, so generation can't run here — flagged for a
  session/machine that has the key. Cost at the current (unverified, see
  below) default model: ~12 images × ~$0.039 ≈ **$0.47** for all 3 variants of
  each slot, or ~$0.16 for one variant each.

- **Helen #8: fixed for $0.** All 3 raw candidates for this slot were clean
  (no Apple logo, no style drift). `candidates/008-2.png` was picked and
  applied via `apply-picks.mjs --clean`, replacing the old
  `helen-008-videocall.png` with `helen-008-video-call-joy.png`. No new API
  spend.

Also still worth doing before the next real generation run: confirm the
current recommended model ID (see `generate-images.mjs`'s header —
`ai.google.dev` is unreachable from this dev environment, so the default of
`gemini-2.5-flash-image` is unverified against a primary source, and there are
signs it may be scheduled for shutdown around 2026-10-02) and regenerate
`helen-character-sheet.png` in the flat-vector style to match the other five
sheets, since it's currently drawn with heavy outlines.

The other ~283 catalog slots (all non-`characters` categories, plus the
unreviewed character slots) already have raw candidates sitting in
`candidates/` from the same paid run, un-picked — that's real, already-paid-for
inventory. Running `picker.html` over them is a $0 next step whenever there's
time for the visual review; it wasn't done here since picking illustrations
for ~280 slots is a design decision, not something to auto-decide.
