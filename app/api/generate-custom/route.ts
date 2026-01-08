import { NextResponse } from "next/server";
import OpenAI from "openai";
import sharp from "sharp";
import { loadStyleFile, buildPrompt, StyleDefinition } from "@/lib/styles";
import { ensureOutputDirs, saveImage } from "@/lib/filesystem";

const openai = new OpenAI();

interface CustomGenerateRequest {
  name: string;
  description?: string;
  prompt?: string; // Direct prompt (overrides name/description + style)
  styleFile?: string; // Existing style file
  customStyle?: StyleDefinition; // Custom style JSON
  outputFilename?: string; // Optional custom output filename
}

async function resizeImage(
  buffer: Buffer,
  resize: string,
  format: string
): Promise<Buffer> {
  const [width, height] = resize.split("x").map(Number);

  let sharpInstance = sharp(buffer).resize(width, height, {
    fit: "contain",
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  });

  if (format === "png") {
    sharpInstance = sharpInstance.png();
  } else if (format === "jpg" || format === "jpeg") {
    sharpInstance = sharpInstance.jpeg();
  } else if (format === "webp") {
    sharpInstance = sharpInstance.webp();
  }

  return sharpInstance.toBuffer();
}

export async function POST(request: Request) {
  try {
    const body: CustomGenerateRequest = await request.json();
    const { name, description, prompt: directPrompt, styleFile, customStyle, outputFilename } = body;

    if (!name && !directPrompt) {
      return NextResponse.json(
        { error: "Either name or direct prompt is required" },
        { status: 400 }
      );
    }

    ensureOutputDirs();

    let finalPrompt: string;

    if (directPrompt) {
      // Use direct prompt as-is
      finalPrompt = directPrompt;
    } else {
      // Build prompt from name/description + style
      let styleConfig: StyleDefinition | null = null;

      if (customStyle) {
        styleConfig = customStyle;
      } else if (styleFile) {
        styleConfig = loadStyleFile(styleFile);
      }

      if (!styleConfig) {
        return NextResponse.json(
          { error: "Either styleFile or customStyle is required when not using direct prompt" },
          { status: 400 }
        );
      }

      finalPrompt = buildPrompt(styleConfig, name, description);
    }

    const response = await openai.images.generate({
      model: "gpt-image-1",
      prompt: finalPrompt,
      n: 1,
      size: "1024x1024",
      output_format: "webp",
      background: "transparent",
    });

    const imageData = response.data?.[0];
    if (!imageData) {
      return NextResponse.json(
        { error: "No image data in response", prompt: finalPrompt },
        { status: 500 }
      );
    }

    let buffer: Buffer;

    if (imageData.b64_json) {
      buffer = Buffer.from(imageData.b64_json, "base64");
    } else if (imageData.url) {
      const imageResponse = await fetch(imageData.url);
      const arrayBuffer = await imageResponse.arrayBuffer();
      buffer = Buffer.from(arrayBuffer);
    } else {
      return NextResponse.json(
        { error: "No image data received", prompt: finalPrompt },
        { status: 500 }
      );
    }

    // Resize to 256x256
    buffer = await resizeImage(buffer, "256x256", "webp");

    // Save the image
    const filename = outputFilename || `custom-${Date.now()}`;
    const sanitizedFilename = filename.replace(/[^a-zA-Z0-9-_]/g, "_");
    const outputPath = `custom/${sanitizedFilename}.webp`;

    const savedPath = saveImage(outputPath, buffer);

    return NextResponse.json({
      success: true,
      path: savedPath,
      prompt: finalPrompt,
    });
  } catch (error) {
    console.error("Custom generate error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
