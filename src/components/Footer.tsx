import { Logo } from './Logo';
import { Facebook, Youtube, Linkedin } from 'lucide-react';

const socialLinks = [
  { href: 'https://www.facebook.com/SeguraraAI/', label: 'Facebook', icon: Facebook },
  { href: 'https://medium.com/@Segurara/', label: 'Medium', icon: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg> },
  { href: 'https://www.youtube.com/@Segurara', label: 'YouTube', icon: Youtube },
  { href: 'https://www.linkedin.com/company/segurara/', label: 'LinkedIn', icon: Linkedin },
];

export function Footer({ onPrivacy, onTerms }: { onPrivacy?: () => void; onTerms?: () => void }) {
  return <footer className="footer"><div className="footer-main"><div className="footer-brand"><button className="brand"><Logo /><span className="brand-text">SEGURARA</span></button><p>AI Runtime & Application<br />Security Intelligence</p><div className="footer-social">{socialLinks.map(({ href, label, icon: Icon }) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label={label}><Icon size={15} /></a>)}</div></div><div className="footer-col"><b>Product</b><a href="#dashboard">Platform</a><a href="#capabilities">Features</a><a href="#relationships">Relationship graph</a></div><div className="footer-col"><b>Company</b><a href="#contact">Contact</a><a href="#pricing">Pricing</a><a href="#faq">FAQ</a></div><div className="footer-map-col"><b>Location</b><div className="footer-map-wrap"><iframe title="Segurara Sri Lanka location" src="https://www.google.com/maps?q=Colombo%2C%20Sri%20Lanka&z=7&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /></div></div></div><div className="footer-bottom"><span>© 2026 Segurara. All rights reserved.</span><div><button className="footer-link" onClick={onPrivacy}>Privacy</button><button className="footer-link" onClick={onTerms}>Terms</button></div></div></footer>;
}
