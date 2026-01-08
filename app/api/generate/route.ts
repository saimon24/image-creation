import { NextResponse } from "next/server";
import { generateImage, GenerateOptions } from "@/lib/generate";
import { getItemById } from "@/data/items";
import { getNPCById } from "@/data/npcs";
import { ensureOutputDirs, getDescription } from "@/lib/filesystem";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { itemId, type, styleFile, options } = body as {
      itemId: string;
      type: "icon" | "npc";
      styleFile: string;
      options?: GenerateOptions;
    };

    if (!itemId || !styleFile) {
      return NextResponse.json(
        { error: "Missing itemId or styleFile" },
        { status: 400 }
      );
    }

    // Ensure output directories exist
    ensureOutputDirs();

    let name: string;
    let originalDescription: string | undefined;
    let outputPath: string;

    if (type === "npc") {
      const npc = getNPCById(itemId);
      if (!npc) {
        return NextResponse.json({ error: "NPC not found" }, { status: 404 });
      }
      name = npc.name;
      originalDescription = npc.description;
      outputPath = npc.expectedPath;
    } else {
      const item = getItemById(itemId);
      if (!item) {
        return NextResponse.json({ error: "Item not found" }, { status: 404 });
      }
      name = item.name;
      originalDescription = item.description;
      outputPath = item.expectedPath;
    }

    // Get the description with any overrides applied
    const description = getDescription(itemId, originalDescription, type);

    const result = await generateImage(
      name,
      description,
      styleFile,
      outputPath,
      options
    );

    if (result.success) {
      return NextResponse.json({
        success: true,
        path: result.path,
        prompt: result.prompt,
      });
    } else {
      return NextResponse.json(
        { error: result.error, prompt: result.prompt },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Generate error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
