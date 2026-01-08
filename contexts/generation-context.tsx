"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  ReactNode,
} from "react";

export interface GenerationJob {
  id: string;
  itemId: string;
  name: string;
  type: "icon" | "npc";
  styleFile: string;
  status: "pending" | "generating" | "completed" | "failed";
  error?: string;
  startedAt: number;
  completedAt?: number;
}

interface GenerationContextValue {
  jobs: GenerationJob[];
  addJob: (item: {
    itemId: string;
    name: string;
    type: "icon" | "npc";
    styleFile: string;
  }) => string;
  addJobs: (
    items: Array<{
      itemId: string;
      name: string;
      type: "icon" | "npc";
      styleFile: string;
    }>
  ) => string[];
  activeJobCount: number;
  pendingJobCount: number;
  completedJobs: GenerationJob[];
  failedJobs: GenerationJob[];
  clearCompleted: () => void;
  clearAll: () => void;
  onJobComplete: (callback: (job: GenerationJob) => void) => () => void;
}

const GenerationContext = createContext<GenerationContextValue | null>(null);

const MAX_CONCURRENT = 2;

export function GenerationProvider({ children }: { children: ReactNode }) {
  const [jobs, setJobs] = useState<GenerationJob[]>([]);
  const processingRef = useRef(false);
  const processingJobsRef = useRef<Set<string>>(new Set()); // Track jobs currently being processed
  const completionCallbacksRef = useRef<Set<(job: GenerationJob) => void>>(
    new Set()
  );

  const generateId = () => `job-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

  const processQueue = useCallback(async () => {
    if (processingRef.current) return;
    processingRef.current = true;

    // Get current jobs snapshot to determine what to process
    setJobs((currentJobs) => {
      const activeCount = currentJobs.filter(
        (j) => j.status === "generating"
      ).length;
      const pendingJobs = currentJobs.filter(
        (j) => j.status === "pending" && !processingJobsRef.current.has(j.id)
      );

      if (activeCount >= MAX_CONCURRENT || pendingJobs.length === 0) {
        processingRef.current = false;
        return currentJobs;
      }

      const jobsToStart = pendingJobs.slice(0, MAX_CONCURRENT - activeCount);
      const jobIdsToStart = new Set(jobsToStart.map((j) => j.id));

      // Mark these jobs as being processed to prevent duplicates
      jobsToStart.forEach((job) => {
        processingJobsRef.current.add(job.id);
      });

      // Schedule job processing OUTSIDE of setState
      setTimeout(() => {
        jobsToStart.forEach((job) => {
          processJob(job);
        });
      }, 0);

      return currentJobs.map((j) =>
        jobIdsToStart.has(j.id) ? { ...j, status: "generating" as const } : j
      );
    });

    processingRef.current = false;
  }, []);

  const processJob = async (job: GenerationJob) => {
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemId: job.itemId,
          type: job.type,
          styleFile: job.styleFile,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setJobs((current) =>
          current.map((j) =>
            j.id === job.id
              ? { ...j, status: "completed" as const, completedAt: Date.now() }
              : j
          )
        );
        // Notify listeners
        const completedJob = { ...job, status: "completed" as const, completedAt: Date.now() };
        completionCallbacksRef.current.forEach((cb) => cb(completedJob));
      } else {
        setJobs((current) =>
          current.map((j) =>
            j.id === job.id
              ? {
                  ...j,
                  status: "failed" as const,
                  error: result.error || "Unknown error",
                  completedAt: Date.now(),
                }
              : j
          )
        );
      }
    } catch (error) {
      setJobs((current) =>
        current.map((j) =>
          j.id === job.id
            ? {
                ...j,
                status: "failed" as const,
                error: error instanceof Error ? error.message : "Network error",
                completedAt: Date.now(),
              }
            : j
        )
      );
    }

    // Clean up tracking and process more jobs
    processingJobsRef.current.delete(job.id);
    processingRef.current = false;
    processQueue();
  };

  const addJob = useCallback(
    (item: {
      itemId: string;
      name: string;
      type: "icon" | "npc";
      styleFile: string;
    }) => {
      const id = generateId();
      const job: GenerationJob = {
        id,
        itemId: item.itemId,
        name: item.name,
        type: item.type,
        styleFile: item.styleFile,
        status: "pending",
        startedAt: Date.now(),
      };

      setJobs((current) => [...current, job]);
      setTimeout(() => processQueue(), 0);
      return id;
    },
    [processQueue]
  );

  const addJobs = useCallback(
    (
      items: Array<{
        itemId: string;
        name: string;
        type: "icon" | "npc";
        styleFile: string;
      }>
    ) => {
      const newJobs: GenerationJob[] = items.map((item) => ({
        id: generateId(),
        itemId: item.itemId,
        name: item.name,
        type: item.type,
        styleFile: item.styleFile,
        status: "pending" as const,
        startedAt: Date.now(),
      }));

      setJobs((current) => [...current, ...newJobs]);
      setTimeout(() => processQueue(), 0);
      return newJobs.map((j) => j.id);
    },
    [processQueue]
  );

  const clearCompleted = useCallback(() => {
    setJobs((current) =>
      current.filter((j) => j.status !== "completed" && j.status !== "failed")
    );
  }, []);

  const clearAll = useCallback(() => {
    setJobs((current) => current.filter((j) => j.status === "generating"));
  }, []);

  const onJobComplete = useCallback(
    (callback: (job: GenerationJob) => void) => {
      completionCallbacksRef.current.add(callback);
      return () => {
        completionCallbacksRef.current.delete(callback);
      };
    },
    []
  );

  // Compute derived values
  const activeJobCount = jobs.filter((j) => j.status === "generating").length;
  const pendingJobCount = jobs.filter((j) => j.status === "pending").length;
  const completedJobs = jobs.filter((j) => j.status === "completed");
  const failedJobs = jobs.filter((j) => j.status === "failed");

  return (
    <GenerationContext.Provider
      value={{
        jobs,
        addJob,
        addJobs,
        activeJobCount,
        pendingJobCount,
        completedJobs,
        failedJobs,
        clearCompleted,
        clearAll,
        onJobComplete,
      }}
    >
      {children}
    </GenerationContext.Provider>
  );
}

export function useGeneration() {
  const context = useContext(GenerationContext);
  if (!context) {
    throw new Error("useGeneration must be used within a GenerationProvider");
  }
  return context;
}
