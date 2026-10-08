import { CATEGORIES, CAT_ICONS, MAX_MONITORS, PRODUCTS } from '../data/catalog.js';
import { ProductCard } from './ProductCard.jsx';

export function CatalogPanel({ activeTab, onTabChange, setup, onAdd, onDetail }) {
  const monitorsFull = setup.monitors.length >= MAX_MONITORS;

  const tabCount = (cat) => {
    if (cat === CATEGORIES.DESKS) return setup.desk ? 1 : 0;
    if (cat === CATEGORIES.CHAIRS) return setup.chair ? 1 : 0;
    return setup.monitors.length + setup.accessories.length;
  };

  const cardState = (product) => {
    if (product.type === 'desk') {
      const added = setup.desk?.id === product.id;
      return { isAdded: added, qty: added ? 1 : 0, disabled: false, disabledReason: '' };
    }
    if (product.type === 'chair') {
      const added = setup.chair?.id === product.id;
      return { isAdded: added, qty: added ? 1 : 0, disabled: false, disabledReason: '' };
    }
    if (product.type === 'monitor') {
      const qty = setup.monitors.filter((m) => m.id === product.id).length;
      const disabled = monitorsFull;
      return {
        isAdded: qty > 0,
        qty,
        disabled,
        disabledReason: disabled ? `Max ${MAX_MONITORS} monitors reached` : '',
      };
    }
    const qty = setup.accessories.filter((a) => a.id === product.id).length;
    return { isAdded: qty > 0, qty, disabled: false, disabledReason: '' };
  };

  return (
    <div
      id="catalog-panel"
      className="catalog-panel glass-card !rounded-[6px] w-full lg:w-[300px] shrink-0 flex flex-col h-[640px] max-h-[320px] lg:max-h-none lg:sticky lg:top-4 overflow-hidden"
    >
      {/* Tabs */}
      <div className="flex border-b border-border" role="tablist" aria-label="Catalog categories">
        {Object.values(CATEGORIES).map((cat) => {
          const Icon = CAT_ICONS[cat];
          const active = activeTab === cat;
          const count = tabCount(cat);
          return (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={active}
              aria-label={`${cat}, ${count} selected`}
              className={`tab-btn ${active ? 'active' : ''}`}
              onClick={() => onTabChange(cat)}
            >
              <Icon size={13} aria-hidden="true" /> {cat}
              {count > 0 && (
                <span
                  aria-hidden="true"
                  className={`text-[10px] font-medium px-2 py-0.5 rounded-full tabular-nums border ${
                    active
                      ? 'bg-primary text-white border-primary'
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
      <div className="flex-1 overflow-y-auto p-3.5">
        <div key={activeTab} className="grid grid-cols-2 gap-2.5">
          {PRODUCTS.filter((p) => p.category === activeTab).map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i}
              onAdd={onAdd}
              onDetail={onDetail}
              {...cardState(product)}
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
