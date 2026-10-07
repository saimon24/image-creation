// usage: node spots.mjs <suffix> <out.png> -> 15 themes x 15 deco spots, zoomed crops of each spot's foot + body
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { DECOS, THEMES } from './layout.mjs';
const require = createRequire('/Users/ioannis/dev/ImageCreation/package.json');
const sharp = require('sharp');
const V = '/Users/ioannis/dev/ImageCreation/output/farm-map-v2/valleys';
const [suf, out] = process.argv.slice(2);
const T = 110, ids = Object.keys(THEMES).filter((id) => fs.existsSync(`${V}/final/${id}_${suf}.png`));
const tiles = [];
for (const [r, id] of ids.entries()) {
  const buf = await sharp(`${V}/final/${id}_${suf}.png`).resize(1024, 1536).png().toBuffer();
  for (const [c, [x, y]] of Object.values(DECOS).entries()) {
    const box = { left: Math.max(0, x - 60), top: Math.max(0, y - 95), width: 120, height: 125 };
    const ov = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="120" height="125"><ellipse cx="${x - box.left}" cy="${y - box.top}" rx="44" ry="20" fill="none" stroke="#00e5ff" stroke-width="2"/></svg>`);
    const crop = await sharp(await sharp(await sharp(buf).extract(box).png().toBuffer()).composite([{ input: ov }]).png().toBuffer()).resize(T, T).png().toBuffer();
    tiles.push({ input: crop, left: 150 + c * T, top: r * T });
  }
  tiles.push({ input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="150" height="${T}"><text x="4" y="60" font-size="14" font-family="Helvetica">${THEMES[id].name}</text></svg>`), left: 0, top: r * T });
}
const head = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${150 + 15 * T}" height="24">${Object.keys(DECOS).map((k, c) => `<text x="${150 + c * T + 40}" y="18" font-size="16" font-family="Helvetica">D${k}</text>`).join('')}</svg>`);
await sharp({ create: { width: 150 + 15 * T, height: ids.length * T + 24, channels: 3, background: '#fff' } }).composite([...tiles.map((t) => ({ ...t, top: t.top + 24 })), { input: head, left: 0, top: 0 }]).png().toFile(out);
