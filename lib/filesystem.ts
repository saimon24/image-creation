import fs from "fs";
import path from "path";

const OUTPUT_DIR = path.join(process.cwd(), "output");
const DATA_DIR = path.join(process.cwd(), "data");
const OVERRIDES_PATH = path.join(DATA_DIR, "overrides.json");

// Description overrides interface
interface DescriptionOverrides {
  items: Record<string, string>;
  npcs: Record<string, string>;
}

// Get all description overrides
export function getDescriptionOverrides(): DescriptionOverrides {
  try {
    if (fs.existsSync(OVERRIDES_PATH)) {
      const content = fs.readFileSync(OVERRIDES_PATH, "utf-8");
      return JSON.parse(content);
    }
  } catch (error) {
    console.error("Error reading overrides:", error);
  }
  return { items: {}, npcs: {} };
}

// Save description overrides
export function saveDescriptionOverrides(overrides: DescriptionOverrides): void {
  try {
    fs.writeFileSync(OVERRIDES_PATH, JSON.stringify(overrides, null, 2));
  } catch (error) {
    console.error("Error saving overrides:", error);
    throw error;
  }
}

// Update a single description override
export function updateDescriptionOverride(
  id: string,
  description: string,
  type: "icon" | "npc"
): void {
  const overrides = getDescriptionOverrides();
  if (type === "npc") {
    overrides.npcs[id] = description;
  } else {
    overrides.items[id] = description;
  }
  saveDescriptionOverrides(overrides);
}

// Get a single description (override or original)
export function getDescription(
  id: string,
  originalDescription: string | undefined,
  type: "icon" | "npc"
): string | undefined {
  const overrides = getDescriptionOverrides();
  const overrideMap = type === "npc" ? overrides.npcs : overrides.items;
  return overrideMap[id] ?? originalDescription;
}

export function ensureOutputDirs() {
  const dirs = [
    "crops",
    "crafts",
    "area-items",
    "rare",
    "animal-products",
    "misc",
    "upgrades",
    "leaderboard",
    "buildings",
    "animals",
    "npcs",
    "custom",
    "transform",
  ];

  for (const dir of dirs) {
    const fullPath = path.join(OUTPUT_DIR, dir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }
  }
}

export function imageExists(relativePath: string): boolean {
  const fullPath = path.join(OUTPUT_DIR, relativePath);
  return fs.existsSync(fullPath);
}

export function getImagePath(relativePath: string): string | null {
  const fullPath = path.join(OUTPUT_DIR, relativePath);
  if (fs.existsSync(fullPath)) {
    // Add file modification time as cache-buster to ensure fresh images
    const stats = fs.statSync(fullPath);
    const mtime = stats.mtimeMs.toString(36);
    return `/output/${relativePath}?v=${mtime}`;
  }
  return null;
}

export function listImagesInCategory(category: string): string[] {
  const categoryPath = path.join(OUTPUT_DIR, category);
  if (!fs.existsSync(categoryPath)) {
    return [];
  }

  return fs
    .readdirSync(categoryPath)
    .filter((file) => /\.(webp|png|jpg|jpeg)$/i.test(file));
}

export function saveImage(relativePath: string, buffer: Buffer): string {
  const fullPath = path.join(OUTPUT_DIR, relativePath);
  const dir = path.dirname(fullPath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(fullPath, buffer);
  return `/output/${relativePath}`;
}

export function deleteImage(relativePath: string): boolean {
  const fullPath = path.join(OUTPUT_DIR, relativePath);
  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
    return true;
  }
  return false;
}
