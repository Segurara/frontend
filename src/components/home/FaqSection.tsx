import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { SectionLabel } from '../../shared/SectionLabel';
import { faqs } from '../../shared/data';

export function FaqSection() {
  const [open, setOpen] = useState(0);
  return <section id="faq" className="section-pad faq-section"><div className="section-intro"><SectionLabel>QUESTIONS, WITH CONTEXT</SectionLabel><h2>Good security starts with <em>good questions.</em></h2></div><div className="faq-list">{faqs.map(([question, answer], i) => <div className={`faq-item ${open === i ? 'open' : ''}`} key={i}><button onClick={() => setOpen(open === i ? -1 : i)}><span>{question}</span><ChevronDown size={18} /></button><div className="faq-answer"><p>{answer}</p></div></div>)}</div></section>;
}
