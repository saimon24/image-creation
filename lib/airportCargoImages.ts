import type { AirportCategoryId } from "@/constants/airport-categories";
import {
  AIRPORT_CATEGORY_IDS,
  getAirportCargoCategoryAssetPath,
} from "@/constants/airport-categories";

/** Maps each cargo category to its `output/`-relative WebP path. */
export const AIRPORT_CARGO_CATEGORY_IMAGES: Record<AirportCategoryId, string> =
  Object.fromEntries(
    AIRPORT_CATEGORY_IDS.map((id) => [id, getAirportCargoCategoryAssetPath(id)])
  ) as Record<AirportCategoryId, string>;

export function getAirportCargoCategoryImagePath(id: AirportCategoryId): string {
  return AIRPORT_CARGO_CATEGORY_IMAGES[id];
}
