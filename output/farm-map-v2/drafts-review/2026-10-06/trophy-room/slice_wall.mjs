import sharp from '/Users/ioannis/dev/ImageCreation/node_modules/sharp/lib/index.js';
const S = process.env.S, A = process.env.A;
const src = `${S}/wall_keyed.png`;
const X0 = 156, X1 = 868, W = X1 - X0, scale = 1024 / W;
const TOP = [30, 300], BOT = [1300, 1506];
const B0 = 320, H = 340, O = 48; // band rows B0..B0+H+O, tile = H rows, crossfade O
const { data, info } = await sharp(src).extract({ left: X0, top: B0, width: W, height: H + O }).raw().toBuffer({ resolveWithObject: true });
const tile = Buffer.alloc(W * H * 4);
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
  const o = (y * W + x) * 4;
  if (y < O) {
    const t = y / O; // 0 at top -> take from the band's extra rows (continuation of the bottom)
    const o2 = ((H + y) * W + x) * 4;
    for (let c = 0; c < 4; c++) tile[o + c] = Math.round(data[o2 + c] * (1 - t) + data[o + c] * t);
  } else for (let c = 0; c < 4; c++) tile[o + c] = data[o + c];
}
const tileH = Math.round(H * scale);
await sharp(tile, { raw: { width: W, height: H, channels: 4 } }).resize(1024, tileH).png().toFile(`${S}/w_tile.png`);
const sizes = { tile: tileH };
for (const [k, [y0, y1]] of Object.entries({ top: TOP, bottom: BOT })) {
  const h = Math.round((y1 - y0) * scale);
  await sharp(src).extract({ left: X0, top: y0, width: W, height: y1 - y0 }).resize(1024, h).png().toFile(`${S}/w_${k}.png`);
  sizes[k] = h;
}
const parts = ['top', 'tile', 'tile', 'tile', 'bottom']; let y = 0; const comp = [];
for (const p of parts) { comp.push({ input: `${S}/w_${p}.png`, top: y, left: 0 }); y += sizes[p]; }
await sharp({ create: { width: 1024, height: y, channels: 4, background: { r: 120, g: 120, b: 120, alpha: 1 } } }).composite(comp).png().toFile(`${S}/w_stack.png`);
for (const [k, n] of [['top', 'wall_frame_top'], ['tile', 'wall_tile'], ['bottom', 'wall_frame_bottom']]) {
  const i = await sharp(`${S}/w_${k}.png`).webp({ quality: 88, alphaQuality: 100 }).toFile(`${A}/${n}.webp`); console.log(n, i.width, i.height);
}
console.log(sizes, 'stack', y);
