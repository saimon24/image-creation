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
    water: {
      lakes: [[880, 215, 230, 120]],
      rivers: [{ w: 46, pts: [[930, 300], [955, 450], [930, 590], [960, 760], [940, 1000], [965, 1250], [950, 1536]] }],
    },
    paths: [[P(12), P(2), P(13), P(4), P(1), P(0), [0, 380]], [P(4), P(3), P(14), P(6), P(7), P(15), P(5), P(8), P(11), P(10), P(9)]],
    zones: [],
    prompt: `Theme "Frosty Fields": a snowy winter valley. Ground = fresh deep snow, soft blue shadows; the clearings are trodden snow. Water = a frozen lake at the top right (white-blue ice with a dark open-water hole near its lower shore) feeding a dark icy-blue stream with snowy banks and ice-floe edges down the right side. Paths = packed-snow sledge trails with a few wooden marker posts. Trees = snow-laden pine trees, ONLY along the outer edges. Landmarks in the margins only: a small log cabin with a smoking chimney in the top-left corner, a snowman next to a sled at the very bottom edge, centred, two warm glowing lamp posts beside paths. Decorations (on free snow away from clearings, paths and water): a short string of warm fairy lights hanging between two pine trees at the top edge, a pile of snowballs. Palette: white, ice blue, pine green, warm pink-gold sunrise highlights.`,
  },
  golden_meadow_bg: {
    name: 'Golden Meadow',
    ground: '#d9b85a',
    water: {
      lakes: [[905, 590, 120, 75]],
      rivers: [{ w: 34, pts: [[0, 700], [150, 690], [300, 685], [450, 690], [560, 680], [700, 665], [820, 630], [880, 600]] }],
    },
    paths: [[[0, 410], P(0), P(1), P(2), P(12)], [P(14), P(3), P(4), P(5)], [P(6), P(7), P(8)], [P(9), P(10), P(11)], [P(1), P(3)], [P(4), P(15), P(10)], [P(13), P(5)], [P(8), [1024, 1100]]],
    zones: [
      ['#c99a2e', 'poly', [[30, 880], [180, 880], [180, 1000], [30, 1000]]],
      ['#c99a2e', 'poly', [[800, 830], [1000, 830], [1000, 990], [800, 990]]],
    ],
    prompt: `Theme "Golden Meadow": rolling golden summer grassland. Ground = tall golden-yellow grass with soft amber tones; the clearings are short-cut light straw-coloured grass. The darker golden rectangles in the guide are ripe wheat fields with neat rows. Water = a narrow clear blue creek that enters at the left edge, crosses the middle of the map and ends in a round pond with reeds at the right (the right-middle open area sits on its shore). Paths = straight farm dirt tracks; small wooden plank bridges where a track crosses the creek. Trees = a few round amber-leaved oaks ONLY along the outer edges. Landmarks in the margins only: a tall wooden windmill in the top-left corner, round hay bales and a scarecrow at the bottom edge, centred between the two bottom corner areas. Decorations (free ground only): a short wooden split-rail fence along the wheat fields, a cart with hay. Palette: gold, amber, warm cream, bright sky-blue water.`,
  },
  misty_morning_bg: {
    name: 'Misty Morning',
    ground: '#9fc0a8',
    water: {
      lakes: [[1000, 600, 125, 420]],
      rivers: [{ w: 30, pts: [[1024, 60], [960, 150], [940, 230]] }],
    },
    paths: [[P(1), P(4), P(5), P(8), P(11), P(10), P(9), P(7), P(6), P(14), P(3), P(1)], [P(0), P(1)], [P(12), P(2), P(13), P(5)], [P(4), P(15), P(10)], [[526, 0], P(1)]],
    zones: [],
    prompt: `Theme "Misty Morning": a calm lake district at dawn. Ground = soft dewy sage-green grass with silver-blue tints; the clearings are short pale moss-green grass. Water = a large still lake filling the right edge of the map from top to the lower middle, mirror-smooth with reed beds and lily pads along its shore, fed by a small waterfall over mossy rocks at the top right; the right-middle open area sits on the lake shore. Paths = flat grey stepping-stone trails winding in a ring. Trees = slender white birch trees ONLY along the outer edges. Landmarks in the margins only: a small wooden rowing boat pulled up on the shore at the right shore, halfway down, a stone bench under a birch at the top-left. Decorations (free ground only): a few low soft mist pockets lying ONLY in the outer margins (never over clearings), lavender bushes. Palette: sage green, misty teal, lavender, silver, pale gold sunrise glow.`,
  },
  bg_aurora_skies: {
    name: 'Aurora Skies',
    ground: '#6f9e8e',
    water: {
      lakes: [[512, 130, 560, 150]],
      rivers: [{ w: 34, pts: [[900, 250], [945, 380], [910, 510], [870, 600]] }],
    },
    paths: [[P(0), P(1), [526, 520], P(4), P(15), P(10)], [P(14), P(3), P(4), P(5), [900, 776]], [P(6), P(7), P(15), P(8)], [P(9), P(10), P(11)], [P(12), P(2), P(13), P(5)]],
    zones: [['#e6eef0', 'ellipse', [100, 760, 90, 60]], ['#e6eef0', 'ellipse', [930, 1000, 90, 70]]],
    prompt: `Theme "Aurora Skies": a northern tundra valley at first light. Ground = teal-green tundra moss with patches of old snow (the pale blobs in the guide); the clearings are flat pale moss. Water = a wide glacial lake across the whole top of the map reflecting green and violet aurora ribbons that still glow faintly in the dawn sky above it, and a clear turquoise glacier stream running from the lake down to the right-middle open area. Paths = raised wooden boardwalks with straight segments and right-angle turns; short bridges over the stream. Trees = dark spruces ONLY along the outer edges. Landmarks in the margins only: a cluster of glowing ice-blue crystals at the very bottom edge, centred, a small round hide tent with a lantern at the very bottom edge, centred. Decorations (free ground only): a string of small glowing lanterns along one boardwalk, a few smooth rune stones. Palette: teal, deep spruce green, aurora green and violet, ice blue, warm peach sunrise highlights.`,
  },
  spring_bloom_bg: {
    name: 'Spring Bloom',
    ground: '#7cc95a',
    water: {
      lakes: [[905, 590, 95, 60]],
      rivers: [{ w: 34, pts: [[0, 905], [955, 905]] }, { w: 34, pts: [[955, 1536], [955, 905], [955, 0]] }],
    },
    paths: [[[526, 0], [526, 380], P(4), P(15), P(10), [526, 1536]], [[0, 600], P(0)], [P(0), P(1)], [P(2), P(12)], [P(1), [526, 380], P(2)], [P(14), P(3), P(4), P(5), P(13)], [P(6), P(7), P(15), P(8)], [P(9), P(10), P(11)]],
    zones: [
      ['#e8536b', 'poly', [[20, 300], [140, 300], [140, 380], [20, 380]]],
      ['#f2c94c', 'poly', [[20, 950], [180, 950], [180, 990], [20, 990]]],
      ['#c86dd7', 'poly', [[600, 930], [900, 930], [900, 965], [600, 965]]],
      ['#ff8c42', 'poly', [[780, 680], [920, 680], [920, 780], [780, 780]]],
    ],
    prompt: `Theme "Spring Bloom": Dutch-style spring tulip country. Ground = bright fresh spring grass; the clearings are short bright lawn. The coloured rectangles in the guide are tulip fields in tidy stripes of their colour (red, yellow, purple, orange). Water = two straight narrow canals with neat stone edges: one runs straight across the map, one straight down the right side, meeting at a small square harbour basin by the right-middle open area. Paths = straight red-brick lanes; small white wooden lift bridges where a lane crosses a canal. Trees = round blossoming fruit trees and neat hedges ONLY along the outer edges. Landmarks in the margins only: a classic Dutch windmill with white sails in the top-left corner, a small flower cart at the bottom edge, centred between the two bottom corner areas. Decorations (free ground only): a short garland of colourful paper flowers between two posts, wooden tulip crates. Palette: fresh green, tulip red/yellow/purple/orange, white, canal blue.`,
  },
  blossom_festival_bg: {
    name: 'Blossom Festival',
    ground: '#9cc77a',
    water: {
      lakes: [[880, 650, 140, 110]],
      rivers: [{ w: 30, pts: [[900, 0], [950, 200], [930, 380], [900, 560]] }],
    },
    paths: [[[0, 560], P(0), P(1), P(4), P(15), P(10), P(9), P(7), P(6), P(14), P(3), P(4)], [P(4), P(13), P(2), P(12)], [P(15), P(8), P(11)], [P(5), P(4)]],
    zones: [['#e9dcc4', 'ellipse', [526, 860, 110, 50]]],
    prompt: `Theme "Blossom Festival": a spring lantern festival in a Japanese-style blossom garden. Ground = soft green moss lawn dusted with pink cherry petals; the clearings are flat pale raked-gravel squares. The pale oval in the middle of the guide is a raked white gravel garden with two smooth stones. Water = a clear koi pond with orange koi, flat stepping stones and water lilies around the right-middle open area, fed by a small stream from the top right; a red arched wooden bridge where a path crosses the stream. Paths = pale gravel paths edged with stones. Trees = big pink cherry blossom trees ONLY along the outer edges. Landmarks in the margins only: a red torii gate at the top edge, two stone lanterns at the bottom edge, centred between the two bottom corner areas. Decorations (free ground only): strings of round red and cream paper lanterns hanging between cherry trees at the outer edges, festival banners on poles beside the main path. Palette: cherry pink, moss green, vermilion red, cream, soft gold.`,
  },
  verdant_valley_bg: {
    name: 'Verdant Valley',
    ground: '#3f9a52',
    water: {
      lakes: [[150, 170, 110, 70], [900, 600, 85, 55]],
      rivers: [{ w: 40, pts: [[150, 230], [110, 400], [100, 600], [130, 760], [160, 920], [300, 935], [470, 925], [640, 912], [800, 900], [930, 860], [960, 720], [905, 610], [1024, 520]] }],
    },
    paths: [[P(0), P(1), P(2), P(12)], [P(1), P(4), P(13)], [P(3), P(4), P(5)], [P(14), P(3)], [P(4), P(15), P(10)], [P(6), P(7), P(15), P(8)], [P(9), P(10), P(11)], [P(5), P(8)]],
    zones: [],
    prompt: `Theme "Verdant Valley": a lush, wild jungle valley. Ground = deep emerald grass with mossy patches; the clearings are flat short bright-green grass. Water = a waterfall tumbling off a mossy rock ledge into a pool at the top-left, then a winding jungle river with mossy boulders snaking down the left side, across the lower middle of the map and up into a small pool at the right-middle open area before leaving at the right edge. Paths = wooden plank walkways and mossy stone steps; a rope-and-plank bridge where a path crosses the river. Trees = huge broad-leaf tropical trees, giant ferns and hanging vines ONLY along the outer edges. Landmarks in the margins only: a moss-covered stone ruin arch at the top-right edge, a cluster of giant colourful flowers at the bottom edge, centred between the two bottom corner areas. Decorations (free ground only): a few big mossy boulders, a vine garland with flowers between two trees at the edge. Palette: emerald, jade, deep green, turquoise water, splashes of tropical flower colour, golden sunrise light.`,
  },
  honey_hollow_bg: {
    name: 'Honey Hollow',
    ground: '#b8c45a',
    water: {
      lakes: [[526, 875, 100, 42], [895, 615, 80, 55]],
      rivers: [{ w: 28, pts: [[620, 865], [720, 840], [810, 800], [880, 700], [890, 620]] }, { w: 28, pts: [[430, 885], [330, 930], [150, 960], [0, 965]] }],
    },
    paths: [[P(0), P(1), P(4), P(5), P(13), P(2), P(12)], [P(3), P(4)], [P(14), P(3)], [P(6), P(7), P(15), P(8)], [P(15), P(10)], [P(9), P(10), P(11)], [P(11), [1024, 1320]]],
    zones: [
      ['#9b7fd1', 'poly', [[20, 300], [170, 300], [170, 400], [20, 400]]],
      ['#f2c230', 'poly', [[820, 1010], [1000, 1010], [1000, 1110], [820, 1110]]],
    ],
    prompt: `Theme "Honey Hollow": a warm honey farm in high summer. Ground = warm yellow-green meadow with clover; the clearings are flat light-amber packed earth. The violet block in the guide is a lavender field in rows, the yellow block a sunflower patch. Water = a small round pond in the middle with lily pads, a slow golden-tinted brook flowing from it to a second little pond at the right-middle open area, and another brook from it out to the left edge; tiny wooden footbridges where paths cross. Paths = paths paved with hexagonal honeycomb-shaped golden stone tiles. Trees = round linden trees ONLY along the outer edges. Landmarks in the margins only: a row of three straw skep beehives on a bench at the top-right edge, a honey stall with jars at the bottom edge, centred between the two bottom corner areas. Decorations (free ground only): bee-striped bunting between two posts, honey pots. Palette: honey gold, amber, clover green, lavender violet, sunflower yellow.`,
  },
  sunny_shores_bg: {
    name: 'Sunny Shores',
    ground: '#f0d896',
    water: {
      lakes: [[1080, 768, 190, 800], [880, 600, 70, 50]],
      rivers: [],
    },
    paths: [[[526, 0], P(1), P(4), P(15), P(10), [526, 1536]], [P(0), P(1), P(2), P(12)], [P(14), P(3), P(4), P(5), P(13)], [P(6), P(7), P(15), P(8), [900, 1084]], [P(9), P(10), P(11)]],
    zones: [['#8fc66a', 'ellipse', [120, 720, 110, 180]], ['#8fc66a', 'ellipse', [560, 1400, 220, 90]]],
    prompt: `Theme "Sunny Shores": a tropical beach farm. Ground = warm golden sand with soft ripples; the green blobs in the guide are grassy dune patches with beach grass; the clearings are flat firm pale sand. Water = turquoise sea along the whole right edge of the map with gentle white surf lines on the beach, and a shallow sheltered lagoon cove at the right-middle open area. Paths = sun-bleached wooden boardwalks over the sand. Trees = leaning coconut palms ONLY along the outer edges. Landmarks in the margins only: a small straw beach hut at the top-left corner, a striped beach umbrella and deck chair at the bottom edge, centred between the two bottom corner areas. Decorations (free ground only): a rope garland of colourful pennant flags between two palms, a few big shells and a starfish, a surfboard stuck in the sand. Palette: sand gold, turquoise, coral, palm green, white surf.`,
  },
  harvest_fair_bg: {
    name: 'Harvest Fair',
    ground: '#a9b356',
    water: {
      lakes: [[900, 590, 110, 75]],
      rivers: [{ w: 30, pts: [[950, 520], [980, 380], [960, 220], [990, 0]] }],
    },
    paths: [[[0, 1000], P(14), P(15), [1024, 960]], [P(0), P(1), P(4), P(15), P(10)], [P(12), P(2), P(13), P(4)], [P(3), P(4), P(5)], [P(6), P(7), P(9)], [P(8), P(11), P(10)]],
    zones: [['#c98a3a', 'ellipse', [526, 1390, 260, 80]]],
    prompt: `Theme "Harvest Fair": a festive autumn county fair. Ground = autumn grass in olive and ochre; the clearings are flat trampled light-brown earth. The orange-brown oval at the bottom is the fair ground with straw on it. Water = a round mill pond at the right-middle open area with ducks, fed by a creek from the top edge; a small wooden water wheel at the creek bank. Paths = wide dirt lanes with straw on the edges; wooden bridges over the creek. Trees = orange and red autumn maples ONLY along the outer edges. Landmarks in the margins only: a small Ferris wheel at the top-left corner, two red-and-white striped fair tents at the bottom edge, centred between the two bottom corner areas. Decorations (free ground only): long strings of colourful triangular bunting crossing above the main lane between poles, prize pumpkins with ribbons, stacked hay bales. Palette: ochre, pumpkin orange, barn red, olive, cream white.`,
  },
  golden_grove_bg: {
    name: 'Golden Grove',
    ground: '#c7a046',
    water: {
      lakes: [[905, 590, 85, 60]],
      rivers: [{ w: 36, pts: [[0, 330], [150, 345], [330, 335], [520, 345], [700, 338], [880, 350], [940, 460], [905, 590]] }],
    },
    paths: [[[526, 0], [526, 330], P(1)], [P(0), P(1), P(4), P(13), P(2), P(12)], [P(14), P(3), P(4), P(5), P(8), P(11)], [P(4), P(15), P(10), P(9), P(7), P(6)], [P(15), P(8)]],
    zones: [['#b5552e', 'ellipse', [120, 760, 90, 140]], ['#b5552e', 'ellipse', [930, 980, 90, 140]]],
    prompt: `Theme "Golden Grove": an autumn apple orchard. Ground = grass carpeted with golden fallen leaves; the clearings are flat raked light-earth patches. The red-brown blobs in the guide are rows of small apple trees heavy with red apples. Water = a clear rocky stream in a shallow stone gorge with small cascades, crossing the top of the map from the left edge and turning down into a small pool at the right-middle open area; a stone arch bridge where the main path crosses it. Paths = mossy cobblestone paths. Trees = tall golden-leaved birches and aspens ONLY along the outer edges. Landmarks in the margins only: a wooden cider press with stacked barrels at the very bottom edge, centred, a ladder against an apple tree at the top-right. Decorations (free ground only): baskets of red apples, a garland of dried leaves and small apples between two posts. Palette: gold, amber, apple red, warm brown, moss green.`,
  },
  pumpkin_moon_bg: {
    name: 'Pumpkin Moon',
    ground: '#7a7a4a',
    water: {
      lakes: [[905, 600, 80, 55]],
      rivers: [{ w: 30, pts: [[0, 1135], [200, 1150], [360, 1158], [520, 1160], [690, 1158], [720, 1150], [960, 1110], [960, 860], [950, 680], [905, 600], [960, 400], [940, 0]] }],
    },
    paths: [[P(12), P(2), P(1), P(0)], [P(1), P(3), P(4), P(13)], [P(4), P(5), P(8)], [P(14), P(6), P(7), P(15), P(4)], [P(9), P(10), P(11)], [P(15), P(10)]],
    zones: [['#d07a2a', 'ellipse', [110, 690, 90, 110]], ['#d07a2a', 'ellipse', [526, 1430, 230, 70]]],
    prompt: `Theme "Pumpkin Moon": an autumn pumpkin patch at dawn, a big pale full moon still hanging low in the purple-pink dawn sky reflected in the creek. Ground = dusky olive autumn grass with fallen orange leaves; the orange blobs in the guide are pumpkin patches with big orange pumpkins on curling vines; the clearings are flat dark-brown tilled earth. Water = a slow violet-blue creek crossing the bottom of the map and flowing up the right side past the right-middle open area; crooked little wooden footbridges. Paths = winding dirt paths lined with crooked wooden fence posts. Trees = gnarled oaks with orange leaves ONLY along the outer edges. Landmarks in the margins only: two scarecrows at the top-left edge, tied corn stooks at the very bottom edge, centred. Decorations (free ground only): carved jack-o-lanterns glowing softly beside paths, a string of small lanterns on a fence. Palette: pumpkin orange, plum violet, olive, warm brown, pale moon cream.`,
  },
  oktoberfest_festival_meadow_bg: {
    name: 'Festival Meadow',
    ground: '#8cc063',
    water: {
      lakes: [[905, 600, 85, 55]],
      rivers: [{ w: 34, pts: [[1024, 40], [900, 160], [960, 330], [905, 470], [905, 600], [1024, 700]] }],
    },
    paths: [[[0, 700], P(14), P(3), P(4), P(5), P(8)], [P(0), P(1), P(4)], [P(12), P(2), P(13), P(4)], [P(4), P(15), P(7), P(6)], [P(15), P(10), P(9)], [P(10), P(11)]],
    zones: [['#d9d2bf', 'ellipse', [526, 860, 120, 55]]],
    prompt: `Theme "Festival Meadow": a Bavarian Oktoberfest alpine meadow. Ground = lush alpine meadow with tiny white and blue flowers; the clearings are flat light gravel. The pale oval in the middle is a gravel festival square with a tall blue-and-white striped maypole in its centre. Water = a clear fast mountain stream with grey pebbles coming down from the top right past the right-middle open area (a small pool there). Paths = light gravel lanes; small wooden bridges over the stream. Trees = dark green firs ONLY along the outer edges; distant snowy alpine peaks just visible along the very top edge. Landmarks in the margins only: a big white festival beer tent with a blue-and-white roof at the bottom edge, centred between the two bottom corner areas, a pretzel stand at the top-left edge. Decorations (free ground only): long strings of blue-and-white diamond-pattern bunting between poles beside the lanes, wooden beer benches, barrels. Palette: alpine green, Bavarian blue, white, warm wood, pretzel brown.`,
  },
  halloween_haunted_hollow_bg: {
    name: 'Haunted Hollow',
    ground: '#5f6b5c',
    water: {
      lakes: [[512, 1450, 560, 110], [900, 600, 85, 55]],
      rivers: [{ w: 34, pts: [[960, 1380], [950, 1200], [970, 1000], [950, 800], [905, 600]] }],
    },
    paths: [[[526, 0], P(1)], [P(0), P(1), P(2), P(12)], [P(1), P(3), P(14), P(6), P(7), P(9)], [P(3), P(4), P(5), P(13)], [P(4), P(15), P(10), P(11), P(8), P(5)], [P(7), P(15)]],
    zones: [['#8a8a96', 'ellipse', [110, 720, 90, 120]]],
    prompt: `Theme "Haunted Hollow": a friendly-spooky Halloween hollow (cute, not scary). Ground = grey-green dusky grass with purple tints; the clearings are flat dark-grey packed earth. The grey blob at the left is a tiny old graveyard with crooked cartoon headstones and a low wrought-iron fence. Water = a murky green-teal swamp with lily pads and cattails along the whole bottom edge, and a swampy channel running up the right side to a little pool at the right-middle open area. Paths = crooked old flagstone paths. Trees = twisted bare black trees with a few purple leaves ONLY along the outer edges. Landmarks in the margins only: a crooked little witch cottage at the top-left corner, a cauldron at the very bottom edge, centred. Decorations (free ground only): carved glowing pumpkins, a garland of small bat and ghost paper cut-outs strung between two dead trees, wisps of low purple mist ONLY in the outer margins. Palette: slate grey, mossy green, purple, pumpkin orange glow, sickly-cute teal.`,
  },
  halloween_candy_lane_bg: {
    name: 'Candy Lane',
    ground: '#f4c6dc',
    water: {
      lakes: [[905, 600, 85, 55]],
      rivers: [{ w: 40, pts: [[480, 0], [520, 160], [560, 300], [545, 420], [560, 520], [700, 548], [905, 600], [1024, 610]] }],
    },
    paths: [[[0, 470], P(0)], [P(0), P(1)], [P(1), P(3), P(4), P(5), P(13), P(2), P(12)], [P(14), P(3)], [P(4), P(15)], [P(6), P(7), P(15), P(8)], [P(9), P(10), P(11)], [P(7), P(9)], [P(8), P(11)]],
    zones: [['#b8e3c8', 'ellipse', [120, 800, 90, 120]], ['#c9b6f0', 'ellipse', [900, 960, 100, 110]]],
    prompt: `Theme "Candy Lane": a sweet Halloween candy land. Ground = soft pink frosting-like meadow with sprinkles; the mint and lilac blobs are patches of mint and lavender candy grass; the clearings are flat cream wafer-coloured ground. Water = a gently flowing river of strawberry milk (pink, creamy, with soft highlights) winding down from the top and out to the right, with a small pool at the right-middle open area; little chocolate-bar bridges where paths cross. Paths = paths of pastel candy tiles. Trees = lollipop trees and cotton-candy trees ONLY along the outer edges. Landmarks in the margins only: a little gingerbread house at the top-left corner, a giant candy-corn pile at the bottom edge, centred between the two bottom corner areas. Decorations (free ground only): candy-cane fences along the edges, gumdrop boulders, a garland of wrapped sweets strung between two lollipop trees. Palette: candy pink, mint, lilac, cream, chocolate brown, candy-corn orange.`,
  },
};
