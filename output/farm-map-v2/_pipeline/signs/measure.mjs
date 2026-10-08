// Measures where the farm sign text should sit on each sign's art (frame 0):
// the main board face for the owner's name, the banner plaque for the word.
// Usage: node measure.mjs [outJson] [overlayPng]
import sharp from '/Users/ioannis/dev/ImageCreation/node_modules/sharp/lib/index.js';
import fs from 'fs';

const SIGN_DIR = '/Users/ioannis/dev/TinyHarvest-fm-signs/assets/images/farm-map/signs';
const W = 768, H = 512;
// Per-sign seed overrides, as fractions: where the board face / plaque face is surely.
const OVERRIDES = JSON.parse(fs.readFileSync(new URL('./overrides.json', import.meta.url)));
// Seeds: a point surely on the board face (y, at x 0.36 and 0.64) and on the
// plaque, per sign (first hand-placed values; frozen so re-runs agree).
const SEEDS = JSON.parse(fs.readFileSync(new URL('./seeds.json', import.meta.url)));
const HAND = Object.fromEntries(Object.entries(SEEDS).map(([id, s]) => [id, { bx: s.banner[0], by: s.banner[1], ty: s.board }]));

async function load(id) {
  const img = sharp(`${SIGN_DIR}/${id}.webp`, { page: 0 }).resize(W, H);
  const blurred = await img.clone().blur(1.6).ensureAlpha().raw().toBuffer();
  return blurred;
}

function patchColor(px, cx, cy, r = 6) {
  const vals = [[], [], []];
  for (let y = cy - r; y <= cy + r; y++) for (let x = cx - r; x <= cx + r; x++) {
    const i = (y * W + x) * 4;
    if (px[i + 3] < 200) continue;
    for (let c = 0; c < 3; c++) vals[c].push(px[i + c]);
  }
  return vals.map((v) => { v.sort((a, b) => a - b); return v[v.length >> 1]; });
}

/** Pixels close in colour to `ref`, closed by `close` px, the component holding the seeds. */
const lum = (r, g, b) => 0.299 * r + 0.587 * g + 0.114 * b;
function region(px, seeds, ref, tol, close, dark = 0.6) {
  let mask = new Uint8Array(W * H);
  const refLum = lum(...ref);
  for (let p = 0; p < W * H; p++) {
    const i = p * 4;
    if (px[i + 3] < 200) continue;
    if (lum(px[i], px[i + 1], px[i + 2]) < refLum * dark) continue;
    const d = Math.hypot(px[i] - ref[0], px[i + 1] - ref[1], px[i + 2] - ref[2]);
    if (d < tol) mask[p] = 1;
  }
  if (close > 0) mask = erode(dilate(mask, close), close);
  const out = new Uint8Array(W * H);
  const stack = [];
  for (const [sx, sy] of seeds) { const p = sy * W + sx; if (mask[p] && !out[p]) { out[p] = 1; stack.push(p); } }
  while (stack.length) {
    const p = stack.pop(); const x = p % W, y = (p / W) | 0;
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nx = x + dx, ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
      const q = ny * W + nx;
      if (mask[q] && !out[q]) { out[q] = 1; stack.push(q); }
    }
  }
  return out;
}
function morph(mask, r, isDilate) {
  // separable square structuring element
  const tmp = new Uint8Array(W * H), out = new Uint8Array(W * H);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    let v = isDilate ? 0 : 1;
    for (let k = -r; k <= r; k++) { const xx = Math.min(W - 1, Math.max(0, x + k)); const m = mask[y * W + xx]; if (isDilate ? m : !m) { v = isDilate ? 1 : 0; break; } }
    tmp[y * W + x] = v;
  }
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    let v = isDilate ? 0 : 1;
    for (let k = -r; k <= r; k++) { const yy = Math.min(H - 1, Math.max(0, y + k)); const m = tmp[yy * W + x]; if (isDilate ? m : !m) { v = isDilate ? 1 : 0; break; } }
    out[y * W + x] = v;
  }
  return out;
}
const dilate = (m, r) => morph(m, r, true);
const erode = (m, r) => morph(m, r, false);

