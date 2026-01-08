export interface ItemDefinition {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  description?: string;
  expectedPath: string;
}

export const CATEGORIES = {
  crops: "Crops",
  "area-items": "Area Items",
  crafts: "Crafts",
  buildings: "Buildings",
  animals: "Animals",
} as const;

export const CRAFT_SUBCATEGORIES = {
  feed_mill: "Feed Mill",
  mill: "Mill",
  bakery: "Bakery",
  kitchen: "Kitchen",
  breakfast_cart: "Breakfast Cart",
  dairy: "Dairy",
  smoker: "Smoker",
  spinning_wheel: "Spinning Wheel",
  cookhouse: "Cookhouse",
  sugar_house: "Sugar House",
  creamery: "Creamery",
  jam_house: "Jam House",
  workshop: "Workshop",
  silk_atelier: "Silk Atelier",
  loom: "Loom",
  furnace: "Furnace",
  oil_press: "Oil Press",
  tea_house: "Tea House",
  confectioner: "Confectioner",
  seasonal: "Seasonal",
  animal_products: "Animal Products",
  premium: "Premium",
} as const;

export const items: ItemDefinition[] = [
  // === CROPS ===
  { id: "wheat", name: "Wheat", category: "crops", expectedPath: "crops/wheat.webp", description: "Golden wheat stalks ready for harvest" },
  { id: "carrot", name: "Carrot", category: "crops", expectedPath: "crops/carrot.webp", description: "Fresh orange carrot with green tops" },
  { id: "corn", name: "Corn", category: "crops", expectedPath: "crops/corn.webp", description: "Yellow corn cob with husks" },
  { id: "potato", name: "Potato", category: "crops", expectedPath: "crops/potato.webp", description: "Rustic brown potato fresh from the earth" },
  { id: "pepper", name: "Pepper", category: "crops", expectedPath: "crops/pepper.webp", description: "Colorful bell pepper" },
  { id: "rice", name: "Rice", category: "crops", expectedPath: "crops/rice.webp", description: "Rice grains on the stalk" },
  { id: "wood", name: "Wood", category: "crops", expectedPath: "crops/sapling_patch.webp", description: "Wooden logs from a sapling patch" },
  { id: "onion", name: "Onion", category: "crops", expectedPath: "crops/onion.webp", description: "Purple onion bulb" },
  { id: "oat", name: "Oat", category: "crops", expectedPath: "crops/oat.webp", description: "Golden oat grains" },
  { id: "sugarcane", name: "Sugarcane", category: "crops", expectedPath: "crops/sugarcane.webp", description: "Tall sugarcane stalks" },
  { id: "clay", name: "Clay", category: "crops", expectedPath: "crops/mud_pit.webp", description: "Wet clay from a mud pit" },
  { id: "tomato", name: "Tomato", category: "crops", expectedPath: "crops/tomato.webp", description: "Ripe red tomato on the vine" },
  { id: "soybean", name: "Soybean", category: "crops", expectedPath: "crops/soybean.webp", description: "Green soybean pods" },
  { id: "strawberry", name: "Strawberry", category: "crops", expectedPath: "crops/strawberry.webp", description: "Fresh red strawberry" },
  { id: "cotton", name: "Cotton", category: "crops", expectedPath: "crops/cotton.webp", description: "Fluffy white cotton boll" },
  { id: "cacao", name: "Cacao", category: "crops", expectedPath: "crops/cacao.webp", description: "Cacao beans" },
  { id: "chili", name: "Chili", category: "crops", expectedPath: "crops/chili.webp", description: "Red chili pepper" },
  { id: "coffee", name: "Coffee", category: "crops", expectedPath: "crops/coffee_beans.webp", description: "Coffee berries on the branch" },
  { id: "grapes", name: "Grapes", category: "crops", expectedPath: "crops/grapes.webp", description: "Bunch of purple grapes" },
  { id: "sunflower", name: "Sunflower", category: "crops", expectedPath: "crops/sunflower.webp", description: "Bright yellow sunflower" },
  { id: "lavender", name: "Lavender", category: "crops", expectedPath: "crops/lavender.webp", description: "Purple lavender sprigs" },
  { id: "tea", name: "Tea", category: "crops", expectedPath: "crops/tea_leaves.webp", description: "Fresh green tea leaves" },
  { id: "vanilla", name: "Vanilla", category: "crops", expectedPath: "crops/vanilla.webp", description: "Vanilla bean pods" },
  { id: "saffron", name: "Saffron", category: "crops", expectedPath: "crops/saffron.webp", description: "Precious saffron threads" },

  // === AREA ITEMS ===
  { id: "blueberry", name: "Blueberry", category: "area-items", expectedPath: "area-items/blueberry.webp", description: "Plump blue blueberries" },
  { id: "raspberry", name: "Raspberry", category: "area-items", expectedPath: "area-items/raspberry.webp", description: "Red raspberry" },
  { id: "blackberry", name: "Blackberry", category: "area-items", expectedPath: "area-items/blackberry.webp", description: "Dark blackberry" },
  { id: "cranberry", name: "Cranberry", category: "area-items", expectedPath: "area-items/cranberry.webp", description: "Red cranberries" },
  { id: "pineapple", name: "Pineapple", category: "area-items", expectedPath: "area-items/pineapple.webp", description: "Tropical pineapple" },
  { id: "bamboo_fiber", name: "Bamboo Fiber", category: "area-items", expectedPath: "area-items/bamboo_fiber.webp", description: "Processed bamboo fibers" },
  { id: "sunflower_seed", name: "Sunflower Seed", category: "area-items", expectedPath: "area-items/sunflower_seed.webp", description: "Sunflower seeds" },
  { id: "tea_leaf", name: "Tea Leaf", category: "area-items", expectedPath: "area-items/tea_leaf.webp", description: "Single tea leaf" },
  { id: "vanilla_orchid", name: "Vanilla Orchid", category: "area-items", expectedPath: "area-items/vanilla_orchid.webp", description: "Vanilla orchid flower" },
  { id: "saffron_blossom", name: "Saffron Blossom", category: "area-items", expectedPath: "area-items/saffron_blossom.webp", description: "Purple saffron crocus flower" },
  { id: "cacao_pod", name: "Cacao Pod", category: "area-items", expectedPath: "area-items/cacao_pod.webp", description: "Large cacao pod" },
  { id: "berries", name: "Berries", category: "area-items", expectedPath: "area-items/berries.webp", description: "Wild mixed berries" },
  { id: "coal", name: "Coal", category: "area-items", expectedPath: "area-items/coal.webp", description: "Black coal chunks" },
  { id: "fish", name: "Fish", category: "area-items", expectedPath: "area-items/fish.webp", description: "Fresh caught fish" },
  { id: "iron_ore", name: "Iron Ore", category: "area-items", expectedPath: "area-items/iron_ore.webp", description: "Raw iron ore rock" },
  { id: "quartz_shard", name: "Quartz Shard", category: "area-items", expectedPath: "area-items/quartz_shard.webp", description: "Sparkling quartz crystal" },
  { id: "reeds", name: "Reeds", category: "area-items", expectedPath: "area-items/reeds.webp", description: "Tall river reeds" },
  { id: "refined_resin", name: "Refined Resin", category: "area-items", expectedPath: "area-items/refined_resin.webp", description: "Clear refined tree resin" },
  { id: "resin", name: "Resin", category: "area-items", expectedPath: "area-items/resin.webp", description: "Amber tree resin" },
  { id: "silica", name: "Silica", category: "area-items", expectedPath: "area-items/silica.webp", description: "Fine silica sand" },
  { id: "spring_water", name: "Spring Water", category: "area-items", expectedPath: "area-items/spring_water.webp", description: "Crystal clear spring water" },
  { id: "stone", name: "Stone", category: "area-items", expectedPath: "area-items/stone.webp", description: "Grey stone rocks" },
  { id: "water_plants", name: "Water Plants", category: "area-items", expectedPath: "area-items/water_plants.webp", description: "Aquatic plants" },
  { id: "wild_lavender", name: "Wild Lavender", category: "area-items", expectedPath: "area-items/wild_lavender.webp", description: "Wild growing lavender" },

  // === CRAFTS - Feed Mill ===
  { id: "chicken_feed", name: "Chicken Feed", category: "crafts", subcategory: "feed_mill", expectedPath: "crafts/chicken_feed.webp", description: "Mixed grain chicken feed in a bag" },
  { id: "cow_feed", name: "Cow Feed", category: "crafts", subcategory: "feed_mill", expectedPath: "crafts/cow_feed.webp", description: "Nutritious cow feed pellets" },
  { id: "pig_feed", name: "Pig Feed", category: "crafts", subcategory: "feed_mill", expectedPath: "crafts/pig_feed.webp", description: "Mixed pig feed" },
  { id: "sheep_feed", name: "Sheep Feed", category: "crafts", subcategory: "feed_mill", expectedPath: "crafts/sheep_feed.webp", description: "Sheep feed blend" },
  { id: "goat_feed", name: "Goat Feed", category: "crafts", subcategory: "feed_mill", expectedPath: "crafts/goat_feed.webp", description: "Goat feed mix" },
  { id: "bee_feed", name: "Bee Feed", category: "crafts", subcategory: "feed_mill", expectedPath: "crafts/bee_feed.webp", description: "Sugar syrup bee feed" },
  { id: "silkworm_feed", name: "Silkworm Feed", category: "crafts", subcategory: "feed_mill", expectedPath: "crafts/silkworm_feed.webp", description: "Mulberry leaves for silkworms" },
  { id: "reindeer_feed", name: "Reindeer Feed", category: "crafts", subcategory: "feed_mill", expectedPath: "crafts/reindeer_feed.webp", description: "Special reindeer feed" },

  // === CRAFTS - Mill ===
  { id: "flour", name: "Flour", category: "crafts", subcategory: "mill", expectedPath: "crafts/flour.webp", description: "Fine white wheat flour" },
  { id: "cornmeal", name: "Cornmeal", category: "crafts", subcategory: "mill", expectedPath: "crafts/cornmeal.webp", description: "Yellow ground cornmeal" },
  { id: "corn_syrup", name: "Corn Syrup", category: "crafts", subcategory: "mill", expectedPath: "crafts/corn_syrup.webp", description: "Sweet corn syrup bottle" },
  { id: "rice_flour", name: "Rice Flour", category: "crafts", subcategory: "mill", expectedPath: "crafts/rice_flour.webp", description: "Fine rice flour" },
  { id: "oat_flour", name: "Oat Flour", category: "crafts", subcategory: "mill", expectedPath: "crafts/oat_flour.webp", description: "Ground oat flour" },

  // === CRAFTS - Bakery ===
  { id: "bread", name: "Bread", category: "crafts", subcategory: "bakery", expectedPath: "crafts/bread.webp", description: "Freshly baked bread loaf" },
  { id: "cornbread", name: "Cornbread", category: "crafts", subcategory: "bakery", expectedPath: "crafts/cornbread.webp", description: "Golden cornbread" },
  { id: "herb_loaf", name: "Herb Loaf", category: "crafts", subcategory: "bakery", expectedPath: "crafts/herb_loaf.webp", description: "Bread with herbs baked in" },
  { id: "corn_muffins", name: "Corn Muffins", category: "crafts", subcategory: "bakery", expectedPath: "crafts/corn_muffins.webp", description: "Fresh corn muffins" },
  { id: "tomato_bread", name: "Tomato Bread", category: "crafts", subcategory: "bakery", expectedPath: "crafts/tomato_bread.webp", description: "Red tomato-infused bread" },
  { id: "cake", name: "Cake", category: "crafts", subcategory: "bakery", expectedPath: "crafts/cake.webp", description: "Decorated celebration cake" },
  { id: "oat_bread", name: "Oat Bread", category: "crafts", subcategory: "bakery", expectedPath: "crafts/oat_bread.webp", description: "Hearty oat bread" },
  { id: "sunflower_bread", name: "Sunflower Bread", category: "crafts", subcategory: "bakery", expectedPath: "crafts/sunflower_bread.webp", description: "Bread with sunflower seeds" },
  { id: "saffron_bread", name: "Saffron Bread", category: "crafts", subcategory: "bakery", expectedPath: "crafts/saffron_bread.webp", description: "Golden saffron-infused bread" },
  { id: "onion_bread", name: "Onion Bread", category: "crafts", subcategory: "bakery", expectedPath: "crafts/onion_bread.webp", description: "Savory onion bread" },
  { id: "pasta", name: "Pasta", category: "crafts", subcategory: "bakery", expectedPath: "crafts/pasta.webp", description: "Fresh handmade pasta" },

  // === CRAFTS - Kitchen ===
  { id: "carrot_soup", name: "Carrot Soup", category: "crafts", subcategory: "kitchen", expectedPath: "crafts/carrot_soup.webp", description: "Creamy orange carrot soup" },
  { id: "pepper_soup", name: "Pepper Soup", category: "crafts", subcategory: "kitchen", expectedPath: "crafts/pepper_soup.webp", description: "Spicy pepper soup" },
  { id: "mashed_potatoes", name: "Mashed Potatoes", category: "crafts", subcategory: "kitchen", expectedPath: "crafts/mashed_potatoes.webp", description: "Creamy mashed potatoes" },
  { id: "popcorn", name: "Popcorn", category: "crafts", subcategory: "kitchen", expectedPath: "crafts/popcorn.webp", description: "Fluffy popped popcorn" },
  { id: "water_plant_salad", name: "Water Plant Salad", category: "crafts", subcategory: "kitchen", expectedPath: "crafts/water_plant_salad.webp", description: "Fresh aquatic plant salad" },
  { id: "pork_chops", name: "Pork Chops", category: "crafts", subcategory: "kitchen", expectedPath: "crafts/pork_chops.webp", description: "Grilled pork chops" },
  { id: "fish_and_chips", name: "Fish and Chips", category: "crafts", subcategory: "kitchen", expectedPath: "crafts/fish_and_chips.webp", description: "Classic fish and chips" },
  { id: "onion_soup", name: "Onion Soup", category: "crafts", subcategory: "kitchen", expectedPath: "crafts/onion_soup.webp", description: "French onion soup" },
  { id: "tomato_sauce", name: "Tomato Sauce", category: "crafts", subcategory: "kitchen", expectedPath: "crafts/tomato_sauce.webp", description: "Rich tomato sauce" },

  // === CRAFTS - Breakfast Cart ===
  { id: "egg_sandwich", name: "Egg Sandwich", category: "crafts", subcategory: "breakfast_cart", expectedPath: "crafts/egg_sandwich.webp", description: "Egg breakfast sandwich" },
  { id: "farm_breakfast", name: "Farm Breakfast", category: "crafts", subcategory: "breakfast_cart", expectedPath: "crafts/farm_breakfast.webp", description: "Full farm breakfast plate" },
  { id: "pancakes", name: "Pancakes", category: "crafts", subcategory: "breakfast_cart", expectedPath: "crafts/pancakes.webp", description: "Stack of fluffy pancakes" },
  { id: "corn_pancakes", name: "Corn Pancakes", category: "crafts", subcategory: "breakfast_cart", expectedPath: "crafts/corn_pancakes.webp", description: "Yellow corn pancakes" },
  { id: "omelette", name: "Omelette", category: "crafts", subcategory: "breakfast_cart", expectedPath: "crafts/omelette.webp", description: "Folded egg omelette" },
  { id: "charcuterie_board", name: "Charcuterie Board", category: "crafts", subcategory: "breakfast_cart", expectedPath: "crafts/charcuterie_board.webp", description: "Assorted meats and cheese board" },
  { id: "premium_charcuterie", name: "Premium Charcuterie", category: "crafts", subcategory: "breakfast_cart", expectedPath: "crafts/premium_charcuterie.webp", description: "Luxury charcuterie selection" },

  // === CRAFTS - Dairy ===
  { id: "butter", name: "Butter", category: "crafts", subcategory: "dairy", expectedPath: "crafts/butter.webp", description: "Creamy yellow butter" },
  { id: "cheese", name: "Cheese", category: "crafts", subcategory: "dairy", expectedPath: "crafts/cheese.webp", description: "Aged cheese wheel" },
  { id: "goat_butter", name: "Goat Butter", category: "crafts", subcategory: "dairy", expectedPath: "crafts/goat_butter.webp", description: "White goat butter" },
  { id: "polenta", name: "Polenta", category: "crafts", subcategory: "dairy", expectedPath: "crafts/polenta.webp", description: "Creamy polenta" },
  { id: "yogurt", name: "Yogurt", category: "crafts", subcategory: "dairy", expectedPath: "crafts/yogurt.webp", description: "Creamy yogurt" },
  { id: "rice_pudding", name: "Rice Pudding", category: "crafts", subcategory: "dairy", expectedPath: "crafts/rice_pudding.webp", description: "Sweet rice pudding" },
  { id: "sunflower_seed_butter", name: "Sunflower Seed Butter", category: "crafts", subcategory: "dairy", expectedPath: "crafts/sunflower_seed_butter.webp", description: "Sunflower seed spread" },
  { id: "goat_cheese", name: "Goat Cheese", category: "crafts", subcategory: "dairy", expectedPath: "crafts/goat_cheese.webp", description: "Soft goat cheese" },
  { id: "milk", name: "Milk", category: "crafts", subcategory: "dairy", expectedPath: "crafts/milk.webp", description: "Fresh milk bottle" },
  { id: "goat_milk", name: "Goat Milk", category: "crafts", subcategory: "dairy", expectedPath: "crafts/goat_milk.webp", description: "Fresh goat milk" },

  // === CRAFTS - Smoker ===
  { id: "smoked_pork", name: "Smoked Pork", category: "crafts", subcategory: "smoker", expectedPath: "crafts/smoked_pork.webp", description: "Hickory smoked pork" },
  { id: "smoked_sausage", name: "Smoked Sausage", category: "crafts", subcategory: "smoker", expectedPath: "crafts/smoked_sausage.webp", description: "Smoked sausage links" },
  { id: "smoked_fish", name: "Smoked Fish", category: "crafts", subcategory: "smoker", expectedPath: "crafts/smoked_fish.webp", description: "Golden smoked fish" },
  { id: "smoked_ham", name: "Smoked Ham", category: "crafts", subcategory: "smoker", expectedPath: "crafts/smoked_ham.webp", description: "Honey smoked ham" },

  // === CRAFTS - Spinning Wheel ===
  { id: "wool_yarn", name: "Wool Yarn", category: "crafts", subcategory: "spinning_wheel", expectedPath: "crafts/wool_yarn.webp", description: "Ball of wool yarn" },
  { id: "wool_cloth", name: "Wool Cloth", category: "crafts", subcategory: "spinning_wheel", expectedPath: "crafts/wool_cloth.webp", description: "Woven wool fabric" },
  { id: "reed_mat", name: "Reed Mat", category: "crafts", subcategory: "spinning_wheel", expectedPath: "crafts/reed_mat.webp", description: "Woven reed mat" },
  { id: "thread", name: "Thread", category: "crafts", subcategory: "spinning_wheel", expectedPath: "crafts/thread.webp", description: "Spool of thread" },
  { id: "resin_mat", name: "Resin Mat", category: "crafts", subcategory: "spinning_wheel", expectedPath: "crafts/resin_treated_mat.webp", description: "Resin-treated mat" },
  { id: "woolly_hat", name: "Woolly Hat", category: "crafts", subcategory: "spinning_wheel", expectedPath: "crafts/woolly_hat.webp", description: "Knitted wool hat" },
  { id: "cotton_fabric", name: "Cotton Fabric", category: "crafts", subcategory: "spinning_wheel", expectedPath: "crafts/cotton_fabric.webp", description: "Soft cotton fabric" },
  { id: "gloves", name: "Gloves", category: "crafts", subcategory: "spinning_wheel", expectedPath: "crafts/gloves.webp", description: "Warm knitted gloves" },

  // === CRAFTS - Cookhouse ===
  { id: "root_stew", name: "Root Stew", category: "crafts", subcategory: "cookhouse", expectedPath: "crafts/root_stew.webp", description: "Hearty root vegetable stew" },
  { id: "fish_stew", name: "Fish Stew", category: "crafts", subcategory: "cookhouse", expectedPath: "crafts/fish_stew.webp", description: "Rich fish stew" },
  { id: "pork_stew", name: "Pork Stew", category: "crafts", subcategory: "cookhouse", expectedPath: "crafts/pork_stew.webp", description: "Savory pork stew" },
  { id: "herbal_soup", name: "Herbal Soup", category: "crafts", subcategory: "cookhouse", expectedPath: "crafts/herbal_soup.webp", description: "Healing herbal soup" },
  { id: "risotto", name: "Risotto", category: "crafts", subcategory: "cookhouse", expectedPath: "crafts/risotto.webp", description: "Creamy Italian risotto" },
  { id: "fish_pie", name: "Fish Pie", category: "crafts", subcategory: "cookhouse", expectedPath: "crafts/fish_pie.webp", description: "Golden topped fish pie" },
  { id: "mountain_stew_pot", name: "Mountain Stew Pot", category: "crafts", subcategory: "cookhouse", expectedPath: "crafts/mountain_stew_pot.webp", description: "Hearty mountain stew" },
  { id: "chili_stew", name: "Chili Stew", category: "crafts", subcategory: "cookhouse", expectedPath: "crafts/chili_stew.webp", description: "Spicy chili stew" },
  { id: "saffron_rice", name: "Saffron Rice", category: "crafts", subcategory: "cookhouse", expectedPath: "crafts/saffron_rice.webp", description: "Golden saffron rice" },

  // === CRAFTS - Sugar House ===
  { id: "sugar", name: "Sugar", category: "crafts", subcategory: "sugar_house", expectedPath: "crafts/sugar.webp", description: "White granulated sugar" },
  { id: "wood_pulp", name: "Wood Pulp", category: "crafts", subcategory: "sugar_house", expectedPath: "crafts/wood_pulp.webp", description: "Processed wood pulp" },
  { id: "sweet_rolls", name: "Sweet Rolls", category: "crafts", subcategory: "sugar_house", expectedPath: "crafts/sweet_rolls.webp", description: "Glazed sweet rolls" },
  { id: "chocolate", name: "Chocolate", category: "crafts", subcategory: "sugar_house", expectedPath: "crafts/chocolate.webp", description: "Rich dark chocolate" },
  { id: "pancake_syrup", name: "Pancake Syrup", category: "crafts", subcategory: "sugar_house", expectedPath: "crafts/pancake_syrup.webp", description: "Sweet maple syrup" },
  { id: "glazed_donuts", name: "Glazed Donuts", category: "crafts", subcategory: "sugar_house", expectedPath: "crafts/glazed_donuts.webp", description: "Sugar glazed donuts" },
  { id: "coffee_beans", name: "Coffee Beans", category: "crafts", subcategory: "sugar_house", expectedPath: "crafts/roasted_coffee_beans.webp", description: "Roasted coffee beans" },
  { id: "amber_caramel", name: "Amber Caramel", category: "crafts", subcategory: "sugar_house", expectedPath: "crafts/amber_caramel.webp", description: "Golden amber caramel" },

  // === CRAFTS - Creamery ===
  { id: "goat_yogurt", name: "Goat Yogurt", category: "crafts", subcategory: "creamery", expectedPath: "crafts/goat_yogurt.webp", description: "Tangy goat yogurt" },
  { id: "yogurt_parfait", name: "Yogurt Parfait", category: "crafts", subcategory: "creamery", expectedPath: "crafts/yogurt_parfait.webp", description: "Layered yogurt parfait" },
  { id: "cream_trifle", name: "Cream Trifle", category: "crafts", subcategory: "creamery", expectedPath: "crafts/cream_trifle.webp", description: "Layered cream trifle" },
  { id: "lavender_soap", name: "Lavender Soap", category: "crafts", subcategory: "creamery", expectedPath: "crafts/lavender_oil.webp", description: "Handmade lavender soap" },
  { id: "feta_salad", name: "Feta Salad", category: "crafts", subcategory: "creamery", expectedPath: "crafts/feta_salad.webp", description: "Greek feta salad" },

  // === CRAFTS - Jam House ===
  { id: "strawberry_jam", name: "Strawberry Jam", category: "crafts", subcategory: "jam_house", expectedPath: "crafts/strawberry_jam.webp", description: "Sweet strawberry jam jar" },
  { id: "mixed_berry_jam", name: "Mixed Berry Jam", category: "crafts", subcategory: "jam_house", expectedPath: "crafts/mixed_berry_jam.webp", description: "Mixed berry jam" },
  { id: "chili_jelly", name: "Chili Jelly", category: "crafts", subcategory: "jam_house", expectedPath: "crafts/chili_jelly.webp", description: "Spicy chili jelly" },
  { id: "grape_jelly", name: "Grape Jelly", category: "crafts", subcategory: "jam_house", expectedPath: "crafts/grape_jelly.webp", description: "Purple grape jelly" },
  { id: "honeycomb_candy", name: "Honeycomb Candy", category: "crafts", subcategory: "jam_house", expectedPath: "crafts/honeycomb_candy.webp", description: "Crunchy honeycomb candy" },
  { id: "blueberry_jam", name: "Blueberry Jam", category: "crafts", subcategory: "jam_house", expectedPath: "crafts/blueberry_jam.webp", description: "Sweet blueberry jam" },
  { id: "cranberry_sauce", name: "Cranberry Sauce", category: "crafts", subcategory: "jam_house", expectedPath: "crafts/cranberry_sauce.webp", description: "Tangy cranberry sauce" },

  // === CRAFTS - Workshop ===
  { id: "boards", name: "Boards", category: "crafts", subcategory: "workshop", expectedPath: "crafts/boards.webp", description: "Wooden boards" },
  { id: "coal_briquette", name: "Coal Briquette", category: "crafts", subcategory: "workshop", expectedPath: "crafts/coal_briquette.webp", description: "Compressed coal briquette" },
  { id: "resin_sealant", name: "Resin Sealant", category: "crafts", subcategory: "workshop", expectedPath: "crafts/resin_sealant.webp", description: "Clear resin sealant" },
  { id: "glass_panel", name: "Glass Panel", category: "crafts", subcategory: "workshop", expectedPath: "crafts/glass_panel.webp", description: "Clear glass panel" },
  { id: "scented_candle", name: "Scented Candle", category: "crafts", subcategory: "workshop", expectedPath: "crafts/lavender_oil.webp", description: "Lavender scented candle" },
  { id: "reed_basket", name: "Reed Basket", category: "crafts", subcategory: "workshop", expectedPath: "crafts/reed_basket.webp", description: "Woven reed basket" },
  { id: "nails", name: "Nails", category: "crafts", subcategory: "workshop", expectedPath: "crafts/nails.webp", description: "Iron nails" },
  { id: "gears", name: "Gears", category: "crafts", subcategory: "workshop", expectedPath: "crafts/gears.webp", description: "Metal gears" },
  { id: "precision_mechanism", name: "Precision Mechanism", category: "crafts", subcategory: "workshop", expectedPath: "crafts/precision_mechanism.webp", description: "Intricate mechanism" },
  { id: "refined_component", name: "Refined Component", category: "crafts", subcategory: "workshop", expectedPath: "crafts/refined_component.webp", description: "Refined mechanical part" },
  { id: "mechanical_tool", name: "Mechanical Tool", category: "crafts", subcategory: "workshop", expectedPath: "crafts/mechanical_tool.webp", description: "Mechanical tool" },
  { id: "crystal_lens", name: "Crystal Lens", category: "crafts", subcategory: "workshop", expectedPath: "crafts/crystal_lens.webp", description: "Polished crystal lens" },
  { id: "rope", name: "Rope", category: "crafts", subcategory: "workshop", expectedPath: "crafts/rope.webp", description: "Coiled rope" },
  { id: "leather_strap", name: "Leather Strap", category: "crafts", subcategory: "workshop", expectedPath: "crafts/leather_strap.webp", description: "Brown leather strap" },
  { id: "leather_gear", name: "Leather Gear", category: "crafts", subcategory: "workshop", expectedPath: "crafts/leather_gear.webp", description: "Leather gear equipment" },
  { id: "plank", name: "Plank", category: "crafts", subcategory: "workshop", expectedPath: "crafts/plank.webp", description: "Wooden plank" },
  { id: "screw", name: "Screw", category: "crafts", subcategory: "workshop", expectedPath: "crafts/screw.webp", description: "Metal screw" },

  // === CRAFTS - Silk Atelier ===
  { id: "silk_cloth", name: "Silk Cloth", category: "crafts", subcategory: "silk_atelier", expectedPath: "crafts/silk_cloth.webp", description: "Fine silk fabric" },
  { id: "silk_scarf", name: "Silk Scarf", category: "crafts", subcategory: "silk_atelier", expectedPath: "crafts/silk_scarf.webp", description: "Elegant silk scarf" },
  { id: "couture_gown", name: "Couture Gown", category: "crafts", subcategory: "silk_atelier", expectedPath: "crafts/couture_gown.webp", description: "Luxury couture gown" },

  // === CRAFTS - Loom ===
  { id: "cloth", name: "Cloth", category: "crafts", subcategory: "loom", expectedPath: "crafts/cloth.webp", description: "Woven cloth" },
  { id: "reed_cloth", name: "Reed Cloth", category: "crafts", subcategory: "loom", expectedPath: "crafts/reed_cloth.webp", description: "Reed woven cloth" },
  { id: "fine_cloth", name: "Fine Cloth", category: "crafts", subcategory: "loom", expectedPath: "crafts/fine_cloth.webp", description: "Fine quality cloth" },
  { id: "bamboo_silk", name: "Bamboo Silk", category: "crafts", subcategory: "loom", expectedPath: "crafts/bamboo_silk.webp", description: "Bamboo silk fabric" },

  // === CRAFTS - Furnace ===
  { id: "bricks", name: "Bricks", category: "crafts", subcategory: "furnace", expectedPath: "crafts/bricks.webp", description: "Red clay bricks" },
  { id: "iron_bar", name: "Iron Bar", category: "crafts", subcategory: "furnace", expectedPath: "crafts/iron_bar.webp", description: "Smelted iron bar" },
  { id: "steel_bar", name: "Steel Bar", category: "crafts", subcategory: "furnace", expectedPath: "crafts/steel_bar.webp", description: "Refined steel bar" },
  { id: "stone_bricks", name: "Stone Bricks", category: "crafts", subcategory: "furnace", expectedPath: "crafts/stone_bricks.webp", description: "Cut stone bricks" },

  // === CRAFTS - Oil Press ===
  { id: "sunflower_oil", name: "Sunflower Oil", category: "crafts", subcategory: "oil_press", expectedPath: "crafts/sunflower_oil.webp", description: "Golden sunflower oil" },
  { id: "lavender_oil", name: "Lavender Oil", category: "crafts", subcategory: "oil_press", expectedPath: "crafts/lavender_oil.webp", description: "Aromatic lavender oil" },
  { id: "perfume", name: "Perfume", category: "crafts", subcategory: "oil_press", expectedPath: "crafts/perfume.webp", description: "Elegant perfume bottle" },

  // === CRAFTS - Tea House ===
  { id: "ceremonial_tea", name: "Ceremonial Tea", category: "crafts", subcategory: "tea_house", expectedPath: "crafts/ceremonial_tea.webp", description: "Traditional ceremonial tea" },
  { id: "berry_smoothie", name: "Berry Smoothie", category: "crafts", subcategory: "tea_house", expectedPath: "crafts/berry_smoothie.webp", description: "Fresh berry smoothie" },
  { id: "herbal_tea", name: "Herbal Tea", category: "crafts", subcategory: "tea_house", expectedPath: "crafts/herbal_tea.webp", description: "Soothing herbal tea" },
  { id: "water_plant_tea", name: "Water Plant Tea", category: "crafts", subcategory: "tea_house", expectedPath: "crafts/water_plant_tea.webp", description: "Unique water plant tea" },
  { id: "spiced_tea", name: "Spiced Tea", category: "crafts", subcategory: "tea_house", expectedPath: "crafts/spiced_tea.webp", description: "Warm spiced chai tea" },
  { id: "pineapple_juice", name: "Pineapple Juice", category: "crafts", subcategory: "tea_house", expectedPath: "crafts/pineapple_juice.webp", description: "Fresh pineapple juice" },

  // === CRAFTS - Confectioner ===
  { id: "chocolate_bar", name: "Chocolate Bar", category: "crafts", subcategory: "confectioner", expectedPath: "crafts/chocolate_bar.webp", description: "Rich chocolate bar" },
  { id: "rice_cake", name: "Rice Cake", category: "crafts", subcategory: "confectioner", expectedPath: "crafts/rice_cake.webp", description: "Sweet rice cake" },
  { id: "berry_tart", name: "Berry Tart", category: "crafts", subcategory: "confectioner", expectedPath: "crafts/berry_tart.webp", description: "Fresh berry tart" },
  { id: "vanilla_truffle", name: "Vanilla Truffle", category: "crafts", subcategory: "confectioner", expectedPath: "crafts/vanilla_truffle.webp", description: "Creamy vanilla truffle" },
  { id: "caramel_candy", name: "Caramel Candy", category: "crafts", subcategory: "confectioner", expectedPath: "crafts/caramel_candy.webp", description: "Golden caramel candy" },
  { id: "coffee_cake", name: "Coffee Cake", category: "crafts", subcategory: "confectioner", expectedPath: "crafts/coffee_cake.webp", description: "Coffee-flavored cake" },
  { id: "mochi", name: "Mochi", category: "crafts", subcategory: "confectioner", expectedPath: "crafts/mochi.webp", description: "Soft Japanese mochi" },
  { id: "gilded_cacao", name: "Gilded Cacao", category: "crafts", subcategory: "confectioner", expectedPath: "crafts/gilded_cacao.webp", description: "Gold-dusted chocolate" },
  { id: "saffron_delight", name: "Saffron Delight", category: "crafts", subcategory: "confectioner", expectedPath: "crafts/saffron_delight.webp", description: "Saffron-infused sweet" },
  { id: "royal_saffron_cake", name: "Royal Saffron Cake", category: "crafts", subcategory: "confectioner", expectedPath: "crafts/royal_saffron_cake.webp", description: "Luxurious saffron cake" },

  // === CRAFTS - Seasonal ===
  { id: "hot_pot", name: "Hot Pot", category: "crafts", subcategory: "seasonal", expectedPath: "crafts/hot_pot.webp", description: "Steaming hot pot" },
  { id: "santas_oats", name: "Santa's Oats", category: "crafts", subcategory: "seasonal", expectedPath: "crafts/santa_s_oats.webp", description: "Festive oats for Santa" },
  { id: "gingerbread", name: "Gingerbread", category: "crafts", subcategory: "seasonal", expectedPath: "crafts/gingerbread.webp", description: "Decorated gingerbread" },

  // === CRAFTS - Animal Products ===
  { id: "egg", name: "Egg", category: "crafts", subcategory: "animal_products", expectedPath: "crafts/egg.webp", description: "Fresh farm egg" },
  { id: "pork", name: "Pork", category: "crafts", subcategory: "animal_products", expectedPath: "crafts/pork.webp", description: "Raw pork cut" },
  { id: "wool", name: "Wool", category: "crafts", subcategory: "animal_products", expectedPath: "crafts/wool.webp", description: "Fluffy sheep wool" },
  { id: "honey", name: "Honey", category: "crafts", subcategory: "animal_products", expectedPath: "crafts/honey.webp", description: "Golden honey jar" },
  { id: "silk_thread", name: "Silk Thread", category: "crafts", subcategory: "animal_products", expectedPath: "crafts/silk_thread.webp", description: "Fine silk thread" },
  { id: "wild_honeycomb", name: "Wild Honeycomb", category: "crafts", subcategory: "animal_products", expectedPath: "crafts/wild_honeycomb.webp", description: "Natural wild honeycomb" },

  // === CRAFTS - Premium ===
  { id: "fruit_salad", name: "Fruit Salad", category: "crafts", subcategory: "premium", expectedPath: "crafts/fruit_salad.webp", description: "Fresh mixed fruit salad" },
  { id: "tropical_parfait", name: "Tropical Parfait", category: "crafts", subcategory: "premium", expectedPath: "crafts/tropical_parfait.webp", description: "Tropical layered parfait" },
  { id: "amber_sap", name: "Amber Sap", category: "crafts", subcategory: "premium", expectedPath: "crafts/amber_sap.webp", description: "Precious amber sap" },
  { id: "starlight_resin", name: "Starlight Resin", category: "crafts", subcategory: "premium", expectedPath: "crafts/starlight_resin.webp", description: "Glowing starlight resin" },

  // === BUILDINGS ===
  { id: "bakery", name: "Bakery", category: "buildings", expectedPath: "buildings/bakery.webp", description: "Cozy bakery building with chimney smoke" },
  { id: "breakfast_cart", name: "Breakfast Cart", category: "buildings", expectedPath: "buildings/breakfast_cart.webp", description: "Charming breakfast food cart" },
  { id: "confectioner", name: "Confectioner", category: "buildings", expectedPath: "buildings/confectioner.webp", description: "Sweet confectionery shop" },
  { id: "cookhouse", name: "Cookhouse", category: "buildings", expectedPath: "buildings/cookhouse.webp", description: "Rustic cookhouse" },
  { id: "creamery", name: "Creamery", category: "buildings", expectedPath: "buildings/creamery.webp", description: "Dairy creamery building" },
  { id: "dairy", name: "Dairy", category: "buildings", expectedPath: "buildings/dairy.webp", description: "Farm dairy building" },
  { id: "feed_mill", name: "Feed Mill", category: "buildings", expectedPath: "buildings/feed_mill.webp", description: "Grain feed mill" },
  { id: "festive_workshop", name: "Festive Workshop", category: "buildings", expectedPath: "buildings/festive_workshop.webp", description: "Holiday festive workshop" },
  { id: "furnace", name: "Furnace", category: "buildings", expectedPath: "buildings/furnace.webp", description: "Industrial furnace building" },
  { id: "jam_house", name: "Jam House", category: "buildings", expectedPath: "buildings/jam_house.webp", description: "Jam making house" },
  { id: "kitchen", name: "Kitchen", category: "buildings", expectedPath: "buildings/kitchen.webp", description: "Farm kitchen building" },
  { id: "loom", name: "Loom", category: "buildings", expectedPath: "buildings/loom.webp", description: "Weaving loom building" },
  { id: "mill", name: "Mill", category: "buildings", expectedPath: "buildings/mill.webp", description: "Windmill grain mill" },
  { id: "oil_press", name: "Oil Press", category: "buildings", expectedPath: "buildings/oil_press.webp", description: "Oil pressing building" },
  { id: "silk_atelier", name: "Silk Atelier", category: "buildings", expectedPath: "buildings/silk_atelier.webp", description: "Elegant silk workshop" },
  { id: "smoker", name: "Smoker", category: "buildings", expectedPath: "buildings/smoker.webp", description: "Meat smoking building" },
  { id: "spinning_wheel", name: "Spinning Wheel", category: "buildings", expectedPath: "buildings/spinning_wheel.webp", description: "Spinning wheel workshop" },
  { id: "sugar_house", name: "Sugar House", category: "buildings", expectedPath: "buildings/sugar_house.webp", description: "Sugar processing house" },
  { id: "tea_house", name: "Tea House", category: "buildings", expectedPath: "buildings/tea_house.webp", description: "Serene tea house" },
  { id: "workshop", name: "Workshop", category: "buildings", expectedPath: "buildings/workshop.webp", description: "Crafting workshop building" },

  // === ANIMALS ===
  { id: "apiary", name: "Apiary", category: "animals", expectedPath: "animals/apiary.webp", description: "Beehive apiary with bees" },
  { id: "chicken_coop", name: "Chicken Coop", category: "animals", expectedPath: "animals/chicken_coop.webp", description: "Chicken coop with chickens" },
  { id: "cow_shed", name: "Cow Shed", category: "animals", expectedPath: "animals/cow_shed.webp", description: "Cow barn with cows" },
  { id: "goat_farm", name: "Goat Farm", category: "animals", expectedPath: "animals/goat_farm.webp", description: "Goat farm with goats" },
  { id: "pigsty", name: "Pigsty", category: "animals", expectedPath: "animals/pigsty.webp", description: "Pig pen with pigs" },
  { id: "sheep_farm", name: "Sheep Farm", category: "animals", expectedPath: "animals/sheep_farm.webp", description: "Sheep pasture with sheep" },
  { id: "silkworm_house", name: "Silkworm House", category: "animals", expectedPath: "animals/silkworm_house.webp", description: "Silkworm cultivation house" },
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
