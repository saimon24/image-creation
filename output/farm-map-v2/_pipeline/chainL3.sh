#!/bin/bash
# Level 3 of the newer buildings, chained off their approved level 2; the original workshop L3 shows the step size and style
cd "$(dirname "$0")"
for b in "$@"; do node gen.mjs l3_$b 1024x1024 low prompts/l3/$b.txt refs/l2/$b.png refs/orig_workshop_3.png || node gen.mjs l3_$b 1024x1024 low prompts/l3/$b.txt refs/l2/$b.png refs/orig_workshop_3.png; done
