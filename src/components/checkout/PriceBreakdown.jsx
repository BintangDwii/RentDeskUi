import { DELIVERY } from '../../data/catalog.js';
import { discountAmount } from '../../utils/pricing.js';
import { SectionTitle } from './SectionTitle.jsx';

function BreakdownCell({ label, value, accent = false, highlight = false }) {
  return (
    <li
      className={`rounded-[20px] border p-4 ${
        highlight ? 'border-primary bg-primary text-white' : 'border-border bg-white'
      }`}
    >
      <span
        className={`block text-[10px] font-medium tracking-[0.06em] uppercase leading-tight ${
          highlight ? 'text-white/70' : 'text-secondary'
        }`}
      >
        {label}
      </span>
      <span
        className={`block text-lg font-bold tabular-nums mt-1 truncate ${
          highlight ? 'text-white' : accent ? 'text-emerald-600' : 'text-primary'
        }`}
      >
        {value}
      </span>
    </li>
  );
}

/** Price breakdown grid. Animated values are resolved by the parent. */
export function PriceBreakdown({ total, plan, monthly, contract, deposit }) {
  return (
    <div className="mb-5">
      <SectionTitle>Price breakdown</SectionTitle>
      <ul className="list-none grid grid-cols-1 min-[420px]:grid-cols-2 sm:grid-cols-3 gap-2 bg-tertiary border border-border rounded-[20px] p-2.5">
        <BreakdownCell label="Subtotal" value={`$${total}/mo`} />
        <BreakdownCell
          label={`Discount (${Math.round(plan.discount * 100)}%)`}
          value={plan.discount > 0 ? `−$${discountAmount(total, plan)}` : '—'}
          accent={plan.discount > 0}
        />
        <BreakdownCell label="Monthly rate" value={`$${monthly}/mo`} highlight />
        <BreakdownCell label={`Contract (${plan.months} mo)`} value={`$${contract}`} />
        <BreakdownCell label="Deposit (refund.)" value={`$${deposit}`} />
        <BreakdownCell
          label="Delivery"
          value={DELIVERY.fee === 0 ? 'Free' : `$${DELIVERY.fee}`}
          accent
        />
      </ul>
    </div>
  );
}
