import { useEffect, useRef, useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { Turnstile } from '@marsidev/react-turnstile';
import { ProductPage as SeguraSecureProductPage } from './ProductPage';
import {
  Activity,
  ArrowUpRight,
  Bell,
  Bot,
  Boxes,
  BrainCircuit,
  Check,
  ChevronDown,
  ChevronRight,
  CircleDot,
  Cloud,
  Code2,
  Database,
  Eye,
  FileSearch,
  Fingerprint,
  GitBranch,
  Globe2,
  Layers3,
  LayoutDashboard,
  Link2,
  LockKeyhole,
  Menu,
  Network,
  Plus,
  Radar,
  Search,
  Send,
  Server,
  ShieldCheck,
  Sparkles,
  Target,
  Terminal,
  UserRound,
  X,
} from 'lucide-react';

type Icon = typeof Activity;
type Route = 'home' | 'product' | 'privacy' | 'terms';

type NodeItem = { label: string; type: string; x: number; y: number; color: string; icon: Icon };

const nodeItems: NodeItem[] = [
  { label: 'User', type: 'Identity', x: 12, y: 18, color: '#c4b5fd', icon: UserRound },
  { label: 'svc-payment', type: 'Identity', x: 32, y: 38, color: '#fbbf24', icon: Fingerprint },
  { label: 'checkout-api', type: 'Application', x: 50, y: 18, color: '#22d3ee', icon: Code2 },
  { label: '/api/payment', type: 'API endpoint', x: 72, y: 38, color: '#a855f7', icon: Globe2 },
  { label: 'production-eu-01', type: 'Workload', x: 46, y: 66, color: '#34d399', icon: Server },
  { label: 'AI endpoint', type: 'AI service', x: 80, y: 72, color: '#fb7185', icon: BrainCircuit },
  { label: 'payments-db', type: 'Database', x: 23, y: 78, color: '#818cf8', icon: Database },
];

const capabilities = [
  { title: 'Runtime Security Intelligence', text: 'Structure application behavior, workload activity, identity context, and endpoint data into a well-structured investigation view.', icon: Radar, accent: 'cyan' },
  { title: 'Threat Correlation Workspace', text: 'Link potential relationships between identities, services, APIs, workloads, and detections.', icon: GitBranch, accent: 'violet' },
  { title: 'AI Investigation Assistant', text: 'Ask investigative questions and consider answers suggested by the system according to the evidence gathered', icon: Bot, accent: 'amber' },
  { title: 'Security Relationship Graph', text: 'Analyze entity relationships, potential attack paths, and affected areas without losing temporal context.', icon: Network, accent: 'green' },
  { title: 'Security Operations Dashboard', text: 'Check risk indicators, case activities, telemetry status, and investigation status in one place.', icon: LayoutDashboard, accent: 'pink' },
  { title: 'Controlled Response Support', text: 'Prepare response actions for analyst approval with governance and audit history.', icon: ShieldCheck, accent: 'blue' },
];

const faqs = [
  ['What is Segurara?', 'Segurara is a platform that enables the linking of activity across applications, APIs, identities, workloads, AI services, and infrastructure in an investigation view.'],
  ['What information can Segurara connect?', 'Segurara connects selected data sources into a structured investigation context.'],
  ['Does Segurara automatically block threats?', 'The platform is meant for supporting security investigations, evidence examination, and analyst-based decisions. Response actions depend on the configuration and approval of the organization.'],
  ['How does Segurara use AI?', 'Artificial intelligence will be used to summarize evidence, identify possible connections, and generate investigation questions and evidence review steps.'],
  ['Can analysts investigate using natural language?', 'The investigation assistant helps analysts ask questions and review evidence-linked answers.'],
  ['Does Segurara support relationship and attack-path analysis?', 'The feature of relationship views will provide analysts with the opportunity to study the connections between identities, applications, APIs, workloads, services, and endpoints.'],
];

type ChatMessage = { role: 'user' | 'assistant'; text: string; pills?: string[]; suggestion?: string };

const aiResponses: Record<string, ChatMessage> = {
  'why is this activity considered risky': { role: 'assistant', text: 'The activity is associated with an unusual API sequence involving a service identity and a production workload. The combination of an elevated risk indicator and an atypical request pattern suggests this warrants analyst review.', pills: ['4 correlated events', '2 related entities', 'Unusual request pattern', 'Elevated risk indicator'], suggestion: 'Review the linked identity and workload timeline.' },
  'why is this workload suspicious': { role: 'assistant', text: 'The workload is associated with an unusual sequence of API and identity events. This is an indication for review, not a definitive conclusion.', pills: ['6 correlated events', '2 identity relationships', '1 elevated runtime indicator'], suggestion: 'Review service identity activity between 14:00 and 14:10.' },
  'what is the risk level': { role: 'assistant', text: 'Current risk level for CASE-2048 is Elevated with 87% confidence. The risk is driven by anomalous API call patterns from a service identity interacting with a production workload outside its normal baseline.', pills: ['Risk: Elevated', 'Confidence: 87%', '5 connected entities'], suggestion: 'Examine the entity relationship graph for lateral movement paths.' },
  'show me the timeline': { role: 'assistant', text: 'The incident timeline shows 4 key events between 14:02:11 and 14:02:24 UTC: an API request, an identity anomaly, a runtime event, and a model endpoint call — all within 13 seconds.', pills: ['14:02:11 API request', '14:02:14 Identity anomaly', '14:02:18 Runtime event', '14:02:24 Model endpoint call'], suggestion: 'Review each event in sequence to identify the initial trigger.' },
  'what entities are involved': { role: 'assistant', text: 'Five entities are connected to this case: the service identity svc-payment, the application checkout-api, the API endpoint /api/payment, the workload production-eu-01, and the AI endpoint risk-review-model.', pills: ['svc-payment', 'checkout-api', '/api/payment', 'production-eu-01', 'risk-review-model'], suggestion: 'Inspect the relationship graph to see how these entities connect.' },
  'is this a data breach': { role: 'assistant', text: 'There is no confirmed data breach at this time. The activity shows elevated risk indicators and unusual patterns, but analyst review is required to determine if data was exfiltrated or if this is a false positive.', pills: ['No confirmed breach', 'Analyst review required', 'Investigation ongoing'], suggestion: 'Check database access logs for the payments-db entity.' },
  'what should i do next': { role: 'assistant', text: 'Based on the current investigation state, the recommended next steps are: review the linked identity timeline, inspect the entity relationship graph, and check telemetry health for any gaps in coverage.', pills: ['Review identity timeline', 'Inspect entity graph', 'Check telemetry coverage'], suggestion: 'Start with the svc-payment identity activity between 14:00 and 14:10.' },
  'who is affected': { role: 'assistant', text: 'The primary entities under investigation are the service identity svc-payment and the checkout-api application. No end-user impact has been confirmed yet, but the production workload production-eu-01 is involved.', pills: ['svc-payment (identity)', 'checkout-api (application)', 'production-eu-01 (workload)'], suggestion: 'Review user session data for any anomalies during the incident window.' },
};

const fallbackMessages: ChatMessage[] = [
  { role: 'assistant', text: 'I can help with security investigation questions related to the current case context. Try asking about risk levels, timelines, entities, or next steps. For full AI-powered analysis, please subscribe to Segurara Professional or higher.', pills: ['Try: "What is the risk level?"', 'Try: "Show me the timeline"', 'Subscribe for full access'], suggestion: 'Ask about the current case context for a relevant response.' },
  { role: 'assistant', text: 'I don\'t have enough context to answer that specific question. I\'m optimized for questions about the current investigation case. For deeper analysis, upgrade your plan to unlock advanced AI capabilities.', pills: ['Limited context available', 'Upgrade for full AI analysis', 'Current case: CASE-2048'], suggestion: 'Try asking about entities, risk levels, or the investigation timeline.' },
  { role: 'assistant', text: 'That query is outside my current analysis scope. I can assist with investigation-related questions such as risk assessment, entity relationships, timeline analysis, and next-step suggestions. Subscribe for broader security intelligence queries.', pills: ['Scope: Investigation context', 'Subscribe for broader queries', '2 remaining questions today'], suggestion: 'Rephrase your question to focus on the active case.' },
];

const events = [
  { time: '14:02:11', label: 'API request', detail: 'POST /api/payment', color: 'cyan' },
  { time: '14:02:14', label: 'Identity anomaly', detail: 'svc-payment · unusual scope', color: 'amber' },
  { time: '14:02:18', label: 'Runtime event', detail: 'checkout-api · elevated indicator', color: 'rose' },
  { time: '14:02:24', label: 'Model endpoint call', detail: 'risk-review-model · linked', color: 'violet' },
];

function App() {
  const [route, setRoute] = useState<Route>(window.location.pathname === '/product' ? 'product' : window.location.pathname === '/privacy' ? 'privacy' : window.location.pathname === '/terms' ? 'terms' : 'home');

  useEffect(() => {
    const onPopState = () => setRoute(window.location.pathname === '/product' ? 'product' : window.location.pathname === '/privacy' ? 'privacy' : window.location.pathname === '/terms' ? 'terms' : 'home');
    window.addEventListener('popstate', onPopState);
    window.scrollTo({ top: 0, behavior: 'instant' });
    return () => window.removeEventListener('popstate', onPopState);
  }, [route]);

  const navigate = (nextRoute: Route) => {
    const path = nextRoute === 'product' ? '/product' : nextRoute === 'privacy' ? '/privacy' : nextRoute === 'terms' ? '/terms' : '/';
    window.history.pushState({}, '', path);
    setRoute(nextRoute);
  };

  return route === 'product' ? <ProductPage onHome={() => navigate('home')} onPrivacy={() => navigate('privacy')} onTerms={() => navigate('terms')} /> : route === 'privacy' ? <PrivacyPage onHome={() => navigate('home')} /> : route === 'terms' ? <TermsPage onHome={() => navigate('home')} /> : <HomePage onProduct={() => navigate('product')} onHome={() => navigate('home')} onPrivacy={() => navigate('privacy')} onTerms={() => navigate('terms')} />;
}

function Header({ onProduct, onHome, product = false }: { onProduct?: () => void; onHome: () => void; product?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState('');
  const links = product ? ['Overview', 'Investigations', 'Entities', 'Telemetry'] : ['Platform', 'Capabilities', 'How it works', 'Pricing', 'FAQ', 'Contact'];
  const hrefs = product ? ['#workspace', '#workspace', '#workspace', '#workspace'] : ['how-it-works', 'capabilities', 'how-it-works', 'pricing', 'faq', 'contact'];

  useEffect(() => {
    if (product) return;
    const onScroll = () => {
      const offset = 130;
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
  }, [product, hrefs]);

  return (
    <header className={`site-header ${product ? 'workspace-header' : ''}`}>
      <button className="brand" onClick={() => { onHome(); setMenuOpen(false); }} aria-label="Segurara home"><span className="brand-mark"><span /></span> SEGURARA</button>
      <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {links.map((link, index) => <a className={activeId === hrefs[index] && !product ? 'active' : ''} href={product ? hrefs[index] : `#${hrefs[index]}`} key={link} onClick={() => setMenuOpen(false)}>{link}</a>)}
        <button className="header-cta nav-cta-mobile" onClick={() => { setMenuOpen(false); onProduct?.(); }}>{product ? 'Open marketing site' : 'Explore the platform'} <ChevronRight size={15} /></button>
      </nav>
      <div className="header-actions">
        <button className="header-cta" onClick={onProduct}>{product ? 'Open marketing site' : 'See the platform'} <ChevronRight size={15} /></button>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X size={19} /> : <Menu size={19} />}</button>
      </div>
    </header>
  );
}

function HomePage({ onProduct, onHome, onPrivacy, onTerms }: { onProduct: () => void; onHome: () => void; onPrivacy: () => void; onTerms: () => void }) {
  useEffect(() => { document.title = 'Segurara — Security Intelligence for Modern Applications'; }, []);
  return (
    <div className="site-shell">
      <Header onProduct={onProduct} onHome={onHome} />
      <main>
        <Hero onProduct={onProduct} />
        <ContextSection />
        <PlatformSection />
        <CapabilitiesSection />
        <RuntimeSection />
        <CorrelationSection onProduct={onProduct} />
        <AssistantSection />
        <GraphSection onProduct={onProduct} />
        <DashboardPreview onProduct={onProduct} />
        <AudienceSection />
        <TestimonialSection />
        <PricingSection onProduct={onProduct} />
        <FaqSection />
        <AboutContact />
        <DocsSection />
        <FinalCtaSection onProduct={onProduct} />
      </main>
      <Footer onPrivacy={onPrivacy} onTerms={onTerms} />
    </div>
  );
}

function Hero({ onProduct }: { onProduct: () => void }) {
  return <section className="hero section-pad"><div className="hero-copy reveal"><div className="eyebrow"><span className="pulse-dot" /> AI RUNTIME & APPLICATION SECURITY INTELLIGENCE</div><h1>See the <em>threat</em> behind the <em>signal</em>.</h1><p>Link runtime, application, API, identity, and AI service activity together to provide evidence-based context to help analysts analyze suspicious activity and take the appropriate next actions.</p><div className="hero-actions"><button className="primary-button" onClick={onProduct}>Explore the Platform <ArrowUpRight size={17} /></button><a className="secondary-button" href="#how-it-works">See How It Works <ChevronRight size={17} /></a></div><div className="hero-proof"><span><Check size={14} /> Evidence linked</span><span><Check size={14} /> Human-led decisions</span><span><Check size={14} /> Context, not noise</span></div></div><HeroVisual /></section>;
}

function HeroVisual() {
  const visualNodes = [
    ['AI model endpoint', 'top'], ['Application', 'left'], ['Identity', 'bottom-left'], ['API', 'top-right'], ['Container', 'bottom'], ['Cloud workload', 'right'], ['Database', 'bottom-right'], ['Security tool', 'far-right'],
  ];
  return <div className="hero-visual reveal"><div className="visual-orbit orbit-one" /><div className="visual-orbit orbit-two" /><svg className="hero-lines" viewBox="0 0 640 560" fill="none"><path d="M320 282 C260 180 150 115 76 86" /><path d="M320 282 C245 250 142 246 56 270" /><path d="M320 282 C235 345 152 405 98 472" /><path d="M320 282 C318 150 325 92 322 38" /><path d="M320 282 C400 212 482 137 566 94" /><path d="M320 282 C442 270 522 255 610 248" /><path d="M320 282 C395 350 475 412 540 490" /><path d="M320 282 C338 382 360 460 364 532" /></svg><div className="core-node"><Sparkles size={23} /><strong>SEGURARA</strong><small>security context</small></div>{visualNodes.map(([label, position], i) => { const NodeIcon = [BrainCircuit, Code2, Fingerprint, Globe2, Boxes, Cloud, Database, LockKeyhole][i]; return <div className={`satellite ${position}`} key={label}><span className="satellite-icon"><NodeIcon size={15} /></span><span>{label}</span></div>; })}<div className="float-card card-event"><div className="card-kicker"><span className="status-red" /> RUNTIME EVENT <span>14:02:18</span></div><strong>Unusual request sequence</strong><small>Identity: svc-payment</small><div className="card-meter"><span style={{ width: '78%' }} /></div><div className="meter-label"><span>Risk indicator</span><b>Elevated</b></div></div><div className="float-card card-correlation"><div className="card-kicker">CORRELATED ACTIVITY <span className="status-green" /></div><strong>4 related events</strong><div className="mini-stats"><span><b>2</b> workloads</span><span><b>1</b> identity</span><span><b>3</b> API calls</span></div></div><div className="float-card card-status"><div className="card-kicker">INVESTIGATION STATUS</div><span><Check size={13} /> Evidence linked</span><span><Check size={13} /> Timeline reconstructed</span><span className="muted"><CircleDot size={13} /> Analyst review required</span></div></div>;
}

function SectionLabel({ children }: { children: string }) { return <div className="section-label"><span /> {children}</div>; }
function ContextSection() { return <section className="section-pad context-section"><div className="section-intro"><SectionLabel>THE SECURITY CONTEXT GAP</SectionLabel><h2>When signals stay <em>apart,</em> risk stays <em>unclear.</em></h2><p>Modern applications produce activity in runtimes, APIs, identities, AI services, containers, and infrastructure. Segurara brings together all that information so investigators can investigate the incident in one investigation.</p></div><div className="context-compare"><div className="compare-card isolated"><div className="compare-head"><span>WITHOUT CONTEXT</span><small>Fragmented signals</small></div><div className="alert-stack">{['API alert', 'Identity alert', 'Runtime alert', 'AI endpoint alert', 'Infrastructure alert'].map((x, i) => <div className="alert-row" key={x}><span className={`alert-icon a${i}`}><Activity size={14} /></span>{x}<span className="alert-time">0{i + 2}:0{i + 1}</span></div>)}</div><div className="compare-foot">5 separate alerts <span>→</span></div></div><div className="context-arrow"><Link2 size={22} /></div><div className="compare-card unified"><div className="compare-head"><span>WITH SEGURARA</span><small>One investigation context</small></div><div className="unified-visual"><div className="unified-core"><Radar size={22} /><span>ONE INVESTIGATION<br />CONTEXT</span></div>{['Entity', 'Timeline', 'Evidence', 'Risk', 'Relationships'].map((x, i) => <span className={`unified-pill p${i}`} key={x}>{x}</span>)}</div><div className="compare-foot bright"><Check size={14} /> 5 signals, one coherent view</div></div></div></section>; }

function PlatformSection() {
  const stages = ['Connect', 'Normalize', 'Correlate', 'Enrich', 'Investigate', 'Decide'];
  const stageIcons: Icon[] = [Activity, Layers3, GitBranch, Sparkles, FileSearch, ShieldCheck];
  const stageDescriptions = ['Bring selected information from applications, APIs, AI services, identities, workloads, and infrastructure sources.', 'Prepare information from different sources in a consistent structure for investigation.', 'Identify potential relationships across events, entities, services, APIs, and workloads.', 'Bring contextual risk indicators and supporting evidence together around selected activity.', 'Examine timelines, entity relationships, potential attack paths, and available evidence.', 'Help analysts review evidence, determine appropriate next steps, and maintain a clear decision history.'];
  const [active, setActive] = useState(2);
  const ActiveIcon = stageIcons[active];
  return <section id="how-it-works" className="section-pad platform-section"><div className="section-intro centered"><SectionLabel>HOW SEGURARA WORKS</SectionLabel><h2>Context at every <em>step.</em></h2></div><div className="pipeline-panel"><div className="pipeline-head"><div><span className="overline">HOW SEGURARA WORKS</span><h3>From signal to decision</h3></div><div className="live-chip"><span className="pulse-dot" /> LIVE PREVIEW</div></div><div className="pipeline">{stages.map((stage, i) => <button key={stage} className={`pipeline-stage ${active === i ? 'active' : ''}`} onMouseEnter={() => setActive(i)} onClick={() => setActive(i)}><span className="stage-number">0{i + 1}</span><span>{stage}</span>{i < stages.length - 1 && <ChevronRight size={15} />}</button>)}</div><div className="pipeline-detail"><div className="detail-icon"><ActiveIcon size={24} /></div><div><span className="overline">STAGE 0{active + 1}</span><h4>{stages[active]}</h4><p>{stageDescriptions[active]}</p></div></div></div></section>;
}

function CapabilitiesSection() { return <section id="capabilities" className="section-pad capabilities-section"><div className="section-intro"><SectionLabel>BUILT FOR INVESTIGATION</SectionLabel><h2>Clarity for the moments<br />that <em>matter.</em></h2><p>Purpose-built investigation surfaces help security teams move from isolated activity to evidence-supported understanding while keeping analysts responsible for final decisions.</p></div><div className="capability-grid">{capabilities.map(({ title, text, icon: IconComponent, accent }) => <article className={`capability-card ${accent}`} key={title}><div className="cap-top"><div className="cap-icon"><IconComponent size={20} /></div></div><h3>{title}</h3><p>{text}</p><div className="cap-visual"><span /><span /><span /><span /><span /></div></article>)}</div></section>; }

function RuntimeSection() { return <section className="section-pad runtime-section"><div className="runtime-copy"><SectionLabel>RUNTIME INTELLIGENCE</SectionLabel><h2>See behavior in <em>context.</em></h2><p>Connect what an application did with who did it, where it ran and what it touched. Every signal gains the context an analyst needs.</p><div className="bullet-list"><span><Check size={15} /> Application-aware activity</span><span><Check size={15} /> Workload and identity linkage</span><span><Check size={15} /> Transparent risk indicators</span></div></div><RuntimePanel /></section>; }
function RuntimePanel() { return <div className="runtime-panel"><div className="panel-top"><span className="live-chip"><span className="pulse-dot" /> RUNTIME ACTIVITY</span><span className="panel-time">TODAY · 14:02:24 UTC</span></div><div className="runtime-fields">{[['APPLICATION', 'checkout-api', Code2], ['WORKLOAD', 'production-eu-01', Server], ['IDENTITY', 'svc-payment', Fingerprint], ['ENDPOINT', '/api/payment', Globe2]].map(([label, value, IconComponent]) => <div className="runtime-field" key={label as string}><span className="field-icon"><IconComponent size={14} /></span><div><small>{label as string}</small><strong>{value as string}</strong></div></div>)}</div><div className="activity-callout"><div><span className="overline">ACTIVITY</span><strong>Unusual request sequence</strong></div><div className="risk-badge">ELEVATED <span>87% confidence</span></div></div><div className="timeline"><div className="timeline-line" />{events.map((event) => <div className="timeline-event" key={event.time}><span className={`event-dot ${event.color}`} /><div><b>{event.time}</b><strong>{event.label}</strong><small>{event.detail}</small></div></div>)}</div></div>; }

function CorrelationSection({ onProduct }: { onProduct: () => void }) { return <section className="section-pad correlation-section"><div className="correlation-panel"><div className="correlation-left"><SectionLabel>EVENT CORRELATION</SectionLabel><h2>Turn disconnected events into a <em>connected investigation.</em></h2><p>Follow related activity across APIs, identities, services, workloads, and AI endpoints, then review the available relationships and supporting evidence.</p><div className="event-list">{events.map((event, i) => <div className="event-row" key={event.time}><span className={`event-dot ${event.color}`} /><div><b>{event.time}</b><strong>{event.label}</strong><small>{event.detail}</small></div>{i < events.length - 1 && <div className="event-connector" />}</div>)}</div></div><div className="correlation-right"><div className="correlation-head"><span className="overline">CORRELATED ACTIVITY</span><span className="risk-badge">ELEVATED</span></div><div className="relationship-chain"><span>Identity</span><ChevronRight /><span>Service</span><ChevronRight /><span>API</span><ChevronRight /><span>Workload</span><ChevronRight /><span>AI endpoint</span></div><div className="evidence-grid"><div><small>SUPPORTING EVIDENCE</small><strong>6 linked signals</strong></div><div><small>RELATED ENTITIES</small><strong>5 connected</strong></div><div><small>CONFIDENCE</small><strong>87%</strong></div><div><small>CASE STATUS</small><strong className="green-text">Needs review</strong></div></div><button className="ghost-button" onClick={onProduct}>Open investigation <ArrowUpRight size={15} /></button></div></div></section>; }

function AssistantSection() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'user', text: 'Why is this activity considered risky?' },
    { role: 'assistant', text: 'The activity is associated with an unusual API sequence involving a service identity and a production workload.', pills: ['4 correlated events', '2 related entities', 'Unusual request pattern', 'Elevated risk indicator'], suggestion: 'Review the linked identity and workload timeline.' },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const fallbackIdx = useRef(0);

  const handleSubmit = (q: string) => {
    const trimmed = q.trim();
    if (!trimmed || typing) return;
    const userMsg: ChatMessage = { role: 'user', text: trimmed };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      const key = trimmed.toLowerCase().replace(/[?!.,]/g, '').trim();
      const match = Object.keys(aiResponses).find((k) => key.includes(k));
      let reply: ChatMessage;
      if (match) {
        reply = { ...aiResponses[match] };
      } else {
        reply = { ...fallbackMessages[fallbackIdx.current % fallbackMessages.length] };
        fallbackIdx.current++;
      }
      setMessages((m) => [...m, reply]);
      setTyping(false);
    }, 800);
  };

  return (
    <section id="assistant" className="section-pad assistant-section">
      <div className="assistant-intro">
        <SectionLabel>AI INVESTIGATION ASSISTANT</SectionLabel>
        <h2>Ask questions. <em>Review the evidence.</em></h2>
        <p>Ask investigation questions and review suggested answers linked to the available security evidence.</p>
        <span className="evidence-tag"><Sparkles size={14} /> EVIDENCE-LINKED RESPONSE</span>
      </div>
      <div className="assistant-panel">
        <div className="assistant-top">
          <div className="assistant-brand">
            <span className="ai-orb"><Bot size={18} /></span>
            <div><strong>Segurara AI</strong><small>Investigation assistant</small></div>
          </div>
          <span className="context-chip"><CircleDot size={12} /> Case CASE-2048</span>
        </div>
        <div className="chat">
          {messages.map((msg, i) => msg.role === 'user' ? (
            <div className="chat-question" key={i}>{msg.text}</div>
          ) : (
            <div className="chat-answer" key={i}>
              <div className="answer-mark"><Sparkles size={16} /></div>
              <div>
                <p>{msg.text}</p>
                {msg.pills && msg.pills.length > 0 && <>
                  <span className="answer-label">SUPPORTING EVIDENCE</span>
                  <div className="answer-pills">{msg.pills.map((p) => <span key={p}>{p}</span>)}</div>
                </>}
                {msg.suggestion && <div className="suggestion"><ChevronRight size={15} /> Suggested next step: {msg.suggestion}</div>}
              </div>
            </div>
          ))}
          {typing && <div className="chat-answer typing-indicator"><div className="answer-mark"><Sparkles size={16} /></div><div><span className="typing-dots"><span /><span /><span /></span></div></div>}
        </div>
        <form className="assistant-input" onSubmit={(e) => { e.preventDefault(); handleSubmit(input); }}>
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask another question..." disabled={typing} />
          <button type="submit" disabled={typing || !input.trim()}><Send size={16} /></button>
        </form>
      </div>
    </section>
  );
}

