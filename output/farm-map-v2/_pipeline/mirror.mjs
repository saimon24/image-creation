import { sharp } from './keylib.mjs';
const [i,o]=process.argv.slice(2); await sharp(i).flop().webp({quality:90,alphaQuality:100}).toFile(o); console.log('mirrored',o.split('/').pop());