/** Longest run of rows (within columns x0..x1) at least `frac` covered. */
function rowRun(mask, x0, x1, frac, yLo = 0, yHi = H - 1) {
  let best = [0, -1], start = -1;
  for (let y = yLo; y <= yHi + 1; y++) {
    let n = 0;
    if (y <= yHi) for (let x = x0; x <= x1; x++) n += mask[y * W + x];
    const ok = y <= yHi && n >= frac * (x1 - x0 + 1);
    if (ok && start < 0) start = y;
    if (!ok && start >= 0) { if (y - 1 - start > best[1] - best[0]) best = [start, y - 1]; start = -1; }
  }
  return best;
}
/** First..last row / column (inside the window) at least `frac` covered. */
function extent(mask, axis, a0, a1, b0, b1, frac) {
  let lo = -1, hi = -1;
  for (let b = b0; b <= b1; b++) {
    let n = 0;
    for (let a = a0; a <= a1; a++) n += axis === 'rows' ? mask[b * W + a] : mask[a * W + b];
    if (n >= frac * (a1 - a0 + 1)) { if (lo < 0) lo = b; hi = b; }
  }
  return [lo, hi];
}
function colRun(mask, y0, y1, frac) {
  let best = [0, -1], start = -1;
  for (let x = 0; x <= W; x++) {
    let n = 0;
    if (x < W) for (let y = y0; y <= y1; y++) n += mask[y * W + x];
    const ok = x < W && n >= frac * (y1 - y0 + 1);
    if (ok && start < 0) start = x;
    if (!ok && start >= 0) { if (x - 1 - start > best[1] - best[0]) best = [start, x - 1]; start = -1; }
  }
  return best;
}

const r4 = (v) => Math.round(v * 1000) / 1000;

