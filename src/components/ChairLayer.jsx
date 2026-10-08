import { ProductImage } from './ProductImage.jsx';
import { SceneRemoveButton } from './scene/SceneRemoveButton.jsx';

/**
 * Chair sits on the canvas floor, overlapping the desk base (z-10).
 * Sizing comes from `chair.scene` data ({ pct, width, min, offset }) so new
 * chairs never need code changes here. Width is fluid like the desk
 * (percent of the scene wrapper) capped at `width` px, floored at `min` px.
 */
export function ChairLayer({ chair, onRemove }) {
  const maxWidth = chair.scene?.width ?? 300;
  const pct = chair.scene?.pct ?? 44;
  const minWidth = chair.scene?.min ?? 130;
  const offset = chair.scene?.offset ?? 0;

  return (
    <div
      className="chair-layer group-item absolute bottom-4 sm:bottom-6 left-1/2 z-10 flex flex-col items-center"
      style={{
        width: `${pct}%`,
        maxWidth,
        minWidth,
        transform: `translateX(calc(-50% + ${offset}px))`,
      }}
    >
      <SceneRemoveButton
        label={`Remove ${chair.name}`}
        onRemove={() => onRemove('chair')}
        size={16}
      />
      <ProductImage
        src={chair.image}
        alt={chair.name}
        className="scene-drop h-auto w-full"
        style={{
          filter: 'drop-shadow(0 16px 32px rgba(0,0,0,0.8))',
        }}
      />
    </div>
  );
}
