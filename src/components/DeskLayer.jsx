import { getMonitorWidth } from '../utils/layout.js';
import { ProductImage } from './ProductImage.jsx';
import { RemoveButton } from './RemoveButton.jsx';

/**
 * Desk is the scene anchor. Monitors float above the desk surface (back row),
 * the lamp sits on the right side, keyboard + mouse rest front-center.
 * All offsets are relative to the desk image container.
 */
export function DeskLayer({ desk, monitors, lamps, keyboards, mice, onRemove }) {
  return (
    <div className="group-item scene-drop absolute bottom-[60px] left-1/2 -translate-x-1/2 w-[88%] max-w-[440px] z-[5]">
      <RemoveButton
        size={16}
        label={`Remove ${desk.name}`}
        onRemove={() => onRemove('desk')}
        style={{ top: -32, left: '50%', transform: 'translateX(-50%)' }}
      />

      {/* Desk image */}
      <ProductImage
        src={desk.image}
        alt={desk.name}
        style={{ width: '100%', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.7))' }}
      />

      {/* Monitors — back row, above desk surface */}
      {monitors.length > 0 && (
        <div className="absolute bottom-[86%] left-1/2 -translate-x-1/2 flex items-end justify-center gap-3 z-[6]">
          {monitors.map((m, i) => (
            <div
              key={m.instanceId}
              className="group-item scene-drop relative flex flex-col items-center"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <RemoveButton
                onRemove={() => onRemove('monitor', m.instanceId)}
                style={{ top: -10, left: '50%', transform: 'translateX(-50%)' }}
              />
              <ProductImage
                src={m.image}
                alt={m.name}
                style={{
                  width: getMonitorWidth(m, monitors.length),
                  filter: 'drop-shadow(0 12px 28px rgba(0,0,0,0.8))',
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Lamp — right side of desk surface */}
      {lamps.map((acc, i) => (
        <div
          key={acc.instanceId}
          className="group-item scene-drop absolute bottom-[76%] right-[8%] z-[7] flex flex-col items-center"
          style={{ animationDelay: `${i * 60}ms` }}
        >
          <RemoveButton
            onRemove={() => onRemove('accessory', acc.instanceId)}
            style={{ top: -10, left: '50%', transform: 'translateX(-50%)' }}
          />
          <ProductImage
            src={acc.image}
            alt={acc.name}
            style={{ height: 90, filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.7))' }}
          />
        </div>
      ))}

      {/* Keyboard + mouse — front-center of desk surface */}
      {(keyboards.length > 0 || mice.length > 0) && (
        <div className="absolute bottom-[70%] left-1/2 flex items-center justify-center gap-3.5 z-[7]">
          <div className="flex items-center justify-center gap-3.5 -translate-x-[44%]">
            {keyboards.map((acc, i) => (
              <div
                key={acc.instanceId}
                className="group-item scene-drop relative"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <RemoveButton
                  onRemove={() => onRemove('accessory', acc.instanceId)}
                  style={{ top: -10, left: '50%', transform: 'translateX(-50%)' }}
                />
                <ProductImage
                  src={acc.image}
                  alt={acc.name}
                  style={{ width: 105, filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.5))' }}
                />
              </div>
            ))}
            {mice.map((acc, i) => (
              <div
                key={acc.instanceId}
                className="group-item scene-drop relative"
                style={{ animationDelay: `${(keyboards.length + i) * 60}ms` }}
              >
                <RemoveButton
                  onRemove={() => onRemove('accessory', acc.instanceId)}
                  style={{ top: -10, left: '50%', transform: 'translateX(-50%)' }}
                />
                <ProductImage
                  src={acc.image}
                  alt={acc.name}
                  style={{ width: 40, filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.5))' }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
