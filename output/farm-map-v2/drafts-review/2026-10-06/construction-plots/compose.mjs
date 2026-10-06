// node compose.mjs <genRaw.png> <outDir> : construction layer from a draft, laid on each ORIGINAL ring
import { sharp, keyMagenta } from '/Users/ioannis/dev/ImageCreation/output/farm-map-v2/_pipeline/keylib.mjs';
import fs from 'node:fs';
const [genPath, outDir] = process.argv.slice(2); fs.mkdirSync(outDir, { recursive: true });
const R = '/Users/ioannis/dev/TinyHarvest-farmmap/assets/images/farm-map/scene/';
const N = 1024, RING = { x: 62, y: 458, w: 900, h: 526 }; // ring box in the reference frame
const raw = async (img) => { const { data, info } = await img.ensureAlpha().raw().toBuffer({ resolveWithObject: true }); return { data, W: info.width, H: info.height }; };
const isEarth = (r, g, b) => r > 170 && b < 50 && g > 0.42 * r && g < 0.8 * r;
const isWood = (r, g, b) => r > 60 && r - b > 25 && g < 0.8 * r && r < 200 && !(g > 0.55 * r && b < 0.3 * r && r > 170);
const earthBox = (d) => { const rows = new Array(d.H).fill(0), cols = new Array(d.W).fill(0); for (let y = 0; y < d.H; y++) for (let x = 0; x < d.W; x++) { const i = (y * d.W + x) * 4; if (d.data[i + 3] > 200 && isEarth(d.data[i], d.data[i + 1], d.data[i + 2])) { rows[y]++; cols[x]++; } } const T = 12; const first = (a) => a.findIndex((v) => v > T), last = (a) => a.length - 1 - [...a].reverse().findIndex((v) => v > T); return { x0: first(cols), y0: first(rows), x1: last(cols), y1: last(rows) }; };

// 1. the draft, keyed, and its ring mapped onto the reference ring by the earth's bounding box
const gen = await raw(sharp(genPath)); keyMagenta(gen.data, gen.W, gen.H, {});
const ref = await raw(sharp('ref_fl.png')); keyMagenta(ref.data, ref.W, ref.H, {});
const gb = earthBox(gen), rb = earthBox(ref);
const sx = (rb.x1 - rb.x0) / (gb.x1 - gb.x0), sy = (rb.y1 - rb.y0) / (gb.y1 - gb.y0);
const ox = rb.x0 - gb.x0 * sx, oy = rb.y0 - gb.y0 * sy;
console.log('earth gen', gb, 'ref', rb, 'scale', sx.toFixed(3), sy.toFixed(3), 'offset', ox.toFixed(1), oy.toFixed(1));
const warped = { data: Buffer.alloc(N * N * 4), W: N, H: N };
for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
  const gx = Math.round((x - ox) / sx), gy = Math.round((y - oy) / sy);
  if (gx < 0 || gy < 0 || gx >= gen.W || gy >= gen.H) continue;
  gen.data.copy(warped.data, (y * N + x) * 4, (gy * gen.W + gx) * 4, (gy * gen.W + gx) * 4 + 4);
}

