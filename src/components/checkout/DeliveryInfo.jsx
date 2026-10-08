import { Clock, MapPin, ShieldCheck, Truck, Wrench } from 'lucide-react';
import { DELIVERY } from '../../data/catalog.js';
import { SectionTitle } from './SectionTitle.jsx';

const DELIVERY_ICONS = [Truck, Wrench, ShieldCheck];

/** Static delivery promise card (fee, ETA, what's included). */
export function DeliveryInfo() {
  return (
    <div className="bg-tertiary border border-border rounded-[20px] p-4">
      <SectionTitle>Delivery included</SectionTitle>
      <ul className="flex flex-col gap-2">
        {DELIVERY.includes.map((line, i) => {
          const Icon = DELIVERY_ICONS[i % DELIVERY_ICONS.length];
          return (
            <li key={line} className="flex items-center gap-2.5 text-[13px] text-primary">
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
  );
}
