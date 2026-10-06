import sharp from '/Users/ioannis/dev/ImageCreation/node_modules/sharp/lib/index.js';
const S = process.env.S, A = process.env.A, D = process.env.D;
const png = (f, w, h) => sharp(f).resize(w, h ?? null).png().toBuffer();
const meta = async (b) => (await sharp(b).metadata());
// --- room mock: 1280x960
const RW = 1280, RH = 960;
const comps = [];
// vitrine: width 0.28*RW, at x 0.08
const vw = Math.round(0.28 * RW), vs = vw / 1024;
let vy = Math.round(0.11 * RH); const vx = Math.round(0.08 * RW);
const vparts = [['vitrine_top', 164], ['honour_shelf', 570], ['vitrine_shelf', 409], ['vitrine_shelf', 409], ['vitrine_base', 217]];
const shelfTops = [];
for (const [n, h] of vparts) { const hh = Math.round(h * vs); comps.push({ input: await png(`${A}/${n}.webp`, vw, hh), left: vx, top: vy }); shelfTops.push([n, vy, hh]); vy += hh; }
// cushions on the two glass shelves, 4 each, plus 2 trophies on honour shelf
const cushW = Math.round(vw * 0.16); const cush = await png(`${A}/cushion.webp`, cushW);
const cm = await meta(cush);
const trophy = await png('/Users/ioannis/dev/TinyHarvest-farmmap/assets/images/mastery/trophy_gold.webp', Math.round(vw * 0.2));
for (const [n, top, hh] of shelfTops) {
  if (n === 'vitrine_shelf') {
    const footY = top + Math.round(hh * 0.91);
    for (let i = 0; i < 4; i++) { const cx = vx + Math.round(vw * (0.147 + (0.703 * (i + 0.5)) / 4)); comps.push({ input: cush, left: cx - Math.round(cushW / 2), top: footY - Math.round(cm.height * 0.8) }); }
  }
  if (n === 'honour_shelf') {
    const footY = top + Math.round(hh * 0.875); const tm = await meta(trophy);
    for (const f of [0.33, 0.67]) comps.push({ input: trophy, left: vx + Math.round(vw * f) - Math.round(tm.width / 2), top: footY - Math.round(tm.height * 0.95) });
  }
}
// wall: width 0.30*RW at x 0.62
const ww = Math.round(0.30 * RW), ws = ww / 1024; const wx = Math.round(0.62 * RW); let wy = Math.round(0.11 * RH);
for (const [n, h] of [['wall_frame_top', 388], ['wall_tile', 489], ['wall_tile', 489], ['wall_frame_bottom', 296]]) { const hh = Math.round(h * ws); comps.push({ input: await png(`${A}/${n}.webp`, ww, hh), left: wx, top: wy }); wy += hh; }
const sf = await png(`${A}/stamp_sheet_frame.webp`, Math.round(ww * 0.7)); comps.push({ input: sf, left: wx + Math.round(ww * 0.15), top: Math.round(0.11 * RH + 388 * ws * 0.85) });
const pinW = Math.round(ww * 0.2);
let k = 0; for (const p of ['gold', 'platinum', 'diamond', 'gold', 'gold', 'platinum']) { const pin = await png(`${A}/pin_${p}.webp`, pinW); comps.push({ input: pin, left: wx + Math.round(ww * (0.14 + 0.25 * (k % 3))), top: Math.round(0.11 * RH + 388 * ws * 0.85 + 230 + 95 * Math.floor(k / 3)) }); k++; }
const mount = await png(`${A}/plaque_mount.webp`, Math.round(ww * 0.16)); comps.push({ input: mount, left: wx + Math.round(ww * 0.42), top: wy - 150 });
const arrow = await png(`${A}/arrow_right.webp`, 72); comps.push({ input: arrow, left: RW - 90, top: Math.round(RH / 2) - 36 });
const room = await sharp(`${A}/room.webp`).resize(RW, RH).composite(comps).png().toBuffer();
// --- stacks
const vstack = await png(`${S}/v_stack.png`, null, RH); const wstack = await png(`${S}/w_stack.png`, null, RH);
const vsm = await meta(vstack), wsm = await meta(wstack);
// --- items strip on grey
const items = ['cushion', 'year_plaque', 'plaque_mount', 'stamp_sheet_frame', 'arrow_right', 'pin_gold', 'pin_platinum', 'pin_diamond'];
let ix = 20; const ic = [];
for (const n of items) { const b = await png(`${A}/${n}.webp`); const m = await meta(b); ic.push({ input: b, left: ix, top: 20 }); ix += m.width + 24; }
const stripW = ix, stripH = 480;
const W = Math.max(RW + vsm.width + wsm.width + 40, stripW), H = RH + stripH + 20;
const out = await sharp({ create: { width: W, height: H, channels: 4, background: { r: 128, g: 128, b: 128, alpha: 1 } } })
  .composite([{ input: room, left: 0, top: 0 }, { input: vstack, left: RW + 20, top: 0 }, { input: wstack, left: RW + 20 + vsm.width + 20, top: 0 },
    { input: await sharp({ create: { width: stripW, height: stripH, channels: 4, background: { r: 128, g: 128, b: 128, alpha: 1 } } }).composite(ic).png().toBuffer(), left: 0, top: RH + 20 }])
  .png().toFile(`${D}/contact.png`);
console.log('contact', out.width, out.height);
