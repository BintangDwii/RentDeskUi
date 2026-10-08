import { RENTAL_PLANS } from '../../data/catalog.js';
import { SectionTitle } from './SectionTitle.jsx';

/** Rental-duration selector driven by the RENTAL_PLANS catalog data. */
export function RentalDuration({ selectedMonths, onSelect }) {
  return (
    <div className="mb-5">
      <SectionTitle>Rental duration</SectionTitle>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-2">
        {RENTAL_PLANS.map((p) => {
          const active = p.months === selectedMonths;
          return (
            <button
              key={p.months}
              type="button"
              onClick={() => onSelect(p.months)}
              className={`rounded-[20px] border px-2 py-3 text-center transition-all duration-200 ${
                active
                  ? 'border-primary bg-primary text-white'
                  : 'border-border bg-white text-primary hover:border-primary'
              }`}
            >
              <span className="block text-sm font-medium tabular-nums">{p.label}</span>
              {p.discount > 0 ? (
                <span
                  className={`inline-block mt-1.5 text-[10px] font-medium px-2 py-0.5 rounded-full ${
                    active
                      ? 'bg-white/15 text-white'
                      : 'bg-tertiary text-secondary border border-border'
                  }`}
                >
                  Save {Math.round(p.discount * 100)}%
                </span>
              ) : (
                <span className="block text-[10px] text-secondary mt-1.5">No commitment</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
