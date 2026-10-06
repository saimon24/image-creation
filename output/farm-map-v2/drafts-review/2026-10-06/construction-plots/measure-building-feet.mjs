import sharp from '/Users/ioannis/dev/ImageCreation/node_modules/sharp/lib/index.js';
import fs from 'fs';
const root = '/Users/ioannis/dev/TinyHarvest-farmmap/assets/images/farm-map/buildings';
const out = {};
for (const id of fs.readdirSync(root)) {
  for (const f of fs.readdirSync(`${root}/${id}`)) {
    const m = f.match(/^(\d+)\.webp$/); if (!m) continue;
    const { data, info } = await sharp(`${root}/${id}/${f}`).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const { width: W, height: H } = info;
    let minY = H, maxY = -1, minX = W, maxX = -1;
    const a = (x, y) => data[(y * W + x) * 4 + 3];
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (a(x, y) > 60) { if (y<minY)minY=y; if(y>maxY)maxY=y; if(x<minX)minX=x; if(x>maxX)maxX=x; }
    // base band: bottom 22% of the drawn height
    const band = Math.round((maxY - minY) * 0.22);
    let bx0 = W, bx1 = -1;
    for (let y = maxY - band; y <= maxY; y++) for (let x = 0; x < W; x++) if (a(x, y) > 60) { if (x<bx0)bx0=x; if(x>bx1)bx1=x; }
    const baseW = (bx1 - bx0) / W;
    out[`${id}_${m[1]}`] = {
      cx: +(((bx0 + bx1) / 2) / W).toFixed(4),
      floor: +(maxY / H).toFixed(4),
      baseW: +baseW.toFixed(4),
      foot: +((maxY / H) - baseW * 0.25 * (W / H)).toFixed(4),
    };
  }
}
console.log(JSON.stringify(out));
