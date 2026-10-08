import { Plus, ShoppingCart } from 'lucide-react';
import { Rating } from '../ui/Rating.jsx';
import { ProductSpecList } from './ProductSpecList.jsx';

function PriceFacts({ price }) {
  const facts = [
    { label: 'Monthly', value: `$${price}/mo` },
    { label: 'Deposit', value: `$${price} refundable` },
    { label: 'Delivery', value: 'Free · 48h' },
  ];
  return (
    <div className="mt-4 rounded-[20px] bg-tertiary border border-border p-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
      {facts.map((f) => (
        <span key={f.label}>
          <span className="block text-[10px] font-medium tracking-[0.06em] uppercase text-secondary">
            {f.label}
          </span>
          <span className="block text-sm font-bold text-primary tabular-nums mt-0.5">
            {f.value}
          </span>
        </span>
      ))}
    </div>
  );
}

/** Right-hand info column: name, rating, description, specs, price and CTA. */
export function ProductInfoPanel({ product, isAdded, isSingleton, onAdd, onClose }) {
  const ctaLabel = isAdded ? (isSingleton ? 'In your setup' : 'Add another') : 'Add to setup';
  const showCartIcon = isAdded && isSingleton;

  const handleAdd = () => {
    if (showCartIcon) {
      onClose();
      return;
    }
    onAdd(product);
    onClose();
  };

  return (
    <div className="p-6 sm:p-8 lg:p-10 flex flex-col">
      <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-secondary mb-1">
        {product.category}
      </p>
      <h3 className="text-2xl sm:text-3xl font-bold text-primary tracking-tight leading-tight">
        {product.name}
      </h3>
      <div className="mt-2 mb-4">
        <Rating value={product.rating} reviews={product.reviews} />
      </div>
      <p className="text-[15px] font-medium text-primary">{product.tagline}</p>
      <p className="text-sm text-secondary mt-1.5 leading-relaxed">{product.description}</p>

      <ProductSpecList specs={product.specs} />
      <PriceFacts price={product.price} />

      <div className="mt-5 pt-5 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <span className="text-2xl sm:text-3xl font-bold text-primary tabular-nums">
            ${product.price}
          </span>
          <span className="text-xs text-secondary">/mo</span>
        </div>
        <button
          type="button"
          className="modal-action-btn sm:!flex-none btn-primary !px-8 !py-3 w-full justify-center sm:w-auto"
          onClick={handleAdd}
        >
          {showCartIcon ? <ShoppingCart size={15} /> : <Plus size={15} />}
          {ctaLabel} ↗
        </button>
      </div>
    </div>
  );
}
