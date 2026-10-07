import { useState } from 'react';
import { CATEGORIES } from './data/catalog.js';
import { useSetup } from './hooks/useSetup.js';
import { ActionBar } from './components/ActionBar.jsx';
import { CatalogPanel } from './components/CatalogPanel.jsx';
import { CheckoutModal } from './components/CheckoutModal.jsx';
import { Header } from './components/Header.jsx';
import { Scene } from './components/Scene.jsx';

export default function App() {
  const [activeTab, setActiveTab] = useState(CATEGORIES.DESKS);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const { setup, addToSetup, removeFromSetup, resetSetup, total, lamps, keyboards, mice, isEmpty } =
    useSetup();

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
        />

        <div className="canvas-panel w-full lg:flex-1 flex flex-col gap-4">
          <Scene
            setup={setup}
            total={total}
            lamps={lamps}
            keyboards={keyboards}
            mice={mice}
            isEmpty={isEmpty}
            onRemove={removeFromSetup}
          />
          <ActionBar total={total} onCheckout={() => setIsCheckingOut(true)} />
        </div>
      </div>

      {isCheckingOut && (
        <CheckoutModal
          setup={setup}
          total={total}
          onClose={() => setIsCheckingOut(false)}
          onConfirm={confirmOrder}
        />
      )}
    </div>
  );
}
