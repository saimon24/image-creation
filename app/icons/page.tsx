"use client";

import { Suspense, useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { AssetGrid } from "@/components/asset-grid";
import { StyleSelector } from "@/components/style-selector";
import { SelectionToolbar } from "@/components/selection-toolbar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
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
  { id: "airport", label: "Airport" },
  { id: "animal-products", label: "Animal Products" },
  { id: "animals", label: "Animals" },
  { id: "area-items", label: "Area Items" },
  { id: "avatar", label: "Avatar" },
  { id: "avatar-border", label: "Avatar Border" },
  { id: "backgrounds", label: "Backgrounds" },
  { id: "blacksmith", label: "Blacksmith" },
  { id: "buildings", label: "Buildings" },
  { id: "category", label: "Category" },
  { id: "coop", label: "Coop" },
  { id: "cosmetics", label: "Cosmetics" },
  { id: "crafts", label: "Crafts" },
  { id: "crops", label: "Crops" },
  { id: "events-boosts", label: "Events & Boosts" },
  { id: "leaderboard", label: "Leaderboard" },
  { id: "lake", label: "Lake" },
  { id: "mastery", label: "Mastery" },
  { id: "ambient-season", label: "Ambient Season" },
  { id: "misc", label: "Misc" },
  { id: "potions", label: "Potions" },
  { id: "rare", label: "Rare" },
  { id: "sanctuary", label: "Sanctuary" },
  { id: "season-pass", label: "Season Pass" },
  { id: "tabs", label: "Tabs" },
  { id: "tutorial", label: "Tutorial" },
  { id: "upgrades", label: "Upgrades" },
  { id: "valley", label: "Valley" },
  { id: "explorer", label: "Explorer" },
  { id: "shop", label: "Shop" },
  { id: "special-events", label: "Special Events" },
];

const SPECIAL_EVENTS_SUBCATEGORIES = [
  { id: "all", label: "All Events" },
  { id: "easter", label: "Easter" },
  { id: "firefly-festival", label: "Firefly Festival" },
];

const BLACKSMITH_SUBCATEGORIES = [
  { id: "all", label: "All Gear" },
  { id: "tool_gear", label: "Tool Gear" },
  { id: "armor_gear", label: "Armor Gear" },
  { id: "accessory_gear", label: "Accessory Gear" },
  { id: "consumable", label: "Consumable" },
];

const AMBIENT_SEASON_SUBCATEGORIES = [
  { id: "all", label: "All Seasons" },
  { id: "winter", label: "Winter (Dec–Feb)" },
  { id: "spring", label: "Spring (Mar–May)" },
  { id: "summer", label: "Summer (Jun–Aug)" },
  { id: "autumn", label: "Autumn (Sep–Nov)" },
  { id: "holiday-week", label: "Holiday Week" },
];

const SEASON_PASS_SUBCATEGORIES = [
  { id: "all", label: "All Seasons" },
  { id: "2025-02-frosty-fields", label: "Feb 2025 - Frosty Fields" },
  { id: "2025-03-spring-bloom", label: "Mar 2025 - Spring Bloom" },
  { id: "2025-04-blossom-festival", label: "Apr 2025 - Blossom Festival" },
  { id: "2026-05-verdant-valley", label: "May 2026 - Verdant Valley" },
  { id: "2026-06-honey-hollow", label: "June 2026 - Honey Hollow" },
  { id: "2026-07-sunny-shores", label: "July 2026 - Sunny Shores" },
  { id: "2026-08-harvest-fair", label: "Aug 2026 - Harvest Fair" },
  { id: "2026-09-golden-grove", label: "Sep 2026 - Golden Grove" },
];

function IconsPageContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [assets, setAssets] = useState<Asset[]>([]);
  const [styles, setStyles] = useState<Style[]>([]);
  const [selectedStyle, setSelectedStyle] = useState("crafts-v4-styles.json");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSubcategory, setSelectedSubcategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [imageFilter, setImageFilter] = useState<"all" | "generated" | "not-generated">("all");
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
      if (
        (selectedCategory === "season-pass" ||
          selectedCategory === "ambient-season" ||
          selectedCategory === "special-events" ||
          selectedCategory === "blacksmith") &&
        selectedSubcategory !== "all"
      ) {
        params.set("subcategory", selectedSubcategory);
      }
      const res = await fetch(`/api/assets?${params}`);
      const data = await res.json();
      setAssets(data.assets);
    } catch (error) {
      console.error("Failed to fetch assets:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, selectedSubcategory]);

  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

  // Reset subcategory when category changes
  useEffect(() => {
    setSelectedSubcategory("all");
  }, [selectedCategory]);

  useEffect(() => {
    async function fetchStyles() {
      try {
        const res = await fetch("/api/styles");
        const data = await res.json();
        setStyles(data);
        const iconStyle = data.find(
          (s: Style) => s.filename === "crafts-v4-styles.json"
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
    // Filter by image status
    if (imageFilter === "generated" && !asset.hasImage) return false;
    if (imageFilter === "not-generated" && asset.hasImage) return false;

    // Filter by search query
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

        <div className="flex items-center gap-2">
          <Select value={imageFilter} onValueChange={(value: "all" | "generated" | "not-generated") => setImageFilter(value)}>
            <SelectTrigger className="w-[160px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Icons</SelectItem>
              <SelectItem value="generated">Generated</SelectItem>
              <SelectItem value="not-generated">Not Generated</SelectItem>
            </SelectContent>
          </Select>
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
      </div>

      {/* Category Tabs */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <div className="overflow-x-auto -mx-4 px-4">
          <TabsList className="inline-flex w-max min-w-full">
            {CATEGORIES.map((cat) => (
              <TabsTrigger key={cat.id} value={cat.id} className="flex-shrink-0 whitespace-nowrap">
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </Tabs>

      {/* Ambient Season Subcategory Tabs */}
      {selectedCategory === "ambient-season" && (
        <Tabs value={selectedSubcategory} onValueChange={setSelectedSubcategory}>
          <TabsList>
            {AMBIENT_SEASON_SUBCATEGORIES.map((sub) => (
              <TabsTrigger key={sub.id} value={sub.id}>
                {sub.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}

      {/* Season Pass Subcategory Tabs */}
      {selectedCategory === "season-pass" && (
        <Tabs value={selectedSubcategory} onValueChange={setSelectedSubcategory}>
          <TabsList>
            {SEASON_PASS_SUBCATEGORIES.map((sub) => (
              <TabsTrigger key={sub.id} value={sub.id}>
                {sub.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}

      {/* Special Events Subcategory Tabs */}
      {selectedCategory === "special-events" && (
        <Tabs value={selectedSubcategory} onValueChange={setSelectedSubcategory}>
          <TabsList>
            {SPECIAL_EVENTS_SUBCATEGORIES.map((sub) => (
              <TabsTrigger key={sub.id} value={sub.id}>
                {sub.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}

      {/* Blacksmith Subcategory Tabs */}
      {selectedCategory === "blacksmith" && (
        <Tabs value={selectedSubcategory} onValueChange={setSelectedSubcategory}>
          <TabsList>
            {BLACKSMITH_SUBCATEGORIES.map((sub) => (
              <TabsTrigger key={sub.id} value={sub.id}>
                {sub.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}

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
