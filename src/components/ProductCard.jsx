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
      <div className="relative w-full aspect-square flex items-center justify-center self-stretch bg-soft rounded-[16px] mb-3 overflow-hidden border border-border p-3">
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
      <p className="text-[14px] font-bold text-primary leading-tight w-full truncate">
        {product.name}
      </p>
      <p className="flex items-center justify-start gap-1 mt-1 text-[11px] text-secondary tabular-nums w-full">
        <Star size={12} className="fill-amber-400 text-amber-400 shrink-0" aria-hidden="true" />
        <span className="font-semibold text-primary">{product.rating}</span>
        <span className="truncate">({product.reviews})</span>
      </p>
      <p className="text-[12px] font-medium text-secondary leading-snug line-clamp-2 min-h-[32px] mt-1.5 w-full">
        {product.tagline}
      </p>
      {product.specs?.length > 0 && (
        <p className="flex items-center justify-start gap-1.5 mt-2 w-full min-w-0 overflow-hidden">
          {product.specs.slice(0, 2).map((s) => (
            <span
              key={s.label}
              title={`${s.label}: ${s.value}`}
              className="text-[10px] font-medium text-secondary border border-border rounded-full px-2 py-0.5 truncate max-w-[50%]"
            >
              {s.value}
            </span>
          ))}
        </p>
      )}
      <div className="mt-auto pt-3 w-full flex items-end justify-between gap-2 min-w-0">
        <p className="shrink-0 leading-none tabular-nums">
          <span className="block text-[20px] sm:text-[22px] font-extrabold text-primary tracking-tight">
            ${product.price}
          </span>
          <span className="block text-[10px] font-medium text-secondary mt-0.5">/mo</span>
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
          className={`add-btn !w-auto shrink-0 !px-4 !py-2 !text-[12px] active:scale-95 ${isAdded && !disabled ? '!bg-transparent !text-primary' : ''} disabled:opacity-50 disabled:cursor-not-allowed`}
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
    </div>
  );
}
