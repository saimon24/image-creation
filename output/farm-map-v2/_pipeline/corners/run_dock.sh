#!/bin/zsh
# usage: run_dock.sh <theme|standard> -> the dock's 9 states WITHOUT their own pond: only the jetty
# (posts, planks, hut, boats) on magenta, keyed to corners/keyed_dock/<theme>/<state>.png
S=${ART_S:?}; P=${0:A:h}; O=/Users/ioannis/dev/ImageCreation/output/farm-map-v2/corners
theme=$1; mkdir -p $O/keyed_dock/$theme $P/prompts_dock/$theme $P/refs_dock/$theme
i=0
for state in stage0 stage1 stage2 stage3 level1 level2 level3 level4 level5; do
  if [[ $theme == standard ]]; then src=$P/refs/dock_$state.png; else
    node -e "require('/Users/ioannis/dev/ImageCreation/node_modules/sharp')('$O/keyed/$theme/dock/$state.png').resize(1024,1024).flatten({background:'#ff00ff'}).png().toFile('$P/refs_dock/$theme/$state.png')"; src=$P/refs_dock/$theme/$state.png; fi
  cat > $P/prompts_dock/$theme/$state.txt <<P2
Image 1 is a game sprite of a fishing jetty that stands in its own little pond. Repaint THIS EXACT SPRITE without the pond: remove ALL the water, the pond, its shoreline, rocks, reeds, grass and the ground/island it sits on, and paint all of that as perfectly flat solid pure magenta #FF00FF. Keep ONLY the built things exactly as they are — the wooden posts and planks of the jetty, the hut, ropes, nets, crates, lanterns and the boats (boats stay where they are, simply floating on the magenta). Same size, same position in the frame, same camera angle, same construction state, same colours and style. The jetty's posts simply end where the water was. No new objects, no shadow on the background, NO white or cream sticker outline, no text.
P2
  ( node $P/../gen.mjs dockdry_${theme}_$state 1024x1024 low $P/prompts_dock/$theme/$state.txt $src > /dev/null \
    && node $P/../keynative.mjs $S/raw/dockdry_${theme}_$state.png $O/keyed_dock/$theme/$state.png 512 > /dev/null && echo "ok $theme $state" ) &
  i=$((i+1)); if (( i % 5 == 0 )); then wait; fi
done; wait
