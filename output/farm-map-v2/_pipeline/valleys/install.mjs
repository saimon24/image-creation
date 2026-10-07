// usage: node install.mjs <suffix> <TinyHarvest repo> -> copies the theme paintings (2048x3072),
// river assets and writes engine/farm-map-theme-geometry.ts + engine/farm-map-theme-rivers.ts
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
const require = createRequire('/Users/ioannis/dev/ImageCreation/package.json');
const sharp = require('sharp');
const V = '/Users/ioannis/dev/ImageCreation/output/farm-map-v2/valleys';
const [suf, repo] = process.argv.slice(2);
const T = `${repo}/assets/images/farm-map/scene/themes`;
const rivers = JSON.parse(fs.readFileSync(`${V}/rivers_${suf}/rivers.json`, 'utf8'));
const ids = fs.readdirSync(`${V}/measure`).filter((f) => f.endsWith('.json')).map((f) => f.replace('.json', '')).sort();
for (const id of ids) {
  await sharp(`${V}/drafts/${id}_${suf}.png`).resize(2048, 3072, { kernel: 'lanczos3' }).webp({ quality: 88 }).toFile(`${T}/${id}.webp`);
  if (!rivers[id]) continue;
  for (const f of ['_river.webp', '_river_mask.webp', '_river_flow.png']) fs.copyFileSync(`${V}/rivers_${suf}/${id}${f}`, `${T}/${id}${f}`);
}
execFileSync('node', [new URL('./gen_ts.mjs', import.meta.url).pathname, `${repo}/engine/farm-map-theme-geometry.ts`], { stdio: 'inherit' });
let s = fs.readFileSync(`${repo}/engine/farm-map-theme-rivers.ts`, 'utf8');
s = s.slice(0, s.indexOf('export const THEME_RIVERS')) + 'export const THEME_RIVERS: Record<string, ThemeRiver> = {\n' +
  Object.entries(rivers).sort().map(([id, r]) => `  ${id}: {\n    crop: { left: ${r.crop.left}, top: ${r.crop.top}, width: ${r.crop.width}, height: ${r.crop.height} },\n    sMax: ${r.sMax},\n    nScale: ${r.nScale},\n    image: require('@/assets/images/farm-map/scene/themes/${id}_river.webp'),\n    mask: require('@/assets/images/farm-map/scene/themes/${id}_river_mask.webp'),\n    flow: require('@/assets/images/farm-map/scene/themes/${id}_river_flow.png'),\n  },\n`).join('') + '};\n';
fs.writeFileSync(`${repo}/engine/farm-map-theme-rivers.ts`, s);
console.log('installed', ids.length, 'paintings,', Object.keys(rivers).length, 'rivers');
