import { ProductImage } from './ProductImage.jsx';

export function EmptyState() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-slate-400/35">
      <div className="flex items-end gap-2 opacity-40 grayscale">
        <ProductImage src="/assets/desk-ergo.png" alt="" style={{ width: 200 }} />
        <ProductImage src="/assets/chair-aeron.png" alt="" style={{ width: 60 }} />
      </div>
      <p className="text-[13px] font-medium tracking-[0.04em]">
        Select items from the catalog to build your setup
      </p>
    </div>
  );
}
