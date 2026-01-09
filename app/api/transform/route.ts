import { NextResponse } from "next/server";
import OpenAI from "openai";
import sharp from "sharp";
import { loadStyleFile, StyleDefinition } from "@/lib/styles";
import { ensureOutputDirs, saveImage } from "@/lib/filesystem";

const openai = new OpenAI();

function getMimeType(format: string): string {
  const mimeTypes: Record<string, string> = {
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    webp: "image/webp",
    gif: "image/gif",
  };
  return mimeTypes[format.toLowerCase()] || "image/png";
}

function buildTransformPrompt(
  analysis: string,
  styleConfig: StyleDefinition
): string {
  const style = styleConfig.icon_style;
  const parts: string[] = [];

  // Start with the analyzed description
  parts.push(analysis);

  // Add style elements (same pattern as buildPrompt in lib/styles.ts)
  if (style.perspective) {
    parts.push(style.perspective);
  }

  if (style.stylistic_tone) {
    parts.push(style.stylistic_tone + " style");
  }

  if (style.composition) {
    if (style.composition.element_count) {
      parts.push(style.composition.element_count);
    }
    if (style.composition.scene_density) {
      parts.push(style.composition.scene_density);
    }
    if (style.composition.framing) {
      parts.push(style.composition.framing);
    }
  }

  if (style.geometry) {
    if (style.geometry.proportions) {
      parts.push(style.geometry.proportions);
    }
    if (style.geometry.element_arrangement) {
      parts.push(style.geometry.element_arrangement);
    }
  }

  if (style.lighting) {
    if (style.lighting.type) {
      parts.push(style.lighting.type);
    }
    if (style.lighting.light_source) {
      parts.push(`light from ${style.lighting.light_source}`);
    }
    if (style.lighting.shadow) {
      parts.push(style.lighting.shadow);
    }
    if (style.lighting.highlighting) {
      parts.push(style.lighting.highlighting);
    }
  }

  if (style.character_rendering) {
    if (style.character_rendering.facial_features) {
      parts.push(style.character_rendering.facial_features);
    }
    if (style.character_rendering.expression) {
      parts.push(style.character_rendering.expression);
    }
  }

  if (style.textures) {
    if (style.textures.material_finish) {
      parts.push(style.textures.material_finish);
    }
    if (style.textures.surface_treatment) {
      parts.push(style.textures.surface_treatment);
    }
  }

  if (style.render_quality) {
    if (style.render_quality.resolution) {
      parts.push(style.render_quality.resolution);
    }
    if (style.render_quality.edge_definition) {
      parts.push(style.render_quality.edge_definition);
    }
    if (style.render_quality.visual_clarity) {
      parts.push(style.render_quality.visual_clarity);
    }
  }

  if (style.color_palette) {
    if (style.color_palette.tone) {
      parts.push(`${style.color_palette.tone} tones`);
    }
    if (style.color_palette.range) {
      parts.push(style.color_palette.range);
    }
  }

  const bgColor = style.background?.color;
  if (bgColor) {
    if (bgColor.toLowerCase() === "transparent") {
      parts.push("transparent background, no background");
    } else {
      parts.push(`${bgColor} background`);
    }
  }

  if (style.constraints?.avoid && style.constraints.avoid.length > 0) {
    parts.push(`avoid: ${style.constraints.avoid.join(", ")}`);
  }

  return parts.join(", ");
}

async function resizeImage(
  buffer: Buffer,
  width: number,
  height: number,
  format: string
): Promise<Buffer> {
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
    const formData = await request.formData();
    const imageFile = formData.get("image") as File | null;
    const styleFile = formData.get("styleFile") as string;
    const outputFormat = formData.get("format") as string | null;
    const matchOriginalSize = formData.get("matchOriginalSize") !== "false";

    if (!imageFile) {
      return NextResponse.json(
        { error: "No image file provided" },
        { status: 400 }
      );
    }

    if (!styleFile) {
      return NextResponse.json(
        { error: "No style file specified" },
        { status: 400 }
      );
    }

    ensureOutputDirs();

    // Get image buffer and metadata
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const metadata = await sharp(buffer).metadata();

    const originalWidth = metadata.width || 256;
    const originalHeight = metadata.height || 256;
    const originalFormat = metadata.format || "png";

    // Determine output format
    const finalFormat = outputFormat || originalFormat;
    const mimeType = getMimeType(originalFormat);

    // Step 1: Analyze the image with GPT-4o Vision
    const base64Image = buffer.toString("base64");
    const analysisResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Describe this image in detail for recreation as a game asset. Include:
- Main subject/objects and their arrangement
- Colors and color relationships
- Composition and framing
- Notable details, textures, materials
- Mood/atmosphere

Be specific but concise. Focus on visual elements that should be preserved in a stylized recreation. Do not mention the image format, resolution, or any technical details. Write as a direct description that can be used as an image generation prompt.`,
            },
            {
              type: "image_url",
              image_url: {
                url: `data:${mimeType};base64,${base64Image}`,
              },
            },
          ],
        },
      ],
      max_tokens: 500,
    });

    const analysis =
      analysisResponse.choices[0]?.message?.content ||
      "An image to be recreated";

    // Step 2: Load style and build prompt
    const styleConfig = loadStyleFile(styleFile);
    if (!styleConfig) {
      return NextResponse.json(
        { error: `Failed to load style file: ${styleFile}` },
        { status: 400 }
      );
    }

    const finalPrompt = buildTransformPrompt(analysis, styleConfig);

    // Step 3: Generate new image with gpt-image-1
    const apiFormat = finalFormat === "jpg" ? "jpeg" : finalFormat;
    const response = await openai.images.generate({
      model: "gpt-image-1",
      prompt: finalPrompt,
      n: 1,
      size: "1024x1024",
      output_format: apiFormat as "webp" | "png" | "jpeg",
      background: finalFormat === "jpg" ? "opaque" : "transparent",
    });

    const imageData = response.data?.[0];
    if (!imageData) {
      return NextResponse.json(
        { error: "No image data in response", prompt: finalPrompt, analysis },
        { status: 500 }
      );
    }

    let generatedBuffer: Buffer;

    if (imageData.b64_json) {
      generatedBuffer = Buffer.from(imageData.b64_json, "base64");
    } else if (imageData.url) {
      const imageResponse = await fetch(imageData.url);
      const imageArrayBuffer = await imageResponse.arrayBuffer();
      generatedBuffer = Buffer.from(imageArrayBuffer);
    } else {
      return NextResponse.json(
        { error: "No image data received", prompt: finalPrompt, analysis },
        { status: 500 }
      );
    }

    // Step 4: Resize to match original dimensions if requested
    let finalBuffer = generatedBuffer;
    let finalWidth = 1024;
    let finalHeight = 1024;

    if (matchOriginalSize) {
      finalBuffer = await resizeImage(
        generatedBuffer,
        originalWidth,
        originalHeight,
        finalFormat
      );
      finalWidth = originalWidth;
      finalHeight = originalHeight;
    }

    // Step 5: Save the image
    const filename = `transform-${Date.now()}.${finalFormat}`;
    const outputPath = `transform/${filename}`;
    const savedPath = saveImage(outputPath, finalBuffer);

    return NextResponse.json({
      success: true,
      path: savedPath,
      prompt: finalPrompt,
      analysis,
      originalDimensions: { width: originalWidth, height: originalHeight },
      outputDimensions: { width: finalWidth, height: finalHeight },
      format: finalFormat,
    });
  } catch (error) {
    console.error("Transform error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