function GraphSection({ onProduct }: { onProduct: () => void }) { const [selected, setSelected] = useState<NodeItem>(nodeItems[2]); const SelectedIcon = selected.icon; return <section id="relationships" className="section-pad graph-section"><div className="section-intro centered"><SectionLabel>SECURITY RELATIONSHIP GRAPH</SectionLabel><h2>Follow the connections behind the <em>activity.</em></h2><p>Examine how identities, applications, APIs, workloads, services, databases, and AI endpoints may be connected within an investigation.</p></div><div className="graph-panel"><div className="graph-canvas"><svg className="graph-lines" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M12 18 L32 38 L50 18 L72 38 L46 66 L80 72 M32 38 L23 78 M50 18 L46 66" /></svg>{nodeItems.map((node) => { const NodeIcon = node.icon; return <button className={`graph-node ${selected.label === node.label ? 'selected' : ''}`} style={{ left: `${node.x}%`, top: `${node.y}%`, '--node-color': node.color } as React.CSSProperties} key={node.label} onClick={() => setSelected(node)} onMouseEnter={() => setSelected(node)}><span><NodeIcon size={15} /></span><small>{node.label}</small></button>; })}<div className="graph-legend"><span><i className="legend-dot cyan" /> Application</span><span><i className="legend-dot amber" /> Identity</span><span><i className="legend-dot green" /> Workload</span></div></div><div className="entity-panel"><div className="panel-top"><span className="overline">SELECTED ENTITY</span></div><div className="entity-icon" style={{ color: selected.color }}><SelectedIcon size={22} /></div><h3>{selected.label}</h3><span className="entity-type">{selected.type}</span><div className="entity-details"><div><small>Related events</small><strong>{selected.label === 'checkout-api' ? 18 : 6}</strong></div><div><small>Risk indicators</small><strong className="rose-text">{selected.label === 'checkout-api' ? 3 : 1}</strong></div><div><small>Last activity</small><strong>14:02:24</strong></div></div><button className="ghost-button" onClick={onProduct}>Inspect entity <ArrowUpRight size={15} /></button></div></div></section>; }

function DashboardPreview({ onProduct }: { onProduct: () => void }) {
  const metrics = [
    { label: 'ACTIVE CASES', value: 24, note: 'up', noteText: '+8 this week' },
    { label: 'HIGH PRIORITY', value: 12, note: 'warn', noteText: 'Needs review' },
    { label: 'RISK SIGNALS', value: 137, note: 'risk', noteText: 'Across 18 sources' },
    { label: 'TELEMETRY HEALTH', value: 984, note: 'good', noteText: 'All sources nominal', decimal: true },
  ];
  const barSources = [['API', 82], ['Identity', 64], ['Runtime', 91], ['Cloud', 47], ['AI', 73], ['Network', 58]] as const;
  const [counts, setCounts] = useState(metrics.map(() => 0));
  const [revealed, setRevealed] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [pointMoved, setPointMoved] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          setPointMoved(true);
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!revealed) return;
    const duration = 1400;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setCounts(metrics.map((m) => Math.round(m.value * eased)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [revealed, metrics.length]);

  return (
    <section ref={sectionRef} className={`section-pad dashboard-preview ${revealed ? 'dash-revealed' : ''}`}>
      <div className="section-intro">
        <SectionLabel>SECURITY OPERATIONS DASHBOARD</SectionLabel>
        <h2>Keep investigations and <em>risk in view.</em></h2>
        <p>Review case activity, risk indicators, telemetry condition, and investigation progress within a structured operations view.</p>
        <button className="primary-button" onClick={onProduct}>Open security workspace <ArrowUpRight size={16} /></button>
      </div>
      <div className="dashboard-window">
        <div className="window-bar">
          <span className="window-brand"><span className="brand-mark mini"><span /></span> SEGURARA / OVERVIEW</span>
          <div className="window-dots"><span /><span /><span /></div>
        </div>
        <div className="dashboard-body dash-noside">
          <div className="dash-main">
            <div className="dash-heading">
              <div><span className="overline">WEDNESDAY, AUG 27</span><h3>Security intelligence</h3></div>
              <span className="live-chip"><span className="pulse-dot" /> LIVE</span>
            </div>
            <div className="metric-grid">
              {metrics.map((m, i) => (
                <div className="metric-card" style={{ animationDelay: `${i * 0.12}s` }} key={m.label}>
                  <small>{m.label}</small>
                  <strong>{m.decimal ? (counts[i] / 10).toFixed(1) + '%' : counts[i]}</strong>
                  <span className={m.note === 'good' ? 'green-text' : m.note === 'warn' ? 'amber-text' : ''}>{m.noteText}</span>
                </div>
              ))}
            </div>
            <div className="dash-charts">
              <div className="chart-card line-card">
                <div className="card-heading"><span>Risk trend</span><small>Last 7 days <ChevronDown size={13} /></small></div>
                <div className="chart">
                  <div className="chart-grid"><span /><span /><span /><span /></div>
                  <svg viewBox="0 0 440 150" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0" stopColor="#a855f7" stopOpacity=".3" />
                        <stop offset="1" stopColor="#a855f7" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path className="chart-area" d="M0 126 C38 112 48 119 74 101 S126 112 150 84 S194 92 218 72 S267 92 292 56 S336 74 358 43 S405 53 440 24 V150 H0Z" fill="url(#area)" />
                    <path className="chart-line" d="M0 126 C38 112 48 119 74 101 S126 112 150 84 S194 92 218 72 S267 92 292 56 S336 74 358 43 S405 53 440 24" fill="none" stroke="#c084fc" strokeWidth="2.5" />
                    {pointMoved && <circle className="chart-point" cx="440" cy="24" r="4" fill="#c084fc" />}
                  </svg>
                  {pointMoved && <span className="chart-scan" />}
                </div>
                <div className="chart-labels"><span>Aug 21</span><span>Aug 24</span><span>Aug 27</span></div>
              </div>
              <div className="chart-card bar-card">
                <div className="card-heading"><span>Threats by source</span><small>This week</small></div>
                <div className="bar-chart">
                  {barSources.map(([label, pct], i) => (
                    <div className="bar-item" key={label}>
                      <span className="bar-value">{pct}</span>
                      <div className="bar">
                        <div className="bar-fill" style={{ height: revealed ? `${pct}%` : '0%', animationDelay: `${i * 0.08}s` }} />
                      </div>
                      <span className="bar-label">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="chart-card pie-card">
                <div className="card-heading"><span>Risk severity</span><small>Open cases</small></div>
                <div className="pie-wrap">
                  <svg className="pie-svg" viewBox="0 0 42 42">
                    <circle className="pie-track" cx="21" cy="21" r="15.5" />
                    <g transform="rotate(-90 21 21)">
                      <circle className="pie-seg seg-high" cx="21" cy="21" r="15.5" strokeDasharray="46 97.4" strokeDashoffset="0" />
                      <circle className="pie-seg seg-mid" cx="21" cy="21" r="15.5" strokeDasharray="31 97.4" strokeDashoffset="-46" />
                      <circle className="pie-seg seg-low" cx="21" cy="21" r="15.5" strokeDasharray="16 97.4" strokeDashoffset="-77" />
                    </g>
                  </svg>
                  <div className="pie-center"><strong>{counts[0]}</strong><small>cases</small></div>
                </div>
                <div className="pie-legend">
                  <span><i className="legend-dot high" /> High · <b>12</b></span>
                  <span><i className="legend-dot mid" /> Medium · <b>8</b></span>
                  <span><i className="legend-dot low" /> Low · <b>4</b></span>
                </div>
              </div>
            </div>
            <div className="queue-card dash-queue">
              <div className="card-heading"><span>Investigation queue</span><small>View all <ChevronRight size={13} /></small></div>
              {['Suspicious API activity', 'Identity scope anomaly', 'Model endpoint access'].map((x, i) => (
                <div className="queue-row" style={{ animationDelay: `${i * 0.15}s` }} key={x}>
                  <span className={`severity s${i}`} />
                  <div><strong>{x}</strong><small>{['checkout-api', 'svc-data-pipeline', 'risk-review-model'][i]}</small></div>
                  <span className="queue-status">{['Review', 'Assigned', 'New'][i]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AudienceSection() { const audience = [['Security Operations', 'Review related activity, risk indicators, and supporting evidence to prioritize analyst attention.', Radar], ['Application Security', 'Examine application, API, identity, workload, and endpoint activity within a connected investigation view.', Code2], ['Cloud Security', 'Bring workload, identity, service, and infrastructure context together for investigation.', Cloud], ['AI Platform Teams', 'Review interactions across AI services, model endpoints, identities, applications, and workloads.', BrainCircuit], ['DevSecOps', 'Connect runtime and application-security findings with relevant development and delivery context.', Terminal], ['Incident Responders', 'Examine event timelines, entity relationships, and available evidence during incident investigation.', FileSearch]]; return <section className="section-pad audience-section"><div className="section-intro"><SectionLabel>BUILT FOR SECURITY TEAMS</SectionLabel><h2>Security works better with <em>shared context.</em></h2></div><div className="audience-grid">{audience.map(([title, text, IconComponent]) => <div className="audience-card" key={title as string}><IconComponent size={19} /><div><h3>{title as string}</h3><p>{text as string}</p></div></div>)}</div></section>; }

function TestimonialSection() { const quotes = [['The relationship graph turned a pile of disconnected alerts into a timeline I could actually walk an analyst through.', 'Dana Whitfield', 'Security Lead, Fintech Operations'], ['We stopped guessing whether an API call was part of the same incident — Segurara links the evidence before we ask.', 'Marcus Okafor', 'Head of Application Security'], ['The AI assistant suggests the right next question. It keeps our investigations grounded in evidence, not hunches.', 'Priya Raman', 'Staff Incident Responder']]; return <section className="section-pad testimonial-section"><div className="section-intro centered"><SectionLabel>CUSTOMER STORIES</SectionLabel><h2>Trusted by teams who <em>investigate.</em></h2><p>Security teams use Segurara to turn fragmented signals into context they can act on with confidence.</p></div><div className="testimonial-grid">{quotes.map(([quote, name, role]) => <figure className="testimonial-card" key={name}><div className="t-quote-mark">“</div><blockquote>{quote}</blockquote><figcaption><div className="t-avatar">{name.split(' ').map((w) => w[0]).join('')}</div><div><strong>{name}</strong><span>{role}</span></div></figcaption></figure>)}</div></section>; }

function PaymentModal({ plan, price, free = false, onClose }: { plan: string; price: string; free?: boolean; onClose: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const win = window as unknown as { paypalSdk?: any };
    const node = containerRef.current;
    if (!win.paypalSdk || !win.paypalSdk.Buttons || !node || free) return;
    let rendered: any;
    try {
      rendered = win.paypalSdk.Buttons({
        style: { layout: 'vertical', color: 'gold', shape: 'rect', label: 'paypal', height: 44 },
        createOrder: (data: any, actions: any) => actions.order.create({
          purchase_units: [{ description: `Segurara ${plan} plan`, amount: { currency_code: 'USD', value: price } }],
        }),
        onApprove: (data: any, actions: any) => actions.order.capture().then((details: any) => { setStatus('success'); }),
        onCancel: () => { setStatus('idle'); },
        onError: (err: any) => { console.error('PayPal error', err); setStatus('error'); },
      });
      rendered.render(node);
    } catch (e) { console.error('PayPal render error', e); }
    return () => {
      if (rendered && rendered.close) { try { rendered.close(); } catch { /* noop */ } }
      if (node) node.innerHTML = '';
    };
  }, [plan, price, free]);

  return (
    <div className="payment-overlay" onClick={onClose}>
      <div className="payment-modal" onClick={(e) => e.stopPropagation()}>
        <button className="payment-close" onClick={onClose} aria-label="Close"><X size={16} /></button>
        <span className="overline">SEGURARA CHECKOUT</span>
        <h3>{plan} plan</h3>
        {status === 'success' ? (
          <>
            <strong className="payment-price green-text">{free ? 'Free' : '$' + price}</strong>
            <div className="payment-success"><Check size={18} /> Thank you! Your {plan} plan {free ? 'is active' : 'payment was successful'}.</div>
            <button className="primary-button" onClick={onClose}>Done <Check size={15} /></button>
          </>
        ) : free ? (
          <>
            <strong className="payment-price green-text">Free</strong>
            <p>The Starter plan is free — no payment required. Activate it instantly.</p>
            <button className="primary-button" onClick={() => setStatus('success')}>Activate free plan <Check size={15} /></button>
            <button className="payment-cancel" onClick={onClose}>Cancel</button>
          </>
        ) : (
          <>
            <strong className="payment-price">${price}<small>/month</small></strong>
            <p>Secure checkout powered by PayPal. Complete your payment below.</p>
            {status === 'error' && <div className="payment-error">Payment could not be completed. Please try again.</div>}
            <div ref={containerRef} className="paypal-container" />
            <div className="payment-secure"><LockKeyhole size={12} /> Payments are securely processed by PayPal.</div>
            <button className="payment-cancel" onClick={onClose}>Cancel</button>
          </>
        )}
      </div>
    </div>
  );
}

function PricingSection({ onProduct }: { onProduct: () => void }) {
  const plans = [
    { title: 'Platform Starter', desc: 'For teams exploring Segurara’s investigation approach.', price: '70.00', display: '$70', note: 'Introductory evaluation', cta: 'Explore the Platform', featured: false },
    { title: 'Professional Evaluation', desc: 'For teams assessing Segurara against a defined investigation use case.', price: '150.00', display: '$150', note: 'Defined evaluation scope', cta: 'Request an Evaluation', featured: true, recommended: true },
    { title: 'Enterprise Discussion', desc: 'For organizations with broader security, governance, and deployment requirements.', price: 'Custom', display: 'Custom', note: 'Designed around your environment', cta: 'Contact Our Team', featured: false },
  ];
  const features: Record<string, string[]> = {
    'Platform Starter': ['Platform overview', 'Capability walkthrough', 'Example investigation workflow', 'Requirements discussion'],
    'Professional Evaluation': ['Use-case discovery', 'Technical requirements review', 'Guided interface demonstration', 'Evaluation-scope planning'],
    'Enterprise Discussion': ['Architecture discussion', 'Integration requirements', 'Governance considerations', 'Deployment-option review'],
  };
  const [checkout, setCheckout] = useState<(typeof plans)[0] | null>(null);
  return <section id="pricing" className="section-pad pricing-section"><div className="section-intro centered"><SectionLabel>PRICING</SectionLabel><h2>Find the right starting point for your <em>security team.</em></h2><p>Discuss your security environment, investigation priorities, and technical requirements to identify an appropriate evaluation approach.</p></div><div className="pricing-grid">{plans.map((plan, i) => <div className={`price-card ${plan.featured ? 'featured' : ''}`} key={plan.title}><div className="price-top"><span>{plan.title}</span>{plan.recommended && <b>RECOMMENDED</b>}</div><p>{plan.desc}</p><strong className="price">{plan.display}</strong><span className="price-note">{plan.note}</span>{i === 2 ? <a className="secondary-button" href="#contact">{plan.cta} <ArrowUpRight size={15} /></a> : <button className={i === 1 ? 'primary-button' : 'secondary-button'} onClick={() => (i === 0) ? onProduct() : setCheckout(plan)}>{plan.cta} <ArrowUpRight size={15} /></button>}<div className="price-features">{(features[plan.title] || []).map((feature) => <span key={feature}><Check size={14} /> {feature}</span>)}</div></div>)}</div>{checkout && <PaymentModal plan={checkout.title} price={checkout.price === '0.00' ? '0.00' : checkout.price} free={checkout.price === '0.00'} onClose={() => setCheckout(null)} />}</section>;
}

function FaqSection() { const [open, setOpen] = useState(0); return <section id="faq" className="section-pad faq-section"><div className="section-intro"><SectionLabel>QUESTIONS, WITH CONTEXT</SectionLabel><h2>Good security starts with <em>good questions.</em></h2></div><div className="faq-list">{faqs.map(([question, answer], i) => <div className={`faq-item ${open === i ? 'open' : ''}`} key={i}><button onClick={() => setOpen(open === i ? -1 : i)}><span>{question}</span><ChevronDown size={18} /></button><div className="faq-answer"><p>{answer}</p></div></div>)}</div></section>; }

function AboutContact() {
  const [state, handleSubmit] = useForm('xgaeeoov');
  const [turnstileToken, setTurnstileToken] = useState('');
  return <section className="section-pad about-contact"><div className="about-block"><SectionLabel>ABOUT SEGURARA</SectionLabel><h2>Security intelligence built around <em>context.</em></h2><p>Segurara is designed to help security teams connect application, API, identity, workload, AI-service, and infrastructure activity within an evidence-supported investigation context.</p><div className="about-meta"><span>Founded <b>November 2022</b></span><span>Segurara Technologies (Pvt) Ltd<br />Segurara Technologies LLC</span><span className="about-email">Email <b>info@segurara.com</b></span></div></div><div className="contact-card" id="contact"><div><SectionLabel>GET IN TOUCH</SectionLabel><h2>Let's build better <em>security context.</em></h2></div>{state.succeeded ? (<div className="contact-success"><Check size={20} /><strong>Message sent - thanks!</strong><p>We'll get back to you shortly at the email you provided.</p><button className="primary-button" onClick={() => window.location.reload()}>Send another <Send size={15} /></button></div>) : (<form className="contact-fields" onSubmit={handleSubmit}><input type="hidden" name="cf-turnstile-response" value={turnstileToken} /><input placeholder="Name" name="name" required /><input placeholder="Work email" type="email" name="email" required /><ValidationError prefix="Email" field="email" errors={state.errors} /><input placeholder="Company" name="company" /><input placeholder="Role" name="role" /><textarea placeholder="Tell us what you're investigating..." name="message" rows={3} required /><ValidationError prefix="Message" field="message" errors={state.errors} /><div className="contact-turnstile"><Turnstile siteKey="0x4AAAAAAEfHNxAH4NRkLi4K" onSuccess={setTurnstileToken} onError={() => setTurnstileToken('')} onExpire={() => setTurnstileToken('')} /></div><button className="primary-button" type="submit" disabled={state.submitting || !turnstileToken}>{state.submitting ? 'Sending...' : 'Contact Segurara'} <Send size={15} /></button></form>)}<div className="contact-locations"><span><b>Sri Lanka</b>42 Lotus Arcade, Ward Place, Colombo 07<em>+94 11 245 7812</em></span><span><b>USA</b>425 Market Street, San Francisco, CA<em>+1 415 555 2101</em></span></div></div></section>;
}
function DocsSection() { return <section className="section-pad docs-section"><div><SectionLabel>RESOURCES</SectionLabel><h2>Security documentation<br /><em>is coming soon.</em></h2></div><div className="docs-links">{['API documentation', 'Integration guides', 'Security architecture', 'Deployment guide', 'Developer resources'].map((x) => <span key={x}><LockKeyhole size={14} /> {x}<b>COMING SOON</b></span>)}</div></section>; }
function FinalCtaSection({ onProduct }: { onProduct: () => void }) { return <section className="section-pad final-cta-section"><div className="section-intro centered"><SectionLabel>START A CONVERSATION</SectionLabel><h2>Bring more <em>context</em> to your next <em>investigation.</em></h2><p>Discuss your security environment, investigation priorities, and evaluation requirements with the Segurara team.</p><div className="hero-actions"><button className="primary-button" onClick={() => { const el = document.getElementById('contact'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}>Request a Demo <ArrowUpRight size={17} /></button><button className="secondary-button" onClick={onProduct}>Explore the Platform <ChevronRight size={17} /></button></div></div></section>; }
function Footer({ onPrivacy, onTerms }: { onPrivacy?: () => void; onTerms?: () => void }) { return <footer className="footer"><div className="footer-main"><div className="footer-brand"><button className="brand"><span className="brand-mark"><span /></span> SEGURARA</button><p>AI Runtime & Application<br />Security Intelligence</p></div><div className="footer-col"><b>Product</b><a href="#assistant">Platform</a><a href="#capabilities">Features</a><a href="#how-it-works">Investigation</a><a href="#relationships">Relationship graph</a></div><div className="footer-col"><b>Company</b><a href="#about">About</a><a href="#contact">Contact</a><a href="#pricing">Pricing</a><a href="#faq">FAQ</a></div><div className="footer-col"><b>Resources</b><span>Documentation</span><span>Integration guides</span><span>Security architecture</span></div></div><div className="footer-bottom"><span>© 2026 Segurara. All rights reserved.</span><div><button className="footer-link" onClick={onPrivacy}>Privacy</button><button className="footer-link" onClick={onTerms}>Terms</button><span>Security</span></div></div></footer>; }

function ProductHeader({ onHome }: { onHome: () => void }) {
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

function ProductPage({ onHome, onPrivacy, onTerms }: { onHome: () => void; onPrivacy: () => void; onTerms: () => void }) {
  return <SeguraSecureProductPage onHome={onHome} onPrivacy={onPrivacy} onTerms={onTerms} />;
}

function NotificationPanel({ onClose }: { onClose: () => void }) { const notes = ['High-priority investigation updated', 'Telemetry source degraded', 'New correlated activity', 'Investigation assigned to you']; return <div className="notification-panel"><div className="notification-head"><strong>Notifications</strong><button onClick={onClose}><X size={15} /></button></div>{notes.map((x, i) => <div className="notification-row" key={x}><span className={`notif-icon n${i}`}><Bell size={14} /></span><div><strong>{x}</strong><small>{[2, 8, 15, 32][i]} minutes ago</small></div><span className={i < 2 ? 'unread' : ''} /></div>)}<button className="mark-read">Mark all as read</button></div>; }
function WorkspaceOverview() { return <><div className="workspace-metrics">{[['ACTIVE CASES', '24', '+8 this week'], ['HIGH PRIORITY', '12', '4 assigned to you'], ['RISK SIGNALS', '137', 'Across 18 sources'], ['TELEMETRY HEALTH', '98.4%', 'All sources nominal']].map(([label, value, note], i) => <div className="workspace-metric" key={label as string}><div className={`metric-symbol ms${i}`}><Activity size={16} /></div><small>{label}</small><strong>{value}</strong><span>{note}</span></div>)}</div><div className="workspace-grid"><div className="workspace-card wide"><div className="workspace-card-head"><div><span className="overline">RISK TREND</span><h3>Signals over time</h3></div><button className="select-button">Last 7 days <ChevronDown size={13} /></button></div><div className="large-chart"><svg viewBox="0 0 700 200" preserveAspectRatio="none"><defs><linearGradient id="chartfill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#8b5cf6" stopOpacity=".35" /><stop offset="1" stopColor="#8b5cf6" stopOpacity="0" /></linearGradient></defs><path d="M0 160 C45 135 60 142 100 122 S165 143 205 108 S260 120 300 92 S360 110 398 74 S465 111 500 58 S555 84 590 49 S650 56 700 25 V200 H0Z" fill="url(#chartfill)" /><path d="M0 160 C45 135 60 142 100 122 S165 143 205 108 S260 120 300 92 S360 110 398 74 S465 111 500 58 S555 84 590 49 S650 56 700 25" fill="none" stroke="#a78bfa" strokeWidth="3" /></svg><div className="chart-axis"><span>Aug 21</span><span>Aug 22</span><span>Aug 23</span><span>Aug 24</span><span>Aug 25</span><span>Aug 26</span><span>Aug 27</span></div></div></div><div className="workspace-card"><div className="workspace-card-head"><div><span className="overline">TELEMETRY HEALTH</span><h3>Source status</h3></div><span className="green-text">98.4%</span></div>{['Applications', 'APIs', 'AI services', 'Identity', 'Infrastructure'].map((x, i) => <div className="health-row" key={x}><span className="health-status" />{x}<b>{[100, 99.2, 97.8, 98.6, 96.4][i]}%</b></div>)}</div><div className="workspace-card table-card"><div className="workspace-card-head"><div><span className="overline">INVESTIGATION QUEUE</span><h3>Needs your attention</h3></div><button className="text-button">View all <ArrowUpRight size={14} /></button></div><div className="investigation-table"><div className="table-columns"><span>CASE</span><span>SEVERITY</span><span>ENTITY</span><span>CONFIDENCE</span><span>STATUS</span></div>{[['CASE-2048', 'Suspicious API activity', 'High', 'checkout-api', '87%', 'Review'], ['CASE-2047', 'Identity scope anomaly', 'Medium', 'svc-data-pipeline', '74%', 'Assigned'], ['CASE-2042', 'Model endpoint access', 'Low', 'risk-review-model', '68%', 'New']].map((row) => <div className="investigation-row" key={row[0]}><span><b>{row[0]}</b><small>{row[1]}</small></span><span className={`severity-text ${row[2].toLowerCase()}`}>{row[2]}</span><span>{row[3]}</span><span>{row[4]}</span><span className="status-chip">{row[5]}</span></div>)}</div></div></div></> }
function WorkspaceInvestigation() { return <div className="investigation-workspace"><div className="case-banner"><div><span className="overline">CASE-2048 · UPDATED 2 MINUTES AGO</span><h2>Suspicious API activity</h2><p>Associated with an unusual sequence across a service identity and production workload.</p></div><span className="risk-badge">ELEVATED · 87%</span></div><div className="investigation-columns"><div className="workspace-card"><div className="workspace-card-head"><div><span className="overline">INCIDENT TIMELINE</span><h3>Chronology of activity</h3></div><span className="context-chip">6 events</span></div><div className="investigation-timeline">{events.concat([{ time: '14:02:29', label: 'Evidence linked', detail: 'Case context updated', color: 'green' }]).map((event) => <div className="investigation-event" key={event.time}><span className={`event-dot ${event.color}`} /><div><b>{event.time}</b><strong>{event.label}</strong><small>{event.detail}</small></div></div>)}</div></div><div className="workspace-card evidence-card"><span className="overline">RISK CONTEXT</span><h3>Why this is elevated</h3><p>Activity is associated with a sequence that differs from the observed baseline for this service identity.</p><div className="risk-stat-grid"><div><small>Risk</small><strong className="amber-text">Elevated</strong></div><div><small>Confidence</small><strong>87%</strong></div><div><small>Evidence</small><strong>6</strong></div><div><small>Entities</small><strong>5</strong></div></div><span className="overline">RELATED ENTITIES</span>{['svc-payment', 'checkout-api', '/api/payment', 'production-eu-01', 'risk-review-model'].map((x) => <div className="related-row" key={x}><Link2 size={13} /> {x}<ArrowUpRight size={13} /></div>)}</div></div></div>; }
function WorkspaceGraph() { const [selected, setSelected] = useState(nodeItems[2]); const SelectedIcon = selected.icon; return <div className="workspace-graph"><div className="workspace-card graph-workspace-card"><div className="workspace-card-head"><div><span className="overline">ENTITY RELATIONSHIPS</span><h3>Connected activity map</h3></div><div className="graph-tools"><button><Plus size={14} /></button><button>−</button><button><Eye size={14} /></button></div></div><div className="workspace-graph-canvas"><svg viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M11 21 L32 42 L51 22 L74 42 L47 68 L80 76 M32 42 L22 81 M51 22 L47 68" /></svg>{nodeItems.map((node) => { const NodeIcon = node.icon; return <button className={`graph-node ${selected.label === node.label ? 'selected' : ''}`} style={{ left: `${node.x}%`, top: `${node.y}%`, '--node-color': node.color } as React.CSSProperties} key={node.label} onClick={() => setSelected(node)}><span><NodeIcon size={15} /></span><small>{node.label}</small></button>; })}</div></div><div className="workspace-card selected-entity"><span className="overline">SELECTED ENTITY</span><div className="entity-icon" style={{ color: selected.color }}><SelectedIcon size={20} /></div><h3>{selected.label}</h3><span className="entity-type">{selected.type}</span><div className="entity-details"><div><small>Related events</small><strong>18</strong></div><div><small>Risk indicators</small><strong className="rose-text">3</strong></div></div><button className="primary-button">Open entity <ArrowUpRight size={15} /></button></div></div>; }
function WorkspaceAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'user', text: 'Why is this workload suspicious?' },
    { role: 'assistant', text: 'The workload is associated with an unusual sequence of API and identity events. This is an indication for review, not a definitive conclusion.', pills: ['6 correlated events', '2 identity relationships', '1 elevated runtime indicator'], suggestion: 'Review service identity activity between 14:00 and 14:10.' },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const fallbackIdx = useRef(0);

  const handleSubmit = (q: string) => {
    const trimmed = q.trim();
    if (!trimmed || typing) return;
    const userMsg: ChatMessage = { role: 'user', text: trimmed };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      const key = trimmed.toLowerCase().replace(/[?!.,]/g, '').trim();
      const match = Object.keys(aiResponses).find((k) => key.includes(k));
      let reply: ChatMessage;
      if (match) {
        reply = { ...aiResponses[match] };
      } else {
        reply = { ...fallbackMessages[fallbackIdx.current % fallbackMessages.length] };
        fallbackIdx.current++;
      }
      setMessages((m) => [...m, reply]);
      setTyping(false);
    }, 800);
  };

  return (
    <div className="workspace-assistant">
      <div className="workspace-card conversation">
        <div className="workspace-card-head">
          <div><span className="overline">ASSISTANT</span><h3>Ask the security context</h3></div>
          <span className="live-chip"><span className="pulse-dot" /> READY</span>
        </div>
        <div className="workspace-chat">
          {messages.map((msg, i) => msg.role === 'user' ? (
            <div className="workspace-chat-question" key={i}>{msg.text}</div>
          ) : (
            <div className="workspace-chat-answer" key={i}>
              <div className="answer-mark"><Bot size={16} /></div>
              <div>
                <p>{msg.text}</p>
                {msg.pills && msg.pills.length > 0 && <>
                  <span className="answer-label">SUPPORTING EVIDENCE</span>
                  <div className="answer-pills">{msg.pills.map((p) => <span key={p}>{p}</span>)}</div>
                </>}
                {msg.suggestion && <div className="suggestion"><ChevronRight size={15} /> Suggested next step: {msg.suggestion}</div>}
              </div>
            </div>
          ))}
          {typing && <div className="workspace-chat-answer typing-indicator"><div className="answer-mark"><Bot size={16} /></div><div><span className="typing-dots"><span /><span /><span /></span></div></div>}
        </div>
        <form className="assistant-input" onSubmit={(e) => { e.preventDefault(); handleSubmit(input); }}>
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask another question..." disabled={typing} />
          <button type="submit" disabled={typing || !input.trim()}><Send size={16} /></button>
        </form>
      </div>
      <div className="workspace-card">
        <span className="overline">EVIDENCE</span>
        <h3>Referenced sources</h3>
        {['Runtime event · 14:02:18', 'Identity event · 14:02:14', 'API request · 14:02:11', 'Workload baseline · 7 day view'].map((x) => (
          <div className="evidence-source" key={x}><FileSearch size={14} /><span>{x}</span><ArrowUpRight size={13} /></div>
        ))}
      </div>
    </div>
  );
}
function WorkspaceList({ tab }: { tab: string }) { return <div className="workspace-card list-workspace"><div className="workspace-card-head"><div><span className="overline">{tab.toUpperCase()} / ALL SIGNALS</span><h3>Recent {tab.toLowerCase()}</h3></div><button className="primary-button"><Plus size={15} /> Add filter</button></div>{['Suspicious API activity', 'Identity scope anomaly', 'Model endpoint access', 'Unusual container behavior', 'Cloud workload change'].map((x, i) => <div className="list-row" key={x}><span className={`severity s${i % 3}`} /><div><strong>{x}</strong><small>{['checkout-api', 'svc-data-pipeline', 'risk-review-model', 'payments-worker', 'production-eu-01'][i]} · Today, 14:0{i + 2}</small></div><span className="context-chip">{['High', 'Medium', 'Low'][i % 3]}</span><ChevronRight size={16} /></div>)}</div>; }

function PrivacyPage({ onHome }: { onHome: () => void }) {
  useEffect(() => { document.title = 'Segurara — Privacy Policy'; }, []);
  return (
    <div className="site-shell">
      <PrivacyHeader onHome={onHome} />
      <main className="privacy-main">
        <article className="privacy-policy">
          <h1>Privacy Policy</h1>
          <p>Last updated: August 28, 2026</p>
          <p>This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.</p>
          <p>We use Your Personal Data to provide and improve the Service. We collect, use, and disclose Your information as described in this Privacy Policy and, where required by applicable law, only where We have a valid legal basis to do so, including Your consent (where consent is required). This Privacy Policy has been created with the help of the <a href="https://www.termsfeed.com/privacy-policy-generator/" target="_blank">Privacy Policy Generator</a>.</p>
          <h2>Interpretation and Definitions</h2>
          <h3>Interpretation</h3>
          <p>The words whose initial letters are capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
          <h3>Definitions</h3>
          <p>For the purposes of this Privacy Policy:</p>
          <ul>
            <li><strong>Account</strong> means a unique account created for You to access Our Service or parts of Our Service.</li>
            <li><strong>Affiliate</strong> means an entity that controls, is controlled by, or is under common control with a party, where &quot;control&quot; means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.</li>
            <li><strong>Company</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Privacy Policy) refers to Segurara Technologies (Pvt) Ltd, 42 Lotus Arcade, Ward Place, Colombo 07, Sri Lanka.</li>
            <li><strong>Cookies</strong> are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website, among its many uses.</li>
            <li><strong>Country/State</strong> refers to: Sri Lanka.</li>
            <li><strong>Device</strong> means any device that can access the Service, such as a computer, a cell phone or a digital tablet.</li>
            <li><strong>Personal Data</strong> (or &quot;Personal Information&quot;) is any information that relates to an identified or identifiable individual.
              <p>We use &quot;Personal Data&quot; and &quot;Personal Information&quot; interchangeably unless a law uses a specific term.</p>
            </li>
            <li><strong>Service</strong> refers to the Website.</li>
            <li><strong>Service Provider</strong> means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used.</li>
            <li><strong>Usage Data</strong> refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).</li>
            <li><strong>User</strong> means any individual who accesses or uses the Service.</li>
            <li><strong>Website</strong> refers to segurara, accessible from <a href="https://segurara.com/" rel="external nofollow noopener" target="_blank">https://segurara.com/</a>.</li>
            <li><strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</li>
          </ul>
          <h2>Collecting and Using Your Personal Information</h2>
          <h3>Types of Data Collected</h3>
          <h4>Personal Data</h4>
          <p>While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:</p>
          <ul>
            <li>Email address</li>
            <li>First name and last name</li>
            <li>Phone number</li>
            <li>Address, State, Province, ZIP/Postal code, City</li>
          </ul>
          <h4>Usage Data</h4>
          <p>Usage Data is collected automatically when using the Service.</p>
          <p>Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of Our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</p>
          <p>When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device's unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.</p>
          <p>We may also collect information that Your browser sends whenever You visit Our Service or when You access the Service by or through a mobile device.</p>
          <h4>Tracking Technologies and Cookies</h4>
          <p>We use tracking technologies (such as cookies) to track the activity and to improve Our Service. The technologies We use may include:</p>
          <ul>
            <li><strong>Cookies or Browser Cookies.</strong> A cookie is a small file placed on Your Device. You can instruct Your browser to refuse all Cookies or to indicate when a Cookie is being sent. However, if You do not accept Cookies, You may not be able to use some parts of Our Service.</li>
            <li><strong>Web Beacons.</strong> Certain sections of Our Service may contain small electronic files known as web beacons (also referred to as clear gifs, pixel tags, and single-pixel gifs) that permit the Company, for example, to count users who have visited those pages and for other related website statistics (for example, recording the popularity of a certain section and verifying system and server integrity).</li>
          </ul>
          <p>Cookies can be &quot;Persistent&quot; or &quot;Session&quot; Cookies. Persistent Cookies remain on Your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close Your web browser.</p>
          <p>Where required by law, We use non-essential cookies (that is, Cookies other than the Necessary / Essential Cookies described below) only with Your consent. You can withdraw or change Your consent at any time using Our cookie preferences tool (if available) or through Your browser/device settings. Withdrawing consent does not affect the lawfulness of processing based on consent before its withdrawal.</p>
          <p>We use both Session and Persistent Cookies for the purposes set out below:</p>
          <ul>
            <li>
              <p><strong>Necessary / Essential Cookies</strong></p>
              <p>Type: Session Cookies</p>
              <p>Administered by: Us</p>
              <p>Purpose: These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide You with those services.</p>
            </li>
            <li>
              <p><strong>Cookies Policy / Notice Acceptance Cookies</strong></p>
              <p>Type: Persistent Cookies</p>
              <p>Administered by: Us</p>
              <p>Purpose: These Cookies identify whether users have accepted the use of cookies on the Website and record the consent choices You have made, so that We can honor those choices on future visits.</p>
            </li>
            <li>
              <p><strong>Functionality Cookies</strong></p>
              <p>Type: Persistent Cookies</p>
              <p>Administered by: Us</p>
              <p>Purpose: These Cookies allow Us to remember choices You make when You use the Website, such as remembering Your Account login details or language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid You having to re-enter Your preferences every time You use the Website.</p>
            </li>
          </ul>
          <h3>Use of Your Personal Data</h3>
          <p>The Company may use Personal Data for the following purposes:</p>
          <ul>
            <li><strong>To provide and maintain Our Service</strong>, including to monitor the usage of Our Service.</li>
            <li><strong>To manage Your Account:</strong> to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.</li>
            <li><strong>For the performance of a contract:</strong> the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.</li>
            <li><strong>To contact You:</strong> To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application's push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.</li>
            <li><strong>To provide You</strong> with news, special offers, and general information about other goods, services and events which We offer that are similar to those that You have already purchased or inquired about. We send such marketing communications only where permitted by applicable law: where prior consent is required (for example, under the laws applicable in the EEA and the UK), We will send them only with Your consent; otherwise, We may send them until You opt out. You may opt out or withdraw Your consent at any time by using the unsubscribe link in any marketing email We send or by contacting Us.</li>
            <li><strong>To manage Your requests:</strong> To attend and manage Your requests to Us.</li>
            <li><strong>For business transfers:</strong> We may use Your Personal Data to evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of Our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which Personal Data held by Us about Our Service users is among the assets transferred.</li>
            <li><strong>For other purposes</strong>: We may use Your information for other purposes, such as data analysis, identifying usage trends, determining the effectiveness of Our promotional campaigns, and evaluating and improving Our Service, products, services, marketing and Your experience.</li>
          </ul>
          <p>We may share Your Personal Data in the following situations:</p>
          <ul>
            <li><strong>With Service Providers:</strong> We may share Your Personal Data with Service Providers to monitor and analyze the use of Our Service, and to contact You.</li>
            <li><strong>For business transfers:</strong> We may share or transfer Your Personal Data in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of Our business to another company.</li>
            <li><strong>With Affiliates:</strong> We may share Your Personal Data with Our affiliates, in which case We will require those affiliates to honor this Privacy Policy. Affiliates include Our parent company and any other subsidiaries, joint venture partners or other companies that We control or that are under common control with Us.</li>
            <li><strong>With other users:</strong> If Our Service offers public areas, when You share Personal Data or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed outside the Service.</li>
            <li><strong>With Your consent</strong>: We may disclose Your Personal Data for any other purpose with Your consent.</li>
          </ul>
          <h4>Text Messages Privacy Notice</h4>
          <p>You have the option to receive text (SMS) messages from Us. If You opt in to text messages, We will send You updates, notifications, and other communications as described below. When You opt in, We will collect and store the information You provide in connection with text messaging, such as Your phone number, the date and method of Your consent, and message delivery and read information.</p>
          <p>No mobile information will be shared with or sold to third parties or affiliates for marketing or promotional purposes. The phone numbers and consent records We collect for texting are never shared with anyone for any purpose, except the Service Providers that technically have to handle them to deliver the texts.</p>
          <p>Consent to receive text messages is not a condition of any purchase or use of Our Service. If You consent to receive SMS from Us, You agree to receive text messages from Us related to:</p>
          <ul>
            <li>Customer care and support</li>
            <li>Account notifications, such as activity, status, or renewal reminders</li>
            <li>Delivery notifications and updates on the status of a delivery</li>
            <li>Authentication messages, such as one-time passwords (OTP) and passcodes</li>
            <li>Security alerts, such as suspicious login attempts or unusual account activity</li>
            <li>Marketing and promotional offers, discounts, and other promotional content</li>
          </ul>
          <p>Reply STOP to opt-out. Reply HELP for support. Message &amp; data rates may apply. Messaging frequency may vary. Carriers are not liable for delayed or undelivered messages.</p>
          <h3>Retention of Your Personal Data</h3>
          <p>The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with Our legal obligations (for example, if We are required to retain Your data to comply with applicable laws), resolve disputes, and enforce Our legal agreements and policies.</p>
          <p>Where possible, We apply shorter retention periods and/or reduce identifiability by deleting, aggregating, or anonymizing data. Unless otherwise stated, the retention periods below are maximum periods (&quot;up to&quot;) and We may delete or anonymize data sooner when it is no longer needed for the relevant purpose. We apply different retention periods to different categories of Personal Data based on the purpose of processing and legal obligations:</p>
          <ul>
            <li>
              <p>Account Information</p>
              <ul>
                <li>User Accounts: retained for the duration of Your Account relationship plus up to 24 months after account closure to handle any post-termination issues or resolve disputes.</li>
              </ul>
            </li>
            <li>
              <p>Customer Support Data</p>
              <ul>
                <li>Support tickets and correspondence: up to 24 months from the date of ticket closure to resolve follow-up inquiries, track service quality, and defend against potential legal claims.</li>
                <li>Chat transcripts: up to 24 months for quality assurance and staff training purposes.</li>
              </ul>
            </li>
            <li>
              <p>Usage Data</p>
              <ul>
                <li>Website analytics data (cookies, IP addresses, device identifiers): up to 24 months from the date of collection, which allows us to analyze trends while respecting privacy principles.</li>
                <li>Server logs (IP addresses, access times): up to 24 months for security monitoring and troubleshooting purposes.</li>
              </ul>
            </li>
          </ul>
          <p>Usage Data is retained in accordance with the retention periods described above, and may be retained longer only where necessary for security, fraud prevention, or legal compliance.</p>
          <p>We may retain Personal Data beyond the periods stated above for different reasons:</p>
          <ul>
            <li>Legal obligation: We are required by law to retain specific data (e.g., financial records for tax authorities).</li>
            <li>Legal claims: Data is necessary to establish, exercise, or defend legal claims.</li>
            <li>Your explicit request: You ask Us to retain specific information.</li>
            <li>Technical limitations: Data exists in backup systems that are scheduled for routine deletion.</li>
          </ul>
          <p>You may request information about how long We will retain Your Personal Data by contacting Us.</p>
          <p>When retention periods expire, We securely delete or anonymize Personal Data according to the following procedures:</p>
          <ul>
            <li>Deletion: Personal Data is removed from Our systems and no longer actively processed.</li>
            <li>Backup retention: Residual copies may remain in encrypted backups for a limited period consistent with Our backup retention schedule and are not restored except where necessary for security, disaster recovery, or legal compliance.</li>
            <li>Anonymization: In some cases, We convert Personal Data into anonymous statistical data that cannot be linked back to You. This anonymized data may be retained indefinitely for research and analytics.</li>
          </ul>
          <h3>Transfer of Your Personal Data</h3>
          <p>Your information, including Personal Data, is processed at the Company's operating offices and in any other places where the parties involved in the processing are located. This means that this information may be transferred to — and maintained on — computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ from those of Your jurisdiction.</p>
          <p>Where required by applicable law, We will ensure that international transfers of Your Personal Data are subject to appropriate safeguards and, where relevant, supplementary measures. The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organization or a country unless there are adequate controls in place, including the security of Your data and other personal information.</p>
          <h3>Delete Your Personal Data</h3>
          <p>You have the right to delete or request that We assist in deleting the Personal Data that We have collected about You.</p>
          <p>Our Service may give You the ability to delete certain information about You from within the Service.</p>
          <p>You may update, amend, or delete Your information at any time by signing in to Your Account, if You have one, and visiting the account settings section that allows You to manage Your personal information. You may also contact Us to request access to, correct, or delete any Personal Data that You have provided to Us.</p>
          <p>Please note, however, that We may need to retain certain information when We have a legal obligation or lawful basis to do so.</p>
          <h3>Disclosure of Your Personal Data</h3>
          <h4>Business Transactions</h4>
          <p>If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.</p>
          <h4>Law Enforcement</h4>
          <p>Under certain circumstances, the Company may disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).</p>
          <h4>Other Legal Requirements</h4>
          <p>The Company may disclose Your Personal Data in the good-faith belief that such action is necessary to:</p>
          <ul>
            <li>Comply with a legal obligation</li>
            <li>Protect and defend the rights or property of the Company</li>
            <li>Prevent or investigate possible wrongdoing in connection with the Service</li>
            <li>Protect the personal safety of Users of the Service or the public</li>
            <li>Protect against legal liability</li>
          </ul>
          <h3>Security of Your Personal Data</h3>
          <p>The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure. While We strive to use commercially reasonable means to protect Your Personal Data, We cannot guarantee its absolute security.</p>
          <h2>Children's and Minors' Privacy</h2>
          <p>The Service is not directed to, and We do not knowingly collect Personal Information from, anyone under the age of 16.</p>
          <p>If You are a parent or guardian and You believe Your child has provided Us with Personal Information, please contact Us. If We become aware that We have collected Personal Information from anyone under the age of 16, We will take steps to remove that information from Our servers as soon as reasonably possible.</p>
          <p>Some countries and states set a higher age at which an individual can consent to the processing of their own Personal Information. Where We rely on consent as a legal basis and the law applicable to a User sets an age higher than 16, We may require the consent of that User's parent or guardian before We collect and use their Personal Information.</p>
          <h2>Links to Other Websites</h2>
          <p>Our Service may contain links to other websites that are not operated by Us. If You click on a third-party link, You will be directed to that third party's site. We strongly advise You to review the Privacy Policy of every site You visit.</p>
          <p>We have no control over and assume no responsibility for the content, privacy policies or practices of any third-party sites or services.</p>
          <h2>Changes to this Privacy Policy</h2>
          <p>We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.</p>
          <p>We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the &quot;Last updated&quot; date at the top of this Privacy Policy.</p>
          <p>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
          <h2>Contact Us</h2>
          <p>If You have any questions about this Privacy Policy, You can contact Us:</p>
          <ul>
            <li>By email: info@segurara.com</li>
            <li>By visiting this page on Our Website: <a href="https://segurara.com/" rel="external nofollow noopener" target="_blank">https://segurara.com/</a></li>
            <li>By phone:  +94 11 245 7812</li>
            <li>By mail: 42 Lotus Arcade, Ward Place, Colombo 07, Sri Lanka</li>
          </ul>
        </article>
      </main>
    </div>
  );
}

function PrivacyHeader({ onHome }: { onHome: () => void }) {
  return (
    <header className="site-header privacy-header">
      <button className="brand" onClick={onHome} aria-label="Segurara home"><span className="brand-mark"><span /></span> SEGURARA</button>
      <div className="header-actions">
        <button className="header-cta" onClick={onHome}>Back to home <ArrowUpRight size={15} /></button>
      </div>
    </header>
  );
}

function TermsPage({ onHome }: { onHome: () => void }) {
  useEffect(() => { document.title = 'Segurara — Terms and Conditions'; }, []);
  return (
    <div className="site-shell">
      <PrivacyHeader onHome={onHome} />
      <main className="privacy-main">
        <article className="privacy-policy">
          <h1>Terms and Conditions</h1>
          <p>Last updated: August 28, 2026</p>
          <p>Please read these terms and conditions carefully before using Our Service.</p>
          <h2>Interpretation and Definitions</h2>
          <h3>Interpretation</h3>
          <p>The words whose initial letters are capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
          <h3>Definitions</h3>
          <p>For the purposes of these Terms and Conditions:</p>
          <ul>
            <li><strong>Affiliate</strong> means an entity that controls, is controlled by, or is under common control with a party, where &quot;control&quot; means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.</li>
            <li><strong>Country/State</strong> refers to:  Sri Lanka</li>
            <li><strong>Company</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in these Terms and Conditions) refers to Segurara Technologies (Pvt) Ltd, 42 Lotus Arcade, Ward Place, Colombo 07, Sri Lanka.</li>
            <li><strong>Device</strong> means any device that can access the Service such as a computer, a cell phone or a digital tablet.</li>
            <li><strong>Service</strong> refers to the Website.</li>
            <li><strong>Terms and Conditions</strong> (also referred to as &quot;Terms&quot;) means these Terms and Conditions, including any documents expressly incorporated by reference, which govern Your access to and use of the Service and form the entire agreement between You and the Company regarding the Service. These Terms and Conditions have been created with the help of the <a href="https://www.termsfeed.com/terms-conditions-generator/" target="_blank">TermsFeed Terms and Conditions Generator</a>.</li>
            <li><strong>Third-Party Social Media Service</strong> means any services or content (including data, information, products or services) provided by a third party that is displayed, included, made available, or linked to through the Service.</li>
            <li><strong>Website</strong> refers to Segurara, accessible from <a href="https://segurara.com/" rel="external nofollow noopener" target="_blank">https://segurara.com/</a></li>
            <li><strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</li>
          </ul>
          <h2>Acknowledgment</h2>
          <p>These are the Terms and Conditions governing the use of this Service and the agreement between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.</p>
          <p>Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service.</p>
          <p>By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions then You may not access the Service.</p>
          <p>You represent that you are over the age of 18. The Company does not permit those under 18 to use the Service.</p>
          <p>Your access to and use of the Service is also subject to Our Privacy Policy, which describes how We collect, use, and disclose personal information. Please read Our Privacy Policy carefully before using Our Service.</p>
          <h2>Links to Other Websites</h2>
          <p>Our Service may contain links to third-party websites or services that are not owned or controlled by the Company.</p>
          <p>The Company has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You further acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods or services available on or through any such websites or services.</p>
          <p>We strongly advise You to read the terms and conditions and privacy policies of any third-party websites or services that You visit.</p>
          <h3>Links from a Third-Party Social Media Service</h3>
          <p>The Service may display, include, make available, or link to content or services provided by a Third-Party Social Media Service. A Third-Party Social Media Service is not owned or controlled by the Company, and the Company does not endorse or assume responsibility for any Third-Party Social Media Service.</p>
          <p>You acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with Your access to or use of any Third-Party Social Media Service, including any content, goods, or services made available through them. Your use of any Third-Party Social Media Service is governed by that Third-Party Social Media Service's terms and privacy policies.</p>
          <h2>Termination</h2>
          <p>We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions.</p>
          <p>Upon termination, Your right to use the Service will cease immediately.</p>
          <h2>Limitation of Liability</h2>
          <p>Notwithstanding any damages that You might incur, the entire liability of the Company and any of its suppliers under any provision of these Terms and Your exclusive remedy for all of the foregoing shall be limited to the amount actually paid by You through the Service or 100 USD if You haven't purchased anything through the Service.</p>
          <p>To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, loss of data or other information, for business interruption, for personal injury, loss of privacy arising out of or in any way related to the use of or inability to use the Service, third-party software and/or third-party hardware used with the Service, or otherwise in connection with any provision of these Terms), even if the Company or any supplier has been advised of the possibility of such damages and even if the remedy fails of its essential purpose.</p>
          <p>Some states do not allow the exclusion of implied warranties or limitation of liability for incidental or consequential damages, which means that some of the above limitations may not apply. In these states, each party's liability will be limited to the greatest extent permitted by law.</p>
          <h2>&quot;AS IS&quot; and &quot;AS AVAILABLE&quot; Disclaimer</h2>
          <p>The Service is provided to You &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; and with all faults and defects without warranty of any kind. To the maximum extent permitted under applicable law, the Company, on its own behalf and on behalf of its Affiliates and its and their respective licensors and service providers, expressly disclaims all warranties, whether express, implied, statutory or otherwise, with respect to the Service, including all implied warranties of merchantability, fitness for a particular purpose, title and non-infringement, and warranties that may arise out of course of dealing, course of performance, usage or trade practice. Without limitation to the foregoing, the Company provides no warranty or undertaking, and makes no representation of any kind that the Service will meet Your requirements, achieve any intended results, be compatible or work with any other software, applications, systems or services, operate without interruption, meet any performance or reliability standards or be error free or that any errors or defects can or will be corrected.</p>
          <p>Without limiting the foregoing, neither the Company nor any of the company's provider makes any representation or warranty of any kind, express or implied: (i) as to the operation or availability of the Service, or the information, content, and materials or products included thereon; (ii) that the Service will be uninterrupted or error-free; (iii) as to the accuracy, reliability, or currency of any information or content provided through the Service; or (iv) that the Service, its servers, the content, or e-mails sent from or on behalf of the Company are free of viruses, scripts, trojan horses, worms, malware, timebombs or other harmful components.</p>
          <p>Some jurisdictions do not allow the exclusion of certain types of warranties or limitations on applicable statutory rights of a consumer, so some or all of the above exclusions and limitations may not apply to You. But in such a case the exclusions and limitations set forth in this section shall be applied to the greatest extent enforceable under applicable law.</p>
          <h2>Governing Law</h2>
          <p>The laws of the Country/State, excluding its conflicts of law rules, shall govern these Terms and Your use of the Service. Your use of the Application may also be subject to other local, state, national, or international laws.</p>
          <h2>Disputes Resolution</h2>
          <p>If You have any concern or dispute about the Service, You agree to first try to resolve the dispute informally by contacting the Company.</p>
          <h2>For European Union (EU) Users</h2>
          <p>If You are a European Union consumer, you will benefit from any mandatory provisions of the law of the country in which You are resident.</p>
          <h2>United States Legal Compliance</h2>
          <p>You represent and warrant that (i) You are not located in a country that is subject to the United States government embargo, or that has been designated by the United States government as a &quot;terrorist supporting&quot; country, and (ii) You are not listed on any United States government list of prohibited or restricted parties.</p>
          <h2>Severability and Waiver</h2>
          <h3>Severability</h3>
          <p>If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions will continue in full force and effect.</p>
          <h3>Waiver</h3>
          <p>Except as provided herein, the failure to exercise a right or to require performance of an obligation under these Terms shall not affect a party's ability to exercise such right or require such performance at any time thereafter nor shall the waiver of a breach constitute a waiver of any subsequent breach.</p>
          <h2>Translation Interpretation</h2>
          <p>These Terms and Conditions may have been translated if We have made them available to You on our Service.
You agree that the original English text shall prevail in the case of a dispute.</p>
          <h2>Changes to These Terms and Conditions</h2>
          <p>We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material We will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at Our sole discretion.</p>
          <p>By continuing to access or use Our Service after those revisions become effective, You agree to be bound by the revised terms. If You do not agree to the new terms, in whole or in part, please stop using the Service.</p>
          <h2>Contact Us</h2>
          <p>If you have any questions about these Terms and Conditions, You can contact us:</p>
          <ul>
            <li>By email: info@segurara.com</li>
            <li>By visiting this page on our website: <a href="https://segurara.com/" rel="external nofollow noopener" target="_blank">https://segurara.com/</a></li>
            <li>By phone:  +94 11 245 7812</li>
            <li>By mail: 42 Lotus Arcade, Ward Place, Colombo 07, Sri Lanka</li>
          </ul>
        </article>
      </main>
    </div>
  );
}

export default App;
