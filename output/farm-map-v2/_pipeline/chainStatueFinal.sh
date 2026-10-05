#!/bin/bash
# High-quality finals of the owner-approved Statue L6-L15 drafts (L15 = variant B): each an edit of its own draft (1 ref)
cd "$(dirname "$0")"
for l in "$@"; do [ -f "$ART_S/raw/final_statue_$l.png" ] && continue
  for try in 1 2 3; do APPROVED_HIGH=1 node gen.mjs final_statue_$l 1024x1024 high prompts/final/rerender_statue.txt refs/draftraw/statue_$l.png && break; sleep 5; done
done
