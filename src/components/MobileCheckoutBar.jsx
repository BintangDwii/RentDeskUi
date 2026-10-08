import { ShoppingCart } from 'lucide-react';
import { useAnimatedNumber } from '../hooks/useAnimatedNumber.js';

/**
 * Always-visible mobile checkout CTA. Fixed to the bottom of the viewport so
 * "Rent Setup" stays reachable while browsing the catalog and canvas; the
 * full ActionBar card takes over from `sm` upward.
 */
export function MobileCheckoutBar({ total, onCheckout }) {
  const empty = total === 0;
  const animatedTotal = Math.round(useAnimatedNumber(total));

  return (
    <div className="sm:hidden fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 backdrop-blur px-4 pt-3 pb-safe">
      <button
        type="button"
        className="btn-primary w-full justify-center"
        disabled={empty}
        onClick={onCheckout}
      >
        <ShoppingCart size={16} />
        {empty ? 'Pick items to start' : `Rent Setup — $${animatedTotal}/mo ↗`}
      </button>
    </div>
  );
}
