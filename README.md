# Image Creation

Internal tool for generating game asset images (item icons, buildings, NPCs) with OpenAI's image API. It has a Next.js web UI for browsing the asset catalog and generating missing images, plus a small CLI for batch runs.

## Setup

1. Install dependencies (npm or bun both work):

   ```bash
   npm install
   ```

2. Create your env file from the template and add your OpenAI API key:

   ```bash
   cp .env.example .env
   ```

   Then open `.env` and set:

   ```
   OPENAI_API_KEY=sk-...
   ```

   Get a key at https://platform.openai.com/api-keys. The key needs access to the `gpt-image-1` model. `.env` is git-ignored and must never be committed.

3. Start the dev server:

   ```bash
   npm run dev
   ```

   Open http://localhost:3000.

## Using the web UI

| Page | What it does |
|------|--------------|
| `/` | Dashboard with per-category counts of generated vs. missing images |
| `/icons` | Browse all items by category, edit descriptions inline, generate single items or batches |
| `/npcs` | Same for NPC portraits |
| `/custom` | Free-form generation (name + description or raw prompt) into `output/custom/` |
| `/transform` | Upload an image and restyle or edit it into `output/transform/` |
| `/styles` | View and edit the style JSON files |

Typical flow on `/icons`:

1. Pick a category tab and a style from the dropdown (defaults to `crafts-v4-styles`).
2. Click **Generate** on a card, or toggle **Select**, tick several cards, and click **Generate Selected**.
3. Jobs run in the background (max 2 at a time) and show progress in the panel at the bottom right. You can keep navigating.
4. Generated images land in `output/` and appear on the card once done.

Editing a description on a card saves it to `data/overrides.json`, so the source definitions in `data/items.ts` stay untouched.

## Where things live

```
data/items.ts          item catalog (id, name, category, description, expectedPath)
data/npcs.ts           NPC catalog
data/overrides.json    user-edited descriptions (persisted separately)
*-styles.json          style presets used to build prompts (see below)
output/                every generated image, committed to git
lib/                   generation, prompt building, filesystem helpers
app/api/               Next.js route handlers (generate, assets, styles, image serving)
generate.js            CLI batch generator
```

### Output folder

`output/` is the **only** place images are read from or written to. Each item's `expectedPath` in `data/items.ts` is relative to `output/`, for example `crafts/onion_soup.webp` or `assets/images/icons/fish/salmon.webp`. The web app serves them via `/output/<path>`.

The folder is committed so a fresh clone already shows every previously generated image. When you generate new images, commit the new files in `output/` along with your changes.

### Styles

Style files are JSON documents at the repo root whose names contain `style`. They describe perspective, composition, lighting, textures, colors, background, and constraints, and are turned into a prompt by `lib/styles.ts`.

| File | Use for |
|------|---------|
| `crafts-v4-styles.json` | Default. Single-object item icons (crafts, crops, products, misc) |
| `buildings-v2-styles.json` | Buildings and larger structures |
| `hayday-styles.json` | Flat, toy-like casual style; also the current default for NPCs |

To add a style, copy one of these to a new `<name>-styles.json` file and it will show up in the style dropdowns automatically.

## CLI batch generation

For generating a plain list of names without the UI:

```bash
node generate.js --input names.txt --config crafts-v4-styles.json
```

`names.txt` is a comma-separated list of item names. Images are written to `./output` by default.

| Flag | Description | Default |
|------|-------------|---------|
| `-i, --input` | Text file with comma-separated names | (required) |
| `-c, --config` | Style JSON file | `crafts-v4-styles.json` |
| `-s, --size` | API size: `1024x1024`, `1024x1536`, `1536x1024` | `1024x1024` |
| `-r, --resize` | Resize output (e.g. `256x256`) | none |
| `-q, --quality` | `standard`, `hd` | `standard` |
| `-b, --background` | Override background (e.g. `transparent`) | from config |
| `-f, --format` | `png`, `jpg`, `webp` | `png` |
| `-o, --output` | Output directory | `./output` |
| `-m, --model` | `dall-e-2`, `dall-e-3`, `gpt-image-1` | `gpt-image-1` |

## Other commands

```bash
npm run build    # production build with type checking
npm run lint     # eslint
npm start        # serve the production build
```
