"use client";

import { AssetCard } from "./asset-card";

interface Asset {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  hasImage: boolean;
  imagePath: string | null;
  description?: string;
  expectedPath: string;
}

interface AssetGridProps {
  assets: Asset[];
  onRegenerate?: (id: string) => Promise<void>;
  onDescriptionChange?: (id: string, description: string) => Promise<void>;
  styleFile: string;
  type: "icon" | "npc";
  // Selection mode props
  selectMode?: boolean;
  selectedIds?: Set<string>;
  onSelectionChange?: (id: string, selected: boolean) => void;
  // Generation status tracking
  generatingIds?: Set<string>;
  // Image version map for cache busting
  imageVersions?: Map<string, number>;
}

export function AssetGrid({
  assets,
  onRegenerate,
  onDescriptionChange,
  styleFile,
  type,
  selectMode = false,
  selectedIds = new Set(),
  onSelectionChange,
  generatingIds = new Set(),
  imageVersions = new Map(),
}: AssetGridProps) {
  if (assets.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No assets found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {assets.map((asset) => (
        <AssetCard
          key={asset.id}
          id={asset.id}
          name={asset.name}
          category={asset.category}
          subcategory={asset.subcategory}
          hasImage={asset.hasImage}
          imagePath={asset.imagePath}
          description={asset.description}
          onRegenerate={onRegenerate}
          onDescriptionChange={onDescriptionChange}
          styleFile={styleFile}
          type={type}
          selectMode={selectMode}
          isSelected={selectedIds.has(asset.id)}
          onSelectionChange={onSelectionChange}
          isGenerating={generatingIds.has(asset.id)}
          imageVersion={imageVersions.get(asset.id) || 0}
        />
      ))}
    </div>
  );
}
