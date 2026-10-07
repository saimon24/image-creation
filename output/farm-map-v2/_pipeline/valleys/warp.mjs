// usage: node warp.mjs <draft.png> <out.png> [debug.png]
// Finds the 16 painted plot clearings near where the 1.2x guide put them, then
// thin-plate-spline warps the painting so each lands exactly on its anchor,
// scales it back by 1/1.2 about (531, 858) into the 1024x1536 frame and fills
// the top/bottom bands (under the header and the bar) by mirroring.
import { createRequire } from 'node:module';
import { PLOTS, PLOT_R } from './themes.mjs';
const require = createRequire('/Users/ioannis/dev/ImageCreation/package.json');
const sharp = require('sharp');
const [inp, out, dbg] = process.argv.slice(2);
const W = 1024, H = 1536, S = 1.2, CX = 531, CY = 858;
const up = ([x, y]) => [CX + (x - CX) * S, CY + (y - CY) * S];

const { data } = await sharp(inp).resize(W, H).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const px = (x, y) => { x = Math.max(0, Math.min(W - 1, x | 0)); y = Math.max(0, Math.min(H - 1, y | 0)); const i = (y * W + x) * 3; return [data[i], data[i + 1], data[i + 2]]; };

// Score a candidate centre: flat inside the ellipse, different from the ring round it.
const RX = PLOT_R[0] * S, RY = PLOT_R[1] * S;
const inner = [], outer = [];
for (let a = 0; a < 24; a++) for (const r of [0.2, 0.45, 0.7]) inner.push([Math.cos(a * Math.PI / 12) * r, Math.sin(a * Math.PI / 12) * r]);
for (let a = 0; a < 36; a++) outer.push([Math.cos(a * Math.PI / 18) * 1.22, Math.sin(a * Math.PI / 18) * 1.22]);
const edge = []; for (let a = 0; a < 36; a++) edge.push([Math.cos(a * Math.PI / 18), Math.sin(a * Math.PI / 18)]);
function score(cx, cy) {
  const ins = inner.map(([u, v]) => px(cx + u * RX, cy + v * RY));
  const mean = [0, 1, 2].map((c) => ins.reduce((s, p) => s + p[c], 0) / ins.length);
  const varIn = ins.reduce((s, p) => s + (p[0] - mean[0]) ** 2 + (p[1] - mean[1]) ** 2 + (p[2] - mean[2]) ** 2, 0) / ins.length;
  // fraction of the rim just outside that differs clearly from the inside
  const outs = outer.map(([u, v]) => px(cx + u * RX, cy + v * RY));
  const diff = outs.filter((p) => Math.hypot(p[0] - mean[0], p[1] - mean[1], p[2] - mean[2]) > 28).length / outs.length;
  return diff * 100 - Math.sqrt(varIn) * 1.2;
}
const found = {};
for (const [id, p] of Object.entries(PLOTS)) {
  const [gx, gy] = up(p);
  let best = [-1e9, gx, gy];
  for (let dy = -60; dy <= 60; dy += 4) for (let dx = -60; dx <= 60; dx += 4) {
    const s = score(gx + dx, gy + dy) - Math.hypot(dx, dy) * 0.08;
    if (s > best[0]) best = [s, gx + dx, gy + dy];
  }
  for (let dy = -4; dy <= 4; dy++) for (let dx = -4; dx <= 4; dx++) {
    const s = score(best[1] + dx, best[2] + dy) - Math.hypot(best[1] + dx - gx, best[2] + dy - gy) * 0.08;
    if (s > best[0]) best = [s, best[1] + dx, best[2] + dy];
  }
  found[id] = { at: [best[1], best[2]], want: [gx, gy], score: best[0] };
}

