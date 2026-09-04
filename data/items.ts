export interface ItemDefinition {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  description?: string;
  expectedPath: string;
}

export const CATEGORIES = {
  crops: 'Crops',
  'area-items': 'Area Items',
  crafts: 'Crafts',
  rare: 'Rare',
  'animal-products': 'Animal Products',
  misc: 'Misc',
  potions: 'Potions',
  upgrades: 'Upgrades',
  leaderboard: 'Leaderboard',
  buildings: 'Buildings',
  animals: 'Animals',
  airport: 'Airport',
  mastery: 'Mastery',
  tabs: 'Tabs',
  'events-boosts': 'Events & Boosts',
  tutorial: 'Tutorial',
  category: 'Category',
  'season-pass': 'Season Pass',
  avatar: 'Avatar',
  'avatar-border': 'Avatar Border',
  backgrounds: 'Backgrounds',
  coop: 'Coop',
  sanctuary: 'Sanctuary',
  cosmetics: 'Cosmetics',
  lake: 'Lake',
  valley: 'Valley',
  explorer: 'Explorer',
  shop: 'Shop',
  'special-events': 'Special Events',
  blacksmith: 'Blacksmith',
  'ambient-season': 'Ambient Season',
} as const;

export const CRAFT_SUBCATEGORIES = {
  feed_mill: 'Feed Mill',
  mill: 'Mill',
  bakery: 'Bakery',
  kitchen: 'Kitchen',
  breakfast_cart: 'Breakfast Cart',
  dairy: 'Dairy',
  smoker: 'Smoker',
  spinning_wheel: 'Spinning Wheel',
  cookhouse: 'Cookhouse',
  sugar_house: 'Sugar House',
  creamery: 'Creamery',
  jam_house: 'Jam House',
  workshop: 'Workshop',
  silk_atelier: 'Silk Atelier',
  loom: 'Loom',
  furnace: 'Furnace',
  oil_press: 'Oil Press',
  tea_house: 'Tea House',
  confectioner: 'Confectioner',
  seasonal: 'Seasonal',
  animal_products: 'Animal Products',
  premium: 'Premium',
  pickling_station: 'Pickling Station',
  apothecary: 'Apothecary',
  distillery: 'Distillery',
  glassworks: 'Glassworks',
  jewelry_atelier: 'Jewelry Atelier',
  clockmaker: 'Clockmaker',
  artisan_hall: 'Artisan Hall',
  plant_kitchen: 'Plant Kitchen',
} as const;

export const SPECIAL_EVENTS_SUBCATEGORIES = {
  easter: 'Easter',
  'firefly-festival': 'Firefly Festival',
} as const;

export const BLACKSMITH_SUBCATEGORIES = {
  tool_gear: 'Tool Gear',
  armor_gear: 'Armor Gear',
  accessory_gear: 'Accessory Gear',
  consumable: 'Consumable',
} as const;

export const AMBIENT_SEASON_SUBCATEGORIES = {
  winter: 'Winter (Dec–Feb)',
  spring: 'Spring (Mar–May)',
  summer: 'Summer (Jun–Aug)',
  autumn: 'Autumn (Sep–Nov)',
  'holiday-week': 'Holiday Week',
} as const;

export const SEASON_PASS_SUBCATEGORIES = {
  '2025-02-frosty-fields': 'February 2025 - Frosty Fields',
  '2025-03-spring-bloom': 'Mar 2025 - Spring Bloom',
  '2025-04-blossom-festival': 'Apr 2025 - Blossom Festival',
  '2026-05-verdant-valley': 'May 2026 - Verdant Valley',
  '2026-06-honey-hollow': 'June 2026 - Honey Hollow',
  '2026-07-sunny-shores': 'July 2026 - Sunny Shores',
  '2026-08-harvest-fair': 'Aug 2026 - Harvest Fair',
  '2026-09-golden-grove': 'Sep 2026 - Golden Grove',
} as const;

