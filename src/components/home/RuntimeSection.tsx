import { Check, Code2, Fingerprint, Globe2, Server } from 'lucide-react';
import { SectionLabel } from '../../shared/SectionLabel';
import { events } from '../../shared/data';

export function RuntimeSection() {
  return <section className="section-pad runtime-section"><div className="runtime-copy"><SectionLabel>RUNTIME INTELLIGENCE</SectionLabel><h2>See behavior in <em>context.</em></h2><p>Connect what an application did with who did it, where it ran and what it touched. Every signal gains the context an analyst needs.</p><div className="bullet-list"><span><Check size={15} /> Application-aware activity</span><span><Check size={15} /> Workload and identity linkage</span><span><Check size={15} /> Transparent risk indicators</span></div></div><RuntimePanel /></section>;
}

function RuntimePanel() {
  return <div className="runtime-panel"><div className="panel-top"><span className="live-chip"><span className="pulse-dot" /> RUNTIME ACTIVITY</span><span className="panel-time">TODAY · 14:02:24 UTC</span></div><div className="runtime-fields">{[['APPLICATION', 'checkout-api', Code2], ['WORKLOAD', 'production-eu-01', Server], ['IDENTITY', 'svc-payment', Fingerprint], ['ENDPOINT', '/api/payment', Globe2]].map(([label, value, IconComponent]) => <div className="runtime-field" key={label as string}><span className="field-icon"><IconComponent size={14} /></span><div><small>{label as string}</small><strong>{value as string}</strong></div></div>)}</div><div className="activity-callout"><div><span className="overline">ACTIVITY</span><strong>Unusual request sequence</strong></div><div className="risk-badge">ELEVATED <span>87% confidence</span></div></div><div className="timeline"><div className="timeline-line" />{events.map((event) => <div className="timeline-event" key={event.time}><span className={`event-dot ${event.color}`} /><div><b>{event.time}</b><strong>{event.label}</strong><small>{event.detail}</small></div></div>)}</div></div>;
}
