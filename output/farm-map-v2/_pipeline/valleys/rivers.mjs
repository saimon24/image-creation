// usage: node rivers.mjs <suffix> <outDir> [ids...]
// Builds each theme's flowing-water assets from its painting (valleys/drafts/<id>_<suffix>.png,
// 1024x1536) and its layout (water polylines/ellipses mapped through the measured fit):
//   <id>_river.webp  RGB cut-out of the crop
//   <id>_river_mask.webp  R = water coverage, G = calmness (255 river, 120 sea, 90 lake, 12 ice)
//   <id>_river_flow.png   lossless; R*256+G = s/sMax*65535 (distance downstream, painting px), B = 128 + n/nScale
// and <outDir>/rivers.json with crop (2048x3072 painting px), sMax, nScale per theme.
// Assets are stored at half the painting's resolution (the paintings are 1024-class renders).
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { THEMES } from './layout.mjs';
const require = createRequire('/Users/ioannis/dev/ImageCreation/package.json');
const sharp = require('sharp');
const V = '/Users/ioannis/dev/ImageCreation/output/farm-map-v2/valleys';
const [suf, outDir, ...only] = process.argv.slice(2);
const W = 1024, H = 1536, GS = 1.2, GCX = 531, GCY = 858;
const CALM = { river: 255, lake: 90 };
// Hand-picked points inside each painting's water (1024x1536 px); the first point of a
// water body is where it flows from. POLYS add water the colour test can't follow (multi-coloured lakes).
const SEEDS = {
  frosty_fields_bg: [[930, 240], [982, 600], [998, 1050]],
  harvest_fair_bg: [[585, 150], [630, 420], [705, 495], [810, 518], [915, 675], [900, 705]],
  oktoberfest_festival_meadow_bg: [[668, 225], [720, 450], [840, 585]],
  pumpkin_moon_bg: [[720, 150], [900, 480], [450, 1478]],
  bg_aurora_skies: [[540, 300], [840, 540]],
  sunny_shores_bg: [[975, 600], [840, 870], [975, 1275]],
};
const STEP = { pumpkin_moon_bg: 14, oktoberfest_festival_meadow_bg: 16 };
const TOL = { pumpkin_moon_bg: 38, oktoberfest_festival_meadow_bg: 48 };
const POLYS = {
  bg_aurora_skies: [[[180, 0], [1024, 0], [1024, 110], [960, 150], [800, 165], [640, 175], [520, 190], [400, 170], [280, 150], [190, 110]]],
};
const LAKE_CALM = { frosty_fields_bg: [12, 90], sunny_shores_bg: [120, 90], misty_morning_bg: [70, 90] };
fs.mkdirSync(outDir, { recursive: true });
const meta = fs.existsSync(`${outDir}/rivers.json`) ? JSON.parse(fs.readFileSync(`${outDir}/rivers.json`, 'utf8')) : {};