const BASE_ITEMS: ItemDefinition[] = [
  // === CROPS ===
  {
    id: 'wheat',
    name: 'Wheat',
    category: 'crops',
    expectedPath: 'crops/wheat.webp',
    description: 'Bundle of bright golden wheat stalks tied together, chunky cartoon style',
  },
  {
    id: 'carrot',
    name: 'Carrot',
    category: 'crops',
    expectedPath: 'crops/carrot.webp',
    description: 'Chubby bright orange carrot with bushy green leaf top, rounded cartoon shape',
  },
  {
    id: 'corn',
    name: 'Corn',
    category: 'crops',
    expectedPath: 'crops/corn.webp',
    description: 'Bright yellow corn cob with green husk pulled back, plump kernels, cartoon style',
  },
  {
    id: 'potato',
    name: 'Potato',
    category: 'crops',
    expectedPath: 'crops/potato.webp',
    description: 'Round brown potato with simple spots, chunky cartoon vegetable',
  },
  {
    id: 'pepper',
    name: 'Pepper',
    category: 'crops',
    expectedPath: 'crops/pepper.webp',
    description: 'Shiny red bell pepper with green stem, rounded blocky cartoon shape',
  },
  {
    id: 'rice',
    name: 'Rice',
    category: 'crops',
    expectedPath: 'crops/rice.webp',
    description: 'Small bundle of pale golden rice grains on green stalk, simple cartoon style',
  },
  {
    id: 'wood',
    name: 'Wood',
    category: 'crops',
    expectedPath: 'crops/sapling_patch.webp',
    description: 'Stack of three chunky brown wooden logs, simple cartoon lumber',
  },
  {
    id: 'onion',
    name: 'Onion',
    category: 'crops',
    expectedPath: 'crops/onion.webp',
    description: 'Round purple onion bulb with small green sprout, glossy cartoon vegetable',
  },
  {
    id: 'oat',
    name: 'Oat',
    category: 'crops',
    expectedPath: 'crops/oat.webp',
    description: 'Drooping golden oat grain head on pale stalk, simple cartoon crop',
  },
  {
    id: 'sugarcane',
    name: 'Sugarcane',
    category: 'crops',
    expectedPath: 'crops/sugarcane.webp',
    description: 'Two thick green sugarcane stalks with segments, cartoon tropical plant',
  },
  {
    id: 'clay',
    name: 'Clay',
    category: 'crops',
    expectedPath: 'crops/mud_pit.webp',
    description: 'Lump of wet brown-orange clay, shiny blob cartoon style',
  },
  {
    id: 'tomato',
    name: 'Tomato',
    category: 'crops',
    expectedPath: 'crops/tomato.webp',
    description: 'Plump shiny red tomato with small green star leaf on top, cartoon style',
  },
  {
    id: 'soybean',
    name: 'Soybean',
    category: 'crops',
    expectedPath: 'crops/soybean.webp',
    description: 'Bright green soybean pod with three bumps showing beans inside, cartoon style',
  },
  {
    id: 'strawberry',
    name: 'Strawberry',
    category: 'crops',
    expectedPath: 'crops/strawberry.webp',
    description:
      'Plump bright red strawberry with yellow seeds and green leaf crown, cartoon fruit',
  },
  {
    id: 'cotton',
    name: 'Cotton',
    category: 'crops',
    expectedPath: 'crops/cotton.webp',
    description: 'Fluffy white cotton ball bursting from brown pod, soft cloud-like cartoon',
  },
  {
    id: 'cacao',
    name: 'Cacao',
    category: 'crops',
    expectedPath: 'crops/cacao.webp',
    description: 'Pile of dark brown cacao beans, shiny oval shapes cartoon style',
  },
  {
    id: 'chili',
    name: 'Chili',
    category: 'crops',
    expectedPath: 'crops/chili.webp',
    description: 'Curved bright red chili pepper with green stem, shiny cartoon vegetable',
  },
  {
    id: 'coffee',
    name: 'Coffee',
    category: 'crops',
    expectedPath: 'crops/coffee_beans.webp',
    description: 'Cluster of red coffee cherries on small green branch, glossy cartoon berries',
  },
  {
    id: 'grapes',
    name: 'Grapes',
    category: 'crops',
    expectedPath: 'crops/grapes.webp',
    description: 'Triangular bunch of round purple grapes with curly vine, cartoon fruit cluster',
  },
  {
    id: 'sunflower',
    name: 'Sunflower',
    category: 'crops',
    expectedPath: 'crops/sunflower.webp',
    description:
      'Large bright yellow sunflower head with brown center and green stem, cheerful cartoon',
  },
  {
    id: 'lavender',
    name: 'Lavender',
    category: 'crops',
    expectedPath: 'crops/lavender.webp',
    description:
      'Small bundle of purple lavender flower spikes tied together, simple cartoon herbs',
  },
  {
    id: 'tea',
    name: 'Tea',
    category: 'crops',
    expectedPath: 'crops/tea_leaves.webp',
    description: 'Cluster of bright green tea leaves on small branch, glossy cartoon plant',
  },
  {
    id: 'vanilla',
    name: 'Vanilla',
    category: 'crops',
    expectedPath: 'crops/vanilla.webp',
    description: 'Two long dark brown vanilla bean pods, simple sleek cartoon style',
  },
  {
    id: 'saffron',
    name: 'Saffron',
    category: 'crops',
    expectedPath: 'crops/saffron.webp',
    description: 'Few bright orange-red saffron threads, precious spice cartoon style',
  },
  {
    id: 'moonpetal',
    name: 'Moonpetal',
    category: 'crops',
    expectedPath: 'crops/moonpetal.webp',
    description:
      'Pale violet night-blooming flower with softly luminous petals, delicate cartoon blossom',
  },
  {
    id: 'goldroot',
    name: 'Goldroot',
    category: 'crops',
    expectedPath: 'crops/goldroot.webp',
    description:
      'Mineral-rich golden root with braided fibers and earthy sheen, sturdy cartoon crop',
  },
  {
    id: 'golden_seed',
    name: 'Golden Seed',
    category: 'crops',
    expectedPath: 'crops/golden_seed.webp',
    description:
      'Single luminous golden seed glowing with a soft magical shimmer, special starter crop planted by new players that rewards bonus coins and diamonds when fully grown, chunky cartoon style',
  },

  // === AREA ITEMS ===
  {
    id: 'blueberry',
    name: 'Blueberry',
    category: 'area-items',
    expectedPath: 'area-items/blueberry.webp',
    description: 'Cluster of round bright blue blueberries with tiny crown, glossy cartoon fruit',
  },
  {
    id: 'raspberry',
    name: 'Raspberry',
    category: 'area-items',
    expectedPath: 'area-items/raspberry.webp',
    description: 'Plump bright pink-red raspberry with bumpy texture, cartoon berry',
  },
  {
    id: 'blackberry',
    name: 'Blackberry',
    category: 'area-items',
    expectedPath: 'area-items/blackberry.webp',
    description: 'Shiny dark purple-black blackberry with bumpy drupelets, cartoon fruit',
  },
  {
    id: 'cranberry',
    name: 'Cranberry',
    category: 'area-items',
    expectedPath: 'area-items/cranberry.webp',
    description: 'Few round bright red cranberries, shiny cartoon fruit',
  },
  {
    id: 'pineapple',
    name: 'Pineapple',
    category: 'area-items',
    expectedPath: 'area-items/pineapple.webp',
    description: 'Chunky golden-yellow pineapple with spiky green crown, cartoon tropical fruit',
  },
  {
    id: 'bamboo_fiber',
    name: 'Bamboo Fiber',
    category: 'area-items',
    expectedPath: 'area-items/bamboo_fiber.webp',
    description: 'Bundle of pale green bamboo fibers tied together, simple cartoon material',
  },
  {
    id: 'sunflower_seed',
    name: 'Sunflower Seed',
    category: 'area-items',
    expectedPath: 'area-items/sunflower_seed.webp',
    description: 'Small pile of striped black and white sunflower seeds, cartoon style',
  },
  {
    id: 'tea_leaf',
    name: 'Tea Leaf',
    category: 'area-items',
    expectedPath: 'area-items/tea_leaf.webp',
    description: 'Single bright green oval tea leaf, simple glossy cartoon',
  },
  {
    id: 'vanilla_orchid',
    name: 'Vanilla Orchid',
    category: 'area-items',
    expectedPath: 'area-items/vanilla_orchid.webp',
    description: 'Delicate white vanilla orchid flower with yellow center, cartoon bloom',
  },
  {
    id: 'saffron_blossom',
    name: 'Saffron Blossom',
    category: 'area-items',
    expectedPath: 'area-items/saffron_blossom.webp',
    description: 'Purple crocus flower with orange saffron stamens, cartoon blossom',
  },
  {
    id: 'cacao_pod',
    name: 'Cacao Pod',
    category: 'area-items',
    expectedPath: 'area-items/cacao_pod.webp',
    description: 'Large oval orange-brown cacao pod with ridges, chunky cartoon fruit',
  },
  {
    id: 'berries',
    name: 'Berries',
    category: 'area-items',
    expectedPath: 'area-items/berries.webp',
    description: 'Small pile of mixed red and blue round berries, colorful cartoon fruit',
  },
  {
    id: 'coal',
    name: 'Coal',
    category: 'area-items',
    expectedPath: 'area-items/coal.webp',
    description: 'Few chunky black coal lumps with shiny facets, simple cartoon rocks',
  },
  {
    id: 'fish',
    name: 'Fish',
    category: 'area-items',
    expectedPath: 'area-items/fish.webp',
    description: 'Cute blue-silver fish with orange fins, simple cartoon sea creature',
  },
  {
    id: 'iron_ore',
    name: 'Iron Ore',
    category: 'area-items',
    expectedPath: 'area-items/iron_ore.webp',
    description: 'Chunky grey-brown rock with rusty orange patches, cartoon ore',
  },
  {
    id: 'quartz_shard',
    name: 'Quartz Shard',
    category: 'area-items',
    expectedPath: 'area-items/quartz_shard.webp',
    description: 'Pointed clear white crystal shard with sparkle, cartoon gem',
  },
  {
    id: 'reeds',
    name: 'Reeds',
    category: 'area-items',
    expectedPath: 'area-items/reeds.webp',
    description: 'Bundle of tall green reeds with brown cattail tops, cartoon plants',
  },
  {
    id: 'refined_resin',
    name: 'Refined Resin',
    category: 'area-items',
    expectedPath: 'area-items/refined_resin.webp',
    description: 'Clear golden droplet of refined resin, shiny cartoon blob',
  },
  {
    id: 'resin',
    name: 'Resin',
    category: 'area-items',
    expectedPath: 'area-items/resin.webp',
    description:
      'Raw sticky tree resin, dark amber-brown opaque blob with natural texture, fresh sap from tree bark, matte finish, cartoon drop',
  },
  {
    id: 'silica',
    name: 'Silica',
    category: 'area-items',
    expectedPath: 'area-items/silica.webp',
    description: 'Small pile of sparkly white silica sand, cartoon powder',
  },
  {
    id: 'spring_water',
    name: 'Spring Water',
    category: 'area-items',
    expectedPath: 'area-items/spring_water.webp',
    description: 'Clear blue water droplet or splash, shiny cartoon liquid',
  },
  {
    id: 'stone',
    name: 'Stone',
    category: 'area-items',
    expectedPath: 'area-items/stone.webp',
    description: 'Few round grey stones stacked together, simple cartoon rocks',
  },
  {
    id: 'water_plants',
    name: 'Water Plants',
    category: 'area-items',
    expectedPath: 'area-items/water_plants.webp',
    description: 'Wavy green seaweed or water plants, simple cartoon aquatic',
  },
  {
    id: 'wild_lavender',
    name: 'Wild Lavender',
    category: 'area-items',
    expectedPath: 'area-items/wild_lavender.webp',
    description: 'Small purple lavender sprig with green stem, cartoon wildflower',
  },
  // Glowing Caverns drops
  {
    id: 'glowing_ore',
    name: 'Glowing Ore',
    category: 'area-items',
    expectedPath: 'area-items/glowing_ore.webp',
    description:
      'Warm amber-colored ore that pulses with inner light, rough crystalline chunks with soft golden glow emanating from within',
  },
  {
    id: 'cave_moss',
    name: 'Cave Moss',
    category: 'area-items',
    expectedPath: 'area-items/cave_moss.webp',
    description:
      'Soft bioluminescent moss that grows on cavern walls, pale green with tiny glowing spores, slightly damp and velvety',
  },
  {
    id: 'mineral_water',
    name: 'Mineral Water',
    category: 'area-items',
    expectedPath: 'area-items/mineral_water.webp',
    description:
      'Crystal-clear spring water from deep cavern pools, sparkles with dissolved minerals, stored in glass flask',
  },
  {
    id: 'luminescent_stone',
    name: 'Luminescent Stone',
    category: 'area-items',
    expectedPath: 'area-items/luminescent_stone.webp',
    description:
      'Rare polished stone that glows steadily in darkness, smooth and rounded with swirling patterns of light inside',
  },
  // Starlit Grove drops
  {
    id: 'moonwood',
    name: 'Moonwood',
    category: 'area-items',
    expectedPath: 'area-items/moonwood.webp',
    description:
      'Silvery-white wood from ancient trees that absorbs moonlight, pale bark with subtle shimmer, grain patterns resemble crescent moons',
  },
  {
    id: 'starlight_sap',
    name: 'Starlight Sap',
    category: 'area-items',
    expectedPath: 'area-items/starlight_sap.webp',
    description:
      'Glittering golden sap that sparkles like captured starlight, thick and viscous, collected in small crystal vial',
  },
  {
    id: 'night_blossom',
    name: 'Night Blossom',
    category: 'area-items',
    expectedPath: 'area-items/night_blossom.webp',
    description:
      'Delicate purple-blue flowers that only bloom under starlight, petals have subtle iridescent sheen',
  },
  {
    id: 'ancient_bark',
    name: 'Ancient Bark',
    category: 'area-items',
    expectedPath: 'area-items/ancient_bark.webp',
    description:
      'Gnarled weathered bark from thousand-year-old grove trees, dark with silver veins, rough texture with mystical runes naturally formed',
  },

  // === CRAFTS - Feed Mill ===
  {
    id: 'chicken_feed',
    name: 'Chicken Feed',
    category: 'crafts',
    subcategory: 'feed_mill',
    expectedPath: 'crafts/chicken_feed.webp',
    description: 'Brown burlap sack overflowing with yellow grain, cartoon feed bag',
  },
  {
    id: 'cow_feed',
    name: 'Cow Feed',
    category: 'crafts',
    subcategory: 'feed_mill',
    expectedPath: 'crafts/cow_feed.webp',
    description: 'Green burlap sack with brown pellets spilling out, cartoon feed bag',
  },
  {
    id: 'pig_feed',
    name: 'Pig Feed',
    category: 'crafts',
    subcategory: 'feed_mill',
    expectedPath: 'crafts/pig_feed.webp',
    description: 'Pink-tan burlap sack with mixed grain and corn, cartoon feed bag',
  },
  {
    id: 'sheep_feed',
    name: 'Sheep Feed',
    category: 'crafts',
    subcategory: 'feed_mill',
    expectedPath: 'crafts/sheep_feed.webp',
    description: 'White burlap sack with green hay pellets, cartoon feed bag',
  },
  {
    id: 'goat_feed',
    name: 'Goat Feed',
    category: 'crafts',
    subcategory: 'feed_mill',
    expectedPath: 'crafts/goat_feed.webp',
    description: 'Tan burlap sack with mixed brown feed, cartoon feed bag',
  },
  {
    id: 'bee_feed',
    name: 'Bee Feed',
    category: 'crafts',
    subcategory: 'feed_mill',
    expectedPath: 'crafts/bee_feed.webp',
    description: 'Small jar of golden sugar syrup with honey dipper, cartoon bee food',
  },
  {
    id: 'silkworm_feed',
    name: 'Silkworm Feed',
    category: 'crafts',
    subcategory: 'feed_mill',
    expectedPath: 'crafts/silkworm_feed.webp',
    description: 'Bundle of bright green mulberry leaves, cartoon plant food',
  },
  {
    id: 'reindeer_feed',
    name: 'Reindeer Feed',
    category: 'crafts',
    subcategory: 'feed_mill',
    expectedPath: 'crafts/reindeer_feed.webp',
    description: 'Red festive sack with oats and carrots, cartoon holiday feed',
  },

  // === CRAFTS - Mill ===
  {
    id: 'flour',
    name: 'Flour',
    category: 'crafts',
    subcategory: 'mill',
    expectedPath: 'crafts/flour.webp',
    description: 'White cloth sack of fluffy white flour, simple cartoon bag',
  },
  {
    id: 'cornmeal',
    name: 'Cornmeal',
    category: 'crafts',
    subcategory: 'mill',
    expectedPath: 'crafts/cornmeal.webp',
    description: 'Yellow cloth sack of golden cornmeal powder, cartoon bag',
  },
  {
    id: 'corn_syrup',
    name: 'Corn Syrup',
    category: 'crafts',
    subcategory: 'mill',
    expectedPath: 'crafts/corn_syrup.webp',
    description: 'Glass bottle with golden amber syrup inside, cartoon jar',
  },
  {
    id: 'rice_flour',
    name: 'Rice Flour',
    category: 'crafts',
    subcategory: 'mill',
    expectedPath: 'crafts/rice_flour.webp',
    description: 'White sack of fine pale rice flour, simple cartoon bag',
  },
  {
    id: 'oat_flour',
    name: 'Oat Flour',
    category: 'crafts',
    subcategory: 'mill',
    expectedPath: 'crafts/oat_flour.webp',
    description: 'Tan cloth sack of beige oat flour, cartoon bag',
  },

  // === CRAFTS - Bakery ===
  {
    id: 'bread',
    name: 'Bread',
    category: 'crafts',
    subcategory: 'bakery',
    expectedPath: 'crafts/bread.webp',
    description: 'Round golden-brown bread loaf with score marks on top, chunky cartoon',
  },
  {
    id: 'cornbread',
    name: 'Cornbread',
    category: 'crafts',
    subcategory: 'bakery',
    expectedPath: 'crafts/cornbread.webp',
    description: 'Square slice of bright yellow cornbread, crumbly cartoon texture',
  },
  {
    id: 'herb_loaf',
    name: 'Herb Loaf',
    category: 'crafts',
    subcategory: 'bakery',
    expectedPath: 'crafts/herb_loaf.webp',
    description: 'Golden bread loaf with green herb flecks visible, cartoon baked good',
  },
  {
    id: 'corn_muffins',
    name: 'Corn Muffins',
    category: 'crafts',
    subcategory: 'bakery',
    expectedPath: 'crafts/corn_muffins.webp',
    description: 'Two puffy yellow corn muffins with golden tops, cartoon cupcakes',
  },
  {
    id: 'tomato_bread',
    name: 'Tomato Bread',
    category: 'crafts',
    subcategory: 'bakery',
    expectedPath: 'crafts/tomato_bread.webp',
    description: 'Reddish-orange bread loaf with tomato color, cartoon baked good',
  },
  {
    id: 'cake',
    name: 'Cake',
    category: 'crafts',
    subcategory: 'bakery',
    expectedPath: 'crafts/cake.webp',
    description: 'Round pink frosted cake with cherry on top, cheerful cartoon dessert',
  },
  {
    id: 'oat_bread',
    name: 'Oat Bread',
    category: 'crafts',
    subcategory: 'bakery',
    expectedPath: 'crafts/oat_bread.webp',
    description: 'Dense brown bread loaf with oat flakes on top, cartoon baked good',
  },
  {
    id: 'sunflower_bread',
    name: 'Sunflower Bread',
    category: 'crafts',
    subcategory: 'bakery',
    expectedPath: 'crafts/sunflower_bread.webp',
    description: 'Golden bread loaf topped with sunflower seeds, cartoon baked good',
  },
  {
    id: 'saffron_bread',
    name: 'Saffron Bread',
    category: 'crafts',
    subcategory: 'bakery',
    expectedPath: 'crafts/saffron_bread.webp',
    description: 'Bright yellow-orange saffron bread loaf, vibrant cartoon baked good',
  },
  {
    id: 'onion_bread',
    name: 'Onion Bread',
    category: 'crafts',
    subcategory: 'bakery',
    expectedPath: 'crafts/onion_bread.webp',
    description: 'Golden bread loaf with caramelized onion pieces on top, cartoon baked good',
  },
  {
    id: 'pasta',
    name: 'Pasta',
    category: 'crafts',
    subcategory: 'bakery',
    expectedPath: 'crafts/pasta.webp',
    description: 'Pile of pale yellow wavy pasta noodles, simple cartoon food',
  },
  {
    id: 'glazed_cornbread',
    name: 'Glazed Cornbread',
    category: 'crafts',
    subcategory: 'bakery',
    expectedPath: 'crafts/glazed_cornbread.webp',
    description: 'Golden cornbread slice with a shiny sweet glaze on top',
  },
  {
    id: 'sticky_buns',
    name: 'Sticky Buns',
    category: 'crafts',
    subcategory: 'bakery',
    expectedPath: 'crafts/sticky_buns.webp',
    description: 'Swirled cinnamon pastry rolls dripping with gooey caramelized syrup',
  },
  {
    id: 'savory_pie',
    name: 'Savory Pie',
    category: 'crafts',
    subcategory: 'bakery',
    expectedPath: 'crafts/savory_pie.webp',
    description:
      'Golden-crusted savory pie with flaky pastry, filled with egg, cheese, and caramelized onions visible through a lattice top',
  },
  {
    id: 'sunflower_crackers',
    name: 'Sunflower Crackers',
    category: 'crafts',
    subcategory: 'bakery',
    expectedPath: 'crafts/sunflower_crackers.webp',
    description:
      'Crispy golden crackers studded with sunflower seeds, stacked or arranged on a rustic surface',
  },
  {
    id: 'honeycomb_toast',
    name: 'Honeycomb Toast',
    category: 'crafts',
    subcategory: 'bakery',
    expectedPath: 'crafts/honeycomb_toast.webp',
    description:
      'Thick slice of toasted bread topped with a chunk of natural honeycomb dripping with golden honey and melted butter',
  },

  // === CRAFTS - Kitchen ===
  {
    id: 'carrot_soup',
    name: 'Carrot Soup',
    category: 'crafts',
    subcategory: 'kitchen',
    expectedPath: 'crafts/carrot_soup.webp',
    description: 'Bowl of bright orange carrot soup with steam, cartoon food',
  },
  {
    id: 'pepper_soup',
    name: 'Pepper Soup',
    category: 'crafts',
    subcategory: 'kitchen',
    expectedPath: 'crafts/pepper_soup.webp',
    description: 'Bowl of red pepper soup with steam swirl, cartoon food',
  },
  {
    id: 'mashed_potatoes',
    name: 'Mashed Potatoes',
    category: 'crafts',
    subcategory: 'kitchen',
    expectedPath: 'crafts/mashed_potatoes.webp',
    description: 'Bowl of fluffy white mashed potatoes with butter pat, cartoon food',
  },
  {
    id: 'popcorn',
    name: 'Popcorn',
    category: 'crafts',
    subcategory: 'kitchen',
    expectedPath: 'crafts/popcorn.webp',
    description: 'Red striped box overflowing with white fluffy popcorn, cartoon snack',
  },
  {
    id: 'water_plant_salad',
    name: 'Water Plant Salad',
    category: 'crafts',
    subcategory: 'kitchen',
    expectedPath: 'crafts/water_plant_salad.webp',
    description: 'Bowl of green wavy seaweed salad, fresh cartoon dish',
  },
  {
    id: 'pork_chops',
    name: 'Pork Chops',
    category: 'crafts',
    subcategory: 'kitchen',
    expectedPath: 'crafts/pork_chops.webp',
    description: 'Two golden-brown grilled pork chops with bone, cartoon meat',
  },
  {
    id: 'fish_and_chips',
    name: 'Fish and Chips',
    category: 'crafts',
    subcategory: 'kitchen',
    expectedPath: 'crafts/fish_and_chips.webp',
    description: 'Golden battered fish fillet with yellow chips, cartoon British food',
  },
  {
    id: 'onion_soup',
    name: 'Onion Soup',
    category: 'crafts',
    subcategory: 'kitchen',
    expectedPath: 'crafts/onion_soup.webp',
    description: 'Brown crock of onion soup with melted cheese top, cartoon food',
  },
  {
    id: 'tomato_sauce',
    name: 'Tomato Sauce',
    category: 'crafts',
    subcategory: 'kitchen',
    expectedPath: 'crafts/tomato_sauce.webp',
    description: 'Glass jar of bright red tomato sauce, cartoon condiment',
  },
  {
    id: 'scrambled_eggs',
    name: 'Scrambled Eggs',
    category: 'crafts',
    subcategory: 'kitchen',
    expectedPath: 'crafts/scrambled_eggs.webp',
    description: 'Fluffy yellow scrambled eggs cooked with butter, classic quick breakfast staple',
  },
  {
    id: 'egg_drop_soup',
    name: 'Egg Drop Soup',
    category: 'crafts',
    subcategory: 'kitchen',
    expectedPath: 'crafts/egg_drop_soup.webp',
    description:
      'Light Chinese-style soup with silky ribbons of egg floating in a clear broth with carrot pieces',
  },
  {
    id: 'candied_carrots',
    name: 'Candied Carrots',
    category: 'crafts',
    subcategory: 'kitchen',
    expectedPath: 'crafts/candied_carrots.webp',
    description: 'Glazed orange carrot slices glistening with sweet corn syrup coating',
  },
  {
    id: 'caramelized_onions',
    name: 'Caramelized Onions',
    category: 'crafts',
    subcategory: 'kitchen',
    expectedPath: 'crafts/caramelized_onions.webp',
    description:
      'Deep golden-brown caramelized onions glistening with butter, slowly cooked to sweet perfection',
  },
  {
    id: 'rice_bowl',
    name: 'Rice Bowl',
    category: 'crafts',
    subcategory: 'kitchen',
    expectedPath: 'crafts/rice_bowl.webp',
    description:
      'Comforting bowl of fluffy white rice topped with a fried egg and colorful carrot slices',
  },
  {
    id: 'fried_rice',
    name: 'Fried Rice',
    category: 'crafts',
    subcategory: 'kitchen',
    expectedPath: 'crafts/fried_rice.webp',
    description:
      'Wok-fried golden rice with scrambled egg pieces, diced pork, and chopped onions. Classic Asian comfort food',
  },
  {
    id: 'tomato_soup',
    name: 'Tomato Soup',
    category: 'crafts',
    subcategory: 'kitchen',
    expectedPath: 'crafts/tomato_soup.webp',
    description:
      'Creamy orange-red tomato soup with a swirl of butter on top, served in a rustic bowl',
  },
  {
    id: 'trail_mix',
    name: 'Trail Mix',
    category: 'crafts',
    subcategory: 'kitchen',
    expectedPath: 'crafts/trail_mix.webp',
    description:
      'Colorful mix of sunflower seeds and forest berries with a golden honey drizzle, in a small bowl or scattered arrangement',
  },
  {
    id: 'miso_soup',
    name: 'Miso Soup',
    category: 'crafts',
    subcategory: 'kitchen',
    expectedPath: 'crafts/miso_soup.webp',
    description:
      'Traditional Japanese soup with silky tofu cubes floating in a creamy soy broth with green onion garnish',
  },
  {
    id: 'tofu_stir_fry',
    name: 'Tofu Stir Fry',
    category: 'crafts',
    subcategory: 'kitchen',
    expectedPath: 'crafts/tofu_stir_fry.webp',
    description:
      'Golden crispy tofu cubes wok-fried with colorful peppers and onions in a savory sauce',
  },
  {
    id: 'tzatziki',
    name: 'Tzatziki',
    category: 'crafts',
    subcategory: 'kitchen',
    expectedPath: 'crafts/tzatziki.webp',
    description:
      'Creamy Greek yogurt dip with cucumber and herbs, served in a small bowl with a drizzle of olive oil',
  },
  {
    id: 'berry_preserve',
    name: 'Berry Preserve',
    category: 'crafts',
    subcategory: 'kitchen',
    expectedPath: 'crafts/berry_preserve.webp',
    description:
      'Glass jar filled with thick dark purple berry preserve, golden honey swirled through, sealed with a cloth lid and twine, cozy cartoon pantry item',
  },
  {
    id: 'fish_tacos',
    name: 'Fish Tacos',
    category: 'crafts',
    subcategory: 'kitchen',
    expectedPath: 'crafts/fish_tacos.webp',
    description:
      'Two crispy golden fish tacos in soft tortillas with shredded cabbage, lime wedge, and creamy sauce drizzle, colorful cartoon street food',
  },

  // === CRAFTS - Breakfast Cart ===
  {
    id: 'egg_sandwich',
    name: 'Egg Sandwich',
    category: 'crafts',
    subcategory: 'breakfast_cart',
    expectedPath: 'crafts/egg_sandwich.webp',
    description: 'Toasted sandwich with yellow fried egg visible, cartoon breakfast',
  },
  {
    id: 'farm_breakfast',
    name: 'Farm Breakfast',
    category: 'crafts',
    subcategory: 'breakfast_cart',
    expectedPath: 'crafts/farm_breakfast.webp',
    description: 'Plate with sunny egg, bacon strips, and toast, cartoon breakfast',
  },
  {
    id: 'pancakes',
    name: 'Pancakes',
    category: 'crafts',
    subcategory: 'breakfast_cart',
    expectedPath: 'crafts/pancakes.webp',
    description: 'Stack of three golden pancakes with syrup drip and butter, cartoon breakfast',
  },
  {
    id: 'corn_pancakes',
    name: 'Corn Pancakes',
    category: 'crafts',
    subcategory: 'breakfast_cart',
    expectedPath: 'crafts/corn_pancakes.webp',
    description: 'Stack of bright yellow corn pancakes, cartoon breakfast',
  },
  {
    id: 'omelette',
    name: 'Omelette',
    category: 'crafts',
    subcategory: 'breakfast_cart',
    expectedPath: 'crafts/omelette.webp',
    description: 'Folded yellow omelette with veggie filling peeking out, cartoon egg dish',
  },
  {
    id: 'charcuterie_board',
    name: 'Charcuterie Board',
    category: 'crafts',
    subcategory: 'breakfast_cart',
    expectedPath: 'crafts/charcuterie_board.webp',
    description: 'Wooden board with colorful meats and cheese slices, cartoon platter',
  },
  {
    id: 'premium_charcuterie',
    name: 'Premium Charcuterie',
    category: 'crafts',
    subcategory: 'breakfast_cart',
    expectedPath: 'crafts/premium_charcuterie.webp',
    description: 'Fancy wooden board with premium meats cheese and grapes, cartoon luxury platter',
  },
  {
    id: 'honey_corn_cakes',
    name: 'Honey Corn Cakes',
    category: 'crafts',
    subcategory: 'breakfast_cart',
    expectedPath: 'crafts/honey_corn_cakes.webp',
    description: 'Small golden corn cakes drizzled with honey, stacked on a plate',
  },
  {
    id: 'tofu_scramble',
    name: 'Tofu Scramble',
    category: 'crafts',
    subcategory: 'breakfast_cart',
    expectedPath: 'crafts/tofu_scramble.webp',
    description:
      'Crumbled seasoned tofu with diced peppers and tomatoes, resembling scrambled eggs. A plant-based breakfast',
  },

  // === CRAFTS - Dairy ===
  {
    id: 'butter',
    name: 'Butter',
    category: 'crafts',
    subcategory: 'dairy',
    expectedPath: 'crafts/butter.webp',
    description: 'Block of bright yellow butter with wrapper, shiny cartoon dairy',
  },
  {
    id: 'cheese',
    name: 'Cheese',
    category: 'crafts',
    subcategory: 'dairy',
    expectedPath: 'crafts/cheese.webp',
    description: 'Yellow cheese wheel wedge with holes, classic cartoon cheese',
  },
  {
    id: 'goat_butter',
    name: 'Goat Butter',
    category: 'crafts',
    subcategory: 'dairy',
    expectedPath: 'crafts/goat_butter.webp',
    description: 'Block of pale white goat butter, creamy cartoon dairy',
  },
  {
    id: 'polenta',
    name: 'Polenta',
    category: 'crafts',
    subcategory: 'dairy',
    expectedPath: 'crafts/polenta.webp',
    description: 'Bowl of creamy yellow polenta with steam, cartoon comfort food',
  },
  {
    id: 'yogurt',
    name: 'Yogurt',
    category: 'crafts',
    subcategory: 'dairy',
    expectedPath: 'crafts/yogurt.webp',
    description: 'Cup of white creamy yogurt with spoon, cartoon dairy snack',
  },
  {
    id: 'rice_pudding',
    name: 'Rice Pudding',
    category: 'crafts',
    subcategory: 'dairy',
    expectedPath: 'crafts/rice_pudding.webp',
    description: 'Bowl of creamy white rice pudding with cinnamon sprinkle, cartoon dessert',
  },
  {
    id: 'sunflower_seed_butter',
    name: 'Sunflower Seed Butter',
    category: 'crafts',
    subcategory: 'dairy',
    expectedPath: 'crafts/sunflower_seed_butter.webp',
    description: 'Jar of golden-brown sunflower butter, cartoon spread',
  },
  {
    id: 'goat_cheese',
    name: 'Goat Cheese',
    category: 'crafts',
    subcategory: 'dairy',
    expectedPath: 'crafts/goat_cheese.webp',
    description: 'Round white goat cheese wheel, soft cartoon dairy',
  },
  {
    id: 'quiche',
    name: 'Quiche',
    category: 'crafts',
    subcategory: 'dairy',
    expectedPath: 'crafts/quiche.webp',
    description: 'Savory egg pie with a golden flaky crust, filled with egg and cheese custard',
  },
  {
    id: 'tofu',
    name: 'Tofu',
    category: 'crafts',
    subcategory: 'dairy',
    expectedPath: 'crafts/tofu.webp',
    description:
      'Smooth white blocks of fresh tofu with silky texture, shown on a simple plate or bamboo mat',
  },
  {
    id: 'soy_milk',
    name: 'Soy Milk',
    category: 'crafts',
    subcategory: 'dairy',
    expectedPath: 'crafts/soy_milk.webp',
    description:
      'Creamy white soy milk in a glass or ceramic cup, fresh and plant-based dairy alternative',
  },
  {
    id: 'honey_butter',
    name: 'Honey Butter',
    category: 'crafts',
    subcategory: 'dairy',
    expectedPath: 'crafts/honey_butter.webp',
    description:
      'Smooth whipped butter swirled with golden honey, served in a small crock or ramekin with honeycomb pieces visible',
  },
  {
    id: 'milk',
    name: 'Milk',
    category: 'animal-products',
    expectedPath: 'animal-products/milk.webp',
    description: 'Glass bottle filled with white milk, classic cartoon dairy',
  },
  {
    id: 'goat_milk',
    name: 'Goat Milk',
    category: 'animal-products',
    expectedPath: 'animal-products/goat_milk.webp',
    description: 'Glass bottle of slightly cream-colored goat milk, cartoon dairy',
  },

  // === CRAFTS - Smoker ===
  {
    id: 'smoked_pork',
    name: 'Smoked Pork',
    category: 'crafts',
    subcategory: 'smoker',
    expectedPath: 'crafts/smoked_pork.webp',
    description: 'Chunk of reddish-brown smoked pork with smoke wisps, cartoon meat',
  },
  {
    id: 'smoked_sausage',
    name: 'Smoked Sausage',
    category: 'crafts',
    subcategory: 'smoker',
    expectedPath: 'crafts/smoked_sausage.webp',
    description: 'Curved dark red smoked sausage links, cartoon meat',
  },
  {
    id: 'smoked_fish',
    name: 'Smoked Fish',
    category: 'crafts',
    subcategory: 'smoker',
    expectedPath: 'crafts/smoked_fish.webp',
    description: 'Whole golden-brown smoked fish, glossy cartoon seafood',
  },
  {
    id: 'smoked_ham',
    name: 'Smoked Ham',
    category: 'crafts',
    subcategory: 'smoker',
    expectedPath: 'crafts/smoked_ham.webp',
    description: 'Large pink glazed ham with bone, shiny cartoon meat',
  },
  {
    id: 'smoked_cheese',
    name: 'Smoked Cheese',
    category: 'crafts',
    subcategory: 'smoker',
    expectedPath: 'crafts/smoked_cheese.webp',
    description:
      'Rich golden cheese with dark smoked rind, wheel of cheese with distinctive smoky color gradient',
  },

  {
    id: 'smoked_yogurt_pork',
    name: 'Smoked Yogurt Pork',
    category: 'crafts',
    subcategory: 'smoker',
    expectedPath: 'crafts/smoked_yogurt_pork.webp',
    description:
      'Tender pork slices marinated in goat yogurt before slow-smoking. Deep mahogany color with visible smoke marks, served on a wooden cutting board.',
  },

  // === CRAFTS - Spinning Wheel ===
  {
    id: 'wool_yarn',
    name: 'Wool Yarn',
    category: 'crafts',
    subcategory: 'spinning_wheel',
    expectedPath: 'crafts/wool_yarn.webp',
    description: 'Soft round ball of colorful wool yarn, cartoon craft supply',
  },
  {
    id: 'wool_cloth',
    name: 'Wool Cloth',
    category: 'crafts',
    subcategory: 'spinning_wheel',
    expectedPath: 'crafts/wool_cloth.webp',
    description: 'Folded piece of cozy wool fabric, cartoon textile',
  },
  {
    id: 'reed_mat',
    name: 'Reed Mat',
    category: 'crafts',
    subcategory: 'spinning_wheel',
    expectedPath: 'crafts/reed_mat.webp',
    description: 'Rolled tan woven reed mat, simple cartoon craft',
  },
  {
    id: 'thread',
    name: 'Thread',
    category: 'crafts',
    subcategory: 'spinning_wheel',
    expectedPath: 'crafts/thread.webp',
    description: 'Wooden spool wrapped with colorful thread, cartoon sewing supply',
  },
  {
    id: 'resin_mat',
    name: 'Resin Mat',
    category: 'crafts',
    subcategory: 'spinning_wheel',
    expectedPath: 'crafts/resin_treated_mat.webp',
    description: 'Shiny amber-coated woven mat, glossy cartoon craft',
  },
  {
    id: 'woolly_hat',
    name: 'Woolly Hat',
    category: 'crafts',
    subcategory: 'spinning_wheel',
    expectedPath: 'crafts/woolly_hat.webp',
    description: 'Cozy knitted beanie hat with pompom, colorful cartoon clothing',
  },
  {
    id: 'cotton_fabric',
    name: 'Cotton Fabric',
    category: 'crafts',
    subcategory: 'spinning_wheel',
    expectedPath: 'crafts/cotton_fabric.webp',
    description: 'Folded piece of white cotton cloth, clean cartoon textile',
  },
  {
    id: 'gloves',
    name: 'Gloves',
    category: 'crafts',
    subcategory: 'spinning_wheel',
    expectedPath: 'crafts/gloves.webp',
    description: 'Pair of cozy knitted mittens, colorful cartoon winter gear',
  },
  {
    id: 'bamboo_mat',
    name: 'Bamboo Mat',
    category: 'crafts',
    subcategory: 'spinning_wheel',
    expectedPath: 'crafts/bamboo_mat.webp',
    description:
      'Traditional woven bamboo mat with natural green-tan coloring, showing intricate weave pattern',
  },
  {
    id: 'knit_scarf',
    name: 'Knit Scarf',
    category: 'crafts',
    subcategory: 'spinning_wheel',
    expectedPath: 'crafts/knit_scarf.webp',
    description:
      'Long hand-knitted wool scarf in a warm color, coiled neatly. Visible knit pattern texture',
  },
  {
    id: 'wool_mittens',
    name: 'Wool Mittens',
    category: 'crafts',
    subcategory: 'spinning_wheel',
    expectedPath: 'crafts/wool_mittens.webp',
    description: 'Pair of cozy knitted mittens with a ribbed cuff. Warm earthy wool color',
  },
  {
    id: 'felted_bowl',
    name: 'Felted Bowl',
    category: 'crafts',
    subcategory: 'spinning_wheel',
    expectedPath: 'crafts/felted_bowl.webp',
    description:
      'Decorative handmade bowl crafted from felted wool. Soft rounded shape with natural wool texture',
  },

  // === CRAFTS - Cookhouse ===
  {
    id: 'root_stew',
    name: 'Root Stew',
    category: 'crafts',
    subcategory: 'cookhouse',
    expectedPath: 'crafts/root_stew.webp',
    description:
      'Steaming pot of chunky vegetable stew with carrots and potatoes, cartoon comfort food',
  },
  {
    id: 'fish_stew',
    name: 'Fish Stew',
    category: 'crafts',
    subcategory: 'cookhouse',
    expectedPath: 'crafts/fish_stew.webp',
    description: 'Bowl of creamy fish stew with visible fish chunks, cartoon seafood dish',
  },
  {
    id: 'pork_stew',
    name: 'Pork Stew',
    category: 'crafts',
    subcategory: 'cookhouse',
    expectedPath: 'crafts/pork_stew.webp',
    description: 'Pot of brown pork stew with meat pieces and steam, cartoon comfort food',
  },
  {
    id: 'herbal_soup',
    name: 'Herbal Soup',
    category: 'crafts',
    subcategory: 'cookhouse',
    expectedPath: 'crafts/herbal_soup.webp',
    description: 'Bowl of green herbal soup with floating herbs, cartoon healing food',
  },
  {
    id: 'risotto',
    name: 'Risotto',
    category: 'crafts',
    subcategory: 'cookhouse',
    expectedPath: 'crafts/risotto.webp',
    description: 'Plate of creamy white risotto with herbs on top, cartoon Italian dish',
  },
  {
    id: 'fish_pie',
    name: 'Fish Pie',
    category: 'crafts',
    subcategory: 'cookhouse',
    expectedPath: 'crafts/fish_pie.webp',
    description: 'Golden-topped fish pie with fork marks, cartoon comfort food',
  },
  {
    id: 'mountain_stew_pot',
    name: 'Mountain Stew Pot',
    category: 'crafts',
    subcategory: 'cookhouse',
    expectedPath: 'crafts/mountain_stew_pot.webp',
    description: 'Iron pot full of hearty stew with steam rising, cartoon rustic food',
  },
  {
    id: 'chili_stew',
    name: 'Chili Stew',
    category: 'crafts',
    subcategory: 'cookhouse',
    expectedPath: 'crafts/chili_stew.webp',
    description: 'Bowl of red spicy chili with visible peppers, cartoon spicy food',
  },
  {
    id: 'saffron_rice',
    name: 'Saffron Rice',
    category: 'crafts',
    subcategory: 'cookhouse',
    expectedPath: 'crafts/saffron_rice.webp',
    description: 'Plate of bright golden-yellow saffron rice, cartoon grain dish',
  },
  {
    id: 'iron_pot_roast',
    name: 'Iron Pot Roast',
    category: 'crafts',
    subcategory: 'cookhouse',
    expectedPath: 'crafts/iron_pot_roast.webp',
    description: 'Hearty slow-cooked pork roast in a rustic cast iron pot with potatoes',
  },
  {
    id: 'ore_stew',
    name: 'Ore Stew',
    category: 'crafts',
    subcategory: 'cookhouse',
    expectedPath: 'crafts/ore_stew.webp',
    description:
      'Rich mineral-infused stew with root vegetables, served in a stone bowl with iron ore chunks visible as decoration',
  },
  {
    id: 'stuffed_tomatoes',
    name: 'Stuffed Tomatoes',
    category: 'crafts',
    subcategory: 'cookhouse',
    expectedPath: 'crafts/stuffed_tomatoes.webp',
    description:
      'Plump red tomatoes hollowed and stuffed with rice and melted cheese, baked golden on top',
  },
  {
    id: 'mountain_broth',
    name: 'Mountain Broth',
    category: 'crafts',
    subcategory: 'cookhouse',
    expectedPath: 'crafts/mountain_broth.webp',
    description:
      'Clear, steaming broth in a rustic pot with visible potato and carrot chunks, mountain spring water creating a pure, clean appearance',
  },
  {
    id: 'mapo_tofu',
    name: 'Mapo Tofu',
    category: 'crafts',
    subcategory: 'cookhouse',
    expectedPath: 'crafts/mapo_tofu.webp',
    description:
      'Spicy Sichuan dish with soft tofu cubes in a fiery red chili sauce with ground pork. Served in a clay pot',
  },

  {
    id: 'creamy_goat_soup',
    name: 'Creamy Goat Soup',
    category: 'crafts',
    subcategory: 'cookhouse',
    expectedPath: 'crafts/creamy_goat_soup.webp',
    description:
      'Rich and creamy soup made with goat milk, diced potatoes, and caramelized onions. Served steaming in a rustic bowl with a swirl of cream on top.',
  },
  {
    id: 'buttered_rice',
    name: 'Buttered Rice',
    category: 'crafts',
    subcategory: 'cookhouse',
    expectedPath: 'crafts/buttered_rice.webp',
    description:
      'Fluffy aromatic rice glistening with melted goat butter and scattered with caramelized onion pieces. Served in a ceramic bowl.',
  },

  // === CRAFTS - Sugar House ===
  {
    id: 'sugar',
    name: 'Sugar',
    category: 'crafts',
    subcategory: 'sugar_house',
    expectedPath: 'crafts/sugar.webp',
    description: 'Open sack of sparkly white sugar crystals, cartoon sweetener',
  },
  {
    id: 'wood_pulp',
    name: 'Wood Pulp',
    category: 'crafts',
    subcategory: 'sugar_house',
    expectedPath: 'crafts/wood_pulp.webp',
    description: 'Pile of tan fibrous wood pulp, cartoon craft material',
  },
  {
    id: 'sweet_rolls',
    name: 'Sweet Rolls',
    category: 'crafts',
    subcategory: 'sugar_house',
    expectedPath: 'crafts/sweet_rolls.webp',
    description: 'Two golden spiral sweet rolls with white glaze drizzle, cartoon pastry',
  },
  {
    id: 'chocolate',
    name: 'Chocolate',
    category: 'crafts',
    subcategory: 'sugar_house',
    expectedPath: 'crafts/chocolate.webp',
    description: 'Bar of dark brown chocolate with squares visible, shiny cartoon candy',
  },
  {
    id: 'pancake_syrup',
    name: 'Pancake Syrup',
    category: 'crafts',
    subcategory: 'sugar_house',
    expectedPath: 'crafts/pancake_syrup.webp',
    description: 'Glass bottle of golden maple syrup, cartoon breakfast topping',
  },
  {
    id: 'glazed_donuts',
    name: 'Glazed Donuts',
    category: 'crafts',
    subcategory: 'sugar_house',
    expectedPath: 'crafts/glazed_donuts.webp',
    description: 'Two ring donuts with shiny white glaze, cheerful cartoon pastry',
  },
  {
    id: 'coffee_beans',
    name: 'Coffee Beans',
    category: 'crafts',
    subcategory: 'sugar_house',
    expectedPath: 'crafts/roasted_coffee_beans.webp',
    description: 'Pile of dark brown roasted coffee beans, aromatic cartoon ingredient',
  },
  {
    id: 'amber_caramel',
    name: 'Amber Caramel',
    category: 'crafts',
    subcategory: 'sugar_house',
    expectedPath: 'crafts/amber_caramel.webp',
    description: 'Glossy golden caramel square or drip, shiny cartoon candy',
  },
  {
    id: 'cacao_butter',
    name: 'Cacao Butter',
    category: 'crafts',
    subcategory: 'sugar_house',
    expectedPath: 'crafts/cacao_butter.webp',
    description:
      'Creamy pale tan cacao butter in a small dish or molded form, smooth and luxurious chocolate-based fat',
  },

  {
    id: 'goat_butter_biscuits',
    name: 'Goat Butter Biscuits',
    category: 'crafts',
    subcategory: 'sugar_house',
    expectedPath: 'crafts/goat_butter_biscuits.webp',
    description:
      'Golden-brown flaky biscuits made with premium goat butter and dusted with sugar crystals. Stacked in a small pile with visible buttery layers.',
  },

  // === CRAFTS - Creamery ===
  {
    id: 'goat_yogurt',
    name: 'Goat Yogurt',
    category: 'crafts',
    subcategory: 'creamery',
    expectedPath: 'crafts/goat_yogurt.webp',
    description: 'Cup of creamy white goat yogurt with swirl top, cartoon dairy',
  },
  {
    id: 'yogurt_parfait',
    name: 'Yogurt Parfait',
    category: 'crafts',
    subcategory: 'creamery',
    expectedPath: 'crafts/yogurt_parfait.webp',
    description: 'Glass with layered white yogurt pink fruit and granola, colorful cartoon dessert',
  },
  {
    id: 'cream_trifle',
    name: 'Cream Trifle',
    category: 'crafts',
    subcategory: 'creamery',
    expectedPath: 'crafts/cream_trifle.webp',
    description: 'Glass dish with layered cream cake and fruit, colorful cartoon dessert',
  },

  {
    id: 'goat_yogurt_bowl',
    name: 'Goat Yogurt Bowl',
    category: 'crafts',
    subcategory: 'creamery',
    expectedPath: 'crafts/goat_yogurt_bowl.webp',
    description:
      'Thick creamy goat yogurt in a decorative bowl, topped with fresh mixed berries and a golden drizzle of honey. Vibrant purple and red berries contrast with the white yogurt.',
  },
  {
    id: 'lavender_soap',
    name: 'Lavender Soap',
    category: 'crafts',
    subcategory: 'creamery',
    expectedPath: 'crafts/lavender_soap.webp',
    description: 'Purple bar of lavender soap with flower sprig, cartoon bath item',
  },
  {
    id: 'feta_salad',
    name: 'Feta Salad',
    category: 'crafts',
    subcategory: 'creamery',
    expectedPath: 'crafts/feta_salad.webp',
    description: 'Bowl of green salad with white feta cubes and tomato, cartoon healthy dish',
  },
  {
    id: 'sunflower_honey',
    name: 'Sunflower Honey',
    category: 'crafts',
    subcategory: 'creamery',
    expectedPath: 'crafts/sunflower_honey.webp',
    description:
      'Golden honey infused with sunflower petals, creating a rich floral spread with a buttery finish.',
  },
  {
    id: 'soy_pudding',
    name: 'Soy Pudding',
    category: 'crafts',
    subcategory: 'creamery',
    expectedPath: 'crafts/soy_pudding.webp',
    description:
      'Silky smooth white pudding made from soy milk, served in a small dish with a delicate wobble',
  },
  {
    id: 'frozen_yogurt',
    name: 'Frozen Yogurt',
    category: 'crafts',
    subcategory: 'creamery',
    expectedPath: 'crafts/frozen_yogurt.webp',
    description:
      'Swirled frozen yogurt in a cup, topped with fresh strawberries. Light pink color with creamy texture',
  },
  {
    id: 'lavender_panna_cotta',
    name: 'Lavender Panna Cotta',
    category: 'crafts',
    subcategory: 'creamery',
    expectedPath: 'crafts/lavender_panna_cotta.webp',
    description:
      'Creamy white-lavender panna cotta on a small plate, topped with a sprig of purple lavender flowers. Smooth jiggly Italian dessert with a delicate purple hue',
  },

  // === CRAFTS - Jam House ===
  {
    id: 'strawberry_jam',
    name: 'Strawberry Jam',
    category: 'crafts',
    subcategory: 'jam_house',
    expectedPath: 'crafts/strawberry_jam.webp',
    description: 'Glass jar filled with bright red strawberry jam, cartoon preserves',
  },
  {
    id: 'mixed_berry_jam',
    name: 'Mixed Berry Jam',
    category: 'crafts',
    subcategory: 'jam_house',
    expectedPath: 'crafts/mixed_berry_jam.webp',
    description: 'Glass jar of deep purple mixed berry jam, cartoon preserves',
  },
  {
    id: 'chili_jelly',
    name: 'Chili Jelly',
    category: 'crafts',
    subcategory: 'jam_house',
    expectedPath: 'crafts/chili_jelly.webp',
    description: 'Glass jar of spicy red chili jelly with pepper bits, cartoon preserves',
  },
  {
    id: 'grape_jelly',
    name: 'Grape Jelly',
    category: 'crafts',
    subcategory: 'jam_house',
    expectedPath: 'crafts/grape_jelly.webp',
    description: 'Glass jar of bright purple grape jelly, shiny cartoon preserves',
  },
  {
    id: 'honeycomb_candy',
    name: 'Honeycomb Candy',
    category: 'crafts',
    subcategory: 'jam_house',
    expectedPath: 'crafts/honeycomb_candy.webp',
    description: 'Chunks of golden honeycomb toffee candy, crunchy cartoon treat',
  },
  {
    id: 'blueberry_jam',
    name: 'Blueberry Jam',
    category: 'crafts',
    subcategory: 'jam_house',
    expectedPath: 'crafts/blueberry_jam.webp',
    description: 'Glass jar of deep blue blueberry jam, cartoon preserves',
  },
  {
    id: 'cranberry_sauce',
    name: 'Cranberry Sauce',
    category: 'crafts',
    subcategory: 'jam_house',
    expectedPath: 'crafts/cranberry_sauce.webp',
    description: 'Glass jar of dark red cranberry sauce, cartoon condiment',
  },

  // === CRAFTS - Workshop ===
  {
    id: 'boards',
    name: 'Boards',
    category: 'rare',
    expectedPath: 'rare/boards.webp',
    description: 'Stack of flat tan wooden boards, simple cartoon lumber',
  },
  {
    id: 'coal_briquette',
    name: 'Coal Briquette',
    category: 'crafts',
    subcategory: 'workshop',
    expectedPath: 'crafts/coal_briquette.webp',
    description: 'Black rectangular coal briquette block, cartoon fuel',
  },
  {
    id: 'resin_sealant',
    name: 'Resin Sealant',
    category: 'crafts',
    subcategory: 'workshop',
    expectedPath: 'crafts/resin_sealant.webp',
    description: 'Bottle of clear amber resin sealant, cartoon craft supply',
  },
  {
    id: 'glass_panel',
    name: 'Glass Panel',
    category: 'crafts',
    subcategory: 'workshop',
    expectedPath: 'crafts/glass_panel.webp',
    description: 'Flat clear glass panel with blue tint reflection, cartoon material',
  },
  {
    id: 'scented_candle',
    name: 'Scented Candle',
    category: 'crafts',
    subcategory: 'workshop',
    expectedPath: 'crafts/scented_candle.webp',
    description: 'Purple candle in jar with small flame, cozy cartoon item',
  },
  {
    id: 'reed_basket',
    name: 'Reed Basket',
    category: 'crafts',
    subcategory: 'workshop',
    expectedPath: 'crafts/reed_basket.webp',
    description: 'Round tan woven basket with handle, simple cartoon container',
  },
  {
    id: 'nails',
    name: 'Nails',
    category: 'rare',
    expectedPath: 'rare/nails.webp',
    description: 'Few silver iron nails scattered, simple cartoon hardware',
  },
  {
    id: 'gears',
    name: 'Gears',
    category: 'crafts',
    subcategory: 'workshop',
    expectedPath: 'crafts/gears.webp',
    description: 'Two interlocking bronze metal gears, cartoon mechanical parts',
  },
  {
    id: 'precision_mechanism',
    name: 'Precision Mechanism',
    category: 'crafts',
    subcategory: 'workshop',
    expectedPath: 'crafts/precision_mechanism.webp',
    description: 'Complex golden clockwork mechanism with tiny gears, cartoon tech',
  },
  {
    id: 'refined_component',
    name: 'Refined Component',
    category: 'crafts',
    subcategory: 'workshop',
    expectedPath: 'crafts/refined_component.webp',
    description: 'Shiny silver mechanical component part, cartoon precision item',
  },
  {
    id: 'mechanical_tool',
    name: 'Mechanical Tool',
    category: 'crafts',
    subcategory: 'workshop',
    expectedPath: 'crafts/mechanical_tool.webp',
    description: 'Metal wrench or pliers tool, cartoon workshop equipment',
  },
  {
    id: 'crystal_lens',
    name: 'Crystal Lens',
    category: 'crafts',
    subcategory: 'workshop',
    expectedPath: 'crafts/crystal_lens.webp',
    description: 'Round clear crystal lens with sparkle, cartoon optic item',
  },
  {
    id: 'rope',
    name: 'Rope',
    category: 'rare',
    expectedPath: 'rare/rope.webp',
    description: 'Coil of tan twisted rope, simple cartoon supply',
  },
  {
    id: 'leather_strap',
    name: 'Leather Strap',
    category: 'rare',
    expectedPath: 'rare/leather_strap.webp',
    description: 'Brown leather belt strap with buckle, cartoon accessory',
  },
  {
    id: 'leather_gear',
    name: 'Leather Gear',
    category: 'crafts',
    subcategory: 'workshop',
    expectedPath: 'crafts/leather_gear.webp',
    description: 'Brown leather bag or pouch, cartoon adventure gear',
  },
  {
    id: 'bamboo_basket',
    name: 'Bamboo Basket',
    category: 'crafts',
    subcategory: 'workshop',
    expectedPath: 'crafts/bamboo_basket.webp',
    description:
      'Handwoven basket combining bamboo strips and reeds, sturdy and decorative with visible weave texture',
  },
  {
    id: 'moonwood_panel',
    name: 'Moonwood Panel',
    category: 'crafts',
    subcategory: 'workshop',
    expectedPath: 'crafts/moonwood_panel.webp',
    description:
      'Premium construction material crafted from rare moonwood. Pale silvery wood panel with a subtle lunar glow',
  },
  {
    id: 'plank',
    name: 'Plank',
    category: 'rare',
    expectedPath: 'rare/plank.webp',
    description: 'Single flat wooden plank board, simple cartoon lumber',
  },
  {
    id: 'screw',
    name: 'Screw',
    category: 'rare',
    expectedPath: 'rare/screw.webp',
    description: 'Silver metal screw with spiral threads, cartoon hardware',
  },
  {
    id: 'stone_mortar',
    name: 'Stone Mortar',
    category: 'crafts',
    subcategory: 'workshop',
    expectedPath: 'crafts/stone_mortar.webp',
    description:
      'Heavy carved stone mortar and pestle used for grinding herbs and spices. A sturdy gray stone bowl with a matching grinding tool.',
  },
  {
    id: 'sunflower_arrangement',
    name: 'Sunflower Arrangement',
    category: 'crafts',
    subcategory: 'workshop',
    expectedPath: 'crafts/sunflower_arrangement.webp',
    description:
      'A decorative bouquet of bright yellow sunflowers arranged with lavender sprigs in a woven reed vase.',
  },

  // === CRAFTS - Silk Atelier ===
  {
    id: 'silk_cloth',
    name: 'Silk Cloth',
    category: 'crafts',
    subcategory: 'silk_atelier',
    expectedPath: 'crafts/silk_cloth.webp',
    description: 'Folded shimmering pink silk fabric, elegant cartoon textile',
  },
  {
    id: 'silk_scarf',
    name: 'Silk Scarf',
    category: 'crafts',
    subcategory: 'silk_atelier',
    expectedPath: 'crafts/silk_scarf.webp',
    description: 'Flowing colorful silk scarf with pattern, elegant cartoon accessory',
  },
  {
    id: 'couture_gown',
    name: 'Couture Gown',
    category: 'crafts',
    subcategory: 'silk_atelier',
    expectedPath: 'crafts/couture_gown.webp',
    description: 'Elegant flowing ball gown dress, fancy cartoon fashion',
  },
  {
    id: 'silk_ribbon',
    name: 'Silk Ribbon',
    category: 'crafts',
    subcategory: 'silk_atelier',
    expectedPath: 'crafts/silk_ribbon.webp',
    description:
      'Delicate silk ribbon with lustrous sheen, rolled on small spool, catches light beautifully',
  },

  // === CRAFTS - Loom ===
  {
    id: 'cloth',
    name: 'Cloth',
    category: 'crafts',
    subcategory: 'loom',
    expectedPath: 'crafts/cloth.webp',
    description: 'Roll of plain woven fabric cloth, simple cartoon textile',
  },
  {
    id: 'reed_cloth',
    name: 'Reed Cloth',
    category: 'crafts',
    subcategory: 'loom',
    expectedPath: 'crafts/reed_cloth.webp',
    description: 'Tan woven reed fiber cloth, natural cartoon textile',
  },
  {
    id: 'fine_cloth',
    name: 'Fine Cloth',
    category: 'crafts',
    subcategory: 'loom',
    expectedPath: 'crafts/fine_cloth.webp',
    description: 'Folded smooth white fine fabric, premium cartoon textile',
  },
  {
    id: 'bamboo_silk',
    name: 'Bamboo Silk',
    category: 'crafts',
    subcategory: 'loom',
    expectedPath: 'crafts/bamboo_silk.webp',
    description: 'Shimmering pale green bamboo silk fabric, elegant cartoon textile',
  },
  {
    id: 'wool_blanket',
    name: 'Wool Blanket',
    category: 'crafts',
    subcategory: 'loom',
    expectedPath: 'crafts/wool_blanket.webp',
    description:
      'Cozy handwoven wool blanket with cotton trim, soft texture in warm earth tones, folded neatly',
  },
  {
    id: 'stone_slab',
    name: 'Stone Slab',
    category: 'crafts',
    subcategory: 'workshop',
    expectedPath: 'crafts/stone_slab.webp',
    description:
      'Flat rectangular slab of hewn grey stone with visible chisel marks. A sturdy construction foundation piece.',
  },
  {
    id: 'stone_chisel',
    name: 'Stone Chisel',
    category: 'crafts',
    subcategory: 'workshop',
    expectedPath: 'crafts/stone_chisel.webp',
    description:
      'Sharp iron-tipped chisel with a wooden handle, used for precision stone carving. Metal tool with stone dust particles.',
  },
  {
    id: 'resin_varnish',
    name: 'Resin Varnish',
    category: 'crafts',
    subcategory: 'workshop',
    expectedPath: 'crafts/resin_varnish.webp',
    description:
      'Amber glass bottle of glossy golden resin varnish with a cork stopper and a small brush resting beside it, warm cartoon crafting supply',
  },
  {
    id: 'iron_reinforcements',
    name: 'Iron Reinforcements',
    category: 'crafts',
    subcategory: 'workshop',
    expectedPath: 'crafts/iron_reinforcements.webp',
    description:
      'Bundle of dark iron brackets, braces, and bolts tied together with resin-treated wooden strips, sturdy cartoon metalwork supplies',
  },
  {
    id: 'berry_dye',
    name: 'Berry Dye',
    category: 'crafts',
    subcategory: 'workshop',
    expectedPath: 'crafts/berry_dye.webp',
    description:
      'Small clay pot of vibrant purple-red berry dye with a wooden stirring stick, crushed berry stains on the rim, colorful cartoon crafting pigment',
  },
  {
    id: 'quartz_polish',
    name: 'Quartz Polish',
    category: 'crafts',
    subcategory: 'workshop',
    expectedPath: 'crafts/quartz_polish.webp',
    description:
      'Small open jar of pale silvery-white polishing paste ground from raw quartz, with a soft cloth folded beside it and a faint crystalline shimmer on the surface, cartoon crafting supply',
  },
  {
    id: 'amber_resin_candle',
    name: 'Amber Resin Candle',
    category: 'crafts',
    subcategory: 'workshop',
    expectedPath: 'crafts/amber_resin_candle.webp',
    description:
      'Tall golden resin candle with chips of raw amber suspended inside the wax and a warm glowing flame on top, soft pine-honey aura, cozy cartoon decor',
  },

  // === CRAFTS - Furnace ===
  {
    id: 'bricks',
    name: 'Bricks',
    category: 'rare',
    expectedPath: 'rare/bricks.webp',
    description: 'Stack of bright red clay bricks, simple cartoon building blocks',
  },
  {
    id: 'iron_bar',
    name: 'Iron Bar',
    category: 'rare',
    expectedPath: 'rare/iron_bar.webp',
    description: 'Dark grey iron ingot bar, shiny cartoon metal',
  },
  {
    id: 'steel_bar',
    name: 'Steel Bar',
    category: 'crafts',
    subcategory: 'furnace',
    expectedPath: 'crafts/steel_bar.webp',
    description: 'Shiny silver steel ingot bar, polished cartoon metal',
  },
  {
    id: 'stone_bricks',
    name: 'Stone Bricks',
    category: 'crafts',
    subcategory: 'furnace',
    expectedPath: 'crafts/stone_bricks.webp',
    description: 'Stack of grey cut stone bricks, sturdy cartoon blocks',
  },
  {
    id: 'decorative_tile',
    name: 'Decorative Tile',
    category: 'crafts',
    subcategory: 'furnace',
    expectedPath: 'crafts/decorative_tile.webp',
    description:
      'Beautiful glazed ceramic tile with intricate patterns, hand-painted floral or geometric design, glossy finish',
  },
  {
    id: 'luminescent_bar',
    name: 'Luminescent Bar',
    category: 'crafts',
    subcategory: 'furnace',
    expectedPath: 'crafts/luminescent_bar.webp',
    description: 'Rare glowing metal bar smelted from glowing ore. Emits a soft ethereal light',
  },
  {
    id: 'iron_fittings',
    name: 'Iron Fittings',
    category: 'crafts',
    subcategory: 'furnace',
    expectedPath: 'crafts/iron_fittings.webp',
    description:
      'Small forged metal pieces used for construction and repairs. Assorted iron nails, brackets, and hinges with a dark metallic finish.',
  },
  {
    id: 'tempered_pottery',
    name: 'Tempered Pottery',
    category: 'crafts',
    subcategory: 'furnace',
    expectedPath: 'crafts/tempered_pottery.webp',
    description:
      'High-fired ceramic strengthened with iron particles. A sturdy reddish-brown pot or vessel with dark metallic flecks visible in the glaze.',
  },
  {
    id: 'glazed_ceramics',
    name: 'Glazed Ceramics',
    category: 'crafts',
    subcategory: 'furnace',
    expectedPath: 'crafts/glazed_ceramics.webp',
    description:
      'Decorative pottery with a shiny honey-based glaze. An elegant vase or bowl with a warm amber finish and smooth lustrous surface.',
  },
  {
    id: 'iron_chain',
    name: 'Iron Chain',
    category: 'crafts',
    subcategory: 'furnace',
    expectedPath: 'crafts/iron_chain.webp',
    description:
      'Dark iron chain links forged together in a furnace. Heavy-duty industrial chain with a dark metallic sheen.',
  },
  {
    id: 'ore_bricks',
    name: 'Ore Bricks',
    category: 'crafts',
    subcategory: 'furnace',
    expectedPath: 'crafts/ore_bricks.webp',
    description:
      'Dense bricks made from compressed iron ore, stone, and coal. Dark reddish-brown with metallic specks throughout.',
  },

  // === CRAFTS - Oil Press ===
  {
    id: 'sunflower_oil',
    name: 'Sunflower Oil',
    category: 'crafts',
    subcategory: 'oil_press',
    expectedPath: 'crafts/sunflower_oil.webp',
    description: 'Glass bottle of golden yellow sunflower oil, cartoon cooking oil',
  },
  {
    id: 'lavender_oil',
    name: 'Lavender Oil',
    category: 'crafts',
    subcategory: 'oil_press',
    expectedPath: 'crafts/lavender_oil.webp',
    description: 'Small bottle of purple lavender essential oil, cartoon aromatherapy',
  },
  {
    id: 'perfume',
    name: 'Perfume',
    category: 'crafts',
    subcategory: 'oil_press',
    expectedPath: 'crafts/perfume.webp',
    description: 'Fancy glass perfume bottle with spray pump, elegant cartoon cosmetic',
  },
  {
    id: 'chili_oil',
    name: 'Chili Oil',
    category: 'crafts',
    subcategory: 'oil_press',
    expectedPath: 'crafts/chili_oil.webp',
    description:
      'Spicy infused oil with visible chili flakes, red-orange oil in glass bottle, chili peppers floating inside',
  },
  {
    id: 'night_blossom_perfume',
    name: 'Night Blossom Perfume',
    category: 'crafts',
    subcategory: 'oil_press',
    expectedPath: 'crafts/night_blossom_perfume.webp',
    description:
      'Rare floral essence extracted from night blossoms. Elegant dark perfume bottle with purple/blue tones',
  },
  {
    id: 'fish_oil',
    name: 'Fish Oil',
    category: 'crafts',
    subcategory: 'oil_press',
    expectedPath: 'crafts/fish_oil.webp',
    description:
      'Clear golden fish oil in a small round glass bottle with cork stopper, rich amber liquid with a faint sheen, cartoon cooking ingredient',
  },

  // === CRAFTS - Tea House ===
  {
    id: 'ceremonial_tea',
    name: 'Ceremonial Tea',
    category: 'crafts',
    subcategory: 'tea_house',
    expectedPath: 'crafts/ceremonial_tea.webp',
    description: 'Traditional green matcha tea in ceramic bowl, elegant cartoon drink',
  },
  {
    id: 'berry_smoothie',
    name: 'Berry Smoothie',
    category: 'crafts',
    subcategory: 'tea_house',
    expectedPath: 'crafts/berry_smoothie.webp',
    description: 'Tall glass of purple berry smoothie with straw, refreshing cartoon drink',
  },
  {
    id: 'herbal_tea',
    name: 'Herbal Tea',
    category: 'crafts',
    subcategory: 'tea_house',
    expectedPath: 'crafts/herbal_tea.webp',
    description: 'Steaming cup of golden herbal tea with steam wisps, cozy cartoon drink',
  },
  {
    id: 'water_plant_tea',
    name: 'Water Plant Tea',
    category: 'crafts',
    subcategory: 'tea_house',
    expectedPath: 'crafts/water_plant_tea.webp',
    description: 'Cup of light green water plant tea, unique cartoon drink',
  },
  {
    id: 'spiced_tea',
    name: 'Spiced Tea',
    category: 'crafts',
    subcategory: 'tea_house',
    expectedPath: 'crafts/spiced_tea.webp',
    description: 'Cup of warm orange-brown spiced chai tea with cinnamon stick, cartoon drink',
  },
  {
    id: 'bamboo_tea_whisk',
    name: 'Bamboo Tea Whisk',
    category: 'crafts',
    subcategory: 'tea_house',
    expectedPath: 'crafts/bamboo_tea_whisk.webp',
    description:
      'A traditional tea whisk carefully carved from bamboo. Its fine tines create the perfect froth for ceremonial brews.',
  },
  {
    id: 'bamboo_lantern',
    name: 'Bamboo Lantern',
    category: 'crafts',
    subcategory: 'furnace',
    expectedPath: 'crafts/bamboo_lantern.webp',
    description:
      'A decorative lantern with a bamboo frame and polished glass panels. Its warm glow and natural charm make it a sought-after furnishing.',
  },
  {
    id: 'amber_toffee',
    name: 'Amber Toffee',
    category: 'crafts',
    subcategory: 'confectioner',
    expectedPath: 'crafts/amber_toffee.webp',
    description:
      'Rich, chewy toffee made with amber sap\'s distinctive sweetness. The golden pieces have a deep, caramelized flavour with a hint of forest resin.',
  },
  {
    id: 'saffron_tea',
    name: 'Saffron Tea',
    category: 'crafts',
    subcategory: 'tea_house',
    expectedPath: 'crafts/saffron_tea.webp',
    description:
      'A golden-hued brew steeped with rare saffron petals and fresh spring water. The delicate floral aroma makes it a prized cup among tea connoisseurs.',
  },
  {
    id: 'saffron_cloth',
    name: 'Saffron Cloth',
    category: 'crafts',
    subcategory: 'loom',
    expectedPath: 'crafts/saffron_cloth.webp',
    description:
      'A luxurious fabric dyed with precious saffron blossoms, producing a rich golden hue. Historically one of the most coveted natural dyes in the world.',
  },
  {
    id: 'saffron_salve',
    name: 'Saffron Salve',
    category: 'crafts',
    subcategory: 'apothecary',
    expectedPath: 'crafts/saffron_salve.webp',
    description:
      'A soothing herbal salve blending rare saffron petals with fragrant lavender and pure spring water. Known for its restorative and calming properties.',
  },
  {
    id: 'saffron_syrup',
    name: 'Saffron Syrup',
    category: 'crafts',
    subcategory: 'distillery',
    expectedPath: 'crafts/saffron_syrup.webp',
    description:
      'A rich, golden syrup slowly distilled from saffron blossoms and sweetened with wildflower honey. Its intense colour and complex flavour elevate any dish.',
  },
  {
    id: 'pineapple_juice',
    name: 'Pineapple Juice',
    category: 'crafts',
    subcategory: 'tea_house',
    expectedPath: 'crafts/pineapple_juice.webp',
    description: 'Tall glass of bright yellow pineapple juice, tropical cartoon drink',
  },
  {
    id: 'refreshing_tonic',
    name: 'Refreshing Tonic',
    category: 'crafts',
    subcategory: 'tea_house',
    expectedPath: 'crafts/refreshing_tonic.webp',
    description:
      'Sparkling light pink beverage in a tall glass with berries floating inside, garnished with a honey swirl. Refreshing and elegant',
  },
  {
    id: 'mineral_tea',
    name: 'Mineral Tea',
    category: 'crafts',
    subcategory: 'tea_house',
    expectedPath: 'crafts/mineral_tea.webp',
    description:
      'Sparkling mineral-infused tea served in a delicate cup. Clear tea with tiny bubbles and a crystalline shimmer',
  },
  {
    id: 'soy_latte',
    name: 'Soy Latte',
    category: 'crafts',
    subcategory: 'tea_house',
    expectedPath: 'crafts/soy_latte.webp',
    description:
      'Creamy dairy-free coffee drink with steamed soy milk. Served in a tall glass with latte art',
  },
  {
    id: 'yogurt_smoothie',
    name: 'Yogurt Smoothie',
    category: 'crafts',
    subcategory: 'tea_house',
    expectedPath: 'crafts/yogurt_smoothie.webp',
    description:
      'Thick purple berry smoothie in a tall glass, blended with yogurt and honey. Fresh berries on top',
  },
  {
    id: 'spring_water_tonic',
    name: 'Spring Water Tonic',
    category: 'crafts',
    subcategory: 'tea_house',
    expectedPath: 'crafts/spring_water_tonic.webp',
    description:
      'Tall clear glass bottle of sparkling spring water infused with pale tea and floating sprigs of purple lavender, refreshing cartoon herbal tonic',
  },
  {
    id: 'vanilla_tea',
    name: 'Vanilla Tea',
    category: 'crafts',
    subcategory: 'tea_house',
    expectedPath: 'crafts/vanilla_tea.webp',
    description:
      'A fragrant blend of hand-picked tea leaves steeped with a whole vanilla orchid bloom. The honey rounds out the floral aroma into a smooth, luxurious cup.',
  },
  {
    id: 'moonpetal_tea',
    name: 'Moonpetal Tea',
    category: 'crafts',
    subcategory: 'tea_house',
    expectedPath: 'crafts/moonpetal_tea.webp',
    description:
      'Pale fragrant moonpetal tea in a delicate cup, lightly sweetened with honey, elegant cartoon drink',
  },

  // === CRAFTS - Confectioner ===
  {
    id: 'chocolate_bar',
    name: 'Chocolate Bar',
    category: 'crafts',
    subcategory: 'confectioner',
    expectedPath: 'crafts/chocolate_bar.webp',
    description: 'Unwrapped dark brown chocolate bar with segments, shiny cartoon candy',
  },
  {
    id: 'rice_cake',
    name: 'Rice Cake',
    category: 'crafts',
    subcategory: 'confectioner',
    expectedPath: 'crafts/rice_cake.webp',
    description: 'Round white rice cake with pink flower decoration, soft cartoon dessert',
  },
  {
    id: 'berry_tart',
    name: 'Berry Tart',
    category: 'crafts',
    subcategory: 'confectioner',
    expectedPath: 'crafts/berry_tart.webp',
    description: 'Golden pastry tart topped with colorful berries, cartoon dessert',
  },
  {
    id: 'vanilla_truffle',
    name: 'Vanilla Truffle',
    category: 'crafts',
    subcategory: 'confectioner',
    expectedPath: 'crafts/vanilla_truffle.webp',
    description: 'Round white chocolate truffle with swirl top, elegant cartoon candy',
  },
  {
    id: 'caramel_candy',
    name: 'Caramel Candy',
    category: 'crafts',
    subcategory: 'confectioner',
    expectedPath: 'crafts/caramel_candy.webp',
    description: 'Wrapped golden caramel candy piece, shiny cartoon sweet',
  },
  {
    id: 'coffee_cake',
    name: 'Coffee Cake',
    category: 'crafts',
    subcategory: 'confectioner',
    expectedPath: 'crafts/coffee_cake.webp',
    description: 'Slice of brown coffee cake with crumb topping, cartoon dessert',
  },
  {
    id: 'mochi',
    name: 'Mochi',
    category: 'crafts',
    subcategory: 'confectioner',
    expectedPath: 'crafts/mochi.webp',
    description: 'Soft round pastel colored mochi balls, cute cartoon Japanese sweet',
  },
  {
    id: 'gilded_cacao',
    name: 'Gilded Cacao',
    category: 'crafts',
    subcategory: 'confectioner',
    expectedPath: 'crafts/gilded_cacao.webp',
    description: 'Dark chocolate bonbon with gold leaf decoration, luxury cartoon candy',
  },
  {
    id: 'saffron_delight',
    name: 'Saffron Delight',
    category: 'crafts',
    subcategory: 'confectioner',
    expectedPath: 'crafts/saffron_delight.webp',
    description: 'Golden yellow saffron sweet cube, exotic cartoon confection',
  },
  {
    id: 'royal_saffron_cake',
    name: 'Royal Saffron Cake',
    category: 'crafts',
    subcategory: 'confectioner',
    expectedPath: 'crafts/royal_saffron_cake.webp',
    description: 'Elegant golden saffron layer cake with fancy decoration, luxury cartoon dessert',
  },
  {
    id: 'amber_glaze',
    name: 'Amber Glaze',
    category: 'crafts',
    subcategory: 'confectioner',
    expectedPath: 'crafts/amber_glaze.webp',
    description:
      'Glistening golden-amber glaze in a small pot or drizzled, with rich caramel-like color and translucent shine',
  },
  {
    id: 'glowing_candy',
    name: 'Glowing Candy',
    category: 'crafts',
    subcategory: 'confectioner',
    expectedPath: 'crafts/glowing_candy.webp',
    description:
      'Luminescent novelty sweet that glows softly. Translucent candy with a green/blue glow',
  },
  {
    id: 'vanilla_bonbon',
    name: 'Vanilla Bonbon',
    category: 'crafts',
    subcategory: 'confectioner',
    expectedPath: 'crafts/vanilla_bonbon.webp',
    description:
      'Hand-rolled chocolate shells filled with a velvety vanilla orchid cream. Each bonbon is dusted with fine sugar for a delicate crunch.',
  },
  {
    id: 'goldroot_confection',
    name: 'Goldroot Confection',
    category: 'crafts',
    subcategory: 'confectioner',
    expectedPath: 'crafts/goldroot_confection.webp',
    description:
      'Gilded chocolate confection with a sugar-spun shell and earthy goldroot center, premium cartoon sweet',
  },

  // === CRAFTS - Seasonal ===
  {
    id: 'hot_pot',
    name: 'Hot Pot',
    category: 'crafts',
    subcategory: 'seasonal',
    expectedPath: 'crafts/hot_pot.webp',
    description: 'Bubbling red hot pot with steam and ingredients visible, cartoon Asian dish',
  },
  {
    id: 'santas_oats',
    name: "Santa's Oats",
    category: 'crafts',
    subcategory: 'seasonal',
    expectedPath: 'crafts/santa_s_oats.webp',
    description: 'Red festive bowl of oats with candy cane, Christmas cartoon treat',
  },
  {
    id: 'gingerbread',
    name: 'Gingerbread',
    category: 'crafts',
    subcategory: 'seasonal',
    expectedPath: 'crafts/gingerbread.webp',
    description: 'Brown gingerbread man cookie with white icing decorations, festive cartoon',
  },

  // === CRAFTS - Animal Products ===
  {
    id: 'egg',
    name: 'Egg',
    category: 'animal-products',
    expectedPath: 'animal-products/egg.webp',
    description: 'Smooth white or brown farm egg, simple cartoon oval',
  },
  {
    id: 'pork',
    name: 'Pork',
    category: 'animal-products',
    expectedPath: 'animal-products/pork.webp',
    description: 'Pink raw pork chop cut with bone, cartoon meat',
  },
  {
    id: 'wool',
    name: 'Wool',
    category: 'animal-products',
    expectedPath: 'animal-products/wool.webp',
    description: 'Fluffy white cloud of sheep wool, soft cartoon material',
  },
  {
    id: 'honey',
    name: 'Honey',
    category: 'animal-products',
    expectedPath: 'animal-products/honey.webp',
    description: 'Glass jar filled with golden honey and dipper, cartoon sweetener',
  },
  {
    id: 'silk_thread',
    name: 'Silk Thread',
    category: 'animal-products',
    expectedPath: 'animal-products/silk_thread.webp',
    description: 'Spool of shimmering white silk thread, delicate cartoon material',
  },
  {
    id: 'wild_honeycomb',
    name: 'Wild Honeycomb',
    category: 'crafts',
    subcategory: 'animal_products',
    expectedPath: 'crafts/wild_honeycomb.webp',
    description: 'Chunk of golden honeycomb with dripping honey, natural cartoon sweet',
  },

  // === CRAFTS - Premium ===
  {
    id: 'fruit_salad',
    name: 'Fruit Salad',
    category: 'crafts',
    subcategory: 'premium',
    expectedPath: 'crafts/fruit_salad.webp',
    description: 'Bowl of colorful mixed fruit pieces, fresh cartoon healthy dish',
  },
  {
    id: 'tropical_parfait',
    name: 'Tropical Parfait',
    category: 'crafts',
    subcategory: 'premium',
    expectedPath: 'crafts/tropical_parfait.webp',
    description: 'Glass with layered tropical fruit and cream, colorful cartoon dessert',
  },
  {
    id: 'amber_sap',
    name: 'Amber Sap',
    category: 'crafts',
    subcategory: 'premium',
    expectedPath: 'crafts/amber_sap.webp',
    description:
      'Refined clear golden amber sap, translucent gem-like droplet with bright golden-yellow color, polished and precious, sparkling shine, cartoon material',
  },
  {
    id: 'starlight_resin',
    name: 'Starlight Resin',
    category: 'crafts',
    subcategory: 'premium',
    expectedPath: 'crafts/starlight_resin.webp',
    description: 'Glowing blue-white magical resin crystal, sparkling cartoon gem',
  },

  // === CRAFTS - Pickling Station ===
  {
    id: 'pickled_peppers',
    name: 'Pickled Peppers',
    category: 'crafts',
    subcategory: 'pickling_station',
    expectedPath: 'crafts/pickled_peppers.webp',
    description:
      'Colorful bell peppers preserved in tangy brine, glass jar filled with red yellow and green pepper slices in clear liquid',
  },
  {
    id: 'pickled_carrots',
    name: 'Pickled Carrots',
    category: 'crafts',
    subcategory: 'pickling_station',
    expectedPath: 'crafts/pickled_carrots.webp',
    description:
      'Crisp carrot sticks pickled with onion and spices, bright orange carrots in jar with visible spice flecks',
  },
  {
    id: 'sauerkraut',
    name: 'Sauerkraut',
    category: 'crafts',
    subcategory: 'pickling_station',
    expectedPath: 'crafts/sauerkraut.webp',
    description:
      'Fermented shredded cabbage with tangy flavor, pale green-white strands in ceramic crock, slightly translucent',
  },
  {
    id: 'kimchi',
    name: 'Kimchi',
    category: 'crafts',
    subcategory: 'pickling_station',
    expectedPath: 'crafts/kimchi.webp',
    description:
      'Spicy Korean fermented vegetables with vibrant red color, chunky mixture of cabbage and radish coated in chili paste',
  },

  // === CRAFTS - Apothecary ===
  {
    id: 'herbal_salve',
    name: 'Herbal Salve',
    category: 'crafts',
    subcategory: 'apothecary',
    expectedPath: 'crafts/herbal_salve.webp',
    description:
      'Soothing green healing balm in small tin container, thick creamy texture with visible herb flecks',
  },
  {
    id: 'calming_balm',
    name: 'Calming Balm',
    category: 'crafts',
    subcategory: 'apothecary',
    expectedPath: 'crafts/calming_balm.webp',
    description:
      'Lavender-infused purple balm that promotes relaxation, smooth texture in glass jar with cork lid',
  },
  {
    id: 'energy_tonic',
    name: 'Energy Tonic',
    category: 'crafts',
    subcategory: 'apothecary',
    expectedPath: 'crafts/energy_tonic.webp',
    description:
      'Vibrant amber liquid that sparkles with energy, small bottle with lightning-like glow, coffee and honey notes',
  },
  {
    id: 'amber_elixir',
    name: 'Amber Elixir',
    category: 'crafts',
    subcategory: 'apothecary',
    expectedPath: 'crafts/amber_elixir.webp',
    description:
      'Golden-orange potion made from amber sap, thick syrupy consistency in ornate glass flask with warm glow',
  },
  {
    id: 'master_tonic',
    name: 'Master Tonic',
    category: 'crafts',
    subcategory: 'apothecary',
    expectedPath: 'crafts/master_tonic.webp',
    description:
      'Legendary healing potion with swirling rainbow colors, rare ingredients create shimmering otherworldly appearance',
  },
  {
    id: 'cave_moss_poultice',
    name: 'Cave Moss Poultice',
    category: 'crafts',
    subcategory: 'apothecary',
    expectedPath: 'crafts/cave_moss_poultice.webp',
    description:
      'Healing herbal wrap made from cave moss and mineral water. Green mossy bandage with crystalline specks',
  },
  {
    id: 'tea_remedy',
    name: 'Tea Remedy',
    category: 'crafts',
    subcategory: 'apothecary',
    expectedPath: 'crafts/tea_remedy.webp',
    description:
      'A medicinal tea brew steeped with healing water plants and sweetened with honey. Served in a small apothecary bottle.',
  },
  {
    id: 'soothing_tea_balm',
    name: 'Soothing Tea Balm',
    category: 'crafts',
    subcategory: 'apothecary',
    expectedPath: 'crafts/soothing_tea_balm.webp',
    description:
      'A creamy herbal balm made from tea leaves infused into goat butter with lavender. A small tin of pale green salve.',
  },
  {
    id: 'vanilla_balm',
    name: 'Vanilla Balm',
    category: 'crafts',
    subcategory: 'apothecary',
    expectedPath: 'crafts/vanilla_balm.webp',
    description:
      'A soothing herbal balm made by slowly infusing rare vanilla orchid petals into warm honey and spring water. Prized for its calming fragrance.',
  },
  {
    id: 'moonpetal_perfume',
    name: 'Moonpetal Perfume',
    category: 'crafts',
    subcategory: 'apothecary',
    expectedPath: 'crafts/moonpetal_perfume.webp',
    description:
      'Elegant perfume bottle with distilled moonpetal and lavender essence, soft floral cartoon apothecary item',
  },
  {
    id: 'goldroot_tonic',
    name: 'Goldroot Tonic',
    category: 'crafts',
    subcategory: 'apothecary',
    expectedPath: 'crafts/goldroot_tonic.webp',
    description:
      'Mineral-rich restorative tonic in a sturdy vial, warm golden liquid with subtle glow, cartoon potion',
  },
  {
    id: 'ruby_vitality_tonic',
    name: 'Ruby Vitality Tonic',
    category: 'crafts',
    subcategory: 'apothecary',
    expectedPath: 'crafts/ruby_vitality_tonic.webp',
    description:
      'Slim apothecary flask of fiery red elixir with crushed raw ruby flecks suspended inside, warm honey glow at the base and a cork stopper, cartoon potion',
  },
  {
    id: 'sapphire_cooling_salve',
    name: 'Sapphire Cooling Salve',
    category: 'crafts',
    subcategory: 'apothecary',
    expectedPath: 'crafts/sapphire_cooling_salve.webp',
    description:
      'Open glass jar of cool blue salve flecked with crushed sapphire and lavender sprigs, soft frosty sheen, soothing cartoon apothecary balm',
  },

  // === CRAFTS - Distillery ===
  {
    id: 'grape_wine',
    name: 'Grape Wine',
    category: 'crafts',
    subcategory: 'distillery',
    expectedPath: 'crafts/grape_wine.webp',
    description:
      'Rich red wine in elegant glass bottle, deep burgundy color aged to perfection with cork stopper',
  },
  {
    id: 'vanilla_extract',
    name: 'Vanilla Extract',
    category: 'crafts',
    subcategory: 'distillery',
    expectedPath: 'crafts/vanilla_extract.webp',
    description:
      'Pure vanilla essence in dark amber bottle, rich brown liquid with dropper cap, intensely aromatic',
  },
  {
    id: 'amber_spirits',
    name: 'Amber Spirits',
    category: 'crafts',
    subcategory: 'distillery',
    expectedPath: 'crafts/amber_spirits.webp',
    description:
      'Premium distilled spirit with golden-amber hue, crystal decanter with faceted stopper, warm honey tones',
  },
  {
    id: 'celestial_nectar',
    name: 'Celestial Nectar',
    category: 'crafts',
    subcategory: 'distillery',
    expectedPath: 'crafts/celestial_nectar.webp',
    description:
      'Legendary spirit with swirling galaxy-like patterns, deep purple-blue with golden starlight sparkles inside',
  },
  {
    id: 'starlight_spirits',
    name: 'Starlight Spirits',
    category: 'crafts',
    subcategory: 'distillery',
    expectedPath: 'crafts/starlight_spirits.webp',
    description:
      'Ethereal distilled beverage made from starlight sap. A bottle with shimmering, starry liquid inside',
  },

  // === CRAFTS - Glassworks ===
  {
    id: 'stained_glass',
    name: 'Stained Glass Pane',
    category: 'crafts',
    subcategory: 'glassworks',
    expectedPath: 'crafts/stained_glass.webp',
    description:
      'Vibrant stained glass pane with saffron and night-blossom pigments, luminous cartoon craft',
  },
  {
    id: 'moonpetal_vial',
    name: 'Moonpetal Vial',
    category: 'crafts',
    subcategory: 'glassworks',
    expectedPath: 'crafts/moonpetal_vial.webp',
    description:
      'Delicate hand-blown vial containing softly glowing moonpetal essence, refined cartoon glasswork',
  },
  {
    id: 'prism_sculpture',
    name: 'Prism Sculpture',
    category: 'crafts',
    subcategory: 'glassworks',
    expectedPath: 'crafts/prism_sculpture.webp',
    description:
      'Precision-cut crystal prism sculpture with rainbow refraction sparkle, premium cartoon decor',
  },
  {
    id: 'moonglass_decanter',
    name: 'Moonglass Decanter',
    category: 'crafts',
    subcategory: 'glassworks',
    expectedPath: 'crafts/moonglass_decanter.webp',
    description:
      'Luminous moonglass decanter shimmering with bottled starlight, elegant cartoon vessel',
  },
  {
    id: 'diamond_dust_glaze',
    name: 'Diamond Dust Glaze',
    category: 'crafts',
    subcategory: 'glassworks',
    expectedPath: 'crafts/diamond_dust_glaze.webp',
    description:
      'Small open glassworks pot of clear starlight-sap glaze sparkling with crushed diamond shards, glittering rainbow facets catching the light, premium cartoon glaze',
  },

  // === CRAFTS - Jewelry Atelier ===
  {
    id: 'goldroot_bangle',
    name: 'Goldroot Bangle',
    category: 'crafts',
    subcategory: 'jewelry_atelier',
    expectedPath: 'crafts/goldroot_bangle.webp',
    description:
      'Polished bangle braided from refined goldroot fibers with amber setting, luxurious cartoon jewelry',
  },
  {
    id: 'moonstone_ring',
    name: 'Moonstone Ring',
    category: 'crafts',
    subcategory: 'jewelry_atelier',
    expectedPath: 'crafts/moonstone_ring.webp',
    description:
      'Silver ring set with softly glowing moonstone quartz, delicate high-tier cartoon jewelry',
  },
  {
    id: 'saffron_pendant',
    name: 'Saffron Pendant',
    category: 'crafts',
    subcategory: 'jewelry_atelier',
    expectedPath: 'crafts/saffron_pendant.webp',
    description:
      'Regal amber pendant framed in spun gold with saffron thread inside, ornate cartoon jewel',
  },
  {
    id: 'crown_of_embers',
    name: 'Crown of Embers',
    category: 'crafts',
    subcategory: 'jewelry_atelier',
    expectedPath: 'crafts/crown_of_embers.webp',
    description:
      'Masterwork gilded crown with prism facets and ruby ember core, legendary cartoon jewelry',
  },
  {
    id: 'sapphire_tiara',
    name: 'Sapphire Tiara',
    category: 'crafts',
    subcategory: 'jewelry_atelier',
    expectedPath: 'crafts/sapphire_tiara.webp',
    description:
      'Delicate silver tiara with thin scrollwork crowned by a single faceted cut sapphire, faint moonpetal essence haloing the gem, elegant cartoon jewelry',
  },

  // === CRAFTS - Clockmaker ===
  {
    id: 'pocket_watch',
    name: 'Pocket Watch',
    category: 'crafts',
    subcategory: 'clockmaker',
    expectedPath: 'crafts/pocket_watch.webp',
    description:
      'Classic silver pocket watch on chain, polished case with visible Roman numeral face, precise tick marks',
  },
  {
    id: 'ornate_clock',
    name: 'Ornate Clock',
    category: 'crafts',
    subcategory: 'clockmaker',
    expectedPath: 'crafts/ornate_clock.webp',
    description:
      'Decorative wooden mantel clock with intricate carvings, brass accents, pendulum visible through glass panel',
  },
  {
    id: 'music_box',
    name: 'Music Box',
    category: 'crafts',
    subcategory: 'clockmaker',
    expectedPath: 'crafts/music_box.webp',
    description:
      'Delicate mechanical music box with silk lining, open lid reveals tiny brass cylinder and comb mechanism',
  },
  {
    id: 'grand_timepiece',
    name: 'Grand Timepiece',
    category: 'crafts',
    subcategory: 'clockmaker',
    expectedPath: 'crafts/grand_timepiece.webp',
    description:
      'Masterwork astronomical clock with celestial displays, golden gears visible, moon phase indicator, starlight crystal accents',
  },
  {
    id: 'starlit_mechanism',
    name: 'Starlit Mechanism',
    category: 'crafts',
    subcategory: 'clockmaker',
    expectedPath: 'crafts/starlit_mechanism.webp',
    description:
      'Enchanted clockwork component made from moonwood and starlight sap. Intricate gears with a celestial glow',
  },

  // === CRAFTS - Artisan Hall ===
  {
    id: 'artisan_tapestry',
    name: 'Artisan Tapestry',
    category: 'crafts',
    subcategory: 'artisan_hall',
    expectedPath: 'crafts/artisan_tapestry.webp',
    description:
      'Magnificent woven wall hanging depicting pastoral scene, rich silk and bamboo threads in vibrant colors',
  },
  {
    id: 'master_perfume',
    name: 'Master Perfume',
    category: 'crafts',
    subcategory: 'artisan_hall',
    expectedPath: 'crafts/master_perfume.webp',
    description:
      'Exquisite perfume in crystal bottle with gold filigree, complex blend of vanilla lavender and rare essences',
  },
  {
    id: 'legendary_treasure',
    name: 'Legendary Treasure',
    category: 'crafts',
    subcategory: 'artisan_hall',
    expectedPath: 'crafts/legendary_treasure.webp',
    description:
      'Ultimate masterwork combining all artisan skills, golden treasure chest containing timepiece gown and celestial nectar',
  },

  // === MISC ===
  {
    id: 'coins',
    name: 'Coins',
    category: 'misc',
    expectedPath: 'misc/coins.webp',
    description: 'Stack of shiny gold coins, chunky cartoon currency',
  },
  {
    id: 'diamonds',
    name: 'Diamonds',
    category: 'misc',
    expectedPath: 'misc/diamonds.webp',
    description: 'Cluster of sparkling blue diamonds, brilliant cartoon gems',
  },
  {
    id: 'friends',
    name: 'Friends',
    category: 'misc',
    expectedPath: 'misc/friends.webp',
    description: 'Two cheerful cartoon people silhouettes together, friendship symbol',
  },
  {
    id: 'first_steps',
    name: 'First Steps',
    category: 'misc',
    expectedPath: 'misc/first_steps.webp',
    description:
      'Bright green checklist board with a few big, simple tasks ticked off, soft green glow and small sprouting leaves around the edges to suggest early-game progress for new players.',
  },
  {
    id: 'proud_farmer',
    name: 'Proud Farmer',
    category: 'misc',
    expectedPath: 'misc/proud_farmer.webp',
    description:
      'Earned title or badge that players can display, like a small ribbon, medal, or nameplate saying "Proud Farmer" with a cheerful farm vibe, celebratory and readable at small size, cartoon style',
  },
  {
    id: 'yellow_heart',
    name: 'Yellow Heart',
    category: 'misc',
    expectedPath: 'misc/yellow_heart.webp',
    description:
      'Bright yellow heart shape resembling the yellow heart emoji, soft rounded cartoon style, friendly and recognizable at small size',
  },
  {
    id: 'checkmark',
    name: 'Checkmark',
    category: 'misc',
    expectedPath: 'misc/checkmark.webp',
    description: 'Simple checkmark or tick mark, clean and readable at small size, cartoon style',
  },
  {
    id: 'sapling',
    name: 'Sapling',
    category: 'misc',
    expectedPath: 'misc/sapling.webp',
    description: 'Small green tree sapling in pot with few leaves, cartoon plant',
  },
  {
    id: 'grow',
    name: 'Grow',
    category: 'misc',
    expectedPath: 'misc/grow.webp',
    description:
      'Young sprouting sapling with fresh green leaves growing from soil, cartoon plant growth',
  },
  {
    id: 'hourglass',
    name: 'Hourglass',
    category: 'misc',
    expectedPath: 'misc/hourglass.webp',
    description: 'Golden hourglass with falling sand, cartoon timer',
  },
  {
    id: 'map',
    name: 'Map',
    category: 'misc',
    expectedPath: 'misc/map.webp',
    description: 'Rolled parchment treasure map with red X mark, cartoon adventure item',
  },
  {
    id: 'tent',
    name: 'Tent',
    category: 'misc',
    expectedPath: 'misc/tent.webp',
    description: 'Colorful camping tent with door flap, cheerful cartoon shelter',
  },
  {
    id: 'calendar',
    name: 'Calendar',
    category: 'misc',
    expectedPath: 'misc/calendar.webp',
    description: 'Flip calendar with date number visible, simple cartoon planner',
  },
  {
    id: 'crystal_ball',
    name: 'Crystal Ball',
    category: 'misc',
    expectedPath: 'misc/crystal_ball.webp',
    description: 'Glowing purple crystal ball on stand, mystical cartoon item',
  },
  {
    id: 'trophy',
    name: 'Trophy',
    category: 'misc',
    expectedPath: 'misc/trophy.webp',
    description: 'Shiny gold trophy cup with handles, celebratory cartoon award',
  },
  {
    id: 'explorer_crew',
    name: 'Explorer Crew',
    category: 'explorer',
    expectedPath: 'misc/explorer_crew.webp',
    description: 'Group of three cartoon explorer figures with hats, adventure team',
  },
  {
    id: 'explorer_gear_tool',
    name: 'Tool',
    category: 'explorer',
    expectedPath: 'explorer/explorer_gear_tool.webp',
    description:
      'Simple cartoon handheld tool: short wooden handle with a small metal hoe or mattock head, neutral generic shape for the explorer tool gear slot, no text.',
  },
  {
    id: 'explorer_gear_armor',
    name: 'Armor',
    category: 'explorer',
    expectedPath: 'explorer/explorer_gear_armor.webp',
    description:
      'Simple cartoon explorer chest piece or padded vest silhouette, buckled straps, muted leather and cloth tones, generic armor gear slot icon, front-facing.',
  },
  {
    id: 'explorer_gear_charm',
    name: 'Charm',
    category: 'explorer',
    expectedPath: 'explorer/explorer_gear_charm.webp',
    description:
      'Simple cartoon charm pendant on a short cord: small round or teardrop talisman with a tiny soft magical sparkle, generic accessory for the explorer charm slot.',
  },
  {
    id: 'explorer_tracker',
    name: 'Tracker',
    category: 'explorer',
    expectedPath: 'explorer/explorer_tracker.webp',
    description: 'Cartoon explorer badge with a bright magnifying glass, symbol for tracking and scouting.',
  },
  {
    id: 'explorer_sprinter',
    name: 'Sprinter',
    category: 'explorer',
    expectedPath: 'explorer/explorer_sprinter.webp',
    description: 'Cartoon running boot with motion lines, symbol for fast sprinting explorer speed.',
  },
  {
    id: 'explorer_sturdy',
    name: 'Sturdy',
    category: 'explorer',
    expectedPath: 'explorer/explorer_sturdy.webp',
    description: 'Cartoon metal shield with sturdy bolts, symbol for a tough, well-defended explorer.',
  },
  {
    id: 'explorer_forager',
    name: 'Forager',
    category: 'explorer',
    expectedPath: 'explorer/explorer_forager.webp',
    description: 'Cartoon cluster of forest mushrooms in a small bundle, symbol for foraging in the wild.',
  },
  {
    id: 'explorer_miner',
    name: 'Miner',
    category: 'explorer',
    expectedPath: 'explorer/explorer_miner.webp',
    description: 'Cartoon pickaxe over a small rock, symbol for digging and mining underground.',
  },
  {
    id: 'explorer_herbalist',
    name: 'Herbalist',
    category: 'explorer',
    expectedPath: 'explorer/explorer_herbalist.webp',
    description: 'Cartoon sprig of green herbs with soft glow, symbol for healing plants and remedies.',
  },
  {
    id: 'explorer_scavenger',
    name: 'Scavenger',
    category: 'explorer',
    expectedPath: 'explorer/explorer_scavenger.webp',
    description: 'Cartoon adventure backpack stuffed with gear, symbol for scavenging extra supplies.',
  },
  {
    id: 'shop_24h',
    name: '24h Shop',
    category: 'misc',
    expectedPath: 'misc/shop_24h.webp',
    description: 'Small colorful shop building with awning, cartoon store front',
  },
  {
    id: 'ship',
    name: 'Ship',
    category: 'misc',
    expectedPath: 'misc/ship.webp',
    description: 'Large blue cargo ship with containers, cartoon freight vessel',
  },
  {
    id: 'truck_delivery',
    name: 'Truck Delivery',
    category: 'misc',
    expectedPath: 'misc/truck_delivery.webp',
    description: 'Large red delivery truck loaded with stacked boxes, cartoon freight vehicle',
  },
  {
    id: 'box',
    name: 'Box',
    category: 'misc',
    expectedPath: 'misc/box.webp',
    description: 'Brown wooden crate box with slats, simple cartoon container',
  },
  {
    id: 'collect_all',
    name: 'Collect All',
    category: 'misc',
    expectedPath: 'misc/collect_all.webp',
    description:
      'Small woven basket icon for a collect all animal products button, simple and readable cartoon style',
  },
  {
    id: 'wanted_board',
    name: 'Wanted Board',
    category: 'misc',
    expectedPath: 'misc/wanted_board.webp',
    description: 'Wooden bulletin board with pinned papers, cartoon notice board',
  },
  {
    id: 'star',
    name: 'Star',
    category: 'misc',
    expectedPath: 'misc/star.webp',
    description: 'Bright golden five-pointed star with sparkle, cartoon reward symbol',
  },
  {
    id: 'sparkles',
    name: 'Sparkles',
    category: 'misc',
    expectedPath: 'misc/sparkles.webp',
    description: 'Cluster of colorful magic sparkles and stars, cartoon effect',
  },
  {
    id: 'hammer_tool',
    name: 'Hammer Tool',
    category: 'misc',
    expectedPath: 'misc/hammer_tool.webp',
    description: 'Brown and silver hammer tool, cartoon construction item',
  },
  {
    id: 'xp_boost_1h',
    name: 'XP Boost 1h',
    category: 'misc',
    expectedPath: 'misc/xp_boost_1h.webp',
    description: 'Blue glowing potion bottle with star symbol, cartoon XP boost',
  },
  {
    id: 'xp_boost_2h',
    name: 'XP Boost 2h',
    category: 'misc',
    expectedPath: 'misc/xp_boost_2h.webp',
    description: 'Larger blue glowing potion bottle with double stars, cartoon XP boost',
  },
  {
    id: 'yield_boost_1h',
    name: 'Yield Boost 1h',
    category: 'misc',
    expectedPath: 'misc/yield_boost_1h.webp',
    description: 'Green glowing potion bottle with leaf symbol, cartoon yield boost',
  },
  {
    id: 'yield_boost_2h',
    name: 'Yield Boost 2h',
    category: 'misc',
    expectedPath: 'misc/yield_boost_2h.webp',
    description: 'Larger green glowing potion bottle with double leaves, cartoon yield boost',
  },
  {
    id: 'craft_speed_boost_1h',
    name: 'Craft Speed Boost 1h',
    category: 'misc',
    expectedPath: 'misc/craft_speed_boost_1h.webp',
    description: 'Orange glowing potion bottle with gear symbol, cartoon speed boost',
  },
  {
    id: 'craft_speed_boost_2h',
    name: 'Craft Speed Boost 2h',
    category: 'misc',
    expectedPath: 'misc/craft_speed_boost_2h.webp',
    description: 'Larger orange glowing potion bottle with double gears, cartoon speed boost',
  },
  {
    id: 'friend_craft_boost',
    name: 'Friend Craft Boost',
    category: 'misc',
    expectedPath: 'misc/friend_craft_boost.webp',
    description: 'Potion bottle with heart and gear symbols, cartoon friend assistance item',
  },
  {
    id: 'friend_crop_boost',
    name: 'Friend Crop Boost',
    category: 'misc',
    expectedPath: 'misc/friend_crop_boost.webp',
    description: 'Potion bottle with heart and plant symbols, cartoon friend assistance item',
  },
  {
    id: 'coin_boost_1h',
    name: 'Coin Boost 1h',
    category: 'misc',
    expectedPath: 'misc/coin_boost_1h.webp',
    description: 'Golden glowing potion bottle with coin symbol, cartoon money boost',
  },
  {
    id: 'coin_boost_2h',
    name: 'Coin Boost 2h',
    category: 'misc',
    expectedPath: 'misc/coin_boost_2h.webp',
    description: 'Larger golden glowing potion bottle with coin stack, cartoon money boost',
  },
  {
    id: 'boosts',
    name: 'Boosts',
    category: 'misc',
    expectedPath: 'misc/boosts.webp',
    description: 'Colorful potion bottles grouped together with up arrow, cartoon boost collection',
  },
  {
    id: 'materials',
    name: 'Materials',
    category: 'misc',
    expectedPath: 'misc/materials.webp',
    description: 'Pile of wood planks and bricks, cartoon building materials',
  },
  {
    id: 'overflow',
    name: 'Overflow',
    category: 'misc',
    expectedPath: 'misc/overflow.webp',
    description: 'Overflowing box with items spilling out, cartoon storage overflow',
  },
  {
    id: 'lock',
    name: 'Lock',
    category: 'misc',
    expectedPath: 'misc/lock.webp',
    description: 'Golden padlock with keyhole, simple cartoon security item',
  },
  {
    id: 'gift',
    name: 'Gift',
    category: 'misc',
    expectedPath: 'misc/gift.webp',
    description: 'Colorful wrapped gift box with ribbon bow, cheerful cartoon present',
  },
  {
    id: 'explorer',
    name: 'Explorer',
    category: 'explorer',
    expectedPath: 'misc/explorer.webp',
    description: 'Cartoon explorer character with hat and backpack, adventure figure',
  },
  {
    id: 'explorer_veteran',
    name: 'Veteran',
    category: 'explorer',
    expectedPath: 'explorer/explorer_veteran.webp',
    description: 'Cartoon gold star badge with subtle scratches, symbol for a seasoned veteran explorer.',
  },
  {
    id: 'explorer_lucky',
    name: 'Lucky',
    category: 'explorer',
    expectedPath: 'explorer/explorer_lucky.webp',
    description: 'Cartoon four-leaf clover charm with soft glow, symbol for a very lucky explorer.',
  },
  {
    id: 'shrine',
    name: 'Shrine',
    category: 'misc',
    expectedPath: 'misc/shrine.webp',
    description: 'Small stone shrine with glowing crystal, mystical cartoon structure',
  },
  {
    id: 'clock',
    name: 'Clock',
    category: 'misc',
    expectedPath: 'misc/clock.webp',
    description: 'Round wall clock with hands showing time, simple cartoon timepiece',
  },
  {
    id: 'info_circle',
    name: 'Info Circle',
    category: 'misc',
    expectedPath: 'misc/info_circle.webp',
    description: 'Blue circle with white letter i inside, cartoon info symbol',
  },
  {
    id: 'help_friend_heart',
    name: 'Help Friend Heart',
    category: 'misc',
    expectedPath: 'misc/help_friend_heart.webp',
    description: 'Pink heart with helping hand symbol, cartoon friendship assistance',
  },
  {
    id: 'remove_friend_minus',
    name: 'Remove Friend Minus',
    category: 'misc',
    expectedPath: 'misc/remove_friend_minus.webp',
    description: 'Red circle with minus sign, cartoon remove action button',
  },
  {
    id: 'lightning',
    name: 'Lightning',
    category: 'misc',
    expectedPath: 'misc/lightning.webp',
    description: 'Bright yellow lightning bolt with glow, cartoon energy symbol',
  },
  {
    id: 'premium_slot_voucher',
    name: 'Premium Slot Voucher',
    category: 'misc',
    expectedPath: 'misc/premium_slot_voucher.webp',
    description: 'Golden ticket with star emblem, fancy cartoon voucher',
  },
  {
    id: 'merchant_crate',
    name: 'Merchant Crate',
    category: 'misc',
    expectedPath: 'misc/merchant_crate.webp',
    description: 'Fancy wooden crate with merchant emblem, cartoon trading box',
  },
  {
    id: 'mystery_crate',
    name: 'Mystery Crate',
    category: 'misc',
    expectedPath: 'misc/mystery_crate.webp',
    description: 'Purple glowing mystery box with question mark, cartoon surprise container',
  },
  {
    id: 'surprise_gift_crate',
    name: 'Surprise Gift Crate',
    category: 'misc',
    expectedPath: 'misc/surprise_gift_crate.webp',
    description:
      'Colorful wrapped crate with a big question mark, surprise gift that can randomly appear on the farm, cartoon game style',
  },
  {
    id: 'inbox',
    name: 'Inbox',
    category: 'misc',
    expectedPath: 'misc/inbox.webp',
    description: 'Mail envelope with notification badge, cartoon message icon',
  },
  {
    id: 'market',
    name: 'Market',
    category: 'misc',
    expectedPath: 'misc/market.webp',
    description: 'Colorful market stall with awning and goods, cartoon shop stand',
  },
  {
    id: 'market_scout',
    name: 'Market Scout',
    category: 'misc',
    expectedPath: 'misc/market_scout.webp',
    description:
      'Chunky cartoon handheld brass spyglass, compact scout telescope with a leather wrap and a round glass lens, slightly tilted three-quarter view, single object, instantly readable at small size. No tripod, no mount, no stand, no person, no stars, no observatory, no text.',
  },
  {
    id: 'farmer_portrait',
    name: 'Farmer Portrait',
    category: 'misc',
    expectedPath: 'misc/farmer_portrait.webp',
    description: 'Friendly cartoon farmer face with straw hat, cheerful portrait',
  },
  {
    id: 'daily_quests',
    name: 'Daily Quests',
    category: 'misc',
    expectedPath: 'misc/daily_quests.webp',
    description: 'Glowing scroll with checkmark list and star badge, cartoon daily tasks icon',
  },
  {
    id: 'alert_info',
    name: 'Alert Info',
    category: 'misc',
    expectedPath: 'misc/alert_info.webp',
    description: 'Blue circle with white letter i, friendly cartoon info symbol for modal alerts',
  },
  {
    id: 'alert_success',
    name: 'Alert Success',
    category: 'misc',
    expectedPath: 'misc/alert_success.webp',
    description:
      'Green circle with white checkmark, friendly cartoon success symbol for modal alerts',
  },
  {
    id: 'alert_warning',
    name: 'Alert Warning',
    category: 'misc',
    expectedPath: 'misc/alert_warning.webp',
    description:
      'Yellow triangle with exclamation mark, friendly cartoon warning symbol for modal alerts',
  },
  {
    id: 'alert_danger',
    name: 'Alert Danger',
    category: 'misc',
    expectedPath: 'misc/alert_danger.webp',
    description: 'Red circle with white X mark, friendly cartoon danger symbol for modal alerts',
  },
  {
    id: 'celebrate',
    name: 'Celebrate',
    category: 'misc',
    expectedPath: 'misc/celebrate.webp',
    description:
      'Colorful party popper with confetti streamers bursting out, cheerful cartoon celebration emoji',
  },
  {
    id: 'sickle',
    name: 'Sickle',
    category: 'misc',
    expectedPath: 'misc/sickle.webp',
    description: 'Curved silver sickle blade with wooden handle, cartoon farming harvest tool',
  },
  {
    id: 'toolbox',
    name: 'Toolbox',
    category: 'misc',
    expectedPath: 'misc/toolbox.webp',
    description:
      'Colorful toolbox with tools peeking out, friendly cartoon hub icon for feature menu',
  },
  {
    id: 'emoji_fire',
    name: 'Fire Emoji',
    category: 'misc',
    expectedPath: 'misc/emoji_fire.webp',
    description: 'Bright orange and yellow flame icon, stylized cartoon fire with flickering tips',
  },
  {
    id: 'emoji_tools',
    name: 'Tools Emoji',
    category: 'misc',
    expectedPath: 'misc/emoji_tools.webp',
    description: 'Crossed hammer and wrench icon, shiny metal tools in cartoon style',
  },
  {
    id: 'emoji_wheat',
    name: 'Wheat Emoji',
    category: 'misc',
    expectedPath: 'misc/emoji_wheat.webp',
    description: 'Golden wheat sheaf icon, bundle of ripe grain stalks tied together',
  },
  {
    id: 'emoji_construction',
    name: 'Construction Emoji',
    category: 'misc',
    expectedPath: 'misc/emoji_construction.webp',
    description: 'Construction crane icon with building blocks, cartoon building site symbol',
  },
  {
    id: 'emoji_package',
    name: 'Package Emoji',
    category: 'misc',
    expectedPath: 'misc/emoji_package.webp',
    description: 'Brown cardboard box icon with tape, sealed delivery package cartoon style',
  },
  {
    id: 'emoji_strength',
    name: 'Strength Emoji',
    category: 'misc',
    expectedPath: 'misc/emoji_strength.webp',
    description: 'Flexed bicep arm icon, muscular cartoon arm showing power and strength',
  },
  {
    id: 'emoji_energy',
    name: 'Energy Emoji',
    category: 'misc',
    expectedPath: 'misc/emoji_energy.webp',
    description: 'Yellow lightning bolt icon, electric zap symbol with bright glow',
  },
  {
    id: 'emoji_science',
    name: 'Science Emoji',
    category: 'misc',
    expectedPath: 'misc/emoji_science.webp',
    description: 'Glass test tube icon with colorful bubbling liquid, cartoon laboratory flask',
  },
  {
    id: 'mission_permits',
    name: 'Mission Permits',
    category: 'misc',
    expectedPath: 'misc/mission_permits.webp',
    description:
      'Official expedition permit scroll with wax seal and compass icon, unlocks long 12-hour missions for overnight adventures',
  },
  {
    id: 'fab_background',
    name: 'FAB Background',
    category: 'misc',
    expectedPath: 'misc/fab_background.webp',
    description:
      'Circular floating action button background with warm brown wooden texture center, thick golden bronze metallic frame with glowing orange ring effect, fantasy game UI style',
  },
  {
    id: 'fab_circle',
    name: 'FAB Circle',
    category: 'misc',
    expectedPath: 'misc/fab_circle.webp',
    description:
      'Empty circular frame for floating action button, thick golden bronze metallic ring with bright orange glow effect around edges, no center fill just the glowing border ring, fantasy game UI style',
  },
  {
    id: 'fab_urgent',
    name: 'FAB Urgent',
    category: 'misc',
    expectedPath: 'misc/fab_urgent.webp',
    description:
      'Circular floating action button with urgent red pulsing glow effect, warm brown wooden texture center, thick metallic frame with bright red-orange urgent ring effect, fantasy game UI style for attention-grabbing actions',
  },
  {
    id: 'fab_inventory',
    name: 'FAB Inventory',
    category: 'misc',
    expectedPath: 'misc/fab_inventory.webp',
    description:
      'Circular floating action button background with warm brown wooden texture center showing subtle crate/chest pattern, thick golden bronze metallic frame with glowing orange ring effect, fantasy game UI style for inventory actions',
  },
  {
    id: 'inventory_warn',
    name: 'Inventory Warn',
    category: 'misc',
    expectedPath: 'misc/inventory_warn.webp',
    description:
      'Brown wooden crate with lid slightly ajar, a few colorful items peeking out from the gap, cartoon storage box nearly full warning indicator',
  },
  {
    id: 'inventory_full',
    name: 'Inventory Full',
    category: 'misc',
    expectedPath: 'misc/inventory_full.webp',
    description:
      'Brown wooden crate with lid visibly popping open, one item leaning out over the edge, cartoon storage box completely full indicator',
  },
  {
    id: 'expand_farm',
    name: 'Expand Farm',
    category: 'misc',
    expectedPath: 'misc/expand_farm.webp',
    description:
      'Wooden stake driven into ground with small rolled parchment map attached, red ribbon tag hanging from stake, cartoon land expansion marker for buying new field',
  },
  {
    id: 'pinned_items',
    name: 'Pinned Items',
    category: 'misc',
    expectedPath: 'misc/pinned_items.webp',
    description:
      'Small wooden peg with colorful flag planted at slight angle into ground, soft shadow beneath as if placed in soil, cartoon farm marker for pinned or favorited items',
  },
  {
    id: 'truck_loaded',
    name: 'Truck Loaded',
    category: 'misc',
    expectedPath: 'misc/truck_loaded.webp',
    description:
      'Cheerful cartoon pickup truck with wooden bed overflowing with colorful crates, sacks, and produce, green checkmark floating above, ready for delivery, farm game style',
  },
  {
    id: 'truck_empty',
    name: 'Truck Empty',
    category: 'misc',
    expectedPath: 'misc/truck_empty.webp',
    description:
      'Cartoon pickup truck with empty wooden bed, slight red X or question mark floating above, waiting to be loaded, farm game style',
  },
  {
    id: 'crown',
    name: 'Crown',
    category: 'misc',
    expectedPath: 'misc/crown.webp',
    description:
      'Golden royal crown with sparkling gems, glowing aura and shimmer effects, cartoon premium season pass icon, luxurious and prestigious farm game style',
  },
  {
    id: 'mystery_reward',
    name: 'Mystery Reward',
    category: 'misc',
    expectedPath: 'misc/mystery_reward.webp',
    description:
      'Glowing gift box or chest with large question mark floating above, surrounded by swirling stars and sparkles, mysterious golden aura, cartoon random reward icon for daily quest completion',
  },
  {
    id: 'nameplate_plank',
    name: 'Nameplate Plank',
    category: 'misc',
    expectedPath: 'misc/nameplate_plank.webp',
    description:
      'Simple horizontal wooden plank sign with rustic wood grain texture, slightly weathered edges, cartoon farm nameplate background, warm brown tones',
  },
  {
    id: 'delivery_crate',
    name: 'Delivery Crate',
    category: 'misc',
    expectedPath: 'misc/delivery_crate.webp',
    description:
      'Rustic wooden shipping crate with red wax stamp seal on front, small delivery truck or arrow symbol on the seal, cartoon farm game delivery icon',
  },
  {
    id: 'premium_orders',
    name: 'Premium Orders',
    category: 'misc',
    expectedPath: 'misc/premium_orders.webp',
    description:
      'Elegant golden clipboard or order sheet with sparkles and crown emblem, luxurious purple ribbon, cartoon premium delivery orders icon for farm game',
  },
  {
    id: 'quick_orders',
    name: 'Quick Orders',
    category: 'misc',
    expectedPath: 'misc/quick_orders.webp',
    description:
      'Simple wooden clipboard with green checkmark and small clock or lightning bolt, fast easy order icon, cartoon farm game style',
  },
  {
    id: 'main_orders',
    name: 'Main Orders',
    category: 'misc',
    expectedPath: 'misc/main_orders.webp',
    description:
      'Sturdy wooden clipboard with blue ribbon and star emblem, standard order sheet, cartoon farm game delivery icon',
  },
  {
    id: 'special_orders',
    name: 'Special Orders',
    category: 'misc',
    expectedPath: 'misc/special_orders.webp',
    description:
      'Decorated clipboard with orange ribbon, sparkles and exclamation mark or gem emblem, rare special order icon, cartoon farm game style',
  },
  {
    id: 'diamond_merchant',
    name: 'Diamond Merchant',
    category: 'misc',
    expectedPath: 'misc/diamond_merchant.webp',
    description:
      'Small shop stand or kiosk with sparkling blue diamonds displayed, merchant stall where players can buy items for diamonds, cartoon farm game style',
  },
  {
    id: 'request_help',
    name: 'Request Help',
    category: 'misc',
    expectedPath: 'misc/request_help.webp',
    description:
      'Raised hand with speech bubble or megaphone, friendly call for assistance icon, coop community help request, cartoon farm game style',
  },
  {
    id: 'coop_star',
    name: 'Coop Star',
    category: 'misc',
    expectedPath: 'misc/coop_star.webp',
    description:
      'Glowing greenish-teal star with sparkles, coop experience points icon, slightly different shade from regular star, cartoon farm game style',
  },
  {
    id: 'farm_hands',
    name: 'Farm Hands',
    category: 'misc',
    expectedPath: 'misc/farm_hands.webp',
    description:
      'Friendly cartoon farm helper character with work gloves and straw hat, tending to crops and crafts, warm and reliable helper vibe, cozy farm game style',
  },
  {
    id: 'coupon',
    name: 'Coupon',
    category: 'misc',
    expectedPath: 'misc/coupon.webp',
    description:
      'Green perforated coupon ticket with checkmark symbol, instant order fill voucher, clean and readable at small size, cartoon farm game style',
  },
  {
    id: 'scarecrow',
    name: 'Scarecrow',
    category: 'misc',
    expectedPath: 'misc/scarecrow.webp',
    description:
      'Friendly game mascot scarecrow inspired by Hay Day — chunky cartoon straw figure with a big warm smile, rosy cheeks, and bright curious eyes. Worn patched overalls, floppy straw hat, straw arms slightly outstretched in a welcoming pose. Soft isometric three-quarter view, toy-like rounded proportions, cozy wholesome farm charm. Instantly lovable app-mascot energy, readable at small sizes, transparent background.',
  },

  // === POTIONS ===
  {
    id: 'stamina_potion',
    name: 'Stamina Potion',
    category: 'potions',
    expectedPath: 'potions/stamina_potion.webp',
    description: 'Glowing green energy potion bottle with lightning bolt, cartoon power-up',
  },
  {
    id: 'mission_potion',
    name: 'Mission Potion',
    category: 'potions',
    expectedPath: 'potions/mission_potion.webp',
    description:
      'Glowing purple potion bottle with checkmark symbol, cartoon instant completion power-up',
  },
  {
    id: 'smelting_potion',
    name: 'Smelting Potion',
    category: 'potions',
    expectedPath: 'potions/smelting_potion.webp',
    description:
      'Glowing orange-red potion bottle with small refinery furnace emblem, boosts refinery crafting speed, cozy cartoon style',
  },
  {
    id: 'helper_potion',
    name: 'Helper Potion',
    category: 'potions',
    expectedPath: 'potions/helper_potion.webp',
    description:
      'Glowing warm golden potion bottle with small helping hands emblem, activates farm hands to tend crops and crafts while away, cozy cartoon style',
  },

  // === UPGRADES ===
  {
    id: 'barn_upgrade',
    name: 'Barn',
    category: 'upgrades',
    expectedPath: 'upgrades/barn.webp',
    description: 'Red barn building with up arrow symbol, cartoon storage upgrade',
  },
  {
    id: 'field_efficiency',
    name: 'Field Efficiency',
    category: 'upgrades',
    expectedPath: 'upgrades/field_efficiency.webp',
    description: 'Green crop field with up arrow and sparkles, cartoon farming upgrade',
  },
  {
    id: 'crafting_speed',
    name: 'Crafting Speed',
    category: 'upgrades',
    expectedPath: 'upgrades/crafting_speed.webp',
    description: 'Gear with clock and speed lines, cartoon production upgrade',
  },
  {
    id: 'forge_efficiency',
    name: 'Forge Efficiency',
    category: 'upgrades',
    expectedPath: 'upgrades/forge_efficiency.webp',
    description:
      'Cartoon blacksmith forge with anvil, hammer, and orange sparks plus speed lines, upgrade icon for faster blacksmith crafting',
  },
  {
    id: 'animal_productivity',
    name: 'Animal Productivity',
    category: 'upgrades',
    expectedPath: 'upgrades/animal_productivity.webp',
    description: 'Animal silhouette with up arrow and hearts, cartoon livestock upgrade',
  },
  {
    id: 'order_board_boost',
    name: 'Order Board Boost',
    category: 'upgrades',
    expectedPath: 'upgrades/order_board_boost.webp',
    description: 'Clipboard with checkmarks and star, cartoon order upgrade',
  },
  {
    id: 'visitor_charm',
    name: 'Visitor Charm',
    category: 'upgrades',
    expectedPath: 'upgrades/visitor_charm.webp',
    description: 'Glowing lucky charm pendant with tiny footprints and clock, cartoon visitor speed upgrade',
  },

  // === LEADERBOARD ===
  {
    id: 'tractor',
    name: 'Tractor',
    category: 'leaderboard',
    expectedPath: 'leaderboard/tractor.webp',
    description: 'Bright red farm tractor with big wheels, cheerful cartoon vehicle',
  },
  {
    id: 'order_points',
    name: 'Order Points',
    category: 'leaderboard',
    expectedPath: 'leaderboard/order_points.webp',
    description: 'Clipboard with star badge, cartoon order achievement symbol',
  },
  {
    id: 'boat_points',
    name: 'Boat Points',
    category: 'leaderboard',
    expectedPath: 'leaderboard/boat_points.webp',
    description: 'Small boat with star badge, cartoon shipping achievement symbol',
  },
  {
    id: 'truck_points',
    name: 'Truck Points',
    category: 'leaderboard',
    expectedPath: 'leaderboard/truck_points.webp',
    description: 'Delivery truck with star badge, cartoon truck order fulfillment achievement symbol',
  },
  {
    id: 'help_points',
    name: 'Help Points',
    category: 'leaderboard',
    expectedPath: 'leaderboard/help_points.webp',
    description: 'Helping hand with star badge, cartoon assistance achievement symbol',
  },
  {
    id: 'wanted_points',
    name: 'Wanted Points',
    category: 'leaderboard',
    expectedPath: 'leaderboard/wanted_points.webp',
    description:
      'Wanted board with star badge, points collected through helping other farmers on the wanted board, cartoon achievement symbol',
  },
  {
    id: 'farm',
    name: 'Farm',
    category: 'leaderboard',
    expectedPath: 'leaderboard/farm.webp',
    description: 'Cute farmhouse with barn and fields, cheerful cartoon homestead',
  },

  // === BUILDINGS ===
  {
    id: 'bakery',
    name: 'Bakery',
    category: 'buildings',
    expectedPath: 'buildings/bakery.webp',
    description: 'Cozy brick bakery with bread sign and chimney smoke, warm cartoon building',
  },
  {
    id: 'breakfast_cart',
    name: 'Breakfast Cart',
    category: 'buildings',
    expectedPath: 'buildings/breakfast_cart.webp',
    description: 'Colorful wheeled food cart with awning, cheerful cartoon vendor',
  },
  {
    id: 'confectioner',
    name: 'Confectioner',
    category: 'buildings',
    expectedPath: 'buildings/confectioner.webp',
    description: 'Pink candy shop building with sweets decoration, sweet cartoon store',
  },
  {
    id: 'cookhouse',
    name: 'Cookhouse',
    category: 'buildings',
    expectedPath: 'buildings/cookhouse.webp',
    description: 'Rustic stone cookhouse with steaming pot, cozy cartoon kitchen',
  },
  {
    id: 'creamery',
    name: 'Creamery',
    category: 'buildings',
    expectedPath: 'buildings/creamery.webp',
    description: 'White dairy building with milk bottle sign, clean cartoon creamery',
  },
  {
    id: 'dairy',
    name: 'Dairy',
    category: 'buildings',
    expectedPath: 'buildings/dairy.webp',
    description: 'Blue and white dairy building with cow decoration, farm cartoon structure',
  },
  {
    id: 'feed_mill',
    name: 'Feed Mill',
    category: 'buildings',
    expectedPath: 'buildings/feed_mill.webp',
    description: 'Wooden grain mill with silo and wheel, rustic cartoon building',
  },
  {
    id: 'festive_workshop',
    name: 'Festive Workshop',
    category: 'buildings',
    expectedPath: 'buildings/festive_workshop.webp',
    description: 'Red and green holiday workshop with lights, festive cartoon building',
  },
  {
    id: 'furnace',
    name: 'Furnace',
    category: 'buildings',
    expectedPath: 'buildings/furnace.webp',
    description: 'Stone furnace with glowing orange fire, industrial cartoon building',
  },
  {
    id: 'jam_house',
    name: 'Jam House',
    category: 'buildings',
    expectedPath: 'buildings/jam_house.webp',
    description: 'Cute cottage with jam jar decorations, sweet cartoon building',
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    category: 'buildings',
    expectedPath: 'buildings/kitchen.webp',
    description: 'Farm kitchen building with steaming windows, cozy cartoon structure',
  },
  {
    id: 'loom',
    name: 'Loom',
    category: 'buildings',
    expectedPath: 'buildings/loom.webp',
    description: 'Wooden weaving workshop with fabric rolls, craft cartoon building',
  },
  {
    id: 'mill',
    name: 'Mill',
    category: 'buildings',
    expectedPath: 'buildings/mill.webp',
    description: 'Classic windmill with spinning blades, cheerful cartoon structure',
  },
  {
    id: 'oil_press',
    name: 'Oil Press',
    category: 'buildings',
    expectedPath: 'buildings/oil_press.webp',
    description: 'Stone oil pressing building with olive decoration, rustic cartoon',
  },
  {
    id: 'silk_atelier',
    name: 'Silk Atelier',
    category: 'buildings',
    expectedPath: 'buildings/silk_atelier.webp',
    description: 'Elegant pink silk workshop with fabric banners, fancy cartoon building',
  },
  {
    id: 'smoker',
    name: 'Smoker',
    category: 'buildings',
    expectedPath: 'buildings/smoker.webp',
    description: 'Wooden smokehouse with smoke rising from chimney, rustic cartoon building',
  },
  {
    id: 'spinning_wheel',
    name: 'Spinning Wheel',
    category: 'buildings',
    expectedPath: 'buildings/spinning_wheel.webp',
    description: 'Cozy cottage with spinning wheel visible, craft cartoon building',
  },
  {
    id: 'sugar_house',
    name: 'Sugar House',
    category: 'buildings',
    expectedPath: 'buildings/sugar_house.webp',
    description: 'White and brown sugar processing building, sweet cartoon factory',
  },
  {
    id: 'tea_house',
    name: 'Tea House',
    category: 'buildings',
    expectedPath: 'buildings/tea_house.webp',
    description: 'Serene Asian-style tea house with steam, peaceful cartoon building',
  },
  {
    id: 'workshop',
    name: 'Workshop',
    category: 'buildings',
    expectedPath: 'buildings/workshop.webp',
    description: 'Wooden workshop with tools and workbench visible, craft cartoon building',
  },
  {
    id: 'pickling_station',
    name: 'Pickling Station',
    category: 'buildings',
    expectedPath: 'buildings/pickling_station.webp',
    description:
      'Rustic fermenting station with large ceramic crocks, wooden barrels, and shelves of jarred vegetables, steam and brine vapors rising',
  },
  {
    id: 'apothecary',
    name: 'Apothecary',
    category: 'buildings',
    expectedPath: 'buildings/apothecary.webp',
    description:
      'Mystical herb shop with hanging dried plants, bubbling cauldrons, mortar and pestle sets, shelves lined with colorful potion bottles',
  },
  {
    id: 'distillery',
    name: 'Distillery',
    category: 'buildings',
    expectedPath: 'buildings/distillery.webp',
    description:
      'Elegant copper still operation with large distillation columns, oak aging barrels, wine casks, amber liquids flowing through glass tubes',
  },
  {
    id: 'glassworks',
    name: 'Glassworks',
    category: 'buildings',
    expectedPath: 'buildings/glassworks.webp',
    description:
      'Specialized glassmaking workshop with furnace kilns, stained panes, and shaping benches, premium cartoon building',
  },
  {
    id: 'jewelry_atelier',
    name: 'Jewelry Atelier',
    category: 'buildings',
    expectedPath: 'buildings/jewelry_atelier.webp',
    description:
      'Elegant jewelcraft atelier with gem-setting tables, precious metal tools, and display cases, high-tier cartoon building',
  },
  {
    id: 'clockmaker',
    name: 'Clockmaker',
    category: 'buildings',
    expectedPath: 'buildings/clockmaker.webp',
    description:
      'Precision workshop with magnifying glasses, tiny gears on workbenches, intricate clock mechanisms, ornate timepieces on display',
  },
  {
    id: 'artisan_hall',
    name: 'Artisan Hall',
    category: 'buildings',
    expectedPath: 'buildings/artisan_hall.webp',
    description:
      'Grand crafting hall with marble columns, display cases of masterwork items, golden accents, master craftsmen workstations',
  },
  {
    id: 'plant_kitchen',
    name: 'Plant Kitchen',
    category: 'buildings',
    expectedPath: 'buildings/plant_kitchen.webp',
    description:
      'Cozy green-roofed kitchen building with leafy vines, tofu blocks and soybeans visible through window, steaming wok, plant-based cooking station for tofu and soy-based dish recipes',
  },

  // === ANIMALS ===
  {
    id: 'apiary',
    name: 'Apiary',
    category: 'animals',
    expectedPath: 'animals/apiary.webp',
    description: 'Stack of colorful beehives with cute bees flying around, cartoon apiary',
  },
  {
    id: 'chicken_coop',
    name: 'Chicken Coop',
    category: 'animals',
    expectedPath: 'animals/chicken_coop.webp',
    description: 'Red wooden chicken coop with cute chickens, cheerful cartoon henhouse',
  },
  {
    id: 'cow_shed',
    name: 'Cow Shed',
    category: 'animals',
    expectedPath: 'animals/cow_shed.webp',
    description: 'Brown barn with spotted cow peeking out, friendly cartoon cowshed',
  },
  {
    id: 'goat_farm',
    name: 'Goat Farm',
    category: 'animals',
    expectedPath: 'animals/goat_farm.webp',
    description: 'Fenced area with cute white goats, cheerful cartoon goat pen',
  },
  {
    id: 'pigsty',
    name: 'Pigsty',
    category: 'animals',
    expectedPath: 'animals/pigsty.webp',
    description: 'Muddy pen with happy pink pigs, cute cartoon pigsty',
  },
  {
    id: 'sheep_farm',
    name: 'Sheep Farm',
    category: 'animals',
    expectedPath: 'animals/sheep_farm.webp',
    description: 'Green pasture with fluffy white sheep, peaceful cartoon sheep pen',
  },
  {
    id: 'silkworm_house',
    name: 'Silkworm House',
    category: 'animals',
    expectedPath: 'animals/silkworm_house.webp',
    description: 'Wooden house with mulberry leaves and silk cocoons, unique cartoon building',
  },

  // === MASTERY ===
  {
    id: 'stamp_bronze',
    name: 'Stamp Bronze',
    category: 'mastery',
    expectedPath: 'mastery/stamp_bronze.webp',
    description:
      'Shiny bronze circular stamp seal with embossed star emblem, cartoon achievement badge',
  },
  {
    id: 'stamp_silver',
    name: 'Stamp Silver',
    category: 'mastery',
    expectedPath: 'mastery/stamp_silver.webp',
    description:
      'Polished silver circular stamp seal with embossed star emblem, cartoon achievement badge',
  },
  {
    id: 'stamp_gold',
    name: 'Stamp Gold',
    category: 'mastery',
    expectedPath: 'mastery/stamp_gold.webp',
    description:
      'Gleaming gold circular stamp seal with embossed star emblem, cartoon achievement badge',
  },
  {
    id: 'stamp_locked',
    name: 'Stamp Locked',
    category: 'mastery',
    expectedPath: 'mastery/stamp_locked.webp',
    description: 'Grey locked stamp seal with padlock overlay, cartoon locked achievement badge',
  },
  {
    id: 'book',
    name: 'Book',
    category: 'mastery',
    expectedPath: 'mastery/book.webp',
    description:
      'Thick leather-bound book with golden trim and bookmark ribbon, cartoon mastery tome',
  },

  // === TABS ===
  {
    id: 'tab_order_board',
    name: 'Order Board',
    category: 'tabs',
    expectedPath: 'tabs/order_board.webp',
    description:
      'Wooden bulletin board with pinned order slips and tasks, cartoon game UI tab icon',
  },
  {
    id: 'tab_events',
    name: 'Events',
    category: 'tabs',
    expectedPath: 'tabs/events.webp',
    description:
      'Festive calendar with star decorations and celebration banner, cartoon game UI tab icon',
  },
  {
    id: 'tab_farm_home',
    name: 'Farm Home',
    category: 'tabs',
    expectedPath: 'tabs/farm_home.webp',
    description: 'Cozy farmhouse with red roof and green fields, cartoon game UI tab icon',
  },
  {
    id: 'tab_adventure',
    name: 'Adventure',
    category: 'tabs',
    expectedPath: 'tabs/adventure.webp',
    description: 'Compass and treasure map with exploration path, cartoon game UI tab icon',
  },
  {
    id: 'tab_shop',
    name: 'Shop',
    category: 'tabs',
    expectedPath: 'tabs/shop.webp',
    description: 'Colorful market stall with awning and shopping bags, cartoon game UI tab icon',
  },
  {
    id: 'tab_coop',
    name: 'Coop',
    category: 'tabs',
    expectedPath: 'tabs/coop.webp',
    description:
      'Two friendly figures together with connection symbol, cartoon game UI tab icon for multiplayer',
  },

  // === EVENTS & BOOSTS ===
  // Weekly Events
  {
    id: 'event_order_rush',
    name: 'Order Rush Day',
    category: 'events-boosts',
    expectedPath: 'events-boosts/event_order_rush.webp',
    description:
      'Blue glowing package box with double XP sparkles, cartoon event icon for order bonus day',
  },
  {
    id: 'event_busy_harbor',
    name: 'Busy Harbor Day',
    category: 'events-boosts',
    expectedPath: 'events-boosts/event_busy_harbor.webp',
    description: 'Green speedboat with coins and sparkles, cartoon event icon for harbor bonus day',
  },
  {
    id: 'event_visitor_festival',
    name: 'Visitor Festival',
    category: 'events-boosts',
    expectedPath: 'events-boosts/event_visitor_festival.webp',
    description: 'Golden farmer character with coin sparkles, cartoon event icon for visitor bonus',
  },
  {
    id: 'event_grand_market',
    name: 'Grand Market Day',
    category: 'events-boosts',
    expectedPath: 'events-boosts/event_grand_market.webp',
    description:
      'Purple festive lantern with XP and coin symbols, cartoon event icon for market day',
  },
  {
    id: 'event_golden_guest',
    name: 'Golden Guest Day',
    category: 'events-boosts',
    expectedPath: 'events-boosts/event_golden_guest.webp',
    description:
      'Orange celebration confetti with VIP guest star, cartoon event icon for guest bonus',
  },
  {
    id: 'event_harvest_festival',
    name: 'Harvest Festival Weekend',
    category: 'events-boosts',
    expectedPath: 'events-boosts/event_harvest_festival.webp',
    description:
      'Golden wheat sheaf with festive ribbons and sparkles, cartoon harvest celebration icon',
  },
  {
    id: 'event_green_thumb',
    name: 'Green Thumb Monday',
    category: 'events-boosts',
    expectedPath: 'events-boosts/event_green_thumb.webp',
    description:
      'Green sprouting seedling with speed lines, cartoon event icon for faster crop growth',
  },
  {
    id: 'event_craftsman',
    name: 'Craftsman Friday',
    category: 'events-boosts',
    expectedPath: 'events-boosts/event_craftsman.webp',
    description:
      'Orange hammer with crafting sparks and speed lines, cartoon event icon for faster crafting',
  },
  {
    id: 'event_explorers_luck',
    name: "Explorer's Luck",
    category: 'events-boosts',
    expectedPath: 'events-boosts/event_explorers_luck.webp',
    description:
      'Purple adventure backpack with lucky clover and star, cartoon event icon for better loot',
  },
  {
    id: 'event_relaxed_weekend',
    name: 'Relaxed Weekend',
    category: 'events-boosts',
    expectedPath: 'events-boosts/event_relaxed_weekend.webp',
    description:
      'Blue sun with peaceful rays and gentle sparkles, cartoon event icon for weekend bonus',
  },
  {
    id: 'event_weekend_market',
    name: 'Weekend Market',
    category: 'events-boosts',
    expectedPath: 'events-boosts/event_weekend_market.webp',
    description: 'Golden shopping cart overflowing with coins, cartoon event icon for market bonus',
  },
  {
    id: 'event_lucky_catch',
    name: 'Lucky Catch',
    category: 'events-boosts',
    expectedPath: 'events-boosts/event_lucky_catch.webp',
    description:
      'Fishing rod with double XP sparkles and lucky fish, cartoon event icon for active double fishing XP event',
  },
  {
    id: 'event_highway_haul_day',
    name: 'Highway Haul Day',
    category: 'events-boosts',
    expectedPath: 'events-boosts/event_highway_haul_day.webp',
    description:
      'Friendly cartoon delivery truck on a road with double coin and reward sparkles, event icon for double truck delivery rewards',
  },

  // Boost Items
  {
    id: 'boost_xp',
    name: 'XP Boost',
    category: 'events-boosts',
    expectedPath: 'events-boosts/boost_xp.webp',
    description:
      'Blue glowing potion bottle with star emblem and XP sparkles, cartoon experience boost',
  },
  {
    id: 'boost_craft_speed',
    name: 'Craft Speed Boost',
    category: 'events-boosts',
    expectedPath: 'events-boosts/boost_craft_speed.webp',
    description:
      'Orange glowing potion bottle with lightning bolt and gear, cartoon crafting speed boost',
  },
  {
    id: 'boost_yield',
    name: 'Yield Boost',
    category: 'events-boosts',
    expectedPath: 'events-boosts/boost_yield.webp',
    description:
      'Green glowing potion bottle with leaf and plus symbol, cartoon harvest yield boost',
  },
  {
    id: 'boost_coin',
    name: 'Coin Boost',
    category: 'events-boosts',
    expectedPath: 'events-boosts/boost_coin.webp',
    description: 'Golden glowing potion bottle with coin emblem and sparkles, cartoon money boost',
  },
  {
    id: 'boost_xp_2h',
    name: 'XP Boost (2h)',
    category: 'events-boosts',
    expectedPath: 'events-boosts/boost_xp_2h.webp',
    description:
      'Large blue glowing potion bottle with double stars and intense XP sparkles, cartoon premium experience boost',
  },
  {
    id: 'boost_yield_2h',
    name: 'Yield Boost (2h)',
    category: 'events-boosts',
    expectedPath: 'events-boosts/boost_yield_2h.webp',
    description:
      'Large green glowing potion bottle with double leaves and intense sparkles, cartoon premium harvest yield boost',
  },
  {
    id: 'boost_craft_speed_2h',
    name: 'Craft Speed Boost (2h)',
    category: 'events-boosts',
    expectedPath: 'events-boosts/boost_craft_speed_2h.webp',
    description:
      'Large orange glowing potion bottle with double lightning bolts and gears, cartoon premium crafting speed boost',
  },
  {
    id: 'boost_coin_2h',
    name: 'Coin Boost (2h)',
    category: 'events-boosts',
    expectedPath: 'events-boosts/boost_coin_2h.webp',
    description:
      'Large golden glowing potion bottle with double coins and intense sparkles, cartoon premium money boost',
  },
  {
    id: 'boost_friend',
    name: 'Friend Boost Token',
    category: 'events-boosts',
    expectedPath: 'events-boosts/boost_friend.webp',
    description:
      'Pink potion bottle with two friend silhouettes and heart, cartoon friendship boost',
  },
  {
    id: 'boost_friend_crop',
    name: 'Friend Crop Boost',
    category: 'events-boosts',
    expectedPath: 'events-boosts/boost_friend_crop.webp',
    description:
      'Green potion bottle with wheat symbol and friend heart, cartoon crop assistance boost',
  },
  {
    id: 'boost_friend_craft',
    name: 'Friend Craft Boost',
    category: 'events-boosts',
    expectedPath: 'events-boosts/boost_friend_craft.webp',
    description:
      'Orange potion bottle with gear symbol and friend heart, cartoon crafting assistance boost',
  },

  // === TUTORIAL ===
  {
    id: 'farmboy_neutral',
    name: 'Farmboy (Neutral)',
    category: 'tutorial',
    expectedPath: 'tutorial/farmboy_neutral.webp',
    description:
      'Young friendly farmboy with tousled brown hair, warm brown eyes, cheerful freckled face, wearing simple linen shirt and overalls, standing relaxed with hands at sides',
  },
  {
    id: 'farmboy_pointing',
    name: 'Farmboy (Pointing)',
    category: 'tutorial',
    expectedPath: 'tutorial/farmboy_pointing.webp',
    description:
      'Young friendly farmboy with tousled brown hair, warm brown eyes, cheerful freckled face, wearing simple linen shirt and overalls, pointing forward with one hand extended to show something',
  },
  {
    id: 'farmboy_thinking',
    name: 'Farmboy (Thinking)',
    category: 'tutorial',
    expectedPath: 'tutorial/farmboy_thinking.webp',
    description:
      'Young friendly farmboy with tousled brown hair, warm brown eyes, thoughtful expression, wearing simple linen shirt and overalls, hand on chin in thinking pose looking upward',
  },
  {
    id: 'farmboy_waving',
    name: 'Farmboy (Waving)',
    category: 'tutorial',
    expectedPath: 'tutorial/farmboy_waving.webp',
    description:
      'Young friendly farmboy with tousled brown hair, warm brown eyes, welcoming smile, wearing simple linen shirt and overalls, waving hello with one hand raised',
  },
  {
    id: 'farmboy_explaining',
    name: 'Farmboy (Explaining)',
    category: 'tutorial',
    expectedPath: 'tutorial/farmboy_explaining.webp',
    description:
      'Young friendly farmboy with tousled brown hair, warm brown eyes, engaged expression, wearing simple linen shirt and overalls, both hands gesturing outward while teaching',
  },
  {
    id: 'farmboy_celebrating',
    name: 'Farmboy (Celebrating)',
    category: 'tutorial',
    expectedPath: 'tutorial/farmboy_celebrating.webp',
    description:
      'Young friendly farmboy with tousled brown hair, warm brown eyes, joyful excited expression, wearing simple linen shirt and overalls, arms raised in celebration',
  },
  {
    id: 'farmboy_thumbsup',
    name: 'Farmboy (Thumbs Up)',
    category: 'tutorial',
    expectedPath: 'tutorial/farmboy_thumbsup.webp',
    description:
      'Young friendly farmboy with tousled brown hair, warm brown eyes, encouraging smile, wearing simple linen shirt and overalls, giving thumbs up approval gesture',
  },
  {
    id: 'farmboy_surprised',
    name: 'Farmboy (Surprised)',
    category: 'tutorial',
    expectedPath: 'tutorial/farmboy_surprised.webp',
    description:
      'Young friendly farmboy with tousled brown hair, wide surprised eyes, open mouth expression, wearing simple linen shirt and overalls, hands raised in amazement',
  },
  // === CATEGORY ===
  {
    id: 'category_crop',
    name: 'Crop',
    category: 'category',
    expectedPath: 'category/crop.webp',
    description:
      'A bundle of freshly harvested crops representing farm produce. Golden wheat stalks, ripe vegetables, and farm-fresh goods.',
  },
  {
    id: 'category_animal_product',
    name: 'Animal Product',
    category: 'category',
    expectedPath: 'category/animal_product.webp',
    description:
      'Collection of animal-derived goods. Eggs, milk bottle, wool bundle, and feathers arranged together.',
  },
  {
    id: 'category_crafted_good',
    name: 'Crafted Good',
    category: 'category',
    expectedPath: 'category/crafted_good.webp',
    description:
      'Artisan workshop products representing handmade items. A wooden crate with finished goods, tools, and crafted materials.',
  },
  {
    id: 'category_area_drop',
    name: 'Area Drop',
    category: 'category',
    expectedPath: 'category/area_drop.webp',
    description:
      'Rare treasures and loot found while exploring. A collection of gems, rare materials, and mysterious objects with a slight glow.',
  },
  {
    id: 'category_rare_item',
    name: 'Rare Item',
    category: 'category',
    expectedPath: 'category/rare_item.webp',
    description:
      'A precious rare item with a golden shimmer. Ornate treasure chest overflowing with glowing gems, golden coins, and legendary artifacts.',
  },

  // === SEASON PASS - FEBRUARY 2025 (FROSTY FIELDS) ===
  {
    id: 'sp_2025_02_header',
    name: 'Frosty Fields Header',
    category: 'season-pass',
    subcategory: '2025-02-frosty-fields',
    expectedPath: 'season-pass/2025-02-frosty-fields/header.webp',
    description:
      'Modal header banner for Frosty Fields season. Winter farm scene with "Frosty Fields" text, snow falling gently, cozy farmhouse in background.',
  },
  {
    id: 'sp_2025_02_farm_bg',
    name: 'Frosty Fields Farm Background',
    category: 'season-pass',
    subcategory: '2025-02-frosty-fields',
    expectedPath: 'season-pass/2025-02-frosty-fields/farm-bg.webp',
    description:
      'Premium farm background with snowy ground, winter trees with frosted branches, subtle snowflakes drifting down. Seasonal ambiance without being distracting.',
  },
  {
    id: 'sp_2025_02_trophy',
    name: 'Frosty Fields Trophy',
    category: 'season-pass',
    subcategory: '2025-02-frosty-fields',
    expectedPath: 'season-pass/2025-02-frosty-fields/trophy.webp',
    description:
      'Season trophy decoration made of ice and crystal with a snowflake emblem in the center. Elegant frost patterns, sparkling finish.',
  },
  {
    id: 'sp_2025_02_border',
    name: 'Frosty Fields Avatar Border',
    category: 'season-pass',
    subcategory: '2025-02-frosty-fields',
    expectedPath: 'season-pass/2025-02-frosty-fields/border.webp',
    description:
      'Avatar border frame shaped like an ice crown with dangling icicles. Transparent center for profile picture, frosted blue edges.',
  },
  {
    id: 'sp_2025_02_badge',
    name: 'Frosty Fields Badge',
    category: 'season-pass',
    subcategory: '2025-02-frosty-fields',
    expectedPath: 'season-pass/2025-02-frosty-fields/badge.webp',
    description:
      'Small participant badge shaped like a snowflake medal. Simple elegant design with ice blue coloring and subtle shimmer.',
  },
  {
    id: 'sp_2025_02_winter_wreath',
    name: 'Winter Wreath',
    category: 'season-pass',
    subcategory: '2025-02-frosty-fields',
    expectedPath: 'season-pass/2025-02-frosty-fields/winter-wreath.webp',
    description:
      'Festive winter wreath decoration with holly leaves, red berries, pinecones, and a red ribbon bow. Frosted evergreen branches.',
  },
  {
    id: 'sp_2025_02_frozen_pond',
    name: 'Frozen Pond',
    category: 'season-pass',
    subcategory: '2025-02-frosty-fields',
    expectedPath: 'season-pass/2025-02-frosty-fields/frozen-pond.webp',
    description:
      'Small frozen pond decoration with visible ice skating marks on the surface. Snow-covered edges, reflective ice surface.',
  },
  {
    id: 'sp_2025_02_aurora_lantern',
    name: 'Aurora Lantern',
    category: 'season-pass',
    subcategory: '2025-02-frosty-fields',
    expectedPath: 'season-pass/2025-02-frosty-fields/aurora-lantern.webp',
    description:
      'Glowing lantern decoration with magical aurora borealis effect emanating from within. Northern lights colors of green, purple, and blue swirling inside.',
  },
  {
    id: 'sp_2025_02_snowman_family',
    name: 'Snowman Family',
    category: 'season-pass',
    subcategory: '2025-02-frosty-fields',
    expectedPath: 'season-pass/2025-02-frosty-fields/snowman-family.webp',
    description:
      'Family of three snowmen decoration - parent snowmen and child. Each wearing colorful scarves, carrot noses, coal buttons, stick arms.',
  },

  // === SEASON PASS - MARCH 2026 ===
  {
    id: 'sp_2026_03_header',
    name: 'Header Banner',
    category: 'season-pass',
    subcategory: '2025-03-spring-bloom',
    expectedPath: 'season-pass/2025-03-spring-bloom/header.webp',
    description:
      'Modal header banner for Spring Bloom season. Spring farm scene with "Spring Bloom" text, cherry blossom petals falling gently, cozy farmhouse in background.',
  },
  {
    id: 'sp_2026_03_farm_bg',
    name: 'Farm Background',
    category: 'season-pass',
    subcategory: '2025-03-spring-bloom',
    expectedPath: 'season-pass/2025-03-spring-bloom/farm-bg.webp',
    description:
      'Premium farm background with lush green grass, spring trees with blossoming branches, subtle cherry blossom petals drifting down. Seasonal ambiance without being distracting. Grid-compatible layout for farm plots.',
  },
  {
    id: 'sp_2026_03_farm_bg_decoration',
    name: 'Farm BG Decoration Bar',
    category: 'season-pass',
    subcategory: '2025-03-spring-bloom',
    expectedPath: 'season-pass/2025-03-spring-bloom/farm-bg-decoration.webp',
    description:
      'Horizontal decoration strip with spring flowers, vines, and butterflies. Semi-transparent overlay for the bottom of the farm view.',
  },
  {
    id: 'sp_2026_03_farm_bg_slot',
    name: 'Farm BG Empty Slot',
    category: 'season-pass',
    subcategory: '2025-03-spring-bloom',
    expectedPath: 'season-pass/2025-03-spring-bloom/farm-bg-slot.webp',
    description:
      'Empty farm plot with spring flowers around the border, fresh tilled earth, small sprouts. Matches the spring background theme.',
  },
  {
    id: 'sp_2026_03_border',
    name: 'Avatar Border',
    category: 'season-pass',
    subcategory: '2025-03-spring-bloom',
    expectedPath: 'season-pass/2025-03-spring-bloom/border.webp',
    description:
      'Circular avatar frame made of intertwined flower vines, small cherry blossoms, and green leaves. Flower Crown style — delicate and spring-like.',
  },
  {
    id: 'sp_2026_03_badge',
    name: 'Season Badge',
    category: 'season-pass',
    subcategory: '2025-03-spring-bloom',
    expectedPath: 'season-pass/2025-03-spring-bloom/badge.webp',
    description:
      'Small participant badge shaped like a cherry blossom medal without text. Simple elegant design with soft pink and green coloring and subtle shimmer, no text.',
  },
  {
    id: 'sp_2026_03_trophy',
    name: 'Trophy',
    category: 'season-pass',
    subcategory: '2025-03-spring-bloom',
    expectedPath: 'season-pass/2025-03-spring-bloom/trophy.webp',
    description:
      'Decorative garden trophy/pedestal with spring flowers growing around it, a golden cup with cherry blossom motif. Farm decoration style.',
  },
  {
    id: 'sp_2026_03_cherry_blossom_tree',
    name: 'Cherry Blossom Tree',
    category: 'season-pass',
    subcategory: '2025-03-spring-bloom',
    expectedPath: 'season-pass/2025-03-spring-bloom/cherry-blossom-tree.webp',
    description:
      'Beautiful cherry blossom tree in full bloom, pink petals, some petals falling. Farm decoration that sits on a plot.',
  },
  {
    id: 'sp_2026_03_spring_flower_garden',
    name: 'Flower Garden',
    category: 'season-pass',
    subcategory: '2025-03-spring-bloom',
    expectedPath: 'season-pass/2025-03-spring-bloom/spring-flower-garden.webp',
    description:
      'Lush garden bed with colorful spring flowers — tulips, daffodils, hyacinths. Decorative fence or border around it.',
  },
  {
    id: 'sp_2026_03_butterfly_garden',
    name: 'Butterfly Garden',
    category: 'season-pass',
    subcategory: '2025-03-spring-bloom',
    expectedPath: 'season-pass/2025-03-spring-bloom/butterfly-garden.webp',
    description:
      'Garden with flowers and multiple colorful butterflies hovering. Small decorative fence, butterfly-friendly plants.',
  },
  {
    id: 'sp_2026_03_spring_fountain',
    name: 'Spring Fountain',
    category: 'season-pass',
    subcategory: '2025-03-spring-bloom',
    expectedPath: 'season-pass/2025-03-spring-bloom/spring-fountain.webp',
    description:
      'Ornamental garden fountain with water flowing, surrounded by spring flowers and vines. Stone base with moss.',
  },

  // === SEASON PASS - APRIL 2025 (BLOSSOM FESTIVAL) ===
  {
    id: 'blossom_festival_header',
    name: 'Blossom Festival Header',
    category: 'season-pass',
    subcategory: '2025-04-blossom-festival',
    expectedPath: 'season-pass/2025-04-blossom-festival/header.webp',
    description:
      'Modal header banner for Blossom Festival season. Twilight festival scene with "Blossom Festival" text, glowing lantern strings, parade bunting, drifting petals, and a warm sunset-to-evening sky.',
  },
  {
    id: 'blossom_festival_bg',
    name: 'Blossom Festival Farm Background',
    category: 'season-pass',
    subcategory: '2025-04-blossom-festival',
    expectedPath: 'season-pass/2025-04-blossom-festival/farm-bg.webp',
    description:
      'Full farm map backdrop themed like a spring night festival. Lantern glow, parade banners, blossom-lined paths, and pop-up stalls around the playable farm grid without blocking plot readability.',
  },
  {
    id: 'blossom_festival_bg_decoration',
    name: 'Blossom Festival Decoration Bar',
    category: 'season-pass',
    subcategory: '2025-04-blossom-festival',
    expectedPath: 'season-pass/2025-04-blossom-festival/farm-bg-decoration.webp',
    description:
      'Horizontal decorative strip with paper lanterns, tassels, bunting, and scattered petals that blends into the Blossom Festival background.',
  },
  {
    id: 'blossom_festival_bg_slot',
    name: 'Blossom Festival Empty Slot',
    category: 'season-pass',
    subcategory: '2025-04-blossom-festival',
    expectedPath: 'season-pass/2025-04-blossom-festival/farm-bg-slot.webp',
    description:
      'Empty farm slot with festive paving, lantern glow accents, and subtle petals while still clearly reading as a buildable tile.',
  },
  {
    id: 'sakura_frame_border',
    name: 'Sakura Frame Avatar Border',
    category: 'season-pass',
    subcategory: '2025-04-blossom-festival',
    expectedPath: 'season-pass/2025-04-blossom-festival/border.webp',
    description:
      'Circular festival frame with sakura blossoms, tassels, and tiny lantern accents. Transparent center, readable even at small profile sizes.',
  },
  {
    id: 'blossom_festival_badge',
    name: 'Blossom Festival Badge',
    category: 'season-pass',
    subcategory: '2025-04-blossom-festival',
    expectedPath: 'season-pass/2025-04-blossom-festival/badge.webp',
    description:
      'Compact blossom medal with a flower crest and subtle gold trim. Clean silhouette for badge collections and profile displays.',
  },
  {
    id: 'blossom_festival_trophy',
    name: 'Blossom Festival Trophy',
    category: 'season-pass',
    subcategory: '2025-04-blossom-festival',
    expectedPath: 'season-pass/2025-04-blossom-festival/trophy.webp',
    description:
      'Elegant festival trophy or shrine-like pedestal with lantern charms, blossom details, and a celebratory gold centerpiece.',
  },
  {
    id: 'sakura_lantern_cart',
    name: 'Sakura Lantern Cart',
    category: 'season-pass',
    subcategory: '2025-04-blossom-festival',
    expectedPath: 'season-pass/2025-04-blossom-festival/sakura-lantern-cart.webp',
    description:
      'Small wooden cart decorated with glowing paper lanterns, blossom branches, and festival ribbons. Should feel like a market prop on a single farm plot.',
  },
  {
    id: 'festival_gate',
    name: 'Festival Gate',
    category: 'season-pass',
    subcategory: '2025-04-blossom-festival',
    expectedPath: 'season-pass/2025-04-blossom-festival/festival-gate.webp',
    description:
      'Decorative festival entry gate with hanging flowers, banners, and lanterns. Reads as a celebratory spring landmark rather than a quiet garden piece.',
  },
  {
    id: 'petal_wagon',
    name: 'Petal Wagon',
    category: 'season-pass',
    subcategory: '2025-04-blossom-festival',
    expectedPath: 'season-pass/2025-04-blossom-festival/petal-wagon.webp',
    description:
      'A parade wagon overflowing with petals, festival crates, and bright cloth accents. Cozy, festive, and colorful without becoming visually noisy.',
  },
  {
    id: 'hanami_stage',
    name: 'Hanami Stage',
    category: 'season-pass',
    subcategory: '2025-04-blossom-festival',
    expectedPath: 'season-pass/2025-04-blossom-festival/hanami-stage.webp',
    description:
      'Raised blossom-viewing stage with lantern poles, fabric banners, and a public celebration feel, more festival square than garden picnic.',
  },

  // === SEASON PASS - MAY 2026 (VERDANT VALLEY) ===
  {
    id: 'verdant_valley_header',
    name: 'Verdant Valley Header',
    category: 'season-pass',
    subcategory: '2026-05-verdant-valley',
    expectedPath: 'season-pass/2026-05-verdant-valley/header.webp',
    description:
      'Modal header banner for Verdant Valley season. Lush valley scene with "Verdant Valley" text, overgrown greenery and ivy accents, distant rolling hills, and soft dawn light. Keep the left side readable for title text overlay.',
  },
  {
    id: 'verdant_valley_bg',
    name: 'Verdant Valley Farm Background',
    category: 'season-pass',
    subcategory: '2026-05-verdant-valley',
    expectedPath: 'season-pass/2026-05-verdant-valley/farm-bg.webp',
    description:
      'Full farm map backdrop themed as a wild spring valley. Dense foliage, mossy stones, and winding paths that keep crop plots readable.',
  },
  {
    id: 'verdant_valley_bg_decoration',
    name: 'Verdant Valley Decoration Bar',
    category: 'season-pass',
    subcategory: '2026-05-verdant-valley',
    expectedPath: 'season-pass/2026-05-verdant-valley/farm-bg-decoration.webp',
    description:
      'Horizontal strip with ferns, ivy, stones, and tiny wildflowers that blends into the Verdant Valley background.',
  },
  {
    id: 'verdant_valley_bg_slot',
    name: 'Verdant Valley Empty Slot',
    category: 'season-pass',
    subcategory: '2026-05-verdant-valley',
    expectedPath: 'season-pass/2026-05-verdant-valley/farm-bg-slot.webp',
    description:
      'Empty farm slot with mossy earth and subtle vine accents while still clearly reading as a buildable tile.',
  },
  {
    id: 'ivy_ring_border',
    name: 'Ivy Ring Avatar Border',
    category: 'season-pass',
    subcategory: '2026-05-verdant-valley',
    expectedPath: 'season-pass/2026-05-verdant-valley/border.webp',
    description:
      'Circular ivy-and-vine ring with tiny blossoms. Transparent center and clean silhouette for profile readability.',
  },
  {
    id: 'verdant_valley_badge',
    name: 'Verdant Valley Badge',
    category: 'season-pass',
    subcategory: '2026-05-verdant-valley',
    expectedPath: 'season-pass/2026-05-verdant-valley/badge.webp',
    description:
      'Compact leaf crest medallion with a bright green core and subtle gold trim.',
  },
  {
    id: 'verdant_valley_trophy',
    name: 'Verdant Valley Trophy',
    category: 'season-pass',
    subcategory: '2026-05-verdant-valley',
    expectedPath: 'season-pass/2026-05-verdant-valley/trophy.webp',
    description:
      'Stone-and-vine harvest trophy with a glowing leaf emblem and celebratory trim.',
  },
  {
    id: 'ivy_stone_arch',
    name: 'Ivy Stone Arch',
    category: 'season-pass',
    subcategory: '2026-05-verdant-valley',
    expectedPath: 'season-pass/2026-05-verdant-valley/ivy-stone-arch.webp',
    description:
      'A weathered stone arch wrapped in ivy and fresh growth, readable on a single farm tile.',
  },
  {
    id: 'fernstone_pathway',
    name: 'Fernstone Pathway',
    category: 'season-pass',
    subcategory: '2026-05-verdant-valley',
    expectedPath: 'season-pass/2026-05-verdant-valley/fernstone-pathway.webp',
    description:
      'Decorative pathway segment made of mossy stones and dense ferns, designed as a grounded map prop.',
  },
  {
    id: 'mossy_waterwheel',
    name: 'Mossy Waterwheel',
    category: 'season-pass',
    subcategory: '2026-05-verdant-valley',
    expectedPath: 'season-pass/2026-05-verdant-valley/mossy-waterwheel.webp',
    description:
      'Rustic wooden waterwheel with creeping moss and gentle valley-cottage styling.',
  },
  {
    id: 'wildflower_glade',
    name: 'Wildflower Glade',
    category: 'season-pass',
    subcategory: '2026-05-verdant-valley',
    expectedPath: 'season-pass/2026-05-verdant-valley/wildflower-glade.webp',
    description:
      'A dense patch of layered wildflowers, rocks, and shrubs that feels naturally overgrown but not noisy.',
  },

  // === SEASON PASS - JUNE 2026 (HONEY HOLLOW) ===
  {
    id: 'honey_hollow_header',
    name: 'Honey Hollow Header',
    category: 'season-pass',
    subcategory: '2026-06-honey-hollow',
    expectedPath: 'season-pass/2026-06-honey-hollow/header.webp',
    description:
      'Modal header banner for Honey Hollow season. Golden-hour hollow scene with "Honey Hollow" text, sunflower fields in the foreground, hillside beehives, honey jars on a crate, fireflies at dusk, and warm peach-to-blue sky. Keep the left side readable for title text overlay.',
  },
  {
    id: 'honey_hollow_bg',
    name: 'Honey Hollow Farm Background',
    category: 'season-pass',
    subcategory: '2026-06-honey-hollow',
    expectedPath: 'season-pass/2026-06-honey-hollow/farm-bg.webp',
    description:
      'Rolling meadow farm at golden hour. Sunflower borders along paths, distant beehives, warm peach-to-blue sky. Crop plots must stay readable.',
  },
  {
    id: 'honey_hollow_bg_decoration',
    name: 'Honey Hollow Decoration Bar',
    category: 'season-pass',
    subcategory: '2026-06-honey-hollow',
    expectedPath: 'season-pass/2026-06-honey-hollow/farm-bg-decoration.webp',
    description:
      'Horizontal strip with sunflowers, honeycomb trim, and scattered wildflowers that blends into the Honey Hollow background.',
  },
  {
    id: 'honey_hollow_bg_slot',
    name: 'Honey Hollow Empty Slot',
    category: 'season-pass',
    subcategory: '2026-06-honey-hollow',
    expectedPath: 'season-pass/2026-06-honey-hollow/farm-bg-slot.webp',
    description:
      'Empty farm slot with warm tilled earth and subtle sunflower or honey accents while still clearly reading as a buildable tile.',
  },
  {
    id: 'honeycomb_crown_border',
    name: 'Honeycomb Crown Avatar Border',
    category: 'season-pass',
    subcategory: '2026-06-honey-hollow',
    expectedPath: 'season-pass/2026-06-honey-hollow/border.webp',
    description:
      'Circular honeycomb hex ring with tiny bees and sunflower accents. Transparent center and clean silhouette for profile readability.',
  },
  {
    id: 'honey_hollow_badge',
    name: 'Honey Hollow Badge',
    category: 'season-pass',
    subcategory: '2026-06-honey-hollow',
    expectedPath: 'season-pass/2026-06-honey-hollow/badge.webp',
    description:
      'Compact honey dipper and sunflower crest with gold and amber tones.',
  },
  {
    id: 'honey_hollow_trophy',
    name: 'Honey Hollow Trophy',
    category: 'season-pass',
    subcategory: '2026-06-honey-hollow',
    expectedPath: 'season-pass/2026-06-honey-hollow/trophy.webp',
    description:
      'Golden harvest trophy on a honey barrel with a sunflower wreath. Farm decoration style, single plot.',
  },
  {
    id: 'golden_beehive',
    name: 'Golden Beehive',
    category: 'season-pass',
    subcategory: '2026-06-honey-hollow',
    expectedPath: 'season-pass/2026-06-honey-hollow/golden-beehive.webp',
    description:
      'Ornate painted beehive with bees circling. Cozy centerpiece readable on a single farm tile.',
  },
  {
    id: 'sunflower_row',
    name: 'Sunflower Row',
    category: 'season-pass',
    subcategory: '2026-06-honey-hollow',
    expectedPath: 'season-pass/2026-06-honey-hollow/sunflower-row.webp',
    description:
      'Dense row of tall sunflowers along a wooden fence. Grounded edge or pathway prop.',
  },
  {
    id: 'honey_market_stand',
    name: 'Honey Market Stand',
    category: 'season-pass',
    subcategory: '2026-06-honey-hollow',
    expectedPath: 'season-pass/2026-06-honey-hollow/honey-market-stand.webp',
    description:
      'Small wooden market stand with honey jars, comb display, and sunflowers.',
  },
  {
    id: 'picnic_pavilion',
    name: 'Picnic Pavilion',
    category: 'season-pass',
    subcategory: '2026-06-honey-hollow',
    expectedPath: 'season-pass/2026-06-honey-hollow/picnic-pavilion.webp',
    description:
      'Open gazebo with checkered cloth, harvest baskets, and subtle fireflies at dusk.',
  },

  // === SEASON PASS - JULY 2026 (SUNNY SHORES) ===
  {
    id: 'sunny_shores_header',
    name: 'Sunny Shores Header',
    category: 'season-pass',
    subcategory: '2026-07-sunny-shores',
    expectedPath: 'season-pass/2026-07-sunny-shores/header.webp',
    description:
      'Modal header banner for Sunny Shores season. Wide beach panorama with shoreline, palm shade, and bright summer sky evoking a sunny cove. Ocean blue, sandy gold, and foam tones. Keep the left side readable for title text overlay.',
  },
  {
    id: 'sunny_shores_bg',
    name: 'Sunny Shores Farm Background',
    category: 'season-pass',
    subcategory: '2026-07-sunny-shores',
    expectedPath: 'season-pass/2026-07-sunny-shores/farm-bg.webp',
    description:
      'Sandy beachside farm with rolling waves at the edge, palm shade, and bright summer sky. Crop plots must stay readable. Palette: ocean blue, deep teal, sandy gold, foam.',
  },
  {
    id: 'sunny_shores_bg_decoration',
    name: 'Sunny Shores Decoration Bar',
    category: 'season-pass',
    subcategory: '2026-07-sunny-shores',
    expectedPath: 'season-pass/2026-07-sunny-shores/farm-bg-decoration.webp',
    description:
      'Horizontal beach trim strip with shells, driftwood, and sandy accents that blends into the Sunny Shores background.',
  },
  {
    id: 'sunny_shores_bg_slot',
    name: 'Sunny Shores Empty Slot',
    category: 'season-pass',
    subcategory: '2026-07-sunny-shores',
    expectedPath: 'season-pass/2026-07-sunny-shores/farm-bg-slot.webp',
    description:
      'Sand-toned empty farm slot overlay with subtle shell or wave accents while still clearly reading as a buildable tile.',
  },
  {
    id: 'seabreeze_crown_border',
    name: 'Seabreeze Crown Avatar Border',
    category: 'season-pass',
    subcategory: '2026-07-sunny-shores',
    expectedPath: 'season-pass/2026-07-sunny-shores/border.webp',
    description:
      'Circular ring of seashells, starfish, and gentle waves. Transparent center and clean silhouette for profile readability.',
  },
  {
    id: 'sunny_shores_badge',
    name: 'Sunny Shores Badge',
    category: 'season-pass',
    subcategory: '2026-07-sunny-shores',
    expectedPath: 'season-pass/2026-07-sunny-shores/badge.webp',
    description:
      'Compact sun-and-wave emblem with ocean blue, sandy gold, and foam tones.',
  },
  {
    id: 'sunny_shores_trophy',
    name: 'Sunny Shores Trophy',
    category: 'season-pass',
    subcategory: '2026-07-sunny-shores',
    expectedPath: 'season-pass/2026-07-sunny-shores/trophy.webp',
    description:
      'Golden trophy with a beach and sun motif. Farm decoration style, single plot.',
  },
  {
    id: 'beach_umbrella',
    name: 'Beach Umbrella',
    category: 'season-pass',
    subcategory: '2026-07-sunny-shores',
    expectedPath: 'season-pass/2026-07-sunny-shores/beach-umbrella.webp',
    description:
      'Striped beach parasol over a towel. Epic premium decoration, readable on a single farm tile.',
  },
  {
    id: 'seashell_path',
    name: 'Seashell Path',
    category: 'season-pass',
    subcategory: '2026-07-sunny-shores',
    expectedPath: 'season-pass/2026-07-sunny-shores/seashell-path.webp',
    description:
      'Winding trail of scattered seashells along sandy ground. Rare free-track pathway prop.',
  },
  {
    id: 'tide_pool',
    name: 'Tide Pool',
    category: 'season-pass',
    subcategory: '2026-07-sunny-shores',
    expectedPath: 'season-pass/2026-07-sunny-shores/tide-pool.webp',
    description:
      'Rocky tide pool with starfish and anemones in clear shallow water. Epic premium decoration.',
  },
  {
    id: 'boardwalk_stand',
    name: 'Boardwalk Stand',
    category: 'season-pass',
    subcategory: '2026-07-sunny-shores',
    expectedPath: 'season-pass/2026-07-sunny-shores/boardwalk-stand.webp',
    description:
      'Wooden beach snack and drink stand on a boardwalk. Epic premium decoration, readable on a single farm tile.',
  },

  // === SEASON PASS - AUGUST 2026 (HARVEST FAIR) ===
  {
    id: 'harvest_fair_header',
    name: 'Harvest Fair Header',
    category: 'season-pass',
    subcategory: '2026-08-harvest-fair',
    expectedPath: 'season-pass/2026-08-harvest-fair/header.webp',
    description:
      'Modal header banner for Harvest Fair season. Fairground skyline with colorful bunting, distant ferris wheel, warm golden-hour dusk sky. Carnival red, warm gold, teal accents, cream tones. Keep the left side readable for title text overlay. Festive small-town county fair mood.',
  },
  {
    id: 'harvest_fair_bg',
    name: 'Harvest Fair Farm Background',
    category: 'season-pass',
    subcategory: '2026-08-harvest-fair',
    expectedPath: 'season-pass/2026-08-harvest-fair/farm-bg.webp',
    description:
      'Farm dressed for the county fair — triangular bunting, prize ribbons, ferris wheel on the horizon, warm golden-hour light. Crop plots must stay readable. Palette: carnival red #D4473E, deep red #A8322B, warm gold #F2B33D, teal #2E9BA6, cream #FFF3E6.',
  },
  {
    id: 'harvest_fair_bg_decoration',
    name: 'Harvest Fair Decoration Bar',
    category: 'season-pass',
    subcategory: '2026-08-harvest-fair',
    expectedPath: 'season-pass/2026-08-harvest-fair/farm-bg-decoration.webp',
    description:
      'Horizontal wooden fair-stall texture strip with bunting and ribbon accents that blends into the Harvest Fair farm background.',
  },
  {
    id: 'harvest_fair_bg_slot',
    name: 'Harvest Fair Empty Slot',
    category: 'season-pass',
    subcategory: '2026-08-harvest-fair',
    expectedPath: 'season-pass/2026-08-harvest-fair/farm-bg-slot.webp',
    description:
      'Fairground dirt and grass empty farm slot overlay — subtle trodden earth plot while still clearly reading as a buildable tile.',
  },
  {
    id: 'fair_champion_border',
    name: 'Fair Champion Avatar Border',
    category: 'season-pass',
    subcategory: '2026-08-harvest-fair',
    expectedPath: 'season-pass/2026-08-harvest-fair/border.webp',
    description:
      'Circular avatar border with blue prize ribbon crowned with fair string lights and gold stars. Transparent center, clean silhouette for profile readability. Carnival red and warm gold accents.',
  },
  {
    id: 'harvest_fair_badge',
    name: 'Harvest Fair Badge',
    category: 'season-pass',
    subcategory: '2026-08-harvest-fair',
    expectedPath: 'season-pass/2026-08-harvest-fair/badge.webp',
    description:
      'Compact blue-ribbon rosette emblem with subtle fair motif. Carnival red, warm gold, teal accents. Season completion badge.',
  },
  {
    id: 'harvest_fair_trophy',
    name: 'Harvest Fair Trophy',
    category: 'season-pass',
    subcategory: '2026-08-harvest-fair',
    expectedPath: 'season-pass/2026-08-harvest-fair/trophy.webp',
    description:
      'Grand blue-ribbon cup trophy on a wooden fair plinth. Farm decoration style, single plot, readable at small sizes.',
  },
  {
    id: 'ferris_wheel',
    name: 'Ferris Wheel',
    category: 'season-pass',
    subcategory: '2026-08-harvest-fair',
    expectedPath: 'season-pass/2026-08-harvest-fair/ferris-wheel.webp',
    description:
      'Cheerful county fair ferris wheel with warm glowing bulb lights. Epic premium decoration, isometric farm tile, readable on a single plot.',
  },
  {
    id: 'bunting_fence',
    name: 'Bunting Fence',
    category: 'season-pass',
    subcategory: '2026-08-harvest-fair',
    expectedPath: 'season-pass/2026-08-harvest-fair/bunting-fence.webp',
    description:
      'Wooden rail fence strung with colorful triangular carnival bunting flags. Rare free-track decoration, isometric farm tile.',
  },
  {
    id: 'pie_booth',
    name: 'Pie Booth',
    category: 'season-pass',
    subcategory: '2026-08-harvest-fair',
    expectedPath: 'season-pass/2026-08-harvest-fair/pie-booth.webp',
    description:
      'County fair baking table with golden pies and a blue first-prize ribbon. Epic premium decoration, isometric farm tile.',
  },
  {
    id: 'prize_ribbon_stand',
    name: 'Prize Ribbon Stand',
    category: 'season-pass',
    subcategory: '2026-08-harvest-fair',
    expectedPath: 'season-pass/2026-08-harvest-fair/prize-ribbon-stand.webp',
    description:
      'Display board of blue and gold prize rosettes and small fair trophies. Epic premium decoration, isometric farm tile.',
  },

  // === SEASON PASS - SEPTEMBER 2026 (GOLDEN GROVE) ===
  {
    id: 'golden_grove_header',
    name: 'Golden Grove Header',
    category: 'season-pass',
    subcategory: '2026-09-golden-grove',
    expectedPath: 'season-pass/2026-09-golden-grove/header.webp',
    description:
      'Modal header banner for Golden Grove season. Wide orchard panorama of golden apple trees, drifting autumn leaves, warm afternoon light. Ripe apples, amber canopy, earth-toned groves. Keep the left side readable for title text overlay. Cozy harvest-orchard mood.',
  },
  {
    id: 'golden_grove_bg',
    name: 'Golden Grove Farm Background',
    category: 'season-pass',
    subcategory: '2026-09-golden-grove',
    expectedPath: 'season-pass/2026-09-golden-grove/farm-bg.webp',
    description:
      'Sun-dappled orchard farm — golden canopy at the edges, cider barrels, scattered autumn leaves, warm afternoon light. Crop plots must stay readable. Palette: ripe apple red, amber gold, oak brown, cream, warm leaf yellow.',
  },
  {
    id: 'golden_grove_bg_decoration',
    name: 'Golden Grove Decoration Bar',
    category: 'season-pass',
    subcategory: '2026-09-golden-grove',
    expectedPath: 'season-pass/2026-09-golden-grove/farm-bg-decoration.webp',
    description:
      'Horizontal autumn trim strip with golden leaves, acorns, and ripe apples that blends into the Golden Grove farm background.',
  },
  {
    id: 'golden_grove_bg_slot',
    name: 'Golden Grove Empty Slot',
    category: 'season-pass',
    subcategory: '2026-09-golden-grove',
    expectedPath: 'season-pass/2026-09-golden-grove/farm-bg-slot.webp',
    description:
      'Leaf-strewn earth-toned empty farm slot overlay — orchard soil and scattered golden leaves while still clearly reading as a buildable tile.',
  },
  {
    id: 'gilded_leaf_border',
    name: 'Gilded Leaf Avatar Border',
    category: 'season-pass',
    subcategory: '2026-09-golden-grove',
    expectedPath: 'season-pass/2026-09-golden-grove/border.webp',
    description:
      'Circular avatar border wreath of golden leaves, acorns, and ripe apples. Transparent center, clean silhouette for profile readability. Amber gold and apple-red accents.',
  },
  {
    id: 'golden_grove_badge',
    name: 'Golden Grove Badge',
    category: 'season-pass',
    subcategory: '2026-09-golden-grove',
    expectedPath: 'season-pass/2026-09-golden-grove/badge.webp',
    description:
      'Compact golden leaf-and-apple emblem. Amber gold, ripe apple red, oak brown accents. Season completion badge.',
  },
  {
    id: 'golden_grove_trophy',
    name: 'Golden Grove Trophy',
    category: 'season-pass',
    subcategory: '2026-09-golden-grove',
    expectedPath: 'season-pass/2026-09-golden-grove/trophy.webp',
    description:
      'Golden trophy with a gilded apple motif. Farm decoration style, single plot, readable at small sizes.',
  },
  {
    id: 'cider_press',
    name: 'Cider Press',
    category: 'season-pass',
    subcategory: '2026-09-golden-grove',
    expectedPath: 'season-pass/2026-09-golden-grove/cider-press.webp',
    description:
      'Oak barrel cider press with fresh apples and a jug of cider. Epic premium decoration, isometric farm tile, readable on a single plot.',
  },
  {
    id: 'leafy_lane',
    name: 'Leafy Lane',
    category: 'season-pass',
    subcategory: '2026-09-golden-grove',
    expectedPath: 'season-pass/2026-09-golden-grove/leafy-lane.webp',
    description:
      'Winding path blanketed in golden autumn leaves. Rare free-track pathway prop, isometric farm tile.',
  },
  {
    id: 'apple_cart',
    name: 'Apple Cart',
    category: 'season-pass',
    subcategory: '2026-09-golden-grove',
    expectedPath: 'season-pass/2026-09-golden-grove/apple-cart.webp',
    description:
      'Wooden cart piled high with red-gold apples. Epic premium decoration, isometric farm tile, readable on a single plot.',
  },
  {
    id: 'orchard_swing',
    name: 'Orchard Swing',
    category: 'season-pass',
    subcategory: '2026-09-golden-grove',
    expectedPath: 'season-pass/2026-09-golden-grove/orchard-swing.webp',
    description:
      'Cozy rope swing hanging from a golden-leaved bough. Epic premium decoration, isometric farm tile, readable on a single plot.',
  },

  // === AMBIENT SEASON ===
  {
    id: 'ambient_winter_knit_hat',
    name: 'Winter Knit Hat',
    category: 'ambient-season',
    subcategory: 'winter',
    expectedPath: 'assets/images/seasons/ambient/winter/knit-hat.webp',
    description:
      'Tiny knit beanie with a pompom drawn as worn on a head (wearer removed), generic ¾ angle. Soft wool, rounded crown, chunky pompom. Centered with ~10% padding. No ground shadow. Survives horizontal flip. 256×256, transparent background. Readable at ~15–28px.',
  },
  {
    id: 'ambient_winter_snow_drift_1',
    name: 'Snow Drift 1',
    category: 'ambient-season',
    subcategory: 'winter',
    expectedPath: 'assets/images/seasons/ambient/winter/snow-drift-1.webp',
    description:
      'A small mound of soft fresh snow with a few pale blue shadows and tiny sparkles, drawn as a single self-contained heap. Compact mound roughly as tall as it is wide — fills ~90% of canvas width and at least 85% of canvas height. Base flush with the bottom edge, no gap, no ground line. Broad at the base, narrowing as it rises, uneven natural silhouette. Two or three large soft snowflakes hover above the heap with clear gaps between them. Five to eight large clearly separated snow shapes, not a fine texture. Roughly symmetrical left to right. 256×256 square, transparent background. No card, no strip, no band.',
  },
  {
    id: 'ambient_winter_snow_drift_2',
    name: 'Snow Drift 2',
    category: 'ambient-season',
    subcategory: 'winter',
    expectedPath: 'assets/images/seasons/ambient/winter/snow-drift-2.webp',
    description:
      'Second snow mound variant — same compact heap, slightly different silhouette. Soft fresh snow with pale blue shadows and tiny sparkles. Fills ~90% width and at least 85% height, base flush with the bottom edge. Two or three large soft snowflakes mid-air above the heap. Five to eight large snow shapes, roughly symmetrical. 256×256 square, transparent background. No strip, no band, no card.',
  },
  {
    id: 'ambient_spring_flower_crown',
    name: 'Flower Crown',
    category: 'ambient-season',
    subcategory: 'spring',
    expectedPath: 'assets/images/seasons/ambient/spring/flower-crown.webp',
    description:
      'Small daisy-and-pink-blossom flower crown drawn as worn on a head (wearer removed), generic ¾ angle. Sits on top of an animal head. Centered with ~10% padding. No ground shadow. Survives horizontal flip. 256×256, transparent background. Readable at ~15–28px.',
  },
  {
    id: 'ambient_spring_garland_1',
    name: 'Garland 1',
    category: 'ambient-season',
    subcategory: 'spring',
    expectedPath: 'assets/images/seasons/ambient/spring/garland-1.webp',
    description:
      'A small cluster of flowers and green leaves — daisies, pink blossoms, curling vines — drawn as a single self-contained mound. Compact heap roughly as tall as it is wide — fills ~90% of canvas width and at least 85% of canvas height. Base flush with the bottom edge, no gap, no ground line. Two or three loose blossom petals drifting above the heap with clear gaps. Five to eight large clearly separated blooms and leaves, not a fine texture. Roughly symmetrical left to right. 256×256 square, transparent background. No card, no strip, no band.',
  },
  {
    id: 'ambient_spring_garland_2',
    name: 'Garland 2',
    category: 'ambient-season',
    subcategory: 'spring',
    expectedPath: 'assets/images/seasons/ambient/spring/garland-2.webp',
    description:
      'Second flower-cluster variant — sparser blooms, different mix (more vines, fewer daisies). Same compact mound: ~90% width, at least 85% height, base flush with the bottom edge. Two or three loose blossom petals drifting above. Five to eight large shapes, roughly symmetrical. 256×256 square, transparent background. No strip, no band, no card.',
  },
  {
    id: 'ambient_summer_sunglasses',
    name: 'Sunglasses',
    category: 'ambient-season',
    subcategory: 'summer',
    expectedPath: 'assets/images/seasons/ambient/summer/sunglasses.webp',
    description:
      'Chunky rounded black sunglasses drawn as worn on a face (wearer removed), generic ¾ angle — the Hay Day pig-in-sunglasses moment. Centered with ~10% padding. No ground shadow. Survives horizontal flip. 256×256, transparent background. Readable at ~15–28px.',
  },
  {
    id: 'ambient_summer_hay_bale_1',
    name: 'Hay Bale 1',
    category: 'ambient-season',
    subcategory: 'summer',
    expectedPath: 'assets/images/seasons/ambient/summer/hay-bale-1.webp',
    description:
      'A round golden hay bale seen from the side, drawn as a single self-contained mound. Pale sun-bleached yellow straw — not amber, not burnt orange, not harvest-red (those belong to autumn). Compact heap roughly as tall as it is wide — fills ~90% of canvas width and at least 85% of canvas height. Base flush with the bottom edge, no gap, no ground line. Two or three loose straw stalks drifting above the bale with clear gaps. Chunky wrapped coils of straw, not a fine texture. Roughly symmetrical left to right. 256×256 square, transparent background. No card, no strip, no band.',
  },
  {
    id: 'ambient_summer_hay_bale_2',
    name: 'Hay Bale 2',
    category: 'ambient-season',
    subcategory: 'summer',
    expectedPath: 'assets/images/seasons/ambient/summer/hay-bale-2.webp',
    description:
      'Two stacked square straw bales, centered, with two or three white daisies tucked into the binding twine. Pale sun-bleached yellow straw — not amber, not burnt orange, not harvest-red. Compact stack roughly as tall as it is wide — fills ~90% of canvas width and at least 85% of canvas height. Base flush with the bottom edge, no gap, no ground line. Two or three loose straw stalks or daisy petals drifting above with clear gaps. Chunky bale shapes, not a fine texture. Roughly symmetrical left to right. 256×256 square, transparent background. No card, no strip, no band.',
  },
  {
    id: 'ambient_autumn_straw_hat',
    name: 'Straw Hat',
    category: 'ambient-season',
    subcategory: 'autumn',
    expectedPath: 'assets/images/seasons/ambient/autumn/straw-hat.webp',
    description:
      'Little straw sun hat drawn as worn on a head (wearer removed), generic ¾ angle. Wide floppy brim, rounded crown, warm golden straw with a russet or brown band. The brim is what makes it read as harvest rather than winter. Centered with ~10% padding. No ground shadow. Survives horizontal flip. 256×256, transparent background. Readable at ~15–28px.',
  },
  {
    id: 'ambient_autumn_leaf_pile_1',
    name: 'Leaf Pile 1',
    category: 'ambient-season',
    subcategory: 'autumn',
    expectedPath: 'assets/images/seasons/ambient/autumn/leaf-pile-1.webp',
    description:
      'A small heap of fallen autumn leaves in amber, burnt orange and deep red, drawn as a single self-contained mound. Compact heap roughly as tall as it is wide — fills ~90% of canvas width and at least 85% of canvas height. Base flush with the bottom edge, no gap, no ground line. Two or three single maple leaves tumbling above the heap with clear gaps. Five to eight large clearly separated leaves, not twenty tiny ones. Roughly symmetrical left to right. 256×256 square, transparent background. No card, no strip, no band.',
  },
  {
    id: 'ambient_autumn_leaf_pile_2',
    name: 'Leaf Pile 2',
    category: 'ambient-season',
    subcategory: 'autumn',
    expectedPath: 'assets/images/seasons/ambient/autumn/leaf-pile-2.webp',
    description:
      'Reference-shape leaf mound — fills ~98% width and ~86% height, flush to the bottom edge, with three maple leaves mid-tumble above it. Compact heap of five to eight large amber, burnt-orange and deep-red leaves, roughly as tall as it is wide. Roughly symmetrical. 256×256 square, transparent background. No strip, no band, no card.',
  },
  {
    id: 'ambient_holiday_santa_hat',
    name: 'Santa Hat',
    category: 'ambient-season',
    subcategory: 'holiday-week',
    expectedPath: 'assets/images/seasons/ambient/holiday-week/santa-hat.webp',
    description:
      'Classic red santa hat with white trim and a white pompom, drawn as worn on a head (wearer removed), generic ¾ angle. Centered with ~10% padding. No ground shadow. Survives horizontal flip. 256×256, transparent background. Readable at ~15–28px.',
  },

  // === AVATAR BORDERS ===
  {
    id: 'golden_harvest_border',
    name: 'Golden Harvest',
    category: 'avatar-border',
    expectedPath: 'avatar-border/golden_harvest.webp',
    description:
      'Shimmering golden circular frame with wheat stalks and harvest motifs, glowing golden aura, luxurious champion border for user avatar, cartoon farm game style',
  },
  {
    id: 'emerald_vine_border',
    name: 'Emerald Vine',
    category: 'avatar-border',
    expectedPath: 'avatar-border/emerald_vine.webp',
    description:
      'Lush green circular frame with intertwining vines, leaves, and small flowers wrapping around, natural forest feel, cartoon avatar border for farm game',
  },
  {
    id: 'rustic_barn_border',
    name: 'Rustic Barn Border',
    category: 'avatar-border',
    expectedPath: 'avatar-border/rustic_barn.webp',
    description:
      'Weathered wood planks circular frame from the old barn, rustic brown tones with nail details and aged texture, cartoon avatar border for farm game',
  },
  {
    id: 'staff_member_border',
    name: 'Staff Member Border',
    category: 'avatar-border',
    expectedPath: 'avatar-border/staff_member.webp',
    description:
      'Premium circular avatar border for game staff members. Thick dark navy blue ring with polished gold outer trim and thin vibrant cyan inner glow. Ornate gold shield crest at top with five-pointed gold star and STAFF text in gold serif caps. Horizontal gold nameplate banner at bottom with STAFF MEMBER in gold caps. Stylized gold wing or laurel ornaments on left and right sides, each with a glowing cyan diamond gem. Regal authoritative aesthetic with metallic gold highlights and magical cyan energy glow. Transparent center for user profile photo.',
  },

  // === COOP ===
  {
    id: 'coop_community',
    name: 'Coop Community',
    category: 'coop',
    expectedPath: 'coop/coop_community.webp',
    description:
      'Cozy community home or gathering place for coop members, friendly shared space with welcoming atmosphere, cartoon farm game style',
  },
  {
    id: 'coop_sunrise',
    name: 'Coop Sunrise',
    category: 'coop',
    expectedPath: 'coop/coop_sunrise.webp',
    description:
      'Beautiful sunrise over the farm with warm orange and pink sky, representing the daily coop check-in task, peaceful morning scene, cartoon farm game style',
  },
  {
    id: 'coop_barn',
    name: 'Coop Barn',
    category: 'coop',
    expectedPath: 'coop/barn.webp',
    description:
      'Classic red wooden barn, home base for the farm, instantly recognizable farming icon, cozy and welcoming, cartoon farm game style',
  },
  {
    id: 'coop_wheat',
    name: 'Coop Wheat Bundle',
    category: 'coop',
    expectedPath: 'coop/wheat.webp',
    description:
      'Golden bundle of wheat stalks tied together, symbolizing harvest, teamwork, and abundance, represents collective effort, cartoon farm game style',
  },
  {
    id: 'coop_chicken',
    name: 'Coop Chicken',
    category: 'coop',
    expectedPath: 'coop/chicken.webp',
    description:
      'Cute cheerful chicken, lively and playful, adds charm and personality to the coop, friendly cartoon farm animal',
  },
  {
    id: 'coop_cow',
    name: 'Coop Cow',
    category: 'coop',
    expectedPath: 'coop/cow.webp',
    description:
      'Friendly spotted cow, represents steady production and reliability, reads well even at small sizes, classic cartoon farm animal',
  },
  {
    id: 'coop_windmill',
    name: 'Coop Windmill',
    category: 'coop',
    expectedPath: 'coop/windmill.webp',
    description:
      'Traditional windmill with rotating blades, symbolizes progress and working together, feels slightly advanced without being intimidating, cartoon farm game style',
  },
  {
    id: 'coop_watering_can',
    name: 'Coop Watering Can',
    category: 'coop',
    expectedPath: 'coop/watering_can.webp',
    description:
      'Classic metal watering can with spout, perfect metaphor for care, growth, and helping others in the coop, cartoon farm tool',
  },
  {
    id: 'coop_basket',
    name: 'Coop Harvest Basket',
    category: 'coop',
    expectedPath: 'coop/basket.webp',
    description:
      'Woven harvest basket or crate filled with produce, represents sharing, donating, and helping hands, strong tie to donation mechanics, cartoon farm game style',
  },
  {
    id: 'coop_sun_fields',
    name: 'Coop Sun over Fields',
    category: 'coop',
    expectedPath: 'coop/sun_fields.webp',
    description:
      'Bright sun shining over rolling farm fields, represents optimism, warmth, and daily rhythm, cozy emotional anchor, cartoon farm game style',
  },
  {
    id: 'coop_sprout',
    name: 'Coop Sprout',
    category: 'coop',
    expectedPath: 'coop/sprout.webp',
    description:
      'Fresh green leaf or young sprout emerging from soil, symbolizes new beginnings and young coops, great for early-game identity, cartoon farm game style',
  },
  {
    id: 'coop_tractor',
    name: 'Coop Tractor',
    category: 'coop',
    expectedPath: 'coop/tractor.webp',
    description:
      'Classic red farm tractor, represents productivity and efficiency, slightly harder vibe for players who want that, cartoon farm game style',
  },
  {
    id: 'coop_weekly_chest_bronze',
    name: 'Coop Weekly Chest (Bronze)',
    category: 'coop',
    expectedPath: 'coop/weekly_chest_bronze.webp',
    description:
      'Bronze reward chest for weekly coop rewards, sturdy wooden chest with bronze metal bands and small sparkle, cartoon farm game UI icon',
  },
  {
    id: 'coop_weekly_chest_silver',
    name: 'Coop Weekly Chest (Silver)',
    category: 'coop',
    expectedPath: 'coop/weekly_chest_silver.webp',
    description:
      'Silver reward chest for weekly coop rewards, sturdy wooden chest with bright silver metal bands and subtle sparkle, cartoon farm game UI icon',
  },
  {
    id: 'coop_weekly_chest_gold',
    name: 'Coop Weekly Chest (Gold)',
    category: 'coop',
    expectedPath: 'coop/weekly_chest_gold.webp',
    description:
      'Gold reward chest for weekly coop rewards, premium wooden chest with shiny gold metal bands, glow and sparkles, cartoon farm game UI icon',
  },
  {
    id: 'coop_rest_day',
    name: 'Coop Rest Day',
    category: 'coop',
    expectedPath: 'coop/rest_day.webp',
    description:
      'Peaceful rest day icon representing the free Monday without weekly goals, relaxed atmosphere with calm elements like a hammock, moon, or peaceful scene, cartoon farm game style',
  },
  {
    id: 'coop_chat',
    name: 'Coop Chat',
    category: 'coop',
    expectedPath: 'coop/chat.webp',
    description:
      'Chat or message icon for coop communication, speech bubbles or envelope with friendly farm vibe, inviting and readable at small size, cartoon farm game style',
  },

  // === BACKGROUNDS ===
  {
    id: 'golden_meadow_bg',
    name: 'Golden Meadow',
    category: 'backgrounds',
    expectedPath: 'backgrounds/golden_meadow.webp',
    description:
      'Warm sunset hues over rolling golden fields, orange and pink sky, peaceful countryside landscape, cartoon farm game background',
  },
  {
    id: 'misty_morning_bg',
    name: 'Misty Morning',
    category: 'backgrounds',
    expectedPath: 'backgrounds/misty_morning.webp',
    description:
      'Peaceful fog drifting across farmland at dawn, soft blue and white mist, gentle morning light, serene cartoon farm game background',
  },

  // === SANCTUARY ===
  // Tokens
  {
    id: 'sanctuary_token_green',
    name: 'Sanctuary Token (Green)',
    category: 'sanctuary',
    expectedPath: 'icons/sanctuary/sanctuary_token_green.webp',
    description:
      'Green sanctuary token, circular coin with nature symbol, vibrant emerald color, cartoon farm game style',
  },
  {
    id: 'sanctuary_token_blue',
    name: 'Sanctuary Token (Blue)',
    category: 'sanctuary',
    expectedPath: 'icons/sanctuary/sanctuary_token_blue.webp',
    description:
      'Blue sanctuary token, circular coin with nature symbol, vibrant sapphire color, cartoon farm game style',
  },
  {
    id: 'sanctuary_token_purple',
    name: 'Sanctuary Token (Purple)',
    category: 'sanctuary',
    expectedPath: 'icons/sanctuary/sanctuary_token_purple.webp',
    description:
      'Purple sanctuary token, circular coin with nature symbol, vibrant amethyst color, cartoon farm game style',
  },
  {
    id: 'sanctuary_token_gold',
    name: 'Sanctuary Token (Gold)',
    category: 'sanctuary',
    expectedPath: 'icons/sanctuary/sanctuary_token_gold.webp',
    description:
      'Gold sanctuary token, circular coin with nature symbol, shiny golden color, premium rarity, cartoon farm game style',
  },
  {
    id: 'sanctuary_token_random',
    name: 'Sanctuary Token (Random)',
    category: 'sanctuary',
    expectedPath: 'icons/sanctuary/sanctuary_token_random.webp',
    description:
      'Mystery token with swirling colors or question mark, represents a random token drop that could be green, blue, purple, or gold, exciting surprise element, cartoon farm game style',
  },
  // Animals
  {
    id: 'peacock',
    name: 'Peacock',
    category: 'sanctuary',
    expectedPath: 'icons/sanctuary/peacock.webp',
    description:
      'Majestic peacock with vibrant blue and green iridescent feathers, elegant tail display, regal posture, cartoon farm game style',
  },
  {
    id: 'peacock_locked',
    name: 'Peacock (Locked)',
    category: 'sanctuary',
    expectedPath: 'icons/sanctuary/peacock_locked.webp',
    description:
      'Silhouette of peacock with lock overlay, grayed out appearance, indicates locked/unavailable animal, cartoon farm game style',
  },
  {
    id: 'flamingo',
    name: 'Flamingo',
    category: 'sanctuary',
    expectedPath: 'icons/sanctuary/flamingo.webp',
    description:
      'Graceful pink flamingo standing on one leg, long curved neck, tropical bird, cartoon farm game style',
  },
  {
    id: 'flamingo_locked',
    name: 'Flamingo (Locked)',
    category: 'sanctuary',
    expectedPath: 'icons/sanctuary/flamingo_locked.webp',
    description:
      'Silhouette of flamingo with lock overlay, grayed out appearance, indicates locked/unavailable animal, cartoon farm game style',
  },
  {
    id: 'alpaca',
    name: 'Alpaca',
    category: 'sanctuary',
    expectedPath: 'icons/sanctuary/alpaca.webp',
    description:
      'Friendly fluffy alpaca with long neck, soft woolly coat, cute expression, cartoon farm game style',
  },
  {
    id: 'alpaca_locked',
    name: 'Alpaca (Locked)',
    category: 'sanctuary',
    expectedPath: 'icons/sanctuary/alpaca_locked.webp',
    description:
      'Silhouette of alpaca with lock overlay, grayed out appearance, indicates locked/unavailable animal, cartoon farm game style',
  },
  {
    id: 'reindeer',
    name: 'Reindeer',
    category: 'sanctuary',
    expectedPath: 'icons/sanctuary/reindeer.webp',
    description:
      'Noble reindeer with impressive antlers, brown fur, friendly expression, winter animal, cartoon farm game style',
  },
  {
    id: 'reindeer_locked',
    name: 'Reindeer (Locked)',
    category: 'sanctuary',
    expectedPath: 'icons/sanctuary/reindeer_locked.webp',
    description:
      'Silhouette of reindeer with lock overlay, grayed out appearance, indicates locked/unavailable animal, cartoon farm game style',
  },
  {
    id: 'panda',
    name: 'Panda',
    category: 'sanctuary',
    expectedPath: 'icons/sanctuary/panda.webp',
    description:
      'Adorable black and white panda, round fluffy body, cute expression, bamboo eater, cartoon farm game style',
  },
  {
    id: 'panda_locked',
    name: 'Panda (Locked)',
    category: 'sanctuary',
    expectedPath: 'icons/sanctuary/panda_locked.webp',
    description:
      'Silhouette of panda with lock overlay, grayed out appearance, indicates locked/unavailable animal, cartoon farm game style',
  },
  {
    id: 'unicorn',
    name: 'Unicorn',
    category: 'sanctuary',
    expectedPath: 'icons/sanctuary/unicorn.webp',
    description:
      'Magical unicorn with spiral horn, flowing mane, elegant white or pastel colors, sparkles and magic aura, cartoon farm game style',
  },
  {
    id: 'unicorn_locked',
    name: 'Unicorn (Locked)',
    category: 'sanctuary',
    expectedPath: 'icons/sanctuary/unicorn_locked.webp',
    description:
      'Silhouette of unicorn with lock overlay, grayed out appearance, indicates locked/unavailable animal, cartoon farm game style',
  },
  {
    id: 'phoenix',
    name: 'Phoenix',
    category: 'sanctuary',
    expectedPath: 'icons/sanctuary/phoenix.webp',
    description:
      'Mythical phoenix with fiery red and orange feathers, golden accents, majestic wings spread, flames and sparkles, cartoon farm game style',
  },
  {
    id: 'phoenix_locked',
    name: 'Phoenix (Locked)',
    category: 'sanctuary',
    expectedPath: 'icons/sanctuary/phoenix_locked.webp',
    description:
      'Silhouette of phoenix with lock overlay, grayed out appearance, indicates locked/unavailable animal, cartoon farm game style',
  },
  // Feed Item
  {
    id: 'sanctuary_feed',
    name: 'Sanctuary Feed',
    category: 'sanctuary',
    expectedPath: 'icons/sanctuary/sanctuary_feed.webp',
    description:
      'Special feed for sanctuary animals, colorful bag or container with nature symbols, premium animal feed, cartoon farm game style',
  },
  // UI Elements
  {
    id: 'sanctuary_icon',
    name: 'Sanctuary Icon',
    category: 'sanctuary',
    expectedPath: 'icons/sanctuary/sanctuary_icon.webp',
    description:
      'Tab or menu icon for sanctuary feature, nature-themed symbol, compact design for UI navigation, cartoon farm game style',
  },
  {
    id: 'feed_ready',
    name: 'Feed Ready Indicator',
    category: 'sanctuary',
    expectedPath: 'icons/sanctuary/feed_ready.webp',
    description:
      'Visual indicator showing animal can be fed, notification badge or icon with feed symbol, bright and attention-grabbing, cartoon farm game style',
  },
  {
    id: 'habitat_background',
    name: 'Habitat Background',
    category: 'sanctuary',
    expectedPath: 'icons/sanctuary/habitat_background.webp',
    description:
      'Background tile or texture for animal pen/habitat, natural environment with grass or terrain, decorative base for animal display, cartoon farm game style',
  },

  // === COSMETICS ===
  // Decorations
  {
    id: 'coop_heart_statue',
    name: 'Coop Heart Statue',
    category: 'cosmetics',
    subcategory: 'decoration',
    expectedPath: 'cosmetics/decorations/coop_heart_statue.webp',
    description:
      'A small stone pedestal with a glowing pink heart on top. Entry-level prestige decoration showing coop membership. Cute stone/marble pedestal base, pink/magenta glowing heart floating or resting on top. Simple but charming. Soft glow effect around the heart.',
  },
  {
    id: 'coop_golden_banner',
    name: 'Golden Coop Banner',
    category: 'cosmetics',
    subcategory: 'decoration',
    expectedPath: 'cosmetics/decorations/coop_golden_banner.webp',
    description:
      'A fancy vertical banner with a heart emblem and gold trim. Shows dedication to the coop. Tall vertical flag/banner on a pole. Rich purple or deep red fabric with gold edges/trim. Heart emblem in the center. Slight flutter/wave to show movement.',
  },
  {
    id: 'coop_crystal_fountain',
    name: 'Crystal Heart Fountain',
    category: 'cosmetics',
    subcategory: 'decoration',
    expectedPath: 'cosmetics/decorations/coop_crystal_fountain.webp',
    description:
      'An elegant fountain with water flowing around a central crystal heart. Premium prestige decoration. Ornate fountain base (stone or marble), crystal/gem heart in the center with water cascading around it. Sparkle effects. Luxurious and eye-catching.',
  },
  // Avatar Borders
  {
    id: 'border_heart_wreath',
    name: 'Heart Wreath Border',
    category: 'cosmetics',
    subcategory: 'border',
    expectedPath: 'cosmetics/borders/border_heart_wreath.webp',
    description:
      "A circular frame of small pink and red hearts forming a wreath around the player's avatar. Ring/wreath shape made of small hearts in varying shades of pink and red. Warm, friendly aesthetic. Should work as a frame around a circular avatar.",
  },
  {
    id: 'border_starlight_crown',
    name: 'Starlight Crown Border',
    category: 'cosmetics',
    subcategory: 'border',
    expectedPath: 'cosmetics/borders/border_starlight_crown.webp',
    description:
      'Golden stars and sparkles forming a crown-like frame around the avatar. Premium border with subtle glow. Crown/tiara shape at top made of golden stars, with smaller stars and sparkles scattered around the circular frame. Soft golden glow effect. Prestigious feel.',
  },
  // Farm Backgrounds
  {
    id: 'bg_aurora_skies',
    name: 'Aurora Skies',
    category: 'cosmetics',
    subcategory: 'background',
    expectedPath: 'cosmetics/backgrounds/bg_aurora_skies.webp',
    description:
      'A stunning night sky with colorful northern lights. The ultimate coop prestige item. Dark night sky with vibrant aurora borealis in purple, green, and pink gradients. Stars twinkling. Ethereal and beautiful. Should tile/work as a farm background.',
  },

  // === SHOP - Diamond Packages ===
  {
    id: 'diamond_pack_small',
    name: 'Small Diamond Pack',
    category: 'shop',
    expectedPath: 'shop/diamond_pack_small.webp',
    description:
      'A small pile of sparkling blue diamonds, about 5-6 brilliant cut gems loosely scattered, cartoon game shop icon',
  },
  {
    id: 'diamond_pack_medium',
    name: 'Medium Diamond Pack',
    category: 'shop',
    expectedPath: 'shop/diamond_pack_medium.webp',
    description:
      'A medium pile of sparkling blue diamonds, around 15-20 brilliant cut gems stacked together with bright sparkles, cartoon game shop icon',
  },
  {
    id: 'diamond_pack_large',
    name: 'Large Diamond Pack',
    category: 'shop',
    expectedPath: 'shop/diamond_pack_large.webp',
    description:
      'A large overflowing pile of sparkling blue diamonds, dozens of brilliant cut gems heaped together with radiant glow and sparkle effects, cartoon game shop icon',
  },
  {
    id: 'diamond_pack_giant',
    name: 'Giant Diamond Pack',
    category: 'shop',
    expectedPath: 'shop/diamond_pack_giant.webp',
    description:
      'A massive treasure hoard of sparkling blue diamonds, an enormous mountain of brilliant cut gems with intense radiant glow, light rays, and dazzling sparkle effects everywhere, cartoon game shop icon',
  },
  {
    id: 'diamond_pack_big',
    name: 'Big Diamond Pack',
    category: 'shop',
    expectedPath: 'shop/diamond_pack_big.webp',
    description:
      'A big overflowing chest of sparkling blue diamonds, brilliant cut gems spilling out of a wooden treasure chest with bright sparkle trails and glowing aura, cartoon game shop icon',
  },
  {
    id: 'diamond_pack_ultimate',
    name: 'Ultimate Diamond Pack',
    category: 'shop',
    expectedPath: 'shop/diamond_pack_ultimate.webp',
    description:
      'An ultimate legendary vault overflowing with sparkling blue diamonds, countless brilliant cut gems cascading from a golden chest with blinding radiant beams, swirling sparkle effects, and a glowing golden halo, cartoon game shop icon',
  },

  // === SPECIAL EVENTS - EASTER ===
  {
    id: 'easter_egg_1',
    name: 'Easter Egg 1',
    category: 'special-events',
    subcategory: 'easter',
    expectedPath: 'special-events/easter/easter_egg_1.webp',
    description:
      'A brightly painted Easter egg with pastel pink, sky blue, and mint green stripes, decorated with tiny white polka dots and golden swirl patterns. Nestled in soft spring grass with small flowers.',
  },
  {
    id: 'easter_egg_2',
    name: 'Easter Egg 2',
    category: 'special-events',
    subcategory: 'easter',
    expectedPath: 'special-events/easter/easter_egg_2.webp',
    description:
      'A brightly painted Easter egg with soft coral, turquoise, and peach stripes, decorated with tiny white polka dots and golden swirl patterns. Nestled in soft spring grass with small flowers.',
  },
  {
    id: 'easter_egg_3',
    name: 'Easter Egg 3',
    category: 'special-events',
    subcategory: 'easter',
    expectedPath: 'special-events/easter/easter_egg_3.webp',
    description:
      'A brightly painted Easter egg with warm sunset orange, lavender, and lemon yellow stripes, decorated with tiny white polka dots and golden swirl patterns. Nestled in soft spring grass with small flowers.',
  },
  {
    id: 'easter_egg_golden',
    name: 'Golden Easter Egg',
    category: 'special-events',
    subcategory: 'easter',
    expectedPath: 'special-events/easter/easter_egg_golden.webp',
    description:
      'A shimmering golden Easter egg with a polished metallic surface, decorated with tiny white polka dots and elegant swirl engravings. Nestled in soft spring grass with small flowers, glowing faintly with a warm golden light.',
  },
  {
    id: 'easter_basket',
    name: 'Easter Basket',
    category: 'special-events',
    subcategory: 'easter',
    expectedPath: 'special-events/easter/easter_basket.webp',
    description:
      'A woven wicker basket overflowing with colorful painted Easter eggs in pastel pink, sky blue, mint green, coral, lavender, and one shimmering golden egg peeking out on top. Tied with a ribbon bow, nestled in soft spring grass. Designed as a round floating action button icon.',
  },

  // === SPECIAL EVENTS - FIREFLY FESTIVAL ===
  {
    id: 'firefly_festival_bg',
    name: 'Firefly Festival Background',
    category: 'special-events',
    subcategory: 'firefly-festival',
    expectedPath: 'special-events/firefly-festival/bg.webp',
    description:
      'A twilight summer meadow looking out over farm fields, dotted with warm yellow-green fireflies drifting above the grass and a distant Great Lantern silhouette glowing on the horizon. Tall portrait event background — detailed foreground grass and fence line along the bottom, framing foliage at the top, and a calm uncluttered middle band so text can be overlaid on it.',
  },
  {
    id: 'firefly_lantern_jar',
    name: 'Firefly Lantern Jar',
    category: 'special-events',
    subcategory: 'firefly-festival',
    expectedPath: 'special-events/firefly-festival/lantern_jar.webp',
    description:
      'A small glass mason jar lantern with a rope handle and metal lid, several yellow-green fireflies glowing inside and lighting the glass from within. Chunky rounded silhouette that stays readable at 44px. Transparent background.',
  },
  {
    id: 'firefly_1',
    name: 'Firefly 1',
    category: 'special-events',
    subcategory: 'firefly-festival',
    expectedPath: 'special-events/firefly-festival/firefly_1.webp',
    description:
      'A single cute stylized firefly with a rounded body, small folded wings, and a glowing yellow-green abdomen, seen from a gentle three-quarter side view. Soft baked glow hugging the body, bold readable silhouette at 40px. Transparent background.',
  },
  {
    id: 'firefly_2',
    name: 'Firefly 2',
    category: 'special-events',
    subcategory: 'firefly-festival',
    expectedPath: 'special-events/firefly-festival/firefly_2.webp',
    description:
      'A single cute stylized firefly in a slightly different pose from the first variant — wings spread mid-flutter, body angled upward, glowing lime-green abdomen with a cooler green tint. Soft baked glow hugging the body, bold readable silhouette at 40px. Transparent background.',
  },
  {
    id: 'firefly_3',
    name: 'Firefly 3',
    category: 'special-events',
    subcategory: 'firefly-festival',
    expectedPath: 'special-events/firefly-festival/firefly_3.webp',
    description:
      'A single cute stylized firefly in a third pose — resting with wings tucked and body tilted to one side, glowing warm yellow-green abdomen. Soft baked glow hugging the body, bold readable silhouette at 40px. Transparent background.',
  },
  {
    id: 'firefly_sunbeam',
    name: 'Sunbeam Firefly',
    category: 'special-events',
    subcategory: 'firefly-festival',
    expectedPath: 'special-events/firefly-festival/firefly_sunbeam.webp',
    description:
      'A rare Sunbeam Firefly — the same cute stylized firefly shape but in warm amber and gold, with a brilliant sun-bright abdomen casting short crisp sun-ray spokes and a few small gold sparkles. Clearly reads as special and more valuable than the common green fireflies at 40px. Transparent background.',
  },
  {
    id: 'firefly_great_lantern',
    name: 'Great Lantern',
    category: 'special-events',
    subcategory: 'firefly-festival',
    expectedPath: 'special-events/firefly-festival/great_lantern.webp',
    description:
      'A large ornate festival lantern standing on a wooden base, with a warm gold metal frame and tall clear glass panels, a few fireflies glowing inside. Hero object for the community progress surface — the glass interior stays open and evenly lit so a warm fill overlay can be drawn over it. Transparent background.',
  },
];

