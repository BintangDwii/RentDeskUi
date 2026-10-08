import { Check, Info, Plus, Star } from 'lucide-react';
import { ProductImage } from './ProductImage.jsx';

export function ProductCard({
  product,
  index = 0,
  onAdd,
  onDetail,
  isAdded = false,
  qty = 0,
  disabled = false,
  disabledReason = '',
}) {
  return (
    <div
      className={`product-card card-enter group ${isAdded ? '!border-primary' : ''} ${disabled ? 'opacity-75' : ''}`}
      style={{ animationDelay: `${(index % 6) * 40}ms` }}
      onClick={() => onDetail(product)}
      role="button"
      tabIndex={0}
      aria-pressed={isAdded}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onDetail(product);
        }
      }}
    >
      <div className="relative w-full aspect-square flex items-center justify-center bg-soft rounded-[14px] mb-2.5 overflow-hidden border border-border p-2">
        <ProductImage
          src={product.image}
          alt={product.name}
          className="w-full h-full drop-shadow-md transition-transform duration-200 group-hover:scale-110"
        />
        {product.badge && (
          <span className="absolute top-1.5 left-1.5 text-[9px] font-medium tracking-[0.06em] uppercase bg-primary text-white px-2 py-0.5 rounded-full">
            {product.badge}
          </span>
        )}
        {isAdded && (
          <span className="pop-in absolute bottom-1.5 left-1.5 inline-flex items-center gap-1 text-[9px] font-medium tracking-[0.06em] uppercase bg-primary text-white px-2 py-0.5 rounded-full">
            <Check size={10} /> {qty > 1 ? `×${qty}` : 'Added'}
          </span>
        )}
        <span className="absolute top-1.5 right-1.5 w-5 h-5 hidden group-hover:flex group-focus-within:flex items-center justify-center rounded-full bg-white shadow-md text-secondary">
          <Info size={12} />
        </span>
      </div>
      <p className="text-xs font-semibold text-primary mb-1 leading-snug w-full truncate">
        {product.name}
      </p>
      <p className="inline-flex items-center gap-1 text-[10px] text-secondary mb-1 tabular-nums">
        <Star size={11} className="fill-amber-400 text-amber-400 shrink-0" aria-hidden="true" />
        <span className="font-semibold text-primary">{product.rating}</span>
        <span className="truncate">({product.reviews})</span>
      </p>
      <p className="text-[11px] text-secondary leading-snug line-clamp-2 min-h-[28px] mb-1.5 w-full">
        {product.tagline}
      </p>
      {product.specs?.length > 0 && (
        <p className="flex items-center justify-center gap-1 mb-2 w-full min-w-0">
          {product.specs.slice(0, 2).map((s) => (
            <span
              key={s.label}
              title={`${s.label}: ${s.value}`}
              className="text-[9px] text-secondary border border-border rounded-full px-2 py-0.5 truncate max-w-full"
            >
              {s.value}
            </span>
          ))}
        </p>
      )}
      <p className="text-sm font-bold text-primary mb-2 tabular-nums">
        ${product.price}
        <span className="text-[10px] font-medium text-secondary">/mo</span>
      </p>
      <button
        type="button"
        disabled={disabled}
        title={
          disabled
            ? disabledReason
            : isAdded
              ? 'In your setup — click to view'
              : `Add ${product.name}`
        }
        aria-label={
          disabled
            ? `${product.name} — ${disabledReason}`
            : isAdded
              ? `${product.name} in setup — add again`
              : `Add ${product.name} to setup`
        }
        className={`add-btn justify-center active:scale-95 ${isAdded && !disabled ? '!bg-transparent !text-primary' : ''} disabled:opacity-50 disabled:cursor-not-allowed`}
        onClick={(e) => {
          e.stopPropagation();
          if (!disabled) onAdd(product);
        }}
      >
        {disabled ? (
          <>Max reached</>
        ) : isAdded ? (
          <>
            <Check size={11} /> {qty > 1 ? `Add · ×${qty}` : 'Added'}
          </>
        ) : (
          <>
            <Plus size={11} /> Add
          </>
        )}
      </button>
    </div>
  );
}
