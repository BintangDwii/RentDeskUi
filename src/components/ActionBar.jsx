import { ShoppingCart, Truck } from 'lucide-react';
import { useAnimatedNumber } from '../hooks/useAnimatedNumber.js';

export function ActionBar({ total, onCheckout }) {
  const empty = total === 0;
  const animatedTotal = Math.round(useAnimatedNumber(total));

  return (
    <div className="rounded-[12px] p-5 px-7 bg-gradient-to-r from-gray-950 via-gray-900 to-gray-800 border border-gray-800 flex flex-col gap-4 shadow-lg">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-xl font-bold text-neutral-50 mb-1 tracking-tight">Ready to Rent?</h2>
          <p className="text-[13px] text-gray-400 inline-flex items-center gap-1.5">
            <Truck size={14} className="text-gray-500" />
            Delivered &amp; assembled anywhere in Bali within 48h.
          </p>
        </div>
        <button type="button" className="checkout-btn-light" disabled={empty} onClick={onCheckout}>
          <ShoppingCart size={18} />
          {empty ? 'Pick items to start' : `Rent Setup — $${animatedTotal}/mo`}
        </button>
      </div>
    </div>
  );
}
