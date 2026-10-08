import { Armchair, Layers, Monitor } from 'lucide-react';

export const CATEGORIES = {
  DESKS: 'Desks',
  CHAIRS: 'Chairs',
  ACCESSORIES: 'Accessories',
};

export const CAT_ICONS = {
  Desks: Layers,
  Chairs: Armchair,
  Accessories: Monitor,
};

export const MAX_MONITORS = 2;

/** Accessories that only make sense once — re-adding replaces the old one. */
export const SINGLETON_ACCESSORY_IDS = ['acc-keyboard', 'acc-mouse'];

/** Accessory slots limited to one item — re-adding swaps the occupying model. */
export const SINGLETON_ACCESSORY_SLOTS = ['lamp', 'keyboard', 'mouse', 'plant'];

/** Rental duration plans with loyalty discount on the monthly rate. */
export const RENTAL_PLANS = [
  { months: 1, label: '1 month', discount: 0 },
  { months: 3, label: '3 months', discount: 0.05 },
  { months: 6, label: '6 months', discount: 0.1 },
  { months: 12, label: '12 months', discount: 0.15 },
];

/** Static delivery promise shown in the rent modal. */
export const DELIVERY = {
  fee: 0,
  eta: '48h',
  coverage: 'anywhere in Bali',
  includes: ['Free delivery & assembly', 'Free swap if faulty', 'Free pickup at end'],
};

/**
 * Spec icons are short keys resolved to Lucide components
 * in ProductDetailModal (SPEC_ICONS) — keeps data serializable.
 */
