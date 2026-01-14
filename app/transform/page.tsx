"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StyleSelector } from "@/components/style-selector";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Upload, X, Download, Copy, Check, Sparkles, Wand2, Palette } from "lucide-react";

interface Style {
  filename: string;
  name: string;
}

interface TransformResult {
  success: boolean;
  path?: string;
  prompt?: string;
  analysis?: string;
  error?: string;
  originalDimensions?: { width: number; height: number };
  outputDimensions?: { width: number; height: number };
  format?: string;
}

export default function TransformPage() {
  // Upload state
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [originalDimensions, setOriginalDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [dragActive, setDragActive] = useState(false);

  // Mode state
  type TransformMode = "style" | "edit";
  const [mode, setMode] = useState<TransformMode>("style");

  // Style state
  const [styles, setStyles] = useState<Style[]>([]);
  const [selectedStyle, setSelectedStyle] = useState("style.json");

  // Edit mode state
  const [editPrompt, setEditPrompt] = useState("");

  // Output settings
  const [outputFormat, setOutputFormat] = useState<"original" | "webp" | "png" | "jpg">("original");
  const [matchOriginalSize, setMatchOriginalSize] = useState(true);

  // Generation state
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<TransformResult | null>(null);
  const [copied, setCopied] = useState(false);

  const formatOptions = [
    { value: "original", label: "Original", description: "Keep original format" },
    { value: "webp", label: "WebP", description: "Smaller file size" },
    { value: "png", label: "PNG", description: "Lossless, transparency" },
    { value: "jpg", label: "JPG", description: "No transparency" },
  ] as const;

  useEffect(() => {
    async function fetchStyles() {
      try {
        const res = await fetch("/api/styles");
        const data = await res.json();
        setStyles(data);
      } catch (error) {
        console.error("Failed to fetch styles:", error);
      }
    }
    fetchStyles();
  }, []);

  const handleFileSelect = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    setUploadedFile(file);
    setResult(null);

    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    // Get dimensions
    const img = new window.Image();
    img.onload = () => {
      setOriginalDimensions({ width: img.width, height: img.height });
    };
    img.src = url;
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFileSelect(file);
    },
    [handleFileSelect]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  }, []);

  const handleClear = useCallback(() => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setUploadedFile(null);
    setPreviewUrl(null);
    setOriginalDimensions(null);
    setResult(null);
  }, [previewUrl]);

  const handleGenerate = async () => {
    if (!uploadedFile) return;
    if (mode === "edit" && !editPrompt.trim()) return;

    setGenerating(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("image", uploadedFile);
      formData.append("matchOriginalSize", matchOriginalSize.toString());
      if (outputFormat !== "original") {
        formData.append("format", outputFormat);
      }

      if (mode === "style") {
        formData.append("styleFile", selectedStyle);
      } else {
        formData.append("editPrompt", editPrompt.trim());
      }

      const res = await fetch("/api/transform", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data);
    } catch (error) {
      setResult({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setGenerating(false);
    }
  };

  const handleCopyPrompt = async () => {
    if (result?.prompt) {
      await navigator.clipboard.writeText(result.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = async () => {
    if (!result?.path) return;

    try {
      const response = await fetch(result.path);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = result.path.split("/").pop() || "transformed-image";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Transform Image</h1>
        <p className="text-muted-foreground">
          Upload an image and apply a style or make direct edits
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input Section */}
        <div className="space-y-6">
          {/* Upload Area */}
          <Card>
            <CardHeader>
              <CardTitle>Source Image</CardTitle>
            </CardHeader>
            <CardContent>
              {!uploadedFile ? (
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive
                      ? "border-primary bg-primary/5"
                      : "border-muted-foreground/25 hover:border-muted-foreground/50"
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  <Upload className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Drag and drop an image, or click to browse
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="file-upload"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileSelect(file);
                    }}
                  />
                  <Button variant="outline" asChild>
                    <label htmlFor="file-upload" className="cursor-pointer">
                      Choose File
                    </label>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative">
                    <div className="relative aspect-square w-full max-w-sm mx-auto border rounded-lg overflow-hidden bg-[url('/checkerboard.svg')] bg-repeat">
                      {previewUrl && (
                        <Image
                          src={previewUrl}
                          alt="Uploaded preview"
                          fill
                          className="object-contain"
                          unoptimized
                        />
                      )}
                    </div>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={handleClear}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-center text-sm text-muted-foreground">
                    <p className="font-medium">{uploadedFile.name}</p>
                    {originalDimensions && (
                      <p>
                        {originalDimensions.width} × {originalDimensions.height} pixels
                      </p>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Mode Toggle */}
          <Card>
            <CardHeader>
              <CardTitle>Transform Mode</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Button
                  variant={mode === "style" ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => setMode("style")}
                >
                  <Palette className="mr-2 h-4 w-4" />
                  Style
                </Button>
                <Button
                  variant={mode === "edit" ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => setMode("edit")}
                >
                  <Wand2 className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </div>

              {mode === "style" ? (
                <div className="space-y-2">
                  <StyleSelector
                    styles={styles}
                    value={selectedStyle}
                    onChange={setSelectedStyle}
                  />
                  <p className="text-xs text-muted-foreground">
                    Analyze image and recreate with selected style
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <Textarea
                    placeholder="Enter your edit instruction, e.g. 'change to dark mode' or 'make it look more vibrant'"
                    value={editPrompt}
                    onChange={(e) => setEditPrompt(e.target.value)}
                    className="min-h-[100px] resize-none"
                  />
                  <p className="text-xs text-muted-foreground">
                    Direct prompt applied to modify your image
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Output Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Output Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="matchSize"
                  checked={matchOriginalSize}
                  onCheckedChange={(checked) =>
                    setMatchOriginalSize(checked as boolean)
                  }
                />
                <Label htmlFor="matchSize" className="cursor-pointer">
                  Match original dimensions
                </Label>
              </div>

              <div className="space-y-3">
                <Label>Output Format</Label>
                <div className="grid grid-cols-2 gap-3">
                  {formatOptions.map((option) => (
                    <div key={option.value} className="flex items-start space-x-2">
                      <Checkbox
                        id={`format-${option.value}`}
                        checked={outputFormat === option.value}
                        onCheckedChange={() => setOutputFormat(option.value)}
                      />
                      <div className="grid gap-0.5 leading-none">
                        <Label
                          htmlFor={`format-${option.value}`}
                          className="text-sm font-medium cursor-pointer"
                        >
                          {option.label}
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          {option.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Generate Button */}
          <Button
            onClick={handleGenerate}
            disabled={!uploadedFile || generating || (mode === "edit" && !editPrompt.trim())}
            className="w-full"
            size="lg"
          >
            {generating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {mode === "style" ? "Transforming..." : "Editing..."}
              </>
            ) : (
              <>
                {mode === "style" ? (
                  <Palette className="mr-2 h-4 w-4" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                {mode === "style" ? "Transform Image" : "Apply Edit"}
              </>
            )}
          </Button>
        </div>

        {/* Result Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Result</CardTitle>
            </CardHeader>
            <CardContent>
              {generating ? (
                <div className="flex flex-col items-center justify-center h-64 gap-4">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  <div className="text-center">
                    <p className="text-muted-foreground">
                      {mode === "style" ? "Transforming your image..." : "Applying your edit..."}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {mode === "style"
                        ? "Analyzing content and applying style"
                        : "Analyzing content and applying modification"}
                    </p>
                  </div>
                </div>
              ) : result ? (
                result.success && result.path ? (
                  <div className="space-y-4">
                    <div className="relative aspect-square w-full max-w-sm mx-auto border rounded-lg overflow-hidden bg-[url('/checkerboard.svg')] bg-repeat">
                      <Image
                        src={`${result.path}?t=${Date.now()}`}
                        alt="Transformed image"
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <div className="flex justify-center gap-2">
                      <Button variant="outline" size="sm" onClick={handleDownload}>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                    <div className="text-center text-sm text-muted-foreground">
                      {result.outputDimensions && (
                        <p>
                          {result.outputDimensions.width} × {result.outputDimensions.height} pixels
                          {result.format && ` • ${result.format.toUpperCase()}`}
                        </p>
                      )}
                      <p className="text-xs mt-1">Saved to: {result.path}</p>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-destructive/10 text-destructive rounded-lg">
                    <p className="font-medium">Transformation Failed</p>
                    <p className="text-sm mt-1">{result.error}</p>
                  </div>
                )
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                  <Sparkles className="h-12 w-12 mb-4 opacity-20" />
                  <p>Your transformed image will appear here</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Analysis Preview */}
          {result?.analysis && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Image Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {result.analysis}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Prompt Preview */}
          {result?.prompt && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Generated Prompt</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyPrompt}
                  className="h-8 px-2"
                >
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap line-clamp-6">
                  {result.prompt}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
