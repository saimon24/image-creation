#!/bin/zsh
# usage: run.sh <theme> [project_state ...]  -> low edit of each standard corner sprite into the theme,
# magenta keyed to 512 in corners/keyed/<theme>/<project>/<state>.png
S=${ART_S:?}; P=${0:A:h}; O=/Users/ioannis/dev/ImageCreation/output/farm-map-v2/corners
theme=$1; shift
ITEMS=(${@:-$(ls $P/refs | grep -v '^theme_' | sed 's/\.png$//')})
brief=$(node -e "console.log(JSON.parse(require('fs').readFileSync('$P/themes.json'))['$theme'])")
mkdir -p $O/keyed/$theme $P/prompts/$theme
i=0
for it in $ITEMS; do
  proj=${it%%_*}; state=${it#*_}
  cat > $P/prompts/$theme/$it.txt <<P2
Image 1 is a game sprite (a corner landmark of a farm map) on a flat magenta background. Repaint THIS EXACT SPRITE in the theme shown by image 2 — "$theme": $brief.
Keep exactly: the same object, the same silhouette and outline, the same size and position in the frame, the same camera angle, the same construction state (if it is a ruin or a half-built stage, it stays exactly that ruined or half-built), the same level of detail. Change only materials, colours and small decorations so it belongs in image 2's world; add at most 2–3 small theme accents, no new big parts.
Same stylised painted mobile-game art style as image 1: chunky painted forms, crisp edges with a thin dark keyline, light from the upper left. Not photoreal.
Background: perfectly flat solid pure magenta #FF00FF everywhere, nothing behind the sprite, no ground beyond the sprite's own base, no cast shadow on the background, NO white or cream sticker outline, no text.
P2
  ( mkdir -p $O/keyed/$theme/$proj && node $P/../gen.mjs corner_${theme}_$it 1024x1024 low $P/prompts/$theme/$it.txt $P/refs/$it.png $P/refs/theme_$theme.png > /dev/null \
    && node $P/../keynative.mjs $S/raw/corner_${theme}_$it.png $O/keyed/$theme/$proj/$state.png 512 > /dev/null && echo "ok $theme $it" ) &
  i=$((i+1)); if (( i % 6 == 0 )); then wait; fi
done; wait
