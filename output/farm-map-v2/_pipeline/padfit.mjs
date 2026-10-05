// node padfit.mjs raw.png out1024.webp out512.webp [flop] : key magenta, fit the pad's bbox to ONE fixed box (90% width, centred), so every gap variant shares the same ellipse
import { sharp, keyMagenta } from './keylib.mjs';
const [inp,o1,o2,flop]=process.argv.slice(2); const T=1024, BW=Math.round(T*0.9);
const {data,info}=await sharp(inp).ensureAlpha().raw().toBuffer({resolveWithObject:true}); const W=info.width,H=info.height; keyMagenta(data,W,H,{});
let x0=W,y0=H,x1=-1,y1=-1; for(let y=0;y<H;y++)for(let x=0;x<W;x++) if(data[(y*W+x)*4+3]>16){if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y;}
const w=x1-x0+1,h=y1-y0+1, BH=Math.round(BW/1.71); // fixed oval box at the pads' own aspect (~1.71:1)
let img=sharp(data,{raw:{width:W,height:H,channels:4}}).extract({left:x0,top:y0,width:w,height:h}).resize(BW,BH,{fit:'fill',kernel:'lanczos3'}); if(flop) img=img.flop();
const cut=await img.png().toBuffer();
const full=await sharp({create:{width:T,height:T,channels:4,background:{r:0,g:0,b:0,alpha:0}}}).composite([{input:cut,left:Math.round((T-BW)/2),top:Math.round((T-BH)/2)}]).png().toBuffer();
await sharp(full).webp({quality:92,alphaQuality:100}).toFile(o1); await sharp(full).resize(512,512,{kernel:'lanczos3'}).webp({quality:92,alphaQuality:100}).toFile(o2);
console.log(o1.split('/').pop(),'src bbox',w+'x'+h,'aspect',(w/h).toFixed(3),'-> box',BW+'x'+BH);
