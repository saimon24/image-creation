// node keynative.mjs raw.png out.png [size=512] : key magenta out and scale the WHOLE frame to size (no refit), keeping the chained framing
import { sharp, keyMagenta } from './keylib.mjs';
const [inp,out,sS='512']=process.argv.slice(2);
const {data,info}=await sharp(inp).ensureAlpha().raw().toBuffer({resolveWithObject:true}); keyMagenta(data,info.width,info.height,{});
await sharp(data,{raw:{width:info.width,height:info.height,channels:4}}).resize(+sS,+sS,{kernel:'lanczos3'}).png().toFile(out); console.log('keyed',out.split('/').pop());
