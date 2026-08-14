#!/usr/bin/env node
/**
 * Batch-generate CCA illustration candidates with Gemini "Nano Banana"
 * (gemini-2.5-flash-image) and drop them into candidates/ already named for
 * the picker: <id>-<n>.png
 *
 *   npm i @google/genai
 *   export GEMINI_API_KEY=...            # or GOOGLE_API_KEY
 *   node generate-images.mjs             # all 300 slots x 3 variations
 *   node generate-images.mjs --dry       # parse + plan only, no API calls
 *   node generate-images.mjs --limit 5   # first 5 slots (smoke test)
 *   node generate-images.mjs --only 1,2,101,901
 *   node generate-images.mjs --cat icon
 *   node generate-images.mjs --variants 3 --concurrency 2 --delay 0
 *   node generate-images.mjs --force     # regenerate even if files exist
 *   node generate-images.mjs --model gemini-3-pro-image-preview   # higher quality
 *   node generate-images.mjs --no-ref    # characters: skip character-sheet reference image
 *
 * Imagen note: Google deprecated the Imagen models (shutdown 2026-08-17) and
 * recommends Nano Banana, which is what this uses. Swap --model if you like —
 * as of this writing Google's own docs describe newer "Nano Banana 2"
 * (gemini-3.1-flash-image) and "Gemini 3 Pro Image" (gemini-3-pro-image-preview,
 * explicitly built for multi-reference character consistency, up to 14 inputs)
 * as current options, but that couldn't be verified against a primary source
 * from this environment (ai.google.dev / developers.googleblog.com / Vertex AI
 * docs are all blocked by the network egress policy here) — confirm the
 * current recommended model ID before relying on the hardcoded default below.
 *
 * Character-sheet reference images: for the `characters` category, each job's
 * `character` field (from manifest.json — a name, or comma-separated names for
 * pair/group shots) is used to look up `<name>-character-sheet.png` in
 * src/assets/images/illustrations/characters/ and attach it as a reference
 * image alongside the text prompt, so the model has a concrete visual anchor
 * instead of generating the character from adjectives alone. This is the fix
 * for the identity-drift failures found in CHARACTER-AUDIT-2026-08-14.md
 * (robert-001, robert-003, maria-004, maria-005) — those were generated before
 * this reference-image step existed. Disable with --no-ref to reproduce the
 * old (text-only) behavior.
 */
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const here = path.dirname(url.fileURLToPath(import.meta.url));
const a = process.argv.slice(2);
const has = n => a.includes(n);
const opt = (n, d) => { const i = a.indexOf(n); return i >= 0 ? a[i + 1] : d; };

const PROMPTS  = path.resolve(here, opt('--prompts', 'prompts-all-gemini.md'));
const MANIFEST = path.resolve(here, '../manifest.json');
const OUTDIR   = path.resolve(here, opt('--dir', 'candidates'));
const MODEL    = opt('--model', 'gemini-2.5-flash-image');
const VARIANTS = Number(opt('--variants', 3));
const CONC     = Number(opt('--concurrency', 2));
const DELAY    = Number(opt('--delay', 0));       // ms between calls per worker
const RETRIES  = Number(opt('--retries', 4));
const LIMIT    = opt('--limit', null);
const ONLY     = opt('--only', null);
const CAT      = opt('--cat', null);
const DRY      = has('--dry');
const FORCE    = has('--force');
const NOASPECT = has('--no-aspect');
const NOREF    = has('--no-ref');
const CHARDIR  = path.resolve(here, '../../../src/assets/images/illustrations/characters');

// ---- category -> aspect ratio (matches build-prompts.mjs) ----
const AR = {characters:'1:1',hero:'16:9',service:'4:3',community:'4:3',workshop:'4:3',
            device:'1:1',background:'16:9',marketing:'4:3',ui:'4:3',icon:'1:1'};

// ---- parse the prompt markdown ----
const md = fs.readFileSync(PROMPTS, 'utf8');
const manifest = JSON.parse(fs.readFileSync(MANIFEST,'utf8'));
const catById  = new Map(manifest.map(m => [m.id, m.category]));
const charById = new Map(manifest.map(m => [m.id, m.character]));
const re = /###\s+#(\d+)\s*·\s*([^\n]*)\n```\n([\s\S]*?)\n```/g;
let m, jobs = [];
while ((m = re.exec(md))) {
  const id = Number(m[1]);
  // strip the conversational "3 variations" instruction — we do variants via repeated calls
  const prompt = m[3].replace(/\s*Generate\s+\d+\s+distinct variations\.\s*$/i, '').trim();
  jobs.push({ id, name: m[2].trim(), prompt, cat: catById.get(id) || 'ui', character: charById.get(id) });
}

// ---- character-sheet reference images (characters category only) ----
const ALL_CHARACTERS = ['robert','maria','helen','carlos','ana','david'];
function refImagesFor(job) {
  if (NOREF || job.cat !== 'characters' || !job.character) return [];
  const names = job.character === 'All'
    ? ALL_CHARACTERS
    : job.character.split(',').map(s => s.trim().toLowerCase());
  const parts = [];
  for (const name of names) {
    const file = path.join(CHARDIR, `${name}-character-sheet.png`);
    if (!fs.existsSync(file)) {
      console.warn(`  ⚠ no character sheet for "${name}" (${file}) — generating without reference`);
      continue;
    }
    parts.push({ inlineData: { mimeType: 'image/png', data: fs.readFileSync(file).toString('base64') } });
  }
  return parts;
}

