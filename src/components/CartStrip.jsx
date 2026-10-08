import { ShoppingCart, X } from 'lucide-react';
import { useAnimatedNumber } from '../hooks/useAnimatedNumber.js';
import { ProductImage } from './ProductImage.jsx';

/**
 * Group setup items by product id. Each group keeps its instances so
 * remove can drop a single unit (monitors/lamps can repeat).
 */
function summarize(setup) {
  const all = [setup.desk, setup.chair, ...setup.monitors, ...setup.accessories].filter(Boolean);
  const map = new Map();
  for (const item of all) {
    const entry = map.get(item.id) ?? {
      id: item.id,
      image: item.image,
      name: item.name,
      price: item.price,
      instances: [],
    };
    entry.instances.push({ instanceId: item.instanceId ?? item.id, type: item.type });
    map.set(item.id, entry);
  }
  return [...map.values()];
}

function CartCard({ group, onRemoveOne }) {
  const qty = group.instances.length;
  const first = group.instances[0];

  return (
    <div className="pop-in relative snap-start w-[132px] shrink-0 bg-white border border-border rounded-[20px] p-2.5 pt-[14px] flex flex-col items-center text-center hover:border-primary hover-lift">
      <button
        type="button"
        aria-label={`Remove ${group.name}`}
        onClick={() => onRemoveOne(first.type, first.instanceId)}
        className="absolute top-1.5 right-1.5 w-11 h-11 flex items-center justify-center rounded-full bg-soft text-secondary hover:bg-red-100 hover:text-red-600 transition-colors"
      >
        <X size={15} />
      </button>
      <div className="w-full aspect-square flex items-center justify-center bg-soft rounded-[14px] border border-border p-1.5 mb-2 overflow-hidden">
        <ProductImage src={group.image} alt={group.name} className="w-full h-full drop-shadow-md" />
      </div>
      <p className="text-[11px] font-semibold text-primary leading-tight truncate w-full" title={group.name}>
        {group.name}
        {qty > 1 && <span className="text-secondary tabular-nums"> ×{qty}</span>}
      </p>
      <p className="text-[11px] text-secondary tabular-nums mt-0.5">
        <span className="font-bold text-primary">${group.price * qty}</span>/mo
      </p>
    </div>
  );
}

/**
 * Horizontal cart strip above the canvas. Hidden when empty.
 * Duplicates collapse to one card with `×n` and multiplied price.
 */
export function CartStrip({ setup, total, onRemove, onClear }) {
  const groups = summarize(setup);
  const animatedTotal = Math.round(useAnimatedNumber(total));
  if (groups.length === 0) return null;

  const itemCount = groups.reduce((n, g) => n + g.instances.length, 0);

  return (
    <div className="glass-card cart-enter !rounded-[6px] p-4">
      <div className="flex items-center justify-between flex-wrap gap-y-2 mb-3 gap-2">
        <p className="pill !py-1 !text-[11px] !font-medium uppercase tracking-[0.08em]">
          <ShoppingCart size={13} aria-hidden="true" />
          Your cart
          <span className="bg-primary text-white text-[10px] font-medium px-2 py-0.5 rounded-full tabular-nums">
            {itemCount}
          </span>
        </p>
        <div className="flex items-center gap-3">
          <p className="text-[13px] text-secondary">
            Total{' '}
            <span className="text-base font-bold text-primary tabular-nums">
              ${animatedTotal}
            </span>
            <span className="text-[11px]">/mo</span>
          </p>
          <button
            type="button"
            onClick={onClear}
            className="link-underline !text-[12px] px-2 py-2 -m-2"
          >
            Clear all
          </button>
        </div>
      </div>
      <div className="flex gap-2.5 overflow-x-auto snap-x snap-mandatory pb-1 pt-3">
        {groups.map((g) => (
          <CartCard key={g.id} group={g} onRemoveOne={onRemove} />
        ))}
      </div>
    </div>
  );
}
