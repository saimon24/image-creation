import sharp from '/Users/ioannis/dev/ImageCreation/node_modules/sharp/lib/index.js';
// usage: node flood.mjs img.png sx sy tol  -> bbox of the region connected to seed with colour within tol
const [inp, sxs, sys, tols] = process.argv.slice(2);
const { data, info } = await sharp(inp).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const W = info.width, H = info.height, sx = Math.round(Number(sxs) * W), sy = Math.round(Number(sys) * H), tol = Number(tols);
const s = (sy * W + sx) * 4; const ref = [data[s], data[s + 1], data[s + 2]];
const seen = new Uint8Array(W * H); const st = [sy * W + sx]; seen[st[0]] = 1;
let x0 = W, x1 = 0, y0 = H, y1 = 0, n = 0;
while (st.length) { const p = st.pop(); const x = p % W, y = (p / W) | 0; n++;
  if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y;
  for (const [dx, dy] of [[1,0],[-1,0],[0,1],[0,-1]]) { const nx = x + dx, ny = y + dy; if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue; const q = ny * W + nx; if (seen[q]) continue; const i = q * 4;
    if (data[i+3] > 200 && Math.abs(data[i]-ref[0]) + Math.abs(data[i+1]-ref[1]) + Math.abs(data[i+2]-ref[2]) < tol) { seen[q] = 1; st.push(q); } } }
console.log(inp.split('/').pop(), 'seed', ref.join(','), 'bbox frac x', (x0/W).toFixed(3), (x1/W).toFixed(3), 'y', (y0/H).toFixed(3), (y1/H).toFixed(3), 'centre', (((x0+x1)/2)/W).toFixed(3), (((y0+y1)/2)/H).toFixed(3), 'r(w/2)', (((x1-x0)/2)/W).toFixed(3), 'px', n);
