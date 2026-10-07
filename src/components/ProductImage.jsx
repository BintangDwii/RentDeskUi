/**
 * Product thumbnail / scene sprite. Pure <img> wrapper with
 * non-interactive defaults so scene items never capture clicks.
 */
export function ProductImage({ src, alt, style, className = '' }) {
  return (
    <img
      src={src}
      alt={alt}
      draggable={false}
      style={style}
      className={`object-contain pointer-events-none select-none ${className}`}
    />
  );
}
