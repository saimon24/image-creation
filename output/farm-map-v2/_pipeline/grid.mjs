// node grid.mjs out.png cell cols "caption:file" ... : equal-scale grid with a small caption under each tile (captions only on the sheet)
import { sharp } from './keylib.mjs';
const [out,cS,colsS,...items]=process.argv.slice(2); const cell=+cS, cols=+colsS, pad=10, capH=26;
const rows=Math.ceil(items.length/cols); const W=cols*(cell+pad)+pad, H=rows*(cell+capH+pad)+pad; const comps=[];
for(let i=0;i<items.length;i++){ const k=items[i].indexOf(':'); const cap=items[i].slice(0,k), f=items[i].slice(k+1); const x=pad+(i%cols)*(cell+pad), y=pad+Math.floor(i/cols)*(cell+capH+pad);
  comps.push({input:await sharp(f).resize(cell,cell).png().toBuffer(),left:x,top:y});
  const svg=`<svg width="${cell}" height="${capH}" xmlns="http://www.w3.org/2000/svg"><text x="${cell/2}" y="19" font-family="Helvetica" font-size="16" font-weight="bold" fill="#ffffff" text-anchor="middle">${cap}</text></svg>`;
  comps.push({input:Buffer.from(svg),left:x,top:y+cell}); }
await sharp({create:{width:W,height:H,channels:3,background:'#5b8a45'}}).composite(comps).png().toFile(out); console.log('wrote',out,W+'x'+H);
