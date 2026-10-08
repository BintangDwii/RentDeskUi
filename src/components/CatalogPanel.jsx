import { CATEGORIES, CAT_ICONS, MAX_MONITORS, PRODUCTS } from '../data/catalog.js';
import { getCardState, getTabCount } from '../utils/setup.js';
import { ProductCard } from './ProductCard.jsx';

export function CatalogPanel({ activeTab, onTabChange, setup, onAdd, onDetail }) {
  const monitorsFull = setup.monitors.length >= MAX_MONITORS;

  return (
    <div
      id="catalog-panel"
      className="catalog-panel glass-card !rounded-[6px] w-full lg:w-[400px] shrink-0 flex flex-col max-h-[70vh] lg:max-h-none lg:h-[720px] lg:sticky lg:top-4 overflow-hidden"
    >
      {/* Tabs */}
      <div
        className="flex shrink-0 border-b border-border overflow-x-auto no-scrollbar snap-x bg-white rounded-t-[6px]"
        role="tablist"
        aria-label="Catalog categories"
      >
        {Object.values(CATEGORIES).map((cat) => {
          const Icon = CAT_ICONS[cat];
          const active = activeTab === cat;
          const count = getTabCount(setup, cat);
          return (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={active}
              aria-label={`${cat}, ${count} selected`}
              className={`tab-btn flex-none min-w-0 snap-start ${active ? 'active' : ''}`}
              onClick={() => onTabChange(cat)}
            >
              <Icon size={13} aria-hidden="true" />{' '}
              <span className="truncate">{cat}</span>
              {count > 0 && (
                <span
                  aria-hidden="true"
                  className={`text-[10px] font-medium px-2 py-0.5 rounded-full tabular-nums border ${active
                      ? 'bg-accent text-white border-accent'
                      : 'bg-tertiary text-secondary border-border'
                    }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="flex-1 min-h-0 overflow-y-auto p-3 mt-2 sm:p-4">
        <div key={activeTab} className="grid grid-cols-2 gap-2.5 sm:gap-3">
          {PRODUCTS.filter((p) => p.category === activeTab).map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i}
              onAdd={onAdd}
              onDetail={onDetail}
              {...getCardState(setup, product)}
            />
          ))}
        </div>
        {activeTab === CATEGORIES.ACCESSORIES && monitorsFull && (
          <p
            role="status"
            className="pill !text-[11px] justify-center text-center mt-3 !text-amber-900 !border-amber-200 !bg-amber-50"
          >
            Max {MAX_MONITORS} monitors reached — remove one to swap
          </p>
        )}
      </div>
    </div>
  );
}
