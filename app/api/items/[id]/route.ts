import { NextResponse } from "next/server";
import { updateDescriptionOverride, getDescription } from "@/lib/filesystem";
import { getItemById } from "@/data/items";
import { getNPCById } from "@/data/npcs";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { description, type } = body as {
      description: string;
      type: "icon" | "npc";
    };

    if (!description || !type) {
      return NextResponse.json(
        { error: "Missing description or type" },
        { status: 400 }
      );
    }

    // Verify the item/npc exists
    if (type === "npc") {
      const npc = getNPCById(id);
      if (!npc) {
        return NextResponse.json({ error: "NPC not found" }, { status: 404 });
      }
    } else {
      const item = getItemById(id);
      if (!item) {
        return NextResponse.json({ error: "Item not found" }, { status: 404 });
      }
    }

    // Update the override
    updateDescriptionOverride(id, description, type);

    return NextResponse.json({ success: true, description });
  } catch (error) {
    console.error("Error updating description:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") as "icon" | "npc" | null;

    if (!type) {
      return NextResponse.json(
        { error: "Missing type parameter" },
        { status: 400 }
      );
    }

    let originalDescription: string | undefined;

    if (type === "npc") {
      const npc = getNPCById(id);
      if (!npc) {
        return NextResponse.json({ error: "NPC not found" }, { status: 404 });
      }
      originalDescription = npc.description;
    } else {
      const item = getItemById(id);
      if (!item) {
        return NextResponse.json({ error: "Item not found" }, { status: 404 });
      }
      originalDescription = item.description;
    }

    const description = getDescription(id, originalDescription, type);

    return NextResponse.json({ id, description, type });
  } catch (error) {
    console.error("Error getting description:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
