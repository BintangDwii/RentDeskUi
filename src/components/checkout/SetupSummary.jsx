import { X } from 'lucide-react';
import { ProductImage } from '../ProductImage.jsx';
import { SectionTitle } from './SectionTitle.jsx';

function ItemRow({ image, name, price, onRemove }) {
  return (
    <li className="flex justify-between items-center gap-2.5 py-1.5">
      <span className="inline-flex items-center gap-2.5 min-w-0">
        <span className="w-11 h-11 shrink-0 flex items-center justify-center bg-white border border-border rounded-[12px] p-1">
          <ProductImage src={image} alt="" className="w-full h-full" />
        </span>
        <span className="truncate text-sm font-medium text-primary" title={name}>
          {name}
        </span>
      </span>
      <span className="inline-flex items-center gap-2 shrink-0">
        <span className="text-primary font-semibold text-xs tabular-nums">${price}/mo</span>
        <button
          type="button"
          aria-label={`Remove ${name}`}
          onClick={onRemove}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-soft text-secondary hover:bg-red-100 hover:text-red-600 transition-colors"
        >
          <X size={13} />
        </button>
      </span>
    </li>
  );
}

/** Left column: every setup item grouped by category. */
export function SetupSummary({ groups }) {
  return (
    <div className="min-w-0">
      <SectionTitle>Your setup</SectionTitle>
      <div className="bg-tertiary rounded-[20px] p-4 border border-border flex flex-col gap-3.5 md:max-h-[600px] md:overflow-y-auto">
        {groups.map((g) => (
          <div key={g.title}>
            <p className="text-[11px] font-medium tracking-[0.08em] uppercase text-secondary mb-1.5">
              {g.title}
            </p>
            <ul className="list-none flex flex-col">
              {g.rows.map((r) => (
                <ItemRow key={r.key} {...r} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
