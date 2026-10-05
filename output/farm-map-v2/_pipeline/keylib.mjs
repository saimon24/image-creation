import sharp from '/Users/ioannis/dev/ImageCreation/node_modules/sharp/lib/index.js';
export { sharp };
// key magenta background out of RGBA raw buffer (in place). returns data
export function keyMagenta(data, W, H, opt={}) {
  const KEY=opt.key==='green'?[0,255,0]:[255,0,255]; const GREEN=opt.key==='green';
  const N=W*H, holeT=+(opt.holeT||70), floodT=+(opt.floodT||150), magT=+(opt.magT||105);
  const dist=(i)=>{const r=data[i*4],g=data[i*4+1],b=data[i*4+2];return Math.sqrt((r-KEY[0])**2+(g-KEY[1])**2+(b-KEY[2])**2);};
  const mag=(i)=>{const r=data[i*4],g=data[i*4+1],b=data[i*4+2];return GREEN? g-Math.max(r,b) : Math.min(r,b)-g;};
  const bg=new Uint8Array(N); const stack=[];
  for(let x=0;x<W;x++){stack.push(x,(H-1)*W+x);} for(let y=0;y<H;y++){stack.push(y*W,y*W+W-1);}
  while(stack.length){const p=stack.pop(); if(bg[p])continue; if(dist(p)>floodT&&mag(p)<120)continue; bg[p]=1; const x=p%W,y=(p/W)|0;
    if(x>0)stack.push(p-1); if(x<W-1)stack.push(p+1); if(y>0)stack.push(p-W); if(y<H-1)stack.push(p+W);}
  for(let p=0;p<N;p++){ if(bg[p])continue; const r=data[p*4],b=data[p*4+2]; if(dist(p)<holeT||(mag(p)>magT&&(GREEN||Math.abs(r-b)<90))) bg[p]=1; }
  const D=new Float32Array(N).fill(99); for(let p=0;p<N;p++) if(bg[p]) D[p]=0;
  for(let pass=0;pass<2;pass++){
    for(let y=0;y<H;y++)for(let x=0;x<W;x++){const p=y*W+x; if(x>0)D[p]=Math.min(D[p],D[p-1]+1); if(y>0)D[p]=Math.min(D[p],D[p-W]+1); if(x>0&&y>0)D[p]=Math.min(D[p],D[p-W-1]+1.414); if(x<W-1&&y>0)D[p]=Math.min(D[p],D[p-W+1]+1.414);}
    for(let y=H-1;y>=0;y--)for(let x=W-1;x>=0;x--){const p=y*W+x; if(x<W-1)D[p]=Math.min(D[p],D[p+1]+1); if(y<H-1)D[p]=Math.min(D[p],D[p+W]+1); if(x<W-1&&y<H-1)D[p]=Math.min(D[p],D[p+W+1]+1.414); if(x>0&&y<H-1)D[p]=Math.min(D[p],D[p+W-1]+1.414);}
  }
  for(let p=0;p<N;p++){const i=p*4; if(bg[p]){data[i+3]=0;continue;}
    if(D[p]<=3.5){const m=mag(p); if(m>0){const a=Math.max(0.02,Math.min(1,1-m/255)); const K=KEY;
        for(let c=0;c<3;c++){ data[i+c]=Math.max(0,Math.min(255,Math.round((data[i+c]-(1-a)*K[c])/a))); }
        data[i+3]=Math.round(data[i+3]*a);} if(D[p]<=1.0) data[i+3]=Math.round(data[i+3]*0.85);}
  }
  return data;
}
// place an RGBA region (cut buffer png) into target canvas
export async function place(cutPng, bw, bh, TW, TH, {anchor='center', margin=0.08, bottomMargin}={}) {
  const mx=Math.round(TW*margin), my=Math.round(TH*margin); const bm = bottomMargin!==undefined?Math.round(TH*bottomMargin):my;
  const s=Math.min((TW-2*mx)/bw,(TH-my-bm)/bh); const nw=Math.max(1,Math.round(bw*s)), nh=Math.max(1,Math.round(bh*s));
  const resized=await sharp(cutPng).resize(nw,nh,{kernel:'lanczos3'}).png().toBuffer();
  const left=Math.round((TW-nw)/2), top=anchor==='bottom'?TH-bm-nh:Math.round((TH-nh)/2);
  return sharp({create:{width:TW,height:TH,channels:4,background:{r:0,g:0,b:0,alpha:0}}}).composite([{input:resized,left,top}]);
}
