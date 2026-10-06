import sharp from '/Users/ioannis/dev/ImageCreation/node_modules/sharp/lib/index.js';
const [inp, x0] = process.argv.slice(2);
const { data, info } = await sharp(inp).raw().toBuffer({ resolveWithObject: true });
const W = info.width, C = info.channels;
let prev = false; const starts = [];
for (let y = 0; y < info.height; y++) {
  const i = (y * W + Number(x0)) * C; const r = data[i], g = data[i+1], b = data[i+2];
  const gold = r > 190 && g > 140 && b < 110;
  if (gold && !prev) starts.push(y);
  prev = gold;
}
console.log(starts.join(' '));
// bbox of non-magenta
let minX=W,maxX=0,minY=info.height,maxY=0;
for (let y=0;y<info.height;y++) for (let x=0;x<W;x++){const i=(y*W+x)*C; if (!(data[i]>200&&data[i+2]>200&&data[i+1]<80)){ if(x<minX)minX=x; if(x>maxX)maxX=x; if(y<minY)minY=y; if(y>maxY)maxY=y;}}
console.log('bbox',minX,maxX,minY,maxY);
