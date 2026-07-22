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
 *
 * Imagen note: Google deprecated the Imagen models (shutdown 2026-08-17) and
 * recommends Nano Banana, which is what this uses. Swap --model if you like.
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

// ---- category -> aspect ratio (matches build-prompts.mjs) ----
const AR = {characters:'1:1',hero:'16:9',service:'4:3',community:'4:3',workshop:'4:3',
            device:'1:1',background:'16:9',marketing:'4:3',ui:'4:3',icon:'1:1'};

// ---- parse the prompt markdown ----
const md = fs.readFileSync(PROMPTS, 'utf8');
const catById = new Map(JSON.parse(fs.readFileSync(MANIFEST,'utf8')).map(m => [m.id, m.category]));
const re = /###\s+#(\d+)\s*·\s*([^\n]*)\n```\n([\s\S]*?)\n```/g;
let m, jobs = [];
while ((m = re.exec(md))) {
  const id = Number(m[1]);
  // strip the conversational "3 variations" instruction — we do variants via repeated calls
  const prompt = m[3].replace(/\s*Generate\s+\d+\s+distinct variations\.\s*$/i, '').trim();
  jobs.push({ id, name: m[2].trim(), prompt, cat: catById.get(id) || 'ui' });
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
  tasks.slice(0, 8).forEach(t => console.log(`  ${pad(t.id)}-${t.n}.png  [${t.cat} ${NOASPECT?'':AR[t.cat]}]  "${t.prompt.slice(0,60)}…"`));
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
  try {
    const res = await ai.models.generateContent({ model: MODEL, contents: t.prompt, config });
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
