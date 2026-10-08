import sharp from '/Users/ioannis/dev/ImageCreation/node_modules/sharp/lib/index.js';
import fs from 'fs';
const dir = '/Users/ioannis/dev/TinyHarvest-fm-signs/assets/images/farm-map/signs';
const ids = fs.readdirSync(dir).filter(f=>f.endsWith('.webp')).map(f=>f.replace('.webp',''));
const W=384,H=256;
const tiles=[];
for (const id of ids){
  const meta = await sharp(`${dir}/${id}.webp`,{animated:false}).metadata();
  const buf = await sharp(`${dir}/${id}.webp`,{page:0}).resize(W,H).png().toBuffer();
  const svg = `<svg width="${W}" height="${H}"><rect width="${W}" height="${H}" fill="none" stroke="#888"/>
  ${Array.from({length:9},(_,i)=>`<line x1="0" x2="${W}" y1="${(i+1)*H/10}" y2="${(i+1)*H/10}" stroke="rgba(255,0,255,0.35)"/>`).join('')}
  <text x="4" y="14" font-size="13" fill="#000">${id} ${meta.pages}p</text></svg>`;
  const t = await sharp({create:{width:W,height:H,channels:4,background:'#cfe8cf'}}).composite([{input:buf},{input:Buffer.from(svg)}]).png().toBuffer();
  tiles.push(t);
}
const cols=6, rows=Math.ceil(tiles.length/cols);
await sharp({create:{width:cols*W,height:rows*H,channels:4,background:'#fff'}}).composite(tiles.map((t,i)=>({input:t,left:(i%cols)*W,top:Math.floor(i/cols)*H}))).png().toFile(process.argv[2]);
console.log(ids.join(' '));
