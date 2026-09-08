import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronDown, ChevronRight, Radio } from 'lucide-react';
import { SectionLabel } from '../../shared/SectionLabel';

const metrics = [
  { label: 'ACTIVE CASES', value: 24, note: 'up', noteText: '+8 this week' },
  { label: 'HIGH PRIORITY', value: 12, note: 'warn', noteText: 'Needs review' },
  { label: 'RISK SIGNALS', value: 137, note: 'risk', noteText: 'Across 18 sources' },
  { label: 'TELEMETRY HEALTH', value: 984, note: 'good', noteText: 'All sources nominal', decimal: true },
];

const barSources = [['API', 82], ['Identity', 64], ['Runtime', 91], ['Cloud', 47], ['AI', 73], ['Network', 58]] as const;

const queueSeed = [
  { title: 'Suspicious API activity', source: 'checkout-api', status: 'Review', sev: 0 },
  { title: 'Identity scope anomaly', source: 'svc-data-pipeline', status: 'Assigned', sev: 1 },
  { title: 'Model endpoint access', source: 'risk-review-model', status: 'New', sev: 2 },
  { title: 'Privilege escalation probe', source: 'k8s-worker-eu-4', status: 'Review', sev: 0 },
  { title: 'Prompt injection attempt', source: 'llm-gateway-prod', status: 'New', sev: 2 },
  { title: 'Token exfiltration attempt', source: 'sts-assume-role-9a', status: 'Assigned', sev: 1 },
  { title: 'Egress traffic anomaly', source: 'calico-net-policy', status: 'New', sev: 2 },
];

const tickerEvents = [
  { time: '14:02:11', src: 'API-GATEWAY', text: 'POST /v1/chat/completions payload drift detected', tag: 'DRIFT', tone: 'warn' },
  { time: '14:02:14', src: 'IAM-RUNTIME', text: 'STS token assumed outside baseline CIDR', tag: 'ANOMALY', tone: 'danger' },
  { time: '14:02:18', src: 'K8S-EBPF', text: 'Namespace breakout probe attempt quarantined', tag: 'ESCALATION', tone: 'danger' },
  { time: '14:02:22', src: 'S.1-SENTINEL', text: 'Policy gate engaged — token revoked', tag: 'CONTAINED', tone: 'good' },
  { time: '14:02:26', src: 'VECTOR-DB', text: 'Embedding batch ingress normalized', tag: 'NOMINAL', tone: 'good' },
  { time: '14:02:31', src: 'IDENTITY', text: 'SSO session anomaly reviewed by analyst', tag: 'RESOLVED', tone: 'good' },
];

const CIRC = 2 * Math.PI * 15.5;

type QueueItem = { id: number; title: string; source: string; status: string; sev: number };

