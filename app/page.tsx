"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ImageIcon,
  Users,
  Wheat,
  Hammer,
  Building2,
  TreePine,
  ArrowRight,
} from "lucide-react";

interface Summary {
  total: number;
  withImages: number;
  missingImages: number;
  coverage: number;
}

interface CategoryStats {
  category: string;
  total: number;
  withImages: number;
}

export default function Dashboard() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [categoryStats, setCategoryStats] = useState<CategoryStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/assets");
        const data = await res.json();
        setSummary(data.summary);

        // Calculate per-category stats
        const stats = new Map<string, { total: number; withImages: number }>();
        for (const asset of data.assets) {
          const cat = asset.category;
          if (!stats.has(cat)) {
            stats.set(cat, { total: 0, withImages: 0 });
          }
          const s = stats.get(cat)!;
          s.total++;
          if (asset.hasImage) s.withImages++;
        }

        setCategoryStats(
          Array.from(stats.entries()).map(([category, s]) => ({
            category,
            ...s,
          }))
        );
      } catch (error) {
        console.error("Failed to fetch assets:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const categoryIcons: Record<string, typeof ImageIcon> = {
    crops: Wheat,
    crafts: Hammer,
    buildings: Building2,
    animals: TreePine,
    "area-items": ImageIcon,
    npcs: Users,
  };

  const categoryColors: Record<string, string> = {
    crops: "bg-green-100 text-green-700",
    crafts: "bg-orange-100 text-orange-700",
    buildings: "bg-blue-100 text-blue-700",
    animals: "bg-amber-100 text-amber-700",
    "area-items": "bg-purple-100 text-purple-700",
    npcs: "bg-pink-100 text-pink-700",
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Manage and generate game assets with AI
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary?.total || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Generated</CardTitle>
            <ImageIcon className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {summary?.withImages || 0}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Missing</CardTitle>
            <ImageIcon className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {summary?.missingImages || 0}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Coverage</CardTitle>
            <span className="text-xs text-muted-foreground">%</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary?.coverage || 0}%</div>
            <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: `${summary?.coverage || 0}%` }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Grid */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categoryStats.map((stat) => {
            const Icon = categoryIcons[stat.category] || ImageIcon;
            const colorClass = categoryColors[stat.category] || "bg-gray-100 text-gray-700";
            const coverage =
              stat.total > 0
                ? Math.round((stat.withImages / stat.total) * 100)
                : 0;

            return (
              <Card key={stat.category} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${colorClass}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold capitalize">
                          {stat.category.replace(/-/g, " ")}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {stat.withImages} / {stat.total} assets
                        </p>
                      </div>
                    </div>
                    <Badge variant={coverage === 100 ? "default" : "secondary"}>
                      {coverage}%
                    </Badge>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden mb-4">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ width: `${coverage}%` }}
                    />
                  </div>
                  <Link
                    href={
                      stat.category === "npcs"
                        ? "/npcs"
                        : `/icons?category=${stat.category}`
                    }
                  >
                    <Button variant="outline" size="sm" className="w-full gap-2">
                      View Assets
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
