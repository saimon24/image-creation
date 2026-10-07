// usage: node cmp.mjs out.png id_suffix...  -> drafts side by side with the guide's plot outlines (red) on top
import { createRequire } from 'node:module';
import { PLOTS, PLOT_R, CORNERS } from './themes.mjs';
const require = createRequire('/Users/ioannis/dev/ImageCreation/package.json');
const sharp = require('sharp');
const V = '/Users/ioannis/dev/ImageCreation/output/farm-map-v2/valleys';
const [out, ...names] = process.argv.slice(2);
const SC = Number(process.env.SC || 1), T = ([x, y]) => [531 + (x - 531) * SC, 858 + (y - 858) * SC];
const ov = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1536">${Object.values(PLOTS).map(T).map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="${PLOT_R[0] * SC}" ry="${PLOT_R[1] * SC}" fill="none" stroke="red" stroke-width="5"/>`).join('')}${Object.values(CORNERS).map(([a, b, c, d]) => `<rect x="${a}" y="${b}" width="${c - a}" height="${d - b}" fill="none" stroke="magenta" stroke-width="4" stroke-dasharray="12 8"/>`).join('')}</svg>`);
const TW = 400, TH = 600;
const tiles = [];
for (const [i, n] of names.entries()) {
  const b = await sharp(`${V}/drafts/${n}.png`).resize(1024, 1536).composite([{ input: ov }]).png().toBuffer();
  tiles.push({ input: await sharp(b).resize(TW, TH).png().toBuffer(), left: i * TW, top: 0 });
}
await sharp({ create: { width: names.length * TW, height: TH, channels: 3, background: '#fff' } }).composite(tiles).png().toFile(out);
