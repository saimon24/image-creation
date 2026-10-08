// usage: node cove_preview.mjs <painting.png> <out.png> [state ...]  (default: level1 level5)
// Crops the standard painting round the dock corner and composites the new pondless standard dock
// (corners/keyed_standard/dock/<state>.png) at its in-app box (SCENE_WORLD dock spot, foot at 0.92),
// one panel per state, plus the old pond dock on the old painting for comparison.
import { createRequire } from 'node:module';
const require = createRequire('/Users/ioannis/dev/ImageCreation/package.json');
const sharp = require('sharp');
const APP = '/Users/ioannis/dev/TinyHarvest-farmmap/assets/images/farm-map';
const K = '/Users/ioannis/dev/ImageCreation/output/farm-map-v2/corners/keyed_standard/dock';
const [painting, out, ...st] = process.argv.slice(2);
const states = st.length ? st : ['level1', 'level5'];
const SC = { left: 335, top: 624, width: 1434, height: 1979 }, DOCK = { x: 0.9, y: 0.32, scale: 0.22 };
const size = Math.round(DOCK.scale * SC.width), fx = SC.left + DOCK.x * SC.width, fy = SC.top + DOCK.y * SC.height;
const box = { left: Math.round(fx - size / 2), top: Math.round(fy - size * 0.92) };
const CR = { left: 1248, top: 760, width: 800, height: 640 }, P = 600, PH = Math.round((P * CR.height) / CR.width);
const panel = async (bg, sprite, label) => {
  const base = await sharp(bg).extract(CR).png().toBuffer();
  const sp = await sharp(sprite).resize(size, size, { kernel: 'lanczos3' }).png().toBuffer();
  // sharp resizes before it composites within one pipeline: composite first, resize in a second one
  const img = await sharp(await sharp(base).composite([{ input: sp, left: box.left - CR.left, top: box.top - CR.top }]).png().toBuffer()).resize(P, PH).png().toBuffer();
  const lab = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${P}" height="34"><rect width="${P}" height="34" fill="#fff"/><text x="8" y="24" font-size="20" font-family="Helvetica">${label}</text></svg>`);
  return sharp({ create: { width: P, height: PH + 34, channels: 3, background: '#fff' } }).composite([{ input: lab, left: 0, top: 0 }, { input: img, left: 0, top: 34 }]).png().toBuffer();
};
const panels = [await panel(`${APP}/scene/world_sunrise.webp`, `${APP}/projects/dock/level1.webp`, 'NOW: old dock L1 (own pond) on world_sunrise')];
for (const s of states) panels.push(await panel(painting, `${K}/${s}.png`, `NEW: dock ${s} (no pond) on cove draft`));
const cols = 2, rows = Math.ceil(panels.length / cols), G = 8;
await sharp({ create: { width: cols * P + (cols + 1) * G, height: rows * (PH + 34) + (rows + 1) * G, channels: 3, background: '#ddd' } })
  .composite(panels.map((p, i) => ({ input: p, left: G + (i % cols) * (P + G), top: G + Math.floor(i / cols) * (PH + 34 + G) }))).png().toFile(out);
console.log('preview', out, JSON.stringify({ box, size }));
