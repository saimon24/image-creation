// usage: node sheet.mjs <suffix> <out.png> [overlay=1]  -> contact sheet of drafts, optional plot/corner outlines
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { PLOTS, PLOT_R, CORNERS, THEMES } from './themes.mjs';
const require = createRequire('/Users/ioannis/dev/ImageCreation/package.json');
const sharp = require('sharp');
const V = '/Users/ioannis/dev/ImageCreation/output/farm-map-v2/valleys';
const [suf = 'a', out, overlay = '0'] = process.argv.slice(2);
const SC = Number(process.env.SC || 1), T = ([x, y]) => [531 + (x - 531) * SC, 858 + (y - 858) * SC];
const TW = 320, TH = 480, COLS = 5;
const ov = `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1536">${Object.values(PLOTS).map(T).map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="${PLOT_R[0] * SC}" ry="${PLOT_R[1] * SC}" fill="none" stroke="red" stroke-width="4"/>`).join('')}${Object.values(CORNERS).map(([a, b, c, d]) => [...T([a, b]), ...T([c, d])]).map(([a, b, c, d]) => `<rect x="${a}" y="${b}" width="${c - a}" height="${d - b}" fill="none" stroke="magenta" stroke-width="4"/>`).join('')}</svg>`;
const ids = Object.keys(THEMES).filter((id) => fs.existsSync(`${V}/drafts/${id}_${suf}.png`));
const tiles = [];
for (const [i, id] of ids.entries()) {
  let img = sharp(`${V}/drafts/${id}_${suf}.png`).resize(1024, 1536);
  if (overlay === '1') img = sharp(await img.composite([{ input: Buffer.from(ov) }]).png().toBuffer());
  const label = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${TW}" height="28"><rect width="${TW}" height="28" fill="black" opacity="0.6"/><text x="8" y="20" font-family="Helvetica" font-size="18" fill="white">${i + 1}. ${THEMES[id].name}</text></svg>`);
  tiles.push({ input: await img.resize(TW, TH).composite([{ input: label, top: 0, left: 0 }]).png().toBuffer(), left: (i % COLS) * TW, top: Math.floor(i / COLS) * TH });
}
await sharp({ create: { width: COLS * TW, height: Math.ceil(ids.length / COLS) * TH, channels: 3, background: '#fff' } }).composite(tiles).png().toFile(out);
console.log(out, ids.length);
