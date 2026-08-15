#!/usr/bin/env node
// Turns the illustration catalog into paste-ready generation prompts.
//   node build-prompts.mjs                    all 300, Gemini format
//   node build-prompts.mjs --cat characters   one category
//   node build-prompts.mjs --limit 8          a small sample
//   node build-prompts.mjs --tool midjourney  Midjourney syntax
//   node build-prompts.mjs --variants 3       ask for N options per item
// Style comes from STYLE-LOCK.md (single source of truth). Edit that, rerun.
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

// condensed style prefix carried in every prompt (full spec lives in STYLE-LOCK.md)
const STYLE = 'Warm friendly flat vector illustration, strictly flat 2D, rounded soft shapes, gentle flat shading, warm golden lighting, uncluttered. Palette only: cream #FDF6EC, sand #F8E9D5, orange #F4A259, clay #B95E23, sky #78B8D9, sage #8BAE7B, charcoal #343434. Never include: any text, letters, words or labels; logos or watermarks; 3D, CGI, clay or rendered depth of any kind; photorealism; animals; dark or cold tones; distorted anatomy or oversized, out-of-proportion people.';

const FRAME = {
  characters:'square, single figure or pair on a plain warm background, portrait feel',
  hero:'wide 16:9 cinematic scene with San Jacinto mountains and desert light, space for overlay text',
  service:'4:3 scene, characters mid-activity, warm sunlit interior',
  community:'4:3 community scene, warm and welcoming',
  workshop:'4:3 classroom/workshop scene, engaged people',
  device:'square, single device floating on cream with a soft shadow; any screen shows a simple abstract app interface, no faces or people',
  background:'wide minimal background, no characters, usable behind text',
  marketing:'4:3 clean composition with one clear focal point',
  ui:'4:3 clean UI-friendly composition with clear focal point',
  icon:'1:1 single simple symbol, thick rounded strokes, one or two palette colors, flat',
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
  return `${it.description}, ${FRAME[it.category]}, warm flat vector illustration, rounded soft shapes, warm golden lighting, palette cream F4A259 F8E9D5 B95E23 78B8D9 8BAE7B, flat design --ar ${AR[it.category]} --no text letters logo watermark 3d cgi render photorealism animals dark`;
}
const fmt = TOOL==='midjourney'?midjourney:gemini;

const lines = [];
lines.push(`# CCA Illustration Prompts — ${TOOL}${CAT?` · ${CAT}`:''}`);
lines.push(`# ${items.length} prompts · style locked to STYLE-LOCK.md · generated ${new Date().toISOString().slice(0,10)}`);
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
