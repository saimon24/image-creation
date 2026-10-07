// A* path router on an 8px grid: routes a theme's path edges around the fixed
// deco spots, corners and other plots; water may be crossed (a bridge) at a cost.
import { PLOTS, PLOT_R, CORNERS, DECOS } from './themes.mjs';
const C = 8, GW = 1024 / C, GH = 1536 / C;

const segDist = ([px, py], [ax, ay], [bx, by]) => {
  const dx = bx - ax, dy = by - ay, l = dx * dx + dy * dy;
  const t = l ? Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / l)) : 0;
  return Math.hypot(px - ax - t * dx, py - ay - t * dy);
};
const inWater = (p, water) =>
  water.rivers.some((r) => r.pts.slice(1).some((b, i) => segDist(p, r.pts[i], b) < r.w / 2 + 4)) ||
  water.lakes.some(([cx, cy, rx, ry]) => ((p[0] - cx) / (rx + 4)) ** 2 + ((p[1] - cy) / (ry + 4)) ** 2 < 1);

// Base cost per cell for a theme (plots marked by id so an edge can open its two ends).
function baseGrid(water) {
  const g = new Float32Array(GW * GH), plot = new Int8Array(GW * GH).fill(-1);
  for (let j = 0; j < GH; j++) for (let i = 0; i < GW; i++) {
    const p = [i * C + C / 2, j * C + C / 2], k = j * GW + i;
    let c = 1;
    for (const [x, y] of Object.values(DECOS)) if (((p[0] - x) / 62) ** 2 + ((p[1] - y) / 34) ** 2 < 1) c = Infinity;
    for (const [a, b, cc, d] of Object.values(CORNERS)) if (p[0] > a - 10 && p[0] < cc + 10 && p[1] > b - 10 && p[1] < d + 10) c = Infinity;
    for (const [id, [x, y]] of Object.entries(PLOTS))
      if (((p[0] - x) / (PLOT_R[0] + 14)) ** 2 + ((p[1] - y) / (PLOT_R[1] + 12)) ** 2 < 1) plot[k] = Number(id);
    if (c !== Infinity && inWater(p, water)) c = 14;
    if (c !== Infinity && (p[0] < 24 || p[0] > 1000 || p[1] < 24 || p[1] > 1512)) c += 2;
    g[k] = c;
  }
  return { g, plot };
}

class Heap {
  constructor() { this.a = []; }
  push(x) { const a = this.a; a.push(x); let i = a.length - 1; while (i > 0) { const p = (i - 1) >> 1; if (a[p][0] <= a[i][0]) break; [a[p], a[i]] = [a[i], a[p]]; i = p; } }
  pop() { const a = this.a, top = a[0], last = a.pop(); if (a.length) { a[0] = last; let i = 0; for (;;) { const l = 2 * i + 1, r = l + 1; let m = i; if (l < a.length && a[l][0] < a[m][0]) m = l; if (r < a.length && a[r][0] < a[m][0]) m = r; if (m === i) break; [a[m], a[i]] = [a[i], a[m]]; i = m; } } return top; }
  get size() { return this.a.length; }
}

function astar({ g, plot }, ends, s, t) {
  const idx = (i, j) => j * GW + i, H = (i, j) => Math.hypot(i - t[0], j - t[1]);
  const cost = (v) => (plot[v] >= 0 ? (ends.includes(plot[v]) ? 1 : Infinity) : g[v]);
  const dist = new Float32Array(GW * GH).fill(Infinity), prev = new Int32Array(GW * GH).fill(-1);
  const open = new Heap(); open.push([H(...s), idx(...s)]); dist[idx(...s)] = 0;
  const goal = idx(...t);
  while (open.size) {
    const [f, u] = open.pop();
    if (u === goal) break;
    const ui = u % GW, uj = (u / GW) | 0;
    if (f - H(ui, uj) > dist[u] + 1e-3) continue;
    for (const [di, dj] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]]) {
      const vi = ui + di, vj = uj + dj; if (vi < 0 || vj < 0 || vi >= GW || vj >= GH) continue;
      const v = idx(vi, vj), w = cost(v); if (w === Infinity) continue;
      const nd = dist[u] + w * Math.hypot(di, dj);
      if (nd < dist[v]) { dist[v] = nd; prev[v] = u; open.push([nd + H(vi, vj), v]); }
    }
  }
  const out = []; let u = goal;
  if (prev[u] < 0) return null;
  while (u >= 0) { out.push([(u % GW) * C + C / 2, ((u / GW) | 0) * C + C / 2]); u = prev[u]; }
  return out.reverse();
}

// Ramer-Douglas-Peucker, then Chaikin smoothing so routes read as painted paths.
function rdp(pts, eps) {
  if (pts.length < 3) return pts;
  let md = 0, mi = 0;
  for (let i = 1; i < pts.length - 1; i++) { const d = segDist(pts[i], pts[0], pts.at(-1)); if (d > md) { md = d; mi = i; } }
  return md > eps ? [...rdp(pts.slice(0, mi + 1), eps).slice(0, -1), ...rdp(pts.slice(mi), eps)] : [pts[0], pts.at(-1)];
}
const chaikin = (p) => [p[0], ...p.slice(0, -1).flatMap((a, i) => { const b = p[i + 1]; return [[0.75 * a[0] + 0.25 * b[0], 0.75 * a[1] + 0.25 * b[1]], [0.25 * a[0] + 0.75 * b[0], 0.25 * a[1] + 0.75 * b[1]]]; }), p.at(-1)];

const pointOf = (e) => (typeof e === 'number' ? PLOTS[e] : e);
/** edges: [[a, b], ...] where a/b are plot ids or [x, y] points */
export function routePaths(edges, water) {
  const base = baseGrid(water);
  return edges.map(([a, b]) => {
    const ends = [a, b].filter((e) => typeof e === 'number');
    const cell = ([x, y]) => [Math.min(GW - 1, Math.max(0, Math.floor(x / C))), Math.min(GH - 1, Math.max(0, Math.floor(y / C)))];
    const raw = astar(base, ends, cell(pointOf(a)), cell(pointOf(b)));
    if (!raw) throw new Error(`no route ${a} -> ${b}`);
    let pts = rdp(raw, 6); pts = chaikin(chaikin(pts));
    pts[0] = pointOf(a); pts[pts.length - 1] = pointOf(b);
    return pts.map(([x, y]) => [Math.round(x), Math.round(y)]);
  });
}
