/**
 * Airport cargo slot categories — IDs and labels used by airport / valley trade UI.
 */

export const AIRPORT_CATEGORY_IDS = [
  "crop",
  "fruit",
  "cooked_meal",
  "baked_good",
  "textile",
  "luxury",
  "tool",
  "animal_product",
  "processed_good",
] as const;

export type AirportCategoryId = (typeof AIRPORT_CATEGORY_IDS)[number];

export type AirportCategoryDefinition = {
  label: string;
  /** Prompt-friendly icon description (matches design spec). */
  description: string;
  /** Basename only; full path from {@link getAirportCargoCategoryAssetPath}. */
  filename: string;
};

export const AIRPORT_CATEGORIES: Record<AirportCategoryId, AirportCategoryDefinition> = {
  crop: {
    label: "Any Crop",
    filename: "airport_cargo_crop.webp",
    description:
      "Icon for field and farm harvest — a small bundle or basket mixing grains and vegetables (e.g. wheat sheaf, carrot, tomato) without looking like a single named crop. Warm, earthy tones; reads as raw farm goods, not cooked food.",
  },
  fruit: {
    label: "Any Fruit",
    filename: "airport_cargo_fruit.webp",
    description:
      "Icon for berries and orchard fruit — a cheerful pile or cluster (strawberry, grape bunch, small pineapple slice silhouette) emphasizing sweetness and freshness. Brighter, juicier palette than the crop icon; no baked goods or jars.",
  },
  cooked_meal: {
    label: "Any Cooked Meal",
    filename: "airport_cargo_cooked_meal.webp",
    description:
      "Icon for hot prepared food — steaming bowl of soup/stew or a shallow plate of rice bowl / stir-fry; visible steam curl optional. Should feel savory and kitchen finished, not bread or dessert.",
  },
  baked_good: {
    label: "Any Baked Good",
    filename: "airport_cargo_baked_good.webp",
    description:
      "Icon for oven bakery — loaf, pastry, or pie with a golden crust; small stars or steam to suggest warmth. Clearly distinct from soup (cooked meal) and from raw flour/sugar (processed).",
  },
  textile: {
    label: "Any Textile",
    filename: "airport_cargo_textile.webp",
    description:
      "Icon for cloth and fiber crafts — folded fabric, spool of thread/yarn, or woven scarf; soft folds and textile texture. No gears or metal; luxury overlap can be hinted with a refined fold, still reads as material, not jewelry.",
  },
  luxury: {
    label: "Any Luxury Good",
    filename: "airport_cargo_luxury.webp",
    description:
      "Icon for high-end goods — perfume bottle, jewel-like sparkle, or elegant small gift box; refined metallics or glass, a touch of glamour. Should feel expensive export, not tools or bulk crops.",
  },
  tool: {
    label: "Any Tool",
    filename: "airport_cargo_tool.webp",
    description:
      "Icon for mechanical and precision gear — gears, compass, pick, or clockwork motif; metal and craftsmanship. Industrial-cozy steampunk-lite acceptable; clearly not food or fabric.",
  },
  animal_product: {
    label: "Any Animal Product",
    filename: "airport_cargo_animal_product.webp",
    description:
      "Icon for farm animal outputs — egg, milk jug or bottle, honey jar, wedge of cheese, or wool puff; friendly barn palette. No living animals; reads as ingredients from animals, not cooked dishes.",
  },
  processed_good: {
    label: "Any Processed Good",
    filename: "airport_cargo_processed_good.webp",
    description:
      "Icon for pantry and processed ingredients — flour sack, sugar scoop, oil bottle, chocolate bar, wine bottle, or coffee beans in a burlap pinch; shelf-stable factory/pantry look. Not a hot meal and not raw whole vegetables.",
  },
};

export function getAirportCategoryLabel(id: AirportCategoryId): string {
  return AIRPORT_CATEGORIES[id].label;
}

export function getAirportCategoryDescription(id: AirportCategoryId): string {
  return AIRPORT_CATEGORIES[id].description;
}

const ASSET_DIR = "assets/images/valley/airport/cargo-categories";

/** Path relative to `output/` (suitable for `ItemDefinition.expectedPath`). */
export function getAirportCargoCategoryAssetPath(id: AirportCategoryId): string {
  return `${ASSET_DIR}/${AIRPORT_CATEGORIES[id].filename}`;
}
