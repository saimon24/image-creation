"use client";

import { useState } from "react";
import { useGeneration, GenerationJob } from "@/contexts/generation-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ChevronUp,
  ChevronDown,
  X,
  Loader2,
  CheckCircle2,
  XCircle,
  Clock,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";

function JobItem({ job }: { job: GenerationJob }) {
  const statusConfig: Record<
    GenerationJob["status"],
    { icon: typeof Clock; color: string; bgColor: string; label: string; spin?: boolean }
  > = {
    pending: {
      icon: Clock,
      color: "text-muted-foreground",
      bgColor: "bg-muted",
      label: "Queued",
    },
    generating: {
      icon: Loader2,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      label: "Generating",
      spin: true,
    },
    completed: {
      icon: CheckCircle2,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      label: "Done",
    },
    failed: {
      icon: XCircle,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      label: "Failed",
    },
  };

  const config = statusConfig[job.status];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md",
        config.bgColor
      )}
    >
      <Icon
        className={cn("h-4 w-4 shrink-0", config.color, config.spin && "animate-spin")}
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{job.name}</p>
        {job.error && (
          <p className="text-xs text-red-500 truncate">{job.error}</p>
        )}
      </div>
      <Badge variant="outline" className={cn("text-xs shrink-0", config.color)}>
        {config.label}
      </Badge>
    </div>
  );
}

export function GenerationPanel() {
  const {
    jobs,
    activeJobCount,
    pendingJobCount,
    completedJobs,
    failedJobs,
    clearCompleted,
    clearAll,
  } = useGeneration();
  const [isExpanded, setIsExpanded] = useState(true);

  // Don't render if no jobs
  if (jobs.length === 0) {
    return null;
  }

  const inProgressCount = activeJobCount + pendingJobCount;
  const doneCount = completedJobs.length + failedJobs.length;

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-background border rounded-lg shadow-lg z-50">
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          {activeJobCount > 0 && (
            <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
          )}
          <span className="font-medium text-sm">Generation Queue</span>
          {inProgressCount > 0 && (
            <Badge variant="secondary" className="text-xs">
              {inProgressCount} in progress
            </Badge>
          )}
          {doneCount > 0 && inProgressCount === 0 && (
            <Badge variant="outline" className="text-xs">
              {doneCount} done
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-1">
          {doneCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0"
              onClick={(e) => {
                e.stopPropagation();
                clearCompleted();
              }}
              title="Clear completed"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0"
            onClick={(e) => {
              e.stopPropagation();
              clearAll();
            }}
            title="Clear all"
          >
            <X className="h-4 w-4" />
          </Button>
          {isExpanded ? (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
      </div>

      {/* Job List */}
      {isExpanded && (
        <ScrollArea className="max-h-64">
          <div className="p-2 space-y-1">
            {jobs.map((job) => (
              <JobItem key={job.id} job={job} />
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
