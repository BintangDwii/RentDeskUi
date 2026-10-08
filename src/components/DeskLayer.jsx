import { ProductImage } from './ProductImage.jsx';
import { MonitorItem } from './scene/MonitorItem.jsx';
import { SceneRemoveButton } from './scene/SceneRemoveButton.jsx';

/**
 * Desk is the scene anchor. Monitors float above the desk surface (back row),
 * the lamp sits on the right side, keyboard + mouse rest front-center, and the
 * plant (singleton) stands on the floor to the lower-right.
 * All offsets are relative to the desk image container.
 */
export function DeskLayer({ desk, monitors, lamps, keyboards, mice, plants, onRemove }) {
  return (
    <div className="group-item scene-drop absolute bottom-[12%] left-1/2 -translate-x-1/2 w-[84%] max-w-[440px] z-[5]" tabIndex={0}>
      <SceneRemoveButton
        onRemove={() => onRemove('desk')}
        label={`Remove ${desk.name}`}
        offset={-32}
        size={16}
      />

      {/* Desk image */}
      <ProductImage
        src={desk.image}
        alt={desk.name}
        style={{ width: '100%', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.7))' }}
      />

      {/* Monitors — back row, above desk surface. Nowrap + shrink so dual
          monitors squeeze side-by-side on mobile instead of wrapping over
          each other. Basis ratio 1 : 1.32 preserves ultrawide width. */}
      {monitors.length > 0 && (
        <div className="monitor-row absolute bottom-[86%] left-1/2 -translate-x-1/2 flex w-[112%] max-w-none flex-nowrap items-end justify-center gap-0 z-[6]">
          {monitors.map((m, i) => (
            <MonitorItem
              key={m.instanceId}
              monitor={m}
              index={i}
              onRemove={onRemove}
              className="flex flex-col items-center"
            />
          ))}
        </div>
      )}

      {/* Lamp — right side of desk surface */}
      {lamps.map((acc, i) => (
        <div
          key={acc.instanceId}
          className="group-item scene-drop absolute bottom-[76%] right-[8%] z-[7] flex flex-col items-center"
          tabIndex={0}
          style={{ animationDelay: `${i * 60}ms` }}
        >
          <SceneRemoveButton onRemove={() => onRemove('accessory', acc.instanceId)} />
          <ProductImage
            src={acc.image}
            alt={acc.name}
            style={{ height: 90, filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.7))' }}
          />
        </div>
      ))}

      {/* Plant — floor, lower-right beside the desk */}
      {plants.map((acc, i) => (
        <div
          key={acc.instanceId}
          className="group-item scene-drop absolute bottom-[8%] -right-[4%] z-[6] flex flex-col items-center"
          tabIndex={0}
          style={{ animationDelay: `${i * 60}ms` }}
        >
          <SceneRemoveButton onRemove={() => onRemove('accessory', acc.instanceId)} />
          <ProductImage
            src={acc.image}
            alt={acc.name}
            style={{ height: 72, filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.7))' }}
          />
        </div>
      ))}

      {/* Keyboard + mouse — front-center of desk surface */}
      {(keyboards.length > 0 || mice.length > 0) && (
        <div className="desk-accessories absolute bottom-[70%] left-1/2 flex items-center justify-center gap-3.5 z-[7]">
          <div className="flex items-center justify-center gap-3.5 -translate-x-[44%]">
            {keyboards.map((acc, i) => (
              <div
                key={acc.instanceId}
                className="group-item scene-drop relative"
                tabIndex={0}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <SceneRemoveButton onRemove={() => onRemove('accessory', acc.instanceId)} />
                <ProductImage
                  src={acc.image}
                  alt={acc.name}
                  className="keyboard-img"
                  style={{ filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.5))' }}
                />
              </div>
            ))}
            {mice.map((acc, i) => (
              <div
                key={acc.instanceId}
                className="group-item scene-drop relative"
                tabIndex={0}
                style={{ animationDelay: `${(keyboards.length + i) * 60}ms` }}
              >
                <SceneRemoveButton onRemove={() => onRemove('accessory', acc.instanceId)} />
                <ProductImage
                  src={acc.image}
                  alt={acc.name}
                  className="mouse-img"
                  style={{ filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.5))' }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
