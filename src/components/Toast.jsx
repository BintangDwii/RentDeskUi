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
      className="toast-enter fixed bottom-5 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-3 bg-gray-950 text-white pl-4 pr-2.5 py-2.5 rounded-[12px] shadow-[0_12px_40px_rgba(0,0,0,0.4)] border border-white/10 max-w-[calc(100vw-2rem)]"
    >
      <CheckCircle2 size={16} className="text-emerald-400 shrink-0" aria-hidden="true" />
      <span className="text-[13px] font-medium whitespace-nowrap overflow-hidden text-ellipsis">
        {toast.message}
      </span>
      {toast.onUndo && (
        <button
          type="button"
          onClick={() => {
            toast.onUndo();
            onDismiss();
          }}
          className="inline-flex items-center gap-1 text-[12px] font-bold bg-white/10 hover:bg-white/20 px-2.5 py-1.5 rounded-[8px] transition-colors shrink-0"
        >
          <Undo2 size={12} aria-hidden="true" /> Undo
        </button>
      )}
    </div>
  );
}
