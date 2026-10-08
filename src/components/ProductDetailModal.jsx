import {
  Activity,
  BatteryCharging,
  Bluetooth,
  Cable,
  Expand,
  Keyboard,
  Layers,
  LayoutGrid,
  Lock,
  Monitor,
  Mouse,
  Move,
  Plus,
  RotateCw,
  Ruler,
  ShieldCheck,
  ShoppingCart,
  SlidersHorizontal,
  Star,
  Sun,
  VolumeX,
  Weight,
  X,
  Zap,
} from 'lucide-react';
import { ProductImage } from './ProductImage.jsx';
import { useModalBehaviour } from '../hooks/useModal.js';

const SPEC_ICONS = {
  ruler: Ruler,
  expand: Expand,
  weight: Weight,
  zap: Zap,
  layers: Layers,
  cable: Cable,
  monitor: Monitor,
  move: Move,
  shield: ShieldCheck,
  lock: Lock,
  sun: Sun,
  sliders: SlidersHorizontal,
  rotate: RotateCw,
  keyboard: Keyboard,
  bluetooth: Bluetooth,
  battery: BatteryCharging,
  grid: LayoutGrid,
  mouse: Mouse,
  volume: VolumeX,
  activity: Activity,
};

function Rating({ value, reviews }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs text-gray-500">
      <span className="inline-flex items-center gap-0.5 text-amber-400">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            size={13}
            className={i < Math.round(value) ? 'fill-amber-400' : 'text-gray-300'}
          />
        ))}
      </span>
      <span className="font-semibold text-gray-700 tabular-nums">{value}</span>
      <span>({reviews} rentals)</span>
    </span>
  );
}

export function ProductDetailModal({ product, isAdded, isSingleton, onAdd, onClose }) {
  useModalBehaviour(product ? onClose : null);
  if (!product) return null;

  const ctaLabel = isAdded ? (isSingleton ? 'In your setup' : 'Add another') : 'Add to setup';

  return (
    <div className="modal-overlay modal-fade" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${product.name} details`}
        className="modal-box modal-pop relative !max-w-2xl !p-0 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid md:grid-cols-2">
          {/* Image side */}
          <div className="relative bg-gradient-to-b from-gray-50 to-gray-100 border-b md:border-b-0 md:border-r border-gray-200 p-8 flex items-center justify-center min-h-[240px]">
            {product.badge && (
              <span className="absolute top-4 left-4 text-[10px] font-bold tracking-[0.08em] uppercase bg-gray-900 text-white px-2.5 py-1 rounded-[6px]">
                {product.badge}
              </span>
            )}
            <ProductImage
              src={product.image}
              alt={product.name}
              className="w-full max-h-64 drop-shadow-xl"
            />
          </div>

          {/* Info side */}
          <div className="p-6 flex flex-col">
            <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-gray-400 mb-1">
              {product.category}
            </p>
            <h3 className="text-2xl font-bold text-gray-900 tracking-tight leading-tight">
              {product.name}
            </h3>
            <div className="mt-1.5 mb-3">
              <Rating value={product.rating} reviews={product.reviews} />
            </div>
            <p className="text-sm font-medium text-gray-700">{product.tagline}</p>
            <p className="text-[13px] text-gray-500 mt-1.5 leading-relaxed">
              {product.description}
            </p>

            <ul className="mt-4 grid grid-cols-2 gap-2">
              {product.specs.map((s) => {
                const Icon = SPEC_ICONS[s.icon] ?? Zap;
                return (
                  <li
                    key={s.label}
                    className="flex items-center gap-2 bg-neutral-50 border border-gray-200 rounded-[6px] px-2.5 py-2"
                  >
                    <Icon size={15} className="text-gray-400 shrink-0" />
                    <span className="min-w-0">
                      <span className="block text-[10px] text-gray-400 leading-tight">
                        {s.label}
                      </span>
                      <span className="block text-xs font-semibold text-gray-800 truncate">
                        {s.value}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
              <div>
                <span className="text-2xl font-extrabold text-gray-900 tabular-nums">
                  ${product.price}
                </span>
                <span className="text-xs text-gray-400">/mo</span>
              </div>
              <button
                type="button"
                className="modal-action-btn !flex-none px-6 bg-gray-900 text-white shadow-[0_4px_14px_rgba(0,0,0,0.2)] hover:bg-gray-700 active:scale-95 inline-flex items-center justify-center gap-1.5"
                onClick={() => {
                  if (isAdded && isSingleton) {
                    onClose();
                    return;
                  }
                  onAdd(product);
                  onClose();
                }}
              >
                {isAdded ? (
                  isSingleton ? (
                    <ShoppingCart size={15} />
                  ) : (
                    <Plus size={15} />
                  )
                ) : (
                  <Plus size={15} />
                )}
                {ctaLabel}
              </button>
            </div>
          </div>
        </div>

        <button
          type="button"
          aria-label="Close details"
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-[6px] bg-white/90 border border-gray-200 text-gray-500 hover:text-gray-900 shadow-sm"
        >
          <X size={15} />
        </button>
      </div>
    </div>
  );
}
