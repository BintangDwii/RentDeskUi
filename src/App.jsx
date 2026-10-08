import { useState } from 'react';
import { CATEGORIES } from './data/catalog.js';
import { useSetup } from './hooks/useSetup.js';
import { ActionBar } from './components/ActionBar.jsx';
import { CartStrip } from './components/CartStrip.jsx';
import { CatalogPanel } from './components/CatalogPanel.jsx';
import { CheckoutModal } from './components/CheckoutModal.jsx';
import { Header } from './components/Header.jsx';
import { ProductDetailModal } from './components/ProductDetailModal.jsx';
import { Scene } from './components/Scene.jsx';

export default function App() {
  const [activeTab, setActiveTab] = useState(CATEGORIES.DESKS);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [detailProduct, setDetailProduct] = useState(null);
  const { setup, addToSetup, removeFromSetup, resetSetup, total, lamps, keyboards, mice, isEmpty } =
    useSetup();

  const isInSetup = (product) => {
    if (!product) return false;
    if (product.type === 'desk') return setup.desk?.id === product.id;
    if (product.type === 'chair') return setup.chair?.id === product.id;
    if (product.type === 'monitor') return setup.monitors.some((m) => m.id === product.id);
    return setup.accessories.some((a) => a.id === product.id);
  };

  const confirmOrder = () => {
    alert("Order 'placed'! Thanks for trying the demo.");
    setIsCheckingOut(false);
    resetSetup();
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb] text-gray-900 px-4 py-8 flex flex-col items-center">
      <Header />

      <div className="flex flex-col lg:flex-row gap-6 w-full max-w-[1100px] items-start">
        <CatalogPanel
          activeTab={activeTab}
          onTabChange={setActiveTab}
          setup={setup}
          onAdd={addToSetup}
          onDetail={setDetailProduct}
        />

        <div className="canvas-panel w-full lg:flex-1 flex flex-col gap-4">
          <CartStrip setup={setup} total={total} onRemove={removeFromSetup} />
          <Scene
            setup={setup}
            total={total}
            lamps={lamps}
            keyboards={keyboards}
            mice={mice}
            isEmpty={isEmpty}
            onRemove={removeFromSetup}
          />
          <ActionBar setup={setup} total={total} onCheckout={() => setIsCheckingOut(true)} />
        </div>
      </div>

      <ProductDetailModal
        product={detailProduct}
        isAdded={isInSetup(detailProduct)}
        onAdd={addToSetup}
        onClose={() => setDetailProduct(null)}
      />

      {isCheckingOut && (
        <CheckoutModal
          setup={setup}
          total={total}
          onClose={() => setIsCheckingOut(false)}
          onConfirm={confirmOrder}
          onRemove={removeFromSetup}
        />
      )}
    </div>
  );
}
