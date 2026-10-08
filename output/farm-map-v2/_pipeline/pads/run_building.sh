#!/bin/zsh
# usage: run_building.sh <building_id>
# For every level: paste onto the ring → low edit → key → normalize; then the construction image per
# level (L1 = new site, Ln = level n-1 under scaffolding). Output: pads/out/<id>/<n>.png, c<n>.png
S=${ART_S:?}; P=${0:A:h}; id=$1
B=/Users/ioannis/dev/TinyHarvest-farmmap/assets/images/farm-map/buildings/$id
O=$P/out/$id; mkdir -p $O/ref $O/keyed
FEET=$S/feet.txt
levels=($(awk -v id=$id '$1==id {print $2}' $FEET | sort -n))
gen() { for t in 1 2; do node $P/../gen.mjs "$@" > /dev/null && return 0; done; return 1; }
# levels (5 in parallel)
i=0
for n in $levels; do
  read cx foot <<< "$(awk -v id=$id -v n=$n '$1==id && $2==n {print $3, $4}' $FEET)"
  ( node $P/compose.mjs $B/$n.webp $cx $foot $O/ref/$n.png \
    && gen pad_${id}_$n 1024x1024 low $P/bld_prompt.txt $O/ref/$n.png \
    && node $P/../keynative.mjs $S/raw/pad_${id}_$n.png $O/keyed/$n.png 512 > /dev/null \
    && node $P/normalize.mjs $P/pilot/ring_keyed.png $O/keyed/$n.png $O/$n.png > /dev/null ) &
  i=$((i+1)); (( i % 5 == 0 )) && wait
done; wait
# construction images
i=0
for n in $levels; do
  if [[ $n == 1 ]]; then args=(pad_${id}_c1 1024x1024 low $P/new_prompt.txt $P/pilot/ring_ref.png)
  else p=$((n-1)); args=(pad_${id}_c$n 1024x1024 low $P/con_prompt.txt $S/raw/pad_${id}_$p.png); fi
  ( gen $args \
    && node $P/../keynative.mjs $S/raw/pad_${id}_c$n.png $O/keyed/c$n.png 512 > /dev/null \
    && node $P/normalize.mjs $P/pilot/ring_keyed.png $O/keyed/c$n.png $O/c$n.png > /dev/null ) &
  i=$((i+1)); (( i % 5 == 0 )) && wait
done; wait
echo "$id $(ls $O/*.png | wc -l | tr -d ' ') images"
