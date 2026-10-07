import { Info, Plus } from 'lucide-react';
import { ProductImage } from './ProductImage.jsx';

export function ProductCard({ product, onAdd, onDetail }) {
  return (
    <div className="product-card group" onClick={() => onDetail(product)}>
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
        <span className="absolute top-1.5 right-1.5 w-5 h-5 hidden group-hover:flex items-center justify-center rounded-[6px] bg-white shadow-md text-gray-500">
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
        className="add-btn w-full justify-center"
        onClick={(e) => {
          e.stopPropagation();
          onAdd(product);
        }}
      >
        <Plus size={11} /> Add
      </button>
    </div>
  );
}
