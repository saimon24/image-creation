#!/bin/bash
# Level 5 (max) of the newer buildings, chained off their approved level 4; the original coin barn L5 shows the grand max-level look
cd "$(dirname "$0")"
for b in "$@"; do node gen.mjs l5_$b 1024x1024 low prompts/l5/$b.txt refs/l4/$b.png refs/orig_coin_barn_5.png || node gen.mjs l5_$b 1024x1024 low prompts/l5/$b.txt refs/l4/$b.png refs/orig_coin_barn_5.png; done
