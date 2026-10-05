#!/bin/bash
# High-quality finals of owner-approved drafts: each sprite is an edit of its own approved draft (1 ref) so the design can't drift
cd "$(dirname "$0")"
for b in "$@"; do for l in 1 2 3 4 5; do
  [ -f "$ART_S/raw/final_${b}_$l.png" ] && continue
  APPROVED_HIGH=1 node gen.mjs final_${b}_$l 1024x1024 high prompts/final/rerender.txt refs/draftraw/${b}_$l.png || APPROVED_HIGH=1 node gen.mjs final_${b}_$l 1024x1024 high prompts/final/rerender.txt refs/draftraw/${b}_$l.png
done; done
