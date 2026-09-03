import { useEffect, useState } from 'react';
import { ChevronRight, Menu, X } from 'lucide-react';
import { Logo } from './Logo';

export function Header({ onProduct, onHome, product = false }: { onProduct?: () => void; onHome: () => void; product?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState('');
  const links = product ? ['Overview', 'Investigations', 'Entities', 'Telemetry'] : ['How it works', 'Capabilities', 'Platform', 'Pricing', 'FAQ', 'Contact'];
  const hrefs = product ? ['#workspace', '#workspace', '#workspace', '#workspace'] : ['how-it-works', 'capabilities', 'dashboard', 'pricing', 'faq', 'contact'];

  useEffect(() => {
    if (product) return;
    const onScroll = () => {
      const offset = 130;
      const positions = hrefs.map((id) => {
        const el = document.getElementById(id);
        return el ? { id, y: el.getBoundingClientRect().top } : null;
      }).filter((p): p is { id: string; y: number } => p !== null);
      const ordered = [...positions].sort((a, b) => a.y - b.y);
      let current = '';
      for (const p of ordered) {
        if (p.y <= offset) current = p.id;
      }
      const docBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;
      if (docBottom) {
        const last = ordered[ordered.length - 1];
        if (last) current = last.id;
      }
      setActiveId(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [product, hrefs]);

  return (
    <header className={`site-header ${product ? 'workspace-header' : ''}`}>
      <button className="brand" onClick={() => { onHome(); setMenuOpen(false); }} aria-label="Segurara home"><Logo /><span className="brand-text">SEGURARA</span></button>
      <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {links.map((link, index) => <a className={activeId === hrefs[index] && !product ? 'active' : ''} href={product ? hrefs[index] : `#${hrefs[index]}`} key={link} onClick={() => setMenuOpen(false)}>{link}</a>)}
        <button className="header-cta nav-cta-mobile" onClick={() => { setMenuOpen(false); onProduct?.(); }}>{product ? 'Open marketing site' : 'Explore the platform'} <ChevronRight size={15} /></button>
      </nav>
      <div className="header-actions">
        <button className="header-cta" onClick={onProduct}>{product ? 'Open marketing site' : 'SeguraSecure S.1'} <ChevronRight size={15} /></button>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X size={19} /> : <Menu size={19} />}</button>
      </div>
    </header>
  );
}
