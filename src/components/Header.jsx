import { Palmtree } from 'lucide-react';

export function Header() {
  return (
    <header className="text-center mb-12 w-full max-w-[1100px]">
      <div className="inline-flex items-center gap-1.5 mb-5 px-4 py-1.5 rounded-[6px] bg-gradient-to-r from-gray-950 via-gray-800 to-gray-950 shadow-md">
        <Palmtree size={12} className="text-white" />
        <span className="text-[11px] font-semibold tracking-[0.18em] text-white uppercase">
          Bali Workspace Rental
        </span>
      </div>
      <h1 className="text-[clamp(32px,5.5vw,60px)] font-extrabold leading-[1.05] mb-3 tracking-[-0.02em] bg-gradient-to-b from-gray-950 via-gray-800 to-gray-500 bg-clip-text text-transparent">
        Design Your Workspace
      </h1>
      <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto leading-relaxed font-light">
        Build your perfect setup —{' '}
        <span className="font-medium text-gray-700">delivered &amp; assembled</span> anywhere in
        Bali within 48h.
      </p>
    </header>
  );
}
