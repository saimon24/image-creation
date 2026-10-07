// Layout of every themed valley painting, in the 1024x1536 draft canvas
// (the shipped painting is 2048x3072: multiply by 2).
// Fixed in every theme: the 16 plot clearings and the 4 corner projects.
// Free per theme: water, paths, ground zones, landmarks, decorations.

// Plot ring centres (engine/farm-map-layout.ts SCENE_WORLD.plotRings mapped
// through scene {335,624,1434,1979} / 2).
export const PLOTS = {
  0: [281, 456], 1: [405, 490], 2: [687, 465], 12: [802, 412],
  13: [637, 620], 3: [405, 767], 4: [528, 740], 5: [654, 776], 14: [260, 842],
  15: [526, 981], 6: [284, 1049], 7: [402, 1084], 8: [713, 1084],
  9: [402, 1254], 10: [520, 1218], 11: [642, 1260],
};
export const PLOT_R = [58, 36];
// Standard decoration spots (engine/farm-map-deco-spots STANDARD_DECORATION_POINTS),
// fixed in every theme: their ground must stay free of water, paths and props.
const DECO_SCENE = {
  0: [0.89, 0.43], 1: [0.885, 0.555], 2: [0.495, 0.755], 3: [0.065, 0.395], 4: [0.25, 0.612],
  5: [0.17, 0.395], 6: [0.875, 0.175], 7: [0.115, 0.615], 8: [0.955, 0.605], 9: [0.74, 0.55],
  10: [0.8, 0.365], 11: [0.065, 0.83], 12: [0.2, 0.83], 13: [0.955, 0.168], 14: [0.93, 0.845],
};
export const DECOS = Object.fromEntries(
  Object.entries(DECO_SCENE).map(([k, [x, y]]) => [k, [Math.round(167.5 + x * 717), Math.round(312 + y * 989.5)]])
);
// Visible footprint of each corner sprite (foot at projects[id].y).
export const CORNERS = {
  mine: [240, 540, 385, 662],
  dock: [745, 540, 882, 642],
  tree: [175, 1170, 318, 1304],
  forge: [750, 1180, 878, 1304],
};

const P = (id) => PLOTS[id];

