// node normalize.mjs <ref-ring.png> <in.png> <out.png>
// Scales + shifts a keyed sprite so its ring matches the approved ring exactly: the ring's front
// edge (lowest opaque row) and its width/centre measured 12 px above it. Keeps every level and
// construction image of a building on the same ring, so nothing jumps on upgrade.
import { createRequire } from 'node:module';
const require = createRequire('/Users/ioannis/dev/ImageCreation/package.json');
const sharp = require('sharp');
const [refP, inP, outP] = process.argv.slice(2);
const F = 512;
async function ring(p) {
  const { data } = await sharp(p).resize(F, F).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  let bottom = 0;
  for (let y = F - 1; y >= 0 && !bottom; y--) for (let x = 0; x < F; x++) if (data[(y * F + x) * 4 + 3] > 128) { bottom = y; break; }
  let l = F, r = 0;
  for (const row of [bottom - 10, bottom - 12, bottom - 14]) for (let x = 0; x < F; x++) if (data[(row * F + x) * 4 + 3] > 128) { l = Math.min(l, x); r = Math.max(r, x); }
  return { bottom, cx: (l + r) / 2, w: r - l };
}
const a = await ring(refP), b = await ring(inP);
const s = a.w / b.w;
const size = Math.round(F * s);
const scaled = await sharp(inP).resize(size, size).png().toBuffer();
const left = Math.round(a.cx - b.cx * s), top = Math.round(a.bottom - b.bottom * s);
const pad = 200;
const canvas = await sharp({ create: { width: F + 2 * pad, height: F + 2 * pad, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
  .composite([{ input: scaled, left: left + pad, top: top + pad }]).png().toBuffer();
await sharp(canvas).extract({ left: pad, top: pad, width: F, height: F }).png().toFile(outP);
console.log(outP.split('/').pop(), 'scale', s.toFixed(3), 'shift', left, top);
