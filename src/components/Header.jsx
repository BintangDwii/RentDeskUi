import { Palmtree } from 'lucide-react';

export function Header() {
  return (
    <header className="text-center mb-8 w-full max-w-[1100px]">
      <div className="pill !py-1.5 mb-4">
        <Palmtree size={12} className="text-primary" aria-hidden="true" />
        <span className="text-[11px] font-medium tracking-[0.18em] text-primary uppercase">
          Bali Workspace Rental
        </span>
      </div>
      <h1 className="text-[clamp(30px,4.5vw,48px)] font-extrabold leading-[1.05] mb-2.5 tracking-[-0.02em] text-primary">
        Design Your Workspace
      </h1>
      <p className="text-secondary text-[15px] md:text-base max-w-xl mx-auto leading-relaxed">
        Build your perfect setup —{' '}
        <span className="font-medium text-primary">delivered &amp; assembled</span> anywhere in
        Bali within 48h.
      </p>
    </header>
  );
}
