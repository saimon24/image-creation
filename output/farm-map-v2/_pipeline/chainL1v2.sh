#!/bin/bash
# Level-1 v2: newer buildings in the originals' painted style; refs = three original L1 sprites
cd "$(dirname "$0")"
for b in "$@"; do node gen.mjs l1v2_$b 1024x1024 low prompts/l1v2/$b.txt refs/orig_coin_barn_1.png refs/orig_workshop_1.png refs/orig_explorer_lodge_1.png || node gen.mjs l1v2_$b 1024x1024 low prompts/l1v2/$b.txt refs/orig_coin_barn_1.png refs/orig_workshop_1.png refs/orig_explorer_lodge_1.png; done
