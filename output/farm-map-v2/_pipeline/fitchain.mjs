// node fitchain.mjs outDir name startLevel baseScale raw... 
// Keys a building's level chain (raws share one framing because each level is an edit of the previous)
// and places every level at ONE uniform scale: baseScale (raw px -> 512 px), times a factor f<=1 so that
// every level fits the size cap (originals' largest L5: 451 x 474), bottom on the floor line y=477, centred.
// baseScale 'fitL1' = the draft rule (first raw fitted to 410 px, like keyone margin 0.1).
import { sharp, keyMagenta } from './keylib.mjs';
const CAP_W=451, CAP_H=474, FLOOR=477, T=512;
const [outDir,name,startS,baseS,...raws]=process.argv.slice(2);
const lv=[]; for(const f of raws){ const {data,info}=await sharp(f).ensureAlpha().raw().toBuffer({resolveWithObject:true}); const W=info.width,H=info.height; keyMagenta(data,W,H,{});
  let x0=W,y0=H,x1=-1,y1=-1; for(let y=0;y<H;y++)for(let x=0;x<W;x++) if(data[(y*W+x)*4+3]>16){if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y;} lv.push({data,W,H,x0,y0,x1,y1,w:x1-x0+1,h:y1-y0+1}); }
const s0 = baseS==='fitL1' ? Math.min((T-2*51)/lv[0].w,(T-2*51)/lv[0].h) : +baseS;
let f=1; for(const l of lv) f=Math.min(f, CAP_W/(l.w*s0), CAP_H/(l.h*s0)); const s=s0*f;
for(let i=0;i<lv.length;i++){ const l=lv[i]; const cut=await sharp(l.data,{raw:{width:l.W,height:l.H,channels:4}}).extract({left:l.x0,top:l.y0,width:l.w,height:l.h}).png().toBuffer();
  const sw=Math.max(1,Math.round(l.w*s)), sh=Math.max(1,Math.round(l.h*s)); const rs=await sharp(cut).resize(sw,sh,{kernel:'lanczos3'}).png().toBuffer();
  await sharp({create:{width:T,height:T,channels:4,background:{r:0,g:0,b:0,alpha:0}}}).composite([{input:rs,left:Math.round(T/2-sw/2),top:FLOOR-sh}]).webp({quality:90,alphaQuality:100}).toFile(`${outDir}/${name}_${+startS+i}.webp`); }
console.log(name,'factor',f.toFixed(3),'scale',s.toFixed(4),'max',Math.round(Math.max(...lv.map(l=>l.w))*s)+'x'+Math.round(Math.max(...lv.map(l=>l.h))*s));
