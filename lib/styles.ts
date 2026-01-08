import fs from "fs";
import path from "path";

const STYLES_DIR = process.cwd();

export interface StyleDefinition {
  icon_style: {
    perspective?: string;
    geometry?: {
      proportions?: string;
      element_arrangement?: string;
    };
    composition?: {
      element_count?: string;
      spatial_depth?: string;
      scale_consistency?: string;
      scene_density?: string;
      framing?: string;
    };
    lighting?: {
      type?: string;
      light_source?: string;
      shadow?: string;
      highlighting?: string;
    };
    textures?: {
      material_finish?: string;
      surface_treatment?: string;
      clothing_detail?: string;
    };
    render_quality?: {
      resolution?: string;
      edge_definition?: string;
      visual_clarity?: string;
    };
    color_palette?: {
      tone?: string;
      range?: string;
      usage?: string;
      skin_tones?: string;
    };
    background?: {
      color?: string;
      style?: string;
      texture?: string;
    };
    stylistic_tone?: string;
    character_rendering?: {
      facial_features?: string;
      skin_texture?: string;
      hair?: string;
      expression?: string;
    };
    constraints?: {
      avoid?: string[];
    };
    icon_behavior?: {
      branding_alignment?: string;
      scalability?: string;
      interchangeability?: string;
      personality?: string;
    };
  };
}

export function listStyleFiles(): string[] {
  const files = fs.readdirSync(STYLES_DIR);
  return files.filter(
    (file) =>
      file.endsWith(".json") &&
      (file.includes("style") || file.includes("Style"))
  );
}

export function loadStyleFile(filename: string): StyleDefinition | null {
  try {
    const filePath = path.join(STYLES_DIR, filename);
    const content = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error loading style file ${filename}:`, error);
    return null;
  }
}

export function saveStyleFile(
  filename: string,
  content: StyleDefinition
): boolean {
  try {
    const filePath = path.join(STYLES_DIR, filename);
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
    return true;
  } catch (error) {
    console.error(`Error saving style file ${filename}:`, error);
    return false;
  }
}

export function buildPrompt(
  styleConfig: StyleDefinition,
  name: string,
  description?: string
): string {
  const style = styleConfig.icon_style;
  const parts: string[] = [];

  // Use description if provided, otherwise use name
  if (description) {
    parts.push(description);
  } else {
    parts.push(`An icon for ${name}`);
  }

  // Perspective
  if (style.perspective) {
    parts.push(style.perspective);
  }

  // Stylistic tone
  if (style.stylistic_tone) {
    parts.push(style.stylistic_tone + " style");
  }

  // Composition
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

  // Geometry
  if (style.geometry) {
    if (style.geometry.proportions) {
      parts.push(style.geometry.proportions);
    }
    if (style.geometry.element_arrangement) {
      parts.push(style.geometry.element_arrangement);
    }
  }

  // Lighting
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

  // Character rendering (for NPCs)
  if (style.character_rendering) {
    if (style.character_rendering.facial_features) {
      parts.push(style.character_rendering.facial_features);
    }
    if (style.character_rendering.expression) {
      parts.push(style.character_rendering.expression);
    }
  }

  // Textures
  if (style.textures) {
    if (style.textures.material_finish) {
      parts.push(style.textures.material_finish);
    }
    if (style.textures.surface_treatment) {
      parts.push(style.textures.surface_treatment);
    }
  }

  // Render quality
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

  // Color palette
  if (style.color_palette) {
    if (style.color_palette.tone) {
      parts.push(`${style.color_palette.tone} tones`);
    }
    if (style.color_palette.range) {
      parts.push(style.color_palette.range);
    }
  }

  // Background
  const bgColor = style.background?.color;
  if (bgColor) {
    if (bgColor.toLowerCase() === "transparent") {
      parts.push("transparent background, no background");
    } else {
      parts.push(`${bgColor} background`);
    }
  }

  // Constraints - things to avoid
  if (style.constraints?.avoid && style.constraints.avoid.length > 0) {
    parts.push(`avoid: ${style.constraints.avoid.join(", ")}`);
  }

  return parts.join(", ");
}