export const PRODUCTS = [
  {
    id: 'desk-1',
    name: 'Ergo Standing Desk',
    category: CATEGORIES.DESKS,
    price: 45,
    image: '/assets/desk-ergo.png',
    type: 'desk',
    badge: 'Best Seller',
    rating: 4.9,
    reviews: 214,
    tagline: 'Height-adjustable standing desk with memory presets.',
    description:
      'Electric sit-stand frame with anti-collision sensor and a scratch-resistant top. Switch between sitting and standing with four memory presets.',
    specs: [
      { icon: 'ruler', label: 'Top size', value: '140 × 70 cm' },
      { icon: 'expand', label: 'Height range', value: '62 – 128 cm' },
      { icon: 'weight', label: 'Max load', value: '100 kg' },
      { icon: 'zap', label: 'Lift', value: 'Electric, 220V' },
    ],
  },
  {
    id: 'desk-2',
    name: 'Compact Gaming Desk',
    category: CATEGORIES.DESKS,
    price: 30,
    image: '/assets/desk-compact.png',
    type: 'desk',
    badge: null,
    rating: 4.7,
    reviews: 98,
    tagline: 'Compact desk with full-surface gaming mat.',
    description:
      '120 cm top with water-resistant carbon-texture mat, cable tray and headphone hook. Ideal for tight rooms and kos setups.',
    specs: [
      { icon: 'ruler', label: 'Top size', value: '120 × 60 cm' },
      { icon: 'layers', label: 'Surface', value: 'Stitched full mat' },
      { icon: 'cable', label: 'Cable mgmt', value: 'Built-in tray' },
      { icon: 'weight', label: 'Max load', value: '60 kg' },
    ],
  },
  {
    id: 'chair-1',
    name: 'Aeron Office Chair',
    category: CATEGORIES.CHAIRS,
    price: 55,
    image: '/assets/chair-aeron.png',
    type: 'chair',
    scene: { width: 270, pct: 40, min: 130, offset: 0 },
    badge: 'Premium',
    rating: 4.9,
    reviews: 187,
    tagline: 'Ergonomic mesh chair with lumbar support.',
    description:
      'Breathable mesh back with adjustable lumbar, 4D armrests and synchro-tilt mechanism. Built for long workdays in tropical heat.',
    specs: [
      { icon: 'layers', label: 'Backrest', value: 'Mesh + lumbar' },
      { icon: 'move', label: 'Armrests', value: '4D adjustable' },
      { icon: 'shield', label: 'Mechanism', value: 'Synchro-tilt lock' },
      { icon: 'weight', label: 'Max load', value: '120 kg' },
    ],
  },
  {
    id: 'chair-2',
    name: 'Standard Mesh Chair',
    category: CATEGORIES.CHAIRS,
    price: 25,
    image: '/assets/chair-mesh.png',
    type: 'chair',
    scene: { width: 190, pct: 28, min: 100, offset: -10 },
    badge: null,
    rating: 4.5,
    reviews: 143,
    tagline: 'Lightweight mesh chair for everyday work.',
    description:
      'Simple, breathable mesh chair with fixed armrests and tilt lock. Great value for short-term rentals.',
    specs: [
      { icon: 'layers', label: 'Backrest', value: 'Mesh, standard' },
      { icon: 'lock', label: 'Tilt', value: 'Lockable' },
      { icon: 'expand', label: 'Base', value: 'Nylon 5-star' },
      { icon: 'weight', label: 'Max load', value: '100 kg' },
    ],
  },
  {
    id: 'acc-monitor-1',
    name: '27" 4K Monitor',
    category: CATEGORIES.ACCESSORIES,
    price: 35,
    image: '/assets/monitor-27-4k.png',
    type: 'monitor',
    badge: '4K',
    rating: 4.8,
    reviews: 176,
    tagline: '27-inch 4K IPS display with HDR.',
    description:
      '3840 × 2160 IPS panel with 99% sRGB and HDR10. Height-adjustable stand with HDMI and DisplayPort cables included.',
    specs: [
      { icon: 'monitor', label: 'Panel', value: '27" 4K IPS' },
      { icon: 'cable', label: 'Ports', value: 'HDMI + DisplayPort' },
      { icon: 'activity', label: 'Refresh rate', value: '60 Hz' },
      { icon: 'expand', label: 'Stand', value: 'Height adjustable' },
    ],
  },
  {
    id: 'acc-monitor-2',
    name: '34" Ultrawide',
    category: CATEGORIES.ACCESSORIES,
    price: 50,
    image: '/assets/monitor-34-ultrawide.png',
    type: 'monitor',
    badge: 'New',
    rating: 4.9,
    reviews: 64,
    tagline: '34-inch 21:9 ultrawide for multitasking.',
    description:
      '3440 × 1440 curved VA panel that replaces dual monitors. Split-screen friendly with USB-C 65W single-cable docking.',
    specs: [
      { icon: 'monitor', label: 'Panel', value: '34" 21:9 curved' },
      { icon: 'cable', label: 'Ports', value: 'USB-C + HDMI + DP' },
      { icon: 'activity', label: 'Refresh rate', value: '100 Hz' },
      { icon: 'zap', label: 'Charging', value: 'USB-C 65W' },
    ],
  },
  {
    id: 'acc-lamp',
    name: 'Desk Lamp',
    category: CATEGORIES.ACCESSORIES,
    price: 10,
    image: '/assets/lamp-desk.png',
    type: 'accessory',
    slot: 'lamp',
    badge: null,
    rating: 4.6,
    reviews: 88,
    tagline: 'Dimmable LED lamp with warm-to-cool light.',
    description:
      'Touch-controlled LED with 5 color temperatures and stepless dimming. USB charging port built into the base.',
    specs: [
      { icon: 'sun', label: 'Light', value: '3000 – 6000K' },
      { icon: 'sliders', label: 'Control', value: 'Touch dimmer' },
      { icon: 'zap', label: 'Power', value: '9W LED + USB' },
      { icon: 'rotate', label: 'Head', value: 'Adjustable tilt' },
    ],
  },
  {
    id: 'acc-keyboard',
    name: 'Mech Keyboard',
    category: CATEGORIES.ACCESSORIES,
    price: 15,
    image: '/assets/keyboard-mechanical.png',
    type: 'accessory',
    slot: 'keyboard',
    badge: null,
    rating: 4.7,
    reviews: 112,
    tagline: 'Low-profile wireless mechanical keyboard.',
    description:
      'Tactile mechanical switches in a quiet low profile, dual Bluetooth plus 2.4 GHz receiver, and white backlight.',
    specs: [
      { icon: 'keyboard', label: 'Switches', value: 'Tactile mechanical' },
      { icon: 'bluetooth', label: 'Connect', value: 'BT + 2.4 GHz' },
      { icon: 'battery', label: 'Battery', value: '2000 mAh' },
      { icon: 'grid', label: 'Layout', value: '75% compact' },
    ],
  },
  {
    id: 'acc-mouse',
    name: 'Ergo Mouse',
    category: CATEGORIES.ACCESSORIES,
    price: 10,
    image: '/assets/mouse-ergo.png',
    type: 'accessory',
    slot: 'mouse',
    badge: null,
    rating: 4.6,
    reviews: 97,
    tagline: 'Silent ergonomic wireless mouse.',
    description:
      'Sculpted right-hand shape with silent clicks, precise 4000 DPI sensor and a battery that lasts over a year.',
    specs: [
      { icon: 'mouse', label: 'Sensor', value: '4000 DPI' },
      { icon: 'volume', label: 'Clicks', value: 'Silent, -90% noise' },
      { icon: 'battery', label: 'Battery', value: '18 months (AA)' },
      { icon: 'bluetooth', label: 'Connect', value: 'BT + 2.4 GHz' },
    ],
  },
  {
    id: 'chair-3',
    name: 'LiberNovo Omni Pro',
    category: CATEGORIES.CHAIRS,
    price: 65,
    image: '/assets/chair-libernovo.png',
    type: 'chair',
    scene: { width: 190, pct: 28, min: 100, offset: -10 },
    badge: 'New',
    rating: 4.9,
    reviews: 41,
    tagline: 'High-back ergonomic chair with headrest.',
    description:
      'Full-length ergonomic back with cushioned headrest and dynamic tilt that follows your posture. Premium fabric stays cool through long sessions.',
    specs: [
      { icon: 'layers', label: 'Backrest', value: 'Fabric + headrest' },
      { icon: 'move', label: 'Armrests', value: 'Adjustable' },
      { icon: 'shield', label: 'Mechanism', value: 'Dynamic tilt lock' },
      { icon: 'weight', label: 'Max load', value: '120 kg' },
    ],
  },
  {
    id: 'acc-lamp-2',
    name: 'Smart LED Desk Lamp 1S',
    category: CATEGORIES.ACCESSORIES,
    price: 18,
    image: '/assets/lamp-smart-1s.png',
    type: 'accessory',
    slot: 'lamp',
    badge: 'Smart',
    rating: 4.8,
    reviews: 57,
    tagline: 'Slim smart LED bar lamp with app control.',
    description:
      'Minimalist full-length light bar with stepless dimming and wide 2700–6000K range. App and voice control plus a fold-flat arm for travel days.',
    specs: [
      { icon: 'sun', label: 'Light', value: '2700 – 6000K' },
      { icon: 'sliders', label: 'Control', value: 'App + touch' },
      { icon: 'zap', label: 'Power', value: '10W USB-C' },
      { icon: 'rotate', label: 'Arm', value: 'Foldable slim bar' },
    ],
  },
  {
    id: 'acc-plant-1',
    name: 'Monstera Deliciosa',
    category: CATEGORIES.ACCESSORIES,
    price: 8,
    image: '/assets/plant-1.png',
    type: 'accessory',
    slot: 'plant',
    badge: 'New',
    rating: 4.8,
    reviews: 42,
    tagline: 'Statement split-leaf plant to green up your desk.',
    description:
      'A lush Monstera with glossy split leaves that instantly warms up any workspace. Comes potted in a matte ceramic planter, ready to style.',
    specs: [
      { icon: 'leaf', label: 'Type', value: 'Monstera' },
      { icon: 'ruler', label: 'Height', value: '60 cm' },
      { icon: 'sun', label: 'Light', value: 'Bright indirect' },
      { icon: 'droplets', label: 'Water', value: 'Weekly' },
    ],
  },
  {
    id: 'acc-plant-2',
    name: 'Snake Plant',
    category: CATEGORIES.ACCESSORIES,
    price: 6,
    image: '/assets/plant-2.png',
    type: 'accessory',
    slot: 'plant',
    badge: null,
    rating: 4.7,
    reviews: 58,
    tagline: 'Low-maintenance air-purifying plant.',
    description:
      'Upright Sansevieria blades that thrive on neglect and clean the air. Tolerates low light and only needs watering every couple of weeks.',
    specs: [
      { icon: 'leaf', label: 'Type', value: 'Sansevieria' },
      { icon: 'ruler', label: 'Height', value: '45 cm' },
      { icon: 'sun', label: 'Light', value: 'Low to bright' },
      { icon: 'droplets', label: 'Water', value: 'Every 2–3 weeks' },
    ],
  },
];
