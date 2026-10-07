import { ShoppingCart } from 'lucide-react';
import { ProductImage } from './ProductImage.jsx';

function SummaryRow({ image, name, price }) {
  return (
    <li className="flex justify-between items-center text-[13px] text-gray-700 gap-2.5 py-0.5">
      <span className="inline-flex items-center gap-2.5 min-w-0">
        <span className="w-9 h-9 shrink-0 flex items-center justify-center bg-white border border-gray-200 rounded-[10px] p-1">
          <ProductImage src={image} alt="" className="w-full h-full" />
        </span>
        <span className="truncate font-medium">{name}</span>
      </span>
      <span className="text-gray-900 font-bold text-xs shrink-0 tabular-nums">${price}/mo</span>
    </li>
  );
}

export function CheckoutModal({ setup, total, onClose, onConfirm }) {
  return (
    <div className="modal-overlay modal-fade" onClick={onClose}>
      <div className="modal-box modal-pop" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-800 to-gray-950 flex items-center justify-center shadow-md">
            <ShoppingCart size={20} color="white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 tracking-tight">Great Choice!</h3>
            <p className="text-xs text-gray-500">Review your setup below</p>
          </div>
        </div>

        <div className="bg-neutral-50 rounded-[14px] px-4 py-3.5 border border-gray-200 mb-5">
          <p className="text-[11px] font-semibold text-gray-400 tracking-[0.08em] uppercase mb-2 border-b border-gray-200 pb-2">
            Your Setup
          </p>
          <ul className="list-none flex flex-col gap-1">
            {setup.desk && (
              <SummaryRow
                image={setup.desk.image}
                name={setup.desk.name}
                price={setup.desk.price}
              />
            )}
            {setup.chair && (
              <SummaryRow
                image={setup.chair.image}
                name={setup.chair.name}
                price={setup.chair.price}
              />
            )}
            {setup.monitors.map((m) => (
              <SummaryRow key={m.instanceId} image={m.image} name={m.name} price={m.price} />
            ))}
            {setup.accessories.map((a) => (
              <SummaryRow key={a.instanceId} image={a.image} name={a.name} price={a.price} />
            ))}
          </ul>
          <div className="border-t border-gray-200 mt-2.5 pt-3 flex justify-between items-center">
            <span className="text-[13px] font-semibold text-gray-900">Total</span>
            <span className="text-xl font-extrabold text-gray-900 tabular-nums">${total}/mo</span>
          </div>
        </div>

        <div className="flex gap-2.5">
          <button
            type="button"
            className="modal-action-btn bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
            onClick={onClose}
          >
            Keep Editing
          </button>
          <button
            type="button"
            className="modal-action-btn bg-gray-900 text-white shadow-[0_4px_14px_rgba(0,0,0,0.2)] hover:bg-gray-700"
            onClick={onConfirm}
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
}
