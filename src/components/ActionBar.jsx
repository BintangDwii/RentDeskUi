import { ShoppingCart, Sparkles, Truck, X } from 'lucide-react';
import { ProductImage } from './ProductImage.jsx';

/** Group setup items by product id so duplicates collapse to `×n`. Keeps one instance ref for removal. */
function summarize(setup) {
  const all = [setup.desk, setup.chair, ...setup.monitors, ...setup.accessories].filter(Boolean);
  const map = new Map();
  for (const item of all) {
    const entry = map.get(item.id) ?? {
      id: item.id,
      image: item.image,
      name: item.name,
      qty: 0,
      first: { type: item.type, instanceId: item.instanceId ?? item.id },
    };
    entry.qty += 1;
    map.set(item.id, entry);
  }
  return [...map.values()];
}

function nextStepHint(setup) {
  if (!setup.desk) return 'Add a desk to anchor your scene';
  if (!setup.chair) return 'Add a chair to complete the essentials';
  if (setup.monitors.length === 0) return 'Add a monitor to boost productivity';
  return null;
}

function PickChip({ image, name, qty, first, onRemove }) {
  return (
    <span className="group/chip inline-flex items-center gap-1.5 pl-1 pr-1.5 py-1 rounded-[8px] bg-white/10 border border-white/10 shrink-0 hover:border-white/25 transition-colors">
      <ProductImage src={image} alt="" className="w-[22px] h-[22px] rounded-[6px] bg-white" />
      <span className="text-[11px] font-semibold text-gray-200 whitespace-nowrap">{name}</span>
      {qty > 1 && <span className="text-[10px] font-bold text-gray-400 tabular-nums">×{qty}</span>}
      <button
        type="button"
        aria-label={`Remove ${name}`}
        onClick={() => onRemove(first.type, first.instanceId)}
        className="w-5 h-5 flex items-center justify-center rounded-[6px] text-gray-500 hover:text-white hover:bg-white/15 transition-colors"
      >
        <X size={11} />
      </button>
    </span>
  );
}

export function ActionBar({ setup, total, onCheckout, onRemove }) {
  const empty = total === 0;
  const picks = summarize(setup);
  const hint = nextStepHint(setup);

  return (
    <div className="rounded-[12px] p-5 px-7 bg-gradient-to-r from-gray-950 via-gray-900 to-gray-800 border border-gray-800 flex flex-col gap-4 shadow-lg">
      {/* Your picks */}
      <div>
        <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-gray-400 mb-2">
          Your picks
        </p>
        {picks.length > 0 ? (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
            {picks.map((p) => (
              <PickChip key={p.id} {...p} onRemove={onRemove} />
            ))}
          </div>
        ) : (
          <p className="text-[13px] text-gray-400">No items yet — pick from the catalog.</p>
        )}
        {hint && picks.length > 0 && (
          <p className="inline-flex items-center gap-1.5 text-[12px] text-gray-400 mt-2">
            <Sparkles size={12} className="text-amber-400/80" aria-hidden="true" />
            {hint}
          </p>
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
