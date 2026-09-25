import { NextResponse } from "next/server";
import OpenAI, { toFile } from "openai";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import { ensureOutputDirs, saveImage } from "@/lib/filesystem";

const openai = new OpenAI();

/**
 * Edit/recreate from reference images in output/ (keeps a character's or a design's
 * look far better than describing it in text). gpt-image-2 rejects input_fidelity.
 */
interface ReferenceEditRequest {
  references: string[]; // paths relative to output/, max 3
  prompt: string;
  outputFilename: string;
  format?: "webp" | "png" | "jpg";
  model?: string;
  quality?: "low" | "medium" | "high" | "auto";
  size?: "1024x1024" | "1024x1536" | "1536x1024";
  background?: "transparent" | "opaque";
  resize?: string; // e.g. "1024x1536"; defaults to size
}

export async function POST(request: Request) {
  try {
    const body: ReferenceEditRequest = await request.json();
    const {
      references,
      prompt,
      outputFilename,
      format = "png",
      model = "gpt-image-2",
      quality = "high",
      size = "1024x1536",
      background,
      resize,
    } = body;
    if (!references?.length || !prompt || !outputFilename) {
      return NextResponse.json({ error: "references, prompt and outputFilename are required" }, { status: 400 });
    }
    ensureOutputDirs();
    const outputRoot = path.join(process.cwd(), "output");
    const images = await Promise.all(
      references.slice(0, 3).map(async (ref) => {
        const abs = path.join(outputRoot, ref.replace(/^\/?output\//, ""));
        if (!abs.startsWith(outputRoot) || !fs.existsSync(abs)) throw new Error(`Reference not found: ${ref}`);
        const png = await sharp(abs).png().toBuffer();
        return toFile(png, path.basename(abs).replace(/\.[a-z]+$/i, ".png"), { type: "image/png" });
      }),
    );
    const apiFormat = format === "jpg" ? "jpeg" : format;
    const response = await openai.images.edit({
      model,
      image: images,
      prompt,
      size,
      quality,
      output_format: apiFormat as "webp" | "png" | "jpeg",
      ...(background ? { background } : format === "jpg" ? { background: "opaque" as const } : {}),
    } as Parameters<typeof openai.images.edit>[0]);
    const b64 = response.data?.[0]?.b64_json;
    if (!b64) return NextResponse.json({ error: "No image data in response" }, { status: 500 });
    let buffer: Buffer = Buffer.from(b64, "base64");
    const [w, h] = (resize ?? size).split("x").map(Number);
    let img = sharp(buffer).resize(w, h, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } });
    img = format === "jpg" ? img.jpeg({ quality: 92 }) : format === "webp" ? img.webp({ quality: 92 }) : img.png();
    buffer = await img.toBuffer();
    const safe = outputFilename.replace(/[^a-zA-Z0-9-_]/g, "_");
    const savedPath = saveImage(`custom/${safe}.${format}`, buffer);
    return NextResponse.json({ success: true, path: savedPath });
  } catch (error) {
    console.error("reference-edit failed:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}
