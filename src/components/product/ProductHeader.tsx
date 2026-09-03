import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

export function ProductHeader({ onHome }: { onHome: () => void }) {
  const [activeId, setActiveId] = useState('');
  const hrefs = ['overview', 'investigation', 'assistant', 'relationships'];

  useEffect(() => {
    const onScroll = () => {
      const offset = 180;
      const positions = hrefs.map((id) => {
        const el = document.getElementById(id);
        return el ? { id, y: el.getBoundingClientRect().top } : null;
      }).filter((p): p is { id: string; y: number } => p !== null);
      let current = '';
      for (const p of positions) {
        if (p.y <= offset) current = p.id;
      }
      const docBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;
      if (docBottom) {
        const last = positions[positions.length - 1];
        if (last) current = last.id;
      }
      setActiveId(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [hrefs]);

  return (
    <header className="site-header product-nav">
      <button className="brand" onClick={onHome} aria-label="Segurara home"><span className="brand-mark"><span /></span> SEGURARA</button>
      <nav className="nav-links">
        {[['Overview', '#overview'], ['Investigation', '#investigation'], ['Assistant', '#assistant'], ['Relationships', '#relationships']].map(([label, href]) => <a className={activeId === href.slice(1) ? 'active' : ''} href={href} key={label}>{label}</a>)}
      </nav>
      <div className="header-actions">
        <button className="header-cta" onClick={onHome}>Back to home <ArrowUpRight size={15} /></button>
      </div>
    </header>
  );
}
