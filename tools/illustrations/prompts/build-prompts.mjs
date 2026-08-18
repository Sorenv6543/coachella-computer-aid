#!/usr/bin/env node
// Turns the illustration catalog into paste-ready generation prompts.
//   node build-prompts.mjs                    all 300, Gemini format
//   node build-prompts.mjs --cat characters   one category
//   node build-prompts.mjs --limit 8          a small sample
//   node build-prompts.mjs --tool midjourney  Midjourney syntax
//   node build-prompts.mjs --variants 3       ask for N options per item
// Style is hardcoded below in STYLE/FRAME — edit those constants, not STYLE-LOCK.md.
// STYLE-LOCK.md is a human-readable mirror of this spec (from the Brand Bible); it
// isn't read by this script, so keep the two in sync by hand when either changes.
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const here = path.dirname(url.fileURLToPath(import.meta.url));
const a = process.argv.slice(2);
const opt = (n,d)=>{const i=a.indexOf(n);return i>=0?a[i+1]:d};
const CAT = opt('--cat',null);
const LIMIT = opt('--limit',null);
const TOOL = opt('--tool','gemini');
const VARIANTS = Number(opt('--variants',1));
const OUT = opt('--out', null);

const manifest = JSON.parse(fs.readFileSync(path.resolve(here,'../manifest.json'),'utf8'));

// condensed style prefix carried in every prompt (mirrored in STYLE-LOCK.md, not read from it)
const STYLE = 'Warm friendly flat vector illustration, rounded soft shapes, gentle flat shading, warm golden lighting, uncluttered. Palette only: cream #FDF6EC, sand #F8E9D5, orange #F4A259, clay #B95E23, sky #78B8D9, sage #8BAE7B, charcoal #343434. No text, no logos, not photorealistic, no dark or cold tones.';

const FRAME = {
  characters:'square, single figure or pair on a plain warm background, portrait feel',
  hero:'wide 16:9 cinematic scene with San Jacinto mountains and desert light, space for overlay text',
  service:'4:3 scene, characters mid-activity, warm sunlit interior',
  community:'4:3 community scene, warm and welcoming',
  workshop:'4:3 classroom/workshop scene, engaged people',
  device:'square, single device floating on cream with a soft shadow',
  background:'wide minimal background, no characters, usable behind text',
  marketing:'4:3 clean composition with one clear focal point',
  ui:'4:3 clean UI-friendly composition with clear focal point',
  icon:'1:1 single simple icon glyph ONLY — isolated pictogram like an app icon, filling most of the frame, on a single FLAT SOLID warm card color (cream #FDF6EC or sand #F8E9D5 or orange #F4A259) that completely fills the square edge-to-edge. Never transparent, never a checkerboard pattern, never black, never pure white. No scene, no landscape, no room, no background illustration, no characters, no props beyond the symbol itself. Thick rounded strokes, one or two palette colors, flat.',
};
const AR = {characters:'1:1',hero:'16:9',service:'4:3',community:'4:3',workshop:'4:3',device:'1:1',background:'16:9',marketing:'4:3',ui:'4:3',icon:'1:1'};

let items = manifest;
if (CAT) items = items.filter(i=>i.category===CAT);
if (LIMIT) items = items.slice(0, Number(LIMIT));

function gemini(it){
  const v = VARIANTS>1 ? ` Generate ${VARIANTS} distinct variations.` : '';
  return `${STYLE} Subject: ${it.description} ${FRAME[it.category]}.${v}`;
}
function midjourney(it){
  const v = VARIANTS>1 ? '' : ''; // MJ always returns 4
  return `${it.description}, ${FRAME[it.category]}, warm flat vector illustration, rounded soft shapes, warm golden lighting, palette cream F4A259 F8E9D5 B95E23 78B8D9 8BAE7B, flat design --ar ${AR[it.category]} --no text logo photorealism dark`;
}
const fmt = TOOL==='midjourney'?midjourney:gemini;

const lines = [];
lines.push(`# CCA Illustration Prompts — ${TOOL}${CAT?` · ${CAT}`:''}`);
lines.push(`# ${items.length} prompts · style per STYLE-LOCK.md spec (hardcoded in this script) · generated ${new Date().toISOString().slice(0,10)}`);
lines.push('');
let cur='';
for (const it of items){
  if (it.category!==cur){ cur=it.category; lines.push(`\n## ${cur.toUpperCase()}\n`); }
  lines.push(`### #${String(it.id).padStart(3,'0')} · ${it.name}`);
  lines.push('```');
  lines.push(fmt(it));
  lines.push('```');
  lines.push('');
}
const out = lines.join('\n');
const file = OUT || path.resolve(here, `prompts-${CAT||'all'}-${TOOL}.md`);
fs.writeFileSync(file, out);
console.log(`wrote ${items.length} prompts → ${path.basename(file)}`);
