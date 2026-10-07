import { Plus } from 'lucide-react';
import { ProductImage } from './ProductImage.jsx';

export function ProductCard({ product, onAdd }) {
  return (
    <div className="product-card" onClick={() => onAdd(product)}>
      <div className="w-[72px] h-[72px] flex items-center justify-center bg-neutral-50 rounded-[14px] mb-2.5 overflow-hidden border border-gray-200">
        <ProductImage src={product.image} alt={product.name} className="w-full h-full" />
      </div>
      <p className="text-xs font-semibold text-gray-900 mb-1 leading-snug">{product.name}</p>
      <p className="text-[11px] text-gray-400 mb-2.5">
        ${product.price}
        <span className="text-[9px]">/mo</span>
      </p>
      <button type="button" className="add-btn">
        <Plus size={11} /> Add
      </button>
    </div>
  );
}
