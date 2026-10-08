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
    <span className="inline-flex items-center gap-1.5 text-[13px] text-secondary">
      <span className="inline-flex items-center gap-0.5 text-amber-400">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            size={15}
            className={i < Math.round(value) ? 'fill-amber-400' : 'text-gray-300'}
          />
        ))}
      </span>
      <span className="font-semibold text-primary tabular-nums">{value}</span>
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
        className="modal-box modal-pop relative !max-w-5xl max-h-[90vh] overflow-y-auto !p-0 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid lg:grid-cols-[1.05fr_1fr]">
          {/* Image side */}
          <div className="relative bg-soft border-b lg:border-b-0 lg:border-r border-border p-10 lg:p-12 flex items-center justify-center min-h-[320px] lg:min-h-[480px]">
            {product.badge && (
              <span className="absolute top-5 left-5 text-[10px] font-medium tracking-[0.08em] uppercase bg-primary text-white px-2.5 py-1 rounded-full">
                {product.badge}
              </span>
            )}
            <ProductImage
              src={product.image}
              alt={product.name}
              className="w-full max-h-80 lg:max-h-[420px] drop-shadow-xl"
            />
          </div>

          {/* Info side */}
          <div className="p-8 lg:p-10 flex flex-col">
            <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-secondary mb-1">
              {product.category}
            </p>
            <h3 className="text-3xl font-bold text-primary tracking-tight leading-tight">
              {product.name}
            </h3>
            <div className="mt-2 mb-4">
              <Rating value={product.rating} reviews={product.reviews} />
            </div>
            <p className="text-[15px] font-medium text-primary">{product.tagline}</p>
            <p className="text-sm text-secondary mt-1.5 leading-relaxed">
              {product.description}
            </p>

            <ul className="mt-5 grid grid-cols-2 gap-2.5">
              {product.specs.map((s) => {
                const Icon = SPEC_ICONS[s.icon] ?? Zap;
                return (
                  <li
                    key={s.label}
                    className="flex items-center gap-2.5 bg-tertiary border border-border rounded-[20px] px-3.5 py-3"
                  >
                    <span className="w-8 h-8 shrink-0 rounded-full bg-white border border-border flex items-center justify-center">
                      <Icon size={15} className="text-secondary" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[10px] text-secondary leading-tight">
                        {s.label}
                      </span>
                      <span className="block text-xs font-semibold text-primary">
                        {s.value}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-4 rounded-[20px] bg-tertiary border border-border p-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <span>
                <span className="block text-[10px] font-medium tracking-[0.06em] uppercase text-secondary">
                  Monthly
                </span>
                <span className="block text-sm font-bold text-primary tabular-nums mt-0.5">
                  ${product.price}/mo
                </span>
              </span>
              <span>
                <span className="block text-[10px] font-medium tracking-[0.06em] uppercase text-secondary">
                  Deposit
                </span>
                <span className="block text-sm font-bold text-primary tabular-nums mt-0.5">
                  ${product.price} refundable
                </span>
              </span>
              <span>
                <span className="block text-[10px] font-medium tracking-[0.06em] uppercase text-secondary">
                  Delivery
                </span>
                <span className="block text-sm font-bold text-primary mt-0.5">Free · 48h</span>
              </span>
            </div>

            <div className="mt-5 pt-5 border-t border-border flex items-center justify-between gap-3">
              <div>
                <span className="text-3xl font-bold text-primary tabular-nums">
                  ${product.price}
                </span>
                <span className="text-xs text-secondary">/mo</span>
              </div>
              <button
                type="button"
                className="modal-action-btn !flex-none btn-primary !px-8 !py-3"
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
                {ctaLabel} ↗
              </button>
            </div>
          </div>
        </div>

        <button
          type="button"
          aria-label="Close details"
          onClick={onClose}
          className="arrow-circle absolute top-4 right-4 !w-10 !h-10 !bg-white !text-secondary border border-border hover:!bg-soft hover:!text-primary"
        >
          <X size={15} />
        </button>
      </div>
    </div>
  );
}
