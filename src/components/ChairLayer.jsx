import { ProductImage } from './ProductImage.jsx';
import { RemoveButton } from './RemoveButton.jsx';

/**
 * Chair sits on the canvas floor, overlapping the desk base (z-10).
 * Sizing comes from `chair.scene` data ({ width, offset }) so new
 * chairs never need code changes here.
 */
export function ChairLayer({ chair, onRemove }) {
  const width = chair.scene?.width ?? 190;
  const offset = chair.scene?.offset ?? 0;

  return (
    <div
      className="group-item absolute bottom-0 left-1/2 z-10 flex flex-col items-center"
      style={{ transform: `translateX(calc(-50% + ${offset}px))` }}
    >
      <RemoveButton
        size={16}
        label={`Remove ${chair.name}`}
        onRemove={() => onRemove('chair')}
        style={{ top: -10, left: '50%', transform: 'translateX(-50%)' }}
      />
      <ProductImage
        src={chair.image}
        alt={chair.name}
        style={{
          width,
          filter: 'drop-shadow(0 16px 32px rgba(0,0,0,0.8))',
        }}
      />
    </div>
  );
}
