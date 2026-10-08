import { RemoveButton } from '../RemoveButton.jsx';

const TOP_CENTER = { top: -10, left: '50%', transform: 'translateX(-50%)' };

/** Remove control positioned above a scene sprite (revealed on hover/focus). */
export function SceneRemoveButton({ onRemove, label, offset = -10, size = 13 }) {
  return (
    <RemoveButton
      onRemove={onRemove}
      label={label}
      size={size}
      style={{ ...TOP_CENTER, top: offset }}
    />
  );
}
