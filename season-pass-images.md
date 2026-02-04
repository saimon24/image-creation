# Harvest Pass - Required Images

This document lists all images required for the Harvest Pass (Season Pass) feature.

## Frosty Fields (February 2025) Season

### Theme Assets

| Image | Size | Location | Description |
|-------|------|----------|-------------|
| `header.png` | 750x200 | `assets/images/season-pass/2025-02/header.png` | Modal header banner - winter farm scene with "Frosty Fields" text, snow falling |

### Cosmetic Rewards

| Image | Size | Location | Description |
|-------|------|----------|-------------|
| `farm-bg.png` | 1500x2000 | `assets/images/season-pass/2025-02/farm-bg.png` | Farm background - snowy ground, winter trees, subtle snowflakes (Premium Tier 1) |
| `trophy.png` | 200x200 | `assets/images/season-pass/2025-02/trophy.png` | Season trophy decoration - ice/crystal trophy with snowflake emblem (Premium Tier 30) |
| `border.png` | 256x256 | `assets/images/season-pass/2025-02/border.png` | Avatar border - ice crown frame with icicles, transparent center (Premium Tier 30) |
| `badge.png` | 64x64 | `assets/images/season-pass/2025-02/badge.png` | Participant badge - small snowflake medal (Free Tier 30) |

### Decorations

| Image | Size | Location | Tier | Track | Description |
|-------|------|----------|------|-------|-------------|
| `winter-wreath.png` | 200x200 | `assets/images/decorations/winter-wreath.png` | 15 | Free | Festive winter wreath with holly and pinecones |
| `frozen-pond.png` | 200x200 | `assets/images/decorations/frozen-pond.png` | 10 | Premium | Small frozen pond with ice skating marks |
| `aurora-lantern.png` | 200x200 | `assets/images/decorations/aurora-lantern.png` | 20 | Premium | Glowing lantern with aurora borealis effect |
| `snowman-family.png` | 200x200 | `assets/images/decorations/snowman-family.png` | 25 | Premium | Family of 3 snowmen with scarves |

## Image Guidelines

### General Requirements
- All images should be PNG format with transparency where appropriate
- Use @2x and @3x versions for retina displays
- Optimize images for mobile (target < 100KB per image)
- Follow existing art style used throughout the game

### Header Image
- Should evoke the season's theme (winter/frosty for February)
- Include the season name prominently
- Can have subtle animation elements in the design
- Consider dark and light mode visibility

### Farm Background
- Must tile seamlessly or have defined edges
- Should work with all existing farm elements
- Provide seasonal ambiance without being too distracting
- Include subtle environmental effects (falling snow, etc.)

### Avatar Border
- Center must be transparent for profile picture
- Should be distinctive but not overwhelming
- Consider how it looks at small sizes (profile thumbnails)

### Decorations
- Follow existing decoration proportions
- Include shadow/depth for 3D effect
- Should work with all farm background colors

## File Structure

```
assets/images/
  season-pass/
    2025-02/           # Frosty Fields
      header.png
      header@2x.png
      header@3x.png
      farm-bg.png
      trophy.png
      border.png
      badge.png
  decorations/
    winter-wreath.png
    frozen-pond.png
    aurora-lantern.png
    snowman-family.png
```

## Season Config Reference

The images are referenced in `engine/season-pass/seasons/2025-02-frosty-fields.ts`:

```typescript
theme: {
  primaryColor: '#A8D5E5',
  secondaryColor: '#E8F4F8',
  accentColor: '#FFD700',
  headerImage: '@/assets/images/season-pass/2025-02/header.png',
  fabIcon: '❄️',
},

assets: {
  farmBackground: '@/assets/images/season-pass/2025-02/farm-bg.png',
  trophy: '@/assets/images/season-pass/2025-02/trophy.png',
  avatarBorder: '@/assets/images/season-pass/2025-02/border.png',
  badge: '@/assets/images/season-pass/2025-02/badge.png',
  decorations: [
    { id: 'winter_wreath', name: 'Winter Wreath', image: '@/assets/images/decorations/winter-wreath.png', tier: 15, track: 'free' },
    { id: 'frozen_pond', name: 'Frozen Pond', image: '@/assets/images/decorations/frozen-pond.png', tier: 10, track: 'premium' },
    { id: 'aurora_lantern', name: 'Aurora Lantern', image: '@/assets/images/decorations/aurora-lantern.png', tier: 20, track: 'premium' },
    { id: 'snowman_family', name: 'Snowman Family', image: '@/assets/images/decorations/snowman-family.png', tier: 25, track: 'premium' },
  ],
},
```
