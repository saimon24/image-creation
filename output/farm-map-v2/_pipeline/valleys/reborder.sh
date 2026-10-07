#!/bin/zsh
# usage: reborder.sh <suffix> [ids...] -> redo warp + AI border + compose from the existing drafts
S=${ART_S:?}; P=${0:A:h}; V=/Users/ioannis/dev/ImageCreation/output/farm-map-v2/valleys; G=$P/../gen.mjs
SUF=$1; shift; IDS=(${@:-$(ls $V/prompts | sed 's/\.txt$//')}); i=0
for id in $IDS; do
  ( node $P/warp.mjs $V/drafts/${id}_$SUF.png $V/warped/${id}_$SUF.png > $V/warped/${id}_$SUF.txt \
    && node $G border_${id}_$SUF 1024x1536 ${QUALITY:-low} $P/${BORDER_PROMPT:-border_prompt.txt} $V/warped/${id}_$SUF.png > /dev/null \
    && node $P/compose.mjs $V/warped/${id}_$SUF.png $S/raw/border_${id}_$SUF.png $V/final/${id}_$SUF.png && echo "done $id" ) &
  i=$((i+1)); if (( i % 5 == 0 )); then wait; fi
done; wait
