# Events & Boosts - Image Reference

Use this file to create images for each event and boost. Replace the current emoji icons with custom images.

## Weekly Events (13 total)

| Event ID | Name | Current Icon | Color Theme | Description |
|----------|------|--------------|-------------|-------------|
| `DOUBLE_ORDER_XP` | Order Rush Day | 📦 | blue | Double XP from orders |
| `DOUBLE_BOAT_POINTS_AND_COINS` | Busy Harbor Day | 🚤 | green | Double boat points and coins |
| `DOUBLE_VISITOR_COINS` | Visitor Festival | 🧑‍🌾 | gold | Double coins from visitors |
| `DOUBLE_ORDER_XP_AND_COINS` | Grand Market Day | 🏮 | purple | Double XP and coins from orders |
| `DOUBLE_VISITOR_XP_AND_COINS` | Golden Guest Day | 🎉 | orange | Double XP and coins from visitors |
| `HARVEST_FESTIVAL_ORDERS` | Harvest Festival Weekend | 🌾 | gold | Double XP and coins from orders |
| `HARVEST_FESTIVAL_VISITORS` | Harvest Festival Weekend | 🌾 | gold | Double coins from visitors |
| `HARVEST_FESTIVAL_BOAT` | Harvest Festival Weekend | 🌾 | gold | Double boat points |
| `GREEN_THUMB_MONDAY` | Green Thumb Monday | 🌱 | green | Crops grow 10% faster |
| `CRAFTSMAN_FRIDAY` | Craftsman Friday | 🔨 | orange | Crafting 10% faster |
| `EXPLORERS_LUCK_WEDNESDAY` | Explorer's Luck | 🎒 | purple | 15% better adventure bonus chances |
| `RELAXED_WEEKEND` | Relaxed Weekend | ☀️ | blue | 5% faster crops and crafting |
| `WEEKEND_MARKET` | Weekend Market | 🛒 | gold | 10% more coins from orders |

## Boost Items (11 total)

| Boost ID | Name | Current Icon | Duration | Effect |
|----------|------|--------------|----------|--------|
| `xp_boost_1h` | XP Boost (1h) | ⭐ | 1 hour | +25% XP |
| `xp_boost_2h` | XP Boost (2h) | 🌠 | 2 hours | +25% XP |
| `craft_speed_boost_1h` | Craft Speed Boost (1h) | ⚡ | 1 hour | 30% faster crafting |
| `craft_speed_boost_2h` | Craft Speed Boost (2h) | 💥 | 2 hours | 30% faster crafting |
| `yield_boost_1h` | Yield Boost (1h) | 💫 | 1 hour | +20% harvest yield |
| `yield_boost_2h` | Yield Boost (2h) | 🌟 | 2 hours | +20% harvest yield |
| `coin_boost_1h` | Coin Boost (1h) | 💰 | 1 hour | +25% coins |
| `coin_boost_2h` | Coin Boost (2h) | 🪙 | 2 hours | +25% coins |
| `friend_boost_token` | Friend Boost Token | 👥 | 30 min | 5% crop speed |
| `friend_crop_boost_token` | Friend Crop Boost | 🌾 | 30 min | 10% crop speed |
| `friend_craft_boost_token` | Friend Craft Boost | ⚡ | 30 min | 10% craft speed |

## Suggested Image File Names

### Events
- `event_order_rush.png`
- `event_busy_harbor.png`
- `event_visitor_festival.png`
- `event_grand_market.png`
- `event_golden_guest.png`
- `event_harvest_festival.png` (can be shared across all 3 harvest festival events)
- `event_green_thumb.png`
- `event_craftsman.png`
- `event_explorers_luck.png`
- `event_relaxed_weekend.png`
- `event_weekend_market.png`

### Boosts
- `boost_xp.png` (can be shared for 1h and 2h)
- `boost_craft_speed.png` (can be shared for 1h and 2h)
- `boost_yield.png` (can be shared for 1h and 2h)
- `boost_coin.png` (can be shared for 1h and 2h)
- `boost_friend.png`
- `boost_friend_crop.png`
- `boost_friend_craft.png`

## Where Icons Are Defined

- **Weekly Events**: `engine/weekly-events.ts` - the `icon` property in `WEEKLY_EVENT_DEFINITIONS`
- **Boost Items**: `engine/boosts.ts` - the `emoji` property in `BOOST_ITEM_DEFINITIONS`
- **Item Emojis**: `engine/items.ts` - the `ITEM_EMOJIS` record (for boost items as inventory)
