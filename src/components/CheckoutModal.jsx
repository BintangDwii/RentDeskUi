import { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  MapPin,
  ShieldCheck,
  ShoppingCart,
  Truck,
  Wrench,
  X,
} from 'lucide-react';
import { DELIVERY, RENTAL_PLANS } from '../data/catalog.js';
import { useAnimatedNumber } from '../hooks/useAnimatedNumber.js';
import {
  contractTotal,
  depositAmount,
  discountAmount,
  discountedMonthly,
  getPlan,
} from '../utils/pricing.js';
import { ProductImage } from './ProductImage.jsx';
import { useModalBehaviour } from '../hooks/useModal.js';

const DELIVERY_ICONS = [Truck, Wrench, ShieldCheck];

function SectionTitle({ children }) {
  return (
    <p className="text-[11px] font-medium text-secondary tracking-[0.08em] uppercase mb-3">
      {children}
    </p>
  );
}

function ItemRow({ image, name, price, onRemove }) {
  return (
    <li className="flex justify-between items-center gap-2.5 py-1.5">
      <span className="inline-flex items-center gap-2.5 min-w-0">
        <span className="w-11 h-11 shrink-0 flex items-center justify-center bg-white border border-border rounded-[12px] p-1">
          <ProductImage src={image} alt="" className="w-full h-full" />
        </span>
        <span className="truncate text-sm font-medium text-primary" title={name}>
          {name}
        </span>
      </span>
      <span className="inline-flex items-center gap-2 shrink-0">
        <span className="text-primary font-semibold text-xs tabular-nums">${price}/mo</span>
        <button
          type="button"
          aria-label={`Remove ${name}`}
          onClick={onRemove}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-soft text-secondary hover:bg-red-100 hover:text-red-600 transition-colors"
        >
          <X size={13} />
        </button>
      </span>
    </li>
  );
}

