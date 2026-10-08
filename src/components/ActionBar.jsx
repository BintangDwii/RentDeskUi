import { ShoppingCart, Truck } from 'lucide-react';
import { useAnimatedNumber } from '../hooks/useAnimatedNumber.js';

export function ActionBar({ total, onCheckout }) {
  const empty = total === 0;
  const animatedTotal = Math.round(useAnimatedNumber(total));

  return (
    <div className="glass-card p-5 px-7 flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-xl font-bold text-primary mb-1 tracking-tight">Ready to Rent?</h2>
          <p className="text-[13px] text-secondary inline-flex items-center gap-1.5">
            <Truck size={14} aria-hidden="true" />
            Delivered &amp; assembled anywhere in Bali within 48h.
          </p>
        </div>
        <button
          type="button"
          className="btn-primary"
          disabled={empty}
          onClick={onCheckout}
        >
          <ShoppingCart size={16} />
          {empty ? 'Pick items to start' : `Rent Setup — $${animatedTotal}/mo ↗`}
        </button>
      </div>
    </div>
  );
}
