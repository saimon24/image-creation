"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StyleSelector } from "@/components/style-selector";
import { Loader2, Sparkles, Copy, Check } from "lucide-react";

interface Style {
  filename: string;
  name: string;
}

interface GenerationResult {
  success: boolean;
  path?: string;
  prompt?: string;
  error?: string;
}

export default function CustomPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [directPrompt, setDirectPrompt] = useState("");
  const [outputFilename, setOutputFilename] = useState("");

  const [styleMode, setStyleMode] = useState<"existing" | "custom">("existing");
  const [styles, setStyles] = useState<Style[]>([]);
  const [selectedStyle, setSelectedStyle] = useState("style.json");
  const [customStyleJson, setCustomStyleJson] = useState(`{
  "icon_style": {
    "perspective": "3/4 top-down view",
    "stylistic_tone": "cozy farm game",
    "composition": {
      "element_count": "single centered element",
      "framing": "tight crop with small padding"
    },
    "lighting": {
      "type": "soft diffused lighting",
      "shadow": "subtle drop shadow"
    },
    "color_palette": {
      "tone": "warm and vibrant",
      "range": "limited color palette"
    },
    "background": {
      "color": "transparent"
    }
  }
}`);

  const [promptMode, setPromptMode] = useState<"build" | "direct">("build");
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [copied, setCopied] = useState(false);

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

  const handleGenerate = async () => {
    setGenerating(true);
    setResult(null);

    try {
      let body: Record<string, unknown> = {};

      if (promptMode === "direct") {
        body = {
          prompt: directPrompt,
          outputFilename: outputFilename || undefined,
        };
      } else {
        body = {
          name,
          description: description || undefined,
          outputFilename: outputFilename || undefined,
        };

        if (styleMode === "existing") {
          body.styleFile = selectedStyle;
        } else {
          try {
            body.customStyle = JSON.parse(customStyleJson);
          } catch {
            setResult({ success: false, error: "Invalid JSON in custom style" });
            setGenerating(false);
            return;
          }
        }
      }

      const res = await fetch("/api/generate-custom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
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

  const isValid = promptMode === "direct"
    ? directPrompt.trim().length > 0
    : name.trim().length > 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Custom Generation</h1>
        <p className="text-muted-foreground">
          Create custom images with specific prompts or styles
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input Section */}
        <div className="space-y-6">
          {/* Prompt Mode Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Prompt Mode</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={promptMode} onValueChange={(v) => setPromptMode(v as "build" | "direct")}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="build">Build Prompt</TabsTrigger>
                  <TabsTrigger value="direct">Direct Prompt</TabsTrigger>
                </TabsList>

                <TabsContent value="build" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Item Name *</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Golden Apple"
                      value={name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description (optional)</Label>
                    <Textarea
                      id="description"
                      placeholder="Detailed description of the item..."
                      value={description}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                      rows={3}
                    />
                    <p className="text-xs text-muted-foreground">
                      If provided, this will be used instead of the item name in the prompt
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="direct" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="directPrompt">Full Prompt *</Label>
                    <Textarea
                      id="directPrompt"
                      placeholder="Enter the complete prompt for image generation..."
                      value={directPrompt}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDirectPrompt(e.target.value)}
                      rows={6}
                    />
                    <p className="text-xs text-muted-foreground">
                      This prompt will be sent directly to the AI without any modifications
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Style Selection - Only show in Build mode */}
          {promptMode === "build" && (
            <Card>
              <CardHeader>
                <CardTitle>Style</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={styleMode} onValueChange={(v) => setStyleMode(v as "existing" | "custom")}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="existing">Existing Style</TabsTrigger>
                    <TabsTrigger value="custom">Custom Style</TabsTrigger>
                  </TabsList>

                  <TabsContent value="existing" className="mt-4">
                    <StyleSelector
                      styles={styles}
                      value={selectedStyle}
                      onChange={setSelectedStyle}
                    />
                  </TabsContent>

                  <TabsContent value="custom" className="mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="customStyle">Style JSON</Label>
                      <Textarea
                        id="customStyle"
                        value={customStyleJson}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCustomStyleJson(e.target.value)}
                        rows={12}
                        className="font-mono text-sm"
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}

          {/* Output Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Output Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="outputFilename">Filename (optional)</Label>
                <Input
                  id="outputFilename"
                  placeholder="e.g., my-custom-item"
                  value={outputFilename}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOutputFilename(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Saved to output/custom/. If empty, a timestamp will be used.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Generate Button */}
          <Button
            onClick={handleGenerate}
            disabled={!isValid || generating}
            className="w-full"
            size="lg"
          >
            {generating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Image
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
                  <p className="text-muted-foreground">Generating your image...</p>
                </div>
              ) : result ? (
                result.success && result.path ? (
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <div className="relative w-64 h-64 border rounded-lg overflow-hidden bg-muted/30">
                        <Image
                          src={`${result.path}?t=${Date.now()}`}
                          alt="Generated image"
                          fill
                          className="object-contain"
                          unoptimized
                        />
                      </div>
                    </div>
                    <div className="text-center text-sm text-muted-foreground">
                      Saved to: {result.path}
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-destructive/10 text-destructive rounded-lg">
                    <p className="font-medium">Generation Failed</p>
                    <p className="text-sm mt-1">{result.error}</p>
                  </div>
                )
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                  <Sparkles className="h-12 w-12 mb-4 opacity-20" />
                  <p>Your generated image will appear here</p>
                </div>
              )}
            </CardContent>
          </Card>

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
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
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