// === LAKE ===
const lakeItems: ItemDefinition[] = [
  // Fish Icons
  {
    id: 'minnow',
    name: 'Minnow',
    category: 'lake',
    expectedPath: 'assets/images/icons/fish/minnow.webp',
    description:
      'Tiny pudgy silver fish with a round body and big dark eye, chunky cartoon freshwater minnow',
  },
  {
    id: 'sunfish',
    name: 'Sunfish',
    category: 'lake',
    expectedPath: 'assets/images/icons/fish/sunfish.webp',
    description:
      'Chubby round sunfish with bright yellow-orange scales and warm amber stripes, cheerful cartoon fish',
  },
  {
    id: 'perch',
    name: 'Perch',
    category: 'lake',
    expectedPath: 'assets/images/icons/fish/perch.webp',
    description:
      'Plump green perch fish with bold dark vertical stripes and small fins, chunky cartoon freshwater fish',
  },
  {
    id: 'catfish',
    name: 'Catfish',
    category: 'lake',
    expectedPath: 'assets/images/icons/fish/catfish.webp',
    description:
      'Chubby gray-brown catfish with long droopy whisker barbels and gentle eyes, cozy cartoon fish',
  },
  {
    id: 'bluegill',
    name: 'Bluegill',
    category: 'lake',
    expectedPath: 'assets/images/icons/fish/bluegill.webp',
    description:
      'Round puffy bright blue bluegill fish with soft scales and a shy little face, adorable cartoon fish',
  },
  {
    id: 'carp',
    name: 'Carp',
    category: 'lake',
    expectedPath: 'assets/images/icons/fish/carp.webp',
    description:
      'Plump bronze-gold carp fish with layered chunky scales and rounded fins, warm cartoon style',
  },
  {
    id: 'trout',
    name: 'Trout',
    category: 'lake',
    expectedPath: 'assets/images/icons/fish/trout.webp',
    description:
      'Spotted rainbow trout fish with colorful scales shifting from pink to blue-green, chunky cartoon fish',
  },
  {
    id: 'bass',
    name: 'Bass',
    category: 'lake',
    expectedPath: 'assets/images/icons/fish/bass.webp',
    description:
      'Chunky green largemouth bass fish mid-leap with open jaw and striped belly, energetic cartoon fish',
  },
  {
    id: 'pike',
    name: 'Pike',
    category: 'lake',
    expectedPath: 'assets/images/icons/fish/pike.webp',
    description:
      'Long sleek pike fish with a pointed snout, olive-green spotted body and sharp fins, cartoon predator fish',
  },
  {
    id: 'salmon',
    name: 'Salmon',
    category: 'lake',
    expectedPath: 'assets/images/icons/fish/salmon.webp',
    description:
      'Pink-orange salmon fish leaping out of water with a curved body and bright scales, cheerful cartoon fish',
  },
  {
    id: 'golden_carp',
    name: 'Golden Carp',
    category: 'lake',
    expectedPath: 'assets/images/icons/fish/golden_carp.webp',
    description:
      'Shimmering golden carp fish with ornate flowing fins and glittering metallic scales, magical cartoon fish',
  },
  {
    id: 'flounder',
    name: 'Flounder',
    category: 'lake',
    expectedPath: 'assets/images/icons/fish/flounder.webp',
    description:
      'Flat sandy-brown spotted flounder fish lying on its side with both eyes peeking up, cozy cartoon fish',
  },
  {
    id: 'sea_bass',
    name: 'Sea Bass',
    category: 'lake',
    expectedPath: 'assets/images/icons/fish/sea_bass.webp',
    description:
      'Sleek blue-silver sea bass fish with a large eye and smooth pointed fins, cool-toned cartoon fish',
  },
  {
    id: 'red_snapper',
    name: 'Red Snapper',
    category: 'lake',
    expectedPath: 'assets/images/icons/fish/red_snapper.webp',
    description:
      'Bright red snapper fish with big round eyes and spiny dorsal fin, chubby adorable cartoon fish',
  },
  {
    id: 'moonfish',
    name: 'Moonfish',
    category: 'lake',
    expectedPath: 'assets/images/icons/fish/moonfish.webp',
    description:
      'Pale blue circular moonfish with a soft glowing aura and silvery fins, dreamy magical cartoon fish',
  },
  {
    id: 'tuna',
    name: 'Tuna',
    category: 'lake',
    expectedPath: 'assets/images/icons/fish/tuna.webp',
    description:
      'Large powerful blue-gray tuna fish with a streamlined body and crescent tail fin, chunky cartoon fish',
  },
  {
    id: 'swordfish',
    name: 'Swordfish',
    category: 'lake',
    expectedPath: 'assets/images/icons/fish/swordfish.webp',
    description:
      'Sleek dark blue swordfish with a long pointed bill and tall dorsal fin, streamlined cartoon fish',
  },
  {
    id: 'giant_squid',
    name: 'Giant Squid',
    category: 'lake',
    expectedPath: 'assets/images/icons/fish/giant_squid.webp',
    description:
      'Purple-bodied giant squid with curling red tentacles and a knowing eye, chunky cartoon deep-sea creature',
  },
  {
    id: 'whale_shark',
    name: 'Whale Shark',
    category: 'lake',
    expectedPath: 'assets/images/icons/fish/whale_shark.webp',
    description:
      'Massive friendly whale shark with white spotted gray-blue skin and a wide gentle mouth, cozy cartoon fish',
  },
  {
    id: 'kraken',
    name: 'Kraken',
    category: 'lake',
    expectedPath: 'assets/images/icons/fish/kraken.webp',
    description:
      'Mythical teal and purple kraken with glowing orange eyes and swirling tentacles, dramatic cartoon sea monster',
  },
  {
    id: 'lobster',
    name: 'Lobster',
    category: 'lake',
    expectedPath: 'assets/images/icons/fish/lobster.webp',
    description:
      'Bright red lobster with large chunky claws, long antennae, and a segmented curled tail, cheerful cartoon crustacean',
  },
  {
    id: 'golden_shiner',
    name: 'Golden Shiner',
    category: 'lake',
    expectedPath: 'assets/images/icons/fish/golden_shiner.webp',
    description:
      'Small shimmering gold fish with bright reflective scales, a sleek body, and delicate translucent fins, glowing warm cartoon freshwater minnow',
  },

  // Lake Areas
  {
    id: 'small_pond',
    name: 'Small Pond',
    category: 'lake',
    expectedPath: 'assets/images/lakes/small_pond.webp',
    description:
      'Cozy square tile pond with lily pads, cream water lilies, and tall cattails in warm morning light, cartoon diorama',
  },
  {
    id: 'river',
    name: 'River',
    category: 'lake',
    expectedPath: 'assets/images/lakes/river.webp',
    description:
      'Isometric tile with bright blue flowing water between mossy green banks and smooth brown rocks, cartoon landscape',
  },
  {
    id: 'deep_lake',
    name: 'Deep Lake',
    category: 'lake',
    expectedPath: 'assets/images/lakes/deep_lake.webp',
    description:
      'Dark blue square tile of still deep water with pine trees rising from gentle mist, mysterious cartoon diorama',
  },
  {
    id: 'coast',
    name: 'Coast',
    category: 'lake',
    expectedPath: 'assets/images/lakes/coast.webp',
    description:
      'Sandy golden beach tile with turquoise waves and white foam rolling softly ashore, warm cartoon style',
  },
  {
    id: 'open_sea',
    name: 'Open Sea',
    category: 'lake',
    expectedPath: 'assets/images/lakes/open_sea.webp',
    description:
      'Hexagonal ocean tile with dramatic rolling waves under golden-lit sunset clouds, painterly cartoon style',
  },
  {
    id: 'valley',
    name: 'Valley',
    category: 'lake',
    expectedPath: 'assets/images/lakes/valley.webp',
    description:
      'Scenic ravine between two tall green mountains with a winding blue river cutting through the bottom, lush trees lining the riverbanks, warm golden sunlight filtering through the valley, painterly cartoon landscape',
  },

  // Baits
  {
    id: 'no_bait',
    name: 'No Bait',
    category: 'lake',
    expectedPath: 'assets/images/icons/baits/no_bait.webp',
    description:
      'Simple bare fishing hook with a curved silver shank and sharp barbed point, no bait attached, plain cartoon fishhook icon',
  },
  {
    id: 'basic_worm_bait',
    name: 'Basic Worm Bait',
    category: 'lake',
    expectedPath: 'assets/images/icons/baits/basic_worm_bait.webp',
    description:
      'Glass jar with blue lid packed full of curly brown worms and golden grain, cartoon bait container',
  },
  {
    id: 'berry_bait',
    name: 'Berry Bait',
    category: 'lake',
    expectedPath: 'assets/images/icons/baits/berry_bait.webp',
    description:
      'Square purple container of mushy berry mixture with a chunky texture, cartoon bait tub',
  },
  {
    id: 'premium_fish_bait',
    name: 'Premium Fish Bait',
    category: 'lake',
    expectedPath: 'assets/images/icons/baits/premium_fish_bait.webp',
    description:
      'Orange jar labeled BAIT with a painted blue fish and golden lid, premium cartoon container',
  },
  {
    id: 'golden_lure',
    name: 'Golden Lure',
    category: 'lake',
    expectedPath: 'assets/images/icons/baits/golden_lure.webp',
    description:
      'Glittering golden spoon lure with a sharp treble hook, precious sparkling cartoon tackle',
  },

  // Traps
  {
    id: 'trap_empty',
    name: 'Trap Empty',
    category: 'lake',
    expectedPath: 'assets/images/fishing/trap_empty.webp',
    description:
      'Handwoven wicker basket trap with a wide mouth opening, warm brown tones, cozy cartoon craft',
  },
  {
    id: 'trap_active',
    name: 'Trap Active',
    category: 'lake',
    expectedPath: 'assets/images/fishing/trap_active.webp',
    description:
      'Blue submerged trap tile with copper handle and glowing countdown timer display, cartoon style',
  },
  {
    id: 'trap_ready',
    name: 'Trap Ready',
    category: 'lake',
    expectedPath: 'assets/images/fishing/trap_ready.webp',
    description:
      'Wooden plank trap with blue fish tails poking through the metal spring bars, cheerful cartoon catch',
  },
  {
    id: 'lobster_trap',
    name: 'Lobster Trap',
    category: 'lake',
    expectedPath: 'assets/images/fishing/lobster_trap.webp',
    description:
      'Sturdy wooden lobster trap cage with rope netting and a small round entry hole, cozy cartoon fishing gear',
  },

  // UI Elements
  {
    id: 'fishing_rod',
    name: 'Fishing Rod',
    category: 'lake',
    expectedPath: 'assets/images/fishing/fishing_rod.webp',
    description:
      'Simple wooden fishing rod with a cork handle, thin line, and small hook dangling, cozy cartoon style',
  },
  {
    id: 'bobber',
    name: 'Bobber',
    category: 'lake',
    expectedPath: 'assets/images/fishing/bobber.webp',
    description:
      'Classic round red and cream fishing bobber with a small red peg on top, cozy cartoon style',
  },
  {
    id: 'hook_ring',
    name: 'Hook Ring',
    category: 'lake',
    expectedPath: 'assets/images/fishing/hook_ring.webp',
    description:
      'Round blue clock-face timer with orange progress arc and white hands, chunky cartoon indicator',
  },
  {
    id: 'splash',
    name: 'Splash',
    category: 'lake',
    expectedPath: 'assets/images/fishing/splash.webp',
    description:
      'Bright blue water splash with droplets flying upward, lively cartoon water effect',
  },
  {
    id: 'bait_shack',
    name: 'Bait Shack',
    category: 'lake',
    expectedPath: 'assets/images/fishing/bait_shack.webp',
    description:
      'Tiny golden-brown wooden cabin with a peaked plank roof and cozy dark doorway, cartoon hut',
  },
  {
    id: 'fishers_kitchen',
    name: "Fisher's Kitchen",
    category: 'lake',
    expectedPath: 'assets/images/fishing/fishers_kitchen.webp',
    description:
      'Adorable pastel stove with fish decorations, a simmering pot of stew, and warm homey tones, cartoon kitchen',
  },

  // Recipes
  {
    id: 'fishing_potion',
    name: 'Fishing Potion',
    category: 'lake',
    expectedPath: 'assets/images/icons/fishing_potion.webp',
    description:
      'Round blue glass bottle with cork stopper and a little fish emblem floating inside, magical cartoon potion',
  },
  {
    id: 'adventurer_soup',
    name: 'Adventurer Soup',
    category: 'lake',
    expectedPath: 'assets/images/icons/adventurer_soup.webp',
    description:
      'Wooden bowl of steaming broth with thick pink salmon chunks, hearty cozy cartoon meal',
  },
  {
    id: 'coastal_platter',
    name: 'Coastal Platter',
    category: 'lake',
    expectedPath: 'assets/images/icons/coastal_platter.webp',
    description:
      'Spread of whole red lobster, salmon steak, and golden scallops, elegant cartoon seafood feast',
  },
  {
    id: 'legendary_feast',
    name: 'Legendary Feast',
    category: 'lake',
    expectedPath: 'assets/images/icons/legendary_feast.webp',
    description:
      'Glistening golden roast bird on a gleaming platter, grand celebratory cartoon banquet',
  },
  {
    id: 'pond_stew',
    name: 'Pond Stew',
    category: 'lake',
    expectedPath: 'assets/images/icons/pond_stew.webp',
    description:
      'Rustic clay bowl of hearty fish stew with visible chunks of white fish, onion slices, and purple berries in a golden broth, steam rising, cozy cartoon meal',
  },
  {
    id: 'river_chowder',
    name: 'River Chowder',
    category: 'lake',
    expectedPath: 'assets/images/icons/river_chowder.webp',
    description:
      'Thick creamy white chowder in a deep ceramic bowl with pink salmon chunks and potato cubes, topped with a drizzle of cream, warm cartoon comfort food',
  },
  {
    id: 'fishers_rice_bowl',
    name: "Fisher's Rice Bowl",
    category: 'lake',
    expectedPath: 'assets/images/icons/fishers_rice_bowl.webp',
    description:
      'Rounded bowl of fluffy white rice topped with golden seared fish fillets and a creamy drizzle, garnished with green onion, elegant cartoon rice bowl',
  },
  {
    id: 'freshwater_grill',
    name: 'Freshwater Grill',
    category: 'lake',
    expectedPath: 'assets/images/icons/freshwater_grill.webp',
    description:
      'Crispy golden pan-seared fish fillets on a rustic wooden board with a melting pat of butter and grill marks, warm cartoon plated meal',
  },
  {
    id: 'whale_shark_steak',
    name: 'Whale Shark Steak',
    category: 'lake',
    expectedPath: 'assets/images/icons/whale_shark_steak.webp',
    description:
      'Massive thick-cut seared steak with golden saffron crust on a bed of fluffy white rice, rich buttery glaze drizzled on top, grand cartoon trophy dish',
  },
  {
    id: 'lobster_bisque',
    name: 'Lobster Bisque',
    category: 'lake',
    expectedPath: 'assets/images/icons/lobster_bisque.webp',
    description:
      'Rich, slow-simmered creamy bisque made from three whole lobsters with butter and onion. A deep orange-red soup served in a ceramic bowl with a swirl of cream on top.',
  },

  // Fishopedia
  {
    id: 'fishopedia_cover',
    name: 'Book Cover',
    category: 'lake',
    expectedPath: 'assets/images/fishopedia/fishopedia_cover.webp',
    description:
      'Worn leather-bound book embossed with "Fish Collection" and a golden fish crest, cozy cartoon journal',
  },
  {
    id: 'fish_silhouette',
    name: 'Fish Silhouette',
    category: 'lake',
    expectedPath: 'assets/images/fishopedia/fish_silhouette.webp',
    description:
      'Dark shadowy fish shape with a faint eye, mysterious unknown catch placeholder, cartoon silhouette',
  },
  {
    id: 'size_small',
    name: 'Size Badge Small',
    category: 'lake',
    expectedPath: 'assets/images/fishopedia/size_small.webp',
    description: 'Chunky blue "S" letter on a rounded orange tile, playful cartoon size badge',
  },
  {
    id: 'size_medium',
    name: 'Size Badge Medium',
    category: 'lake',
    expectedPath: 'assets/images/fishopedia/size_medium.webp',
    description: 'Puffy orange "M" letter with warm golden outline, soft cartoon size badge',
  },
  {
    id: 'size_large',
    name: 'Size Badge Large',
    category: 'lake',
    expectedPath: 'assets/images/fishopedia/size_large.webp',
    description: 'Bold golden "L" on a rounded brown-orange tile, sturdy cartoon size badge',
  },
  {
    id: 'size_giant',
    name: 'Size Badge Giant',
    category: 'lake',
    expectedPath: 'assets/images/fishopedia/size_giant.webp',
    description:
      'Golden shield-shaped "G" badge with a small star emblem, prestigious cartoon size badge',
  },
  {
    id: 'shiny_badge',
    name: 'Shiny Badge',
    category: 'lake',
    expectedPath: 'assets/images/fishopedia/shiny_badge.webp',
    description:
      'Cluster of sparkling four-pointed stars in gold, purple, and blue, magical shimmer cartoon effect',
  },
  {
    id: 'milestone_badge',
    name: 'Milestone Badge',
    category: 'lake',
    expectedPath: 'assets/images/fishopedia/milestone_badge.webp',
    description:
      'Round orange ribbon medal with a golden star center, cheerful cartoon achievement badge',
  },
  {
    id: 'fishing_xp',
    name: 'Fishing XP',
    category: 'lake',
    expectedPath: 'assets/images/fishopedia/fishing_xp.webp',
    description:
      'Round blue ribbon medal with a bright aqua star center, cheerful cartoon experience badge',
  },
  {
    id: 'fish_scale',
    name: 'Fish Scale',
    category: 'lake',
    expectedPath: 'assets/images/fishopedia/fish_scale.webp',
    description:
      'Small hanging brass weighing scale with a fish on one side and a weight on the other, cozy cartoon icon',
  },
];

