import { useEffect } from 'react';
import { CheckCircle2, Undo2 } from 'lucide-react';

export function Toast({ toast, onDismiss }) {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onDismiss, 3500);
    return () => clearTimeout(t);
  }, [toast, onDismiss]);

  if (!toast) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="toast-enter fixed bottom-4 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-3 bg-primary text-white pl-4 pr-2.5 py-2.5 rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.25)] max-w-[calc(100vw-2rem)] mb-[env(safe-area-inset-bottom)]"
    >
      <CheckCircle2 size={16} className="text-white/70 shrink-0" aria-hidden="true" />
      <span className="text-[13px] font-medium overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
        {toast.message}
      </span>
      {toast.onUndo && (
        <button
          type="button"
          onClick={() => {
            toast.onUndo();
            onDismiss();
          }}
          className="inline-flex items-center gap-1 text-[12px] font-medium bg-white/15 hover:bg-white/25 px-4 py-2.5 min-h-[44px] rounded-full transition-colors shrink-0"
        >
          <Undo2 size={12} aria-hidden="true" /> Undo
        </button>
      )}
    </div>
  );
}
