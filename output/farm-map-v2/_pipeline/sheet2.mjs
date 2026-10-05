// node sheet2.mjs out.png cell small topFiles... -- bottomFiles... : two rows (e.g. L1 above L2) at equal canvas scale + a small row of the bottom files
import { sharp } from './keylib.mjs';
const a=process.argv.slice(2); const [out,cS,sS]=a; const rest=a.slice(3); const k=rest.indexOf('--'); const top=rest.slice(0,k), bot=rest.slice(k+1);
const cell=+cS, sm=+sS, pad=10, n=Math.max(top.length,bot.length); const W=n*(cell+pad)+pad, H=2*cell+sm+4*pad; const comps=[];
for(let i=0;i<n;i++){ const x=pad+i*(cell+pad);
  if(top[i]) comps.push({input:await sharp(top[i]).resize(cell,cell).png().toBuffer(),left:x,top:pad});
  if(bot[i]){ comps.push({input:await sharp(bot[i]).resize(cell,cell).png().toBuffer(),left:x,top:cell+2*pad});
    comps.push({input:await sharp(bot[i]).resize(sm,sm).png().toBuffer(),left:x+Math.round((cell-sm)/2),top:2*cell+3*pad}); } }
await sharp({create:{width:W,height:H,channels:3,background:'#5b8a45'}}).composite(comps).png().toFile(out); console.log('wrote',out,W+'x'+H);
