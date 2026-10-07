#!/bin/zsh
# usage: draft_ok.sh <id> <suffix> -> low draft retried (max 5) until measure.mjs finds all 16 plots cleanly
# and a legal clean spot for every deco; result in valleys/drafts/<id>_<suffix>.png + valleys/measure/<id>.*
S=${ART_S:?}; P=${0:A:h}; V=/Users/ioannis/dev/ImageCreation/output/farm-map-v2/valleys
id=$1; SUF=$2
for try in 1 2 3 4 5; do
  node $P/../gen.mjs valley_${id}_${SUF}$try 1024x1536 ${QUALITY:-low} $V/prompts/$id.txt $V/guides/$id.png $V/style_ref_sunrise.png > /dev/null || continue
  cp $S/raw/valley_${id}_${SUF}$try.png $V/drafts/${id}_$SUF.png
  out=$(cd $P && node measure.mjs $SUF $id 2>&1)
  weak=$(echo "$out" | grep -o 'weak [0-9]*' | awk '{print $2}')
  if [[ "$weak" -le 1 ]] && ! echo "$out" | grep -q "no legal"; then echo "ok $id try $try weak $weak"; exit 0; fi
  echo "retry $id (weak $weak$(echo "$out" | grep -c 'no legal' | sed 's/^/, no-legal /'))"
done
echo "gave up $id"