// === VALLEY ===
const valleyItems: ItemDefinition[] = [
  // Valley Environments
  {
    id: 'valley_bg_overview',
    name: 'Valley Overview Background',
    category: 'valley',
    expectedPath: 'valley/backgrounds/valley_bg_overview.webp',
    description:
      'Misty valley landscape with layered hills, distant peaks, and soft morning light. Subtle atmospheric haze suitable as a wide horizontal backdrop behind valley building cards.',
  },
  {
    id: 'valley_fog_overlay',
    name: 'Valley Fog Overlay',
    category: 'valley',
    expectedPath: 'valley/overlays/valley_fog_overlay.webp',
    description:
      'Semi-transparent fog overlay with soft gradient edges, designed to sit over buildings for teaser and locked states without obscuring silhouettes completely.',
  },

  // Valley Buildings (Primary)
  {
    id: 'valley_building_mine',
    name: 'The Mine',
    category: 'valley',
    expectedPath: 'valley/buildings/valley_building_mine.webp',
    description:
      'Stone mine entrance set into a rocky hillside with timber supports, mine carts, rail tracks, and warm lantern glow inviting players into the valley.',
  },
  {
    id: 'valley_building_refinery',
    name: 'The Refinery',
    category: 'valley',
    expectedPath: 'valley/buildings/valley_building_refinery.webp',
    description:
      'Industrial smelter building with chimneys, metal piping, tanks, and warm furnace light. Feels powerful but still in the game’s cozy stylized world.',
  },
  {
    id: 'valley_building_blacksmith',
    name: 'The Blacksmith',
    category: 'valley',
    expectedPath: 'valley/buildings/valley_building_blacksmith.webp',
    description:
      'Sturdy workshop with anvil, forge glow, and hanging tools. Feels like a future expansion valley building while matching the other valley architecture.',
  },
  {
    id: 'valley_building_spire',
    name: 'The Spire',
    category: 'valley',
    expectedPath: 'valley/buildings/valley_building_spire.webp',
    description:
      'Tall stone tower with banners and a bright peak beacon, rising above the misty valley as a dramatic focal point.',
  },
  {
    id: 'valley_building_airport',
    name: 'The Airport',
    category: 'valley',
    expectedPath: 'valley/buildings/valley_building_airport.webp',
    description:
      'Small valley airport with a simple airstrip, a cozy hangar, a propeller plane silhouette, and stacked cargo crates hinting at trade and travel.',
  },
  {
    id: 'valley_building_ruins',
    name: 'The Ruins',
    category: 'valley',
    expectedPath: 'valley/buildings/valley_building_ruins.webp',
    description:
      'Crumbled stone structure partially hidden by fog and creeping vines. Feels mysterious and ancient, ideal for teaser or future content.',
  },

  // Valley Buildings (Locked Silhouettes)
  {
    id: 'valley_building_mine_locked',
    name: 'Locked Mine',
    category: 'valley',
    expectedPath: 'valley/buildings/valley_building_mine_locked.webp',
    description:
      'Dark, simplified silhouette of the Mine with valley fog treatment around the base, clearly indicating a locked state while matching the main Mine shape.',
  },
  {
    id: 'valley_building_refinery_locked',
    name: 'Locked Refinery',
    category: 'valley',
    expectedPath: 'valley/buildings/valley_building_refinery_locked.webp',
    description:
      'Dark silhouette of the Refinery building with fog treatment and softened edges, keeping recognisable chimney and pipe forms.',
  },
  {
    id: 'valley_building_blacksmith_locked',
    name: 'Locked Blacksmith',
    category: 'valley',
    expectedPath: 'valley/buildings/valley_building_blacksmith_locked.webp',
    description:
      'Dark silhouette of the Blacksmith with anvil and forge shapes hinted in outline, wrapped in soft valley fog to indicate locked state.',
  },
  {
    id: 'valley_building_spire_locked',
    name: 'Locked Spire',
    category: 'valley',
    expectedPath: 'valley/buildings/valley_building_spire_locked.webp',
    description:
      'Tall, dark silhouette of the Spire tower with banners reduced to bold shapes and fog at the base, clearly locked but still iconic.',
  },
  {
    id: 'valley_building_airport_locked',
    name: 'Locked Airport',
    category: 'valley',
    expectedPath: 'valley/buildings/valley_building_airport_locked.webp',
    description:
      'Simplified dark outline of the Airport with hangar, plane, and crates hinted through silhouette shapes, softened by valley fog.',
  },
  {
    id: 'valley_building_ruins_locked',
    name: 'Locked Ruins',
    category: 'valley',
    expectedPath: 'valley/buildings/valley_building_ruins_locked.webp',
    description:
      'Shadowy silhouette of the Ruins with broken stone arches and creeping vines suggested in outline, drifting in valley fog for a locked teaser state.',
  },

  // Valley Locations
  {
    id: 'valley_fishing_pond',
    name: 'Valley Fishing Pond',
    category: 'valley',
    expectedPath: 'valley/valley_fishing_pond.webp',
    description:
      'Cozy fantasy fishing pond that resembles the main lake for fishing. Calm water, reeds or rocks at the edge, same warm game art style as the fishing lake. Suitable for valley building card or map.',
  },
  {
    id: 'valley_fishing_pond_silhouette',
    name: 'Valley Fishing Pond (Silhouette)',
    category: 'valley',
    expectedPath: 'valley/valley_fishing_pond_silhouette.webp',
    description:
      'Dark silhouette of the valley fishing pond, same shape and layout as the main version but filled with solid dark tone and soft fog treatment for locked or teaser state.',
  },

  // Valley Characters
  {
    id: 'valley_merchant',
    name: 'Valley Merchant',
    category: 'valley',
    expectedPath: 'valley/valley_merchant.webp',
    description:
      'A cozy Valley Trader character: friendly traveling merchant at a wooden stall with hanging lantern, small crates and potion bottles around. Warm game art style, readable at small sizes.',
  },

  // Mine Screen Assets
  {
    id: 'mine_bg_interior',
    name: 'Mine Interior Background',
    category: 'valley',
    expectedPath: 'valley/mine/mine_bg_interior.webp',
    description:
      'Underground cavern background with layered rock walls, mine tracks, support beams, and warm lantern accents for the Valley Mine screen.',
  },
  {
    id: 'mine_bg_card',
    name: 'Mine Card Background',
    category: 'valley',
    expectedPath: 'valley/mine/mine_bg_card.webp',
    description:
      'Cozy fantasy mine card background for a mobile game UI. Rocky stone wall with embedded glowing gems, soft lighting, muted earthy colors, slightly magical atmosphere. Wooden scaffolding and planks suggesting an under-construction mine entrance. Painted illustration style, clean and readable, no characters, no text, designed to sit behind UI elements. Subtle depth, not too busy, cozy idle game aesthetic.',
  },
  {
    id: 'mine_foreman',
    name: 'Mine Foreman',
    category: 'valley',
    expectedPath: 'valley/mine/mine_foreman.webp',
    description:
      'A cozy fantasy game foreman character icon, small chibi-style dwarf miner with a big beard and friendly expression, wearing a simple mining helmet and work clothes, holding a tiny pickaxe. Soft pastel colors, clean outlines, slightly exaggerated head, warm cozy mobile game art style. Designed as a UI icon, centered, simple shading, no background, transparent background, high readability at small sizes.',
  },
  {
    id: 'under_construction_sign',
    name: 'Under Construction Sign',
    category: 'valley',
    expectedPath: 'valley/under_construction_sign.webp',
    description:
      'Wooden sign hanging on ropes, under construction. Cozy game art style, readable at small sizes, suitable for UI.',
  },
  {
    id: 'mine_depth_surface_tunnels',
    name: 'Mine Depth – Surface Tunnels',
    category: 'valley',
    expectedPath: 'valley/mine/mine_depth_surface_tunnels.webp',
    description:
      'Depth selector icon showing shallow mine tunnels with wooden supports and gentle lighting, representing the surface level.',
  },
  {
    id: 'mine_depth_copper_veins',
    name: 'Mine Depth – Copper Veins',
    category: 'valley',
    expectedPath: 'valley/mine/mine_depth_copper_veins.webp',
    description:
      'Depth selector icon with rocky walls and visible copper-colored ore veins embedded in the stone.',
  },
  {
    id: 'mine_depth_iron_deposits',
    name: 'Mine Depth – Iron Deposits',
    category: 'valley',
    expectedPath: 'valley/mine/mine_depth_iron_deposits.webp',
    description:
      'Depth selector icon showing dense, darker iron deposits with small quartz flecks sparkling in the rock.',
  },
  {
    id: 'mine_depth_silver_seams',
    name: 'Mine Depth – Silver Seams',
    category: 'valley',
    expectedPath: 'valley/mine/mine_depth_silver_seams.webp',
    description:
      'Depth selector icon featuring bright silver seams running through rock with glints along the edges.',
  },
  {
    id: 'mine_depth_gold_caverns',
    name: 'Mine Depth – Gold Caverns',
    category: 'valley',
    expectedPath: 'valley/mine/mine_depth_gold_caverns.webp',
    description:
      'Depth selector icon of a cavern interior with warm gold-lined walls and sparkling highlights suggesting rich gold deposits.',
  },
  {
    id: 'mine_depth_titanium_veins',
    name: 'Mine Depth – Titanium Veins',
    category: 'valley',
    expectedPath: 'valley/mine/mine_depth_titanium_veins.webp',
    description:
      'Depth selector icon showing cool blue titanium veins running through darker stone, with a slightly futuristic metallic feel.',
  },
  {
    id: 'mine_depth_crystal_caverns',
    name: 'Mine Depth – Crystal Caverns',
    category: 'valley',
    expectedPath: 'valley/mine/mine_depth_crystal_caverns.webp',
    description:
      'Depth selector icon depicting a crystal-filled cavern with clusters of glowing gems and rare light effects.',
  },

  // Refinery Screen Assets
  {
    id: 'refinery_bg_interior',
    name: 'Refinery Interior Background',
    category: 'valley',
    expectedPath: 'valley/refinery/refinery_bg_interior.webp',
    description:
      'Smelting interior background with large furnaces, pipes, tanks, and heat shimmer, used as the main backdrop for the Refinery screen.',
  },
  {
    id: 'refinery_furnace_icon',
    name: 'Refinery Furnace Icon',
    category: 'valley',
    expectedPath: 'valley/refinery/refinery_furnace_icon.webp',
    description:
      'Stylized furnace door icon with warm orange glow and sturdy metal frame, used as a badge or header element in the Refinery UI.',
  },

  // Valley Item Icons – Raw Ores
  {
    id: 'copper_ore',
    name: 'Copper Ore',
    category: 'valley',
    expectedPath: 'valley/items/copper_ore.webp',
    description: 'Rough copper ore chunk with warm orange-brown metal showing through broken rock.',
  },
  {
    id: 'silver_ore',
    name: 'Silver Ore',
    category: 'valley',
    expectedPath: 'valley/items/silver_ore.webp',
    description: 'Bright silver ore fragment with cool metallic sheen and faceted broken edges.',
  },
  {
    id: 'gold_ore',
    name: 'Gold Ore',
    category: 'valley',
    expectedPath: 'valley/items/gold_ore.webp',
    description: 'Gold ore cluster with warm yellow-gold metal veins running through rough stone.',
  },
  {
    id: 'titanium_ore',
    name: 'Titanium Ore',
    category: 'valley',
    expectedPath: 'valley/items/titanium_ore.webp',
    description: 'Cool blue titanium ore chunk with hard angular forms and subtle futuristic feel.',
  },
  {
    id: 'platinum_ore',
    name: 'Platinum Ore',
    category: 'valley',
    expectedPath: 'valley/items/platinum_ore.webp',
    description: 'Pale platinum ore with subtle sparkle, suggesting high value and rarity.',
  },

  // Valley Item Icons – Raw Gems
  {
    id: 'raw_quartz',
    name: 'Raw Quartz',
    category: 'valley',
    expectedPath: 'valley/items/raw_quartz.webp',
    description: 'Raw quartz chunk with translucent edges and simple crystal forms.',
  },
  {
    id: 'raw_amber',
    name: 'Raw Amber',
    category: 'valley',
    expectedPath: 'valley/items/raw_amber.webp',
    description: 'Amber nugget with warm golden glow and soft rounded facets.',
  },
  {
    id: 'raw_ruby',
    name: 'Raw Ruby',
    category: 'valley',
    expectedPath: 'valley/items/raw_ruby.webp',
    description: 'Raw ruby crystal cluster in deep red tones, still rough and uncut.',
  },
  {
    id: 'raw_sapphire',
    name: 'Raw Sapphire',
    category: 'valley',
    expectedPath: 'valley/items/raw_sapphire.webp',
    description: 'Raw sapphire crystal cluster in rich blue hues, with uneven shard shapes.',
  },
  {
    id: 'diamond_shard',
    name: 'Diamond Shard',
    category: 'valley',
    expectedPath: 'valley/items/diamond_shard.webp',
    description: 'Small diamond shard with sharp facets and bright white sparkle.',
  },

  // Valley Item Icons – Ingots
  {
    id: 'copper_ingot',
    name: 'Copper Ingot',
    category: 'valley',
    expectedPath: 'valley/items/copper_ingot.webp',
    description: 'Cast copper ingot bar with warm orange metal and simple stamped details.',
  },
  {
    id: 'iron_ingot',
    name: 'Iron Ingot',
    category: 'valley',
    expectedPath: 'valley/items/iron_ingot.webp',
    description: 'Solid dark gray iron ingot bar with slightly worn edges.',
  },
  {
    id: 'silver_ingot',
    name: 'Silver Ingot',
    category: 'valley',
    expectedPath: 'valley/items/silver_ingot.webp',
    description: 'Polished silver ingot bar with cool reflective highlights.',
  },
  {
    id: 'gold_ingot',
    name: 'Gold Ingot',
    category: 'valley',
    expectedPath: 'valley/items/gold_ingot.webp',
    description: 'Bright gold ingot bar stacked or angled to feel premium and valuable.',
  },
  {
    id: 'titanium_ingot',
    name: 'Titanium Ingot',
    category: 'valley',
    expectedPath: 'valley/items/titanium_ingot.webp',
    description: 'Sleek titanium ingot bar in cool gray-blue metal with crisp edges.',
  },
  {
    id: 'platinum_ingot',
    name: 'Platinum Ingot',
    category: 'valley',
    expectedPath: 'valley/items/platinum_ingot.webp',
    description: 'Premium platinum ingot bar with pale metallic finish and subtle glow.',
  },

  // Valley Item Icons – Cut Gems
  {
    id: 'cut_quartz',
    name: 'Cut Quartz',
    category: 'valley',
    expectedPath: 'valley/items/cut_quartz.webp',
    description: 'Faceted quartz gem with clear or pale tones and simplified facets.',
  },
  {
    id: 'cut_amber',
    name: 'Cut Amber',
    category: 'valley',
    expectedPath: 'valley/items/cut_amber.webp',
    description: 'Polished amber gem with internal glow and rounded, stylized cuts.',
  },
  {
    id: 'cut_ruby',
    name: 'Cut Ruby',
    category: 'valley',
    expectedPath: 'valley/items/cut_ruby.webp',
    description: 'Faceted ruby gem in rich red, classic gem silhouette with bold highlights.',
  },
  {
    id: 'cut_sapphire',
    name: 'Cut Sapphire',
    category: 'valley',
    expectedPath: 'valley/items/cut_sapphire.webp',
    description: 'Faceted sapphire gem in deep blue with bright edges and highlights.',
  },
  {
    id: 'perfect_diamond',
    name: 'Perfect Diamond',
    category: 'valley',
    expectedPath: 'valley/items/perfect_diamond.webp',
    description:
      'Large perfect diamond gem with crisp facets and strong white sparkle, the pinnacle of valley gem progression.',
  },

  // Valley Item Icons – Tools
  {
    id: 'pickaxe',
    name: 'Pickaxe',
    category: 'valley',
    expectedPath: 'valley/items/pickaxe.webp',
    description: 'Mining pickaxe with wooden handle and metal head, cozy game icon style for valley mining.',
  },

  // Spire Assets
  {
    id: 'spire_hero',
    name: 'Spire Hero Banner',
    category: 'valley',
    expectedPath: 'assets/images/valley/spire/spire_hero.webp',
    description:
      'Wide hero banner (~1500x720) for the Spire main screen, shown behind the season pill. Night-sky stone tower rising into a field of stars, warmly lit windows, and a purple-to-gold glow around the peak. Cozy stylized game art with room for UI overlay.',
  },
  {
    id: 'spire_crest',
    name: 'Spire Crest',
    category: 'valley',
    expectedPath: 'assets/images/icons/spire/crest.webp',
    description:
      'Crest currency icon (~64x64) used in rewards and the Ascension bank chip. Faceted purple gem or sigil with bold silhouette and strong highlights, designed to stay readable even at 16px.',
  },
  {
    id: 'spire_ap',
    name: 'Ascension Point',
    category: 'valley',
    expectedPath: 'assets/images/icons/spire/ascension-point.webp',
    description:
      'Ascension Point currency icon (~64x64). Star-like golden spark on a deep purple backdrop, bright and radiant, reading clearly at small chip sizes.',
  },
  {
    id: 'spire_keystone_badge',
    name: 'Keystone Badge',
    category: 'valley',
    expectedPath: 'assets/images/icons/spire/keystone.webp',
    description:
      'Keystone floor header badge (~96x96). Ornate gold seal or star medallion with embossed detail — gold is reserved for Keystones and tier accents, so it should feel prestigious and distinct from regular floor UI.',
  },
  {
    id: 'spire_badge_t1',
    name: 'Spire Milestone Badge – Tier 1',
    category: 'valley',
    expectedPath: 'assets/images/icons/spire/badge-1.webp',
    description:
      'Lifetime milestone profile badge (~64x64) for reaching floor 50. Tower emblem in a simple carved stone frame — the humblest of four escalating tiers, muted grey tones with subtle purple accent.',
  },
  {
    id: 'spire_badge_t2',
    name: 'Spire Milestone Badge – Tier 2',
    category: 'valley',
    expectedPath: 'assets/images/icons/spire/badge-2.webp',
    description:
      'Lifetime milestone profile badge (~64x64) for reaching floor 100. Same tower emblem as tier 1, now in a bronze frame with warm metallic sheen — clearly a step above the stone tier.',
  },
  {
    id: 'spire_badge_t3',
    name: 'Spire Milestone Badge – Tier 3',
    category: 'valley',
    expectedPath: 'assets/images/icons/spire/badge-3.webp',
    description:
      'Lifetime milestone profile badge (~64x64) for reaching floor 200. Same tower emblem in a polished silver frame with cool highlights and finer ornamentation than the bronze tier.',
  },
  {
    id: 'spire_badge_t4',
    name: 'Spire Milestone Badge – Tier 4',
    category: 'valley',
    expectedPath: 'assets/images/icons/spire/badge-4.webp',
    description:
      'Lifetime milestone profile badge (~64x64) for reaching floor 500. Same tower emblem in a radiant frame — glowing purple-and-gold energy, star sparkles, the most prestigious of the four tiers.',
  },
  {
    id: 'spire_track_harvest',
    name: 'Harvest Track Icon',
    category: 'valley',
    expectedPath: 'assets/images/icons/spire/track-harvest.webp',
    description:
      'Ascension track icon (~64x64) for the Harvest track. Young sprout with fresh leaves on a rounded green tile, cozy stylized game icon with bold silhouette.',
  },
  {
    id: 'spire_track_expedition',
    name: 'Expedition Track Icon',
    category: 'valley',
    expectedPath: 'assets/images/icons/spire/track-expedition.webp',
    description:
      'Ascension track icon (~64x64) for the Expedition track. Sturdy pickaxe on a rounded mine-green tile, matching the harvest track tile style.',
  },
  {
    id: 'spire_track_commerce',
    name: 'Commerce Track Icon',
    category: 'valley',
    expectedPath: 'assets/images/icons/spire/track-commerce.webp',
    description:
      'Ascension track icon (~64x64) for the Commerce track. Gold coin with a small ledger or scroll on a rounded amber tile, matching the other track tile style.',
  },
  {
    id: 'spire_track_craft',
    name: 'Craft Track Icon',
    category: 'valley',
    expectedPath: 'assets/images/icons/spire/track-craft.webp',
    description:
      'Ascension track icon (~64x64) for the Craft track. Hammer resting on an anvil on a rounded brown tile, matching the other track tile style.',
  },
  {
    id: 'spire_decoration',
    name: 'Spire Miniature Decoration',
    category: 'valley',
    expectedPath: 'assets/images/decorations/spire-miniature.webp',
    description:
      'Farm decoration (200x200, transparent background) awarded at the floor-100 lifetime milestone. Miniature glowing spire statue with lit windows and a soft purple-to-gold peak glow, cozy collectible statue style placeable on the farm.',
  },
];

