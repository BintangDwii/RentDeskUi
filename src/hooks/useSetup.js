import { useMemo, useState } from 'react';
import { MAX_MONITORS, SINGLETON_ACCESSORY_IDS } from '../data/catalog.js';

const EMPTY_SETUP = { desk: null, chair: null, monitors: [], accessories: [] };

/**
 * Workspace setup state: desk + chair + monitors + accessories.
 * Singleton accessories (keyboard, mouse) replace the previous one on re-add.
 */
export function useSetup() {
  const [setup, setSetup] = useState(EMPTY_SETUP);

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
        if (SINGLETON_ACCESSORY_IDS.includes(product.id)) {
          next.accessories = [
            ...next.accessories.filter((a) => a.id !== product.id),
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
  const lamps = useMemo(() => setup.accessories.filter((a) => a.id === 'acc-lamp'), [setup]);
  const keyboards = useMemo(
    () => setup.accessories.filter((a) => a.id === 'acc-keyboard'),
    [setup]
  );
  const mice = useMemo(() => setup.accessories.filter((a) => a.id === 'acc-mouse'), [setup]);
  const isEmpty =
    !setup.desk && !setup.chair && setup.monitors.length === 0 && setup.accessories.length === 0;

  return {
    setup,
    addToSetup,
    removeFromSetup,
    resetSetup,
    total,
    lamps,
    keyboards,
    mice,
    isEmpty,
  };
}
