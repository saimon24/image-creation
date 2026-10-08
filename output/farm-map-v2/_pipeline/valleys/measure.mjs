// usage: node measure.mjs <suffix> [ids...]
// Measures each raw painting valleys/drafts/<id>_<suffix>.png (1024x1536, no warping):
// finds the 16 painted plots, fits the theme's scene rect (uniform scale + offset
// against the standard plot layout), keeps the measured plot centres exactly,
// moves each deco spot onto the nearest clean open ground, and maps the theme's
// paths / water / fields into scene coordinates. Writes valleys/measure/<id>.json
// and a debug overlay valleys/measure/<id>.png.
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { PLOTS, PLOT_R, CORNERS, DECOS, THEMES } from './layout.mjs';
const require = createRequire('/Users/ioannis/dev/ImageCreation/package.json');
const sharp = require('sharp');
const V = '/Users/ioannis/dev/ImageCreation/output/farm-map-v2/valleys';
const [suf, ...only] = process.argv.slice(2);
const W = 1024, H = 1536, GS = 1.2, GCX = 531, GCY = 858; // guides are drawn 1.2x about (531, 858)
const toGuide = ([x, y]) => [GCX + (x - GCX) * GS, GCY + (y - GCY) * GS];
// standard scene rect in the 1024x1536 frame
const STD = { left: 167.5, top: 312, width: 717, height: 989.5 };
const STD_RING = { 0: [0.1583, 0.1455], 1: [0.3312, 0.1794], 2: [0.7238, 0.1541], 3: [0.3319, 0.4598], 4: [0.5035, 0.432], 5: [0.6778, 0.4689], 6: [0.1625, 0.7448], 7: [0.3271, 0.7802], 8: [0.7608, 0.7797], 9: [0.3278, 0.952], 10: [0.4909, 0.9156], 11: [0.6618, 0.9576], 12: [0.885, 0.101], 13: [0.655, 0.311], 14: [0.13, 0.536], 15: [0.5, 0.676] };
const STD_DECO = { 0: [0.89, 0.43], 1: [0.885, 0.555], 2: [0.495, 0.755], 3: [0.065, 0.395], 4: [0.25, 0.612], 5: [0.17, 0.395], 6: [0.875, 0.175], 7: [0.115, 0.615], 8: [0.955, 0.605], 9: [0.74, 0.55], 10: [0.8, 0.365], 11: [0.065, 0.83], 12: [0.2, 0.83], 13: [0.955, 0.168], 14: [0.93, 0.845] };
const STD_PROJECTS = { mine: { x: 0.2, y: 0.34, scale: 0.25 }, dock: { x: 0.9, y: 0.32, scale: 0.22 }, tree: { x: 0.11, y: 0.99, scale: 0.24 }, forge: { x: 0.9, y: 0.99, scale: 0.22 } };

