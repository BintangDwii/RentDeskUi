export function Header() {
  return (
    <header className="text-center mb-10 w-full max-w-[1100px]">
      <div className="inline-flex items-center gap-2.5 mb-3 px-4 py-[5px] rounded-full bg-gray-100 border border-gray-200">
        <span className="text-[11px] font-semibold tracking-[0.1em] text-gray-500 uppercase">
          🌴 Bali Workspace Rental
        </span>
      </div>
      <h1 className="text-[clamp(28px,5vw,52px)] font-extrabold text-gray-900 leading-[1.1] mb-2.5">
        Design Your Workspace
      </h1>
      <p className="text-gray-500 text-base">
        Build your perfect setup — delivered &amp; assembled in Bali.
      </p>
    </header>
  );
}
