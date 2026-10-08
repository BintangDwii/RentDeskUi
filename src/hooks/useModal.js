import { useEffect } from 'react';

/** Locks body scroll + closes on Escape. Only active when `active` is true. */
export function useModalBehaviour(onClose, active = true) {
  useEffect(() => {
    if (!active || !onClose) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose, active]);
}
