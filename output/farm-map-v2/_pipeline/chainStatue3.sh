#!/bin/bash
# Statue L10-20 (v3, compact, no water arcs): chained off v2 L9 and then each previous v3 level; original L5 as style anchor
cd "$(dirname "$0")"; S=$1
node ref.mjs $S/raw/statue2_9.png refs/statue3_prev_9.png 512 keep >/dev/null
for l in $(seq 10 20); do p=$((l-1))
  if [ $l -gt 10 ]; then node ref.mjs $S/raw/statue3_$p.png refs/statue3_prev_$p.png 512 keep >/dev/null; fi
  node gen.mjs statue3_$l 1024x1024 low prompts/statue3/statue_$l.txt refs/statue3_prev_$p.png refs/statue2_prev_5.png || node gen.mjs statue3_$l 1024x1024 low prompts/statue3/statue_$l.txt refs/statue3_prev_$p.png refs/statue2_prev_5.png || exit 1
done
