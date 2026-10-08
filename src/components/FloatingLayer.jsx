import { getMonitorWidth } from '../utils/layout.js';
import { ProductImage } from './ProductImage.jsx';
import { RemoveButton } from './RemoveButton.jsx';

function accessoryStyle(accessory) {
  if (accessory.slot === 'lamp') return { height: 70 };
  if (accessory.slot === 'keyboard') return { width: 100 };
  if (accessory.slot === 'mouse') return { width: 36 };
  return { width: 48 };
}

/** Shown when accessories exist but no desk anchors the scene yet. */
export function FloatingLayer({ monitors, accessories, onRemove }) {
  return (
    <div className="absolute bottom-[140px] left-1/2 -translate-x-1/2 flex max-w-[92vw] flex-wrap items-end justify-center gap-3.5 z-[5]">
      {monitors.length > 0 && (
        <div className="flex min-w-0 flex-nowrap items-end justify-center gap-0">
          {monitors.map((m, i) => (
            <div
              key={m.instanceId}
              className={`group-item scene-drop relative ${m.id === 'acc-monitor-2' ? 'monitor-item-wide' : 'monitor-item'}`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <RemoveButton
                onRemove={() => onRemove('monitor', m.instanceId)}
                style={{ top: -10, left: '50%', transform: 'translateX(-50%)' }}
              />
              <ProductImage
                src={m.image}
                alt={m.name}
                className="monitor-img"
                style={{
                  '--mw': `${getMonitorWidth(m)}px`,
                  filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.7))',
                }}
              />
            </div>
          ))}
        </div>
      )}
      {accessories.map((acc, i) => (
        <div
          key={acc.instanceId}
          className="group-item scene-drop relative"
          style={{ animationDelay: `${(monitors.length + i) * 60}ms` }}
        >
          <RemoveButton
            onRemove={() => onRemove('accessory', acc.instanceId)}
            style={{ top: -10, left: '50%', transform: 'translateX(-50%)' }}
          />
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
