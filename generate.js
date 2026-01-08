import 'dotenv/config';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import { parseArgs } from 'util';
import sharp from 'sharp';

// Parse command line arguments
const { values } = parseArgs({
  options: {
    input: {
      type: 'string',
      short: 'i',
      description: 'Path to text file with comma-separated names',
    },
    config: {
      type: 'string',
      short: 'c',
      default: 'style.json',
      description: 'Path to JSON style definition file',
    },
    size: {
      type: 'string',
      short: 's',
      default: '1024x1024',
      description: 'API image size (1024x1024, 1024x1536, 1536x1024)',
    },
    resize: {
      type: 'string',
      short: 'r',
      default: '',
      description: 'Resize output to this size (e.g., 256x256, 512x512)',
    },
    quality: {
      type: 'string',
      short: 'q',
      default: 'standard',
      description: 'Image quality (standard, hd)',
    },
    background: {
      type: 'string',
      short: 'b',
      default: '',
      description: 'Background color or transparent',
    },
    format: {
      type: 'string',
      short: 'f',
      default: 'png',
      description: 'Output format (png, jpg, webp)',
    },
    output: {
      type: 'string',
      short: 'o',
      default: './output',
      description: 'Output directory',
    },
    model: {
      type: 'string',
      short: 'm',
      default: 'gpt-image-1',
      description: 'OpenAI model (dall-e-2, dall-e-3, gpt-image-1)',
    },
    help: {
      type: 'boolean',
      short: 'h',
      default: false,
    },
  },
});

function printHelp() {
  console.log(`
Image Generation Tool
=====================

Usage: bun run generate.js --input names.txt [options]

Options:
  -i, --input       Path to text file with comma-separated names (required)
  -c, --config      Path to JSON style definition file (default: style.json)
  -s, --size        API size: 1024x1024, 1024x1536, 1536x1024 (default: 1024x1024)
  -r, --resize      Resize output to this size (e.g., 256x256, 128x128)
  -q, --quality     Image quality: standard, hd (default: standard)
  -b, --background  Background color (e.g., "white", "transparent")
  -f, --format      Output format: png, jpg, webp (default: png)
  -o, --output      Output directory (default: ./output)
  -m, --model       OpenAI model: dall-e-2, dall-e-3, gpt-image-1 (default: gpt-image-1)
  -h, --help        Show this help message

Examples:
  bun run generate.js --input crops.txt
  bun run generate.js -i crops.txt -r 256x256
  bun run generate.js -i crops.txt -s 1024x1024 -r 128x128 -f png
`);
}

if (values.help) {
  printHelp();
  process.exit(0);
}

if (!values.input) {
  console.error('Error: --input is required');
  printHelp();
  process.exit(1);
}

// Check for API key
if (!process.env.OPENAI_API_KEY) {
  console.error('Error: OPENAI_API_KEY environment variable is not set');
  process.exit(1);
}

// Initialize OpenAI client
const openai = new OpenAI();

// Load names from text file
function loadNames(inputPath) {
  try {
    const content = fs.readFileSync(inputPath, 'utf-8');
    return content
      .split(',')
      .map((n) => n.trim())
      .filter(Boolean);
  } catch (error) {
    console.error(`Error loading input file: ${error.message}`);
    process.exit(1);
  }
}

// Load style definition
function loadStyleDefinition(configPath) {
  try {
    const configFile = fs.readFileSync(configPath, 'utf-8');
    return JSON.parse(configFile);
  } catch (error) {
    console.error(`Error loading config file: ${error.message}`);
    process.exit(1);
  }
}

// Parse size string to width and height
function parseSize(sizeStr) {
  const [width, height] = sizeStr.split('x').map(Number);
  return { width, height };
}

