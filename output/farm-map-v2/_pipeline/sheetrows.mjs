// node sheetrows.mjs out.png cell small rowA... -- rowB... [-- rowC...] : rows stacked per column at equal canvas scale, plus a small row of the LAST row's files
import { sharp } from './keylib.mjs';
const a=process.argv.slice(2); const [out,cS,sS]=a; const rows=[[]]; for(const f of a.slice(3)){ if(f==='--') rows.push([]); else rows.at(-1).push(f); }
const cell=+cS, sm=+sS, pad=10, n=Math.max(...rows.map(r=>r.length)); const W=n*(cell+pad)+pad, H=rows.length*(cell+pad)+sm+2*pad; const comps=[];
for(let r=0;r<rows.length;r++) for(let i=0;i<rows[r].length;i++) comps.push({input:await sharp(rows[r][i]).resize(cell,cell).png().toBuffer(),left:pad+i*(cell+pad),top:pad+r*(cell+pad)});
const last=rows.at(-1); for(let i=0;i<last.length;i++) comps.push({input:await sharp(last[i]).resize(sm,sm).png().toBuffer(),left:pad+i*(cell+pad)+Math.round((cell-sm)/2),top:pad+rows.length*(cell+pad)});
await sharp({create:{width:W,height:H,channels:3,background:'#5b8a45'}}).composite(comps).png().toFile(out); console.log('wrote',out,W+'x'+H);