// === AIRPORT (cargo category icons) ===
const airportItems: ItemDefinition[] = [
  {
    id: 'airport_cargo_crop',
    name: 'Any Crop',
    category: 'airport',
    subcategory: 'cargo-categories',
    expectedPath: 'assets/images/valley/airport/cargo-categories/airport_cargo_crop.webp',
    description:
      'Icon for field and farm harvest — a small bundle or basket mixing grains and vegetables (e.g. wheat sheaf, carrot, tomato) without looking like a single named crop. Warm, earthy tones; reads as raw farm goods, not cooked food.',
  },
  {
    id: 'airport_cargo_fruit',
    name: 'Any Fruit',
    category: 'airport',
    subcategory: 'cargo-categories',
    expectedPath: 'assets/images/valley/airport/cargo-categories/airport_cargo_fruit.webp',
    description:
      'Icon for berries and orchard fruit — a cheerful pile or cluster (strawberry, grape bunch, small pineapple slice silhouette) emphasizing sweetness and freshness. Brighter, juicier palette than the crop icon; no baked goods or jars.',
  },
  {
    id: 'airport_cargo_cooked_meal',
    name: 'Any Cooked Meal',
    category: 'airport',
    subcategory: 'cargo-categories',
    expectedPath: 'assets/images/valley/airport/cargo-categories/airport_cargo_cooked_meal.webp',
    description:
      'Icon for hot prepared food — steaming bowl of soup/stew or a shallow plate of rice bowl / stir-fry; visible steam curl optional. Should feel savory and kitchen finished, not bread or dessert.',
  },
  {
    id: 'airport_cargo_baked_good',
    name: 'Any Baked Good',
    category: 'airport',
    subcategory: 'cargo-categories',
    expectedPath: 'assets/images/valley/airport/cargo-categories/airport_cargo_baked_good.webp',
    description:
      'Icon for oven bakery — loaf, pastry, or pie with a golden crust; small stars or steam to suggest warmth. Clearly distinct from soup (cooked meal) and from raw flour/sugar (processed).',
  },
  {
    id: 'airport_cargo_textile',
    name: 'Any Textile',
    category: 'airport',
    subcategory: 'cargo-categories',
    expectedPath: 'assets/images/valley/airport/cargo-categories/airport_cargo_textile.webp',
    description:
      'Icon for cloth and fiber crafts — folded fabric, spool of thread/yarn, or woven scarf; soft folds and textile texture. No gears or metal; luxury overlap can be hinted with a refined fold, still reads as material, not jewelry.',
  },
  {
    id: 'airport_cargo_luxury',
    name: 'Any Luxury Good',
    category: 'airport',
    subcategory: 'cargo-categories',
    expectedPath: 'assets/images/valley/airport/cargo-categories/airport_cargo_luxury.webp',
    description:
      'Icon for high-end goods — perfume bottle, jewel-like sparkle, or elegant small gift box; refined metallics or glass, a touch of glamour. Should feel expensive export, not tools or bulk crops.',
  },
  {
    id: 'airport_cargo_tool',
    name: 'Any Tool',
    category: 'airport',
    subcategory: 'cargo-categories',
    expectedPath: 'assets/images/valley/airport/cargo-categories/airport_cargo_tool.webp',
    description:
      'Icon for mechanical and precision gear — gears, compass, pick, or clockwork motif; metal and craftsmanship. Industrial-cozy steampunk-lite acceptable; clearly not food or fabric.',
  },
  {
    id: 'airport_cargo_animal_product',
    name: 'Any Animal Product',
    category: 'airport',
    subcategory: 'cargo-categories',
    expectedPath: 'assets/images/valley/airport/cargo-categories/airport_cargo_animal_product.webp',
    description:
      'Icon for farm animal outputs — egg, milk jug or bottle, honey jar, wedge of cheese, or wool puff; friendly barn palette. No living animals; reads as ingredients from animals, not cooked dishes.',
  },
  {
    id: 'airport_cargo_processed_good',
    name: 'Any Processed Good',
    category: 'airport',
    subcategory: 'cargo-categories',
    expectedPath: 'assets/images/valley/airport/cargo-categories/airport_cargo_processed_good.webp',
    description:
      'Icon for pantry and processed ingredients — flour sack, sugar scoop, oil bottle, chocolate bar, wine bottle, or coffee beans in a burlap pinch; shelf-stable factory/pantry look. Not a hot meal and not raw whole vegetables.',
  },
];

