import { ArrowLeft, MousePointerClick } from 'lucide-react';
import { ProductImage } from './ProductImage.jsx';

export function EmptyState({ onBrowse }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
      <div className="flex items-end gap-2 opacity-40 grayscale" aria-hidden="true">
        <ProductImage src="/assets/desk-ergo.png" alt="" style={{ width: 200 }} />
        <ProductImage src="/assets/chair-aeron.png" alt="" style={{ width: 60 }} />
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-600">Your canvas is empty</p>
        <p className="text-[13px] text-gray-500 mt-1">
          Select items from the catalog to build your setup
        </p>
      </div>
      {onBrowse && (
        <button
          type="button"
          onClick={onBrowse}
          className="inline-flex items-center gap-2 text-[13px] font-semibold bg-gray-900 text-white px-4 py-2.5 rounded-[8px] shadow-md hover:bg-gray-700 hover:-translate-y-px transition-all"
        >
          <MousePointerClick size={15} aria-hidden="true" />
          Start with a desk
          <ArrowLeft size={13} aria-hidden="true" className="rotate-180 opacity-60" />
        </button>
      )}
    </div>
  );
}
