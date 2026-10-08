import { useState } from 'react';
import { CATEGORIES, MAX_MONITORS, SINGLETON_ACCESSORY_IDS, SINGLETON_ACCESSORY_SLOTS } from './data/catalog.js';
import { useSetup } from './hooks/useSetup.js';
import { ActionBar } from './components/ActionBar.jsx';
import { CartStrip } from './components/CartStrip.jsx';
import { CatalogPanel } from './components/CatalogPanel.jsx';
import { CheckoutModal } from './components/CheckoutModal.jsx';
import { Header } from './components/Header.jsx';
import { ProductDetailModal } from './components/ProductDetailModal.jsx';
import { Scene } from './components/Scene.jsx';
import { Toast } from './components/Toast.jsx';

function isSingletonProduct(product) {
  if (!product) return false;
  if (product.type === 'desk' || product.type === 'chair') return true;
  if (SINGLETON_ACCESSORY_IDS.includes(product.id)) return true;
  return Boolean(product.slot && SINGLETON_ACCESSORY_SLOTS.includes(product.slot));
}

export default function App() {
  const [activeTab, setActiveTab] = useState(CATEGORIES.DESKS);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [detailProduct, setDetailProduct] = useState(null);
  const [toast, setToast] = useState(null);
  const [placedOrder, setPlacedOrder] = useState(null);
  const {
    setup,
    addToSetup,
    removeFromSetup,
    resetSetup,
    restoreSetup,
    total,
    lamps,
    keyboards,
    mice,
    isEmpty,
  } = useSetup();

  const isInSetup = (product) => {
    if (!product) return false;
    if (product.type === 'desk') return setup.desk?.id === product.id;
    if (product.type === 'chair') return setup.chair?.id === product.id;
    if (product.type === 'monitor') return setup.monitors.some((m) => m.id === product.id);
    return setup.accessories.some((a) => a.id === product.id);
  };

  const snapshot = () => JSON.parse(JSON.stringify(setup));

  const handleAdd = (product) => {
    if (!product) return;
    if (product.type === 'monitor' && setup.monitors.length >= MAX_MONITORS) {
      setToast({ message: `Max ${MAX_MONITORS} monitors — remove one to swap` });
      return;
    }
    // Singleton re-add of the same item is a no-op — acknowledge, don't duplicate work
    if (isSingletonProduct(product) && isInSetup(product)) {
      setToast({ message: `${product.name} is already in your setup` });
      return;
    }
    const prev = snapshot();
    // Detect replacement for friendly copy
    let replaced = null;
    if (product.type === 'desk' && setup.desk && setup.desk.id !== product.id)
      replaced = setup.desk.name;
    if (product.type === 'chair' && setup.chair && setup.chair.id !== product.id)
      replaced = setup.chair.name;
    if (product.type === 'accessory' && product.slot) {
      const occupant = setup.accessories.find(
        (a) => a.slot === product.slot && a.id !== product.id
      );
      if (occupant) replaced = occupant.name;
    }

    addToSetup(product);
    setToast({
      message: replaced ? `Swapped ${replaced} → ${product.name}` : `${product.name} added`,
      onUndo: () => restoreSetup(prev),
    });
  };

  const findName = (type, instanceId) => {
    if (type === 'desk') return setup.desk?.name ?? 'Desk';
    if (type === 'chair') return setup.chair?.name ?? 'Chair';
    const pool = type === 'monitor' ? setup.monitors : setup.accessories;
    return pool.find((i) => (i.instanceId ?? i.id) === instanceId)?.name ?? 'Item';
  };

  const handleRemove = (type, instanceId = null) => {
    const name = findName(type, instanceId);
    const prev = snapshot();
    removeFromSetup(type, instanceId);
    setToast({ message: `${name} removed`, onUndo: () => restoreSetup(prev) });
  };

  const handleClear = () => {
    if (isEmpty) return;
    const prev = snapshot();
    resetSetup();
    setToast({ message: 'Setup cleared', onUndo: () => restoreSetup(prev) });
  };

  const handleBrowse = () => {
    setActiveTab(CATEGORIES.DESKS);
    document
      .getElementById('catalog-panel')
      ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  const confirmOrder = (order) => {
    // order: { contract, months, monthly } from CheckoutModal
    setPlacedOrder(order);
    resetSetup();
  };

  const closeCheckout = () => {
    setIsCheckingOut(false);
    setPlacedOrder(null);
  };

  return (
    <div className="min-h-screen bg-white text-primary px-4 xl:px-6 py-8 flex flex-col items-center">
      <div className="page-enter w-full max-w-[1400px] flex flex-col items-center">
        <Header />
      </div>

      <div className="page-enter-delay flex flex-col lg:flex-row gap-4 sm:gap-6 xl:gap-8 w-full max-w-[1400px] items-start">
        <CatalogPanel
          activeTab={activeTab}
          onTabChange={setActiveTab}
          setup={setup}
          onAdd={handleAdd}
          onDetail={setDetailProduct}
        />

        <div className="canvas-panel w-full lg:flex-1 flex flex-col gap-4 min-w-0">
          <CartStrip setup={setup} total={total} onRemove={handleRemove} onClear={handleClear} />
          <Scene
            setup={setup}
            total={total}
            lamps={lamps}
            keyboards={keyboards}
            mice={mice}
            isEmpty={isEmpty}
            onRemove={handleRemove}
            onBrowse={handleBrowse}
          />
          <ActionBar total={total} onCheckout={() => setIsCheckingOut(true)} />
        </div>
      </div>

      <ProductDetailModal
        product={detailProduct}
        isAdded={isInSetup(detailProduct)}
        isSingleton={isSingletonProduct(detailProduct)}
        onAdd={handleAdd}
        onClose={() => setDetailProduct(null)}
      />

      {isCheckingOut && (
        <CheckoutModal
          setup={setup}
          total={total}
          placedOrder={placedOrder}
          onClose={closeCheckout}
          onConfirm={confirmOrder}
          onRemove={handleRemove}
        />
      )}

      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </div>
  );
}
