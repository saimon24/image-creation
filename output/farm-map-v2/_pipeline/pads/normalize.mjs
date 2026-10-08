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
  // 1) The ring's ends: the outermost grey stone pixels in the band of the oval's front half
  //    (anything on the plot stays inside the ring). Exact when the stones read as grey.
  let l = F, r = 0;
  for (let row = bottom; row >= Math.max(0, bottom - 140); row--) for (let x = 0; x < F; x++) {
    const i = (row * F + x) * 4;
    if (data[i + 3] < 160) continue;
    const R = data[i], G = data[i + 1], B = data[i + 2], mx = Math.max(R, G, B), mn = Math.min(R, G, B);
    const sat = mx ? (mx - mn) / mx : 0, lum = (R + G + B) / 3;
    if (sat < 0.2 && lum > 70 && lum < 215) { l = Math.min(l, x); r = Math.max(r, x); }
  }
  const grey = { bottom, cx: (l + r) / 2, w: r - l };
  // 2) The widest row of the ring's front half (50–125 rows above its front edge): the ring's
  //    sides, which nothing on the plot reaches past. Used when the stones don't read as grey.
  let wide = { bottom, cx: F / 2, w: 0 };
  for (let d = 50; d <= 125; d++) {
    const row = bottom - d;
    if (row < 0) break;
    let wl = F, wr = 0;
    for (let x = 0; x < F; x++) if (data[(row * F + x) * 4 + 3] > 128) { wl = Math.min(wl, x); wr = Math.max(wr, x); }
    if (wr - wl > wide.w) wide = { bottom, cx: (wl + wr) / 2, w: wr - wl };
  }
  return grey.w > 0.88 * wide.w && grey.w < 1.05 * wide.w ? grey : wide;
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
