// usage: node clean.mjs <id> <suffix> <spot,spot,...>  -> repaints each named deco spot of
// valleys/final/<id>_<suffix>.png as plain ground (AI edit of a 256px crop, pasted back feathered)
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { DECOS } from './layout.mjs';
const require = createRequire('/Users/ioannis/dev/ImageCreation/package.json');
const sharp = require('sharp');
const V = '/Users/ioannis/dev/ImageCreation/output/farm-map-v2/valleys', S = process.env.ART_S;
const GROUND = {
  frosty_fields_bg: 'fresh snow', golden_meadow_bg: 'golden grass', misty_morning_bg: 'dewy sage-green grass', bg_aurora_skies: 'teal-green tundra moss',
  spring_bloom_bg: 'bright spring lawn', blossom_festival_bg: 'moss lawn with a few pink petals', verdant_valley_bg: 'deep green grass',
  honey_hollow_bg: 'yellow-green clover meadow', sunny_shores_bg: 'golden sand', harvest_fair_bg: 'olive autumn grass', golden_grove_bg: 'grass with golden fallen leaves',
  pumpkin_moon_bg: 'dusky autumn grass with a few fallen leaves', oktoberfest_festival_meadow_bg: 'alpine meadow grass', halloween_haunted_hollow_bg: 'grey-green dusky grass',
  halloween_candy_lane_bg: 'soft pink frosting meadow',
};
const [id, suf, list] = process.argv.slice(2);
const file = `${V}/final/${id}_${suf}.png`;
let img = await sharp(file).removeAlpha().raw().toBuffer();
const W = 1024, H = 1536, C = 256;
for (const k of list.split(',')) {
  const [x, y] = DECOS[k];
  const left = Math.max(0, Math.min(W - C, x - C / 2)), top = Math.max(0, Math.min(H - C, y - 40 - C / 2));
  const crop = `${S}/clean_${id}_${k}.png`;
  await sharp(img, { raw: { width: W, height: H, channels: 3 } }).extract({ left, top, width: C, height: C }).resize(1024, 1024).png().toFile(crop);
  const prompt = `${S}/clean_${id}_${k}.txt`;
  fs.writeFileSync(prompt, `A close-up crop of a hand-painted top-down game map. In the CENTRE of the picture (a soft oval about half the picture wide, around the middle), remove every object — trees, bushes, plants, flowers, rocks, fences, props, shadows of objects, water and shore — so the centre becomes plain open ${GROUND[id]} that blends seamlessly with the ground around it. Keep the same painting style, colours, light and scale. Change nothing else.`);
  execFileSync('node', ['../gen.mjs', `clean_${id}_${suf}_${k}`, '1024x1024', 'low', prompt, crop], { env: process.env, stdio: 'ignore' });
  const fixed = await sharp(`${S}/raw/clean_${id}_${suf}_${k}.png`).resize(C, C).removeAlpha().raw().toBuffer();
  // paste back inside a feathered ellipse round the spot's foot and body
  const cx = x - left, cy = y - 30 - top;
  for (let j = 0; j < C; j++) for (let i = 0; i < C; i++) {
    const d = Math.hypot((i - cx) / 78, (j - cy) / 70);
    const t = Math.max(0, Math.min(1, (1 - d) / 0.35));
    if (t <= 0) continue;
    const o = ((top + j) * W + left + i) * 3, f = (j * C + i) * 3;
    for (let c = 0; c < 3; c++) img[o + c] = img[o + c] * (1 - t) + fixed[f + c] * t;
  }
  console.log('cleaned', id, 'D' + k);
}
await sharp(img, { raw: { width: W, height: H, channels: 3 } }).png().toFile(file.replace(/\.png$/, '_clean.png'));
