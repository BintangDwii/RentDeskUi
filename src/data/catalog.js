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

export const PRODUCTS = [
  {
    id: 'desk-1',
    name: 'Ergo Standing Desk',
    category: CATEGORIES.DESKS,
    price: 45,
    image: '/assets/desk-ergo.png',
    type: 'desk',
  },
  {
    id: 'desk-2',
    name: 'Compact Gaming Desk',
    category: CATEGORIES.DESKS,
    price: 30,
    image: '/assets/desk-compact.png',
    type: 'desk',
  },
  {
    id: 'chair-1',
    name: 'Aeron Office Chair',
    category: CATEGORIES.CHAIRS,
    price: 55,
    image: '/assets/chair-aeron.png',
    type: 'chair',
  },
  {
    id: 'chair-2',
    name: 'Standard Mesh Chair',
    category: CATEGORIES.CHAIRS,
    price: 25,
    image: '/assets/chair-mesh.png',
    type: 'chair',
  },
  {
    id: 'acc-monitor-1',
    name: '27" 4K Monitor',
    category: CATEGORIES.ACCESSORIES,
    price: 35,
    image: '/assets/monitor-27-4k.png',
    type: 'monitor',
  },
  {
    id: 'acc-monitor-2',
    name: '34" Ultrawide',
    category: CATEGORIES.ACCESSORIES,
    price: 50,
    image: '/assets/monitor-34-ultrawide.png',
    type: 'monitor',
  },
  {
    id: 'acc-lamp',
    name: 'Desk Lamp',
    category: CATEGORIES.ACCESSORIES,
    price: 10,
    image: '/assets/lamp-desk.png',
    type: 'accessory',
  },
  {
    id: 'acc-keyboard',
    name: 'Mech Keyboard',
    category: CATEGORIES.ACCESSORIES,
    price: 15,
    image: '/assets/keyboard-mechanical.png',
    type: 'accessory',
  },
  {
    id: 'acc-mouse',
    name: 'Ergo Mouse',
    category: CATEGORIES.ACCESSORIES,
    price: 10,
    image: '/assets/mouse-ergo.png',
    type: 'accessory',
  },
];
