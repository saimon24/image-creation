// node keyone.mjs in.png out.webp --size WxH --anchor bottom|center --margin m [--bottomMargin b] [--key green]
import { sharp, keyMagenta, place } from './keylib.mjs';
const a=process.argv.slice(2); const [inp,out]=a; const opt={}; for(let i=2;i<a.length;i+=2) opt[a[i].replace(/^--/,'')]=a[i+1];
const [TW,TH]=(opt.size||'512x512').split('x').map(Number);
const {data,info}=await sharp(inp).ensureAlpha().raw().toBuffer({resolveWithObject:true}); const W=info.width,H=info.height;
keyMagenta(data,W,H,opt);
let x0=W,y0=H,x1=-1,y1=-1; for(let y=0;y<H;y++)for(let x=0;x<W;x++) if(data[(y*W+x)*4+3]>16){if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y;}
const bw=x1-x0+1,bh=y1-y0+1; const cut=await sharp(data,{raw:{width:W,height:H,channels:4}}).extract({left:x0,top:y0,width:bw,height:bh}).png().toBuffer();
const o=await place(cut,bw,bh,TW,TH,{anchor:opt.anchor||'center',margin:+(opt.margin??0.08),bottomMargin:opt.bottomMargin!==undefined?+opt.bottomMargin:undefined});
await o.webp({quality:90,alphaQuality:100}).toFile(out); console.log('keyed',out.split('/').pop(),`bbox ${bw}x${bh}`);
