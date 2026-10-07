import { ShoppingCart } from 'lucide-react';

export function ActionBar({ total, onCheckout }) {
  return (
    <div className="rounded-[20px] p-5 px-7 bg-gray-900 border border-gray-800 flex items-center justify-between gap-4 flex-wrap shadow-[0_1px_6px_rgba(0,0,0,0.06)]">
      <div>
        <h2 className="text-xl font-bold text-neutral-50 mb-1">Ready to Rent?</h2>
        <p className="text-[13px] text-gray-400">
          Delivered &amp; assembled anywhere in Bali within 48h.
        </p>
      </div>
      <button type="button" className="checkout-btn" disabled={total === 0} onClick={onCheckout}>
        <ShoppingCart size={18} />
        Rent Setup — ${total}/mo
      </button>
    </div>
  );
}
