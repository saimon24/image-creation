// node keylike.mjs refRaw.png newRaw.png out.webp [size=512] [margin=0.1]
// Keys newRaw and places it with the SAME scale and bottom-centre anchor that keyone gives refRaw,
// so an upgrade level keeps its true size relative to the level it was chained from.
import { sharp, keyMagenta } from './keylib.mjs';
const [refRaw, newRaw, out, sizeS='512', mS='0.1'] = process.argv.slice(2); const T=+sizeS, m=+mS;
async function keyed(f){ const {data,info}=await sharp(f).ensureAlpha().raw().toBuffer({resolveWithObject:true}); const W=info.width,H=info.height; keyMagenta(data,W,H,{});
  let x0=W,y0=H,x1=-1,y1=-1; for(let y=0;y<H;y++)for(let x=0;x<W;x++) if(data[(y*W+x)*4+3]>16){if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y;}
  return {data,W,H,x0,y0,x1,y1}; }
const r=await keyed(refRaw), n=await keyed(newRaw); const mx=Math.round(T*m);
const rbw=r.x1-r.x0+1, rbh=r.y1-r.y0+1; const s=Math.min((T-2*mx)/rbw,(T-2*mx)/rbh);
const anchorX=T/2, anchorY=T-mx; // ref bbox bottom-centre lands here
const refCx=(r.x0+r.x1)/2; // keep the new level's offset relative to the ref's centre
const nbw=n.x1-n.x0+1, nbh=n.y1-n.y0+1;
const cut=await sharp(n.data,{raw:{width:n.W,height:n.H,channels:4}}).extract({left:n.x0,top:n.y0,width:nbw,height:nbh}).png().toBuffer();
const sw=Math.round(nbw*s), sh=Math.round(nbh*s); const rs=await sharp(cut).resize(sw,sh,{kernel:'lanczos3'}).png().toBuffer();
let left=Math.round(anchorX+(n.x0-refCx)*s), top=Math.round(anchorY-(r.y1-n.y0+1)*s);
const fitsX = left>=0 && left+sw<=T, fitsY = top>=0 && top+sh<=T;
let img=sharp({create:{width:T,height:T,channels:4,background:{r:0,g:0,b:0,alpha:0}}});
if (fitsX && fitsY) img=img.composite([{input:rs,left,top}]);
else { const k=Math.min(T/sw,T/sh,1)*0.98; const rs2=await sharp(rs).resize(Math.round(sw*k),Math.round(sh*k)).png().toBuffer(); const m2=await sharp(rs2).metadata();
  img=img.composite([{input:rs2,left:Math.round((T-m2.width)/2),top:T-m2.height-2}]); console.log('WARN shrunk to fit',k.toFixed(3)); }
await img.webp({quality:90,alphaQuality:100}).toFile(out); console.log('wrote',out.split('/').pop(),'scale',s.toFixed(3),'growth w',(nbw/rbw).toFixed(2),'h',(nbh/rbh).toFixed(2));