export async function measure(id) {
  const o = OVERRIDES[id] ?? {};
  const px = await load(id);
  // ---- board face ----
  const ty = HAND[id]?.ty ?? 0.62;
  const bSeeds = (o.boardSeeds ?? [[0.36, ty], [0.64, ty]]).map(([x, y]) => [Math.round(x * W), Math.round(y * H)]);
  const bRef = patchColor(px, bSeeds[0][0], bSeeds[0][1]);
  const board = region(px, bSeeds, bRef, o.boardTol ?? 48, o.boardClose ?? 4, o.boardDark ?? 0.55);
  // rows where the central band (where the name goes) is face
  const band = o.band ?? [0.32, 0.68];
  const [by0, by1] = rowRun(board, Math.round(band[0] * W), Math.round(band[1] * W), 0.8);
  const [bx0, bx1] = colRun(board, by0 + Math.round((by1 - by0) * 0.35), by1 - Math.round((by1 - by0) * 0.35), o.boardColFrac ?? 0.8);
  // ---- planks: dark seams across the face split it; the name sits on one plank ----
  const bandX0 = Math.round(band[0] * W), bandX1 = Math.round(band[1] * W);
  const rowLum = [];
  for (let y = by0; y <= by1; y++) {
    let sum = 0, n = 0;
    for (let x = bandX0; x <= bandX1; x++) { const i = (y * W + x) * 4; sum += lum(px[i], px[i + 1], px[i + 2]); n++; }
    rowLum.push(sum / n);
  }
  const sorted = [...rowLum].sort((a, b) => a - b), med = sorted[sorted.length >> 1];
  const seams = [];
  for (let k = 2; k < rowLum.length - 2; k++) {
    const v = rowLum[k];
    if (v < med * (o.seamDark ?? 0.8) && v <= rowLum[k - 1] && v <= rowLum[k + 1] && v <= rowLum[k - 2] && v <= rowLum[k + 2]) {
      if (seams.length && k - seams[seams.length - 1] < 8) { if (v < rowLum[seams[seams.length - 1]]) seams[seams.length - 1] = k; continue; }
      seams.push(k);
    }
  }
  const edges = [0, ...seams, by1 - by0];
  const planks = edges.slice(1).map((e, k) => [by0 + edges[k], by0 + e]);
  const faceMid = (by0 + by1) / 2;
  const MIN_PLANK = (o.minPlank ?? 0.12) * H;
  let nameRows = [by0, by1];
  // Only when a seam would run through the middle of the letters: move onto
  // the taller of the two planks beside it.
  const seam = seams.find((k) => Math.abs(by0 + k - faceMid) < 0.035 * H);
  if (o.nameRows) nameRows = o.nameRows.map((f) => Math.round(f * H));
  else if (seam !== undefined && o.planks !== false) {
    const beside = planks.filter(([a, b]) => a === by0 + seam || b === by0 + seam).filter(([a, b]) => b - a >= MIN_PLANK);
    if (beside.length) nameRows = beside.reduce((best, p) => (p[1] - p[0] > best[1] - best[0] ? p : best));
  }
  // ---- banner plaque ----
  const pSeed = [Math.round((o.plaqueSeed?.[0] ?? HAND[id]?.bx ?? 0.5) * W), Math.round((o.plaqueSeed?.[1] ?? HAND[id]?.by ?? 0.3) * H)];
  const pRef = patchColor(px, pSeed[0], pSeed[1], 4);
  const plaque = region(px, [pSeed], pRef, o.plaqueTol ?? 40, o.plaqueClose ?? 2, o.plaqueDark ?? 0.7);
  const cx0 = pSeed[0] - 40, cx1 = pSeed[0] + 40;
  const [py0, py1] = extent(plaque, 'rows', cx0, cx1, Math.max(0, pSeed[1] - 120), Math.min(H - 1, pSeed[1] + 120), 0.5);
  const [px0, px1] = extent(plaque, 'cols', py0 + Math.round((py1 - py0) * 0.3), py1 - Math.round((py1 - py0) * 0.3), 0, W - 1, 0.5);
  // The bend: how far the plaque's centre line drops a way out from the middle.
  const pcx = (px0 + px1) / 2, pcy = (py0 + py1) / 2;
  const archs = [];
  for (const f of [0.3, 0.38]) for (const sgn of [-1, 1]) {
    const x = Math.round(pcx + sgn * f * (px1 - px0));
    const [a, b] = extent(plaque, 'rows', x - 3, x + 3, Math.max(0, py0 - 40), Math.min(H - 1, py1 + 40), 0.5);
    if (a < 0) continue;
    const u = (x - pcx) / W;
    archs.push(((a + b) / 2 - pcy) / H / (u * u));
  }
  archs.sort((a, b) => a - b);
  const arch = archs.length ? archs[archs.length >> 1] : 0;
  return {
    id,
    board: { y0: by0 / H, y1: by1 / H, x0: bx0 / W, x1: bx1 / W },
    plaque: { y0: py0 / H, y1: py1 / H, x0: px0 / W, x1: px1 / W },
    // The name is always centred across the art, so its room is twice the nearer side.
    seams: seams.map((k) => r4((by0 + k) / H)),
    title: { y: r4((nameRows[0] + nameRows[1]) / 2 / H), h: r4((nameRows[1] - nameRows[0]) / H), widthFraction: r4((2 * Math.min(W / 2 - bx0, bx1 - W / 2)) / W) },
    banner: { x: r4((px0 + px1) / 2 / W), y: r4((py0 + py1) / 2 / H), w: r4((px1 - px0) / W), h: r4((py1 - py0) / H), arch: Math.round(arch * 20) / 20 },
    masks: { board, plaque },
    seeds: [...bSeeds, pSeed],
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const ids = fs.readdirSync(SIGN_DIR).filter((f) => f.endsWith('.webp')).map((f) => f.replace('.webp', ''));
  const only = process.env.ONLY?.split(',');
  const results = [];
  const tiles = [];
  for (const id of ids) {
    if (only && !only.includes(id)) continue;
    const m = await measure(id);
    results.push({ id, title: m.title, banner: m.banner, seams: m.seams });
    // overlay: board mask green, plaque mask blue, boxes
    const ov = Buffer.alloc(W * H * 4);
    for (let p = 0; p < W * H; p++) {
      if (m.masks.board[p]) { ov[p * 4 + 1] = 255; ov[p * 4 + 3] = 90; }
      if (m.masks.plaque[p]) { ov[p * 4 + 2] = 255; ov[p * 4 + 3] = 110; }
    }
    const R = (b, c) => `<rect x="${b.x0 * W}" y="${b.y0 * H}" width="${(b.x1 - b.x0) * W}" height="${(b.y1 - b.y0) * H}" fill="none" stroke="${c}" stroke-width="3"/>`;
    const svg = `<svg width="${W}" height="${H}">${R(m.board, 'red')}${R(m.plaque, 'magenta')}
      ${m.seams.map((y) => `<line x1="0" x2="${W}" y1="${y * H}" y2="${y * H}" stroke="cyan" stroke-width="2"/>`).join('')}
      <line x1="0" x2="${W}" y1="${m.title.y * H}" y2="${m.title.y * H}" stroke="red"/>
      <line x1="0" x2="${W}" y1="${m.banner.y * H}" y2="${m.banner.y * H}" stroke="magenta"/>
      ${m.seeds.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="yellow" stroke="black"/>`).join('')}
      <text x="6" y="24" font-size="22" font-family="Helvetica" fill="#000">${id}</text></svg>`;
    const base = await sharp(`${SIGN_DIR}/${id}.webp`, { page: 0 }).resize(W, H).png().toBuffer();
    tiles.push(await sharp({ create: { width: W, height: H, channels: 4, background: '#dddddd' } })
      .composite([{ input: base }, { input: ov, raw: { width: W, height: H, channels: 4 } }, { input: Buffer.from(svg) }])
      .png().toBuffer().then((b) => sharp(b).resize(W / 2, H / 2).png().toBuffer()));
  }
  if (process.argv[2]) fs.writeFileSync(process.argv[2], JSON.stringify(results, null, 1));
  if (process.argv[3]) {
    const cols = process.env.COLS ? +process.env.COLS : 6, tw = W / 2, th = H / 2, rows = Math.ceil(tiles.length / cols);
    await sharp({ create: { width: cols * tw, height: rows * th, channels: 4, background: '#fff' } })
      .composite(tiles.map((t, i) => ({ input: t, left: (i % cols) * tw, top: Math.floor(i / cols) * th })))
      .png().toFile(process.argv[3]);
  }
  for (const r of results) console.log(r.id.padEnd(16), JSON.stringify(r.title), 'seams', JSON.stringify(r.seams));
}
