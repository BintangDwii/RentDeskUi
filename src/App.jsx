import { useState } from 'react';
import { CATEGORIES } from './data/catalog.js';
import { useSetupActions } from './hooks/useSetupActions.js';
import { isInSetup, isSingletonProduct } from './utils/setup.js';
import { ActionBar } from './components/ActionBar.jsx';
import { CartStrip } from './components/CartStrip.jsx';
import { CatalogPanel } from './components/CatalogPanel.jsx';
import { CheckoutModal } from './components/CheckoutModal.jsx';
import { Header } from './components/Header.jsx';
import { MobileCheckoutBar } from './components/MobileCheckoutBar.jsx';
import { ProductDetailModal } from './components/ProductDetailModal.jsx';
import { Scene } from './components/Scene.jsx';
import { Toast } from './components/Toast.jsx';

export default function App() {
  const [activeTab, setActiveTab] = useState(CATEGORIES.DESKS);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [detailProduct, setDetailProduct] = useState(null);
  const [placedOrder, setPlacedOrder] = useState(null);
  const {
    setup,
    total,
    lamps,
    keyboards,
    mice,
    plants,
    isEmpty,
    add,
    remove,
    clear,
    resetSetup,
    toast,
    dismissToast,
  } = useSetupActions();

  const handleBrowse = () => {
    setActiveTab(CATEGORIES.DESKS);
    document
      .getElementById('catalog-panel')
      ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  const confirmOrder = (order) => {
    setPlacedOrder(order);
    resetSetup();
  };

  const closeCheckout = () => {
    setIsCheckingOut(false);
    setPlacedOrder(null);
  };

  return (
    <div className="min-h-dvh bg-white text-primary px-4 xl:px-6 pt-safe pb-28 sm:pb-8 flex flex-col items-center">
      <div className="page-enter w-full max-w-[1400px] flex flex-col items-center">
        <Header />
      </div>

      <div className="page-enter-delay flex flex-col lg:flex-row gap-4 sm:gap-6 xl:gap-8 w-full max-w-[1400px] items-start">
        <CatalogPanel
          activeTab={activeTab}
          onTabChange={setActiveTab}
          setup={setup}
          onAdd={add}
          onDetail={setDetailProduct}
        />

        <div className="canvas-panel w-full lg:flex-1 flex flex-col gap-4 min-w-0">
          <CartStrip setup={setup} total={total} onRemove={remove} onClear={clear} />
          <Scene
            setup={setup}
            total={total}
            lamps={lamps}
            keyboards={keyboards}
            mice={mice}
            plants={plants}
            isEmpty={isEmpty}
            onRemove={remove}
            onBrowse={handleBrowse}
          />
          <ActionBar total={total} onCheckout={() => setIsCheckingOut(true)} />
        </div>
      </div>

      <MobileCheckoutBar total={total} onCheckout={() => setIsCheckingOut(true)} />

      <ProductDetailModal
        product={detailProduct}
        isAdded={isInSetup(setup, detailProduct)}
        isSingleton={isSingletonProduct(detailProduct)}
        onAdd={add}
        onClose={() => setDetailProduct(null)}
      />

      {isCheckingOut && (
        <CheckoutModal
          setup={setup}
          total={total}
          placedOrder={placedOrder}
          onClose={closeCheckout}
          onConfirm={confirmOrder}
          onRemove={remove}
        />
      )}

      <Toast toast={toast} onDismiss={dismissToast} />
    </div>
  );
}
