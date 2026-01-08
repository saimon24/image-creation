import { NextResponse } from "next/server";
import { listStyleFiles, loadStyleFile, saveStyleFile } from "@/lib/styles";

export async function GET() {
  const files = listStyleFiles();
  const styles = files.map((filename) => {
    const content = loadStyleFile(filename);
    return {
      filename,
      name: filename.replace(".json", "").replace(/_/g, " "),
      content,
    };
  });

  return NextResponse.json(styles);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { filename, content } = body;

    if (!filename || !content) {
      return NextResponse.json(
        { error: "Missing filename or content" },
        { status: 400 }
      );
    }

    const success = saveStyleFile(filename, content);

    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: "Failed to save style file" },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
