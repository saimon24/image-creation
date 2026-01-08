# Image Generation Tool

Generate styled images using OpenAI's image generation API.

## Setup

1. Install dependencies:
   ```bash
   bun install
   ```

2. Add your OpenAI API key to `.env`:
   ```
   OPENAI_API_KEY=your-api-key-here
   ```

## Usage

```bash
bun run generate.js --input crops.txt
```

### Options

| Flag | Description | Default |
|------|-------------|---------|
| `-i, --input` | Text file with comma-separated names | (required) |
| `-c, --config` | Style JSON file | `style.json` |
| `-s, --size` | API size: `1024x1024`, `1024x1536`, `1536x1024` | `1024x1024` |
| `-r, --resize` | Resize output (e.g., `256x256`, `128x128`) | none |
| `-q, --quality` | `standard`, `hd` | `standard` |
| `-b, --background` | Override background (e.g., `transparent`, `white`) | from config |
| `-f, --format` | `png`, `jpg`, `webp` | `png` |
| `-o, --output` | Output directory | `./output` |
| `-m, --model` | `dall-e-2`, `dall-e-3`, `gpt-image-1` | `gpt-image-1` |

### Examples

```bash
# Basic usage
bun run generate.js -i crops.txt

# Generate and resize to 256x256
bun run generate.js -i crops.txt -r 256x256

# Small icons for game UI
bun run generate.js -i crops.txt -r 128x128 -f png

# High quality with specific size
bun run generate.js -i crops.txt -q hd -r 512x512
```

## Files

- `crops.txt` - Comma-separated list of items to generate
- `style.json` - Style definition for image generation
- `.env` - API key (not committed to git)
