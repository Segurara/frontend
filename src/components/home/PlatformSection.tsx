import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { SectionLabel } from '../../shared/SectionLabel';
import img4 from '../../assets/4.png';
import img5 from '../../assets/5.png';
import img6 from '../../assets/6.png';
import img7 from '../../assets/7.png';
import img8 from '../../assets/8.png';
import img9 from '../../assets/9.png';

const stageImages = [img4, img5, img6, img7, img8, img9];

export function PlatformSection() {
  const stages = ['Connect', 'Normalize', 'Correlate', 'Enrich', 'Investigate', 'Decide'];
  const stageDescriptions = ['Bring selected information from applications, APIs, AI services, identities, workloads, and infrastructure sources.', 'Prepare information from different sources in a consistent structure for investigation.', 'Identify potential relationships across events, entities, services, APIs, and workloads.', 'Bring contextual risk indicators and supporting evidence together around selected activity.', 'Examine timelines, entity relationships, potential attack paths, and available evidence.', 'Help analysts review evidence, determine appropriate next steps, and maintain a clear decision history.'];
  const [active, setActive] = useState(2);
  return <section id="how-it-works" className="section-pad platform-section"><div className="section-intro centered"><SectionLabel>HOW SEGURARA WORKS</SectionLabel><h2>Context at every <em>step.</em></h2></div><div className="pipeline-panel"><div className="pipeline-head"><div><span className="overline">HOW SEGURARA WORKS</span><h3>From signal to decision</h3></div><div className="live-chip"><span className="pulse-dot" /> LIVE PREVIEW</div></div><div className="pipeline">{stages.map((stage, i) => <button key={stage} className={`pipeline-stage ${active === i ? 'active' : ''}`} onMouseEnter={() => setActive(i)} onClick={() => setActive(i)}><span className="stage-number">0{i + 1}</span><span>{stage}</span>{i < stages.length - 1 && <ChevronRight size={15} />}</button>)}</div><div className="pipeline-detail"><div className="detail-icon"><img src={stageImages[active]} alt={`${stages[active]} stage`} /></div><div><span className="overline">STAGE 0{active + 1}</span><h4>{stages[active]}</h4><p>{stageDescriptions[active]}</p></div></div></div></section>;
}
