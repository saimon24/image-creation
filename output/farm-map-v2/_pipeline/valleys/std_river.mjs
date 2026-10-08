// usage: node std_river.mjs <painting 2048x3072> <outDir>
// Water data for the standard valley after the dock cove (dockpaint_standard.mjs):
//  1. bend mode (today's shader, SceneRiver BEND_SHADER): the app's river_mask.webp + the cove, crop grown
//     downwards to hold it -> river_mask.webp, river_sunrise.webp (crop of the new painting), bend.json
//  2. flow-map mode (what the themes use; lets the cove lie calm): standard_river.webp, standard_river_mask.webp
//     (R coverage, G calmness 255 stream .. 55 cove), standard_river_flow.png, rivers.json {crop, sMax, nScale}
//     — same encoding as rivers.mjs (assets at half the painting's resolution).
// The cove's water = blue pixels inside the pasted oval (…cove_<suf>.dock.json) joined to the old stream.
import fs from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire('/Users/ioannis/dev/ImageCreation/package.json');
const sharp = require('sharp');
const APP = '/Users/ioannis/dev/TinyHarvest-farmmap/assets/images/farm-map/scene';
const [pfile, outDir] = process.argv.slice(2);
const dock = JSON.parse(fs.readFileSync(pfile.replace(/\.(png|webp)$/, '.dock.json'), 'utf8'));
fs.mkdirSync(outDir, { recursive: true });
const PW = 2048, PH = 3072, RIVER = { left: 900, top: 0, width: 1148, height: 1200 };
const paint = await sharp(pfile).removeAlpha().raw().toBuffer();
const old = await sharp(`${APP}/river_mask.webp`).extractChannel(0).raw().toBuffer();
// --- full-res mask: old stream + blue pixels in the pasted oval that touch it
const full = new Uint8Array(PW * PH);
for (let y = 0; y < RIVER.height; y++) for (let x = 0; x < RIVER.width; x++) full[(y + RIVER.top) * PW + x + RIVER.left] = old[y * RIVER.width + x];
const ocx = dock.cx, ocy = dock.cy; // painting px
const cand = new Uint8Array(PW * PH);
for (let y = Math.floor(ocy - dock.ry); y <= ocy + dock.ry; y++) for (let x = Math.floor(ocx - dock.rx); x <= ocx + dock.rx; x++) {
  if (x < 0 || y < 0 || x >= PW || y >= PH || ((x - ocx) / dock.rx) ** 2 + ((y - ocy) / dock.ry) ** 2 > 1) continue;
  const o = (y * PW + x) * 3, r = paint[o], g = paint[o + 1], b = paint[o + 2];
  if (b - r > 35 && b >= g) cand[y * PW + x] = 1;
}
// smooth the candidates (fills ripple highlights), keep the part connected to the stream
let sm = await sharp(Buffer.from(cand.map((v) => v * 255)), { raw: { width: PW, height: PH, channels: 1 } }).blur(3).extractChannel(0).raw().toBuffer();
const seen = new Uint8Array(PW * PH), st = [];
for (let i = 0; i < PW * PH; i++) if (sm[i] > 110 && full[i] > 127) { seen[i] = 1; st.push(i); }
while (st.length) { const u = st.pop(), ux = u % PW, uy = (u / PW) | 0;
  for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const vx = ux + dx, vy = uy + dy; if (vx < 0 || vy < 0 || vx >= PW || vy >= PH) continue; const v = vy * PW + vx; if (!seen[v] && sm[v] > 110) { seen[v] = 1; st.push(v); } } }