export function DashboardPreview({ onProduct }: { onProduct: () => void }) {
  const [vals, setVals] = useState<number[]>(metrics.map(() => 0));
  const [deltas, setDeltas] = useState<number[]>(metrics.map(() => 0));
  const [bars, setBars] = useState<number[]>(() => barSources.map(([, p]) => p));
  const [pie, setPie] = useState({ high: 12, mid: 8, low: 4 });
  const [queue, setQueue] = useState<QueueItem[]>(() => queueSeed.slice(0, 3).map((n, i) => ({ ...n, id: i })));
  const [tick, setTick] = useState(0);
  const [clock, setClock] = useState(() => new Date());
  const [live, setLive] = useState(false);
  const [inView, setInView] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [pointMoved, setPointMoved] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const valsRef = useRef<number[]>(metrics.map(() => 0));
  const lastTargetRef = useRef<number[]>(metrics.map((m) => m.value));
  const poolIdx = useRef(3);
  const tweenRaf = useRef<number | null>(null);

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
    const node = sectionRef.current;
    if (!node) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.12 });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const tweenValues = (from: number[], to: number[]) => {
    if (tweenRaf.current) cancelAnimationFrame(tweenRaf.current);
    const start = performance.now();
    const dur = 1600;
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      valsRef.current = from.map((v, i) => Math.round(v + (to[i] - v) * eased));
      setVals([...valsRef.current]);
      if (p < 1) tweenRaf.current = requestAnimationFrame(step);
      else tweenRaf.current = null;
    };
    tweenRaf.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    if (!revealed) return;
    const duration = 1400;
    const start = performance.now();
    let raf: number;
    const tickCount = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const next = metrics.map((m) => Math.round(m.value * eased));
      valsRef.current = next;
      setVals([...next]);
      if (p < 1) raf = requestAnimationFrame(tickCount);
      else {
        lastTargetRef.current = metrics.map((m) => m.value);
        setLive(true);
      }
    };
    raf = requestAnimationFrame(tickCount);
    return () => cancelAnimationFrame(raf);
  }, [revealed]);

  useEffect(() => {
    if (!live || !inView) return;
    const clockId = setInterval(() => setClock(new Date()), 1000);
    const tickerId = setInterval(() => {
      const t = performance.now();
      setTick((n) => n + 1);

      const targets = metrics.map((m, i) => {
        const wob = Math.sin(t / 1700 + i * 1.9) * Math.max(2, Math.round(m.value * 0.045));
        return Math.max(m.decimal ? 950 : 1, m.value + Math.round(wob));
      });
      const nextDeltas = targets.map((v, i) => v - lastTargetRef.current[i]);
      lastTargetRef.current = targets;
      setDeltas(nextDeltas);
      tweenValues(valsRef.current, targets);

      setBars((prev) => prev.map((v, i) => {
        const d = Math.round(Math.sin(t / 1300 + i * 2.3) * 3.2);
        return Math.min(96, Math.max(22, v + d));
      }));

      setPie((prev) => {
        const high = Math.max(6, Math.round(12 + Math.sin(t / 1900) * 1.6));
        const mid = Math.max(4, Math.round(8 + Math.sin(t / 2300 + 2) * 1.4));
        const low = Math.max(2, Math.round(prev.low + ((4 + Math.round(Math.sin(t / 2600 + 4) * 1.2)) - prev.low) * 0.35));
        return { high, mid, low };
      });

      setQueue((q) => {
        const next = queueSeed[poolIdx.current % queueSeed.length];
        poolIdx.current += 1;
        return [...q.slice(1), { ...next, id: Date.now() }];
      });
    }, 2600);
    return () => {
      clearInterval(clockId);
      clearInterval(tickerId);
    };
  }, [live, inView]);

  const total = pie.high + pie.mid + pie.low;
  const highLen = CIRC * (pie.high / total);
  const midLen = CIRC * (pie.mid / total);
  const lowLen = CIRC * (pie.low / total);
  const clockStr = clock.toISOString().slice(11, 19);
  const tickIndex = tick % tickerEvents.length;
  const event = tickerEvents[tickIndex];

  return (
    <section id="dashboard" ref={sectionRef} className={`section-pad dashboard-preview ${revealed ? 'dash-revealed' : ''}`}>
      <div className="section-intro">
        <SectionLabel>SECURITY OPERATIONS DASHBOARD</SectionLabel>
        <h2>Keep investigations and <em>risk in view.</em></h2>
        <p>Review case activity, risk indicators, telemetry condition, and investigation progress within a structured operations view.</p>
        <button className="primary-button" onClick={onProduct}>Open security workspace <ArrowUpRight size={16} /></button>
      </div>
      <div className={`dashboard-window ${live ? 'live-on' : ''}`}>
        <div className="window-bar">
          <span className="window-brand"><span className="brand-mark mini"><span /></span> SEGURARA / OVERVIEW</span>
          <div className="window-tw">
            <span className="window-status"><span className="pulse-dot" /> STREAM OK</span>
            <div className="window-dots"><span /><span /><span /></div>
          </div>
        </div>
        <div className="dashboard-body dash-noside">
          <div className="dash-main">
            <div className="dash-heading">
              <div>
                <span className="overline">WEDNESDAY, AUG 27 · UTC <b className="live-clock">{clockStr}</b></span>
                <h3>Security intelligence</h3>
              </div>
              <span className="live-chip"><span className="pulse-dot" /> LIVE</span>
            </div>
            <div className="metric-grid">
              {metrics.map((m, i) => (
                <div className="metric-card" style={{ animationDelay: `${i * 0.12}s` }} key={m.label}>
                  <small>{m.label}</small>
                  <strong>{m.decimal ? (vals[i] / 10).toFixed(1) + '%' : vals[i]}</strong>
                  <span className={m.note === 'good' ? 'green-text' : m.note === 'warn' ? 'amber-text' : ''}>{m.noteText}</span>
                  {live && deltas[i] !== 0 && tick > 0 && (
                    <span className={`metric-delta ${deltas[i] > 0 ? 'up' : 'down'}`} key={`${tick}-${i}`}>
                      {deltas[i] > 0 ? '▲' : '▼'} {m.decimal ? Math.abs(deltas[i] / 10).toFixed(1) + '%' : Math.abs(deltas[i])}
                    </span>
                  )}
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
                    {pointMoved && <circle className="chart-ping" cx="440" cy="24" r="4" fill="none" />}
                  </svg>
                  {pointMoved && <span className="chart-scan" />}
                  <div className="chart-blip" style={{ top: `${20 + (tick % 3) * 9}%`, animationDelay: `${tick % 2}s` }} />
                </div>
                <div className="chart-labels"><span>Aug 21</span><span>Aug 24</span><span>Aug 27</span></div>
              </div>
              <div className="chart-card bar-card">
                <div className="card-heading"><span>Threats by source</span><small>This week</small></div>
                <div className="bar-chart">
                  {barSources.map(([label], i) => (
                    <div className="bar-item" key={label}>
                      <span className="bar-value">{bars[i]}</span>
                      <div className="bar">
                        <div className="bar-fill" style={{ height: revealed ? `${bars[i]}%` : '0%', animationDelay: `${i * 0.08}s` }} />
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
                      <circle className="pie-seg seg-high" cx="21" cy="21" r="15.5" strokeDasharray={`${highLen} ${CIRC - highLen}`} strokeDashoffset="0" />
                      <circle className="pie-seg seg-mid" cx="21" cy="21" r="15.5" strokeDasharray={`${midLen} ${CIRC - midLen}`} strokeDashoffset={`-${highLen}`} />
                      <circle className="pie-seg seg-low" cx="21" cy="21" r="15.5" strokeDasharray={`${lowLen} ${CIRC - lowLen}`} strokeDashoffset={`-${highLen + midLen}`} />
                    </g>
                  </svg>
                  <div className="pie-center"><strong>{vals[0]}</strong><small>cases</small></div>
                </div>
                <div className="pie-legend">
                  <span><i className="legend-dot high" /> High · <b>{pie.high}</b></span>
                  <span><i className="legend-dot mid" /> Medium · <b>{pie.mid}</b></span>
                  <span><i className="legend-dot low" /> Low · <b>{pie.low}</b></span>
                </div>
              </div>
            </div>
            <div className="queue-card dash-queue">
              <div className="card-heading"><span>Investigation queue</span><small>View all <ChevronRight size={13} /></small></div>
              {queue.map((item) => (
                <div className="queue-row" key={item.id}>
                  <span className={`severity s${item.sev}`} />
                  <div><strong>{item.title}</strong><small>{item.source}</small></div>
                  <span className={`queue-status ${item.status === 'New' ? 'fresh' : item.status === 'Assigned' ? 'assigned' : ''}`}>{item.status}</span>
                </div>
              ))}
            </div>
            <div className="dash-ticker">
              <span className="ticker-head"><Radio size={11} /> LIVE TELEMETRY</span>
              <div className="ticker-slide" key={`${tick}-${tickIndex}`}>
                <span className="ticker-time">{event.time}</span>
                <span className={`ticker-src ${event.tone}`}>{event.src}</span>
                <span className="ticker-text">{event.text}</span>
                <span className="ticker-tag">{event.tag}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}