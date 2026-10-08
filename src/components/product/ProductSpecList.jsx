import { Zap } from 'lucide-react';
import { SPEC_ICONS } from '../icons/specIcons.js';

/** Two-column grid of a product's key specs. */
export function ProductSpecList({ specs }) {
  return (
    <ul className="mt-5 grid grid-cols-2 gap-2.5">
      {specs.map((s) => {
        const Icon = SPEC_ICONS[s.icon] ?? Zap;
        return (
          <li
            key={s.label}
            className="flex items-center gap-2.5 bg-tertiary border border-border rounded-[20px] px-3.5 py-3"
          >
            <span className="w-8 h-8 shrink-0 rounded-full bg-white border border-border flex items-center justify-center">
              <Icon size={15} className="text-secondary" />
            </span>
            <span className="min-w-0">
              <span className="block text-[10px] text-secondary leading-tight">{s.label}</span>
              <span className="block text-xs font-semibold text-primary">{s.value}</span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}
