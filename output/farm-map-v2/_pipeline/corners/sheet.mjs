// usage: node sheet.mjs <outDir> -> per theme a 9x4 sheet (states x projects) of its corner sprites on its own ground
import fs from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire('/Users/ioannis/dev/ImageCreation/package.json');
const sharp = require('sharp');
const K = '/Users/ioannis/dev/ImageCreation/output/farm-map-v2/corners/keyed', V = '/Users/ioannis/dev/ImageCreation/output/farm-map-v2/valleys';
const [out] = process.argv.slice(2);
fs.mkdirSync(out, { recursive: true });
const P = ['mine', 'dock', 'tree', 'forge'], S = ['stage0', 'stage1', 'stage2', 'stage3', 'level1', 'level2', 'level3', 'level4', 'level5'], T = 160;
for (const theme of fs.readdirSync(K).sort()) {
  const ground = await sharp(await sharp(`${V}/drafts/${theme}_f.png`).resize(1024, 1536).png().toBuffer()).extract({ left: 380, top: 620, width: 220, height: 220 }).resize(T, T).png().toBuffer();
  const tiles = [];
  for (const [r, p] of P.entries()) for (const [c, s] of S.entries()) {
    const sp = await sharp(`${K}/${theme}/${p}/${s}.png`).resize(T, T).png().toBuffer();
    tiles.push({ input: await sharp(ground).composite([{ input: sp }]).png().toBuffer(), left: c * T, top: 30 + r * T });
  }
  tiles.push({ input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${9 * T}" height="30"><text x="6" y="22" font-size="20" font-family="Helvetica">${theme} — Ruine, Stufe 1–3, Level 1–5 (Zeilen: Mine, Steg, Baum, Schmiede)</text></svg>`), left: 0, top: 0 });
  await sharp({ create: { width: 9 * T, height: 30 + 4 * T, channels: 3, background: '#fff' } }).composite(tiles).png().toFile(`${out}/${theme}.png`);
}
console.log('done');
