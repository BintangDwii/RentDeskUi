import { ShoppingBag } from 'lucide-react';
import { DELIVERY } from '../../data/catalog.js';
import { discountAmount } from '../../utils/pricing.js';
import { SectionTitle } from './SectionTitle.jsx';

function BreakdownRow({ label, value, accent = false, strong = false, tint = false, last = false }) {
  return (
    <li
      className={`flex items-baseline justify-between gap-4 px-4 py-3 ${tint ? 'bg-accent-soft' : ''} ${
        last ? '' : 'border-b border-border/70'
      }`}
    >
      <span
        className={`text-[12px] leading-tight ${
          tint ? 'font-semibold text-accent-dark' : strong ? 'font-semibold text-primary' : 'text-secondary'
        }`}
      >
        {label}
      </span>
      <span
        className={`tabular-nums text-sm font-semibold truncate ${
          tint ? 'font-bold text-accent-dark' : accent ? 'text-accent-dark' : 'text-primary'
        } ${strong ? 'text-base font-bold' : ''}`}
      >
        {value}
      </span>
    </li>
  );
}

/** Price breakdown list. Animated values are resolved by the parent. */
export function PriceBreakdown({ total, plan, monthly, contract, deposit }) {
  if (total === 0) {
    return (
      <div className="mb-5">
        <SectionTitle>Price breakdown</SectionTitle>
        <div className="flex flex-col items-center justify-center gap-2 text-center border border-dashed border-border rounded-[16px] bg-tertiary px-6 py-8">
          <ShoppingBag size={20} className="text-secondary" aria-hidden="true" />
          <p className="text-[13px] text-secondary leading-relaxed max-w-[240px]">
            Your setup is empty. Add items from the catalog to see pricing.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-5">
      <SectionTitle>Price breakdown</SectionTitle>
      <ul className="list-none flex flex-col bg-tertiary border border-border rounded-[16px] overflow-hidden">
        <BreakdownRow label="Subtotal" value={`$${total}/mo`} />
        <BreakdownRow
          label={`Discount (${Math.round(plan.discount * 100)}%)`}
          value={plan.discount > 0 ? `−$${discountAmount(total, plan)}` : '—'}
          accent={plan.discount > 0}
        />
        <BreakdownRow label="Monthly rate" value={`$${monthly}/mo`} tint />
        <BreakdownRow
          label={`Total for ${plan.months} mo`}
          value={`$${contract}`}
          strong
        />
        <BreakdownRow label="Deposit (refundable)" value={`$${deposit}`} />
        <BreakdownRow
          label="Delivery"
          value={DELIVERY.fee === 0 ? 'Free' : `$${DELIVERY.fee}`}
          accent={DELIVERY.fee === 0}
          last
        />
      </ul>
    </div>
  );
}
