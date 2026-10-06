import sharp from '/Users/ioannis/dev/ImageCreation/node_modules/sharp/lib/index.js';
const [inp, x, step] = process.argv.slice(2);
const { data, info } = await sharp(inp).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const out=[]; let prev='';
for (let y=0;y<info.height;y++){const i=(y*info.width+Number(x))*4; const [r,g,b,a]=[data[i],data[i+1],data[i+2],data[i+3]];
 let c = a<128?'clear': (b>r && b>150)?'glass': (r>150&&g<60)?'red': (r>180&&g>130&&b<110)?'gold': (r>g&&g>b)?'wood':'other';
 if(c!==prev){out.push(`${y}(${(y/info.height).toFixed(3)}):${c}`);prev=c;}}
console.log(info.width+'x'+info.height, out.join(' '));