fs.mkdirSync(`${V}/measure`, { recursive: true });
for (const [id, theme] of Object.entries(THEMES)) {
  if (only.length && !only.includes(id)) continue;
  const file = `${V}/drafts/${id}_${suf}.png`;
  if (!fs.existsSync(file)) continue;
  const { data } = await sharp(file).resize(W, H).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const px = (x, y) => { x = Math.max(0, Math.min(W - 1, x | 0)); y = Math.max(0, Math.min(H - 1, y | 0)); const i = (y * W + x) * 3; return [data[i], data[i + 1], data[i + 2]]; };

  // --- plots: flat patch inside, different rim round it, near where the guide put it
  const RX = PLOT_R[0] * GS, RY = PLOT_R[1] * GS;
  const ring = (n, r) => Array.from({ length: n }, (_, a) => [Math.cos(a * 2 * Math.PI / n) * r, Math.sin(a * 2 * Math.PI / n) * r]);
  const inner = [0.2, 0.45, 0.7].flatMap((r) => ring(24, r)), outer = ring(36, 1.22);
  const score = (cx, cy) => {
    const ins = inner.map(([u, v]) => px(cx + u * RX, cy + v * RY));
    const m = [0, 1, 2].map((c) => ins.reduce((s, p) => s + p[c], 0) / ins.length);
    const vr = ins.reduce((s, p) => s + (p[0] - m[0]) ** 2 + (p[1] - m[1]) ** 2 + (p[2] - m[2]) ** 2, 0) / ins.length;
    const diff = outer.map(([u, v]) => px(cx + u * RX, cy + v * RY)).filter((p) => Math.hypot(p[0] - m[0], p[1] - m[1], p[2] - m[2]) > 28).length / outer.length;
    return diff * 100 - Math.sqrt(vr) * 1.2;
  };
  const search = ([gx, gy], R, step, pen) => {
    let best = [-1e9, gx, gy];
    for (let dy = -R; dy <= R; dy += step) for (let dx = -R; dx <= R; dx += step) { const s = score(gx + dx, gy + dy) - Math.hypot(dx, dy) * pen; if (s > best[0]) best = [s, gx + dx, gy + dy]; }
    for (let dy = -3; dy <= 3; dy++) for (let dx = -3; dx <= 3; dx++) { const s = score(best[1] + dx, best[2] + dy) - Math.hypot(best[1] + dx - gx, best[2] + dy - gy) * pen; if (s > best[0]) best = [s, best[1] + dx, best[2] + dy]; }
    return best;
  };
  const found = {};
  for (const [k, p] of Object.entries(PLOTS)) { const g = toGuide(p); const b = search(g, 60, 4, 0.08); found[k] = { want: g, at: [b[1], b[2]], score: b[0] }; }
  // robust similarity fit (scale + offset) guide -> painting; re-search the outliers near the fit
  const fit = (pairs) => {
    const n = pairs.length, mx = pairs.reduce((s, p) => s + p.want[0], 0) / n, my = pairs.reduce((s, p) => s + p.want[1], 0) / n;
    const ux = pairs.reduce((s, p) => s + p.at[0], 0) / n, uy = pairs.reduce((s, p) => s + p.at[1], 0) / n;
    const num = pairs.reduce((s, p) => s + (p.want[0] - mx) * (p.at[0] - ux) + (p.want[1] - my) * (p.at[1] - uy), 0);
    const den = pairs.reduce((s, p) => s + (p.want[0] - mx) ** 2 + (p.want[1] - my) ** 2, 0);
    const s = num / den; return { s, tx: ux - s * mx, ty: uy - s * my, f: ([x, y]) => [s * x + ux - s * mx, s * y + uy - s * my] };
  };
  let inl = Object.values(found);
  for (let r = 0; r < 4; r++) { const F = fit(inl); const nx = Object.values(found).filter((p) => Math.hypot(F.f(p.want)[0] - p.at[0], F.f(p.want)[1] - p.at[1]) < 30 && p.score > 40); if (nx.length >= 8) inl = nx; }
  let F = fit(inl);
  for (const p of Object.values(found)) {
    if (inl.includes(p)) continue;
    const b = search(F.f(p.want), 50, 2, 0.15);
    p.at = b[0] > 40 ? [b[1], b[2]] : F.f(p.want); p.score = b[0]; p.fixed = b[0] > 40 ? 'refound' : 'fit';
  }
  F = fit(Object.values(found));

  // --- the theme's scene rect: the standard one carried through guide->painting fit
  const sceneOf = (gx, gy) => F.f(toGuide([gx, gy]));
  const [sl, st] = sceneOf(STD.left, STD.top), [sr, sb] = sceneOf(STD.left + STD.width, STD.top + STD.height);
  const scene = { left: sl, top: st, width: sr - sl, height: sb - st };
  const toScene = ([x, y]) => [(x - scene.left) / scene.width, (y - scene.top) / scene.height];
  const fromScene = ([u, v]) => [scene.left + u * scene.width, scene.top + v * scene.height];
  const r4 = (n) => Math.round(n * 10000) / 10000;
  const plotRings = Object.fromEntries(Object.entries(found).map(([k, p]) => { const [x, y] = toScene(p.at); return [k, { x: r4(x), y: r4(y) }]; }));
  // The owner's hand placements (theme editor exports in valleys/owner/, date order) win over the measurement;
  // the decoration spots that are still placed automatically keep clear of them.
  const OWNER = fs.existsSync(`${V}/owner`) ? fs.readdirSync(`${V}/owner`).filter((f) => f.endsWith('.json')).sort().map((f) => JSON.parse(fs.readFileSync(`${V}/owner/${f}`, 'utf8')).themes[id]).filter(Boolean) : [];
  const projects = JSON.parse(JSON.stringify(STD_PROJECTS)), ownerDecos = {};
  for (const o of OWNER) {
    for (const [k, p] of Object.entries(o.plotCentres ?? {})) plotRings[k] = { x: p.x, y: p.y };
    for (const [k, p] of Object.entries(o.projects ?? {})) projects[k] = p;
    for (const [k, p] of Object.entries(o.decorationPoints ?? {})) ownerDecos[k] = { x: p.x, y: p.y };
  }

  // --- blocked shapes (theme layout, guide coords -> painting -> scene)
  const G2S = (p) => toScene(F.f(p));
  const blocked = [];
  theme.paths.forEach((p, i) => blocked.push({ kind: 'path', label: `path ${i}`, points: p.map((q) => G2S(toGuide(q)).map(r4)), width: r4((16 * GS * F.s) / scene.width) }));
  theme.water.rivers.forEach((r, i) => blocked.push({ kind: 'path', label: `water ${i}`, points: r.pts.map((q) => G2S(toGuide(q)).map(r4)), width: r4((r.w * GS * F.s * 1.25) / scene.width) }));
  theme.water.lakes.forEach(([cx, cy, rx, ry], i) => { const [x, y] = G2S(toGuide([cx, cy])); blocked.push({ kind: 'ellipse', label: `pond ${i}`, cx: r4(x), cy: r4(y), rx: r4((rx * GS * F.s * 1.15) / scene.width), ry: r4((ry * GS * F.s * 1.15) / scene.height) }); });
  theme.zones.forEach(([, kind, g], i) => {
    if (kind === 'ellipse') { const [x, y] = G2S(toGuide([g[0], g[1]])); blocked.push({ kind: 'ellipse', label: `field ${i}`, cx: r4(x), cy: r4(y), rx: r4((g[2] * GS * F.s) / scene.width), ry: r4((g[3] * GS * F.s) / scene.height), tall: true }); }
    else blocked.push({ kind: 'poly', label: `field ${i}`, points: g.map((q) => G2S(toGuide(q)).map(r4)), tall: true });
  });

  // --- deco spots: start where the standard has them, slide onto clean open ground
  const ground = (() => { // the colour of open ground: median round the plots
    const cs = []; for (const p of Object.values(found)) for (const [u, v] of ring(24, 1.55)) cs.push(px(p.at[0] + u * RX, p.at[1] + v * RY));
    return [0, 1, 2].map((c) => cs.map((q) => q[c]).sort((a, b) => a - b)[cs.length >> 1]);
  })();
  // Same rules as engine/farm-map-deco-spots findDecorationSpotProblems, in scene coordinates.
  const TALL = 1.38, BW = 0.22 * 1.15;
  const SCALES = { 0: 0.125, 1: 0.12, 2: 0.12, 3: 0.125, 4: 0.12, 5: 0.095, 6: 0.095, 7: 0.095, 8: 0.095, 9: 0.12, 10: 0.1, 11: 0.095, 12: 0.095, 13: 0.095, 14: 0.095 };
  const STD_WH = { 0: [0.1548, 0.0667], 1: [0.1471, 0.0596], 2: [0.1457, 0.0591], 3: [0.1618, 0.0707], 4: [0.152, 0.0682], 5: [0.1653, 0.0728], 6: [0.1632, 0.0773], 7: [0.1569, 0.0743], 8: [0.1729, 0.0808], 9: [0.1555, 0.0733], 10: [0.166, 0.0808], 11: [0.1569, 0.0733], 12: [0.15, 0.065], 13: [0.15, 0.065], 14: [0.15, 0.065], 15: [0.15, 0.065] };
  const STD_SLOT_D = { 0: [-0.0003, 0.0215], 1: [-0.0002, 0.0116], 2: [-0.0008, 0.0199], 3: [-0.0009, 0.0202], 4: [-0.0005, 0.027], 5: [-0.0008, 0.0201], 6: [0.0005, 0.0212], 7: [0.0019, 0.0198], 8: [-0.0008, 0.0203], 9: [0.0012, 0.014], 10: [-0.0009, 0.0164], 11: [0.0022, 0.0114], 12: [0, 0.024], 13: [0, 0.024], 14: [0, 0.024], 15: [0, 0.024] };
  const rings = Object.fromEntries(Object.entries(plotRings).map(([k, p]) => [k, { ...p, w: STD_WH[k][0], h: STD_WH[k][1] }]));
  const slots = Object.fromEntries(Object.entries(plotRings).map(([k, p]) => [k, { x: p.x + STD_SLOT_D[k][0], y: p.y + STD_SLOT_D[k][1] }]));
  const boxOf = (p, sc) => { const h = sc / TALL; return { left: p.x - sc / 2, right: p.x + sc / 2, top: p.y - h * 0.8, bottom: p.y + h * 0.2 }; };
  const share = (a, b) => { const w = Math.min(a.right, b.right) - Math.max(a.left, b.left), h = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top); return w <= 0 || h <= 0 ? 0 : (w * h) / ((a.right - a.left) * (a.bottom - a.top)); };
  const footOf = (p, sc) => { const rx = sc * 0.36, ry = (sc * 0.14) / TALL, pts = [[p.x, p.y]]; for (let i = 0; i < 16; i++) { const a = (i / 16) * Math.PI * 2; pts.push([p.x + Math.cos(a) * rx, p.y + Math.sin(a) * ry], [p.x + Math.cos(a) * rx * 0.55, p.y + Math.sin(a) * ry * 0.55]); } return pts; };
  const bodyOf = (p, sc) => { const h = sc / TALL, pts = []; for (let i = 0; i <= 4; i++) for (let j = 1; j <= 4; j++) pts.push([p.x - sc * 0.25 + (i / 4) * sc * 0.5, p.y - (j / 4) * h * 0.5]); return pts; };
  const waterFile = `${V}/water/${id}.png`;
  const water = fs.existsSync(waterFile) ? await sharp(waterFile).resize(W, H).extractChannel(0).raw().toBuffer() : null;
  const wet = (u, v) => { if (!water) return false; const [x, y] = fromScene([u, v]); const xi = Math.round(x), yi = Math.round(y); if (xi < 0 || yi < 0 || xi >= W || yi >= H) return false; for (let dy = -6; dy <= 6; dy += 3) for (let dx = -6; dx <= 6; dx += 3) { const xx = xi + dx, yy = yi + dy; if (xx >= 0 && yy >= 0 && xx < W && yy < H && water[yy * W + xx] > 127) return true; } return false; };
  const legal = (k, p, chosen) => {
    const sc = SCALES[k], box = boxOf(p, sc), foot = footOf(p, sc), body = bodyOf(p, sc);
    if (foot.some(([u, v]) => wet(u, v))) return false;
    if (box.left < -0.01 || box.right > 1.01 || box.top < -0.01 || p.y > 0.99) return false;
    for (const b of blocked) { if (foot.some(([x, y]) => insideShape(b, x, y))) return false; if (b.tall && body.some(([x, y]) => insideShape(b, x, y))) return false; }
    for (const [sk, r] of Object.entries(rings)) {
      if (foot.some(([x, y]) => ((x - r.x) / (r.w * 0.6)) ** 2 + ((y - r.y) / (r.h * 0.65)) ** 2 <= 1)) return false;
      const f = slots[sk], h = BW / TALL;
      if (Math.abs(p.x - f.x) < BW * 0.42 && p.y < f.y && p.y > f.y - h * 0.8) return false;
      if (share(box, { left: f.x - BW / 2, right: f.x + BW / 2, top: f.y - h * 0.8, bottom: f.y }) > 0.3) return false;
    }
    for (const pr of Object.values(projects)) { const h = pr.scale / TALL; if (share(box, { left: pr.x - (pr.scale / 2) * 0.85, right: pr.x + (pr.scale / 2) * 0.85, top: pr.y - h * 0.8, bottom: pr.y }) > 0.15) return false; }
    for (const [ok, op] of Object.entries(chosen)) {
      const osc = SCALES[ok], dx = (p.x - op.x) / ((sc + osc) * 0.36), dy = ((p.y - op.y) * TALL) / ((sc + osc) * 0.14);
      const ob = boxOf(op, osc); if (dx * dx + dy * dy < 1.44 || Math.max(share(box, ob), share(ob, box)) > 0.15) return false;
    }
    return true;
  };
  // how much is painted on a spot's foot and body (difference from open ground + texture)
  const clutter = (k, p) => {
    const sc = SCALES[k] * scene.width, [x, y] = fromScene([p.x, p.y]), fx = sc * 0.36, fy = (sc * 0.14) / TALL * (scene.width / scene.height) * (scene.height / scene.width), bh = sc * 0.55;
    let sum = 0, n = 0; const lum = [];
    for (let j = -bh; j <= sc * 0.08; j += 4) for (let i = -fx; i <= fx; i += 4) {
      const p2 = px(x + i, y + j); sum += Math.hypot(p2[0] - ground[0], p2[1] - ground[1], p2[2] - ground[2]); n++; lum.push(p2[0] * 0.3 + p2[1] * 0.59 + p2[2] * 0.11);
    }
    const m = lum.reduce((a, b) => a + b, 0) / lum.length;
    return sum / n + Math.sqrt(lum.reduce((a, b) => a + (b - m) ** 2, 0) / lum.length) * 1.5;
  };
  const chosenS = { ...ownerDecos };
  // place the big showpieces first, then the rest
  for (const k of Object.keys(STD_DECO).filter((k) => !ownerDecos[k]).sort((a, b) => SCALES[b] - SCALES[a])) {
    const [u0, v0] = STD_DECO[k];
    let best = null;
    for (const R of [1, 2.5, 4, 10]) {
      for (let dv = -0.07 * R; dv <= 0.0701 * R; dv += 0.007) for (let du = -0.09 * R; du <= 0.0901 * R; du += 0.009) {
        const p = { x: u0 + du, y: v0 + dv };
        if (!legal(k, p, chosenS)) continue;
        const c = clutter(k, p) + Math.hypot(du, dv) * 220;
        if (!best || c < best[0]) best = [c, p];
      }
      if (best) break;
    }
    if (!best) { console.warn(`${id}: no legal ground for deco ${k}`); best = [0, { x: u0, y: v0 }]; }
    chosenS[k] = best[1];
  }
  const chosen = Object.fromEntries(Object.entries(chosenS).map(([k, p]) => [k, fromScene([p.x, p.y])]));
  const decoPx = 44 * F.s * GS, decoPy = 20 * F.s * GS, body = 70 * F.s * GS;
  const decorationPoints = Object.fromEntries(Object.entries(chosenS).sort((a, b) => a[0] - b[0]).map(([k, p]) => [k, { x: r4(p.x), y: r4(p.y) }]));

  // --- walk graph: the routed paths as polylines in scene coordinates
  // snap each path's ends onto the measured plot it leads to
  const walkways = theme.paths.map((p, i) => {
    const w = p.map((q) => G2S(toGuide(q)).map(r4));
    const [a, b] = theme.edges[i];
    if (typeof a === 'number') w[0] = [plotRings[a].x, plotRings[a].y];
    if (typeof b === 'number') w[w.length - 1] = [plotRings[b].x, plotRings[b].y];
    return w;
  });
  const edge = []; for (const y of [2, 6, H - 3, H - 7]) for (let x = 0; x < W; x += 8) edge.push(px(x, y));
  const edgeTone = '#' + [0, 1, 2].map((c) => Math.round(edge.reduce((s, p) => s + p[c], 0) / edge.length).toString(16).padStart(2, '0')).join('');
  const out = {
    id, scale: r4(F.s * GS), scene: Object.fromEntries(Object.entries(scene).map(([k, v]) => [k, Math.round(v * 2)])), // in the 2048x3072 painting
    plotRings, decorationPoints, blocked, walkways, edgeTone,
    fit: { s: F.s, tx: F.tx, ty: F.ty }, // guide (1.2 frame) -> painting px in the 1024x1536 draft
    plotFit: Object.fromEntries(Object.entries(found).map(([k, p]) => [k, { score: Math.round(p.score), ...(p.fixed ? { fixed: p.fixed } : {}) }])),
  };
  fs.writeFileSync(`${V}/measure/${id}.json`, JSON.stringify(out, null, 1));

  // --- debug overlay
  const sv = [];
  sv.push(`<rect x="${scene.left}" y="${scene.top}" width="${scene.width}" height="${scene.height}" fill="none" stroke="white" stroke-width="2" stroke-dasharray="10 6"/>`);
  for (const [k, p] of Object.entries(found)) sv.push(`<ellipse cx="${p.at[0]}" cy="${p.at[1]}" rx="${RX * F.s}" ry="${RY * F.s}" fill="none" stroke="${p.fixed ? 'orange' : 'red'}" stroke-width="4"/><text x="${p.at[0] - 10}" y="${p.at[1] + 6}" font-size="18" fill="red">${k}</text>`);
  for (const [k, p] of Object.entries(STD_PROJECTS)) { const size = p.scale * scene.width, [x, y] = fromScene([p.x, p.y]); sv.push(`<rect x="${x - size * 0.45}" y="${y - size * 0.9}" width="${size * 0.9}" height="${size}" fill="none" stroke="magenta" stroke-width="3"/>`); }
  for (const [k, [x, y]] of Object.entries(chosen)) sv.push(`<ellipse cx="${x}" cy="${y}" rx="${decoPx}" ry="${decoPy}" fill="none" stroke="#00e5ff" stroke-width="3"/><rect x="${x - decoPx * 0.9}" y="${y - body}" width="${decoPx * 1.8}" height="${body}" fill="none" stroke="#00e5ff" stroke-width="1" stroke-dasharray="4 3"/><text x="${x - 8}" y="${y + 6}" font-size="14" fill="#00e5ff">D${k}</text>`);
  await sharp(file).resize(W, H).composite([{ input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${sv.join('')}</svg>`) }]).png().toFile(`${V}/measure/${id}.png`);
  // quality: how far the measured plots stray from one uniform fit, and how sure each find is;
  // plus how many plot-sized cream patches the painting has (extra clearings confuse players)
  const resid = Object.values(found).map((p) => Math.hypot(F.f(p.want)[0] - p.at[0], F.f(p.want)[1] - p.at[1]));
  const minScore = Math.min(...Object.values(found).map((p) => p.score));
  const plotCol = (() => { const cs = Object.values(found).map((p) => px(p.at[0], p.at[1])); return [0, 1, 2].map((c) => cs.map((q) => q[c]).sort((a, b) => a - b)[cs.length >> 1]); })();
  let patches = 0; { const seen = new Uint8Array(W * H); const isP = (x, y) => { const c = px(x, y); return Math.hypot(c[0] - plotCol[0], c[1] - plotCol[1], c[2] - plotCol[2]) < 26; };
    for (let y = Math.max(0, scene.top - 60) | 0; y < Math.min(H, scene.top + scene.height + 60); y += 3) for (let x = Math.max(0, scene.left - 40) | 0; x < Math.min(W, scene.left + scene.width + 40); x += 3) {
      const i = y * W + x; if (seen[i] || !isP(x, y)) continue; let n = 0; const st = [[x, y]]; seen[i] = 1;
      while (st.length) { const [ux, uy] = st.pop(); n++; for (const [dx, dy] of [[3, 0], [-3, 0], [0, 3], [0, -3]]) { const vx = ux + dx, vy = uy + dy; if (vx < 0 || vy < 0 || vx >= W || vy >= H) continue; const v = vy * W + vx; if (!seen[v] && isP(vx, vy)) { seen[v] = 1; st.push([vx, vy]); } } }
      const area = n * 9; if (area > Math.PI * RX * RY * 0.45 && area < Math.PI * RX * RY * 1.8) patches++;
    } }
  const ok = Math.max(...resid) < 40 && minScore > 50 && patches <= 16;
  console.log(id, 'scale', out.scale, 'scene', JSON.stringify(out.scene), 'weak', ok ? 0 : 9, `maxResid ${Math.round(Math.max(...resid))} minScore ${Math.round(minScore)} patches ${patches}`);
}

function insideShape(s, x, y) {
  if (s.kind === 'ellipse') return ((x - s.cx) / s.rx) ** 2 + ((y - s.cy) / s.ry) ** 2 <= 1;
  if (s.kind === 'poly') { let c = false; const P = s.points; for (let i = 0, j = P.length - 1; i < P.length; j = i++) if ((P[i][1] > y) !== (P[j][1] > y) && x < ((P[j][0] - P[i][0]) * (y - P[i][1])) / (P[j][1] - P[i][1]) + P[i][0]) c = !c; return c; }
  for (let i = 1; i < s.points.length; i++) {
    const [ax, ay] = s.points[i - 1], [bx, by] = s.points[i], dx = bx - ax, dy = by - ay, l = dx * dx + dy * dy;
    const t = l ? Math.max(0, Math.min(1, ((x - ax) * dx + (y - ay) * dy) / l)) : 0;
    if (Math.hypot(x - ax - t * dx, y - ay - t * dy) <= s.width / 2) return true;
  }
  return false;
}
