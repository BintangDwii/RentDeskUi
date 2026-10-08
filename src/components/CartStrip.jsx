import { ShoppingCart, X } from 'lucide-react';
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
    <div className="relative w-[132px] shrink-0 bg-white border border-gray-200 rounded-[6px] p-2.5 flex flex-col items-center text-center hover:border-gray-900 hover:shadow-md transition-all">
      <button
        type="button"
        aria-label={`Remove ${group.name}`}
        onClick={() => onRemoveOne(first.type, first.instanceId)}
        className="absolute top-1.5 right-1.5 w-5 h-5 flex items-center justify-center rounded-[6px] bg-gray-100 text-gray-400 hover:bg-red-100 hover:text-red-600 transition-colors"
      >
        <X size={11} />
      </button>
      <div className="w-full aspect-square flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 rounded-[6px] border border-gray-100 p-1.5 mb-2 overflow-hidden">
        <ProductImage src={group.image} alt={group.name} className="w-full h-full drop-shadow-md" />
      </div>
      <p className="text-[11px] font-semibold text-gray-900 leading-tight truncate w-full">
        {group.name}
        {qty > 1 && <span className="text-gray-400 tabular-nums"> ×{qty}</span>}
      </p>
      <p className="text-[11px] text-gray-500 tabular-nums mt-0.5">
        <span className="font-bold text-gray-900">${group.price * qty}</span>/mo
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
  if (groups.length === 0) return null;

  const itemCount = groups.reduce((n, g) => n + g.instances.length, 0);

  return (
    <div className="glass-card cart-enter p-4">
      <div className="flex items-center justify-between mb-3 gap-2">
        <p className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.08em] uppercase text-gray-600">
          <ShoppingCart size={13} aria-hidden="true" />
          Your cart
          <span className="bg-gray-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-[6px] tabular-nums">
            {itemCount}
          </span>
        </p>
        <div className="flex items-center gap-3">
          <p className="text-[13px] text-gray-500">
            Total{' '}
            <span className="text-base font-extrabold text-gray-900 tabular-nums">${total}</span>
            <span className="text-[11px]">/mo</span>
          </p>
          <button
            type="button"
            onClick={onClear}
            className="text-[11px] font-semibold text-gray-400 hover:text-red-600 underline underline-offset-2 transition-colors"
          >
            Clear all
          </button>
        </div>
      </div>
      <div className="flex gap-2.5 overflow-x-auto pb-1">
        {groups.map((g) => (
          <CartCard key={g.id} group={g} onRemoveOne={onRemove} />
        ))}
      </div>
    </div>
  );
}
