#!/usr/bin/env node
/**
 * Turn picks.json (exported from picker.html) into named asset files.
 * Copies each chosen candidate to the canonical convention the first tool reads:
 *
 *     <prefix>-<NNN>-<slug>.<ext>       e.g.  robert-001-portrait.png
 *                                             icon-901-computer.png
 *                                             hero-101-san-jacinto-mountains.png
 *
 *   node apply-picks.mjs --dry            # preview names, copy nothing
 *   node apply-picks.mjs                  # copy chosen candidates into src/…/illustrations/<category>/
 *   node apply-picks.mjs --clean          # also remove stale files for the same id first
 *   node apply-picks.mjs --flat           # don't split into per-category subfolders
 *   node apply-picks.mjs --picks other.json --out some/dir
 *
 * Prefix rule: single character -> that name (robert); multiple -> joined (robert-helen);
 * "All" -> cast; no character (icons/devices/backgrounds/etc.) -> the category.
 * After running, run  node ../scan.mjs  so status flips to "exported".
 * Never hand-edit the manifest — scan.mjs derives status from the files this writes.
 */
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const here = path.dirname(url.fileURLToPath(import.meta.url));
const a = process.argv.slice(2);
const has = n => a.includes(n);
const opt = (n, d) => { const i = a.indexOf(n); return i >= 0 ? a[i + 1] : d; };

const repoRoot = path.resolve(here, '../../..');                 // tools/illustrations/prompts -> repo root
const PICKS = path.resolve(here, opt('--picks', 'picks.json'));
const OUT   = path.resolve(opt('--out', path.join(repoRoot, 'src/assets/images/illustrations')));
const DRY   = has('--dry');
const CLEAN = has('--clean');
const FLAT  = has('--flat');

if (!fs.existsSync(PICKS)) {
  console.error(`✗ No picks file at ${path.relative(repoRoot, PICKS)}.\n  Export one from picker.html first (Export picks.json), and place it next to this script.`);
  process.exit(1);
}
const picks = JSON.parse(fs.readFileSync(PICKS, 'utf8'));
const manifest = JSON.parse(fs.readFileSync(path.resolve(here, '../manifest.json'), 'utf8'));
const byId = new Map(manifest.map(m => [m.id, m]));

const pad = id => String(id).padStart(3, '0');
const slugify = s => s.normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
  .toLowerCase().replace(/·/g, ' ').replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '').slice(0, 40).replace(/-+$/,'');

function prefixFor(item) {
  const c = item.character;
  if (!c) return item.category;
  if (c === 'All') return 'all';   // scan.mjs checks first token == first character, lowercased
  return c.split(',').map(x => slugify(x.trim())).filter(Boolean).join('-') || item.category;
}
function slugFor(item) {
  let raw = item.name;
  const c = item.character;
  if (c && c !== 'All') for (const nm of c.split(',')) {           // drop leading character name(s)
    raw = raw.replace(new RegExp('^\\s*' + nm.trim() + '\\s*[·+,-]*\\s*', 'i'), '');
  }
  return slugify(raw) || slugify(item.name) || 'illustration';
}

// recursive walk to find/remove stale same-id files
function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(d => {
    const p = path.join(dir, d.name);
    return d.isDirectory() ? walk(p) : [p];
  });
}

let applied = 0, regen = 0, missing = 0, cleaned = 0;
const rows = [];
const existing = walk(OUT);

for (const p of picks) {
  const item = byId.get(p.id);
  if (!item) { console.warn(`  ? pick id ${p.id} not in catalog — skipped`); continue; }
  if (p.regen || !p.pick) { regen++; continue; }

  const src = path.resolve(here, p.pick);
  if (!fs.existsSync(src)) { missing++; rows.push([pad(p.id), '✗ source missing', p.pick]); continue; }

  const ext = path.extname(src).replace('.', '') || 'png';
  const fname = `${prefixFor(item)}-${pad(item.id)}-${slugFor(item)}.${ext}`;
  const destDir = FLAT ? OUT : path.join(OUT, item.category);
  const dest = path.join(destDir, fname);

  // stale files for this id (different name) currently on disk
  const stale = existing.filter(f => new RegExp(`-${pad(item.id)}-`).test(path.basename(f)) && f !== dest);

  rows.push([pad(item.id), path.relative(repoRoot, dest), stale.length ? `(replaces ${stale.length})` : '']);
  if (DRY) { applied++; continue; }

  if (CLEAN) for (const f of stale) { fs.rmSync(f); cleaned++; }
  fs.mkdirSync(destDir, { recursive: true });
  fs.copyFileSync(src, dest);
  applied++;
}

console.log(`\npicks file : ${path.relative(repoRoot, PICKS)}`);
console.log(`output     : ${path.relative(repoRoot, OUT)}/${FLAT ? '' : '<category>/'}`);
console.log(`mode       : ${DRY ? 'DRY (no files written)' : (CLEAN ? 'copy + clean stale' : 'copy')}\n`);
for (const [id, dest, note] of rows.slice(0, DRY ? 999 : 12))
  console.log(`  #${id}  ${dest}  ${note}`);
if (!DRY && rows.length > 12) console.log(`  … and ${rows.length - 12} more`);

console.log(`\n${DRY ? 'would apply' : 'applied'}: ${applied}   skipped(regenerate): ${regen}   missing source: ${missing}${CLEAN ? `   stale removed: ${cleaned}` : ''}`);
if (!CLEAN && rows.some(r => r[2].startsWith('(replaces')))
  console.log(`note: some ids already have a differently-named file. Re-run with --clean to prune duplicates.`);
if (!DRY) console.log(`\nnext:  cd .. && node scan.mjs   → these flip to "exported"`);