function BreakdownCell({ label, value, accent = false, highlight = false }) {
  return (
    <li
      className={`rounded-[20px] border p-4 ${
        highlight
          ? 'border-primary bg-primary text-white'
          : 'border-border bg-white'
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

export function CheckoutModal({ setup, total, placedOrder, onClose, onConfirm, onRemove }) {
  useModalBehaviour(onClose);
  const [months, setMonths] = useState(placedOrder?.months ?? 1);
  const plan = getPlan(months);

  const groups = [
    {
      title: 'Desk',
      rows: setup.desk
        ? [
            {
              key: 'desk',
              image: setup.desk.image,
              name: setup.desk.name,
              price: setup.desk.price,
              onRemove: () => onRemove('desk'),
            },
          ]
        : [],
    },
    {
      title: 'Chair',
      rows: setup.chair
        ? [
            {
              key: 'chair',
              image: setup.chair.image,
              name: setup.chair.name,
              price: setup.chair.price,
              onRemove: () => onRemove('chair'),
            },
          ]
        : [],
    },
    {
      title: 'Monitors',
      rows: setup.monitors.map((m) => ({
        key: m.instanceId,
        image: m.image,
        name: m.name,
        price: m.price,
        onRemove: () => onRemove('monitor', m.instanceId),
      })),
    },
    {
      title: 'Accessories',
      rows: setup.accessories.map((a) => ({
        key: a.instanceId,
        image: a.image,
        name: a.name,
        price: a.price,
        onRemove: () => onRemove('accessory', a.instanceId),
      })),
    },
  ].filter((g) => g.rows.length > 0);

  const monthly = discountedMonthly(total, plan);
  const contract = contractTotal(total, plan);
  const deposit = depositAmount(total, plan);
  const animatedMonthly = Math.round(useAnimatedNumber(monthly) * 100) / 100;
  const animatedContract = Math.round(useAnimatedNumber(contract) * 100) / 100;
  const animatedDeposit = Math.round(useAnimatedNumber(deposit) * 100) / 100;

  return (
    <div className="modal-overlay modal-fade" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Review your rental"
        className="modal-box modal-pop !max-w-5xl max-h-[88vh] overflow-y-auto !p-5 sm:!p-9 !rounded-[20px] sm:!rounded-[24px]"
        onClick={(e) => e.stopPropagation()}
      >
        {placedOrder ? (
          <div className="text-center py-8 px-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center mb-5">
              <CheckCircle2 size={32} className="text-emerald-600" aria-hidden="true" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">
              Order placed — thank you!
            </h3>
            <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
              Your {placedOrder.months}-month rental
              {placedOrder.contract ? (
                <>
                  {' '}
                  —{' '}
                  <span className="font-bold text-gray-900 tabular-nums">
                    ${placedOrder.contract}
                  </span>{' '}
                  total (<span className="tabular-nums">${placedOrder.monthly}/mo</span>)
                </>
              ) : null}{' '}
              is confirmed for this demo. We&apos;ll deliver &amp; assemble anywhere in Bali within
              48h.
            </p>
            <div className="flex gap-3 max-w-sm mx-auto mt-7">
              <button
                type="button"
                autoFocus
                className="modal-action-btn btn-primary"
                onClick={onClose}
              >
                Start a new setup
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
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

            {/* Body: setup (left) + rental details (right) */}
            <div className="grid gap-8 md:grid-cols-[1fr_1.1fr] mb-6">
              {/* LEFT — Items by category */}
              <div className="min-w-0">
                <SectionTitle>Your setup</SectionTitle>
                <div className="bg-tertiary rounded-[20px] p-4 border border-border flex flex-col gap-3.5 md:max-h-[600px] md:overflow-y-auto">
                  {groups.map((g) => (
                    <div key={g.title}>
                      <p className="text-[11px] font-medium tracking-[0.08em] uppercase text-secondary mb-1.5">
                        {g.title}
                      </p>
                      <ul className="list-none flex flex-col">
                        {g.rows.map((r) => (
                          <ItemRow key={r.key} {...r} />
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT — Duration, breakdown, delivery */}
              <div className="min-w-0 flex flex-col">
                {/* Duration */}
                <div className="mb-5">
                  <SectionTitle>Rental duration</SectionTitle>
                  <div className="grid grid-cols-2 xl:grid-cols-4 gap-2">
                    {RENTAL_PLANS.map((p) => {
                      const active = p.months === plan.months;
                      return (
                        <button
                          key={p.months}
                          type="button"
                          onClick={() => setMonths(p.months)}
                          className={`rounded-[20px] border px-2 py-3 text-center transition-all duration-200 ${
                            active
                              ? 'border-primary bg-primary text-white'
                              : 'border-border bg-white text-primary hover:border-primary'
                          }`}
                        >
                          <span className="block text-sm font-medium tabular-nums">{p.label}</span>
                          {p.discount > 0 ? (
                            <span
                              className={`inline-block mt-1.5 text-[10px] font-medium px-2 py-0.5 rounded-full ${
                                active
                                  ? 'bg-white/15 text-white'
                                  : 'bg-tertiary text-secondary border border-border'
                              }`}
                            >
                              Save {Math.round(p.discount * 100)}%
                            </span>
                          ) : (
                            <span className="block text-[10px] text-secondary mt-1.5">
                              No commitment
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3 — Breakdown */}
                <div className="mb-5">
                  <SectionTitle>Price breakdown</SectionTitle>
                  <ul className="list-none grid grid-cols-1 min-[420px]:grid-cols-2 sm:grid-cols-3 gap-2 bg-tertiary border border-border rounded-[20px] p-2.5">
                    <BreakdownCell label="Subtotal" value={`$${total}/mo`} />
                    <BreakdownCell
                      label={`Discount (${Math.round(plan.discount * 100)}%)`}
                      value={plan.discount > 0 ? `−$${discountAmount(total, plan)}` : '—'}
                      accent={plan.discount > 0}
                    />
                    <BreakdownCell
                      label="Monthly rate"
                      value={`$${animatedMonthly}/mo`}
                      highlight
                    />
                    <BreakdownCell
                      label={`Contract (${plan.months} mo)`}
                      value={`$${animatedContract}`}
                    />
                    <BreakdownCell label="Deposit (refund.)" value={`$${animatedDeposit}`} />
                    <BreakdownCell
                      label="Delivery"
                      value={DELIVERY.fee === 0 ? 'Free' : `$${DELIVERY.fee}`}
                      accent
                    />
                  </ul>
                </div>

                {/* 4 — Delivery */}
                <div className="bg-tertiary border border-border rounded-[20px] p-4">
                  <SectionTitle>Delivery included</SectionTitle>
                  <ul className="flex flex-col gap-2">
                    {DELIVERY.includes.map((line, i) => {
                      const Icon = DELIVERY_ICONS[i % DELIVERY_ICONS.length];
                      return (
                        <li
                          key={line}
                          className="flex items-center gap-2.5 text-[13px] text-primary"
                        >
                          <span className="w-6 h-6 shrink-0 rounded-full bg-white border border-border flex items-center justify-center">
                            <Icon size={12} className="text-primary" />
                          </span>
                          <span className="font-medium">{line}</span>
                        </li>
                      );
                    })}
                  </ul>
                  <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-secondary mt-3 pt-2.5 border-t border-border">
                    <span className="inline-flex items-center gap-1">
                      <MapPin size={11} /> {DELIVERY.coverage}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock size={11} /> ETA {DELIVERY.eta} after confirmation
                    </span>
                  </p>
                </div>
              </div>
              {/* /grid body */}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 sticky bottom-0 bg-white pt-3 pb-1 border-t border-border">
              <button
                type="button"
                className="modal-action-btn btn-outline w-full"
                onClick={onClose}
              >
                Keep Editing
              </button>
              <button
                type="button"
                className="modal-action-btn btn-primary tabular-nums w-full"
                onClick={() => onConfirm({ contract, months: plan.months, monthly })}
              >
                Confirm — ${animatedContract} ↗
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
