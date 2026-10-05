#!/bin/bash
# Level-1 set: every building with the bakery + workshop icons as style refs and the approved coin barn for scale/finish.
cd "$(dirname "$0")"
run(){ for b in "$@"; do node gen.mjs l1_$b 1024x1024 low prompts/l1/$b.txt refs/l1_coin_barn.png refs/icon/bakery.png refs/icon/workshop.png || node gen.mjs l1_$b 1024x1024 low prompts/l1/$b.txt refs/l1_coin_barn.png refs/icon/bakery.png refs/icon/workshop.png; done; }
run "$@"
