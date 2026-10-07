// usage: node install.mjs <TinyHarvest repo> -> copies every complete theme set of corner sprites
// (corners/keyed/<theme>/<project>/<state>.png) as webp and writes engine/farm-project-theme-images.ts
import fs from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire('/Users/ioannis/dev/ImageCreation/package.json');
const sharp = require('sharp');
const K = '/Users/ioannis/dev/ImageCreation/output/farm-map-v2/corners/keyed';
const [repo] = process.argv.slice(2);
const PROJECTS = ['mine', 'dock', 'tree', 'forge'];
const STATES = ['stage0', 'stage1', 'stage2', 'stage3', 'level1', 'level2', 'level3', 'level4', 'level5'];
const out = {};
for (const theme of fs.readdirSync(K).sort()) {
  for (const p of PROJECTS) {
    if (!STATES.every((s) => fs.existsSync(`${K}/${theme}/${p}/${s}.png`))) { console.warn(`${theme}/${p} incomplete, skipped`); continue; }
    const dir = `${repo}/assets/images/farm-map/projects/themes/${theme}/${p}`;
    fs.mkdirSync(dir, { recursive: true });
    for (const s of STATES) await sharp(`${K}/${theme}/${p}/${s}.png`).resize(384, 384, { kernel: 'lanczos3' }).webp({ quality: 85, alphaQuality: 90 }).toFile(`${dir}/${s}.webp`);
    (out[theme] ||= {})[p] = STATES.map((s) => `require('@/assets/images/farm-map/projects/themes/${theme}/${p}/${s}.webp')`);
  }
}
const file = `${repo}/engine/farm-project-theme-images.ts`;
let src = fs.readFileSync(file, 'utf8');
src = src.slice(0, src.indexOf('export const THEME_PROJECT_IMAGES')) +
  'export const THEME_PROJECT_IMAGES: Record<string, Partial<Record<FarmProjectId, ImageSourcePropType[]>>> = {\n' +
  Object.entries(out).map(([t, ps]) => `  ${t}: {\n` + Object.entries(ps).map(([p, rs]) => `    ${p}: [\n${rs.map((r) => `      ${r},`).join('\n')}\n    ],\n`).join('') + '  },\n').join('') + '};\n';
fs.writeFileSync(file, src);
console.log('installed', Object.keys(out).length, 'themes');
