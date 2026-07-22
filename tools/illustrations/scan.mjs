#!/usr/bin/env node
// Reconciles the illustration catalog (manifest.json) against files on disk.
//
//   node scan.mjs                 report + regenerate status.generated.js/json
//   node scan.mjs --dry           report only, write nothing
//   node scan.mjs --assets <dir>  point at a different assets root
//
// manifest.json is the human-maintained catalog (id, category, name, description,
// character, designed). "designed" = drawn in the kit / brand bible but not yet
// exported as a standalone asset. Everything else here is derived from disk.
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const here = path.dirname(url.fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const flag = n => args.includes(n);
const opt  = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d; };

const ROOT     = path.resolve(here, opt('--assets', '../../src/assets/images/illustrations'));
const MANIFEST = path.resolve(here, opt('--manifest', 'manifest.json'));
const DRY      = flag('--dry');

const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
const byId = new Map(manifest.map(m => [m.id, m]));

const walk = dir => !fs.existsSync(dir) ? [] :
  fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p)
      : /\.(png|jpe?g|webp|svg)$/i.test(e.name) ? [p] : [];
  });

const files = walk(ROOT);
const IDCONV = /-(\d{3})-/;                 // canonical: <char>-NNN-<slug>.ext
const SHEET  = /-character-sheet\.\w+$/i;   // reference art, not catalog

const exported = new Map();
const orphans = [], sheets = [], nonconform = [];

for (const f of files) {
  const base = path.basename(f), rel = path.relative(ROOT, f);
  if (SHEET.test(base)) { sheets.push(rel); continue; }
  const m = base.match(IDCONV);
  if (!m) { nonconform.push(rel); continue; }
  const id = Number(m[1]);
  if (!byId.has(id)) { orphans.push({ file: rel, id }); continue; }
  (exported.get(id) ?? exported.set(id, []).get(id)).push(rel);
}

const collisions = [...exported].filter(([, fl]) => fl.length > 1)
  .map(([id, fl]) => ({ id, files: fl }));

const mislabels = [];
for (const [id, fl] of exported) {
  const item = byId.get(id);
  if (item.category !== 'characters') continue;
  const want = (item.character || '').split(',')[0].toLowerCase();
  for (const rel of fl) {
    const prefix = path.basename(rel).split('-')[0].toLowerCase();
    if (want && prefix && prefix !== want)
      mislabels.push({ file: rel, id, saysCharacter: prefix, itemCharacter: item.character, itemName: item.name });
  }
}

const counts = { exported: 0, designed: 0, planned: 0 };
const items = manifest.map(m => {
  const fl = exported.get(m.id) || [];
  const status = fl.length ? 'exported' : m.designed ? 'designed' : 'planned';
  counts[status]++;
  return { ...m, status, file: fl[0] || null, files: fl };
});

const anomalies = { collisions, mislabels, nonconform, orphans };
const report = { generatedAt: new Date().toISOString(), assetsRoot: path.relative(path.resolve(here, '../..'), ROOT), total: manifest.length, imageFiles: files.length, referenceSheets: sheets.length, counts, anomalies, items };

// ---- console report ----
const pct = n => `${String(n).padStart(3)} (${Math.round(n / manifest.length * 100)}%)`;
console.log('\n════ CCA Illustration Reconciliation ════');
console.log(`catalog  : ${manifest.length} items`);
console.log(`exported : ${pct(counts.exported)}   files on disk`);
console.log(`designed : ${pct(counts.designed)}   in kit/bible, not exported`);
console.log(`planned  : ${pct(counts.planned)}   not started`);
console.log(`\nimage files: ${files.length}  (${sheets.length} reference sheets excluded)`);
const warn = (label, arr, fmt) => { if (arr.length) { console.log(`\n⚠ ${label}:`); arr.forEach(x => console.log('  ' + fmt(x))); } };
warn('ID COLLISIONS', collisions, c => `#${c.id}: ${c.files.join('  ,  ')}`);
warn('MISLABELED', mislabels, m => `${m.file} → #${m.id} is "${m.itemName}" (${m.itemCharacter}), file says "${m.saysCharacter}"`);
warn('NON-CONFORMING NAMES', nonconform, f => f);
warn('ORPHAN IDS (file id not in catalog)', orphans, o => `${o.file} (id ${o.id})`);
const totalWarn = collisions.length + mislabels.length + nonconform.length + orphans.length;
console.log(totalWarn ? `\n${totalWarn} issue(s) to resolve.` : '\n✓ no issues.');

if (!DRY) {
  fs.writeFileSync(path.join(here, 'status.generated.json'), JSON.stringify(report, null, 2) + '\n');
  fs.writeFileSync(path.join(here, 'status.generated.js'), 'window.CCA_STATUS = ' + JSON.stringify(report) + ';\n');
  console.log('\n✓ wrote status.generated.js / .json');
} else {
  console.log('\n(dry run — nothing written)');
}