// Robust check: fit one affine map guide -> painting over all plots, drop the
// ones that disagree with it (a wrong patch picked), and search those again
// close to where the fit puts them; if that still finds nothing, trust the fit.
function fitAffine(pairs) {
  const A = [[0, 0, 0], [0, 0, 0], [0, 0, 0]], bx = [0, 0, 0], by = [0, 0, 0];
  for (const { want: [x, y], at: [u, v] } of pairs) {
    const r = [x, y, 1];
    for (let i = 0; i < 3; i++) { for (let j = 0; j < 3; j++) A[i][j] += r[i] * r[j]; bx[i] += r[i] * u; by[i] += r[i] * v; }
  }
  const sol = (b) => { const M = A.map((r, i) => [...r, b[i]]); for (let c = 0; c < 3; c++) { let p = c; for (let r = c + 1; r < 3; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r; [M[c], M[p]] = [M[p], M[c]]; for (let r = 0; r < 3; r++) if (r !== c) { const f = M[r][c] / M[c][c]; for (let k = c; k < 4; k++) M[r][k] -= f * M[c][k]; } } return M.map((r, i) => r[3] / r[i]); };
  const ax = sol(bx), ay = sol(by);
  return ([x, y]) => [ax[0] * x + ax[1] * y + ax[2], ay[0] * x + ay[1] * y + ay[2]];
}
let inliers = Object.values(found);
for (let round = 0; round < 3; round++) {
  const f = fitAffine(inliers);
  const res = (p) => Math.hypot(f(p.want)[0] - p.at[0], f(p.want)[1] - p.at[1]);
  const next = Object.values(found).filter((p) => res(p) < 22 && p.score > 40);
  if (next.length < 8) break;
  inliers = next;
}
const affine = fitAffine(inliers);
for (const [id, p] of Object.entries(found)) {
  if (inliers.includes(p)) continue;
  const [ex, ey] = affine(p.want);
  let best = [-1e9, ex, ey];
  for (let dy = -20; dy <= 20; dy += 2) for (let dx = -20; dx <= 20; dx += 2) {
    const s = score(ex + dx, ey + dy) - Math.hypot(dx, dy) * 0.3;
    if (s > best[0]) best = [s, ex + dx, ey + dy];
  }
  found[id] = { ...p, at: best[0] > 55 ? [best[1], best[2]] : [ex, ey], score: best[0], fixed: best[0] > 55 ? 'refound' : 'affine' };
}

// TPS: for every output pixel (in the 1.2x frame), where to sample the painting.
// Control points: target anchor -> found centre; the frame border is pinned.
const ctrl = Object.values(found).map((f) => ({ t: f.want, s: f.at }));
for (let i = 0; i <= 4; i++) for (const [x, y] of [[i * W / 4, 0], [i * W / 4, H], [0, i * H / 4], [W, i * H / 4]]) ctrl.push({ t: [x, y], s: [x, y] });
const n = ctrl.length, U = (r2) => (r2 === 0 ? 0 : r2 * Math.log(r2));
const M = Array.from({ length: n + 3 }, () => new Float64Array(n + 3));
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) M[i][j] = U((ctrl[i].t[0] - ctrl[j].t[0]) ** 2 + (ctrl[i].t[1] - ctrl[j].t[1]) ** 2) + (i === j ? 1e-3 : 0);
  M[i][n] = M[n][i] = 1; M[i][n + 1] = M[n + 1][i] = ctrl[i].t[0]; M[i][n + 2] = M[n + 2][i] = ctrl[i].t[1];
}
function solve(b) {
  const A = M.map((r, i) => [...r, b[i]]), m = n + 3;
  for (let c = 0; c < m; c++) {
    let p = c; for (let r = c + 1; r < m; r++) if (Math.abs(A[r][c]) > Math.abs(A[p][c])) p = r;
    [A[c], A[p]] = [A[p], A[c]];
    for (let r = 0; r < m; r++) if (r !== c) { const f = A[r][c] / A[c][c]; for (let k = c; k <= m; k++) A[r][k] -= f * A[c][k]; }
  }
  return A.map((r, i) => r[m] / r[i]);
}
const wx = solve([...ctrl.map((c) => c.s[0] - c.t[0]), 0, 0, 0]);
const wy = solve([...ctrl.map((c) => c.s[1] - c.t[1]), 0, 0, 0]);
const disp = (x, y) => {
  let dx = wx[n] + wx[n + 1] * x + wx[n + 2] * y, dy = wy[n] + wy[n + 1] * x + wy[n + 2] * y;
  for (let i = 0; i < n; i++) { const u = U((x - ctrl[i].t[0]) ** 2 + (y - ctrl[i].t[1]) ** 2); dx += wx[i] * u; dy += wy[i] * u; }
  return [dx, dy];
};
const bil = (x, y) => {
  x = Math.max(0, Math.min(W - 1.001, x)); y = Math.max(0, Math.min(H - 1.001, y));
  const x0 = x | 0, y0 = y | 0, fx = x - x0, fy = y - y0, a = px(x0, y0), b = px(x0 + 1, y0), c = px(x0, y0 + 1), d = px(x0 + 1, y0 + 1);
  return [0, 1, 2].map((k) => a[k] * (1 - fx) * (1 - fy) + b[k] * fx * (1 - fy) + c[k] * (1 - fx) * fy + d[k] * fx * fy);
};
// Output frame: each output pixel (ox, oy) is (CX + (ox-CX)*S, CY + (oy-CY)*S) in the 1.2x frame.
// Displacement is smooth, so sample it on a coarse grid and interpolate.
const G = 16, gw = Math.ceil(W / G) + 1, gh = Math.ceil(H / G) + 1, grid = new Float32Array(gw * gh * 2);
for (let j = 0; j < gh; j++) for (let i = 0; i < gw; i++) {
  const [fx, fy] = [CX + (i * G - CX) * S, CY + (j * G - CY) * S];
  const [dx, dy] = disp(fx, fy); grid[(j * gw + i) * 2] = fx + dx; grid[(j * gw + i) * 2 + 1] = fy + dy;
}
const res = Buffer.alloc(W * H * 3), mask = Buffer.alloc(W * H);
for (let oy = 0; oy < H; oy++) for (let ox = 0; ox < W; ox++) {
  const gi = ox / G, gj = oy / G, i0 = gi | 0, j0 = gj | 0, fi = gi - i0, fj = gj - j0;
  const g = (i, j, k) => grid[(Math.min(j, gh - 1) * gw + Math.min(i, gw - 1)) * 2 + k];
  const sx = (g(i0, j0, 0) * (1 - fi) + g(i0 + 1, j0, 0) * fi) * (1 - fj) + (g(i0, j0 + 1, 0) * (1 - fi) + g(i0 + 1, j0 + 1, 0) * fi) * fj;
  let sy = (g(i0, j0, 1) * (1 - fi) + g(i0 + 1, j0, 1) * fi) * (1 - fj) + (g(i0, j0 + 1, 1) * (1 - fi) + g(i0 + 1, j0 + 1, 1) * fi) * fj;
  // How far inside the real painting this sample is (0 at its edge, 1 from 40 px in).
  mask[oy * W + ox] = Math.round(255 * Math.max(0, Math.min(1, Math.min(sx, W - 1 - sx, sy, H - 1 - sy) / 40)));
  // Outside the painting: mirror back in. The AI border pass repaints this
  // (a smear or a flat fill it keeps as it is; a mirror it turns into scenery).
  if (sy < 0) sy = -sy; if (sy > H - 1) sy = 2 * (H - 1) - sy;
  let sxx = sx; if (sxx < 0) sxx = -sxx; if (sxx > W - 1) sxx = 2 * (W - 1) - sxx;
  const c = bil(sxx, sy), o = (oy * W + ox) * 3;
  if (process.env.FILL === 'flat' && mask[oy * W + ox] === 0) { res[o] = 128; res[o + 1] = 128; res[o + 2] = 128; continue; }
  res[o] = c[0]; res[o + 1] = c[1]; res[o + 2] = c[2];
}
await sharp(res, { raw: { width: W, height: H, channels: 3 } }).png().toFile(out);
if (out !== '/dev/null') await sharp(mask, { raw: { width: W, height: H, channels: 1 } }).png().toFile(out.replace(/\.png$/, '_mask.png'));
const report = Object.entries(found).map(([id, f]) => `P${id} ${Math.round(f.at[0] - f.want[0])},${Math.round(f.at[1] - f.want[1])} s${f.score.toFixed(0)}${f.fixed ? ' ' + f.fixed : ''}`);
console.log(report.join('  '));
const weak = Object.values(found).filter((f) => f.score < 55 || f.fixed === 'affine').length;
const far = Math.max(...Object.values(found).map((f) => Math.hypot(f.at[0] - f.want[0], f.at[1] - f.want[1])));
console.log(`QUALITY ${weak <= 1 && inliers.length >= 13 && far < 75 ? 'ok' : 'bad'} weak=${weak} inliers=${inliers.length} far=${far.toFixed(0)}`);
if (dbg) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${Object.values(found).map((f) => `<ellipse cx="${f.at[0]}" cy="${f.at[1]}" rx="${RX}" ry="${RY}" fill="none" stroke="lime" stroke-width="4"/><ellipse cx="${f.want[0]}" cy="${f.want[1]}" rx="${RX}" ry="${RY}" fill="none" stroke="red" stroke-width="3" stroke-dasharray="8 6"/>`).join('')}</svg>`;
  await sharp(inp).resize(W, H).composite([{ input: Buffer.from(svg) }]).png().toFile(dbg);
}
