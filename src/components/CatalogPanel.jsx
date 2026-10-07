import { CATEGORIES, CAT_ICONS, MAX_MONITORS, PRODUCTS } from '../data/catalog.js';
import { ProductCard } from './ProductCard.jsx';

export function CatalogPanel({ activeTab, onTabChange, setup, onAdd, onDetail }) {
  const monitorsFull = setup.monitors.length >= MAX_MONITORS;

  return (
    <div className="catalog-panel glass-card w-full lg:w-[300px] shrink-0 flex flex-col h-[640px] max-h-[320px] lg:max-h-none overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {Object.values(CATEGORIES).map((cat) => {
          const Icon = CAT_ICONS[cat];
          return (
            <button
              key={cat}
              type="button"
              className={`tab-btn ${activeTab === cat ? 'active' : ''}`}
              onClick={() => onTabChange(cat)}
            >
              <Icon size={13} /> {cat}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto p-3.5">
        <div className="grid grid-cols-2 gap-2.5">
          {PRODUCTS.filter((p) => p.category === activeTab).map((product) => (
            <ProductCard key={product.id} product={product} onAdd={onAdd} onDetail={onDetail} />
          ))}
        </div>
        {activeTab === CATEGORIES.ACCESSORIES && monitorsFull && (
          <p className="text-center mt-3 text-[11px] text-amber-900 bg-amber-100 px-3 py-1.5 rounded-[6px] border border-amber-200">
            Max {MAX_MONITORS} monitors reached
          </p>
        )}
      </div>
    </div>
  );
}
