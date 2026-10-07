#!/bin/zsh
# usage: make_theme.sh <id> <suffix>  -> low draft, retried until the 16 plots are found cleanly (max 4 tries),
# then warp + AI border + compose into valleys/final/<id>_<suffix>.png
S=${ART_S:?}; P=${0:A:h}; V=/Users/ioannis/dev/ImageCreation/output/farm-map-v2/valleys; G=$P/../gen.mjs
id=$1; SUF=$2; Q=${QUALITY:-low}
mkdir -p $V/warped $V/final
for try in 1 2 3 4; do
  node $G valley_${id}_${SUF}$try 1024x1536 $Q $V/prompts/$id.txt $V/guides/$id.png $V/style_ref_sunrise.png > /dev/null || continue
  cp $S/raw/valley_${id}_${SUF}$try.png $V/drafts/${id}_$SUF.png
  node $P/warp.mjs $V/drafts/${id}_$SUF.png $V/warped/${id}_$SUF.png > $V/warped/${id}_$SUF.txt
  grep -q 'QUALITY ok' $V/warped/${id}_$SUF.txt && break
  echo "retry $id ($(tail -1 $V/warped/${id}_$SUF.txt))"
done
node $G border_${id}_$SUF 1024x1536 $Q $P/border_prompt.txt $V/warped/${id}_$SUF.png > /dev/null \
  && node $P/compose.mjs $V/warped/${id}_$SUF.png $S/raw/border_${id}_$SUF.png $V/final/${id}_$SUF.png \
  && echo "done $id try $try $(tail -1 $V/warped/${id}_$SUF.txt)"
