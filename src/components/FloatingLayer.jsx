import { ProductImage } from './ProductImage.jsx';
import { MonitorItem } from './scene/MonitorItem.jsx';
import { SceneRemoveButton } from './scene/SceneRemoveButton.jsx';

const FLOATING_MONITOR_SHADOW = 'drop-shadow(0 12px 24px rgba(0,0,0,0.7))';

function accessoryStyle(accessory) {
  if (accessory.slot === 'lamp') return { height: 70 };
  if (accessory.slot === 'keyboard') return { width: 100 };
  if (accessory.slot === 'mouse') return { width: 36 };
  return { width: 48 };
}

/** Shown when accessories exist but no desk anchors the scene yet. */
export function FloatingLayer({ monitors, accessories, onRemove }) {
  return (
    <div className="absolute bottom-[160px] left-1/2 -translate-x-1/2 flex max-w-full flex-wrap items-end justify-center gap-3.5 z-[5]">
      {monitors.length > 0 && (
        <div className="flex min-w-0 max-w-full flex-nowrap items-end justify-center gap-0">
          {monitors.map((m, i) => (
            <MonitorItem
              key={m.instanceId}
              monitor={m}
              index={i}
              onRemove={onRemove}
              shadow={FLOATING_MONITOR_SHADOW}
            />
          ))}
        </div>
      )}
      {accessories.map((acc, i) => (
        <div
          key={acc.instanceId}
          className="group-item scene-drop relative"
          style={{ animationDelay: `${(monitors.length + i) * 60}ms` }}
        >
          <SceneRemoveButton onRemove={() => onRemove('accessory', acc.instanceId)} />
          <ProductImage
            src={acc.image}
            alt={acc.name}
            style={{ ...accessoryStyle(acc), filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.6))' }}
          />
        </div>
      ))}
    </div>
  );
}
