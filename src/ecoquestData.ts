export type TaskCategory =
  | 'Waste'
  | 'Transport'
  | 'Nature'
  | 'Water'
  | 'Energy'
  | 'Community';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type EcoTask = {
  id: string;
  title: string;
  category: TaskCategory;
  difficulty: Difficulty;
  points: number;
  evidencePrompt: string;
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
};

export type WardrobeItem = {
  id: string;
  name: string;
  category: string;
  rarity: 'Starter' | 'Common' | 'Rare' | 'Seasonal';
  cost: number;
  locked: boolean;
};

export const dailyTasks: EcoTask[] = [
  {
    id: 'recycle-3-items',
    title: 'Recycle 3 clean items',
    category: 'Waste',
    difficulty: 'Easy',
    points: 45,
    evidencePrompt: 'Upload a photo of the recyclable items or bin.',
  },
  {
    id: 'bike-walk-trip',
    title: 'Walk or bike for one local trip',
    category: 'Transport',
    difficulty: 'Medium',
    points: 70,
    evidencePrompt: 'Share a safe photo of your bike, route, or destination.',
  },
  {
    id: 'plant-care',
    title: 'Water or plant something native',
    category: 'Nature',
    difficulty: 'Medium',
    points: 65,
    evidencePrompt: 'Show the plant, soil, or garden area.',
  },
  {
    id: 'short-shower',
    title: 'Save water with a shorter shower',
    category: 'Water',
    difficulty: 'Easy',
    points: 35,
    evidencePrompt: 'Upload a timer screenshot or bathroom fixture photo.',
  },
];

export const weeklyChallenges: EcoTask[] = [
  {
    id: 'plastic-free-five',
    title: 'Skip single-use plastic 5 times',
    category: 'Waste',
    difficulty: 'Hard',
    points: 240,
    evidencePrompt: 'Add photos across the week showing reusable alternatives.',
  },
  {
    id: 'community-cleanup',
    title: 'Pick up 15 pieces of litter',
    category: 'Community',
    difficulty: 'Hard',
    points: 300,
    evidencePrompt: 'Submit before and after photos from a safe public space.',
  },
];

export const feedPosts: FeedPost[] = [
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
    id: 'solar-backpack',
    name: 'Solar Patch Backpack',
    category: 'Backpacks',
    rarity: 'Rare',
    cost: 420,
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

export const ecoTips = [
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
];

export const categoryStats = [
  { label: 'Waste tasks', value: 12 },
  { label: 'Transport tasks', value: 7 },
  { label: 'Nature tasks', value: 9 },
  { label: 'Water tasks', value: 5 },
  { label: 'Energy tasks', value: 4 },
  { label: 'Community tasks', value: 6 },
];

export const badges = ['Starter Recycler', 'Three-Day Streak', 'Neighborhood Helper'];
