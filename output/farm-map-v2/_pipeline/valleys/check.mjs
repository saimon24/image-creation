// usage: node check.mjs -> every place where a theme's water or paths touch a deco spot, plot or corner
import { PLOTS, PLOT_R, CORNERS, DECOS, THEMES } from './layout.mjs';
const segDist = ([px, py], [ax, ay], [bx, by]) => {
  const dx = bx - ax, dy = by - ay, l = dx * dx + dy * dy;
  const t = l ? Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / l)) : 0;
  return Math.hypot(px - ax - t * dx, py - ay - t * dy);
};
const lineDist = (p, pts) => Math.min(...pts.slice(1).map((b, i) => segDist(p, pts[i], b)));
// footprint of a decoration (rx 40, ry 18 around its foot) and its body above
const ring = ([x, y], rx, ry) => [[x, y], ...Array.from({ length: 16 }, (_, i) => [x + Math.cos(i * Math.PI / 8) * rx, y + Math.sin(i * Math.PI / 8) * ry])];
let bad = 0;
for (const [id, t] of Object.entries(THEMES)) {
  const out = [];
  for (const [k, d] of Object.entries(DECOS)) {
    const fp = ring(d, 64, 34), fpPath = ring(d, 44, 20);
    for (const r of t.water.rivers) if (fp.some((p) => lineDist(p, r.pts) < r.w / 2)) out.push(`deco ${k} in river`);
    for (const [cx, cy, rx, ry] of t.water.lakes) if (fp.some(([x, y]) => ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 < 1)) out.push(`deco ${k} in lake`);
    t.paths.forEach((p, i) => { if (fpPath.some((q) => lineDist(q, p) < 10)) out.push(`deco ${k} on path ${i}`); });
  }
  // painted zones (fields, patches, plazas) count as tall: keep them off a deco's foot and body
  const inZone = ([x, y], [, kind, g]) => kind === 'ellipse'
    ? ((x - g[0]) / g[2]) ** 2 + ((y - g[1]) / g[3]) ** 2 < 1
    : x > Math.min(...g.map((p) => p[0])) && x < Math.max(...g.map((p) => p[0])) && y > Math.min(...g.map((p) => p[1])) && y < Math.max(...g.map((p) => p[1]));
  for (const [zi, z] of t.zones.entries()) {
    for (const [k, [x, y]] of Object.entries(DECOS)) {
      const pts = [...ring([x, y], 44, 20)]; for (let i = 0; i <= 4; i++) for (let j = 1; j <= 3; j++) pts.push([x - 40 + i * 20, y - j * 22]);
      if (pts.some((p) => inZone(p, z))) out.push(`zone ${zi} on deco ${k}`);
    }
    for (const [k, c] of Object.entries(PLOTS)) if (ring(c, PLOT_R[0] + 6, PLOT_R[1] + 4).some((p) => inZone(p, z))) out.push(`zone ${zi} on plot ${k}`);
    for (const [k, [a, b, cc, d]] of Object.entries(CORNERS)) if ([[a, b], [cc, b], [a, d], [cc, d], [(a + cc) / 2, (b + d) / 2]].some((p) => inZone(p, z))) out.push(`zone ${zi} on ${k}`);
  }
  for (const [k, c] of Object.entries(PLOTS)) {
    const fp = ring(c, PLOT_R[0] + 6, PLOT_R[1] + 4).slice(1);
    for (const r of t.water.rivers) if (fp.some((p) => lineDist(p, r.pts) < r.w / 2)) out.push(`plot ${k} in river`);
    for (const [cx, cy, rx, ry] of t.water.lakes) if (fp.some(([x, y]) => ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 < 1)) out.push(`plot ${k} in lake`);
  }
  for (const [k, [a, b, c, d]] of Object.entries(CORNERS)) {
    if (k === 'dock') continue;
    const pts = [[a, b], [c, b], [a, d], [c, d], [(a + c) / 2, (b + d) / 2]];
    for (const r of t.water.rivers) if (pts.some((p) => lineDist(p, r.pts) < r.w / 2)) out.push(`${k} in river`);
    for (const [cx, cy, rx, ry] of t.water.lakes) if (pts.some(([x, y]) => ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 < 1)) out.push(`${k} in lake`);
  }
  // the dock needs water touching its box
  const [a, b, c, d] = CORNERS.dock, dc = [(a + c) / 2, (b + d) / 2];
  const wet = t.water.rivers.some((r) => lineDist(dc, r.pts) < r.w / 2 + 90) || t.water.lakes.some(([cx, cy, rx, ry]) => ((dc[0] - cx) / (rx + 90)) ** 2 + ((dc[1] - cy) / (ry + 60)) ** 2 < 1);
  if (!wet) out.push('dock has no water');
  if (out.length) { bad += out.length; console.log(id.padEnd(32), [...new Set(out)].join(', ')); }
}
console.log(bad ? `${bad} problems` : 'all clear');
