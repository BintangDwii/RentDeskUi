import { ProductImage } from './ProductImage.jsx';
import { RemoveButton } from './RemoveButton.jsx';

/** Chair sits on the canvas floor, overlapping the desk base (z-10). */
export function ChairLayer({ chair, onRemove }) {
  const isTallMesh = chair.id === 'chair-2';

  return (
    <div
      className="group-item absolute bottom-0 left-1/2 z-10 flex flex-col items-center"
      style={{ transform: isTallMesh ? 'translateX(calc(-50% - 10px))' : 'translateX(-50%)' }}
    >
      <RemoveButton
        size={16}
        onRemove={() => onRemove('chair')}
        style={{ top: -10, left: '50%', transform: 'translateX(-50%)' }}
      />
      <ProductImage
        src={chair.image}
        alt={chair.name}
        style={{
          width: chair.id === 'chair-1' ? 300 : 190,
          filter: 'drop-shadow(0 16px 32px rgba(0,0,0,0.8))',
        }}
      />
    </div>
  );
}