for (const [id, t] of Object.entries(THEMES)) {
  if (only.length && !only.includes(id)) continue;
  const mfile = `${V}/measure/${id}.json`, pfile = `${V}/drafts/${id}_${suf}.png`;
  if (!fs.existsSync(mfile) || !fs.existsSync(pfile)) continue;
  const m = JSON.parse(fs.readFileSync(mfile, 'utf8'));
  const F = ([x, y]) => { const gx = GCX + (x - GCX) * GS, gy = GCY + (y - GCY) * GS; return [m.fit.s * gx + m.fit.tx, m.fit.s * gy + m.fit.ty]; };
  const k = GS * m.fit.s;
  const rivers = t.water.rivers.map((r) => ({ pts: r.pts.map(F), w: r.w * k }));
  const lakes = t.water.lakes.map(([cx, cy, rx, ry], i) => { const [x, y] = F([cx, cy]); return { x, y, rx: rx * k, ry: ry * k, calm: (LAKE_CALM[id] || [])[i] ?? CALM.lake }; });
  if (!rivers.length && !lakes.length) continue;
  const { data } = await sharp(pfile).resize(W, H).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const col = (x, y) => { const i = (y * W + x) * 3; return [data[i], data[i + 1], data[i + 2]]; };
  const blurred = await sharp(pfile).resize(W, H).removeAlpha().blur(2.2).raw().toBuffer();
  const colB = (x, y) => { const i = (y * W + x) * 3; return [blurred[i], blurred[i + 1], blurred[i + 2]]; };

  // arc-length parametrisation of every river; s continues from river to river with a gap
  let offset = 0;
  for (const r of rivers) { r.cum = [0]; for (let i = 1; i < r.pts.length; i++) r.cum.push(r.cum[i - 1] + Math.hypot(r.pts[i][0] - r.pts[i - 1][0], r.pts[i][1] - r.pts[i - 1][1])); r.offset = offset; offset += r.cum.at(-1) + 200; }
  const project = (x, y) => {
    let best = { d: 1e9 };
    for (const r of rivers) for (let i = 1; i < r.pts.length; i++) {
      const [ax, ay] = r.pts[i - 1], [bx, by] = r.pts[i], dx = bx - ax, dy = by - ay, l = dx * dx + dy * dy;
      const u = l ? Math.max(0, Math.min(1, ((x - ax) * dx + (y - ay) * dy) / l)) : 0;
      const px = ax + u * dx, py = ay + u * dy, d = Math.hypot(x - px, y - py);
      if (d < best.d) { const len = Math.sqrt(l) || 1; best = { d, r, s: r.offset + r.cum[i - 1] + u * len, n: ((x - px) * -dy + (y - py) * dx) / len }; }
    }
    return best;
  };
  const inLake = (x, y, grow = 1) => lakes.find((L) => ((x - L.x) / (L.rx * grow)) ** 2 + ((y - L.y) / (L.ry * grow)) ** 2 <= 1);

  // --- find the painted water: k-means over a wide corridor round the drawn water,
  // take the cluster nearest the theme's water hint, classify the whole picture by it
  // and keep the blobs that touch the corridor.
  const HINT = { halloween_candy_lane_bg: [246, 182, 200], pumpkin_moon_bg: [120, 90, 190], halloween_haunted_hollow_bg: [60, 110, 95], bg_aurora_skies: [70, 200, 200], frosty_fields_bg: [70, 120, 170], sunny_shores_bg: [40, 190, 200] }[id] || [60, 140, 210];
  const corridor = new Uint8Array(W * H), pts = [];
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const p = project(x, y);
    if ((p.r && p.d < p.r.w * 2.5 + 40) || inLake(x, y, 1.8)) { corridor[y * W + x] = 1; if ((x + y) % 7 === 0) pts.push(col(x, y)); }
  }
  let cents = [HINT, ...Array.from({ length: 4 }, (_, i) => pts[Math.floor((i + 0.5) * pts.length / 4)])];
  let assign = new Int8Array(pts.length);
  for (let it = 0; it < 12; it++) {
    const sums = cents.map(() => [0, 0, 0, 0]);
    pts.forEach((p, i) => { let bi = 0, bd = 1e9; cents.forEach((c, j) => { const d = (p[0] - c[0]) ** 2 + (p[1] - c[1]) ** 2 + (p[2] - c[2]) ** 2; if (d < bd) { bd = d; bi = j; } }); assign[i] = bi; const s2 = sums[bi]; s2[0] += p[0]; s2[1] += p[1]; s2[2] += p[2]; s2[3]++; });
    cents = cents.map((c, j) => (sums[j][3] ? [sums[j][0] / sums[j][3], sums[j][1] / sums[j][3], sums[j][2] / sums[j][3]] : c));
  }
  const ci = cents.map((c, j) => [Math.hypot(c[0] - HINT[0], c[1] - HINT[1], c[2] - HINT[2]), j]).sort((a, b) => a[0] - b[0])[0][1];
  const wc = cents[ci];
  const dists = pts.filter((_, i) => assign[i] === ci).map((p) => Math.hypot(p[0] - wc[0], p[1] - wc[1], p[2] - wc[2])).sort((a, b) => a - b);
  const T = Math.max(30, Math.min(70, (dists[Math.floor(dists.length * 0.85)] || 40) * 1.3));
  const extMask = fs.existsSync(`${V}/water/${id}.png`) ? await sharp(`${V}/water/${id}.png`).resize(W, H).extractChannel(0).raw().toBuffer() : null;
  const WS = JSON.parse(fs.readFileSync(new URL('./water_seeds.json', import.meta.url), 'utf8'))[id] || {};
  const raw = new Uint8Array(W * H);
  const seeds = extMask ? (WS.strokes || []).map((st) => st[0]).concat(WS.seeds || []) : SEEDS[id];
  if (extMask) { for (let i = 0; i < W * H; i++) raw[i] = extMask[i] > 127 ? 255 : 0; }
  else if (seeds) {
    // magic wand from hand-picked points inside the painted water: grow while the colour stays
    // close to the seeds' colour and changes smoothly from pixel to pixel
    const ref = [0, 1, 2].map((c) => seeds.reduce((s2, [x, y]) => { let t2 = 0; for (let dy = -3; dy <= 3; dy++) for (let dx = -3; dx <= 3; dx++) t2 += colB(x + dx, y + dy)[c]; return s2 + t2 / 49; }, 0) / seeds.length);
    const TT = TOL[id] ?? 60, st = [];
    for (const [x, y] of seeds) { raw[y * W + x] = 255; st.push(y * W + x); }
    while (st.length) { const u = st.pop(), ux = u % W, uy = (u / W) | 0, cu = colB(ux, uy);
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const vx = ux + dx, vy = uy + dy; if (vx < 0 || vy < 0 || vx >= W || vy >= H) continue; const v = vy * W + vx; if (raw[v]) continue;
        const cv = colB(vx, vy); if (Math.hypot(cv[0] - ref[0], cv[1] - ref[1], cv[2] - ref[2]) < TT && Math.hypot(cv[0] - cu[0], cv[1] - cu[1], cv[2] - cu[2]) < (STEP[id] ?? 26)) { raw[v] = 255; st.push(v); } } }
    for (const poly of POLYS[id] || []) for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { let c2 = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) if ((poly[i][1] > y) !== (poly[j][1] > y) && x < ((poly[j][0] - poly[i][0]) * (y - poly[i][1])) / (poly[j][1] - poly[i][1]) + poly[i][0]) c2 = !c2; if (c2) raw[y * W + x] = 255; }
  } else {
    for (let i = 0; i < W * H; i++) { const c = col(i % W, (i / W) | 0); if (Math.hypot(c[0] - wc[0], c[1] - wc[1], c[2] - wc[2]) < T) raw[i] = 255; }
  }
  // soften + re-threshold, then keep blobs that touch the corridor
  let mbuf = await sharp(Buffer.from(raw), { raw: { width: W, height: H, channels: 1 } }).blur(2.5).extractChannel(0).raw().toBuffer();
  for (let i = 0; i < mbuf.length; i++) mbuf[i] = mbuf[i] > 140 ? 255 : 0;
  const comp = new Int32Array(W * H).fill(-1); let nComp = 0; const keep = [];
  for (let i = 0; i < W * H; i++) {
    if (!mbuf[i] || comp[i] >= 0) continue;
    const st = [i]; comp[i] = nComp; let size = 0, inside = 0;
    while (st.length) { const u = st.pop(); size++; if (corridor[u]) inside++; const ux = u % W, uy = (u / W) | 0;
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const vx = ux + dx, vy = uy + dy; if (vx < 0 || vy < 0 || vx >= W || vy >= H) continue; const v = vy * W + vx; if (mbuf[v] && comp[v] < 0) { comp[v] = nComp; st.push(v); } } }
    keep[nComp++] = seeds ? size >= 200 : size >= 400 && inside >= size * 0.5;
  }
  let kept = 0;
  for (let i = 0; i < W * H; i++) { if (mbuf[i] && !keep[comp[i]]) mbuf[i] = 0; if (mbuf[i]) kept++; }
  let core = 0, coreHit = 0;
  for (let y = 0; y < H; y += 2) for (let x = 0; x < W; x += 2) { const p = project(x, y); if ((p.r && p.d < p.r.w * 0.25) || inLake(x, y, 0.5)) { core++; if (mbuf[y * W + x]) coreHit++; } }
  if (!seeds && (!kept || coreHit < core * 0.25)) {
    console.warn(`${id}: painted water not found by colour (${kept} px), using the drawn shapes`);
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const p = project(x, y); mbuf[y * W + x] = (p.r && p.d < p.r.w / 2) || inLake(x, y) ? 255 : 0; }
  }
  const hard = Buffer.from(mbuf);
  mbuf = await sharp(mbuf, { raw: { width: W, height: H, channels: 1 } }).blur(1.2).extractChannel(0).raw().toBuffer();

  // --- distance to the bank (chamfer) -> how wide the water is here -> calmness
  const bank = new Float32Array(W * H);
  for (let i = 0; i < W * H; i++) bank[i] = hard[i] ? 1e6 : 0;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const i = y * W + x; if (!bank[i]) continue; let d = bank[i]; if (x) d = Math.min(d, bank[i - 1] + 1); if (y) d = Math.min(d, bank[i - W] + 1); if (x && y) d = Math.min(d, bank[i - W - 1] + 1.414); if (y && x < W - 1) d = Math.min(d, bank[i - W + 1] + 1.414); bank[i] = d; }
  for (let y = H - 1; y >= 0; y--) for (let x = W - 1; x >= 0; x--) { const i = y * W + x; if (!bank[i]) continue; let d = bank[i]; if (x < W - 1) d = Math.min(d, bank[i + 1] + 1); if (y < H - 1) d = Math.min(d, bank[i + W] + 1); if (x < W - 1 && y < H - 1) d = Math.min(d, bank[i + W + 1] + 1.414); if (y < H - 1 && x) d = Math.min(d, bank[i + W - 1] + 1.414); bank[i] = d; }

  // --- distance downstream: geodesic distance inside the painted water from each river's
  // source (the water pixel nearest its first drawn point); blobs without one start at their top-left
  const geo = new Float32Array(W * H).fill(Infinity);
  const nearestWater = ([sx, sy]) => { let best = -1, bd = 1e9; for (let y = Math.max(0, (sy | 0) - 160); y < Math.min(H, (sy | 0) + 160); y++) for (let x = Math.max(0, (sx | 0) - 160); x < Math.min(W, (sx | 0) + 160); x++) if (hard[y * W + x]) { const d = Math.hypot(x - sx, y - sy); if (d < bd) { bd = d; best = y * W + x; } } return best; };
  const seeded = new Set();
  for (const [x, y] of seeds || []) { const i = nearestWater([x, y]); if (i >= 0 && !seeded.has(comp[i])) { geo[i] = 0; seeded.add(comp[i]); } }
  if (!seeds) for (const r of rivers) { const i = nearestWater(r.pts[0]); if (i >= 0) { geo[i] = 0; seeded.add(comp[i]); } }
  for (let i = 0; i < W * H; i++) if (hard[i] && !seeded.has(comp[i])) { seeded.add(comp[i]); geo[i] = 0; }
  // geodesic distance inside the water: chamfer passes repeated until nothing changes
  for (let pass = 0; pass < 400; pass++) {
    let changed = 0;
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const i = y * W + x; if (!hard[i]) continue; let d = geo[i];
      if (x && hard[i - 1]) d = Math.min(d, geo[i - 1] + 1); if (y && hard[i - W]) d = Math.min(d, geo[i - W] + 1);
      if (x && y && hard[i - W - 1]) d = Math.min(d, geo[i - W - 1] + 1.414); if (y && x < W - 1 && hard[i - W + 1]) d = Math.min(d, geo[i - W + 1] + 1.414);
      if (d < geo[i]) { geo[i] = d; changed++; } }
    for (let y = H - 1; y >= 0; y--) for (let x = W - 1; x >= 0; x--) { const i = y * W + x; if (!hard[i]) continue; let d = geo[i];
      if (x < W - 1 && hard[i + 1]) d = Math.min(d, geo[i + 1] + 1); if (y < H - 1 && hard[i + W]) d = Math.min(d, geo[i + W] + 1);
      if (x < W - 1 && y < H - 1 && hard[i + W + 1]) d = Math.min(d, geo[i + W + 1] + 1.414); if (y < H - 1 && x && hard[i + W - 1]) d = Math.min(d, geo[i + W - 1] + 1.414);
      if (d < geo[i]) { geo[i] = d; changed++; } }
    if (!changed) break;
  }
  for (let i = 0; i < W * H; i++) if (hard[i] && geo[i] === Infinity) geo[i] = 0;
  for (let i = 0; i < W * H; i++) if (mbuf[i] && geo[i] === Infinity) { // soft edge pixels outside the hard mask: take the nearest hard neighbour
    const x = i % W, y = (i / W) | 0; let g = Infinity; for (let dy = -3; dy <= 3; dy++) for (let dx = -3; dx <= 3; dx++) { const v = (y + dy) * W + x + dx; if (v >= 0 && v < W * H && geo[v] < g) g = geo[v]; } geo[i] = g === Infinity ? 0 : g; }

  // crop = bounding box of the water (+ pad)
  let x0 = W, y0 = H, x1 = 0, y1 = 0;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (mbuf[y * W + x] > 8) { x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y); }
  x0 = Math.max(0, x0 - 6); y0 = Math.max(0, y0 - 6); x1 = Math.min(W - 1, x1 + 6); y1 = Math.min(H - 1, y1 + 6);
  if (x1 < x0) { console.warn(`${id}: no water found`); continue; }
  const cw = x1 - x0 + 1, ch = y1 - y0 + 1;
  let gmax = 0; for (let i = 0; i < W * H; i++) if (mbuf[i] && geo[i] > gmax) gmax = geo[i];
  const sMax = Math.ceil(gmax * 2 + 64), nScale = 1;
  const lakeCalm = (LAKE_CALM[id] || [])[0] ?? CALM.lake;
  const mrgb = Buffer.alloc(cw * ch * 3), flow = Buffer.alloc(cw * ch * 3);
  for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) {
    const gi = (y + y0) * W + x + x0, o = (y * cw + x) * 3, a = mbuf[gi];
    mrgb[o] = a; if (!a) continue;
    const wide = Math.max(0, Math.min(1, (bank[gi] - 16) / 14)); // 0 = river, 1 = open lake/sea
    mrgb[o + 1] = Math.round(CALM.river * (1 - wide) + lakeCalm * wide);
    const s16 = Math.max(0, Math.min(65535, Math.round(((geo[gi] * 2) / sMax) * 65535)));
    flow[o] = s16 >> 8; flow[o + 1] = s16 & 255; flow[o + 2] = Math.max(0, Math.min(255, Math.round(128 + Math.min(127, bank[gi] * 2) / nScale)));
  }
  const painting = await sharp(pfile).resize(W, H).removeAlpha().extract({ left: x0, top: y0, width: cw, height: ch }).raw().toBuffer();
  await sharp(painting, { raw: { width: cw, height: ch, channels: 3 } }).webp({ quality: 90 }).toFile(`${outDir}/${id}_river.webp`);
  await sharp(mrgb, { raw: { width: cw, height: ch, channels: 3 } }).webp({ lossless: true }).toFile(`${outDir}/${id}_river_mask.webp`);
  await sharp(flow, { raw: { width: cw, height: ch, channels: 3 } }).png({ compressionLevel: 9 }).toFile(`${outDir}/${id}_river_flow.png`);
  meta[id] = { crop: { left: x0 * 2, top: y0 * 2, width: cw * 2, height: ch * 2 }, sMax, nScale: nScale };
  // debug: mask over the painting
  const dbg = Buffer.from(painting); for (let i = 0; i < cw * ch; i++) if (mrgb[i * 3]) { dbg[i * 3] = dbg[i * 3] * 0.4; dbg[i * 3 + 1] = dbg[i * 3 + 1] * 0.4 + 150; dbg[i * 3 + 2] = dbg[i * 3 + 2] * 0.4 + 120; }
  await sharp(dbg, { raw: { width: cw, height: ch, channels: 3 } }).png().toFile(`${outDir}/_dbg_${id}.png`);
  console.log(id, 'crop', JSON.stringify(meta[id].crop), 'T', Math.round(T));
}
fs.writeFileSync(`${outDir}/rivers.json`, JSON.stringify(meta, null, 1));
