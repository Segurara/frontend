import { ArrowUpRight } from 'lucide-react';

export function PrivacyHeader({ onHome }: { onHome: () => void }) {
  return (
    <header className="site-header privacy-header">
      <button className="brand" onClick={onHome} aria-label="Segurara home"><span className="brand-mark"><span /></span> SEGURARA</button>
      <div className="header-actions">
        <button className="header-cta" onClick={onHome}>Back to home <ArrowUpRight size={15} /></button>
      </div>
    </header>
  );
}
