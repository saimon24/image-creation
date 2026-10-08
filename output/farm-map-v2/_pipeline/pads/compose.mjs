// node compose.mjs <building.webp|none> <cx> <foot> <out.png> [bg=magenta|none]
// Puts the approved ring (ring.png, 0.584 tall/wide, never squashed) under a building sprite in a
// 512 frame. The ring is at the SAME place in every frame — RING_W of the frame wide, its oval
// centred at (0.5, RING_Y) — so a building's levels share one ring; the building is shifted so its
// measured foot (cx, foot) lands on the ring centre, and shrunk about its foot if it would leave
// the frame (no cut tops or sides).
import { createRequire } from 'node:module';
const require = createRequire('/Users/ioannis/dev/ImageCreation/package.json');
const sharp = require('sharp');
const [b, cxS, footS, out, bg = 'magenta'] = process.argv.slice(2);
const F = 512, RING_W = 0.6, RING_Y = 0.8, MARGIN = 6;
const ring = new URL('./ring.png', import.meta.url).pathname;
const rm = await sharp(ring).metadata();
const rw = Math.round(F * RING_W), rh = Math.round((rw * rm.height) / rm.width);
const cx = 0.5 * F, cy = RING_Y * F;
const layers = [{ input: await sharp(ring).resize(rw, rh).png().toBuffer(), left: Math.round(cx - rw / 2), top: Math.round(cy - rh / 2) }];
if (b !== 'none') {
  const src = await sharp(b).resize(F, F).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  let t = F, l = F, r = 0;
  for (let y = 0; y < F; y++) for (let x = 0; x < F; x++) if (src.data[(y * F + x) * 4 + 3] > 20) { t = Math.min(t, y); l = Math.min(l, x); r = Math.max(r, x); }
  const fx = Number(cxS) * F, fy = Number(footS) * F;
  // largest scale ≤ 1 that keeps the top and both sides inside the frame
  // BSCALE shrinks a building that is as wide as the ring (it would hide the stones and look off-centre).
  let s = Number(process.env.BSCALE || 1);
  if (fy - t > 0) s = Math.min(s, (cy - MARGIN) / (fy - t));
  if (fx - l > 0) s = Math.min(s, (cx - MARGIN) / (fx - l));
  if (r - fx > 0) s = Math.min(s, (F - MARGIN - cx) / (r - fx));
  const size = Math.round(F * s);
  const scaled = await sharp(b).resize(size, size).png().toBuffer();
  const left = Math.round(cx - fx * s), top = Math.round(cy - fy * s);
  const pad = 300;
  const canvas = await sharp({ create: { width: F + 2 * pad, height: F + 2 * pad, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([{ input: scaled, left: left + pad, top: top + pad }]).png().toBuffer();
  layers.push({ input: await sharp(canvas).extract({ left: pad, top: pad, width: F, height: F }).png().toBuffer(), left: 0, top: 0 });
}
let img = sharp({ create: { width: F, height: F, channels: 4, background: bg === 'none' ? { r: 0, g: 0, b: 0, alpha: 0 } : '#ff00ff' } }).composite(layers);
if (bg !== 'none') img = sharp(await img.png().toBuffer()).flatten({ background: '#ff00ff' });
await sharp(await img.png().toBuffer()).resize(1024, 1024).png().toFile(out);
