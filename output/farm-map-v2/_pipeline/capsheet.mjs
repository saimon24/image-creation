// node capsheet.mjs out.png cell "caption:file" ... : 512-px sprites side by side at equal scale, each with the size cap box (451x474, floor y=477) outlined
import { sharp } from './keylib.mjs';
const [out,cS,...items]=process.argv.slice(2); const cell=+cS, pad=12, capH=26, k=cell/512;
const W=items.length*(cell+pad)+pad, H=cell+capH+2*pad; const comps=[];
const bx=(256-451/2)*k, by=(477-474)*k, bw=451*k, bh=474*k;
for(let i=0;i<items.length;i++){ const j=items[i].indexOf(':'); const cap=items[i].slice(0,j), f=items[i].slice(j+1); const x=pad+i*(cell+pad);
  const box=`<svg width="${cell}" height="${cell}" xmlns="http://www.w3.org/2000/svg"><rect x="${bx}" y="${by}" width="${bw}" height="${bh}" fill="none" stroke="#ffe066" stroke-width="2" stroke-dasharray="6,4"/><line x1="0" y1="${477*k}" x2="${cell}" y2="${477*k}" stroke="#ffffff" stroke-opacity="0.35" stroke-width="1"/></svg>`;
  comps.push({input:Buffer.from(box),left:x,top:pad});
  comps.push({input:await sharp(f).resize(cell,cell).png().toBuffer(),left:x,top:pad});
  const t=`<svg width="${cell}" height="${capH}" xmlns="http://www.w3.org/2000/svg"><text x="${cell/2}" y="18" font-family="Helvetica" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">${cap}</text></svg>`;
  comps.push({input:Buffer.from(t),left:x,top:pad+cell}); }
await sharp({create:{width:W,height:H,channels:3,background:'#5b8a45'}}).composite(comps).png().toFile(out); console.log('wrote',out,W+'x'+H);
