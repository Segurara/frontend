import { ArrowUpRight } from 'lucide-react';
import { Logo } from './Logo';

export function PrivacyHeader({ onHome }: { onHome: () => void }) {
  return (
    <header className="site-header privacy-header">
      <button className="brand" onClick={onHome} aria-label="Segurara home"><Logo /><span className="brand-text">SEGURARA</span></button>
      <div className="header-actions">
        <button className="header-cta" onClick={onHome}>Back to home <ArrowUpRight size={15} /></button>
      </div>
    </header>
  );
}
