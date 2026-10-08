#!/bin/zsh
# usage: fill_building.sh <building_id> -> generates only the missing levels / construction images
S=${ART_S:?}; P=${0:A:h}; id=$1
B=/Users/ioannis/dev/TinyHarvest-farmmap/assets/images/farm-map/buildings/$id
O=$P/out/$id; mkdir -p $O/ref $O/keyed
levels=($(awk -v id=$id '$1==id {print $2}' $S/feet.txt | sort -n))
gen() { for t in 1 2 3; do node $P/../gen.mjs "$@" > /dev/null 2>$S/err_$1.txt && return 0; sleep 3; done; echo "FAILED $1: $(tail -c 300 $S/err_$1.txt)"; return 1; }
for n in $levels; do
  [[ -f $O/keyed/$n.png ]] && continue
  read cx foot <<< "$(awk -v id=$id -v n=$n '$1==id && $2==n {print $3, $4}' $S/feet.txt)"
  node $P/compose.mjs $B/$n.webp $cx $foot $O/ref/$n.png && gen pad_${id}_$n 1024x1024 low $P/bld_prompt.txt $O/ref/$n.png \
    && node $P/../keynative.mjs $S/raw/pad_${id}_$n.png $O/keyed/$n.png 512 > /dev/null &
done; wait
for n in $levels; do
  [[ -f $O/keyed/c$n.png ]] && continue
  if [[ $n == 1 ]]; then args=(pad_${id}_c1 1024x1024 low $P/new_prompt.txt $P/pilot/ring_ref.png)
  else p=$((n-1)); [[ -f $S/raw/pad_${id}_$p.png ]] || { echo "no base for $id c$n"; continue; }; args=(pad_${id}_c$n 1024x1024 low $P/con_prompt.txt $S/raw/pad_${id}_$p.png); fi
  gen $args && node $P/../keynative.mjs $S/raw/pad_${id}_c$n.png $O/keyed/c$n.png 512 > /dev/null &
done; wait
for f in $O/keyed/*.png; do node $P/normalize.mjs $P/pilot/ring_keyed.png $f $O/$(basename $f) > /dev/null; done
echo "$id $(ls $O/keyed/*.png | wc -l | tr -d ' ') keyed"
