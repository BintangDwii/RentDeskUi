import { CheckCircle2 } from 'lucide-react';

/** Confirmation view shown after the order is placed. */
export function OrderSuccess({ order, onClose }) {
  return (
    <div className="text-center py-8 px-4">
      <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center mb-5">
        <CheckCircle2 size={32} className="text-emerald-600" aria-hidden="true" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">
        Order placed — thank you!
      </h3>
      <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
        Your {order.months}-month rental
        {order.contract ? (
          <>
            {' '}
            —{' '}
            <span className="font-bold text-gray-900 tabular-nums">${order.contract}</span> total (
            <span className="tabular-nums">${order.monthly}/mo</span>)
          </>
        ) : null}{' '}
        is confirmed for this demo. We&apos;ll deliver &amp; assemble anywhere in Bali within 48h.
      </p>
      <div className="flex gap-3 max-w-sm mx-auto mt-7">
        <button type="button" autoFocus className="modal-action-btn btn-primary" onClick={onClose}>
          Start a new setup
        </button>
      </div>
    </div>
  );
}
