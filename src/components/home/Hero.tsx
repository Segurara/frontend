import {
  ArrowUpRight,
  Check,
  ChevronRight,
} from 'lucide-react';
import heroUrl from '../../assets/3.png';

export function Hero({ onProduct }: { onProduct: () => void }) {
  return <section className="hero section-pad"><div className="hero-copy reveal"><div className="eyebrow"><span className="pulse-dot" /> AI RUNTIME & APPLICATION SECURITY INTELLIGENCE</div><h1>See the <em>threat</em> behind the <em>signal</em>.</h1><p>Link runtime, application, API, identity, and AI service activity together to provide evidence-based context to help analysts analyze suspicious activity and take the appropriate next actions.</p><div className="hero-actions"><button className="primary-button" onClick={onProduct}>Explore the Platform <ArrowUpRight size={17} /></button><a className="secondary-button" href="#how-it-works">See How It Works <ChevronRight size={17} /></a></div><div className="hero-proof"><span><Check size={14} /> Evidence linked</span><span><Check size={14} /> Human-led decisions</span><span><Check size={14} /> Context, not noise</span></div></div><div className="hero-visual hero-image-wrap"><img src={heroUrl} alt="Segurara security intelligence platform" className="hero-image" /></div></section>;
}