// === BLACKSMITH ===
const blacksmithItems: ItemDefinition[] = [
  // Tool Gear
  {
    id: 'blacksmith_copper_compass',
    name: 'Copper Compass',
    category: 'blacksmith',
    subcategory: 'tool_gear',
    expectedPath: 'blacksmith/copper_compass.webp',
    description:
      'A handcrafted copper compass with engraved rim and worn leather strap, top-down mobile game icon, transparent background.',
  },
  {
    id: 'blacksmith_iron_climbing_pick',
    name: 'Iron Climbing Pick',
    category: 'blacksmith',
    subcategory: 'tool_gear',
    expectedPath: 'blacksmith/iron_climbing_pick.webp',
    description:
      'Compact iron climbing pick with wrapped handle and subtle nicks from use, icon style for cozy farming game UI.',
  },
  {
    id: 'blacksmith_silver_surveyors_kit',
    name: "Silver Surveyor's Kit",
    category: 'blacksmith',
    subcategory: 'tool_gear',
    expectedPath: 'blacksmith/silver_surveyors_kit.webp',
    description:
      'Silver surveyor kit with folded map tools and polished metal clamps, clean readable icon silhouette.',
  },
  {
    id: 'blacksmith_gold_cartographers_tool',
    name: "Gold Cartographer's Tool",
    category: 'blacksmith',
    subcategory: 'tool_gear',
    expectedPath: 'blacksmith/gold_cartographers_tool.webp',
    description:
      'Ornate golden cartographer tool set with compass arm and filigree details, premium fantasy-farm icon style.',
  },
  {
    id: 'blacksmith_titanium_drill',
    name: 'Titanium Drill',
    category: 'blacksmith',
    subcategory: 'tool_gear',
    expectedPath: 'blacksmith/titanium_drill.webp',
    description:
      'Robust titanium hand drill with blue steel sheen and reinforced crank, high-tier gear icon.',
  },
  {
    id: 'blacksmith_platinum_star_compass',
    name: 'Platinum Star Compass',
    category: 'blacksmith',
    subcategory: 'tool_gear',
    expectedPath: 'blacksmith/platinum_star_compass.webp',
    description:
      'Radiant platinum star compass with gem inlay and celestial motif, legendary tier icon with glow accents.',
  },

  // Armor Gear
  {
    id: 'blacksmith_copper_vest',
    name: 'Copper Vest',
    category: 'blacksmith',
    subcategory: 'armor_gear',
    expectedPath: 'blacksmith/copper_vest.webp',
    description:
      'Rugged copper-plated explorer vest with stitched straps, front-facing icon on transparent background.',
  },
  {
    id: 'blacksmith_iron_chain_mail',
    name: 'Iron Chain Mail',
    category: 'blacksmith',
    subcategory: 'armor_gear',
    expectedPath: 'blacksmith/iron_chain_mail.webp',
    description:
      'Iron chain mail torso piece with padded lining, medium-tier armor icon.',
  },
  {
    id: 'blacksmith_silver_guard_plate',
    name: 'Silver Guard Plate',
    category: 'blacksmith',
    subcategory: 'armor_gear',
    expectedPath: 'blacksmith/silver_guard_plate.webp',
    description:
      'Silver guard plate chest armor with clean angular shoulder guards, polished high-clarity icon.',
  },
  {
    id: 'blacksmith_gold_royal_armor',
    name: 'Gold Royal Armor',
    category: 'blacksmith',
    subcategory: 'armor_gear',
    expectedPath: 'blacksmith/gold_royal_armor.webp',
    description:
      'Royal gold armor chestpiece with heraldic ornament, elite fantasy-farm style icon.',
  },
  {
    id: 'blacksmith_titanium_fortress_plate',
    name: 'Titanium Fortress Plate',
    category: 'blacksmith',
    subcategory: 'armor_gear',
    expectedPath: 'blacksmith/titanium_fortress_plate.webp',
    description:
      'Heavy titanium fortress plate with reinforced rivets and matte industrial finish, top-tier armor icon.',
  },
  {
    id: 'blacksmith_platinum_aegis',
    name: 'Platinum Aegis',
    category: 'blacksmith',
    subcategory: 'armor_gear',
    expectedPath: 'blacksmith/platinum_aegis.webp',
    description:
      'Platinum aegis chest armor with glowing core emblem and sleek legendary profile.',
  },

  // Accessory Gear
  {
    id: 'blacksmith_quartz_pendant',
    name: 'Quartz Pendant',
    category: 'blacksmith',
    subcategory: 'accessory_gear',
    expectedPath: 'blacksmith/quartz_pendant.webp',
    description:
      'Quartz pendant on braided cord, soft magical shimmer, accessory icon.',
  },
  {
    id: 'blacksmith_iron_miners_lantern',
    name: "Iron Miner's Lantern",
    category: 'blacksmith',
    subcategory: 'accessory_gear',
    expectedPath: 'blacksmith/iron_miners_lantern.webp',
    description:
      'Iron miner lantern with warm flame and compact frame, readable at small icon size.',
  },
  {
    id: 'blacksmith_amber_amulet',
    name: 'Amber Amulet',
    category: 'blacksmith',
    subcategory: 'accessory_gear',
    expectedPath: 'blacksmith/amber_amulet.webp',
    description:
      'Amber amulet with organic resin glow and carved clasp, mid-tier charm icon.',
  },
  {
    id: 'blacksmith_ruby_ring',
    name: 'Ruby Ring',
    category: 'blacksmith',
    subcategory: 'accessory_gear',
    expectedPath: 'blacksmith/ruby_ring.webp',
    description:
      'Gold ring with bright ruby centerpiece, premium accessory icon.',
  },
  {
    id: 'blacksmith_sapphire_crown',
    name: 'Sapphire Crown',
    category: 'blacksmith',
    subcategory: 'accessory_gear',
    expectedPath: 'blacksmith/sapphire_crown.webp',
    description:
      'Small sapphire crown accessory with crisp jewel highlights, legendary-adjacent icon style.',
  },
  {
    id: 'blacksmith_diamond_star',
    name: 'Diamond Star',
    category: 'blacksmith',
    subcategory: 'accessory_gear',
    expectedPath: 'blacksmith/diamond_star.webp',
    description:
      'Diamond star charm with crystalline facets and radiant aura, highest-tier accessory icon.',
  },

  // Consumable
  {
    id: 'blacksmith_miners_lamp',
    name: "Miner's Lamp",
    category: 'blacksmith',
    subcategory: 'consumable',
    expectedPath: 'blacksmith/miners_lamp.webp',
    description:
      'Portable miner lamp with oil reservoir and warm flame, consumable icon style.',
  },
  {
    id: 'blacksmith_prospectors_brew',
    name: "Prospector's Brew",
    category: 'blacksmith',
    subcategory: 'consumable',
    expectedPath: 'blacksmith/prospectors_brew.webp',
    description:
      'Glass bottle of prospector brew with mineral sparkle liquid, cork top, icon style.',
  },
  {
    id: 'blacksmith_stamina_elixir',
    name: 'Stamina Elixir',
    category: 'blacksmith',
    subcategory: 'consumable',
    expectedPath: 'blacksmith/stamina_elixir.webp',
    description:
      'Stamina elixir vial with bright green-blue energy swirl, readable silhouette.',
  },
  {
    id: 'blacksmith_fortification_draught',
    name: 'Fortification Draught',
    category: 'blacksmith',
    subcategory: 'consumable',
    expectedPath: 'blacksmith/fortification_draught.webp',
    description:
      'Thick fortified draught in sturdy flask with shield emblem, buff consumable icon.',
  },
  {
    id: 'blacksmith_explorers_ration',
    name: "Explorer's Ration",
    category: 'blacksmith',
    subcategory: 'consumable',
    expectedPath: 'blacksmith/explorers_ration.webp',
    description:
      'Packed explorer ration tin with wrapped food bundle and label seal, adventure utility icon.',
  },
  {
    id: 'blacksmith_mining_rations',
    name: 'Mining Rations',
    category: 'blacksmith',
    subcategory: 'consumable',
    expectedPath: 'blacksmith/mining_rations.webp',
    description:
      'Rugged mining ration box with straps and calorie pack details, heavy-duty consumable icon.',
  },
  {
    id: 'blacksmith_pickaxe',
    name: 'Pickaxe',
    category: 'blacksmith',
    subcategory: 'consumable',
    expectedPath: 'blacksmith/pickaxe.webp',
    description:
      'Refined blacksmith-forged pickaxe with reinforced head and wrapped grip, mine-entry consumable icon.',
  },
];

