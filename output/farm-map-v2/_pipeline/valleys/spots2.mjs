// usage: node spots2.mjs <suffix> <out.png> -> 15 themes x 15 measured deco spots (zoomed foot + body), raw drafts
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { THEMES } from './layout.mjs';
const require = createRequire('/Users/ioannis/dev/ImageCreation/package.json');
const sharp = require('sharp');
const V = '/Users/ioannis/dev/ImageCreation/output/farm-map-v2/valleys';
const [suf, out] = process.argv.slice(2);
const SC = { 0: 0.125, 1: 0.12, 2: 0.12, 3: 0.125, 4: 0.12, 5: 0.095, 6: 0.095, 7: 0.095, 8: 0.095, 9: 0.12, 10: 0.1, 11: 0.095, 12: 0.095, 13: 0.095, 14: 0.095 };
const T = 110, ids = Object.keys(THEMES).filter((id) => fs.existsSync(`${V}/measure/${id}.json`));
const tiles = [];
for (const [r, id] of ids.entries()) {
  const m = JSON.parse(fs.readFileSync(`${V}/measure/${id}.json`, 'utf8'));
  const sc = Object.fromEntries(Object.entries(m.scene).map(([k, v]) => [k, v / 2]));
  const buf = await sharp(`${V}/drafts/${id}_${suf}.png`).resize(1024, 1536).png().toBuffer();
  for (const [c, [k, p]] of Object.entries(m.decorationPoints).entries()) {
    const x = sc.left + p.x * sc.width, y = sc.top + p.y * sc.height, w = SC[k] * sc.width;
    const box = { left: Math.round(Math.max(0, Math.min(1024 - 150, x - 75))), top: Math.round(Math.max(0, Math.min(1536 - 150, y - 115))), width: 150, height: 150 };
    const ov = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150"><rect x="${x - box.left - w / 2}" y="${y - box.top - w * 0.58}" width="${w}" height="${w * 0.72}" fill="none" stroke="#00e5ff" stroke-width="2" stroke-dasharray="5 3"/><ellipse cx="${x - box.left}" cy="${y - box.top}" rx="${w * 0.36}" ry="${w * 0.1}" fill="none" stroke="#00e5ff" stroke-width="3"/></svg>`);
    const crop = await sharp(await sharp(await sharp(buf).extract(box).png().toBuffer()).composite([{ input: ov }]).png().toBuffer()).resize(T, T).png().toBuffer();
    tiles.push({ input: crop, left: 150 + c * T, top: 24 + r * T });
  }
  tiles.push({ input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="150" height="${T}"><text x="4" y="60" font-size="14" font-family="Helvetica">${THEMES[id].name}</text></svg>`), left: 0, top: 24 + r * T });
}
tiles.push({ input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${150 + 15 * T}" height="24">${Array.from({ length: 15 }, (_, c) => `<text x="${150 + c * T + 40}" y="18" font-size="16" font-family="Helvetica">D${c}</text>`).join('')}</svg>`), left: 0, top: 0 });
await sharp({ create: { width: 150 + 15 * T, height: ids.length * T + 24, channels: 3, background: '#fff' } }).composite(tiles).png().toFile(out);
