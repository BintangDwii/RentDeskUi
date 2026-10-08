import { X } from 'lucide-react';
import { useModalBehaviour } from '../../hooks/useModal.js';

/**
 * Shared modal shell: overlay + dialog, Escape and scroll-lock via
 * `useModalBehaviour`, click-outside to close, and an optional corner
 * close button. Callers own the dialog sizing/padding via `className`.
 */
export function Modal({
  active = true,
  onClose,
  label,
  className = '',
  closeButton = false,
  closeLabel = 'Close',
  children,
}) {
  useModalBehaviour(onClose, active);
  if (!active) return null;

  return (
    <div className="modal-overlay modal-fade" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className={`modal-box modal-pop relative ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        {closeButton && (
          <button
            type="button"
            aria-label={closeLabel}
            onClick={onClose}
            className="arrow-circle absolute top-4 right-4 !w-10 !h-10 !bg-white !text-secondary border border-border hover:!bg-soft hover:!text-primary"
          >
            <X size={15} />
          </button>
        )}
      </div>
    </div>
  );
}
