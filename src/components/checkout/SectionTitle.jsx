/** Small uppercase section heading used throughout the checkout modal. */
export function SectionTitle({ children }) {
  return (
    <p className="text-[11px] font-medium text-secondary tracking-[0.08em] uppercase mb-3">
      {children}
    </p>
  );
}