// ---- filters ----
if (CAT)   jobs = jobs.filter(j => j.cat === CAT);
if (ONLY)  { const set = new Set(ONLY.split(',').map(Number)); jobs = jobs.filter(j => set.has(j.id)); }
if (LIMIT) jobs = jobs.slice(0, Number(LIMIT));

fs.mkdirSync(OUTDIR, { recursive: true });
const pad = id => String(id).padStart(3, '0');
const target = (id, n) => path.join(OUTDIR, `${pad(id)}-${n}.png`);

// build the flat task list (slot x variant), skipping ones already done unless --force
let tasks = [];
for (const j of jobs)
  for (let n = 1; n <= VARIANTS; n++)
    if (FORCE || !fs.existsSync(target(j.id, n))) tasks.push({ ...j, n });

console.log(`prompts parsed : ${jobs.length} slots`);
console.log(`model          : ${MODEL}`);
console.log(`variants/slot  : ${VARIANTS}`);
console.log(`to generate    : ${tasks.length} image(s)${FORCE?' (force)':' (resumable — existing skipped)'}`);
console.log(`output         : ${path.relative(path.resolve(here,'../..'), OUTDIR)}/`);

if (DRY) {
  console.log('\n--dry: first 8 planned files:');
  tasks.slice(0, 8).forEach(t => {
    const refs = refImagesFor(t);
    const refNote = t.cat === 'characters' ? `  ref:${NOREF ? 'off' : refs.length}` : '';
    console.log(`  ${pad(t.id)}-${t.n}.png  [${t.cat} ${NOASPECT?'':AR[t.cat]}]${refNote}  "${t.prompt.slice(0,60)}…"`);
  });
  if (!tasks.length) console.log('  (nothing to do — all present, or filters matched none)');
  process.exit(0);
}

const KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
if (!KEY) { console.error('\n✗ Set GEMINI_API_KEY (or GOOGLE_API_KEY) in your environment.'); process.exit(1); }

let GoogleGenAI;
try { ({ GoogleGenAI } = await import('@google/genai')); }
catch { console.error('\n✗ Missing dependency. Run:  npm i @google/genai'); process.exit(1); }
const ai = new GoogleGenAI({ apiKey: KEY });

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function genOne(t, attempt = 1) {
  const config = NOASPECT ? {} : { imageConfig: { aspectRatio: AR[t.cat] } };
  const refs = refImagesFor(t);
  // with references: image part(s) first, then text — keeps the same shape @google/genai
  // expects for a single-turn multimodal prompt. Without references: bare string, unchanged.
  const contents = refs.length
    ? [...refs, { text: `${t.prompt} Match the exact character(s) shown in the reference image(s) above — same face, hair, skin tone, and outfit.` }]
    : t.prompt;
  try {
    const res = await ai.models.generateContent({ model: MODEL, contents, config });
    const parts = res?.candidates?.[0]?.content?.parts || [];
    const img = parts.find(p => p.inlineData?.data);
    if (!img) {
      const txt = parts.find(p => p.text)?.text || 'no image returned';
      throw new Error('no image (' + txt.slice(0, 80) + ')');
    }
    const ext = (img.inlineData.mimeType || 'image/png').split('/')[1].replace('jpeg','jpg');
    const file = target(t.id, t.n).replace(/\.png$/, '.' + ext);
    fs.writeFileSync(file, Buffer.from(img.inlineData.data, 'base64'));
    return { ok: true, file };
  } catch (e) {
    const msg = String(e?.message || e);
    const retriable = /429|500|502|503|504|quota|rate|overload|deadline/i.test(msg);
    if (retriable && attempt <= RETRIES) {
      const back = Math.min(30000, 1000 * 2 ** attempt) + Math.random() * 500;
      console.log(`  … retry ${pad(t.id)}-${t.n} in ${(back/1000).toFixed(1)}s (${msg.slice(0,50)})`);
      await sleep(back);
      return genOne(t, attempt + 1);
    }
    return { ok: false, error: msg };
  }
}

// ---- run with a small concurrency pool ----
let done = 0, okN = 0, failN = 0;
const failures = [];
const queue = tasks.slice();
async function worker(w) {
  while (queue.length) {
    const t = queue.shift();
    const r = await genOne(t);
    done++;
    if (r.ok) { okN++; process.stdout.write(`\r  [${done}/${tasks.length}] ok:${okN} fail:${failN}   ✓ ${path.basename(r.file)}        `); }
    else { failN++; failures.push({ id: t.id, n: t.n, error: r.error }); process.stdout.write(`\r  [${done}/${tasks.length}] ok:${okN} fail:${failN}   ✗ ${pad(t.id)}-${t.n}        `); }
    if (DELAY) await sleep(DELAY);
  }
}
console.log(`\ngenerating with concurrency ${CONC}…\n`);
await Promise.all(Array.from({ length: Math.max(1, CONC) }, (_, i) => worker(i)));

console.log(`\n\ndone. ok:${okN}  fail:${failN}`);
if (failures.length) {
  fs.writeFileSync(path.join(here, 'failures.json'), JSON.stringify(failures, null, 2));
  console.log(`⚠ ${failures.length} failed — see failures.json. Re-run the same command to retry just those (existing files are skipped).`);
}
console.log('\nnext:  node scan-candidates.mjs   then open picker.html');
