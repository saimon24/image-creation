// usage: node dockcover.mjs -> per theme: the dock's footprint in the 1024x1536 painting and how much of it is painted water
import fs from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire('/Users/ioannis/dev/ImageCreation/package.json');
const sharp = require('sharp');
const V = '/Users/ioannis/dev/ImageCreation/output/farm-map-v2/valleys';
const src = fs.readFileSync('/Users/ioannis/dev/TinyHarvest-farmmap/engine/farm-map-theme-geometry.ts', 'utf8');
export function dockBox(id) {
  const blk = src.slice(src.indexOf(`  ${id}: {`));
  const sc = JSON.parse(blk.match(/scene: (\{[^}]*\})/)[1].replace(/(\w+):/g, '"$1":'));
  const d = blk.match(/dock: \{ x: ([\d.]+), y: ([\d.]+), scale: ([\d.]+) \}/);
  const size = (+d[3] * sc.width) / 2, cx = (sc.left + +d[1] * sc.width) / 2, cy = (sc.top + +d[2] * sc.height) / 2;
  // the dock's footprint: lower ~60% of the sprite box, a flat ellipse
  return { cx, cy: cy - size * 0.32, rx: size * 0.46, ry: size * 0.3, size, left: cx - size / 2, top: cy - size * 0.92 };
}
if (process.argv[1].endsWith('dockcover.mjs')) {
  for (const f of fs.readdirSync(`${V}/water`).filter((f) => f.endsWith('.png')).sort()) {
    const id = f.replace('.png', ''), b = dockBox(id);
    const m = await sharp(`${V}/water/${f}`).resize(1024, 1536).extractChannel(0).raw().toBuffer();
    let n = 0, w = 0;
    for (let y = Math.floor(b.cy - b.ry); y <= b.cy + b.ry; y++) for (let x = Math.floor(b.cx - b.rx); x <= b.cx + b.rx; x++) {
      if (((x - b.cx) / b.rx) ** 2 + ((y - b.cy) / b.ry) ** 2 > 1 || x < 0 || y < 0 || x >= 1024 || y >= 1536) continue;
      n++; if (m[y * 1024 + x] > 127) w++;
    }
    console.log(id.padEnd(32), 'water under dock', Math.round((100 * w) / n) + '%', JSON.stringify({ cx: Math.round(b.cx), cy: Math.round(b.cy), size: Math.round(b.size) }));
  }
}
