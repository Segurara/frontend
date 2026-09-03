import {
  ArrowUpRight,
  Boxes,
  BrainCircuit,
  Check,
  ChevronRight,
  CircleDot,
  Cloud,
  Code2,
  Database,
  Fingerprint,
  Globe2,
  LockKeyhole,
  Sparkles,
} from 'lucide-react';

export function Hero({ onProduct }: { onProduct: () => void }) {
  return <section className="hero section-pad"><div className="hero-copy reveal"><div className="eyebrow"><span className="pulse-dot" /> AI RUNTIME & APPLICATION SECURITY INTELLIGENCE</div><h1>See the <em>threat</em> behind the <em>signal</em>.</h1><p>Link runtime, application, API, identity, and AI service activity together to provide evidence-based context to help analysts analyze suspicious activity and take the appropriate next actions.</p><div className="hero-actions"><button className="primary-button" onClick={onProduct}>Explore the Platform <ArrowUpRight size={17} /></button><a className="secondary-button" href="#how-it-works">See How It Works <ChevronRight size={17} /></a></div><div className="hero-proof"><span><Check size={14} /> Evidence linked</span><span><Check size={14} /> Human-led decisions</span><span><Check size={14} /> Context, not noise</span></div></div><HeroVisual /></section>;
}

function HeroVisual() {
  const visualNodes = [
    ['AI model endpoint', 'top'], ['Application', 'left'], ['Identity', 'bottom-left'], ['API', 'top-right'], ['Container', 'bottom'], ['Cloud workload', 'right'], ['Database', 'bottom-right'], ['Security tool', 'far-right'],
  ];
  return <div className="hero-visual reveal"><div className="visual-orbit orbit-one" /><div className="visual-orbit orbit-two" /><svg className="hero-lines" viewBox="0 0 640 560" fill="none"><path d="M320 282 C260 180 150 115 76 86" /><path d="M320 282 C245 250 142 246 56 270" /><path d="M320 282 C235 345 152 405 98 472" /><path d="M320 282 C318 150 325 92 322 38" /><path d="M320 282 C400 212 482 137 566 94" /><path d="M320 282 C442 270 522 255 610 248" /><path d="M320 282 C395 350 475 412 540 490" /><path d="M320 282 C338 382 360 460 364 532" /></svg><div className="core-node"><Sparkles size={23} /><strong>SEGURARA</strong><small>security context</small></div>{visualNodes.map(([label, position], i) => { const NodeIcon = [BrainCircuit, Code2, Fingerprint, Globe2, Boxes, Cloud, Database, LockKeyhole][i]; return <div className={`satellite ${position}`} key={label}><span className="satellite-icon"><NodeIcon size={15} /></span><span>{label}</span></div>; })}<div className="float-card card-event"><div className="card-kicker"><span className="status-red" /> RUNTIME EVENT <span>14:02:18</span></div><strong>Unusual request sequence</strong><small>Identity: svc-payment</small><div className="card-meter"><span style={{ width: '78%' }} /></div><div className="meter-label"><span>Risk indicator</span><b>Elevated</b></div></div><div className="float-card card-correlation"><div className="card-kicker">CORRELATED ACTIVITY <span className="status-green" /></div><strong>4 related events</strong><div className="mini-stats"><span><b>2</b> workloads</span><span><b>1</b> identity</span><span><b>3</b> API calls</span></div></div><div className="float-card card-status"><div className="card-kicker">INVESTIGATION STATUS</div><span><Check size={13} /> Evidence linked</span><span><Check size={13} /> Timeline reconstructed</span><span className="muted"><CircleDot size={13} /> Analyst review required</span></div></div>;
}
