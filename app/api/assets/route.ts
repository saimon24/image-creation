import { NextResponse } from "next/server";
import { items, ItemDefinition } from "@/data/items";
import { npcs, NPCDefinition } from "@/data/npcs";
import { imageExists, getImagePath, getDescriptionOverrides } from "@/lib/filesystem";

export interface AssetStatus {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  description?: string;
  hasImage: boolean;
  imagePath: string | null;
  expectedPath: string;
}

function getAssetStatus(
  item: ItemDefinition | NPCDefinition,
  isNpc: boolean = false,
  overrides: { items: Record<string, string>; npcs: Record<string, string> }
): AssetStatus {
  const hasImage = imageExists(item.expectedPath);
  const overrideMap = isNpc ? overrides.npcs : overrides.items;
  const description = overrideMap[item.id] ?? item.description;

  return {
    id: item.id,
    name: item.name,
    category: isNpc ? "npcs" : (item as ItemDefinition).category,
    subcategory: isNpc ? undefined : (item as ItemDefinition).subcategory,
    description,
    hasImage,
    imagePath: hasImage ? getImagePath(item.expectedPath) : null,
    expectedPath: item.expectedPath,
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const subcategory = searchParams.get("subcategory");
  const type = searchParams.get("type"); // 'icons' or 'npcs'

  // Load description overrides once
  const overrides = getDescriptionOverrides();

  let assets: AssetStatus[] = [];

  if (type === "npcs" || (!type && !category)) {
    // Include NPCs
    const npcAssets = npcs.map((npc) => getAssetStatus(npc, true, overrides));
    if (type === "npcs") {
      return NextResponse.json(npcAssets);
    }
    assets = [...assets, ...npcAssets];
  }

  if (type === "icons" || !type) {
    // Include items
    let filteredItems = items;

    if (category) {
      filteredItems = filteredItems.filter((item) => item.category === category);
    }

    if (subcategory) {
      filteredItems = filteredItems.filter(
        (item) => item.subcategory === subcategory
      );
    }

    const itemAssets = filteredItems.map((item) => getAssetStatus(item, false, overrides));
    assets = [...assets, ...itemAssets];
  }

  // Calculate summary stats
  const totalItems = assets.length;
  const withImages = assets.filter((a) => a.hasImage).length;
  const missingImages = totalItems - withImages;

  return NextResponse.json({
    assets,
    summary: {
      total: totalItems,
      withImages,
      missingImages,
      coverage: totalItems > 0 ? Math.round((withImages / totalItems) * 100) : 0,
    },
  });
}
