# Illustration prompt + pick pipeline

Turns the 300-item catalog into a large, style-coherent candidate set and lets you
pick the keepers — *before* the site is built. Everything is driven off
`../manifest.json`.

## Workflow

1. **Generate prompts**
   ```
   node build-prompts.mjs --tool gemini --variants 3
   ```
   → `prompts-all-gemini.md`: 300 prompts, each self-contained and style-locked,
   each asking Gemini for 3 variations. (Style spec is documented in `STYLE-LOCK.md`,
   but the actual `STYLE`/`FRAME` text lives hardcoded in `build-prompts.mjs` — edit
   the script, keep `STYLE-LOCK.md` in sync by hand, then rerun.)

2. **Generate in Gemini.** Paste each prompt (Nano Banana / Gemini image, or Imagen
   with sampleCount = 3). You get ~3 candidates per slot, ~900 total.

3. **Save the outputs** into a `candidates/` folder next to these files, named
   `<id>-<n>.<ext>` — zero-padded catalog id, then which variation:
   ```
   candidates/001-1.png  001-2.png  001-3.png
   candidates/101-1.png  101-2.png  101-3.png
   ```

4. **Index them**
   ```
   node scan-candidates.mjs
   ```
   → `picker-data.generated.js`, and a report of how many slots have art.

5. **Pick.** Open `picker.html` (serve the folder so images load:
   `python3 -m http.server` then visit the file, or any static server). Click the
   winning candidate per slot; mark "none good — regenerate" where all three miss.
   Progress + picks persist in your browser. Click **Export picks.json** to save the
   decisions into the repo.

6. **Apply picks → assets.** Place the exported `picks.json` next to these scripts and run
   ```
   node apply-picks.mjs --dry     # preview the canonical filenames
   node apply-picks.mjs --clean   # copy chosen images into src/…/illustrations/<category>/
   ```
   Each pick is copied as `<prefix>-<NNN>-<slug>.png` (character name, or category for
   non-character items) — the exact convention the top-level `scan.mjs` reads. Then:
   ```
   cd .. && node scan.mjs         # picked items flip to "exported"
   ```
   Never hand-edit the manifest; `scan.mjs` derives status from the files on disk.

7. **Then build the site**, pulling only the picked (now exported) images.

## Files
| File | Role |
|---|---|
| `STYLE-LOCK.md` | The one-world style spec (from the Brand Bible), documentation only — not read by any script. |
| `build-prompts.mjs` | Catalog → paste-ready prompts. Actual style text lives in its `STYLE`/`FRAME` constants (mirror edits into `STYLE-LOCK.md`). `--tool gemini\|midjourney` `--cat` `--limit` `--variants N` |
| `prompts-all-gemini.md` | The full 300, 3 variations each (generated). |
| `scan-candidates.mjs` | Indexes `candidates/` → `picker-data.generated.js`. |
| `picker.html` | Review 3 candidates per slot, pick winners, export `picks.json`. |
| `apply-picks.mjs` | `picks.json` → copies chosen candidates into the assets tree as `<prefix>-<NNN>-<slug>.png` for `scan.mjs`. `--dry` `--clean` `--flat` |

Generated files (`*.generated.js`) and `candidates/` are safe to git-ignore.

---

## Option: generate all 300 by API (no pasting)

Instead of pasting prompts one by one, batch them with `generate-images.mjs`.

> **Imagen is deprecated** (Google shutdown 2026-08-17). This uses **Nano Banana**
> (`gemini-2.5-flash-image`) via `generateContent`, Google's recommended path.
> Nano Banana returns one image per call, so the script calls it 3× per slot to get
> your 3 variations. Google's docs site (`ai.google.dev`) is unreachable from this
> repo's dev environment (network egress policy), so double-check the current
> recommended model ID before a real run — there are signs of newer options
> ("Nano Banana 2" / `gemini-3.1-flash-image`, and `gemini-3-pro-image-preview`
> for higher-fidelity multi-reference character work) that couldn't be verified
> against a primary source from here.

```
npm i                                   # installs @google/genai
export GEMINI_API_KEY=your_key
node generate-images.mjs --dry          # plan only — parses prompts, no API calls
node generate-images.mjs --limit 5      # smoke test: 5 slots (15 images)
node generate-images.mjs                # the full run: 300 slots x 3 = 900 images
node scan-candidates.mjs                # index them
# open picker.html
```

It is **resumable** (existing files are skipped, so re-running retries only what's
missing), retries on rate-limit/5xx with backoff, writes `failures.json` for anything
that fails, and sets the aspect ratio per category (heroes 16:9, icons 1:1, etc.).
Useful flags: `--only 1,2,101`, `--cat icon`, `--concurrency 2`, `--delay 500`,
`--force`, `--model gemini-3-pro-image-preview` (higher quality).

**Character consistency:** for the `characters` category, each slot's character
sheet (`src/assets/images/illustrations/characters/<name>-character-sheet.png`)
is automatically attached as a reference image alongside the text prompt — pair
and group shots (e.g. "Robert + Helen") attach every sheet they need. This is
what CHARACTER-AUDIT-2026-08-14.md (in `tools/illustrations/`) recommends for
regenerating the identity-drift failures (`robert-001`, `robert-003`,
`maria-004`, `maria-005`) — those were generated before this existed. Use
`--no-ref` to fall back to the old text-only behavior.

**Heads up:** 900 images is a real API spend and will take a while — do `--limit 5`
first, eyeball the style, tweak `STYLE`/`FRAME` in `build-prompts.mjs` (mirroring into
`STYLE-LOCK.md`) and rerun `npm run prompts` if needed, then let the full run go.
