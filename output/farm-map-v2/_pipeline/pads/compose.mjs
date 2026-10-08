// node compose.mjs <building.webp|none> <cx> <foot> <out.png> [bg=magenta|none]
// The ring sits at the SAME place in every frame (centre x 0.5, oval centre y RING_Y), so a building's
// levels share one ring; the building is shifted so its measured foot (cx, foot) lands on the ring centre.
// Puts the approved ring under a building sprite in the building's own 512 frame:
// ring 0.636 of the frame wide (PAD 0.14 / BUILDING 0.22 scene widths), its oval centred on the foot.
import { createRequire } from 'node:module';
const require = createRequire('/Users/ioannis/dev/ImageCreation/package.json');
const sharp = require('sharp');
const [b, cxS, footS, out, bg = 'magenta'] = process.argv.slice(2);
const F = 512, ring = new URL('./ring.png', import.meta.url).pathname;
const rm = await sharp(ring).metadata();
const rw = Math.round(F * 0.636), rh = Math.round((rw * rm.height) / rm.width);
const RING_Y = 0.755;
const cx = 0.5 * F, cy = RING_Y * F;
const dx = Math.round((0.5 - Number(cxS)) * F), dy = Math.round((RING_Y - Number(footS)) * F);
const r = await sharp(ring).resize(rw, rh).png().toBuffer();
const layers = [{ input: r, left: Math.round(cx - rw / 2), top: Math.round(cy - rh / 2) }];
if (b !== 'none') {
  const raw = await sharp(b).resize(F, F).png().toBuffer();
  // shift by (dx, dy) inside the frame, cropping what falls outside
  const padded = await sharp(raw).extend({ top: 200, bottom: 200, left: 200, right: 200, background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  const ext = await sharp(padded).extract({ left: 200 - dx, top: 200 - dy, width: F, height: F }).png().toBuffer();
  layers.push({ input: ext, left: 0, top: 0 });
}
let img = sharp({ create: { width: F, height: F, channels: 4, background: bg === 'none' ? { r: 0, g: 0, b: 0, alpha: 0 } : '#ff00ff' } }).composite(layers);
if (bg !== 'none') img = sharp(await img.png().toBuffer()).flatten({ background: '#ff00ff' });
await sharp(await img.png().toBuffer()).resize(1024, 1024).png().toFile(out);
