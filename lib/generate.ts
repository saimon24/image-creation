import OpenAI from "openai";
import sharp from "sharp";
import { loadStyleFile, buildPrompt } from "./styles";
import { saveImage } from "./filesystem";

const openai = new OpenAI();

export interface GenerateOptions {
  model?: string;
  size?: string;
  resize?: string;
  quality?: string;
  format?: string;
}

const DEFAULT_OPTIONS: GenerateOptions = {
  model: "gpt-image-1",
  size: "1024x1024",
  resize: "256x256",
  quality: "standard",
  format: "webp",
};

function parseSize(sizeStr: string): { width: number; height: number } {
  const [width, height] = sizeStr.split("x").map(Number);
  return { width, height };
}

async function resizeImage(
  buffer: Buffer,
  resize: string,
  format: string
): Promise<Buffer> {
  const { width, height } = parseSize(resize);

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

export async function generateImage(
  name: string,
  description: string | undefined,
  styleFile: string,
  outputPath: string,
  options: GenerateOptions = {}
): Promise<{ success: boolean; path?: string; error?: string; prompt?: string }> {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  // Load style configuration
  const styleConfig = loadStyleFile(styleFile);
  if (!styleConfig) {
    return { success: false, error: `Failed to load style file: ${styleFile}` };
  }

  // Build the prompt
  const prompt = buildPrompt(styleConfig, name, description);

  try {
    const requestParams: {
      model: string;
      prompt: string;
      n: number;
      size: "1024x1024" | "1024x1536" | "1536x1024";
      quality?: "standard" | "hd";
      output_format?: "webp" | "png" | "jpeg";
      background?: "transparent" | "opaque";
    } = {
      model: opts.model!,
      prompt: prompt,
      n: 1,
      size: opts.size as "1024x1024" | "1024x1536" | "1536x1024",
    };

    // Add quality parameter for DALL-E 3
    if (opts.model === "dall-e-3") {
      requestParams.quality = opts.quality as "standard" | "hd";
    }

    // For gpt-image-1, we can request specific output format and background
    if (opts.model === "gpt-image-1") {
      requestParams.output_format = opts.format as "webp" | "png" | "jpeg";

      const bgColor = styleConfig.icon_style?.background?.color;
      if (bgColor?.toLowerCase() === "transparent") {
        requestParams.background = "transparent";
      }
    }

    const response = await openai.images.generate(requestParams);

    const imageData = response.data?.[0];
    if (!imageData) {
      return { success: false, error: "No image data in response", prompt };
    }

    let buffer: Buffer;

    // Handle different response types
    if (imageData.b64_json) {
      buffer = Buffer.from(imageData.b64_json, "base64");
    } else if (imageData.url) {
      const imageResponse = await fetch(imageData.url);
      const arrayBuffer = await imageResponse.arrayBuffer();
      buffer = Buffer.from(arrayBuffer);
    } else {
      return { success: false, error: "No image data received", prompt };
    }

    // Resize if requested
    if (opts.resize) {
      buffer = await resizeImage(buffer, opts.resize, opts.format!);
    }

    // Save the image
    const savedPath = saveImage(outputPath, buffer);

    return { success: true, path: savedPath, prompt };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return { success: false, error: errorMessage, prompt };
  }
}
