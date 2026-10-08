// node place_on_plot.mjs <building.webp> <cx> <foot> <out.png> [scale=0.78]
// Deterministic alternative to the AI pass for a building the model keeps redrawing too big:
// the approved empty plot (out/plots/empty.png) + a soft contact shadow + the ORIGINAL building
// sprite, scaled about its measured foot and set so the foot lands exactly on the ring centre.
import { createRequire } from 'node:module';
const require = createRequire('/Users/ioannis/dev/ImageCreation/package.json');
const sharp = require('sharp');
const [b, cxS, footS, out, sS = '0.78'] = process.argv.slice(2);
const F = 512, CX = 256.5, CY = 410, s = Number(sS);
const P = new URL('.', import.meta.url).pathname;
const base = await sharp(P + 'out/plots/empty.png').resize(F, F).png().toBuffer();
const src = await sharp(b).resize(F, F).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
let l = F, r = 0;
for (let y = 0; y < F; y++) for (let x = 0; x < F; x++) if (src.data[(y * F + x) * 4 + 3] > 40) { l = Math.min(l, x); r = Math.max(r, x); }
const size = Math.round(F * s), fx = Number(cxS) * F, fy = Number(footS) * F;
const left = Math.round(CX - fx * s), top = Math.round(CY - fy * s);
const bw = (r - l) * s;
const shadow = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${F}" height="${F}"><ellipse cx="${CX}" cy="${CY + 4}" rx="${bw * 0.52}" ry="${bw * 0.22}" fill="rgba(40,25,10,0.38)"/></svg>`);
const shadowBlur = await sharp(shadow).blur(10).png().toBuffer();
const bld = await sharp(b).resize(size, size).png().toBuffer();
const pad = 300;
const layer = await sharp({ create: { width: F + 2 * pad, height: F + 2 * pad, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
  .composite([{ input: bld, left: left + pad, top: top + pad }]).png().toBuffer();
const bldF = await sharp(layer).extract({ left: pad, top: pad, width: F, height: F }).png().toBuffer();
await sharp(base).composite([{ input: shadowBlur }, { input: bldF }]).png().toFile(out);
