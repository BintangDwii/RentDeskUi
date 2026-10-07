import { Palmtree } from 'lucide-react';

export function Header() {
  return (
    <header className="text-center mb-10 w-full max-w-[1100px]">
      <div className="inline-flex items-center gap-1.5 mb-4 px-4 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm">
        <Palmtree size={12} className="text-emerald-600" />
        <span className="text-[11px] font-semibold tracking-[0.12em] text-gray-500 uppercase">
          Bali Workspace Rental
        </span>
      </div>
      <h1 className="text-[clamp(28px,5vw,52px)] font-extrabold text-gray-900 leading-[1.1] mb-2.5 tracking-tight">
        Design Your Workspace
      </h1>
      <p className="text-gray-500 text-base max-w-xl mx-auto">
        Build your perfect setup — delivered &amp; assembled anywhere in Bali within 48h.
      </p>
    </header>
  );
}
