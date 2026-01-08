# Image Generation Dashboard - Implementation Plan

## Overview

Build a Next.js 14 app (App Router) to visually browse, manage, and generate game assets using OpenAI's image generation API. The app reads directly from the filesystem with no database required.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **Image Generation**: OpenAI API (gpt-image-1, DALL-E 3)
- **Image Processing**: sharp (already installed)
- **Runtime**: Node.js (for filesystem access in API routes)

## Directory Structure

```
image-creation/
├── app/                          # Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx                  # Dashboard home
│   ├── globals.css
│   ├── icons/
│   │   └── page.tsx              # Icon gallery & generation
│   ├── npcs/
│   │   └── page.tsx              # NPC gallery & generation
│   ├── styles/
│   │   └── page.tsx              # Style file manager
│   └── api/
│       ├── assets/
│       │   └── route.ts          # GET: list assets from filesystem
│       ├── generate/
│       │   └── route.ts          # POST: generate single image
│       ├── styles/
│       │   └── route.ts          # GET/POST: manage style files
│       └── items/
│           └── route.ts          # GET: item definitions from audit
├── components/
│   ├── ui/                       # shadcn components
│   ├── asset-card.tsx            # Image card with regenerate button
│   ├── asset-grid.tsx            # Grid layout for assets
│   ├── category-tabs.tsx         # Tab navigation by category
│   ├── generation-dialog.tsx     # Modal for generation options
│   ├── style-selector.tsx        # Dropdown to pick style file
│   ├── item-picker.tsx           # Select items to generate
│   └── nav.tsx                   # Top navigation
├── lib/
│   ├── generate.ts               # Image generation logic (from generate.js)
│   ├── filesystem.ts             # Read/scan output folders
│   ├── items.ts                  # Parse item-image-audit.ts data
│   ├── styles.ts                 # Load style JSON files
│   └── utils.ts                  # Shared utilities
├── output/                       # Generated images (created on first run)
│   ├── crops/
│   ├── crafts/
│   ├── area-items/
│   ├── buildings/
│   ├── animals/
│   └── npcs/
├── styles/                       # Style definition files (existing)
│   ├── style.json                # (move existing)
│   ├── npc-style.json            # (move existing)
│   ├── orig_styles.json          # (move existing)
│   └── rare-style.json           # (move existing)
└── data/
    ├── icons.ts                  # Icon definitions extracted from audit
    └── npcs.ts                   # NPC definitions extracted from list
```

## Asset Categories

Based on `item-image-audit.ts`, assets are grouped into:

### Icons
| Category | Subfolder | Count |
|----------|-----------|-------|
| Crops | `crops/` | ~35 items |
| Area Items | `area-items/` | ~13 items |
| Crafts - Feed Mill | `crafts/` | 8 items |
| Crafts - Mill | `crafts/` | 5 items |
| Crafts - Bakery | `crafts/` | 11 items |
| Crafts - Kitchen | `crafts/` | 6 items |
| Crafts - Breakfast | `crafts/` | 7 items |
| Crafts - Dairy | `crafts/` | 12 items |
| Crafts - Smoker | `crafts/` | 4 items |
| Crafts - Spinning | `crafts/` | 8 items |
| Crafts - Other | `crafts/` | ~40 items |
| Buildings | `buildings/` | 20 items |
| Animals | `animals/` | 7 items |

### NPCs
| Name | Description |
|------|-------------|
| Sage, Emma, Liam, Helena... | 17 characters |

## Core Features

### 1. Asset Gallery (Home Page)
- Grid view of all generated assets
- Filter by category (tabs)
- Search by name
- Click to view full size
- Shows "missing" state for ungenerated items

### 2. Single Asset Card
- Thumbnail preview
- Asset name
- Category badge
- "Regenerate" button
- "View Original" link
- Generation status indicator

### 3. Batch Generation
- Select multiple items from a category
- Choose style file
- Set generation options (size, quality, format)
- Progress indicator
- Queue management

### 4. Style Manager
- List all style JSON files
- Preview style settings
- Create/duplicate styles
- Edit style properties (JSON editor)
- Set default style per category

### 5. Item Picker
- Searchable list of all items
- Checkbox multi-select
- Filter by "has image" / "missing image"
- Group by category

## API Routes

### `GET /api/assets`
Returns list of assets with their status.
```ts
interface Asset {
  id: string;           // e.g., "wheat"
  name: string;         // e.g., "Wheat"
  category: string;     // e.g., "crops"
  subcategory?: string; // e.g., "Feed Mill"
  hasImage: boolean;
  imagePath?: string;   // e.g., "/output/crops/wheat.webp"
  expectedPath: string; // e.g., "crops/wheat.webp"
}
```

### `POST /api/generate`
Generate a single image.
```ts
interface GenerateRequest {
  itemId: string;
  styleFile: string;    // e.g., "style.json"
  options?: {
    size?: string;      // e.g., "1024x1024"
    resize?: string;    // e.g., "256x256"
    quality?: string;
    format?: string;
    model?: string;
  }
}
```

### `GET /api/styles`
List available style files.

### `GET /api/items`
Return structured item data from audit file.

## UI Components (shadcn)

Install these shadcn components:
- `button`
- `card`
- `tabs`
- `dialog`
- `select`
- `checkbox`
- `input`
- `badge`
- `progress`
- `toast`
- `dropdown-menu`
- `scroll-area`

## Implementation Steps

### Phase 1: Project Setup
1. Initialize Next.js 14 with TypeScript
2. Install and configure Tailwind CSS
3. Install shadcn/ui and required components
4. Create directory structure
5. Move existing style files to `styles/` folder
6. Create `output/` folder structure

### Phase 2: Data Layer
1. Create `lib/items.ts` - parse item definitions from audit
2. Create `lib/npcs.ts` - parse NPC definitions
3. Create `lib/filesystem.ts` - scan output folders for existing images
4. Create `lib/styles.ts` - load and list style files
5. Export structured data files under `data/`

### Phase 3: API Routes
1. Implement `GET /api/assets` - list all assets with status
2. Implement `GET /api/items` - return item definitions
3. Implement `GET /api/styles` - list style files
4. Implement `POST /api/generate` - port generation logic from generate.js

### Phase 4: Core UI
1. Build layout with navigation
2. Create `AssetCard` component
3. Create `AssetGrid` component
4. Build home page with category tabs
5. Implement search and filtering

### Phase 5: Generation Features
1. Create `GenerationDialog` component
2. Create `StyleSelector` component
3. Create `ItemPicker` component
4. Wire up single-item regeneration
5. Add batch generation support

### Phase 6: Style Management
1. Build styles page
2. JSON viewer/editor for styles
3. Style preview panel
4. Create/duplicate functionality

### Phase 7: Polish
1. Add loading states
2. Add error handling with toasts
3. Responsive design
4. Keyboard shortcuts
5. Local storage for preferences

## Environment Variables

```env
OPENAI_API_KEY=sk-...
```

## Running the App

```bash
# Development
npm run dev

# Production build
npm run build
npm start
```

## Migration from Current Setup

1. Existing images in `icons/` and `npc/` folders will be moved to `output/` with proper subfolders
2. Style files stay in project root initially, can be organized later
3. The original `generate.js` remains functional for CLI usage

## Notes

- Images are served from `/output/` via Next.js static file serving
- All filesystem operations happen server-side in API routes
- Generation is sequential (OpenAI rate limits)
- WebP format preferred for web display
- Consider adding image caching headers
