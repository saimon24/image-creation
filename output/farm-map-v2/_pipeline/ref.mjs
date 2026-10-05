// downscale a reference to max px PNG, flatten alpha onto a bg colour (default magenta) or keep
import sharp from '/Users/ioannis/dev/ImageCreation/node_modules/sharp/lib/index.js';
const [src, out, maxS, bg] = process.argv.slice(2);
let img = sharp(src).resize(+maxS, +maxS, {fit:'inside'});
if (bg && bg !== 'keep') { const h=bg.replace('#',''); img = img.flatten({background:{r:parseInt(h.slice(0,2),16),g:parseInt(h.slice(2,4),16),b:parseInt(h.slice(4,6),16)}}); }
await img.png().toFile(out); const m = await sharp(out).metadata(); console.log(out, m.width+'x'+m.height);
