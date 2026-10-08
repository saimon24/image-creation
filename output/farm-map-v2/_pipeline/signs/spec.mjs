// Reads FARM_SIGNS out of engine/farm-signs.ts (banner + title specs) as JSON.
import fs from 'fs';
const SRC = fs.readFileSync(process.argv[2] ?? '/Users/ioannis/dev/TinyHarvest-fm-signs/engine/farm-signs.ts', 'utf8');
const obj = (s) => Object.fromEntries([...s.matchAll(/(\w+): ('[^']*'|[\d.]+)/g)].map(([, k, v]) => [k, v.startsWith("'") ? v.slice(1, -1) : +v]));
const out = [];
for (const m of SRC.matchAll(/id: '(\w+)',[\s\S]*?banner: \{([^}]*)\},\s*title: \{([^}]*)\}/g)) {
  out.push({ id: m[1], banner: obj(m[2]), title: obj(m[3]) });
}
console.log(JSON.stringify(out, null, 1));
