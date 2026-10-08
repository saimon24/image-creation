// usage: node sheet_standard.mjs <coveDraft.png> <outDir>
// Review sheets for the new standard corner sprites (corners/keyed_standard):
//  standard_corners_sheet.png — per project two rows (NOW: app sprite on world_sunrise; NEW: new sprite,
//    the dock on the cove draft), 9 states, each cell = the sprite's own corner of the painting at its
//    in-app box (SCENE_WORLD projects, foot at 0.92), 200 px cells (≈ 100 pt @2x)
//  standard_valley_L1.png / _L5.png — the whole valley (cove draft) with all four new sprites placed
import fs from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire('/Users/ioannis/dev/ImageCreation/package.json');
const sharp = require('sharp');
const APP = '/Users/ioannis/dev/TinyHarvest-farmmap/assets/images/farm-map';
const K = '/Users/ioannis/dev/ImageCreation/output/farm-map-v2/corners/keyed_standard';
const [cove, out] = process.argv.slice(2);
fs.mkdirSync(out, { recursive: true });
const SC = { left: 335, top: 624, width: 1434, height: 1979 };
const SPOTS = { mine: { x: 0.2, y: 0.34, scale: 0.25 }, dock: { x: 0.9, y: 0.32, scale: 0.22 }, tree: { x: 0.11, y: 0.99, scale: 0.24 }, forge: { x: 0.9, y: 0.99, scale: 0.22 } };
const P = Object.keys(SPOTS), S = ['stage0', 'stage1', 'stage2', 'stage3', 'level1', 'level2', 'level3', 'level4', 'level5'];
const NAMES = ['Ruin', 'Step 1', 'Step 2', 'Step 3', 'L1', 'L2', 'L3', 'L4', 'L5'];
const box = (p) => { const s = SPOTS[p], size = Math.round(s.scale * SC.width), fx = SC.left + s.x * SC.width, fy = SC.top + s.y * SC.height; return { left: Math.round(fx - size / 2), top: Math.round(fy - size * 0.92), size }; };
const oldWorld = await sharp(`${APP}/scene/world_sunrise.webp`).removeAlpha().png().toBuffer();
const newWorld = await sharp(cove).removeAlpha().png().toBuffer();
const T = 200, LW = 150, HDR = 34;
const svg = (w, h, t, size = 18, bg = '#fff') => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><rect width="${w}" height="${h}" fill="${bg}"/><text x="8" y="${Math.round(h / 2 + size / 3)}" font-size="${size}" font-family="Helvetica">${t}</text></svg>`);
const cell = async (world, p, sprite) => {
  const b = box(p), m = Math.round(b.size * 0.08);
  const R = { left: b.left - m, top: b.top - m, width: b.size + 2 * m, height: b.size + 2 * m };
  const base = await sharp(world).extract(R).png().toBuffer();
  const sp = await sharp(sprite).resize(b.size, b.size, { kernel: 'lanczos3' }).png().toBuffer();
  return sharp(await sharp(base).composite([{ input: sp, left: m, top: m }]).png().toBuffer()).resize(T, T).png().toBuffer();
};
const tiles = [{ input: svg(LW + 9 * T, HDR, 'Standard valley corner sprites — NOW (app) vs NEW (low drafts; dock without pond, on the cove draft)', 20), left: 0, top: 0 }];
S.forEach((s, c) => tiles.push({ input: svg(T, 26, NAMES[c], 16, '#eee'), left: LW + c * T, top: HDR }));
let row = 0;
for (const p of P) for (const [kind, world] of [['NOW', oldWorld], ['NEW', p === 'dock' ? newWorld : oldWorld]]) {
  const y = HDR + 26 + row * T;
  tiles.push({ input: svg(LW, T, `${kind} ${p}`, 20, kind === 'NEW' ? '#e9f6e1' : '#f4f4f4'), left: 0, top: y });
  for (const [c, s] of S.entries()) tiles.push({ input: await cell(world, p, kind === 'NOW' ? `${APP}/projects/${p}/${s}.webp` : `${K}/${p}/${s}.png`), left: LW + c * T, top: y });
  row++;
}
await sharp({ create: { width: LW + 9 * T, height: HDR + 26 + row * T, channels: 3, background: '#fff' } }).composite(tiles).png().toFile(`${out}/standard_corners_sheet.png`);
for (const s of ['level1', 'level5']) {
  const comp = await Promise.all(P.map(async (p) => { const b = box(p); return { input: await sharp(`${K}/${p}/${s}.png`).resize(b.size, b.size).png().toBuffer(), left: b.left, top: b.top }; }));
  await sharp(await sharp(newWorld).composite(comp).png().toBuffer()).resize(1024, 1536).png().toFile(`${out}/standard_valley_${s === 'level1' ? 'L1' : 'L5'}.png`);
}
console.log('sheets in', out);
