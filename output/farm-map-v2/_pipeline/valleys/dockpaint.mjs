// usage: node dockpaint.mjs <id> [fromSuffix=f] [toSuffix=g]
// Repaints only the dock's corner of a theme painting into a cove of the theme's own water:
// crop 384 px round the dock (1024x1536 painting), mark the dock's footprint as a flat oval of the
// theme's water colour, gpt-image-2 edit (medium), and paste the oval (feathered) back into drafts/<id>_<to>.png.
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { dockBox } from './dockcover.mjs';
import { THEMES } from './themes.mjs';
const require = createRequire('/Users/ioannis/dev/ImageCreation/package.json');
const sharp = require('sharp');
const V = '/Users/ioannis/dev/ImageCreation/output/farm-map-v2/valleys', S = process.env.ART_S;
const [id, from = 'f', to = 'g'] = process.argv.slice(2);
const W = 1024, H = 1536, C = 384;
const b = dockBox(id);
const left = Math.round(Math.min(W - C, Math.max(0, b.cx - C / 2))), top = Math.round(Math.min(H - C, Math.max(0, b.cy - C / 2)));
const paint = await sharp(`${V}/drafts/${id}_${from}.png`).resize(W, H).removeAlpha().raw().toBuffer();
const water = await sharp(`${V}/water/${id}.png`).resize(W, H).extractChannel(0).raw().toBuffer();
// the theme's water colour: median of its painted water
const cs = []; for (let i = 0; i < W * H; i += 7) if (water[i] > 127) cs.push([paint[i * 3], paint[i * 3 + 1], paint[i * 3 + 2]]);
const wc = [0, 1, 2].map((c) => cs.map((q) => q[c]).sort((a, z) => a - z)[cs.length >> 1]);
const RX = b.rx * 1.25, RY = b.ry * 1.35, ocx = b.cx - left, ocy = b.cy - top;
const crop = await sharp(paint, { raw: { width: W, height: H, channels: 3 } }).extract({ left, top, width: C, height: C }).raw().toBuffer();
const guide = Buffer.from(crop);
for (let y = 0; y < C; y++) for (let x = 0; x < C; x++) if (((x - ocx) / RX) ** 2 + ((y - ocy) / RY) ** 2 <= 1) { const o = (y * C + x) * 3; guide[o] = wc[0]; guide[o + 1] = wc[1]; guide[o + 2] = wc[2]; }
const gfile = `${S}/dockguide_${id}.png`;
await sharp(guide, { raw: { width: C, height: C, channels: 3 } }).resize(1024, 1024, { kernel: 'lanczos3' }).png().toFile(gfile);
const theme = THEMES[id];
const SHAPE = {
  spring_bloom_bg: 'a plain RECTANGULAR harbour basin with straight neat stone-edged walls opening sideways off the straight canal; open water only, nothing standing in the basin',
  honey_hollow_bg: 'a round pond joined by a short narrow brook to the small pond and brook just to its left',
  frosty_fields_bg: 'an open dark icy-blue water hole with snowy, icy edges, joined to the stream on the right',
  sunny_shores_bg: 'a sheltered turquoise lagoon cove of the sea with a sandy beach edge, joined to the sea on the right',
  halloween_candy_lane_bg: 'a pool of the same pink strawberry-milk river, joined to the milk river',
  halloween_haunted_hollow_bg: 'a pool of the same murky green-teal swamp water, joined to the swamp',
  pumpkin_moon_bg: 'a pool of the same violet-blue creek water, joined to the creek',
};
const pfile = `${S}/dockprompt_${id}.txt`;
fs.writeFileSync(pfile, `This is a close-up crop of a hand-painted top-down farm map from a cozy mobile game ("${theme.name}"). The flat, untextured oval in it marks where a small wooden fishing jetty will be placed later. Paint that oval as natural WATER of this map — the same kind, colour and painting style as the water already visible in the picture — forming ${SHAPE[id] || 'a small cove or pool with a soft natural shoreline, connected smoothly to the nearby water if there is any'}. Keep the water surface open and calm: no jetty, no boats, no bridges, no rocks or plants in the water. Keep everything outside the oval exactly as it is (same positions, same scale, no zoom, no shift). Same light from the upper left, no text.`);
const out = `dock_${id}_${to}`;
execFileSync('node', ['../gen.mjs', out, '1024x1024', process.env.QUALITY || 'medium', pfile, gfile], { env: { ...process.env, APPROVED_HIGH: '1' }, stdio: 'ignore' });
const fixed = await sharp(`${S}/raw/${out}.png`).resize(C, C, { kernel: 'lanczos3' }).removeAlpha().raw().toBuffer();
const res = Buffer.from(paint);
for (let y = 0; y < C; y++) for (let x = 0; x < C; x++) {
  const d = Math.hypot((x - ocx) / (RX * 1.3), (y - ocy) / (RY * 1.3));
  const t = Math.max(0, Math.min(1, (1 - d) / 0.25));
  if (!t) continue;
  const o = ((top + y) * W + left + x) * 3, f = (y * C + x) * 3;
  for (let c = 0; c < 3; c++) res[o + c] = Math.round(paint[o + c] * (1 - t) + fixed[f + c] * t);
}
await sharp(res, { raw: { width: W, height: H, channels: 3 } }).png().toFile(`${V}/drafts/${id}_${to}.png`);
fs.writeFileSync(`${V}/drafts/${id}_${to}.dock.json`, JSON.stringify({ left, top, C, cx: b.cx, cy: b.cy, rx: RX * 1.3, ry: RY * 1.3 }));
console.log('dock painted', id);
