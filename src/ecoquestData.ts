export type TaskCategory =
  | 'Waste'
  | 'Transport'
  | 'Nature'
  | 'Water'
  | 'Energy'
  | 'Community';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type TaskCadence = 'Daily' | 'Weekly';

export type EcoTask = {
  id: string;
  title: string;
  category: TaskCategory;
  difficulty: Difficulty;
  cadence: TaskCadence;
  points: number;
  evidencePrompt: string;
  verificationLabels: string[];
  safetyNote: string;
};

export type FeedPost = {
  id: string;
  avatarName: string;
  taskTitle: string;
  category: TaskCategory;
  distance: string;
  neighborhood: string;
  moderationStatus: 'Approved' | 'Needs review';
  reactions: number;
  description: string;
  createdAt: string;
};

export type WardrobeItem = {
  id: string;
  name: string;
  category: 'Hats' | 'Jackets' | 'Shoes' | 'Backpacks' | 'Face' | 'Hair' | 'Seasonal';
  rarity: 'Starter' | 'Common' | 'Rare' | 'Seasonal';
  cost: number;
  locked: boolean;
};

export type EcoTip = {
  category: 'Recycling' | 'Water' | 'Food' | 'Energy' | 'Biodiversity' | 'Transport';
  headline: string;
  detail: string;
};

export const dailyTasks: EcoTask[] = [
  {
    id: 'recycle-3-items',
    title: 'Recycle 3 clean items',
    category: 'Waste',
    cadence: 'Daily',
    difficulty: 'Easy',
    points: 45,
    evidencePrompt: 'Upload a photo of the recyclable items or the bin before pickup.',
    verificationLabels: ['bottle', 'can', 'cardboard', 'recycling bin'],
    safetyNote: 'Only photograph your own items or public bins where photography is allowed.',
  },
  {
    id: 'bike-walk-trip',
    title: 'Walk or bike for one local trip',
    category: 'Transport',
    cadence: 'Daily',
    difficulty: 'Medium',
    points: 70,
    evidencePrompt: 'Share a safe photo of your bike, route, transit stop, or destination.',
    verificationLabels: ['bike', 'sidewalk', 'transit', 'helmet'],
    safetyNote: 'Do not take photos while moving through traffic.',
  },
  {
    id: 'plant-care',
    title: 'Water or plant something native',
    category: 'Nature',
    cadence: 'Daily',
    difficulty: 'Medium',
    points: 65,
    evidencePrompt: 'Show the plant, soil, garden bed, or watering can.',
    verificationLabels: ['plant', 'tree', 'soil', 'watering can'],
    safetyNote: 'Use native plants where possible and follow local water guidance.',
  },
  {
    id: 'short-shower',
    title: 'Save water with a shorter shower',
    category: 'Water',
    cadence: 'Daily',
    difficulty: 'Easy',
    points: 35,
    evidencePrompt: 'Upload a timer screenshot or a safe bathroom fixture photo.',
    verificationLabels: ['timer', 'shower head', 'faucet'],
    safetyNote: 'Never upload photos that include private reflections or other people.',
  },
  {
    id: 'lights-off',
    title: 'Turn off unused lights and chargers',
    category: 'Energy',
    cadence: 'Daily',
    difficulty: 'Easy',
    points: 40,
    evidencePrompt: 'Show an unplugged charger, power strip, or dark unused room.',
    verificationLabels: ['power strip', 'charger', 'light switch'],
    safetyNote: 'Do not touch electrical equipment that is damaged or unsafe.',
  },
];

export const weeklyChallenges: EcoTask[] = [
  {
    id: 'plastic-free-five',
    title: 'Skip single-use plastic 5 times',
    category: 'Waste',
    cadence: 'Weekly',
    difficulty: 'Hard',
    points: 240,
    evidencePrompt: 'Add photos across the week showing reusable bags, bottles, or containers.',
    verificationLabels: ['reusable bottle', 'tote bag', 'container'],
    safetyNote: 'Avoid photographing payment cards, receipts with personal details, or faces.',
  },
  {
    id: 'community-cleanup',
    title: 'Pick up 15 pieces of litter',
    category: 'Community',
    cadence: 'Weekly',
    difficulty: 'Hard',
    points: 300,
    evidencePrompt: 'Submit before and after photos from a safe public cleanup spot.',
    verificationLabels: ['trash bag', 'litter', 'gloves', 'park'],
    safetyNote: 'Use gloves and skip sharp, hazardous, or unknown materials.',
  },
];

