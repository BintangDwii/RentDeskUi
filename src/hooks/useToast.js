import { useState } from 'react';

/** Transient toast state with an optional undo action. */
export function useToast() {
  const [toast, setToast] = useState(null);

  const showToast = (message, onUndo) => setToast({ message, onUndo });
  const dismissToast = () => setToast(null);

  return { toast, showToast, dismissToast };
}
