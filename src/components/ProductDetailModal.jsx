import { Modal } from './ui/Modal.jsx';
import { ProductImagePanel } from './product/ProductImagePanel.jsx';
import { ProductInfoPanel } from './product/ProductInfoPanel.jsx';

export function ProductDetailModal({ product, isAdded, isSingleton, onAdd, onClose }) {
  if (!product) return null;

  return (
    <Modal
      onClose={onClose}
      label={`${product.name} details`}
      className="!max-w-5xl max-h-[90vh] overflow-y-auto overflow-x-hidden !p-0"
      closeButton
      closeLabel="Close details"
    >
      <div className="grid lg:grid-cols-[1.05fr_1fr]">
        <ProductImagePanel product={product} />
        <ProductInfoPanel
          product={product}
          isAdded={isAdded}
          isSingleton={isSingleton}
          onAdd={onAdd}
          onClose={onClose}
        />
      </div>
    </Modal>
  );
}
