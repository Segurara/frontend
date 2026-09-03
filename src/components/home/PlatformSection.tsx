import { useState } from 'react';
import { Activity, ChevronRight, FileSearch, GitBranch, Layers3, ShieldCheck, Sparkles } from 'lucide-react';
import { SectionLabel } from '../../shared/SectionLabel';
import type { Icon } from '../../shared/data';

export function PlatformSection() {
  const stages = ['Connect', 'Normalize', 'Correlate', 'Enrich', 'Investigate', 'Decide'];
  const stageIcons: Icon[] = [Activity, Layers3, GitBranch, Sparkles, FileSearch, ShieldCheck];
  const stageDescriptions = ['Bring selected information from applications, APIs, AI services, identities, workloads, and infrastructure sources.', 'Prepare information from different sources in a consistent structure for investigation.', 'Identify potential relationships across events, entities, services, APIs, and workloads.', 'Bring contextual risk indicators and supporting evidence together around selected activity.', 'Examine timelines, entity relationships, potential attack paths, and available evidence.', 'Help analysts review evidence, determine appropriate next steps, and maintain a clear decision history.'];
  const [active, setActive] = useState(2);
  const ActiveIcon = stageIcons[active];
  return <section id="how-it-works" className="section-pad platform-section"><div className="section-intro centered"><SectionLabel>HOW SEGURARA WORKS</SectionLabel><h2>Context at every <em>step.</em></h2></div><div className="pipeline-panel"><div className="pipeline-head"><div><span className="overline">HOW SEGURARA WORKS</span><h3>From signal to decision</h3></div><div className="live-chip"><span className="pulse-dot" /> LIVE PREVIEW</div></div><div className="pipeline">{stages.map((stage, i) => <button key={stage} className={`pipeline-stage ${active === i ? 'active' : ''}`} onMouseEnter={() => setActive(i)} onClick={() => setActive(i)}><span className="stage-number">0{i + 1}</span><span>{stage}</span>{i < stages.length - 1 && <ChevronRight size={15} />}</button>)}</div><div className="pipeline-detail"><div className="detail-icon"><ActiveIcon size={24} /></div><div><span className="overline">STAGE 0{active + 1}</span><h4>{stages[active]}</h4><p>{stageDescriptions[active]}</p></div></div></div></section>;
}
