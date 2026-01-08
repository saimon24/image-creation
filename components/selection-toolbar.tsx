"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckSquare, Square, X, Sparkles } from "lucide-react";

interface SelectionToolbarProps {
  selectMode: boolean;
  onToggleSelectMode: () => void;
  selectedCount: number;
  totalCount: number;
  onSelectAll: () => void;
  onClearSelection: () => void;
  onGenerateSelected: () => void;
  isGenerating?: boolean;
}

export function SelectionToolbar({
  selectMode,
  onToggleSelectMode,
  selectedCount,
  totalCount,
  onSelectAll,
  onClearSelection,
  onGenerateSelected,
  isGenerating = false,
}: SelectionToolbarProps) {
  const allSelected = selectedCount === totalCount && totalCount > 0;

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={selectMode ? "secondary" : "outline"}
        size="sm"
        onClick={onToggleSelectMode}
        className="gap-2"
      >
        {selectMode ? (
          <>
            <X className="h-4 w-4" />
            Exit Select
          </>
        ) : (
          <>
            <CheckSquare className="h-4 w-4" />
            Select
          </>
        )}
      </Button>

      {selectMode && (
        <>
          <Button
            variant="outline"
            size="sm"
            onClick={allSelected ? onClearSelection : onSelectAll}
            className="gap-2"
          >
            {allSelected ? (
              <>
                <Square className="h-4 w-4" />
                Deselect All
              </>
            ) : (
              <>
                <CheckSquare className="h-4 w-4" />
                Select All ({totalCount})
              </>
            )}
          </Button>

          {selectedCount > 0 && (
            <>
              <Badge variant="secondary" className="text-sm">
                {selectedCount} selected
              </Badge>
              <Button
                size="sm"
                onClick={onGenerateSelected}
                disabled={isGenerating}
                className="gap-2"
              >
                <Sparkles className="h-4 w-4" />
                Generate Selected
              </Button>
            </>
          )}
        </>
      )}
    </div>
  );
}
