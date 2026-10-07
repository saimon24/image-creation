// usage: node compose.mjs <warped.png> <border.png> <out.png> -> warped centre (exact plots) over the AI-repainted border
import { createRequire } from 'node:module';
const require = createRequire('/Users/ioannis/dev/ImageCreation/package.json');
const sharp = require('sharp');
const [wp, bp, out] = process.argv.slice(2);
const W = 1024, H = 1536;
const a = await sharp(wp).removeAlpha().raw().toBuffer();
const b = await sharp(bp).resize(W, H).removeAlpha().raw().toBuffer();
const m = await sharp(wp.replace(/\.png$/, '_mask.png')).blur(6).extractChannel(0).raw().toBuffer();
const o = Buffer.alloc(W * H * 3);
for (let i = 0; i < W * H; i++) { const t = m[i] / 255; for (let k = 0; k < 3; k++) o[i * 3 + k] = a[i * 3 + k] * t + b[i * 3 + k] * (1 - t); }
await sharp(o, { raw: { width: W, height: H, channels: 3 } }).png().toFile(out);
