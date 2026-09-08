import type { MouseEvent } from 'react';
import { Logo } from './Logo';
import { Facebook, Youtube, Linkedin } from 'lucide-react';

const socialLinks = [
  { href: 'https://www.facebook.com/SeguraraAI/', label: 'Facebook', icon: Facebook },
  { href: 'https://medium.com/@Segurara/', label: 'Medium', icon: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg> },
  { href: 'https://www.youtube.com/@Segurara-j8n', label: 'YouTube', icon: Youtube },
  { href: 'https://www.linkedin.com/company/segurara/', label: 'LinkedIn', icon: Linkedin },
  { href: 'https://www.crunchbase.com/organization/segurara', label: 'Crunchbase', icon: () => <svg width="15" height="15" viewBox="3.5 4.5 16.8 12.3" fill="currentColor"><path d="M7.045 14.465A2.11 2.11 0 0 0 9.84 13.42h1.66a3.69 3.69 0 1 1 0-1.75H9.84a2.11 2.11 0 1 0-2.795 2.795zm11.345.845a3.55 3.55 0 0 1-1.06.63 3.68 3.68 0 0 1-3.39-.38v.38h-1.51V5.37h1.5v4.11a3.74 3.74 0 0 1 1.8-.63H16a3.67 3.67 0 0 1 2.39 6.46zm-.223-2.766a2.104 2.104 0 1 1-4.207 0 2.104 2.104 0 0 1 4.207 0z" /></svg> },
  { href: 'https://www.f6s.com/segurara', label: 'F6S', icon: () => <svg width="15" height="15" viewBox="150 175 505 450" fill="currentColor"><path d="M152.927 180.139 H293.734 V237.909 H210.697 V362.821 H260.519 V420.591 H210.697 V619.879 H152.927 Z" /><path d="m 372.428,237.909 v 124.912 h 68.517 c 16.582,0 31.127,14.476 31.127,30.977 v 194.721 c 0,16.705 -14.545,31.359 -31.127,31.359 h -95.027 c -16.59,0 -31.143,-14.289 -31.143,-30.578 V 212.296 c 0,-16.829 14.448,-32.156 30.313,-32.156 h 95.858 c 16.582,0 31.127,14.468 31.127,30.961 v 72.657 3.974 h -3.974 -49.822 -3.974 v -3.974 -45.849 z m 0.016,182.68 v 141.519 h 41.875 V 420.589 Z" /><path d="m 647.073,283.74 v 3.974 h -3.974 -49.822 -3.974 v -3.974 -45.849 h -41.875 v 124.913 l 69.116,0.016 c 16.441,0 30.529,19.672 30.529,35.777 v 189.705 c 0,16.812 -14.266,31.558 -30.529,31.558 h -92.918 c -16.254,0 -30.512,-14.367 -30.512,-30.744 v -106.004 -3.966 l 3.966,-0.007 46.368,-0.083 3.981,-0.007 v 3.981 79.063 h 41.875 V 420.574 l -65.706,0.016 c -16.239,0 -30.484,-14.553 -30.484,-31.143 V 211.282 c 0,-16.599 14.258,-31.16 30.512,-31.16 h 92.918 c 16.263,0 30.529,14.561 30.529,31.16 z" /></svg> },
];

const footerNav = [
  ['Product', [['Platform', 'dashboard'], ['Features', 'capabilities'], ['Relationship graph', 'relationships']] as [string, string][]],
  ['Company', [['Contact', 'contact'], ['Pricing', 'pricing'], ['FAQ', 'faq']] as [string, string][]],
] as const;

export function Footer({ onPrivacy, onTerms, onHome }: { onPrivacy?: () => void; onTerms?: () => void; onHome?: () => void }) {
  const handleNav = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (document.getElementById(id)) return;
    e.preventDefault();
    onHome?.();
    setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      const headerH = document.querySelector('.site-header')?.getBoundingClientRect().height ?? 0;
      const y = el.getBoundingClientRect().top + window.scrollY - headerH;
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
    }, 120);
  };
  return <footer className="footer"><div className="footer-main"><div className="footer-brand"><button className="brand" onClick={() => { onHome?.(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} aria-label="Segurara home"><Logo /></button><p>AI Runtime & Application<br />Security Intelligence</p><div className="footer-social">{socialLinks.map(({ href, label, icon: Icon }) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label={label}><Icon size={15} /></a>)}</div></div>{footerNav.map(([title, links]) => <div className="footer-col" key={title}><b>{title}</b>{links.map(([label, id]) => <a href={`#${id}`} key={label} onClick={(e) => handleNav(e, id)}>{label}</a>)}</div>)}<div className="footer-map-col"><b>Location</b><div className="footer-maps"><div className="footer-map-wrap"><iframe title="Segurara Sri Lanka location" src="https://www.google.com/maps?q=42+Lotus+Arcade,+Ward+Place,+Colombo+07,+Sri+Lanka&z=15&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /></div><div className="footer-map-wrap"><iframe title="Segurara USA location" src="https://www.google.com/maps?q=425+Market+Street,+Suite+310,+San+Francisco,+CA+94105,+USA&z=15&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /></div></div></div></div><div className="footer-bottom"><span>© 2026 <a href="https://segurara.com" target="_blank" rel="noopener noreferrer" className="footer-site-link">segurara.com</a>. All rights reserved.</span><div><button className="footer-link" onClick={onPrivacy}>Privacy Policy</button><button className="footer-link" onClick={onTerms}>Terms &amp; Conditions</button></div></div></footer>;
}
