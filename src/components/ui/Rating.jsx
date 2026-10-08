import { Star } from 'lucide-react';

/** Five-star rating meter + review count for a product. */
export function Rating({ value, reviews }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[13px] text-secondary">
      <span className="inline-flex items-center gap-0.5 text-amber-400">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            size={15}
            className={i < Math.round(value) ? 'fill-amber-400' : 'text-gray-300'}
          />
        ))}
      </span>
      <span className="font-semibold text-primary tabular-nums">{value}</span>
      <span>({reviews} rentals)</span>
    </span>
  );
}
