import { SectionLabel } from '../../shared/SectionLabel';
import img17 from '../../assets/17.png';
import img18 from '../../assets/18.png';
import img19 from '../../assets/19.png';

const avatars = [img17, img18, img19];

export function TestimonialSection() {
  const quotes = [['The relationship graph turned a pile of disconnected alerts into a timeline I could actually walk an analyst through.', 'Dana Whitfield', 'Security Lead, Fintech Operations'], ['We stopped guessing whether an API call was part of the same incident — Segurara links the evidence before we ask.', 'Marcus Okafor', 'Head of Application Security'], ['The AI assistant suggests the right next question. It keeps our investigations grounded in evidence, not hunches.', 'Priya Raman', 'Staff Incident Responder']] as const;
  return <section className="section-pad testimonial-section"><div className="section-intro centered"><SectionLabel>CUSTOMER STORIES</SectionLabel><h2>Trusted by teams who <em>investigate.</em></h2><p>Security teams use Segurara to turn fragmented signals into context they can act on with confidence.</p></div><div className="testimonial-grid">{quotes.map(([quote, name, role], i) => <figure className="testimonial-card" key={name}><div className="t-quote-mark">“</div><blockquote>{quote}</blockquote><figcaption><div className="t-avatar"><img src={avatars[i]} alt={name} /></div><div><strong>{name}</strong><span>{role}</span></div></figcaption></figure>)}</div></section>;
}
