import { Trash2 } from 'lucide-react';

/** Small red hover-reveal delete button. Parent must have `group-item` class. */
export function RemoveButton({ onRemove, size = 13, style, label = 'Remove item' }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className="remove-btn"
      style={style}
      onClick={onRemove}
    >
      <Trash2 size={size} />
    </button>
  );
}
