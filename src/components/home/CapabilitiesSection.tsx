import { SectionLabel } from '../../shared/SectionLabel';
import { capabilities } from '../../shared/data';
import img11 from '../../assets/11.png';
import img12 from '../../assets/12.png';
import img13 from '../../assets/13.png';
import img14 from '../../assets/14.png';
import img15 from '../../assets/15.png';
import img16 from '../../assets/16.png';

const capImages = [img11, img12, img13, img14, img15, img16];

export function CapabilitiesSection() {
  return <section id="capabilities" className="section-pad capabilities-section"><div className="section-intro"><SectionLabel>BUILT FOR INVESTIGATION</SectionLabel><h2>Clarity for the moments<br />that <em>matter.</em></h2><p>Purpose-built investigation surfaces help security teams move from isolated activity to evidence-supported understanding while keeping analysts responsible for final decisions.</p></div><div className="capability-grid">{capabilities.map(({ title, text, accent }, i) => <article className={`capability-card ${accent}`} key={title}><div className="cap-top"><div className="cap-icon"><img src={capImages[i]} alt={title} /></div></div><h3>{title}</h3><p>{text}</p><div className="cap-visual"><span /><span /><span /><span /><span /></div></article>)}</div></section>;
}
