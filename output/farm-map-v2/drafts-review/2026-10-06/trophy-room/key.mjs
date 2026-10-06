// chroma-key magenta -> alpha, with despill. usage: node key.mjs in.png out.png
import sharp from '/Users/ioannis/dev/ImageCreation/node_modules/sharp/lib/index.js';
const [inp, out] = process.argv.slice(2);
const { data, info } = await sharp(inp).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
for (let i = 0; i < data.length; i += 4) {
  const r = data[i], g = data[i + 1], b = data[i + 2];
  // magenta-ness: r and b high, g low
  const m = Math.min(r, b) - g;
  let a = 255;
  if (m > 150) a = 0;
  else if (m > 60) a = Math.round(255 * (150 - m) / 90);
  if (a < 255 && a > 0) {
    // despill: pull r/b down toward g-ish
    const k = Math.min(r, b) - Math.max(g, 0);
    data[i] = Math.max(0, r - k * (1 - a / 255));
    data[i + 2] = Math.max(0, b - k * (1 - a / 255));
  }
  data[i + 3] = a;
}
await sharp(data, { raw: info }).png().toFile(out);
console.log('keyed', out, info.width, info.height);