let added = 0;
for (let i = 0; i < PW * PH; i++) if (seen[i] && full[i] < 255) { full[i] = 255; added++; }
const fullSoft = await sharp(Buffer.from(full), { raw: { width: PW, height: PH, channels: 1 } }).blur(1.2).extractChannel(0).raw().toBuffer();
// --- 1. bend mode: same crop left/width, grown downwards to the cove's bottom + pad
let yMax = 0; for (let i = 0; i < PW * PH; i++) if (fullSoft[i] > 8) yMax = Math.max(yMax, (i / PW) | 0);
const bend = { left: RIVER.left, top: RIVER.top, width: RIVER.width, height: Math.min(PH, Math.ceil((yMax + 12) / 8) * 8) };
const bm = Buffer.alloc(bend.width * bend.height * 3);
for (let y = 0; y < bend.height; y++) for (let x = 0; x < bend.width; x++) { const v = fullSoft[(y + bend.top) * PW + x + bend.left], o = (y * bend.width + x) * 3; bm[o] = bm[o + 1] = bm[o + 2] = v; }
await sharp(bm, { raw: { width: bend.width, height: bend.height, channels: 3 } }).webp({ lossless: true }).toFile(`${outDir}/river_mask.webp`);
await sharp(paint, { raw: { width: PW, height: PH, channels: 3 } }).extract(bend).webp({ quality: 90 }).toFile(`${outDir}/river_sunrise.webp`);
fs.writeFileSync(`${outDir}/bend.json`, JSON.stringify({ crop: bend, bend: { x: 1230, y: 905, radius: 180 } }, null, 1));
// --- 2. flow-map mode, as rivers.mjs, on the half-res painting
const W = 1024, H = 1536;
const half = await sharp(Buffer.from(fullSoft), { raw: { width: PW, height: PH, channels: 1 } }).resize(W, H).extractChannel(0).raw().toBuffer();
const hard = new Uint8Array(W * H); for (let i = 0; i < W * H; i++) hard[i] = half[i] > 127 ? 1 : 0;
const mbuf = half;
const bank = new Float32Array(W * H);
for (let i = 0; i < W * H; i++) bank[i] = hard[i] ? 1e6 : 0;
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const i = y * W + x; if (!bank[i]) continue; let d = bank[i]; if (x) d = Math.min(d, bank[i - 1] + 1); if (y) d = Math.min(d, bank[i - W] + 1); if (x && y) d = Math.min(d, bank[i - W - 1] + 1.414); if (y && x < W - 1) d = Math.min(d, bank[i - W + 1] + 1.414); bank[i] = d; }
for (let y = H - 1; y >= 0; y--) for (let x = W - 1; x >= 0; x--) { const i = y * W + x; if (!bank[i]) continue; let d = bank[i]; if (x < W - 1) d = Math.min(d, bank[i + 1] + 1); if (y < H - 1) d = Math.min(d, bank[i + W] + 1); if (x < W - 1 && y < H - 1) d = Math.min(d, bank[i + W + 1] + 1.414); if (y < H - 1 && x) d = Math.min(d, bank[i + W - 1] + 1.414); bank[i] = d; }
// source: the stream's topmost water pixel
const geo = new Float32Array(W * H).fill(Infinity);
let src = -1; for (let i = 0; i < W * H && src < 0; i++) if (hard[i]) src = i;
geo[src] = 0;
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
for (let i = 0; i < W * H; i++) if (mbuf[i] && geo[i] === Infinity) { const x = i % W, y = (i / W) | 0; let g = Infinity; for (let dy = -3; dy <= 3; dy++) for (let dx = -3; dx <= 3; dx++) { const v = (y + dy) * W + x + dx; if (v >= 0 && v < W * H && geo[v] < g) g = geo[v]; } geo[i] = g === Infinity ? 0 : g; }
let x0 = W, y0 = H, x1 = 0, y1 = 0;
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (mbuf[y * W + x] > 8) { x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y); }
x0 = Math.max(0, x0 - 6); y0 = Math.max(0, y0 - 6); x1 = Math.min(W - 1, x1 + 6); y1 = Math.min(H - 1, y1 + 6);
const cw = x1 - x0 + 1, ch = y1 - y0 + 1;
let gmax = 0; for (let i = 0; i < W * H; i++) if (mbuf[i] && geo[i] > gmax) gmax = geo[i];
const sMax = Math.ceil(gmax * 2 + 64), nScale = 1, CALM = { river: 255, cove: 55 };
const mrgb = Buffer.alloc(cw * ch * 3), flow = Buffer.alloc(cw * ch * 3);
for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) {
  const gi = (y + y0) * W + x + x0, o = (y * cw + x) * 3, a = mbuf[gi];
  mrgb[o] = a; if (!a) continue;
  const wide = Math.max(0, Math.min(1, (bank[gi] - 16) / 14)); // 0 = stream, 1 = open cove
  mrgb[o + 1] = Math.round(CALM.river * (1 - wide) + CALM.cove * wide);
  const s16 = Math.max(0, Math.min(65535, Math.round(((geo[gi] * 2) / sMax) * 65535)));
  flow[o] = s16 >> 8; flow[o + 1] = s16 & 255; flow[o + 2] = Math.max(0, Math.min(255, Math.round(128 + Math.min(127, bank[gi] * 2) / nScale)));
}
const pic = await sharp(paint, { raw: { width: PW, height: PH, channels: 3 } }).resize(W, H).extract({ left: x0, top: y0, width: cw, height: ch }).raw().toBuffer();
await sharp(pic, { raw: { width: cw, height: ch, channels: 3 } }).webp({ quality: 90 }).toFile(`${outDir}/standard_river.webp`);
await sharp(mrgb, { raw: { width: cw, height: ch, channels: 3 } }).webp({ lossless: true }).toFile(`${outDir}/standard_river_mask.webp`);
await sharp(flow, { raw: { width: cw, height: ch, channels: 3 } }).png({ compressionLevel: 9 }).toFile(`${outDir}/standard_river_flow.png`);
const meta = { standard: { crop: { left: x0 * 2, top: y0 * 2, width: cw * 2, height: ch * 2 }, sMax, nScale } };
fs.writeFileSync(`${outDir}/rivers.json`, JSON.stringify(meta, null, 1));
// debug: the cove's mask over the painting (dock corner) + calmness
const dbg = Buffer.from(pic); for (let i = 0; i < cw * ch; i++) if (mrgb[i * 3] > 127) { const calm = mrgb[i * 3 + 1] < 200; dbg[i * 3] = dbg[i * 3] * 0.4 + (calm ? 160 : 0); dbg[i * 3 + 1] = dbg[i * 3 + 1] * 0.4 + 150; dbg[i * 3 + 2] = dbg[i * 3 + 2] * 0.4 + (calm ? 0 : 120); }
await sharp(dbg, { raw: { width: cw, height: ch, channels: 3 } }).png().toFile(`${outDir}/_dbg_standard.png`);
console.log('cove px added', added, 'bend crop', JSON.stringify(bend), 'flow', JSON.stringify(meta.standard));
