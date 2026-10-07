import { ShoppingCart, Truck } from 'lucide-react';
import { ProductImage } from './ProductImage.jsx';

/** Group setup items by product id so duplicates collapse to `×n`. */
function summarize(setup) {
  const all = [setup.desk, setup.chair, ...setup.monitors, ...setup.accessories].filter(Boolean);
  const map = new Map();
  for (const item of all) {
    const entry = map.get(item.id) ?? { id: item.id, image: item.image, name: item.name, qty: 0 };
    entry.qty += 1;
    map.set(item.id, entry);
  }
  return [...map.values()];
}

function PickChip({ image, name, qty }) {
  return (
    <span className="inline-flex items-center gap-1.5 pl-1 pr-2.5 py-1 rounded-[6px] bg-white/10 border border-white/10 shrink-0">
      <ProductImage src={image} alt="" className="w-[22px] h-[22px] rounded-[6px] bg-white" />
      <span className="text-[11px] font-semibold text-gray-200 whitespace-nowrap">{name}</span>
      {qty > 1 && <span className="text-[10px] font-bold text-gray-400 tabular-nums">×{qty}</span>}
    </span>
  );
}

export function ActionBar({ setup, total, onCheckout }) {
  const empty = total === 0;
  const picks = summarize(setup);

  return (
    <div className="rounded-[6px] p-5 px-7 bg-gradient-to-r from-gray-950 via-gray-900 to-gray-800 border border-gray-800 flex flex-col gap-4 shadow-lg">
      {/* Your picks */}
      <div>
        <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-gray-500 mb-2">
          Your picks
        </p>
        {picks.length > 0 ? (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
            {picks.map((p) => (
              <PickChip key={p.id} {...p} />
            ))}
          </div>
        ) : (
          <p className="text-[13px] text-gray-500">No items yet — pick from the catalog.</p>
        )}
      </div>

      <div className="flex items-center justify-between gap-4 flex-wrap border-t border-white/10 pt-4">
        <div>
          <h2 className="text-xl font-bold text-neutral-50 mb-1 tracking-tight">Ready to Rent?</h2>
          <p className="text-[13px] text-gray-400 inline-flex items-center gap-1.5">
            <Truck size={14} className="text-gray-500" />
            Delivered &amp; assembled anywhere in Bali within 48h.
          </p>
        </div>
        <button type="button" className="checkout-btn-light" disabled={empty} onClick={onCheckout}>
          <ShoppingCart size={18} />
          {empty ? 'Pick items to start' : `Rent Setup — $${total}/mo`}
        </button>
      </div>
    </div>
  );
}
