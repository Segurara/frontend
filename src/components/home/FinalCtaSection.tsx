import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { SectionLabel } from '../../shared/SectionLabel';

export function FinalCtaSection({ onProduct }: { onProduct: () => void }) {
  return <section className="section-pad final-cta-section"><div className="section-intro centered"><SectionLabel>START A CONVERSATION</SectionLabel><h2>Bring more <em>context</em> to your next <em>investigation.</em></h2><p>Discuss your security environment, investigation priorities, and evaluation requirements with the Segurara team.</p><div className="hero-actions"><button className="primary-button" onClick={() => { const el = document.getElementById('contact'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}>Request a Demo <ArrowUpRight size={17} /></button><button className="secondary-button" onClick={onProduct}>Explore the Platform <ChevronRight size={17} /></button></div></div></section>;
}
