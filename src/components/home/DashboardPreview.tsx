import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronDown, ChevronRight } from 'lucide-react';
import { SectionLabel } from '../../shared/SectionLabel';

const metrics = [
  { label: 'ACTIVE CASES', value: 24, note: 'up', noteText: '+8 this week' },
  { label: 'HIGH PRIORITY', value: 12, note: 'warn', noteText: 'Needs review' },
  { label: 'RISK SIGNALS', value: 137, note: 'risk', noteText: 'Across 18 sources' },
  { label: 'TELEMETRY HEALTH', value: 984, note: 'good', noteText: 'All sources nominal', decimal: true },
];
const barSources = [['API', 82], ['Identity', 64], ['Runtime', 91], ['Cloud', 47], ['AI', 73], ['Network', 58]] as const;

export function DashboardPreview({ onProduct }: { onProduct: () => void }) {
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
