"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { RefreshCw, ImageIcon, Check, Pencil, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface AssetCardProps {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  hasImage: boolean;
  imagePath: string | null;
  description?: string;
  onRegenerate?: (id: string) => Promise<void>;
  onDescriptionChange?: (id: string, description: string) => Promise<void>;
  styleFile: string;
  type: "icon" | "npc";
  // Selection mode props
  selectMode?: boolean;
  isSelected?: boolean;
  onSelectionChange?: (id: string, selected: boolean) => void;
  // Generation status from context
  isGenerating?: boolean;
  // Image update trigger
  imageVersion?: number;
}

export function AssetCard({
  id,
  name,
  category,
  subcategory,
  hasImage,
  imagePath,
  description,
  onRegenerate,
  onDescriptionChange,
  type: _type,
  selectMode = false,
  isSelected = false,
  onSelectionChange,
  isGenerating: externalIsGenerating = false,
  imageVersion = 0,
}: AssetCardProps) {
  // Note: type prop is kept for consistency but not used directly in this component
  const [isGenerating, setIsGenerating] = useState(false);
  const [localImagePath, setLocalImagePath] = useState(imagePath);
  const [localHasImage, setLocalHasImage] = useState(hasImage);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description || "");
  const [isSaving, setIsSaving] = useState(false);

  // Update local state when props change (for real-time updates)
  useEffect(() => {
    if (imagePath) {
      // Add cache-busting if there's a new version
      const newPath = imageVersion > 0
        ? `${imagePath.split("?")[0]}?v=${imageVersion}`
        : imagePath;
      setLocalImagePath(newPath);
    }
    setLocalHasImage(hasImage);
  }, [imagePath, hasImage, imageVersion]);

  // Reset edited description when description prop changes
  useEffect(() => {
    setEditedDescription(description || "");
  }, [description]);

  const handleRegenerate = async () => {
    if (!onRegenerate) return;
    setIsGenerating(true);
    try {
      await onRegenerate(id);
      // Update the image path with cache-busting
      if (imagePath) {
        setLocalImagePath(`${imagePath.split("?")[0]}?t=${Date.now()}`);
      }
      setLocalHasImage(true);
    } catch (error) {
      console.error("Failed to regenerate:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveDescription = async () => {
    if (!onDescriptionChange) return;
    setIsSaving(true);
    try {
      await onDescriptionChange(id, editedDescription);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save description:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (selectMode && onSelectionChange) {
      e.preventDefault();
      onSelectionChange(id, !isSelected);
    }
  };

  const showGenerating = isGenerating || externalIsGenerating;

  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all hover:shadow-lg",
        selectMode && "cursor-pointer",
        isSelected && "ring-2 ring-primary"
      )}
      onClick={handleCardClick}
    >
      {/* Selection checkbox */}
      {selectMode && (
        <div
          className={cn(
            "absolute top-2 left-2 z-10 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors",
            isSelected
              ? "bg-primary border-primary text-primary-foreground"
              : "bg-background/80 border-muted-foreground/50"
          )}
        >
          {isSelected && <Check className="h-3 w-3" />}
        </div>
      )}

      {/* Generating indicator */}
      {showGenerating && (
        <div className="absolute top-2 right-2 z-10">
          <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <RefreshCw className="h-3 w-3 animate-spin" />
            Generating
          </div>
        </div>
      )}

      <CardContent className="p-3">
        <div
          className={cn(
            "relative aspect-square w-full rounded-md overflow-hidden mb-2",
            !localHasImage && "checkerboard"
          )}
        >
          {localHasImage && localImagePath ? (
            <Image
              src={localImagePath}
              alt={name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              unoptimized
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
              <ImageIcon className="h-12 w-12 text-muted-foreground/50" />
            </div>
          )}

          {/* Hover overlay with regenerate button - only show when not in select mode */}
          {!selectMode && onRegenerate && (
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button
                size="sm"
                variant="secondary"
                onClick={handleRegenerate}
                disabled={showGenerating}
                className="gap-2"
              >
                <RefreshCw
                  className={cn("h-4 w-4", showGenerating && "animate-spin")}
                />
                {showGenerating
                  ? "Generating..."
                  : localHasImage
                  ? "Regenerate"
                  : "Generate"}
              </Button>
            </div>
          )}
        </div>

        <div className="space-y-1">
          <h3 className="font-medium text-sm truncate" title={name}>
            {name}
          </h3>
          <div className="flex flex-wrap gap-1">
            <Badge variant="outline" className="text-xs">
              {category}
            </Badge>
            {subcategory && (
              <Badge variant="secondary" className="text-xs">
                {subcategory.replace(/_/g, " ")}
              </Badge>
            )}
          </div>

          {/* Description with edit capability */}
          {isEditing ? (
            <div className="flex gap-1 mt-1">
              <Input
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="h-7 text-xs"
                placeholder="Enter description..."
                onClick={(e) => e.stopPropagation()}
              />
              <Button
                size="sm"
                variant="ghost"
                className="h-7 w-7 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSaveDescription();
                }}
                disabled={isSaving}
              >
                <Check className="h-3 w-3" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-7 w-7 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(false);
                  setEditedDescription(description || "");
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ) : (
            <div className="flex items-start gap-1 group/desc">
              <p
                className="text-xs text-muted-foreground line-clamp-2 flex-1"
                title={description}
              >
                {description || "No description"}
              </p>
              {onDescriptionChange && !selectMode && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-5 w-5 p-0 opacity-0 group-hover/desc:opacity-100 transition-opacity shrink-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditing(true);
                  }}
                >
                  <Pencil className="h-3 w-3" />
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
