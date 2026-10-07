import { Plus } from 'lucide-react';
import { ProductImage } from './ProductImage.jsx';

export function ProductCard({ product, onAdd }) {
  return (
    <div className="product-card group" onClick={() => onAdd(product)}>
      <div className="w-full aspect-square flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 rounded-[12px] mb-2.5 overflow-hidden border border-gray-100 p-2">
        <ProductImage
          src={product.image}
          alt={product.name}
          className="w-full h-full drop-shadow-md transition-transform duration-200 group-hover:scale-110"
        />
      </div>
      <p className="text-xs font-semibold text-gray-900 mb-0.5 leading-snug">{product.name}</p>
      <p className="text-[11px] text-gray-400 mb-2 tabular-nums">
        ${product.price}
        <span className="text-[9px]">/mo</span>
      </p>
      <button type="button" className="add-btn w-full justify-center">
        <Plus size={11} /> Add
      </button>
    </div>
  );
}
