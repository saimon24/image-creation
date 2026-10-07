#!/bin/zsh
# usage: draft_all.sh [suffix] [ids...]  -> low drafts of the theme valleys, 5 at a time
S=${ART_S:?}
V=/Users/ioannis/dev/ImageCreation/output/farm-map-v2/valleys
G=/Users/ioannis/dev/ImageCreation/output/farm-map-v2/_pipeline/gen.mjs
SUF=${1:-a}; shift
IDS=(${@:-$(ls $V/prompts | sed 's/\.txt$//')})
i=0
for id in $IDS; do
  ( node $G valley_${id}_$SUF 1024x1536 low $V/prompts/$id.txt $V/guides/$id.png $V/style_ref_sunrise.png \
      && cp $S/raw/valley_${id}_$SUF.png $V/drafts/${id}_$SUF.png ) &
  i=$((i+1)); if (( i % 5 == 0 )); then wait; fi
done
wait
