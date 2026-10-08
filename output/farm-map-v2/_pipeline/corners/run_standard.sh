#!/bin/zsh
# usage: run_standard.sh [project_state ...] -> low edit of each STANDARD corner sprite into the
# theme-pipeline style, matched to the standard valley painting (world_sunrise, valleys/style_ref_sunrise.png).
# mine/tree/forge start from refs/<proj>_<state>.png; the dock from refs_dock/standard/<state>.png (pondless).
# Keyed to 512 in corners/keyed_standard/<project>/<state>.png (outside keyed/, so install.mjs skips it).
S=${ART_S:?}; P=${0:A:h}; O=/Users/ioannis/dev/ImageCreation/output/farm-map-v2/corners
REF=/Users/ioannis/dev/ImageCreation/output/farm-map-v2/valleys/style_ref_sunrise.png
ITEMS=(${@:-$(for p in mine dock tree forge; do for s in stage0 stage1 stage2 stage3 level1 level2 level3 level4 level5; do echo ${p}_$s; done; done)})
mkdir -p $P/prompts_standard
i=0
for it in $ITEMS; do
  proj=${it%%_*}; state=${it#*_}
  if [[ $proj == dock ]]; then src=$P/refs_dock/standard/$state.png
    extra="It is a wooden fishing jetty WITHOUT water: posts, planks, hut, ropes, nets, crates and boats only. Keep it without water — no pond, no water, no shoreline, no ground or grass under it; the posts simply end and the boats float on the magenta. The water will be painted into the map underneath it."
  else src=$P/refs/$it.png; extra="Keep its own base (the patch of ground, rocks or roots it stands on) exactly as in image 1."; fi
  cat > $P/prompts_standard/$it.txt <<P2
Image 1 is a game sprite (a corner landmark of a farm map) on a flat magenta background. Image 2 is the painted farm valley this sprite stands on (the standard valley, warm early-morning sunrise light). Repaint THIS EXACT SPRITE so it sits naturally in image 2: match image 2's palette, colour temperature, warm sunrise light and painting style.
Keep exactly: the same object, the same materials and colours family (natural wood, grey stone, red roof tiles, green leaves stay what they are), the same silhouette and outline, the same size and position in the frame, the same camera angle, the same construction state (if it is a ruin or a half-built stage, it stays exactly that ruined or half-built), the same level of detail. Do not add or remove parts. $extra
Same stylised painted mobile-game art style: chunky painted forms, crisp edges with a thin dark keyline, light from the upper left. Clean painted edges all round — no soft glow, haze or white vignette fading out at the edges. Not photoreal.
Background: perfectly flat solid pure magenta #FF00FF everywhere, nothing behind the sprite, no ground beyond the sprite's own base, no cast shadow on the background, NO white or cream sticker outline, no text.
P2
  ( mkdir -p $O/keyed_standard/$proj && node $P/../gen.mjs corner_standard_$it 1024x1024 low $P/prompts_standard/$it.txt $src $REF > /dev/null \
    && node $P/../keynative.mjs $S/raw/corner_standard_$it.png $O/keyed_standard/$proj/$state.png 512 > /dev/null && echo "ok standard $it" || echo "FAIL $it" ) &
  i=$((i+1)); if (( i % 6 == 0 )); then wait; fi
done; wait
