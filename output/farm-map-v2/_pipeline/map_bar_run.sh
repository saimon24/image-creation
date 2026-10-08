#!/bin/bash
S=/private/tmp/claude-501/-Users-ioannis/5237cb9c-a9a5-438a-8456-6898a500e970/scratchpad/art; export ART_S=$S
G=/Users/ioannis/dev/ImageCreation/output/farm-map-v2/_pipeline/gen.mjs
R="$S/refs/farm_home.png $S/refs/friends.png $S/refs/request_help.png"
for n in "$@"; do node $G $n 1024x1024 low $S/prompts/$n.txt $R & done; wait
