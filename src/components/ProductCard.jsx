import { Check, Info, Plus } from 'lucide-react';
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
      className={`product-card card-enter group ${isAdded ? '!border-gray-900 !shadow-[0_6px_20px_rgba(0,0,0,0.1)]' : ''} ${disabled ? 'opacity-75' : ''}`}
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
      <div className="relative w-full aspect-square flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 rounded-[6px] mb-2.5 overflow-hidden border border-gray-100 p-2">
        <ProductImage
          src={product.image}
          alt={product.name}
          className="w-full h-full drop-shadow-md transition-transform duration-200 group-hover:scale-110"
        />
        {product.badge && (
          <span className="absolute top-1.5 left-1.5 text-[9px] font-bold tracking-[0.06em] uppercase bg-gray-900 text-white px-2 py-0.5 rounded-[6px]">
            {product.badge}
          </span>
        )}
        {isAdded && (
          <span className="pop-in absolute bottom-1.5 left-1.5 inline-flex items-center gap-1 text-[9px] font-bold tracking-[0.06em] uppercase bg-emerald-600 text-white px-2 py-0.5 rounded-[6px]">
            <Check size={10} /> {qty > 1 ? `×${qty}` : 'Added'}
          </span>
        )}
        <span className="absolute top-1.5 right-1.5 w-5 h-5 hidden group-hover:flex group-focus-within:flex items-center justify-center rounded-[6px] bg-white shadow-md text-gray-500">
          <Info size={12} />
        </span>
      </div>
      <p className="text-xs font-semibold text-gray-900 mb-0.5 leading-snug">{product.name}</p>
      <p className="text-[11px] text-gray-400 mb-2 tabular-nums">
        ${product.price}
        <span className="text-[9px]">/mo</span>
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
        className={`add-btn w-full justify-center active:scale-95 ${isAdded && !disabled ? '!bg-white !text-gray-900 hover:!bg-gray-100' : ''} disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-900 disabled:hover:border-gray-900`}
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
