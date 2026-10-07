import { ProductImage } from './ProductImage.jsx';

export function EmptyState() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
      <div className="flex items-end gap-2 opacity-40 grayscale">
        <ProductImage src="/assets/desk-ergo.png" alt="" style={{ width: 200 }} />
        <ProductImage src="/assets/chair-aeron.png" alt="" style={{ width: 60 }} />
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-500">Your canvas is empty</p>
        <p className="text-[13px] text-gray-400 mt-1">
          Select items from the catalog to build your setup
        </p>
      </div>
    </div>
  );
}
