import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  request: Request,
  { params }: { params: { path: string[] } }
) {
  const imagePath = params.path.join("/");
  const fullPath = path.join(process.cwd(), "output", imagePath);

  if (!fs.existsSync(fullPath)) {
    return new NextResponse("Image not found", { status: 404 });
  }

  const file = fs.readFileSync(fullPath);
  const ext = path.extname(fullPath).toLowerCase();

  const contentTypes: Record<string, string> = {
    ".webp": "image/webp",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
  };

  const contentType = contentTypes[ext] || "application/octet-stream";

  return new NextResponse(file, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
