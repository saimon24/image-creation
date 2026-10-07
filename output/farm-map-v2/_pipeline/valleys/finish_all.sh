#!/bin/zsh
# usage: finish_all.sh <suffix> [ids...] -> drafts/<id>_<suffix>.png -> warp + AI border + compose -> final/<id>_<suffix>.png
S=${ART_S:?}; P=${0:A:h}; V=/Users/ioannis/dev/ImageCreation/output/farm-map-v2/valleys
SUF=$1; shift; IDS=(${@:-$(ls $V/prompts | sed 's/\.txt$//')})
mkdir -p $V/warped $V/final
i=0
for id in $IDS; do
  ( node $P/warp.mjs $V/drafts/${id}_$SUF.png $V/warped/${id}_$SUF.png > $V/warped/${id}_$SUF.txt \
    && node $P/../gen.mjs border_${id}_$SUF 1024x1536 ${QUALITY:-low} $P/border_prompt.txt $V/warped/${id}_$SUF.png > /dev/null \
    && node $P/compose.mjs $V/warped/${id}_$SUF.png $S/raw/border_${id}_$SUF.png $V/final/${id}_$SUF.png && echo "done $id" ) &
  i=$((i+1)); if (( i % 5 == 0 )); then wait; fi
done; wait
