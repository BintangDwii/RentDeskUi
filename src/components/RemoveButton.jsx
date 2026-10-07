import { Trash2 } from 'lucide-react';

/** Small red hover-reveal delete button. Parent must have `group-item` class. */
export function RemoveButton({ onRemove, size = 11, style }) {
  return (
    <button
      type="button"
      aria-label="Remove item"
      className="remove-btn"
      style={style}
      onClick={onRemove}
    >
      <Trash2 size={size} />
    </button>
  );
}
