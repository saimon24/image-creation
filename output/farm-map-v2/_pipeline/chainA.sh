#!/bin/bash
# pads, then hay barn L1->L5 (each level chained off the previous)
cd "$(dirname "$0")"; S=/private/tmp/claude-501/-Users-ioannis/25e0206e-1d37-4654-918c-dd27c9cff241/scratchpad/art
node gen.mjs pad_front-right 1024x1024 low prompts/pad_front-right.txt refs/pad_ready.png refs/pad_a.png
node gen.mjs pad_back-right 1024x1024 low prompts/pad_back-right.txt refs/pad_ready.png refs/pad_a.png
node gen.mjs haybarn_1 1024x1024 low prompts/haybarn_1.txt refs/dairy_1.png refs/coinbarn_1.png || exit 1
for l in 2 3 4 5; do p=$((l-1)); node ref.mjs $S/raw/haybarn_$p.png refs/haybarn_$p.png 512 keep >/dev/null
  node gen.mjs haybarn_$l 1024x1024 low prompts/haybarn_$l.txt refs/haybarn_$p.png refs/dairy_5.png || exit 1; done
echo CHAIN_A_DONE
