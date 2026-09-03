import { SectionLabel } from '../../shared/SectionLabel';
import { capabilities } from '../../shared/data';

export function CapabilitiesSection() {
  return <section id="capabilities" className="section-pad capabilities-section"><div className="section-intro"><SectionLabel>BUILT FOR INVESTIGATION</SectionLabel><h2>Clarity for the moments<br />that <em>matter.</em></h2><p>Purpose-built investigation surfaces help security teams move from isolated activity to evidence-supported understanding while keeping analysts responsible for final decisions.</p></div><div className="capability-grid">{capabilities.map(({ title, text, icon: IconComponent, accent }) => <article className={`capability-card ${accent}`} key={title}><div className="cap-top"><div className="cap-icon"><IconComponent size={20} /></div></div><h3>{title}</h3><p>{text}</p><div className="cap-visual"><span /><span /><span /><span /><span /></div></article>)}</div></section>;
}