// Build prompt from style.json format
function buildPrompt(styleConfig, name, backgroundOverride) {
  const style = styleConfig.icon_style;
  const parts = [];

  // Main subject
  // parts.push(`A ${name} icon`);
  parts.push(`An icon for ${name}`);

  // Perspective
  if (style.perspective) {
    parts.push(style.perspective);
  }

  // Stylistic tone
  if (style.stylistic_tone) {
    parts.push(style.stylistic_tone + ' style');
  }

  // Composition
  if (style.composition) {
    if (style.composition.element_count) {
      parts.push(style.composition.element_count);
    }
    if (style.composition.scene_density) {
      parts.push(style.composition.scene_density);
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

  // Background (CLI override takes precedence)
  const bgColor = backgroundOverride || style.background?.color;
  if (bgColor) {
    if (bgColor.toLowerCase() === 'transparent') {
      parts.push('transparent background, no background');
    } else {
      parts.push(`${bgColor} background`);
    }
  }

  // Constraints - things to avoid
  if (style.constraints?.avoid && style.constraints.avoid.length > 0) {
    parts.push(`avoid: ${style.constraints.avoid.join(', ')}`);
  }

  return parts.join(', ');
}

// Resize image buffer using sharp
async function resizeImage(buffer, resize, format) {
  const { width, height } = parseSize(resize);

  let sharpInstance = sharp(buffer).resize(width, height, {
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  });

  // Apply format-specific options
  if (format === 'png') {
    sharpInstance = sharpInstance.png();
  } else if (format === 'jpg' || format === 'jpeg') {
    sharpInstance = sharpInstance.jpeg();
  } else if (format === 'webp') {
    sharpInstance = sharpInstance.webp();
  }

  return sharpInstance.toBuffer();
}

// Generate image for a single name
async function generateImage(name, styleConfig, options) {
  const prompt = buildPrompt(styleConfig, name, options.background);
  console.log(`\nGenerating image for: ${name}`);
  console.log(`Prompt: ${prompt}`);

  try {
    const requestParams = {
      model: options.model,
      prompt: prompt,
      n: 1,
      size: options.size,
    };

    // Add quality parameter for DALL-E 3
    if (options.model === 'dall-e-3') {
      requestParams.quality = options.quality;
    }

    // For gpt-image-1, we can request specific output format and background
    if (options.model === 'gpt-image-1') {
      requestParams.output_format = options.format;

      // Determine background setting
      const bgColor = options.background || styleConfig.icon_style?.background?.color;
      if (bgColor?.toLowerCase() === 'transparent') {
        requestParams.background = 'transparent';
      }
    }

    const response = await openai.images.generate(requestParams);

    const imageData = response.data[0];
    let buffer;

    // Handle different response types
    if (imageData.b64_json) {
      buffer = Buffer.from(imageData.b64_json, 'base64');
    } else if (imageData.url) {
      const imageResponse = await fetch(imageData.url);
      const arrayBuffer = await imageResponse.arrayBuffer();
      buffer = Buffer.from(arrayBuffer);
    }

    if (!buffer) {
      throw new Error('No image data received');
    }

    // Resize if requested
    if (options.resize) {
      console.log(`Resizing to: ${options.resize}`);
      buffer = await resizeImage(buffer, options.resize, options.format);
    }

    const filename = `${sanitizeFilename(name)}.${options.format}`;
    const outputPath = path.join(options.output, filename);
    fs.writeFileSync(outputPath, buffer);
    console.log(`Saved: ${outputPath}`);
    return outputPath;
  } catch (error) {
    console.error(`Error generating image for ${name}: ${error.message}`);
    return null;
  }
}

// Sanitize filename
function sanitizeFilename(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
}

// Main execution
async function main() {
  const names = loadNames(values.input);
  const styleConfig = loadStyleDefinition(values.config);

  // Ensure output directory exists
  if (!fs.existsSync(values.output)) {
    fs.mkdirSync(values.output, { recursive: true });
  }

  // Determine effective background
  const effectiveBg = values.background || styleConfig.icon_style?.background?.color || 'default';

  console.log(`Processing ${names.length} name(s) from: ${values.input}`);
  console.log(`Style config: ${values.config}`);
  console.log(`Model: ${values.model}`);
  console.log(`API Size: ${values.size}`);
  if (values.resize) {
    console.log(`Resize to: ${values.resize}`);
  }
  console.log(`Quality: ${values.quality}`);
  console.log(`Background: ${effectiveBg}`);
  console.log(`Format: ${values.format}`);
  console.log(`Output: ${values.output}`);

  const results = [];
  for (const name of names) {
    const result = await generateImage(name, styleConfig, {
      size: values.size,
      resize: values.resize,
      quality: values.quality,
      background: values.background,
      format: values.format,
      output: values.output,
      model: values.model,
    });
    results.push({ name, path: result, success: !!result });
  }

  // Summary
  console.log('\n--- Summary ---');
  const successful = results.filter((r) => r.success).length;
  console.log(`Generated: ${successful}/${names.length} images`);

  if (successful < names.length) {
    const failed = results.filter((r) => !r.success).map((r) => r.name);
    console.log(`Failed: ${failed.join(', ')}`);
  }
}

main().catch(console.error);
