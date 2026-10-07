// usage: node guide.mjs  -> renders every theme's flat layout guide + prompt
// into output/farm-map-v2/valleys/{guides,prompts}/<id>.{png,txt}
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { PLOTS, PLOT_R, CORNERS, THEMES } from './themes.mjs';
const require = createRequire('/Users/ioannis/dev/ImageCreation/package.json');
const sharp = require('sharp');

const OUT = '/Users/ioannis/dev/ImageCreation/output/farm-map-v2/valleys';
const W = 1024, H = 1536;
const CREAM = '#f3e6c4', WATER = '#2f7fd8', PATH = '#c99a5b';

const line = (pts, w, color) =>
  `<polyline points="${pts.map((p) => p.join(',')).join(' ')}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;

function svgFor(t) {
  const parts = [`<rect width="${W}" height="${H}" fill="${t.ground}"/>`];
  for (const [color, kind, g] of t.zones) {
    if (kind === 'ellipse') parts.push(`<ellipse cx="${g[0]}" cy="${g[1]}" rx="${g[2]}" ry="${g[3]}" fill="${color}"/>`);
    else parts.push(`<polygon points="${g.map((p) => p.join(',')).join(' ')}" fill="${color}"/>`);
  }
  for (const [cx, cy, rx, ry] of t.water.lakes) parts.push(`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${WATER}"/>`);
  for (const r of t.water.rivers) parts.push(line(r.pts, r.w, WATER));
  for (const p of t.paths) parts.push(line(p, 16, PATH));
  for (const [cx, cy] of Object.values(PLOTS))
    parts.push(`<ellipse cx="${cx}" cy="${cy}" rx="${PLOT_R[0]}" ry="${PLOT_R[1]}" fill="${CREAM}"/>`);
  // gpt-image-2 stretches a small layout until it spans ~20-90% of the height,
  // so the guide is drawn 1.2x larger about (531, 858); the painting is scaled back after.
  const [sx, sy, cx, cy] = (process.env.PRECOMP || '0.8333,0.8333,531,858').split(',').map(Number);
  const [bg, ...rest] = parts;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${bg}<g transform="translate(${cx},${cy}) scale(${1 / sx},${1 / sy}) translate(${-cx},${-cy})">${rest.join('')}</g></svg>`;
}

const PREFIX = `Image 1 is a flat-colour LAYOUT GUIDE (portrait 2:3) for a hand-painted top-down farm valley map of a cozy mobile farming game, seen from high above at a steep 3/4 angle. Repaint it as a finished painting and follow its layout exactly:
- Every cream ellipse (16 of them) is an EMPTY, FLAT, OPEN clearing where the game later places a building. Keep each one completely empty at exactly its position and size: no objects, trees, decorations, fences, water or paths on it — paths only touch its edge.
- Four CORNER AREAS stay completely plain, flat open ground — nothing at all in them: no trees, no landmarks, no tents, no stalls, no lanterns, no garlands, no decorations, no water unless drawn: left-middle (x 18-35%, y 31-41%), right-middle (x 77-93%, y 31-39%), bottom-left (x 10-27%, y 80-91%), bottom-right (x 78-92%, y 81-91%). The game places big buildings there.
- Keep the exact framing of image 1: same scale, same positions, no zoom, no crop, no shift. A clearing that sits at a certain spot in image 1 sits at exactly that spot in the painting.
- Blue = water, exactly where it is drawn. Brown lines = footpaths, exactly where they are drawn; where a path crosses water, paint a small bridge.
- Large areas of plain ground stay calm and open around the clearings (the game places decorations there later).
Image 2 is ONLY a reference for the painting STYLE and the LIGHT — do not copy its layout, hill, river, trees or colours: bright, cheerful hand-painted mobile-game art with soft painted textures and chunky, readable shapes, low detail, NOT photoreal, NOT an oil painting; the same low warm SUNRISE light from the upper left, golden rim light, long soft shadows falling to the lower right.
`;
const SUFFIX = `
Keep it low detail: few, big, readable elements, no clutter, no scattered small props. No text, no letters, no numbers, no UI, no people, no animals except where named, no buildings on the clearings. The painting fills the whole canvas edge to edge: no border, no frame, no vignette, no sky band (top-down ground everywhere except where named).`;

fs.mkdirSync(`${OUT}/guides`, { recursive: true });
fs.mkdirSync(`${OUT}/prompts`, { recursive: true });
const only = process.argv[2];
for (const [id, t] of Object.entries(THEMES)) {
  if (only && id !== only) continue;
  await sharp(Buffer.from(svgFor(t))).png().toFile(`${OUT}/guides/${id}.png`);
  fs.writeFileSync(`${OUT}/prompts/${id}.txt`, PREFIX + '\n' + t.prompt + '\n' + SUFFIX);
  console.log('guide', id);
}
