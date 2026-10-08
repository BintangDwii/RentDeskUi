import { RENTAL_PLANS } from '../data/catalog.js';

export const round2 = (n) => Math.round(n * 100) / 100;

export function getPlan(months) {
  return RENTAL_PLANS.find((p) => p.months === months) ?? RENTAL_PLANS[0];
}

/** Monthly rate after plan loyalty discount. */
export function discountedMonthly(monthlyTotal, plan) {
  return round2(monthlyTotal * (1 - plan.discount));
}

export function discountAmount(monthlyTotal, plan) {
  return round2(monthlyTotal * plan.discount);
}

/** Total payable for the whole contract. */
export function contractTotal(monthlyTotal, plan) {
  return round2(discountedMonthly(monthlyTotal, plan) * plan.months);
}

/** Refundable deposit = one discounted month. */
export function depositAmount(monthlyTotal, plan) {
  return discountedMonthly(monthlyTotal, plan);
}

/** Format a USD amount with thousands separators (1887 → "1,887"). */
export const fmtMoney = (n) =>
  Number(n).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 0 });
