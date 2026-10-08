import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useAnimatedNumber } from '../hooks/useAnimatedNumber.js';
import {
  contractTotal,
  depositAmount,
  discountedMonthly,
  getPlan,
  round2,
  fmtMoney,
} from '../utils/pricing.js';
import { Modal } from './ui/Modal.jsx';
import { buildCheckoutGroups } from './checkout/checkoutGroups.js';
import { DeliveryInfo } from './checkout/DeliveryInfo.jsx';
import { OrderSuccess } from './checkout/OrderSuccess.jsx';
import { PriceBreakdown } from './checkout/PriceBreakdown.jsx';
import { RentalDuration } from './checkout/RentalDuration.jsx';
import { SetupSummary } from './checkout/SetupSummary.jsx';

export function CheckoutModal({ setup, total, placedOrder, onClose, onConfirm, onRemove }) {
  const [months, setMonths] = useState(placedOrder?.months ?? 1);
  const plan = getPlan(months);
  const groups = buildCheckoutGroups(setup, onRemove);

  const monthly = discountedMonthly(total, plan);
  const contract = contractTotal(total, plan);
  const deposit = depositAmount(total, plan);
  const animatedMonthly = round2(useAnimatedNumber(monthly));
  const animatedContract = round2(useAnimatedNumber(contract));
  const animatedDeposit = round2(useAnimatedNumber(deposit));

  return (
    <Modal
      onClose={onClose}
      label="Review your rental"
      className="!max-w-5xl max-h-[88vh] overflow-y-auto !p-5 sm:!p-9 !rounded-[20px] sm:!rounded-[24px]"
    >
      {placedOrder ? (
        <OrderSuccess order={placedOrder} onClose={onClose} />
      ) : (
        <>
          <div className="flex items-center gap-3 mb-6">
            <div className="arrow-circle !w-11 !h-11">
              <ShoppingCart size={20} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-primary tracking-tight">
                Review your rental
              </h3>
              <p className="text-[13px] text-secondary">Items, duration &amp; price breakdown</p>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-[1fr_1.1fr] mb-6">
            <SetupSummary groups={groups} />

            <div className="min-w-0 flex flex-col">
              <RentalDuration selectedMonths={plan.months} onSelect={setMonths} />
              <PriceBreakdown
                total={total}
                plan={plan}
                monthly={animatedMonthly}
                contract={animatedContract}
                deposit={animatedDeposit}
              />
              <DeliveryInfo />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sticky bottom-0 z-10 bg-white pt-3 pb-1 border-t border-border">
            <button type="button" className="modal-action-btn btn-outline w-full" onClick={onClose}>
              Keep Editing
            </button>
            <button
              type="button"
              className="modal-action-btn btn-primary tabular-nums w-full"
              onClick={() => onConfirm({ contract, months: plan.months, monthly })}
            >
              {plan.months === 1
                ? `Confirm Rent $${fmtMoney(animatedMonthly)}/mo ↗`
                : `Confirm $${fmtMoney(animatedContract)} Total ↗`}
            </button>
          </div>
        </>
      )}
    </Modal>
  );
}
