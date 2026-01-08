export interface NPCDefinition {
  id: string;
  name: string;
  description: string;
  expectedPath: string;
}

export const npcs: NPCDefinition[] = [
  {
    id: "sage",
    name: "Sage",
    description: "An elderly wise woman with silver hair and knowing eyes wearing flowing robes with herb pouches standing in a mystical garden with glowing plants",
    expectedPath: "npcs/sage.webp",
  },
  {
    id: "emma",
    name: "Emma",
    description: "A loving mother with tired but warm eyes wearing a practical dress with an apron standing in a busy farmhouse kitchen with children's drawings on the wall",
    expectedPath: "npcs/emma.webp",
  },
  {
    id: "liam",
    name: "Liam",
    description: "A young fisherman with wind-swept hair wearing a waterproof jacket preparing fishing gear on a misty morning dock",
    expectedPath: "npcs/liam.webp",
  },
  {
    id: "helena",
    name: "Helena",
    description: "A busy shopkeeper with spectacles perched on her nose wearing a neat blouse and skirt standing behind a counter with organized shelves",
    expectedPath: "npcs/helena.webp",
  },
  {
    id: "finn",
    name: "Finn",
    description: "A determined craftsman with sawdust in his hair wearing a work apron with pockets full of nails standing in a half-built wooden workshop",
    expectedPath: "npcs/finn.webp",
  },
  {
    id: "ava",
    name: "Ava",
    description: "A strong female blacksmith with muscular arms and braided hair wearing protective leather gear hammering at a glowing anvil with sparks flying",
    expectedPath: "npcs/ava.webp",
  },
  {
    id: "james",
    name: "James",
    description: "A refined tailor with precise movements wearing an elegant vest with a pocket watch standing in a fitting room with mirrors and fine suits",
    expectedPath: "npcs/james.webp",
  },
  {
    id: "maya",
    name: "Maya",
    description: "A creative artist with colorful paint streaks in her hair wearing a smock working in a sunlit studio with portraits on the walls",
    expectedPath: "npcs/maya.webp",
  },
  {
    id: "diego",
    name: "Diego",
    description: "A hardworking farmer with a wide smile wearing a straw hat and dusty work clothes standing in a vegetable garden with seed packets",
    expectedPath: "npcs/diego.webp",
  },
  {
    id: "sofia",
    name: "Sofia",
    description: "An ambitious young chef with determined eyes wearing a crisp chef's uniform standing in a newly renovated restaurant kitchen",
    expectedPath: "npcs/sofia.webp",
  },
  {
    id: "kai",
    name: "Kai",
    description: "A seasoned trader with weathered features wearing traveling leathers and carrying a ledger standing beside loaded wagons in a caravan camp",
    expectedPath: "npcs/kai.webp",
  },
  {
    id: "olivia",
    name: "Olivia",
    description: "A radiant bride-to-be with flowers in her hair wearing a beautiful white dress standing in a garden decorated for a wedding",
    expectedPath: "npcs/olivia.webp",
  },
  {
    id: "carlos",
    name: "Carlos",
    description: "A tough miner with coal-dusted face wearing a helmet with a lamp and sturdy work clothes standing at a mine entrance with a pickaxe",
    expectedPath: "npcs/carlos.webp",
  },
  {
    id: "priya",
    name: "Priya",
    description: "A compassionate healer with gentle hands wearing traditional robes with medicinal symbols standing in a clean clinic with herb jars and bandages",
    expectedPath: "npcs/priya.webp",
  },
  {
    id: "david",
    name: "David",
    description: "A dedicated teacher with warm eyes wearing scholarly robes and glasses standing in a schoolhouse with books and a chalkboard",
    expectedPath: "npcs/david.webp",
  },
  {
    id: "elena",
    name: "Elena",
    description: "A curious scientist with wild hair wearing a laboratory coat with goggles on her forehead standing in a greenhouse with experimental plants",
    expectedPath: "npcs/elena.webp",
  },
  {
    id: "alex",
    name: "Alex",
    description: "A charismatic performer with bright clothing wearing a colorful costume with bells and ribbons juggling on a festive stage with banners",
    expectedPath: "npcs/alex.webp",
  },
];

export function getNPCById(id: string): NPCDefinition | undefined {
  return npcs.find((npc) => npc.id === id);
}
