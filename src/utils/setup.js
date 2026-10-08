import {
  CATEGORIES,
  MAX_MONITORS,
  SINGLETON_ACCESSORY_IDS,
  SINGLETON_ACCESSORY_SLOTS,
} from '../data/catalog.js';

/** Desks, chairs and singleton accessories only make sense once — re-adding is a no-op. */
export function isSingletonProduct(product) {
  if (!product) return false;
  if (product.type === 'desk' || product.type === 'chair') return true;
  if (SINGLETON_ACCESSORY_IDS.includes(product.id)) return true;
  return Boolean(product.slot && SINGLETON_ACCESSORY_SLOTS.includes(product.slot));
}

/** Is this exact product currently part of the setup? */
export function isInSetup(setup, product) {
  if (!product) return false;
  if (product.type === 'desk') return setup.desk?.id === product.id;
  if (product.type === 'chair') return setup.chair?.id === product.id;
  if (product.type === 'monitor') return setup.monitors.some((m) => m.id === product.id);
  return setup.accessories.some((a) => a.id === product.id);
}

/** Human-readable name of a setup item by type + instance id. */
export function findItemName(setup, type, instanceId = null) {
  if (type === 'desk') return setup.desk?.name ?? 'Desk';
  if (type === 'chair') return setup.chair?.name ?? 'Chair';
  const pool = type === 'monitor' ? setup.monitors : setup.accessories;
  return pool.find((i) => (i.instanceId ?? i.id) === instanceId)?.name ?? 'Item';
}

/** Name of the item a newly added product would replace, or null if it adds fresh. */
export function getReplacedName(setup, product) {
  if (!product) return null;
  if (product.type === 'desk' && setup.desk && setup.desk.id !== product.id) {
    return setup.desk.name;
  }
  if (product.type === 'chair' && setup.chair && setup.chair.id !== product.id) {
    return setup.chair.name;
  }
  if (product.type === 'accessory' && product.slot) {
    const occupant = setup.accessories.find((a) => a.slot === product.slot && a.id !== product.id);
    return occupant?.name ?? null;
  }
  return null;
}

/** Catalog card state (added / quantity / disabled) for a product. */
export function getCardState(setup, product) {
  if (product.type === 'desk') {
    const added = setup.desk?.id === product.id;
    return { isAdded: added, qty: added ? 1 : 0, disabled: false, disabledReason: '' };
  }
  if (product.type === 'chair') {
    const added = setup.chair?.id === product.id;
    return { isAdded: added, qty: added ? 1 : 0, disabled: false, disabledReason: '' };
  }
  if (product.type === 'monitor') {
    const qty = setup.monitors.filter((m) => m.id === product.id).length;
    const disabled = setup.monitors.length >= MAX_MONITORS;
    return {
      isAdded: qty > 0,
      qty,
      disabled,
      disabledReason: disabled ? `Max ${MAX_MONITORS} monitors reached` : '',
    };
  }
  const qty = setup.accessories.filter((a) => a.id === product.id).length;
  return { isAdded: qty > 0, qty, disabled: false, disabledReason: '' };
}

/** Number of selected items in a catalog category (badge on the tab). */
export function getTabCount(setup, category) {
  if (category === CATEGORIES.DESKS) return setup.desk ? 1 : 0;
  if (category === CATEGORIES.CHAIRS) return setup.chair ? 1 : 0;
  return setup.monitors.length + setup.accessories.length;
}
