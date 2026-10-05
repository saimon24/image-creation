#!/bin/bash
# statue L6->L20, each chained off the previous level, original L5 as style anchor
cd "$(dirname "$0")"; S=/private/tmp/claude-501/-Users-ioannis/25e0206e-1d37-4654-918c-dd27c9cff241/scratchpad/art
cp refs/statue_5.png refs/statue_prev_5.png
for l in $(seq 6 20); do p=$((l-1))
  if [ $l -gt 6 ]; then node ref.mjs $S/raw/statue_$p.png refs/statue_prev_$p.png 640 keep >/dev/null; fi
  node gen.mjs statue_$l 1024x1024 low prompts/statue_$l.txt refs/statue_prev_$p.png refs/statue_5.png || exit 1; done
echo CHAIN_B_DONE
