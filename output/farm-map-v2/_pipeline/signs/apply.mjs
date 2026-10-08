// Writes measured.json into FARM_SIGNS (engine/farm-signs.ts): banner x/w/y/h/arch
// and title y/h/widthFraction; colours stay as they are.
// The name's room keeps a margin off the face's ends (rivets, rounded corners).
import fs from 'fs';
const TS = process.argv[3] ?? '/Users/ioannis/dev/TinyHarvest-fm-signs/engine/farm-signs.ts';
const measured = JSON.parse(fs.readFileSync(process.argv[2] ?? new URL('./measured.json', import.meta.url)));
const NAME_MARGIN = 0.88;
const f3 = (v) => String(Math.round(v * 1000) / 1000);
let src = fs.readFileSync(TS, 'utf8');
for (const m of measured) {
  const re = new RegExp(`(id: '${m.id}',[\\s\\S]*?banner: \\{ )x: [\\d.]+, w: [\\d.]+, y: [\\d.]+, h: [\\d.]+, arch: [\\d.]+(, color[^}]*\\},\\s*title: \\{ )y: [\\d.]+(?:, h: [\\d.]+)?(, color[^}]*?), widthFraction: [\\d.]+ \\}`);
  if (!re.test(src)) throw new Error(`no match for ${m.id}`);
  src = src.replace(re, (_, a, b, c) =>
    `${a}x: ${f3(m.banner.x)}, w: ${f3(m.banner.w)}, y: ${f3(m.banner.y)}, h: ${f3(m.banner.h)}, arch: ${m.banner.arch}${b}y: ${f3(m.title.y)}, h: ${f3(m.title.h)}${c}, widthFraction: ${f3(m.title.widthFraction * NAME_MARGIN)} }`);
}
fs.writeFileSync(TS, src);
console.log('updated', measured.length);