// === AVATAR ===
const avatarItems: ItemDefinition[] = [
  {
    id: 'avatar_fisherman',
    name: 'Fisherman',
    category: 'avatar',
    expectedPath: 'avatar/fisherman.webp',
    description:
      'cozy fisherman character with rain jacket, knitted wool beanie, small fishing hook necklace, calm friendly expression, slightly weathered but warm appearance, blue-green color palette',
  },
  {
    id: 'avatar_mine_explorer',
    name: 'Mine Explorer',
    category: 'avatar',
    expectedPath: 'avatar/mine_explorer.webp',
    description:
      'rugged mine explorer with miner helmet and glowing lantern attached, dark beard stubble, warm amber lighting from below, adventurous but friendly expression, earthy brown and copper tones, cozy fantasy mining vibe',
  },
  {
    id: 'avatar_valley_trader',
    name: 'Valley Trader',
    category: 'avatar',
    expectedPath: 'avatar/valley_trader.webp',
    description:
      'charming traveling merchant with hooded cloak, soft scarf, small coin pouch and feather accessory, confident friendly smile, warm earthy colors with gold accents, slightly mysterious but cozy fantasy merchant vibe',
  },
  {
    id: 'avatar_blacksmith_apprentice',
    name: 'Blacksmith Apprentice',
    category: 'avatar',
    expectedPath: 'avatar/blacksmith_apprentice.webp',
    description:
      'young blacksmith apprentice with rolled sleeves, leather apron, soot marks on cheeks, short messy hair, enthusiastic smile, glowing forge lighting, warm orange and iron-gray color palette',
  },
  {
    id: 'avatar_chicken_keeper',
    name: 'Chicken Keeper',
    category: 'avatar',
    expectedPath: 'avatar/chicken_keeper.webp',
    description:
      'cheerful farm caretaker holding fluffy white chicken close to chest, straw freckles, cozy autumn clothing, playful happy expression, warm golden farm colors, cute wholesome farming vibe',
  },
  {
    id: 'avatar_forest_herbalist',
    name: 'Forest Herbalist',
    category: 'avatar',
    expectedPath: 'avatar/forest_herbalist.webp',
    description:
      'gentle herbalist with round glasses, leafy cloak details, small pouch of herbs, calm intelligent expression, soft green and natural color palette, cozy forest healer aesthetic',
  },
  {
    id: 'avatar_airport_pilot',
    name: 'Airport Pilot',
    category: 'avatar',
    expectedPath: 'avatar/airport_pilot.webp',
    description:
      'cozy fantasy cargo pilot with leather flight cap, scarf blowing slightly, brass goggles resting on forehead, confident adventurous smile, warm sky-blue and brown color palette, friendly airship pilot vibe',
  },
  {
    id: 'avatar_golden_rooster_keeper',
    name: 'Golden Rooster Keeper',
    category: 'avatar',
    expectedPath: 'avatar/golden_rooster_keeper.webp',
    description:
      'prestigious farm keeper in an elegant tailored farm coat with subtle gold embroidery, a glowing golden rooster perched proudly on their shoulder, soft warm sunrise lighting casting a gentle golden glow on the face, calm regal yet wholesome expression, cozy farm fantasy aesthetic with deep cream, amber, and antique gold color palette, faint golden sparkle accents around the rooster, rare prestige avatar feel',
  },
  {
    id: 'avatar_deep_mine_foreman',
    name: 'Deep Mine Foreman',
    category: 'avatar',
    expectedPath: 'avatar/deep_mine_foreman.webp',
    description:
      'legendary deep mine foreman, slightly rugged older character with weathered face and silver-streaked beard, heavy explorer coat with reinforced collar and worn leather straps, holding a glowing crystal lantern that casts soft teal and violet gem reflections across the face, steady confident veteran expression, earthy charcoal and slate tones with luminous crystal highlights, rare high-status mining vibe',
  },
  {
    id: 'avatar_sky_captain',
    name: 'Sky Captain',
    category: 'avatar',
    expectedPath: 'avatar/sky_captain.webp',
    description:
      'cozy fantasy sky captain with a long leather flight coat with captain epaulets, brass goggles resting on forehead, small airship badge pinned to lapel, warm windswept hair, confident adventurous smile, glowing sunset cloud lighting with soft orange and pink rim light on the face, aspirational prestige pilot feel, color palette of warm leather brown, deep sunset orange, and dusky sky blue',
  },
  {
    id: 'avatar_orchard_keeper',
    name: 'Orchard Keeper',
    category: 'avatar',
    expectedPath: 'avatar/orchard_keeper.webp',
    description:
      'friendly orchard keeper woman with braided auburn hair, cozy wool sweater and gardening apron, soft freckles, warm smile, holding a tiny apple blossom branch, warm autumn color palette of russet, cream, and soft green, wholesome village farming vibe',
  },
  {
    id: 'avatar_lakeside_cook',
    name: 'Lakeside Cook',
    category: 'avatar',
    expectedPath: 'avatar/lakeside_cook.webp',
    description:
      'cheerful village cook woman with curly dark hair tied back in a scarf, rustic apron, rosy cheeks, holding a wooden spoon, warm tavern-inspired color palette of deep red, amber, and warm wood brown, nurturing and energetic personality',
  },
  {
    id: 'avatar_moonlight_herbalist',
    name: 'Moonlight Herbalist',
    category: 'avatar',
    expectedPath: 'avatar/moonlight_herbalist.webp',
    description:
      'mysterious but gentle herbalist woman with silver-white braided hair, deep green cloak with subtle glowing leaf embroidery, soft amber lantern light mixed with cool moonlight on her face, calm intelligent expression, tiny glowing herbs floating subtly around her, elegant cozy fantasy healer aesthetic, deep forest green and silver palette with warm amber accents, rare magical avatar feel',
  },
  {
    id: 'avatar_valley_duchess',
    name: 'Valley Duchess',
    category: 'avatar',
    expectedPath: 'avatar/valley_duchess.webp',
    description:
      'elegant traveling merchant woman with layered cozy cloak, gold leaf accessories, feathered hat, confident warm smile, rich earthy red and gold color palette, respected valley trader aesthetic, slightly adventurous but welcoming vibe, prestige merchant leader feel',
  },
];

export const items: ItemDefinition[] = [
  ...BASE_ITEMS,
  ...lakeItems,
  ...valleyItems,
  ...airportItems,
  ...blacksmithItems,
  ...avatarItems,
];

export function getItemsByCategory(category: string): ItemDefinition[] {
  return items.filter((item) => item.category === category);
}

export function getItemsBySubcategory(subcategory: string): ItemDefinition[] {
  return items.filter((item) => item.subcategory === subcategory);
}

export function getItemById(id: string): ItemDefinition | undefined {
  return items.find((item) => item.id === id);
}