export const starterFeedPosts: FeedPost[] = [
  {
    id: 'post-1',
    avatarName: 'Mika',
    taskTitle: 'Recycled 3 clean items',
    category: 'Waste',
    distance: '0.3 miles away',
    neighborhood: 'Riverside',
    moderationStatus: 'Approved',
    reactions: 18,
    description: 'Sorted cans and cardboard after lunch at the park.',
    createdAt: 'Today',
  },
  {
    id: 'post-2',
    avatarName: 'Sol',
    taskTitle: 'Biked to the library',
    category: 'Transport',
    distance: '0.8 miles away',
    neighborhood: 'Maple District',
    moderationStatus: 'Approved',
    reactions: 31,
    description: 'Replaced a short car trip with a safe bike route.',
    createdAt: 'Today',
  },
  {
    id: 'post-3',
    avatarName: 'Jun',
    taskTitle: 'Cared for native flowers',
    category: 'Nature',
    distance: '1.1 miles away',
    neighborhood: 'Hillcrest',
    moderationStatus: 'Approved',
    reactions: 24,
    description: 'Watered pollinator-friendly plants before the heat of the day.',
    createdAt: 'Yesterday',
  },
];

export const wardrobeItems: WardrobeItem[] = [
  {
    id: 'starter-hoodie',
    name: 'Forest Hoodie',
    category: 'Jackets',
    rarity: 'Starter',
    cost: 0,
    locked: false,
  },
  {
    id: 'leaf-cap',
    name: 'Leaf Scout Cap',
    category: 'Hats',
    rarity: 'Common',
    cost: 180,
    locked: false,
  },
  {
    id: 'trail-sneakers',
    name: 'Trail Sneakers',
    category: 'Shoes',
    rarity: 'Common',
    cost: 220,
    locked: true,
  },
  {
    id: 'solar-backpack',
    name: 'Solar Patch Backpack',
    category: 'Backpacks',
    rarity: 'Rare',
    cost: 420,
    locked: true,
  },
  {
    id: 'river-glasses',
    name: 'River Cleanup Glasses',
    category: 'Face',
    rarity: 'Rare',
    cost: 360,
    locked: true,
  },
  {
    id: 'earth-day-jacket',
    name: 'Earth Day Jacket',
    category: 'Seasonal',
    rarity: 'Seasonal',
    cost: 600,
    locked: true,
  },
];

export const ecoTips: EcoTip[] = [
  {
    category: 'Water',
    headline: 'Turn off the tap while brushing.',
    detail: 'A running faucet can waste several liters of water in a minute.',
  },
  {
    category: 'Transport',
    headline: 'Keep tires properly inflated.',
    detail: 'Correct tire pressure can improve fuel efficiency and reduce emissions.',
  },
  {
    category: 'Food',
    headline: 'Plan one meat-free meal.',
    detail: 'Plant-forward meals usually require less land and water to produce.',
  },
  {
    category: 'Recycling',
    headline: 'Rinse containers before recycling.',
    detail: 'Cleaner items are less likely to contaminate a recycling batch.',
  },
  {
    category: 'Biodiversity',
    headline: 'Native plants support local pollinators.',
    detail: 'Local insects and birds are adapted to the native plants in their region.',
  },
  {
    category: 'Energy',
    headline: 'Unplug idle chargers.',
    detail: 'Some chargers still draw standby power when nothing is connected.',
  },
];

export const avatarBases = ['Boy avatar base', 'Girl avatar base', 'Androgynous avatar base'];
export const representationOptions = ['Black', 'East Asian', 'Latine', 'Middle Eastern', 'Native/Indigenous', 'South Asian', 'White', 'Mixed identity'];
export const starterOutfits = ['Forest Hoodie', 'Ocean Tee', 'Solar Scout Jacket'];
export const privacyOptions = ['Exact for verification', 'Neighborhood for feed', 'City only'];
export const badges = ['Starter Recycler', 'Three-Day Streak', 'Neighborhood Helper'];
