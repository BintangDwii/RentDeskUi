import { ChairLayer } from './ChairLayer.jsx';
import { DeskLayer } from './DeskLayer.jsx';
import { EmptyState } from './EmptyState.jsx';
import { FloatingLayer } from './FloatingLayer.jsx';

/**
 * Visual canvas: total pill + scene (desk/chair/floating layers).
 * Item summary lives in the ActionBar below — canvas stays clean.
 */
export function Scene({ setup, total, lamps, keyboards, mice, isEmpty, onRemove }) {
  const showFloating = !setup.desk && (setup.monitors.length > 0 || setup.accessories.length > 0);

  return (
    <div className="glass-card p-5 relative">
      {/* Total badge */}
      <div className="absolute top-4 right-4 z-10 total-pill !bg-white/85 !backdrop-blur-md !shadow-lg">
        <span className="text-xs text-gray-500 font-medium">Monthly</span>
        <span className="text-xl font-extrabold text-gray-900 tabular-nums">${total}</span>
      </div>

      {/* Visual stage */}
      <div className="canvas-bg canvas-grid relative w-full h-[480px] overflow-hidden flex items-end justify-center">
        {isEmpty && <EmptyState />}

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
      </div>
    </div>
  );
}
