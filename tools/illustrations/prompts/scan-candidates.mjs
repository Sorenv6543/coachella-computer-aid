#!/usr/bin/env node
// Indexes the Gemini candidate images so the picker can show them.
//   node scan-candidates.mjs [--dir candidates]
// Save each Gemini output as  candidates/<id>-<n>.<ext>   e.g. 001-1.png, 001-2.png, 001-3.png
// (id = zero-padded catalog id; n = which of the 3 variations).
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const here = path.dirname(url.fileURLToPath(import.meta.url));
const a = process.argv.slice(2);
const DIR = path.resolve(here, (a.indexOf('--dir')>=0?a[a.indexOf('--dir')+1]:'candidates'));
const manifest = JSON.parse(fs.readFileSync(path.resolve(here,'../manifest.json'),'utf8'));
const ids = new Set(manifest.map(m=>m.id));

const files = fs.existsSync(DIR)
  ? fs.readdirSync(DIR).filter(f=>/\.(png|jpe?g|webp)$/i.test(f)) : [];

const cand = {}; const orphans = [];
for (const f of files){
  const m = f.match(/^(\d{1,3})[-_.]/);           // leading id then a separator
  if (!m){ orphans.push(f); continue; }
  const id = Number(m[1]);
  if (!ids.has(id)){ orphans.push(`${f} (id ${id} not in catalog)`); continue; }
  (cand[id] ??= []).push('candidates/'+f);
}
for (const id in cand) cand[id].sort();

const data = { generatedAt:new Date().toISOString(), items:manifest, candidates:cand };
fs.writeFileSync(path.resolve(here,'picker-data.generated.js'),
  'window.CCA_PICKER = '+JSON.stringify(data)+';\n');

const withArt = Object.keys(cand).length;
const counts = {0:0,1:0,2:0,3:0,more:0};
for (const m of manifest){ const n=(cand[m.id]||[]).length; counts[n>3?'more':n]++; }
console.log(`\ncandidates dir : ${path.relative(path.resolve(here,'../..'),DIR)}`);
console.log(`slots with art : ${withArt}/${manifest.length}`);
console.log(`  3 candidates : ${counts[3]}`);
console.log(`  2 candidates : ${counts[2]}`);
console.log(`  1 candidate  : ${counts[1]}`);
console.log(`  0 (awaiting) : ${counts[0]}`);
if (counts.more) console.log(`  >3 candidates: ${counts.more}`);
if (orphans.length){ console.log(`\n⚠ ${orphans.length} unmatched file(s):`); orphans.forEach(o=>console.log('  '+o)); }
console.log('\n✓ wrote picker-data.generated.js — open picker.html');
