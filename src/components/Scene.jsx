import { ChairLayer } from './ChairLayer.jsx';
import { DeskLayer } from './DeskLayer.jsx';
import { EmptyState } from './EmptyState.jsx';
import { FloatingLayer } from './FloatingLayer.jsx';
import { ProductImage } from './ProductImage.jsx';

function SceneLabel({ image, name }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.06em] pl-1 pr-3 py-1 rounded-full uppercase bg-white border border-gray-200 text-gray-700 shadow-sm">
      <ProductImage src={image} alt="" className="w-[18px] h-[18px] rounded-full bg-gray-50" />
      {name}
    </span>
  );
}

/**
 * Visual canvas: total pill + scene (desk/chair/floating layers)
 * + label strip below the scene so tags never overlap sprites.
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

      {/* Item labels strip */}
      {(setup.desk || setup.chair) && (
        <div className="flex items-center justify-center gap-2 pt-3.5 flex-wrap">
          {setup.desk && <SceneLabel image={setup.desk.image} name={setup.desk.name} />}
          {setup.chair && <SceneLabel image={setup.chair.image} name={setup.chair.name} />}
        </div>
      )}
    </div>
  );
}
