import { LockKeyhole } from 'lucide-react';
import { SectionLabel } from '../../shared/SectionLabel';

export function DocsSection() {
  return <section className="section-pad docs-section"><div><SectionLabel>RESOURCES</SectionLabel><h2>Security documentation<br /><em>is coming soon.</em></h2></div><div className="docs-links">{['API documentation', 'Integration guides', 'Security architecture', 'Deployment guide', 'Developer resources'].map((x) => <span key={x}><LockKeyhole size={14} /> {x}<b>COMING SOON</b></span>)}</div></section>;
}
