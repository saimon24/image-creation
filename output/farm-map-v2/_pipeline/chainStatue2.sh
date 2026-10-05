#!/bin/bash
# Statue L6-20 (v2): each level chained off the previous one; the original L5 stays as the style anchor
cd "$(dirname "$0")"; S=$1
for l in $(seq 6 20); do p=$((l-1))
  if [ $l -gt 6 ]; then node ref.mjs $S/raw/statue2_$p.png refs/statue2_prev_$p.png 512 keep >/dev/null; fi
  node gen.mjs statue2_$l 1024x1024 low prompts/statue2/statue_$l.txt refs/statue2_prev_$p.png refs/statue2_prev_5.png || node gen.mjs statue2_$l 1024x1024 low prompts/statue2/statue_$l.txt refs/statue2_prev_$p.png refs/statue2_prev_5.png || exit 1
done
