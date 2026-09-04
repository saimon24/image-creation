# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev      # Start dev server (port 3000, or next available)
npm run build    # Production build with TypeScript checking
npm run lint     # ESLint via Next.js
npm start        # Serve production build
```

CLI-based batch generation (alternative to web UI):
```bash
node generate.js --input names.txt --config crafts-v4-styles.json
```

## Environment Setup

Requires `OPENAI_API_KEY` in `.env` (copy `.env.example`). `.env` is git-ignored.

## Architecture Overview

This is a Next.js 14 App Router application for generating game assets using OpenAI's image generation API.

### Data Flow

1. **Static Data** (`data/items.ts`, `data/npcs.ts`) - 250+ item definitions and 17 NPCs with descriptions
2. **Style Configs** (root `*-styles.json` files) - AI prompt templates. Only three are kept: `crafts-v4-styles.json` (default for items), `buildings-v2-styles.json`, `hayday-styles.json` (default for NPCs)
3. **Description Overrides** (`data/overrides.json`) - User-edited descriptions persisted separately from source
4. **Generated Images** (`output/`) - the single source of images, committed to git. Every `expectedPath` is relative to `output/` (including the `assets/images/...` paths). Never read or write images anywhere else.

### Generation System

- **GenerationContext** (`contexts/generation-context.tsx`) - Global React context managing job queue
- Max 2 concurrent generations to avoid API rate limits
- Jobs survive page navigation; panel shows progress in bottom-right
- Flow: UI → context queue → POST `/api/generate` → OpenAI → Sharp resize → save to `/output/`

### Key API Routes

- `GET /api/assets` - List assets with image status, merges description overrides
- `POST /api/generate` - Generate single image with style config
- `PATCH /api/items/[id]` - Update description override
- `GET /api/styles` - List available style JSON files

### UI Pages

- `/` - Dashboard with category stats
- `/icons` - Browse/generate items with category tabs, search, selection mode
- `/npcs` - Browse/generate characters
- `/styles` - View/manage style configurations

### Selection Mode

Both `/icons` and `/npcs` support batch generation:
- Toggle "Select" mode to show checkboxes
- Select individual items or "Select All"
- "Generate Selected" queues all selected items

### Image Serving

Images served via rewrite: `/output/:path*` → `/api/image/:path*` (handles proper MIME types and caching).

## Code Patterns

- UI components use shadcn/ui (Radix primitives + Tailwind)
- Client components wrapped in Suspense for `useSearchParams()`
- Asset cards handle both selection mode and inline description editing
- Style JSON files define prompt structure: perspective, tone, composition, lighting, textures, colors, constraints
