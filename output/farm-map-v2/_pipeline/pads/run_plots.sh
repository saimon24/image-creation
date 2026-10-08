#!/bin/zsh
# usage: run_plots.sh -> rubble ×7 (on the ring), empty and locked plots, keyed + normalized into out/plots
S=${ART_S:?}; P=${0:A:h}; O=$P/out/plots; mkdir -p $O/ref $O/keyed
D=/Users/ioannis/dev/TinyHarvest-farmmap/assets/images/farm-map/scene
gen() { for t in 1 2 3; do node $P/../gen.mjs "$@" > /dev/null 2>&1 && return 0; sleep 3; done; echo "FAILED $1"; return 1; }
node -e "
const sharp=require('/Users/ioannis/dev/ImageCreation/node_modules/sharp');(async()=>{
const ring=await sharp('$P/pilot/ring_ref.png').resize(512,512).png().toBuffer();const size=267;
for(const n of ['rubble_6','rubble_7','rubble_8','rubble_9','rubble_10','rubble_11','rubble_clearing']){
 const r=await sharp('$D/'+n+'.webp').resize(size,size).png().toBuffer();
 await sharp(await sharp(ring).composite([{input:r,left:256-Math.round(size/2),top:410-Math.round(size*0.66)}]).flatten({background:'#ff00ff'}).png().toBuffer()).resize(1024,1024).png().toFile('$O/ref/'+n+'.png');}})()"
for n in rubble_6 rubble_7 rubble_8 rubble_9 rubble_10 rubble_11 rubble_clearing; do
  ( gen pad_$n 1024x1024 low $P/rubble_prompt.txt $O/ref/$n.png && node $P/../keynative.mjs $S/raw/pad_$n.png $O/keyed/$n.png 512 >/dev/null ) &
done
( gen pad_locked 1024x1024 low $P/locked_prompt.txt $P/pilot/ring_ref.png && node $P/../keynative.mjs $S/raw/pad_locked.png $O/keyed/locked.png 512 >/dev/null ) &
( gen pad_empty 1024x1024 low $P/empty_prompt.txt $P/pilot/ring_ref.png && node $P/../keynative.mjs $S/raw/pad_empty.png $O/keyed/empty.png 512 >/dev/null ) &
wait
for f in $O/keyed/*.png; do node $P/normalize.mjs $P/pilot/ring_keyed.png $f $O/$(basename $f) > /dev/null; done
echo "plots $(ls $O/keyed/*.png | wc -l | tr -d ' ')"