// 2. the construction layer, from three hand-measured boxes in the draft (draft pixel coords):
//    scaffold = wood + its grey feet, planks = wood, stone blocks = everything that is not earth.
//    The draft's own (redrawn) wall never gets in: the real ring is laid underneath.
const BOX = JSON.parse(process.env.BOXES || '{"scaffold":[335,170,690,655],"planks":[488,608,805,812],"blocks":[173,543,380,742]}');
const inBox = (x, y, bx) => { const gx = (x - ox) / sx, gy = (y - oy) / sy; return gx >= bx[0] && gx <= bx[2] && gy >= bx[1] && gy <= bx[3]; };
const woodish = (r, g, b) => r > 55 && r - b > 38 && g < 0.86 * r;
const feet = (r, g, b) => Math.max(r, g, b) - Math.min(r, g, b) < 28 && r < 150;
const layer = Buffer.alloc(N * N * 4);
for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
  const i = (y * N + x) * 4; if (warped.data[i + 3] < 8) continue;
  const r = warped.data[i], g = warped.data[i + 1], b = warped.data[i + 2];
  const keep = (inBox(x, y, BOX.scaffold) && (woodish(r, g, b) || (feet(r, g, b) && (y - oy) / sy > 520)) && !isEarth(r, g, b))
    || (inBox(x, y, BOX.planks) && woodish(r, g, b) && g < 0.76 * r && !isEarth(r, g, b))
    || (inBox(x, y, BOX.blocks) && !isEarth(r, g, b) && !((x - ox) / sx < 200 && (y - oy) / sy > 712) && !((x - ox) / sx < 186 && (y - oy) / sy < 600));
  if (keep) warped.data.copy(layer, i, i, i + 4);
}
{ // small holes (earth-coloured highlights on wood) come back from the draft; specks go
  const M = new Uint8Array(N * N); for (let p = 0; p < N * N; p++) M[p] = layer[p * 4 + 3] > 8 ? 1 : 0;
  const comps = (mask, val) => { const lab = new Int32Array(N * N).fill(-1), size = []; for (let p = 0; p < N * N; p++) { if (mask[p] !== val || lab[p] >= 0) continue; const id = size.length; let n = 0; const st = [p]; lab[p] = id; while (st.length) { const q = st.pop(); n++; const x = q % N; for (const r of [x > 0 ? q - 1 : -1, x < N - 1 ? q + 1 : -1, q - N, q + N]) { if (r < 0 || r >= N * N || lab[r] >= 0 || mask[r] !== val) continue; lab[r] = id; st.push(r); } } size.push(n); } return { lab, size }; };
  const holes = comps(M, 0); for (let p = 0; p < N * N; p++) if (!M[p] && holes.size[holes.lab[p]] < 700) { warped.data.copy(layer, p * 4, p * 4, p * 4 + 4); M[p] = 1; }
  const solid = comps(M, 1); for (let p = 0; p < N * N; p++) if (M[p] && solid.size[solid.lab[p]] < 900) layer[p * 4 + 3] = 0;
  await sharp(layer, { raw: { width: N, height: N, channels: 4 } }).png().toFile('layer_debug.png');
}
const cx = RING.x + RING.w / 2, cy = RING.y + RING.h / 2, rx = RING.w / 2, ry = RING.h / 2;
// contact shadow: where the draft's earth is darker than plain earth, a translucent dark wash
for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
  const i = (y * N + x) * 4; if (layer[i + 3] > 0) continue;
  const inner = ((x - cx) / (rx * 0.82)) ** 2 + ((y - cy) / (ry * 0.76)) ** 2 < 1; if (!inner) continue;
  const r = warped.data[i], g = warped.data[i + 1], b = warped.data[i + 2];
  if (warped.data[i + 3] < 200 || !isEarth(r, g, b)) continue;
  const lum = 0.3 * r + 0.59 * g + 0.11 * b; const dark = Math.max(0, Math.min(1, (150 - lum) / 70));
  if (dark > 0.05) { layer[i] = 60; layer[i + 1] = 30; layer[i + 2] = 10; layer[i + 3] = Math.round(dark * 140); }
}
const layerPng = await sharp(layer, { raw: { width: N, height: N, channels: 4 } }).png().toBuffer();
const layerFlop = await sharp(layerPng).flop().png().toBuffer();

// 3. per ring: original ring, the layer, then the ring's own FRONT stones again on top
const OUT = 1024, scale = OUT / RING.w, ringH = Math.round(374 * OUT / 640), ringTop = OUT - ringH;
const toCanvas = async (png) => { // reference frame -> output canvas (ring flush at the bottom, full width)
  const big = await sharp(png).resize(Math.round(N * scale), Math.round(N * scale)).png().toBuffer();
  const left = Math.round(RING.x * scale), top = Math.round(RING.y * scale) - ringTop;
  return sharp(big).extract({ left, top: Math.max(0, top), width: OUT, height: OUT - Math.max(0, -top) })
    .extend({ top: Math.max(0, -top), bottom: 0, left: 0, right: 0, background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
};
for (const gap of ['fl', 'fr', 'bl', 'br']) {
  const ringPng = await sharp(R + `plot_gap_${gap}.webp`).resize(OUT, ringH).png().toBuffer();
  const ring = await raw(sharp(ringPng));
  const front = Buffer.alloc(OUT * ringH * 4); // stones/moss in the front half of the ring
  for (let y = 0; y < ringH; y++) for (let x = 0; x < OUT; x++) {
    const i = (y * OUT + x) * 4; const r = ring.data[i], g = ring.data[i + 1], b = ring.data[i + 2];
    if (y > ringH * 0.52 && ring.data[i + 3] > 0 && !isEarth(r, g, b) && !(((x - OUT / 2) / (OUT * 0.4)) ** 2 + ((y - ringH / 2) / (ringH * 0.37)) ** 2 < 1)) ring.data.copy(front, i, i, i + 4);
  }
  const frontPng = await sharp(front, { raw: { width: OUT, height: ringH, channels: 4 } }).png().toBuffer();
  const mirrored = gap === 'fr' || gap === 'br';
  const lay = await toCanvas(mirrored ? layerFlop : layerPng);
  const full = await sharp({ create: { width: OUT, height: OUT, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([{ input: ringPng, left: 0, top: ringTop }, { input: lay, left: 0, top: 0 }, { input: frontPng, left: 0, top: ringTop }]).png().toBuffer();
  await sharp(full).resize(640, 640, { kernel: 'lanczos3' }).webp({ quality: 92, alphaQuality: 100 }).toFile(`${outDir}/construction_plot_${gap}.webp`);
  await sharp(full).resize(640, 640).png().toFile(`${outDir}/construction_plot_${gap}.png`);
}
console.log('ring box in 640x640 canvas: x 0..1, y', (ringTop / OUT).toFixed(4), '..1, h', (ringH / OUT).toFixed(4));
