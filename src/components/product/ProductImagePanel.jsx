import { ProductImage } from '../ProductImage.jsx';

/** Left-hand product photo panel for the detail modal. */
export function ProductImagePanel({ product }) {
  return (
    <div className="relative bg-soft border-b lg:border-b-0 lg:border-r border-border p-6 min-h-[220px] sm:p-10 lg:p-12 sm:min-h-[320px] lg:min-h-[480px] flex items-center justify-center">
      {product.badge && (
        <span className="absolute top-5 left-5 text-[10px] font-medium tracking-[0.08em] uppercase bg-primary text-white px-2.5 py-1 rounded-full">
          {product.badge}
        </span>
      )}
      <ProductImage
        src={product.image}
        alt={product.name}
        className="w-full max-h-56 sm:max-h-80 lg:max-h-[420px] drop-shadow-xl"
      />
    </div>
  );
}
