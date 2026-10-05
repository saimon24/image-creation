#!/bin/bash
# Level 4 of the newer buildings, chained off their approved level 3; the original workshop L4 shows the step size and style
cd "$(dirname "$0")"
for b in "$@"; do node gen.mjs l4_$b 1024x1024 low prompts/l4/$b.txt refs/l3/$b.png refs/orig_workshop_4.png || node gen.mjs l4_$b 1024x1024 low prompts/l4/$b.txt refs/l3/$b.png refs/orig_workshop_4.png; done
