import { MAX_MONITORS } from '../data/catalog.js';
import { findItemName, getReplacedName, isInSetup, isSingletonProduct } from '../utils/setup.js';
import { useSetup } from './useSetup.js';
import { useToast } from './useToast.js';

const snapshot = (setup) => JSON.parse(JSON.stringify(setup));

/**
 * Composes setup state with toast/undo UX. Keeps App.jsx a pure layout shell:
 * `add`, `remove` and `clear` each snapshot the setup first so the toast's
 * Undo can restore it.
 */
export function useSetupActions() {
  const setupState = useSetup();
  const { setup, addToSetup, removeFromSetup, resetSetup, restoreSetup, isEmpty } = setupState;
  const { toast, showToast, dismissToast } = useToast();

  const add = (product) => {
    if (!product) return;
    if (product.type === 'monitor' && setup.monitors.length >= MAX_MONITORS) {
      showToast(`Max ${MAX_MONITORS} monitors — remove one to swap`);
      return;
    }
    if (isSingletonProduct(product) && isInSetup(setup, product)) {
      showToast(`${product.name} is already in your setup`);
      return;
    }
    const prev = snapshot(setup);
    const replaced = getReplacedName(setup, product);
    addToSetup(product);
    showToast(
      replaced ? `Swapped ${replaced} → ${product.name}` : `${product.name} added`,
      () => restoreSetup(prev)
    );
  };

  const remove = (type, instanceId = null) => {
    const name = findItemName(setup, type, instanceId);
    const prev = snapshot(setup);
    removeFromSetup(type, instanceId);
    showToast(`${name} removed`, () => restoreSetup(prev));
  };

  const clear = () => {
    if (isEmpty) return;
    const prev = snapshot(setup);
    resetSetup();
    showToast('Setup cleared', () => restoreSetup(prev));
  };

  return { ...setupState, toast, dismissToast, add, remove, clear };
}
