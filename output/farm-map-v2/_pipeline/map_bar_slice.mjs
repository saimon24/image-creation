import { sharp, keyMagenta } from '/Users/ioannis/dev/ImageCreation/output/farm-map-v2/_pipeline/keylib.mjs';
const [inp, outDir] = process.argv.slice(2);
const {data,info}=await sharp(inp).ensureAlpha().raw().toBuffer({resolveWithObject:true}); const W=info.width,H=info.height;
keyMagenta(data,W,H,{});
let x0=W,y0=H,x1=-1,y1=-1; for(let y=0;y<H;y++)for(let x=0;x<W;x++) if(data[(y*W+x)*4+3]>16){if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y;}
const bw=x1-x0+1,bh=y1-y0+1;
// target height 192 px (= 64 pt @3x)
const TH=192, s=TH/bh, TW=Math.round(bw*s);
const full=await sharp(data,{raw:{width:W,height:H,channels:4}}).extract({left:x0,top:y0,width:bw,height:bh}).resize(TW,TH,{kernel:'lanczos3'}).png().toBuffer();
await sharp(full).webp({quality:90,alphaQuality:100}).toFile(`${outDir}/plank_full.webp`);
// caps: rope binding sits within ~11% of the width from each end
const cap=Math.round(TW*0.115);
await sharp(full).extract({left:0,top:0,width:cap,height:TH}).webp({quality:90,alphaQuality:100}).toFile(`${outDir}/plank_left.webp`);
await sharp(full).extract({left:TW-cap,top:0,width:cap,height:TH}).webp({quality:90,alphaQuality:100}).toFile(`${outDir}/plank_right.webp`);
await sharp(full).extract({left:cap,top:0,width:TW-2*cap,height:TH}).webp({quality:90,alphaQuality:100}).toFile(`${outDir}/plank_mid.webp`);
console.log({bbox:[bw,bh],TW,TH,cap,mid:TW-2*cap});
