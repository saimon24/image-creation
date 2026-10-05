// usage: node contact.mjs out.png cellSize bg(hex|checker) cols file...
import sharp from '/Users/ioannis/dev/ImageCreation/node_modules/sharp/lib/index.js';
const [out, cellS, bg, colsS, ...files] = process.argv.slice(2);
const cell = +cellS, cols = +colsS, pad = Math.max(4, Math.round(cell/16));
const rows = Math.ceil(files.length/cols);
const W = cols*(cell+pad)+pad, H = rows*(cell+pad)+pad;
let base;
if (bg === 'checker') {
  const sq = 8; const buf = Buffer.alloc(W*H*3);
  for (let y=0;y<H;y++) for (let x=0;x<W;x++){ const c = ((Math.floor(x/sq)+Math.floor(y/sq))%2)?200:235; const i=(y*W+x)*3; buf[i]=buf[i+1]=buf[i+2]=c; }
  base = sharp(buf,{raw:{width:W,height:H,channels:3}});
} else {
  const h = bg.replace('#',''); base = sharp({create:{width:W,height:H,channels:3,background:{r:parseInt(h.slice(0,2),16),g:parseInt(h.slice(2,4),16),b:parseInt(h.slice(4,6),16)}}});
}
const comps = [];
for (let i=0;i<files.length;i++){
  const buf = await sharp(files[i]).resize(cell,cell,{fit:'contain',background:{r:0,g:0,b:0,alpha:0}}).png().toBuffer();
  comps.push({input:buf, left: pad+(i%cols)*(cell+pad), top: pad+Math.floor(i/cols)*(cell+pad)});
}
await base.composite(comps).png().toFile(out);
console.log('wrote', out, W+'x'+H);
