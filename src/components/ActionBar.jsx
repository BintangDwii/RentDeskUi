import { ShoppingCart, Truck } from 'lucide-react';
import { useAnimatedNumber } from '../hooks/useAnimatedNumber.js';
import { fmtMoney } from '../utils/pricing.js';

export function ActionBar({ total, onCheckout }) {
  const empty = total === 0;
  const animatedTotal = Math.round(useAnimatedNumber(total));

  return (
    <div className="glass-card p-4 sm:p-5 sm:px-7 hidden sm:flex sm:flex-col gap-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="min-w-0">
          <h2 className="text-xl font-bold text-primary mb-1 tracking-tight">Ready to Rent?</h2>
          <p className="text-[13px] text-secondary flex items-center gap-1.5">
            <Truck size={14} className="shrink-0" aria-hidden="true" />
            <span>Delivered &amp; assembled anywhere in Bali within 48h.</span>
          </p>
        </div>
        <button
          type="button"
          className="btn-primary w-full justify-center sm:w-auto"
          disabled={empty}
          onClick={onCheckout}
        >
          <ShoppingCart size={16} />
          {empty ? 'Pick items to start' : `Rent Setup $${fmtMoney(animatedTotal)}/mo ↗`}
        </button>
      </div>
    </div>
  );
}
