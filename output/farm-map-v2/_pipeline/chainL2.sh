#!/bin/bash
# Level 2 of the newer buildings, each chained off its own approved level 1; the original workshop L2 shows the step size and style
cd "$(dirname "$0")"
for b in "$@"; do node gen.mjs l2_$b 1024x1024 low prompts/l2/$b.txt refs/l1v2/$b.png refs/orig_workshop_2.png || node gen.mjs l2_$b 1024x1024 low prompts/l2/$b.txt refs/l1v2/$b.png refs/orig_workshop_2.png; done
