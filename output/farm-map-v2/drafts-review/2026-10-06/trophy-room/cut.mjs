import sharp from '/Users/ioannis/dev/ImageCreation/node_modules/sharp/lib/index.js';
const S = process.env.S, A = process.env.A;
const jobs = [
  ['props', 'cushion', [80, 150, 520, 395], { width: 256 }],
  ['props', 'year_plaque', [595, 220, 985, 370], { width: 384 }],
  ['props', 'plaque_mount', [1095, 75, 1440, 445], { width: 256 }],
  ['props', 'stamp_sheet_frame', [130, 515, 855, 925], { width: 768 }],
  ['props', 'arrow_right', [1055, 590, 1355, 880], { width: 192 }],
  ['pins', 'pin_gold', [25, 190, 505, 775], 'square'],
  ['pins', 'pin_platinum', [530, 190, 1015, 775], 'square'],
  ['pins', 'pin_diamond', [1040, 190, 1525, 775], 'square'],
];
const report = {};
for (const [sheet, name, [x0, y0, x1, y1], fit] of jobs) {
  const { data, info } = await sharp(`${S}/${sheet}_keyed.png`).extract({ left: x0, top: y0, width: x1 - x0, height: y1 - y0 }).raw().toBuffer({ resolveWithObject: true });
  let minX = info.width, maxX = 0, minY = info.height, maxY = 0, cx0 = info.width, cx1 = 0, cy0 = info.height, cy1 = 0;
  for (let y = 0; y < info.height; y++) for (let x = 0; x < info.width; x++) {
    const i = (y * info.width + x) * 4; if (data[i + 3] > 40) { if (x < minX) minX = x; if (x > maxX) maxX = x; if (y < minY) minY = y; if (y > maxY) maxY = y; }
    if (data[i] > 235 && data[i + 1] > 222 && data[i + 2] > 195 && data[i+3] > 200) { if (x < cx0) cx0 = x; if (x > cx1) cx1 = x; if (y < cy0) cy0 = y; if (y > cy1) cy1 = y; }
  }
  const pad = 4; minX = Math.max(0, minX - pad); minY = Math.max(0, minY - pad); maxX = Math.min(info.width - 1, maxX + pad); maxY = Math.min(info.height - 1, maxY + pad);
  const w = maxX - minX + 1, h = maxY - minY + 1;
  let img = sharp(data, { raw: info }).extract({ left: minX, top: minY, width: w, height: h });
  let outW, outH, offX = 0, offY = 0, sc;
  if (fit === 'square') {
    const side = Math.max(w, h); offX = Math.floor((side - w) / 2); offY = Math.floor((side - h) / 2);
    const buf = await img.png().toBuffer();
    img = sharp({ create: { width: side, height: side, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } }).composite([{ input: buf, left: offX, top: offY }]);
    const b2 = await img.png().toBuffer(); img = sharp(b2).resize(256, 256); sc = 256 / side; outW = outH = 256;
  } else { sc = fit.width / w; outW = fit.width; outH = Math.round(h * sc); img = img.resize(outW, outH); }
  const o = await img.webp({ quality: 88, alphaQuality: 100 }).toFile(`${A}/${name}.webp`);
  await sharp(`${A}/${name}.webp`).png().toFile(`${S}/c_${name}.png`);
  const r = { size: `${o.width}x${o.height}` };
  if (cx1 > cx0) {
    const ccx = ((cx0 + cx1) / 2 - minX + offX) * sc, ccy = ((cy0 + cy1) / 2 - minY + offY) * sc;
    r.cream = { cx: +(ccx / outW).toFixed(3), cy: +(ccy / outH).toFixed(3), w: +(((cx1 - cx0) * sc) / outW).toFixed(3), h: +(((cy1 - cy0) * sc) / outH).toFixed(3) };
  }
  report[name] = r;
}
console.log(JSON.stringify(report, null, 1));
