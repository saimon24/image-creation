// usage: node gen.mjs <name> <size> <quality> <promptFile> [ref1 ref2 ...]
// If refs given -> images.edit (gpt-image-2), else images.generations (gpt-image-2).
// Saves raw PNG to scratchpad/raw/<name>.png and appends to calls.log
import fs from 'node:fs';
import path from 'node:path';
const S = process.env.ART_S || '/private/tmp/claude-501/-Users-ioannis/25e0206e-1d37-4654-918c-dd27c9cff241/scratchpad/art';
const env = fs.readFileSync('/Users/ioannis/dev/ImageCreation/.env','utf8');
const key = env.match(/^OPENAI_API_KEY=(.*)$/m)[1].trim().replace(/^["']|["']$/g,'');
const [name, size, quality, promptFile, ...refs] = process.argv.slice(2);
if (quality !== 'low') { console.error('quality must be low'); process.exit(2); }
const prompt = fs.readFileSync(promptFile,'utf8');
const model = process.env.MODEL || 'gpt-image-2';
const t0 = Date.now();
let res;
if (refs.length) {
  const fd = new FormData();
  fd.append('model', model);
  fd.append('prompt', prompt);
  fd.append('size', size);
  fd.append('quality', quality);
  fd.append('n', '1');
  for (const r of refs) {
    const buf = fs.readFileSync(r);
    fd.append('image[]', new Blob([buf], {type:'image/png'}), path.basename(r));
  }
  if (process.env.MASK) fd.append('mask', new Blob([fs.readFileSync(process.env.MASK)],{type:'image/png'}), 'mask.png');
  res = await fetch('https://api.openai.com/v1/images/edits', {method:'POST', headers:{Authorization:`Bearer ${key}`}, body: fd});
} else {
  res = await fetch('https://api.openai.com/v1/images/generations', {method:'POST', headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json'}, body: JSON.stringify({model, prompt, size, quality, n:1})});
}
const txt = await res.text();
const kind = refs.length ? `edit(${refs.length} refs)` : 'generate';
if (!res.ok) {
  fs.appendFileSync(`${S}/calls.log`, `${new Date().toISOString()}\t${name}\t${model}\t${kind}\t${size}\t${quality}\tFAIL ${res.status}\n`);
  console.error('HTTP', res.status, txt.slice(0,1500)); process.exit(1);
}
const j = JSON.parse(txt);
const b64 = j.data[0].b64_json;
fs.writeFileSync(`${S}/raw/${name}.png`, Buffer.from(b64,'base64'));
fs.appendFileSync(`${S}/calls.log`, `${new Date().toISOString()}\t${name}\t${model}\t${kind}\t${size}\t${quality}\tOK ${((Date.now()-t0)/1000).toFixed(0)}s\t${JSON.stringify(j.usage||{})}\n`);
console.log('ok', name, ((Date.now()-t0)/1000).toFixed(0)+'s', JSON.stringify(j.usage||{}));
