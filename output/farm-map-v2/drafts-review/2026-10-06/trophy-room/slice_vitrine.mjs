import sharp from '/Users/ioannis/dev/ImageCreation/node_modules/sharp/lib/index.js';
const S = process.env.S;
const src = `${S}/vitrine_keyed.png`;
const X0 = 160, X1 = 864, W = X1 - X0; // common width for all pieces
const cuts = { top: [28, 141], honour: [141, Number(process.env.H_END || 533)], shelf: [793, 1074], base: [1367, 1516] };
const scale = 1024 / W;
const out = {};
for (const [k, [y0, y1]] of Object.entries(cuts)) {
  const h = Math.round((y1 - y0) * scale);
  await sharp(src).extract({ left: X0, top: y0, width: W, height: y1 - y0 }).resize(1024, h).png().toFile(`${S}/v_${k}.png`);
  out[k] = h;
}
console.log(out);
// stack preview: top, honour, shelf x3, base
const parts = ['top', 'honour', 'shelf', 'shelf', 'shelf', 'base'];
let y = 0; const comp = [];
for (const p of parts) { comp.push({ input: `${S}/v_${p}.png`, top: y, left: 0 }); y += out[p]; }
await sharp({ create: { width: 1024, height: y, channels: 4, background: { r: 120, g: 120, b: 120, alpha: 1 } } }).composite(comp).png().toFile(`${S}/v_stack.png`);
console.log('stack', y);
