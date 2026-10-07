// Themes with their routed paths (cached in routes.json, keyed by edges + water).
import fs from 'node:fs';
import { THEMES as RAW } from './themes.mjs';
import { routePaths } from './route.mjs';
export * from './themes.mjs';
const CACHE = new URL('./routes.json', import.meta.url);
const cache = fs.existsSync(CACHE) ? JSON.parse(fs.readFileSync(CACHE, 'utf8')) : {};
export const THEMES = {};
for (const [id, t] of Object.entries(RAW)) {
  const key = JSON.stringify([t.edges, t.water]);
  if (cache[id]?.key !== key) cache[id] = { key, paths: routePaths(t.edges, t.water) };
  THEMES[id] = { ...t, paths: cache[id].paths };
}
fs.writeFileSync(CACHE, JSON.stringify(cache));
