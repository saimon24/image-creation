// usage: node dockpaint_standard.mjs [suffix=a]
// The standard valley's version of dockpaint.mjs: repaints only the dock's corner of the app's
// world_sunrise.webp (2048x3072) into a cove of the stream, so the pondless standard dock
// (corners/keyed_standard/dock) stands in water. Crop 768 px round the dock's footprint, flat oval of
// the stream's colour joined to the stream's right branch, gpt-image-2 edit (medium), feathered paste.
// Writes valleys/standard/world_sunrise_cove_<suf>.webp (q95) (+ .dock.json with the crop/oval).
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
const require = createRequire('/Users/ioannis/dev/ImageCreation/package.json');
const sharp = require('sharp');
const APP = '/Users/ioannis/dev/TinyHarvest-farmmap/assets/images/farm-map/scene';
const OUT = '/Users/ioannis/dev/ImageCreation/output/farm-map-v2/valleys/standard', S = process.env.ART_S;
const [suf = 'a'] = process.argv.slice(2);
const W = 2048, H = 3072, C = 768;
// SCENE_WORLD (engine/farm-map-layout.ts): scene rect + dock spot; sprite box = size x size, foot at 0.92
const SC = { left: 335, top: 624, width: 1434, height: 1979 }, DOCK = { x: 0.9, y: 0.32, scale: 0.22 };
const RIVER = { left: 900, top: 0, width: 1148, height: 1200 };
const size = DOCK.scale * SC.width, fx = SC.left + DOCK.x * SC.width, fy = SC.top + DOCK.y * SC.height;
// The cove oval: centre dx, dy from the dock's foot and radii rx, ry, as fractions of the sprite size.
// Default = dockcover.mjs's footprint grown like dockpaint.mjs (rx 0.46*1.25, ry 0.3*1.35) — round "a".
const OVAL = (process.env.OVAL || '0,-0.32,0.575,0.405').split(',').map(Number);
const b = { cx: fx + OVAL[0] * size, cy: fy + OVAL[1] * size, rx: OVAL[2] * size / 1.25, ry: OVAL[3] * size / 1.35 };
const left = Math.round(Math.min(W - C, Math.max(0, b.cx - C / 2))), top = Math.round(Math.min(H - C, Math.max(0, b.cy - C / 2)));
const paint = await sharp(`${APP}/world_sunrise.webp`).removeAlpha().raw().toBuffer();
// the stream's colour: median of the painted stream under river_mask (clearly blue pixels only, no highlight streaks)
const rm = await sharp(`${APP}/river_mask.webp`).extractChannel(0).raw().toBuffer();
const cs = [];
for (let y = 0; y < RIVER.height; y += 3) for (let x = 0; x < RIVER.width; x += 3) if (rm[y * RIVER.width + x] > 200 && paint[((y + RIVER.top) * W + x + RIVER.left) * 3 + 2] - paint[((y + RIVER.top) * W + x + RIVER.left) * 3] > 60) { const o = ((y + RIVER.top) * W + x + RIVER.left) * 3; cs.push([paint[o], paint[o + 1], paint[o + 2]]); }
const wc = [0, 1, 2].map((c) => cs.map((q) => q[c]).sort((a, z) => a - z)[cs.length >> 1]);
const RX = b.rx * 1.25, RY = b.ry * 1.35, ocx = b.cx - left, ocy = b.cy - top;
const crop = await sharp(paint, { raw: { width: W, height: H, channels: 3 } }).extract({ left, top, width: C, height: C }).raw().toBuffer();
const guide = Buffer.from(crop);
const inOval = (x, y) => ((x - ocx) / RX) ** 2 + ((y - ocy) / RY) ** 2 <= 1;
for (let y = 0; y < C; y++) for (let x = 0; x < C; x++) if (inOval(x, y)) { const o = (y * C + x) * 3; guide[o] = wc[0]; guide[o + 1] = wc[1]; guide[o + 2] = wc[2]; }
const gfile = `${S}/dockguide_standard_${suf}.png`;
await sharp(guide, { raw: { width: C, height: C, channels: 3 } }).resize(1024, 1024, { kernel: 'lanczos3' }).png().toFile(gfile);
if (process.env.DRY) { console.log('guide', gfile, { left, top, wc }); process.exit(0); }
const pfile = `${S}/dockprompt_standard_${suf}.txt`;
fs.writeFileSync(pfile, `This is a close-up crop of a hand-painted top-down farm map from a cozy mobile game (a green farm valley in warm early-morning sunrise light, with a small blue stream). The flat, untextured blue oval in it marks where a small wooden fishing jetty will be placed later. Paint that oval as natural WATER of this map — the same blue stream water, colour, light ripples and painting style as the stream already visible in the picture — forming a calm, rounded cove or small pond that opens directly off the stream: the stream flows into it from its upper edge, so stream and cove are ONE connected body of water with no bank between them. Give the cove the same soft grassy shoreline with a few small grey rounded stones as the stream's banks. Keep the water surface open and calm: no jetty, no boats, no bridges, no rocks or plants in the water. Keep everything outside the oval exactly as it is (same positions, same scale, no zoom, no shift). Same light from the upper left, no text.`);
const out = `dock_standard_${suf}`;
if (!fs.existsSync(`${S}/raw/${out}.png`)) execFileSync('node', [new URL('../gen.mjs', import.meta.url).pathname, out, '1024x1024', process.env.QUALITY || 'medium', pfile, gfile], { env: { ...process.env, APPROVED_HIGH: '1' }, stdio: 'inherit' });
const fixed = await sharp(`${S}/raw/${out}.png`).resize(C, C, { kernel: 'lanczos3' }).removeAlpha().raw().toBuffer();
const res = Buffer.from(paint);
for (let y = 0; y < C; y++) for (let x = 0; x < C; x++) {
  const d = Math.hypot((x - ocx) / (RX * 1.3), (y - ocy) / (RY * 1.3));
  const t = Math.max(0, Math.min(1, (1 - d) / 0.25));
  if (!t) continue;
  const o = ((top + y) * W + left + x) * 3, f = (y * C + x) * 3;
  for (let c = 0; c < 3; c++) res[o + c] = Math.round(paint[o + c] * (1 - t) + fixed[f + c] * t);
}
fs.mkdirSync(OUT, { recursive: true });
await sharp(res, { raw: { width: W, height: H, channels: 3 } }).webp({ quality: 95 }).toFile(`${OUT}/world_sunrise_cove_${suf}.webp`);
fs.writeFileSync(`${OUT}/world_sunrise_cove_${suf}.dock.json`, JSON.stringify({ left, top, C, cx: b.cx, cy: b.cy, rx: RX * 1.3, ry: RY * 1.3, waterColour: wc, dockBox: { left: fx - size / 2, top: fy - size * 0.92, size } }));
console.log('cove painted', suf, JSON.stringify({ left, top, ocx, ocy, RX, RY, wc }));
