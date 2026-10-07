// usage: node fixed.mjs out.png [themeId] -> the fixed layout (plots, deco footprints, corners) with a 64px grid, optionally over a theme guide
import { createRequire } from 'node:module';
import { PLOTS, PLOT_R, CORNERS, DECOS, THEMES } from './layout.mjs';
const require = createRequire('/Users/ioannis/dev/ImageCreation/package.json');
const sharp = require('sharp');
const [out, id] = process.argv.slice(2);
const t = id && THEMES[id];
const line = (pts, w, c) => `<polyline points="${pts.map((p) => p.join(',')).join(' ')}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" opacity="0.7"/>`;
const g = [];
for (let x = 0; x <= 1024; x += 64) g.push(`<line x1="${x}" y1="0" x2="${x}" y2="1536" stroke="#999" stroke-width="1"/><text x="${x + 2}" y="12" font-size="11">${x}</text>`);
for (let y = 0; y <= 1536; y += 64) g.push(`<line x1="0" y1="${y}" x2="1024" y2="${y}" stroke="#999" stroke-width="1"/><text x="2" y="${y - 2}" font-size="11">${y}</text>`);
if (t) {
  for (const [cx, cy, rx, ry] of t.water.lakes) g.push(`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#2f7fd8" opacity="0.6"/>`);
  for (const r of t.water.rivers) g.push(line(r.pts, r.w, '#2f7fd8'));
  for (const p of t.paths) g.push(line(p, 16, '#a0702b'));
}
for (const [k, [a, b, c, d]] of Object.entries(CORNERS)) g.push(`<rect x="${a}" y="${b}" width="${c - a}" height="${d - b}" fill="none" stroke="magenta" stroke-width="3"/><text x="${a + 4}" y="${b + 18}" font-size="16" fill="magenta">${k}</text>`);
for (const [k, [x, y]] of Object.entries(PLOTS)) g.push(`<ellipse cx="${x}" cy="${y}" rx="${PLOT_R[0]}" ry="${PLOT_R[1]}" fill="#f3e6c4" stroke="#000"/><text x="${x - 8}" y="${y + 6}" font-size="18">P${k}</text>`);
for (const [k, [x, y]] of Object.entries(DECOS)) g.push(`<ellipse cx="${x}" cy="${y}" rx="44" ry="20" fill="#3c3" opacity="0.8"/><rect x="${x - 40}" y="${y - 70}" width="80" height="70" fill="none" stroke="#3c3" stroke-dasharray="4 3"/><text x="${x - 10}" y="${y + 6}" font-size="16">D${k}</text>`);
await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1536"><rect width="1024" height="1536" fill="#fff"/>${g.join('')}</svg>`)).png().toFile(out);
