"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Palette, Check, Copy } from "lucide-react";

interface StyleFile {
  filename: string;
  name: string;
  content: {
    icon_style: Record<string, unknown>;
  };
}

export default function StylesPage() {
  const [styles, setStyles] = useState<StyleFile[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<StyleFile | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchStyles() {
      try {
        const res = await fetch("/api/styles");
        const data = await res.json();
        setStyles(data);
        if (data.length > 0) {
          setSelectedStyle(data[0]);
        }
      } catch (error) {
        console.error("Failed to fetch styles:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStyles();
  }, []);

  const handleCopyJson = () => {
    if (selectedStyle) {
      navigator.clipboard.writeText(
        JSON.stringify(selectedStyle.content, null, 2)
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Styles</h1>
        <p className="text-muted-foreground">
          Manage style definitions for image generation
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Style List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Available Styles</h2>
          <div className="space-y-2">
            {styles.map((style) => (
              <Card
                key={style.filename}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedStyle?.filename === style.filename
                    ? "ring-2 ring-primary"
                    : ""
                }`}
                onClick={() => setSelectedStyle(style)}
              >
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Palette className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{style.name}</h3>
                    <p className="text-sm text-muted-foreground truncate">
                      {style.filename}
                    </p>
                  </div>
                  {selectedStyle?.filename === style.filename && (
                    <Check className="h-5 w-5 text-primary" />
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Style Preview */}
        <div className="md:col-span-2">
          {selectedStyle ? (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{selectedStyle.name}</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyJson}
                  className="gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy JSON
                    </>
                  )}
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Quick Info */}
                  <div className="flex flex-wrap gap-2">
                    {selectedStyle.content.icon_style.perspective != null && (
                      <Badge variant="outline">
                        {String(selectedStyle.content.icon_style.perspective)}
                      </Badge>
                    )}
                    {selectedStyle.content.icon_style.stylistic_tone != null && (
                      <Badge variant="secondary">
                        {String(selectedStyle.content.icon_style.stylistic_tone)}
                      </Badge>
                    )}
                  </div>

                  {/* JSON Preview */}
                  <ScrollArea className="h-[500px] rounded-md border p-4">
                    <pre className="text-sm font-mono">
                      {JSON.stringify(selectedStyle.content, null, 2)}
                    </pre>
                  </ScrollArea>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
              Select a style to preview
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
