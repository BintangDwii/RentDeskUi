import { useEffect, useMemo, useState } from 'react';
import { MAX_MONITORS, SINGLETON_ACCESSORY_IDS, SINGLETON_ACCESSORY_SLOTS } from '../data/catalog.js';

const EMPTY_SETUP = { desk: null, chair: null, monitors: [], accessories: [] };
const STORAGE_KEY = 'rentdesk-setup-v1';

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_SETUP;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return EMPTY_SETUP;
    return {
      desk: parsed.desk ?? null,
      chair: parsed.chair ?? null,
      monitors: Array.isArray(parsed.monitors) ? parsed.monitors : [],
      accessories: Array.isArray(parsed.accessories) ? parsed.accessories : [],
    };
  } catch {
    return EMPTY_SETUP;
  }
}

/**
 * Workspace setup state: desk + chair + monitors + accessories.
 * Singleton accessories (keyboard, mouse) replace the previous one on re-add.
 * Persists to localStorage; supports snapshot restore for Undo.
 */
export function useSetup() {
  const [setup, setSetup] = useState(loadInitial);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(setup));
    } catch {
      // storage unavailable (private mode) — ignore
    }
  }, [setup]);

  const addToSetup = (product) => {
    setSetup((prev) => {
      const next = { ...prev };
      if (product.type === 'desk') {
        next.desk = product;
      } else if (product.type === 'chair') {
        next.chair = product;
      } else if (product.type === 'monitor' && next.monitors.length < MAX_MONITORS) {
        next.monitors = [...next.monitors, { ...product, instanceId: Date.now() }];
      } else if (product.type === 'accessory') {
        if (
          SINGLETON_ACCESSORY_IDS.includes(product.id) ||
          (product.slot && SINGLETON_ACCESSORY_SLOTS.includes(product.slot))
        ) {
          const filterKey = product.slot ? 'slot' : 'id';
          next.accessories = [
            ...next.accessories.filter((a) => a[filterKey] !== product[filterKey]),
            { ...product, instanceId: Date.now() },
          ];
        } else {
          next.accessories = [...next.accessories, { ...product, instanceId: Date.now() }];
        }
      }
      return next;
    });
  };

  const removeFromSetup = (type, instanceId = null) => {
    setSetup((prev) => {
      const next = { ...prev };
      if (type === 'desk' || type === 'chair') {
        next[type] = null;
      } else {
        const key = type === 'monitor' ? 'monitors' : 'accessories';
        next[key] = next[key].filter((item) => item.instanceId !== instanceId);
      }
      return next;
    });
  };

  const resetSetup = () => setSetup(EMPTY_SETUP);

  const restoreSetup = (snapshot) => {
    if (!snapshot || typeof snapshot !== 'object') return;
    setSetup({
      desk: snapshot.desk ?? null,
      chair: snapshot.chair ?? null,
      monitors: Array.isArray(snapshot.monitors) ? snapshot.monitors : [],
      accessories: Array.isArray(snapshot.accessories) ? snapshot.accessories : [],
    });
  };

  const total = useMemo(() => {
    let sum = 0;
    if (setup.desk) sum += setup.desk.price;
    if (setup.chair) sum += setup.chair.price;
    setup.monitors.forEach((m) => (sum += m.price));
    setup.accessories.forEach((a) => {
      if (a) sum += a.price;
    });
    return sum;
  }, [setup]);

  /** Derived selectors — keeps Scene components dumb. */
  const lamps = useMemo(() => setup.accessories.filter((a) => a.slot === 'lamp'), [setup]);
  const keyboards = useMemo(() => setup.accessories.filter((a) => a.slot === 'keyboard'), [setup]);
  const mice = useMemo(() => setup.accessories.filter((a) => a.slot === 'mouse'), [setup]);
  const isEmpty =
    !setup.desk && !setup.chair && setup.monitors.length === 0 && setup.accessories.length === 0;

  return {
    setup,
    addToSetup,
    removeFromSetup,
    resetSetup,
    restoreSetup,
    total,
    lamps,
    keyboards,
    mice,
    isEmpty,
  };
}
