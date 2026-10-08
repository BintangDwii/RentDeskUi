import { ChairLayer } from './ChairLayer.jsx';
import { DeskLayer } from './DeskLayer.jsx';
import { EmptyState } from './EmptyState.jsx';
import { FloatingLayer } from './FloatingLayer.jsx';
import { useAnimatedNumber } from '../hooks/useAnimatedNumber.js';

/**
 * Visual canvas: total pill + scene (desk/chair/floating layers).
 * Item summary lives in the ActionBar below — canvas stays clean.
 */
export function Scene({ setup, total, lamps, keyboards, mice, isEmpty, onRemove, onBrowse }) {
  const showFloating = !setup.desk && (setup.monitors.length > 0 || setup.accessories.length > 0);
  const animatedTotal = Math.round(useAnimatedNumber(total));

  return (
    <div className="glass-card p-5 relative !shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
      {/* Total badge */}
      <div className="absolute top-4 right-4 z-10 total-pill !bg-white/85 !backdrop-blur-md !shadow-lg">
        <span className="text-xs text-gray-600 font-medium">Monthly</span>
        <span className="text-xl font-extrabold text-gray-900 tabular-nums" aria-live="polite">
          ${animatedTotal}
        </span>
      </div>

      {/* Visual stage */}
      <div className="canvas-bg canvas-grid relative w-full h-[480px] max-h-[60vh] min-h-[380px] overflow-hidden flex items-end justify-center">
        {isEmpty && <EmptyState onBrowse={onBrowse} />}

        {/* Studio floor */}
        {!isEmpty && <div className="canvas-floor" aria-hidden="true" />}

        {/* Scene wrapper — centers everything horizontally */}
        <div className="relative w-full max-w-[580px] h-full">
          {setup.desk && (
            <DeskLayer
              desk={setup.desk}
              monitors={setup.monitors}
              lamps={lamps}
              keyboards={keyboards}
              mice={mice}
              onRemove={onRemove}
            />
          )}

          {setup.chair && <ChairLayer chair={setup.chair} onRemove={onRemove} />}

          {showFloating && (
            <FloatingLayer
              monitors={setup.monitors}
              accessories={setup.accessories}
              onRemove={onRemove}
            />
          )}
        </div>

        {/* Hint strip when desk missing but items floating */}
        {showFloating && (
          <p className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[11px] font-medium text-gray-500 bg-white/85 backdrop-blur px-3 py-1.5 rounded-full border border-gray-200 shadow-sm whitespace-nowrap">
            Add a desk to anchor your setup
          </p>
        )}
      </div>
    </div>
  );
}