export const THEMES = {
  frosty_fields_bg: {
    name: 'Frosty Fields',
    ground: '#e8eef5',
    water: { lakes: [[880, 215, 230, 120], [915, 600, 45, 50]], rivers: [{ w: 46, pts: [[930, 300], [955, 450], [935, 590], [960, 760], [945, 1000], [965, 1250], [950, 1536]] }] },
    edges: [[12,2],[2,13],[13,4],[4,1],[1,0],[0,[0,380]],[4,3],[3,14],[14,6],[6,7],[7,15],[15,5],[5,8],[8,11],[11,10],[10,9]],
    zones: [],
    prompt: `Theme "Frosty Fields": a snowy winter valley. Ground = fresh deep snow, soft blue shadows; the clearings are trodden snow. Water = a frozen lake at the top right (white-blue ice with a dark open-water hole near its lower shore) feeding a dark icy-blue stream with snowy banks and ice-floe edges down the right side. Paths = packed-snow sledge trails with a few wooden marker posts. Trees = snow-laden pine trees, ONLY along the outer edges. Props, ONLY at these places and nowhere else (never between the clearings, never in the four corner areas): a small log cabin with a smoking chimney in the top-left corner (left 30%, top 12%); a snowman next to a sled at the far left edge (left 7%, 66-74% down); a short string of warm fairy lights hanging between two snowy pines along the top edge (middle, top 12%). Palette: white, ice blue, pine green, warm pink-gold sunrise highlights.`,
  },
  golden_meadow_bg: {
    name: 'Golden Meadow',
    ground: '#d9b85a',
    water: { lakes: [[925, 600, 60, 55]], rivers: [{ w: 34, pts: [[0, 300], [150, 250], [320, 260], [480, 320], [640, 335], [800, 300], [900, 330], [950, 450], [930, 560]] }] },
    edges: [[15,7],[[0,410],0],[0,1],[1,2],[2,12],[14,3],[3,4],[4,5],[6,7],[7,8],[9,10],[10,11],[1,3],[4,15],[15,10],[13,5],[8,[1024,1084]]],
    zones: [['#c99a2e', 'poly', [[20, 760], [150, 760], [150, 1000], [20, 1000]]]],
    prompt: `Theme "Golden Meadow": rolling golden summer grassland. Ground = tall golden-yellow grass with soft amber tones; the clearings are short-cut light straw-coloured grass. The darker golden rectangle in the guide is a ripe wheat field with neat rows. Water = a narrow clear blue creek that meanders along the top of the map from the left edge and runs down the right side into a round pond with reeds at the right-middle open area. Paths = straight farm dirt tracks; small wooden plank bridges where a track crosses the creek. Trees = a few round amber-leaved oaks ONLY along the outer edges. Props, ONLY at these places and nowhere else (never between the clearings, never in the four corner areas): a tall wooden windmill in the top-left corner (left 30%, top 12%); round hay bales and a scarecrow at the far left edge (left 7%, 66-74% down); a hay cart along the top edge (middle, top 12%). Palette: gold, amber, warm cream, bright sky-blue water.`,
  },
  misty_morning_bg: {
    name: 'Misty Morning',
    ground: '#9fc0a8',
    water: { lakes: [[1035, 680, 125, 400], [915, 600, 45, 45]], rivers: [{ w: 30, pts: [[1024, 60], [960, 150], [950, 240]] }] },
    edges: [[1,4],[4,5],[5,8],[8,11],[11,10],[10,9],[9,7],[7,6],[6,14],[14,3],[3,1],[0,1],[12,2],[2,13],[13,5],[4,15],[15,10]],
    zones: [],
    prompt: `Theme "Misty Morning": a calm lake district at dawn. Ground = soft dewy sage-green grass with silver-blue tints; the clearings are short pale moss-green grass. Water = a large still lake filling the right edge of the map from top to the lower middle, mirror-smooth with reed beds and lily pads along its shore, fed by a small waterfall over mossy rocks at the top right; the right-middle open area sits on the lake shore. Paths = flat grey stepping-stone trails winding in a ring. Trees = slender white birch trees ONLY along the outer edges. Props, ONLY at these places and nowhere else (never between the clearings, never in the four corner areas): a stone bench under a birch in the top-left corner (left 30%, top 12%); a small wooden rowing boat pulled up on the lake shore in the top-right corner (right 30%, top 12%); lavender bushes at the far left edge (left 7%, 66-74% down). Palette: sage green, misty teal, lavender, silver, pale gold sunrise glow.`,
  },
  bg_aurora_skies: {
    name: 'Aurora Skies',
    ground: '#6f9e8e',
    water: {
      lakes: [[512, 130, 560, 150]],
      rivers: [{ w: 34, pts: [[940, 250], [975, 380], [960, 510], [900, 600]] }],
    },
    edges: [[0,1],[1,4],[4,15],[15,10],[14,3],[3,4],[4,5],[6,7],[7,15],[15,8],[9,10],[10,11],[12,2],[2,13],[13,5]],
    zones: [['#e6eef0', 'ellipse', [100, 760, 90, 60]], ['#e6eef0', 'ellipse', [930, 1000, 90, 70]]],
    prompt: `Theme "Aurora Skies": a northern tundra valley at first light. Ground = teal-green tundra moss with patches of old snow (the pale blobs in the guide); the clearings are flat pale moss. Water = a wide glacial lake across the whole top of the map reflecting green and violet aurora ribbons that still glow faintly in the dawn sky above it, and a clear turquoise glacier stream running from the lake down to the right-middle open area. Paths = raised wooden boardwalks with straight segments and right-angle turns; short bridges over the stream. Trees = dark spruces ONLY along the outer edges. Props, ONLY at these places and nowhere else (never between the clearings, never in the four corner areas): a cluster of glowing ice-blue crystals in the top-right corner (right 30%, top 12%); a small round hide tent with a lantern in the top-left corner (left 30%, top 12%); a few smooth rune stones at the far left edge (left 7%, 66-74% down). Palette: teal, deep spruce green, aurora green and violet, ice blue, warm peach sunrise highlights.`,
  },
  spring_bloom_bg: {
    name: 'Spring Bloom',
    ground: '#7cc95a',
    water: { lakes: [[915, 600, 50, 45]], rivers: [{ w: 34, pts: [[0, 330], [960, 330]] }, { w: 34, pts: [[960, 0], [960, 1536]] }, { w: 34, pts: [[0, 1350], [960, 1350]] }] },
    edges: [[1,4],[[530,0],4],[4,15],[15,10],[10,[530,1536]],[0,1],[1,2],[2,12],[14,3],[3,4],[4,5],[5,13],[6,7],[7,15],[15,8],[9,10],[10,11]],
    zones: [['#e8536b', 'poly', [[20, 400], [140, 400], [140, 520], [20, 520]]], ['#f2c94c', 'poly', [[20, 950], [150, 950], [150, 1060], [20, 1060]]], ['#c86dd7', 'poly', [[300, 220], [520, 220], [520, 295], [300, 295]]], ['#ff8c42', 'poly', [[600, 220], [860, 220], [860, 295], [600, 295]]]],
    prompt: `Theme "Spring Bloom": Dutch-style spring tulip country. Ground = bright fresh spring grass; the clearings are short bright lawn. The coloured rectangles in the guide are tulip fields in tidy stripes of their colour (red, yellow, purple, orange). Water = straight narrow canals with neat stone edges: one straight across the top of the map, one straight across the bottom, one straight down the right side joining them, with a small square harbour basin by the right-middle open area. Paths = straight red-brick lanes; small white wooden lift bridges where a lane crosses a canal. Trees = round blossoming fruit trees and neat hedges ONLY along the outer edges. Props, ONLY at these places and nowhere else (never between the clearings, never in the four corner areas): a classic Dutch windmill with white sails in the top-left corner (left 30%, top 12%); a small flower cart with tulip crates along the top edge (middle, top 12%); a short garland of colourful paper flowers between two posts at the far left edge (left 7%, 66-74% down). Palette: fresh green, tulip red/yellow/purple/orange, white, canal blue.`,
  },
  blossom_festival_bg: {
    name: 'Blossom Festival',
    ground: '#9cc77a',
    water: { lakes: [[985, 650, 90, 150]], rivers: [{ w: 30, pts: [[900, 0], [950, 200], [965, 400], [975, 520]] }] },
    edges: [[[0,560],0],[0,1],[1,4],[4,15],[15,10],[10,9],[9,7],[7,6],[6,14],[14,3],[3,4],[4,13],[13,2],[2,12],[15,8],[8,11],[5,4]],
    zones: [['#9a9a9a', 'ellipse', [526, 860, 110, 50]]],
    prompt: `Theme "Blossom Festival": a spring lantern festival in a Japanese-style blossom garden. Ground = soft green moss lawn dusted with pink cherry petals; the clearings are flat pale raked-gravel squares. The grey oval in the middle of the guide is a GREY raked gravel garden (grey, not cream) with two smooth stones. Water = a long clear koi pond with orange koi and water lilies along the right edge beside the right-middle open area, fed by a small stream from the top right; a red arched wooden bridge where a path crosses the stream. Paths = pale gravel paths edged with stones. Trees = big pink cherry blossom trees ONLY along the outer edges. Props, ONLY at these places and nowhere else (never between the clearings, never in the four corner areas): a red torii gate along the top edge (middle, top 12%); two stone lanterns in the top-right corner (right 30%, top 12%); strings of round red and cream paper lanterns hanging between cherry trees in the top-left corner (left 30%, top 12%); a festival banner on a pole at the far left edge (left 7%, 66-74% down). Palette: cherry pink, moss green, vermilion red, cream, soft gold.`,
  },
  verdant_valley_bg: {
    name: 'Verdant Valley',
    ground: '#3f9a52',
    water: { lakes: [[150, 170, 110, 70], [920, 600, 50, 50]], rivers: [{ w: 40, pts: [[150, 230], [90, 400], [75, 600], [85, 800], [75, 1000], [85, 1200], [120, 1400], [320, 1430], [520, 1410], [720, 1430], [900, 1410], [955, 1250], [960, 1000], [950, 800], [940, 680], [920, 600], [1024, 520]] }] },
    edges: [[0,1],[1,2],[2,12],[1,4],[4,13],[3,4],[4,5],[14,3],[4,15],[15,10],[6,7],[7,15],[15,8],[9,10],[10,11],[5,8]],
    zones: [],
    prompt: `Theme "Verdant Valley": a lush, wild jungle valley. Ground = deep emerald grass with mossy patches; the clearings are flat short bright-green grass. Water = a waterfall tumbling off a mossy rock ledge into a pool at the top-left, then a jungle river with mossy boulders running down the whole left edge, along the bottom of the map and up the whole right edge into a small pool at the right-middle open area before leaving at the right edge — the river frames the valley. Paths = wooden plank walkways and mossy stone steps; a rope-and-plank bridge where a path crosses the river. Trees = huge broad-leaf tropical trees, giant ferns and hanging vines ONLY along the outer edges. Props, ONLY at these places and nowhere else (never between the clearings, never in the four corner areas): a moss-covered stone ruin arch in the top-right corner (right 30%, top 12%); a cluster of giant colourful flowers along the top edge (middle, top 12%); a vine garland with flowers between two trees in the top-left corner (left 30%, top 12%). Palette: emerald, jade, deep green, turquoise water, splashes of tropical flower colour, golden sunrise light.`,
  },
  honey_hollow_bg: {
    name: 'Honey Hollow',
    ground: '#b8c45a',
    water: { lakes: [[520, 612, 45, 38], [915, 600, 50, 45]], rivers: [{ w: 28, pts: [[555, 592], [578, 556], [640, 543], [760, 545], [880, 575]] }, { w: 28, pts: [[525, 575], [545, 450], [540, 300], [560, 0]] }] },
    edges: [[4,15],[0,1],[1,4],[4,5],[5,13],[13,2],[2,12],[3,4],[14,3],[6,7],[7,15],[15,8],[15,10],[9,10],[10,11],[11,[1024,1320]]],
    zones: [['#9b7fd1', 'poly', [[20, 300], [170, 300], [170, 400], [20, 400]]], ['#f2c230', 'poly', [[20, 1000], [150, 1000], [150, 1200], [20, 1200]]]],
    prompt: `Theme "Honey Hollow": a warm honey farm in high summer. Ground = warm yellow-green meadow with clover; the clearings are flat light-amber packed earth. The violet block in the guide is a lavender field in rows, the yellow block a sunflower patch. Water = a small round pond with lily pads in the upper middle of the map (between the clearings), a slow golden-tinted brook coming down from the top edge into it, and another brook flowing from it to a second little pond at the right-middle open area; tiny wooden footbridges where paths cross. Paths = paths paved with hexagonal honeycomb-shaped golden stone tiles. Trees = round linden trees ONLY along the outer edges. Props, ONLY at these places and nowhere else (never between the clearings, never in the four corner areas): a row of three straw skep beehives on a bench in the top-right corner (right 30%, top 12%); a honey stall with jars along the top edge (middle, top 12%); bee-striped bunting between two posts in the top-left corner (left 30%, top 12%). Palette: honey gold, amber, clover green, lavender violet, sunflower yellow.`,
  },
  sunny_shores_bg: {
    name: 'Sunny Shores',
    ground: '#f0d896',
    water: { lakes: [[1115, 768, 190, 800], [885, 600, 70, 50]], rivers: [] },
    edges: [[[526,0],1],[1,4],[4,15],[15,10],[10,[526,1536]],[0,1],[1,2],[2,12],[14,3],[3,4],[4,5],[5,13],[6,7],[7,15],[15,8],[9,10],[10,11]],
    zones: [['#8fc66a', 'ellipse', [80, 800, 75, 200]]],
    prompt: `Theme "Sunny Shores": a tropical beach farm. Ground = warm golden sand with soft ripples; the green blob in the guide is a grassy dune patch with beach grass; the clearings are flat firm pale sand. Water = turquoise sea along the whole right edge of the map with gentle white surf lines on the beach, and a shallow sheltered lagoon cove at the right-middle open area. Paths = sun-bleached wooden boardwalks over the sand. Trees = leaning coconut palms ONLY along the outer edges. Props, ONLY at these places and nowhere else (never between the clearings, never in the four corner areas): a small straw beach hut in the top-left corner (left 30%, top 12%); a striped beach umbrella and deck chair along the top edge (middle, top 12%); a rope garland of colourful pennant flags between two palms in the top-right corner (right 30%, top 12%); a surfboard stuck in the sand at the far left edge (left 7%, 66-74% down). Palette: sand gold, turquoise, coral, palm green, white surf.`,
  },
  harvest_fair_bg: {
    name: 'Harvest Fair',
    ground: '#a9b356',
    water: {
      lakes: [[930, 600, 80, 60]],
      rivers: [{ w: 30, pts: [[950, 520], [980, 380], [960, 220], [990, 0]] }],
    },
    edges: [[5,8],[7,15],[[0,1000],14],[14,15],[15,[1024,960]],[0,1],[1,4],[4,15],[15,10],[12,2],[2,13],[13,4],[3,4],[4,5],[6,7],[7,9],[8,11],[11,10]],
    zones: [],
    prompt: `Theme "Harvest Fair": a festive autumn county fair. Ground = autumn grass in olive and ochre; the clearings are flat trampled light-brown earth. Water = a round mill pond at the right-middle open area with ducks, fed by a creek from the top edge; a small wooden water wheel at the creek bank. Paths = wide dirt lanes with straw on the edges; wooden bridges over the creek. Trees = orange and red autumn maples ONLY along the outer edges. Props, ONLY at these places and nowhere else (never between the clearings, never in the four corner areas): a small Ferris wheel in the top-left corner (left 30%, top 12%); two red-and-white striped fair tents in the top-right corner (right 30%, top 12%); long strings of colourful triangular bunting between poles along the top edge (middle, top 12%); prize pumpkins with ribbons at the far left edge (left 7%, 66-74% down). Palette: ochre, pumpkin orange, barn red, olive, cream white.`,
  },
  golden_grove_bg: {
    name: 'Golden Grove',
    ground: '#c7a046',
    water: {
      lakes: [[905, 590, 85, 60]],
      rivers: [{ w: 36, pts: [[0, 330], [150, 345], [330, 335], [520, 345], [700, 338], [880, 350], [940, 460], [905, 590]] }],
    },
    edges: [[[526,0],1],[0,1],[1,4],[4,13],[13,2],[2,12],[14,3],[3,4],[4,5],[5,8],[8,11],[4,15],[15,10],[10,9],[9,7],[7,6],[15,8]],
    zones: [['#b5552e', 'ellipse', [80, 800, 70, 180]]],
    prompt: `Theme "Golden Grove": an autumn apple orchard. Ground = grass carpeted with golden fallen leaves; the clearings are flat raked light-earth patches. The red-brown blob in the guide is a row of small apple trees heavy with red apples. Water = a clear rocky stream in a shallow stone gorge with small cascades, crossing the top of the map from the left edge and turning down into a small pool at the right-middle open area; a stone arch bridge where the main path crosses it. Paths = mossy cobblestone paths. Trees = tall golden-leaved birches and aspens ONLY along the outer edges. Props, ONLY at these places and nowhere else (never between the clearings, never in the four corner areas): a wooden cider press with stacked barrels along the top edge (middle, top 12%); a ladder against an apple tree in the top-right corner (right 30%, top 12%); baskets of red apples in the top-left corner (left 30%, top 12%). Palette: gold, amber, apple red, warm brown, moss green.`,
  },
  pumpkin_moon_bg: {
    name: 'Pumpkin Moon',
    ground: '#7a7a4a',
    water: { lakes: [[915, 600, 50, 50]], rivers: [{ w: 30, pts: [[0, 1335], [200, 1350], [400, 1340], [600, 1355], [800, 1345], [955, 1320], [960, 1000], [950, 760], [940, 600], [960, 400], [940, 0]] }] },
    edges: [[12,2],[2,1],[1,0],[1,3],[3,4],[4,13],[4,5],[5,8],[14,6],[6,7],[7,15],[15,4],[9,10],[10,11],[15,10]],
    zones: [['#d07a2a', 'ellipse', [80, 760, 70, 160]]],
    prompt: `Theme "Pumpkin Moon": an autumn pumpkin patch at dawn, a big pale full moon still hanging low in the purple-pink dawn sky reflected in the creek. Ground = dusky olive autumn grass with fallen orange leaves; the orange blob in the guide is a pumpkin patch with big orange pumpkins on curling vines; the clearings are flat dark-brown tilled earth. Water = a slow violet-blue creek crossing the very bottom of the map and flowing up the whole right side past the right-middle open area to the top; crooked little wooden footbridges. Paths = winding dirt paths lined with crooked wooden fence posts. Trees = gnarled oaks with orange leaves ONLY along the outer edges. Props, ONLY at these places and nowhere else (never between the clearings, never in the four corner areas): two scarecrows in the top-left corner (left 30%, top 12%); tied corn stooks along the top edge (middle, top 12%); a few carved jack-o-lanterns glowing softly at the far left edge (left 7%, 66-74% down). Palette: pumpkin orange, plum violet, olive, warm brown, pale moon cream.`,
  },
  oktoberfest_festival_meadow_bg: {
    name: 'Festival Meadow',
    ground: '#8cc063',
    water: { lakes: [[920, 600, 50, 50]], rivers: [{ w: 34, pts: [[1024, 40], [920, 160], [960, 330], [940, 470], [920, 600], [1024, 700]] }] },
    edges: [[[0,700],14],[14,3],[3,4],[4,5],[5,8],[0,1],[1,4],[12,2],[2,13],[13,4],[4,15],[15,7],[7,6],[15,10],[10,9],[10,11]],
    zones: [],
    prompt: `Theme "Festival Meadow": a Bavarian Oktoberfest alpine meadow. Ground = lush alpine meadow with tiny white and blue flowers; the clearings are flat light gravel. Water = a clear fast mountain stream with grey pebbles coming down from the top right past the right-middle open area (a small pool there). Paths = light gravel lanes; small wooden bridges over the stream. Trees = dark green firs ONLY along the outer edges; distant snowy alpine peaks just visible along the very top edge. Props, ONLY at these places and nowhere else (never between the clearings, never in the four corner areas): a big white festival beer tent with a blue-and-white roof along the top edge (middle, top 12%); a pretzel stand in the top-left corner (left 30%, top 12%); a tall blue-and-white striped maypole with a wreath in the top-right corner (right 30%, top 12%); wooden beer benches and barrels at the far left edge (left 7%, 66-74% down). Palette: alpine green, Bavarian blue, white, warm wood, pretzel brown.`,
  },
  halloween_haunted_hollow_bg: {
    name: 'Haunted Hollow',
    ground: '#5f6b5c',
    water: {
      lakes: [[512, 1450, 560, 110], [900, 600, 85, 55]],
      rivers: [{ w: 34, pts: [[960, 1380], [950, 1200], [970, 1000], [950, 800], [905, 600]] }],
    },
    edges: [[[526,0],1],[0,1],[1,2],[2,12],[1,3],[3,14],[14,6],[6,7],[7,9],[3,4],[4,5],[5,13],[4,15],[15,10],[10,11],[11,8],[8,5],[7,15]],
    zones: [['#8a8a96', 'ellipse', [80, 780, 70, 140]]],
    prompt: `Theme "Haunted Hollow": a friendly-spooky Halloween hollow (cute, not scary). Ground = grey-green dusky grass with purple tints; the clearings are flat dark-grey packed earth. The grey blob at the left is a tiny old graveyard with crooked cartoon headstones and a low wrought-iron fence. Water = a murky green-teal swamp with lily pads and cattails along the whole bottom edge, and a swampy channel running up the right side to a little pool at the right-middle open area. Paths = crooked old flagstone paths. Trees = twisted bare black trees with a few purple leaves ONLY along the outer edges. Props, ONLY at these places and nowhere else (never between the clearings, never in the four corner areas): a crooked little witch cottage in the top-left corner (left 30%, top 12%); a bubbling cauldron in the top-right corner (right 30%, top 12%); a garland of small bat and ghost paper cut-outs strung between two dead trees along the top edge (middle, top 12%); two carved glowing pumpkins at the far left edge (left 7%, 66-74% down). Palette: slate grey, mossy green, purple, pumpkin orange glow, sickly-cute teal.`,
  },
  halloween_candy_lane_bg: {
    name: 'Candy Lane',
    ground: '#f4c6dc',
    water: {
      lakes: [[905, 600, 85, 55]],
      rivers: [{ w: 40, pts: [[480, 0], [520, 160], [560, 300], [545, 420], [560, 520], [700, 548], [905, 600], [1024, 610]] }],
    },
    edges: [[[0,470],0],[0,1],[1,3],[3,4],[4,5],[5,13],[13,2],[2,12],[14,3],[4,15],[6,7],[7,15],[15,8],[9,10],[10,11],[7,9],[8,11]],
    zones: [['#b8e3c8', 'ellipse', [80, 800, 70, 150]]],
    prompt: `Theme "Candy Lane": a sweet Halloween candy land. Ground = soft pink frosting-like meadow with sprinkles; the mint blob is a patch of mint candy grass; the clearings are flat cream wafer-coloured ground. Water = a gently flowing river of strawberry milk (pink, creamy, with soft highlights) winding down from the top and out to the right, with a small pool at the right-middle open area; little chocolate-bar bridges where paths cross. Paths = paths of pastel candy tiles. Trees = lollipop trees and cotton-candy trees ONLY along the outer edges. Props, ONLY at these places and nowhere else (never between the clearings, never in the four corner areas): a little gingerbread house in the top-left corner (left 30%, top 12%); a giant candy-corn pile in the top-right corner (right 30%, top 12%); a garland of wrapped sweets strung between two lollipop trees along the top edge (middle, top 12%). Palette: candy pink, mint, lilac, cream, chocolate brown, candy-corn orange.`,
  },
};
