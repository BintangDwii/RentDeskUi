import { ShoppingCart } from 'lucide-react';

function SummaryRow({ icon, name, price }) {
  return (
    <li className="flex justify-between items-center text-[13px] text-gray-700 gap-2">
      <span>
        {icon} {name}
      </span>
      <span className="text-gray-900 font-bold text-xs shrink-0">${price}/mo</span>
    </li>
  );
}

export function CheckoutModal({ setup, total, onClose, onConfirm }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center">
            <ShoppingCart size={20} color="white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Great Choice!</h3>
            <p className="text-xs text-gray-500">Review your setup below</p>
          </div>
        </div>

        <div className="bg-neutral-50 rounded-[14px] px-4 py-3.5 border border-gray-200 mb-5">
          <p className="text-[11px] font-semibold text-gray-400 tracking-[0.08em] uppercase mb-2.5 border-b border-gray-200 pb-2">
            Your Setup
          </p>
          <ul className="list-none flex flex-col gap-1.5">
            {setup.desk && <SummaryRow icon="🖥" name={setup.desk.name} price={setup.desk.price} />}
            {setup.chair && (
              <SummaryRow icon="🪑" name={setup.chair.name} price={setup.chair.price} />
            )}
            {setup.monitors.map((m) => (
              <SummaryRow key={m.instanceId} icon="📺" name={m.name} price={m.price} />
            ))}
            {setup.accessories.map((a) => (
              <SummaryRow key={a.instanceId} icon="✨" name={a.name} price={a.price} />
            ))}
          </ul>
          <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between items-center">
            <span className="text-[13px] font-semibold text-gray-900">Total</span>
            <span className="text-xl font-extrabold text-gray-900">${total}/mo</span>
          </div>
        </div>

        <div className="flex gap-2.5">
          <button
            type="button"
            className="modal-action-btn bg-gray-100 text-gray-700 border border-gray-200"
            onClick={onClose}
          >
            Keep Editing
          </button>
          <button
            type="button"
            className="modal-action-btn bg-gray-900 text-white shadow-[0_4px_14px_rgba(0,0,0,0.2)]"
            onClick={onConfirm}
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
}
