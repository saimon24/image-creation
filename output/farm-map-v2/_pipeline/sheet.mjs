// node sheet.mjs out.png cell rowSmall files... : one row at `cell` px plus a row at `rowSmall` px, same canvas scale for all
import { sharp } from './keylib.mjs';
const [out, cS, sS, ...files] = process.argv.slice(2); const cell=+cS, sm=+sS, pad=10;
const W = files.length*(cell+pad)+pad, H = cell+sm+3*pad;
const comps=[];
for (let i=0;i<files.length;i++){
  comps.push({input: await sharp(files[i]).resize(cell,cell).png().toBuffer(), left: pad+i*(cell+pad), top: pad});
  comps.push({input: await sharp(files[i]).resize(sm,sm).png().toBuffer(), left: pad+i*(cell+pad)+Math.round((cell-sm)/2), top: cell+2*pad});
}
await sharp({create:{width:W,height:H,channels:3,background:'#5b8a45'}}).composite(comps).png().toFile(out); console.log('wrote', out, W+'x'+H);
