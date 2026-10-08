import { getMonitorWidth, getMonitorWidthMobile } from '../../utils/layout.js';
import { ProductImage } from '../ProductImage.jsx';
import { SceneRemoveButton } from './SceneRemoveButton.jsx';

const DESK_SHADOW = 'drop-shadow(0 12px 28px rgba(0,0,0,0.8))';

/** A monitor sprite, shared by the anchored desk row and the floating layer. */
export function MonitorItem({
  monitor,
  index = 0,
  onRemove,
  className = '',
  shadow = DESK_SHADOW,
}) {
  const wide = monitor.id === 'acc-monitor-2';

  return (
    <div
      className={`group-item scene-drop relative ${wide ? 'monitor-item-wide' : 'monitor-item'} ${className}`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <SceneRemoveButton onRemove={() => onRemove('monitor', monitor.instanceId)} />
      <ProductImage
        src={monitor.image}
        alt={monitor.name}
        className="monitor-img"
        style={{
          '--mw': `${getMonitorWidth(monitor)}px`,
          '--mw-mobile': `${getMonitorWidthMobile(monitor)}px`,
          filter: shadow,
        }}
      />
    </div>
  );
}
