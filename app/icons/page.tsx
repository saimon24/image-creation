"use client";

import { Suspense, useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { AssetGrid } from "@/components/asset-grid";
import { StyleSelector } from "@/components/style-selector";
import { SelectionToolbar } from "@/components/selection-toolbar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { useGeneration } from "@/contexts/generation-context";

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

interface Style {
  filename: string;
  name: string;
}

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "crops", label: "Crops" },
  { id: "area-items", label: "Area Items" },
  { id: "crafts", label: "Crafts" },
  { id: "rare", label: "Rare" },
  { id: "animal-products", label: "Animal Products" },
  { id: "misc", label: "Misc" },
  { id: "potions", label: "Potions" },
  { id: "upgrades", label: "Upgrades" },
  { id: "leaderboard", label: "Leaderboard" },
  { id: "buildings", label: "Buildings" },
  { id: "animals", label: "Animals" },
  { id: "mastery", label: "Mastery" },
  { id: "tabs", label: "Tabs" },
  { id: "events-boosts", label: "Events & Boosts" },
  { id: "tutorial", label: "Tutorial" },
];

function IconsPageContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [assets, setAssets] = useState<Asset[]>([]);
  const [styles, setStyles] = useState<Style[]>([]);
  const [selectedStyle, setSelectedStyle] = useState("style.json");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Selection state
  const [selectMode, setSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Generation tracking
  const { addJob, addJobs, jobs, onJobComplete } = useGeneration();
  const [generatingIds, setGeneratingIds] = useState<Set<string>>(new Set());
  const [imageVersions, setImageVersions] = useState<Map<string, number>>(new Map());

  const fetchAssets = useCallback(async () => {
    try {
      const params = new URLSearchParams({ type: "icons" });
      if (selectedCategory !== "all") {
        params.set("category", selectedCategory);
      }
      const res = await fetch(`/api/assets?${params}`);
      const data = await res.json();
      setAssets(data.assets);
    } catch (error) {
      console.error("Failed to fetch assets:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

  useEffect(() => {
    async function fetchStyles() {
      try {
        const res = await fetch("/api/styles");
        const data = await res.json();
        setStyles(data);
        const iconStyle = data.find(
          (s: Style) => s.filename === "style.json"
        );
        if (iconStyle) {
          setSelectedStyle(iconStyle.filename);
        }
      } catch (error) {
        console.error("Failed to fetch styles:", error);
      }
    }
    fetchStyles();
  }, []);

  // Track generating items from global job queue
  useEffect(() => {
    const generating = new Set<string>();
    jobs.forEach((job) => {
      if (job.type === "icon" && (job.status === "pending" || job.status === "generating")) {
        generating.add(job.itemId);
      }
    });
    setGeneratingIds(generating);
  }, [jobs]);

  // Listen for job completions to update images
  useEffect(() => {
    const unsubscribe = onJobComplete((job) => {
      if (job.type === "icon") {
        // Update image version to trigger refresh
        setImageVersions((prev) => {
          const newMap = new Map(prev);
          newMap.set(job.itemId, Date.now());
          return newMap;
        });
        // Refresh the asset to get the new image path
        fetchAssets();
      }
    });
    return unsubscribe;
  }, [onJobComplete, fetchAssets]);

  const handleRegenerate = async (id: string) => {
    const asset = assets.find((a) => a.id === id);
    if (!asset) return;

    addJob({
      itemId: id,
      name: asset.name,
      type: "icon",
      styleFile: selectedStyle,
    });
  };

  const handleDescriptionChange = async (id: string, description: string) => {
    const response = await fetch(`/api/items/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description, type: "icon" }),
    });

    if (!response.ok) {
      throw new Error("Failed to update description");
    }

    // Update local state
    setAssets((prev) =>
      prev.map((a) => (a.id === id ? { ...a, description } : a))
    );
  };

  const handleSelectionChange = (id: string, selected: boolean) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (selected) {
        newSet.add(id);
      } else {
        newSet.delete(id);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    setSelectedIds(new Set(filteredAssets.map((a) => a.id)));
  };

  const handleClearSelection = () => {
    setSelectedIds(new Set());
  };

  const handleToggleSelectMode = () => {
    setSelectMode((prev) => !prev);
    if (selectMode) {
      setSelectedIds(new Set());
    }
  };

  const handleGenerateSelected = () => {
    const selectedAssets = assets.filter((a) => selectedIds.has(a.id));
    addJobs(
      selectedAssets.map((asset) => ({
        itemId: asset.id,
        name: asset.name,
        type: "icon" as const,
        styleFile: selectedStyle,
      }))
    );
    // Clear selection after queueing
    setSelectedIds(new Set());
    setSelectMode(false);
  };

  const filteredAssets = assets.filter((asset) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      asset.name.toLowerCase().includes(query) ||
      asset.id.toLowerCase().includes(query) ||
      asset.description?.toLowerCase().includes(query)
    );
  });

  const totalAssets = filteredAssets.length;
  const withImages = filteredAssets.filter((a) => a.hasImage).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Icons</h1>
          <p className="text-muted-foreground">
            Game item icons - crops, crafts, buildings, and more
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">
            {withImages} / {totalAssets} generated
          </Badge>
        </div>
      </div>

      {/* Filters and Selection Toolbar */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search icons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <StyleSelector
            styles={styles}
            value={selectedStyle}
            onChange={setSelectedStyle}
          />
        </div>

        <SelectionToolbar
          selectMode={selectMode}
          onToggleSelectMode={handleToggleSelectMode}
          selectedCount={selectedIds.size}
          totalCount={filteredAssets.length}
          onSelectAll={handleSelectAll}
          onClearSelection={handleClearSelection}
          onGenerateSelected={handleGenerateSelected}
        />
      </div>

      {/* Category Tabs */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList>
          {CATEGORIES.map((cat) => (
            <TabsTrigger key={cat.id} value={cat.id}>
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Asset Grid */}
      <AssetGrid
        assets={filteredAssets}
        onRegenerate={handleRegenerate}
        onDescriptionChange={handleDescriptionChange}
        styleFile={selectedStyle}
        type="icon"
        selectMode={selectMode}
        selectedIds={selectedIds}
        onSelectionChange={handleSelectionChange}
        generatingIds={generatingIds}
        imageVersions={imageVersions}
      />
    </div>
  );
}

export default function IconsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Loading...</div>
        </div>
      }
    >
      <IconsPageContent />
    </Suspense>
  );
}
