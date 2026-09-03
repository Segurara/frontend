import { useEffect } from 'react';
import { ChevronDown, CircleDot } from 'lucide-react';
import { Footer } from '../components/Footer';
import { SectionLabel } from '../shared/SectionLabel';
import {
  ProductHeader,
  WorkspaceOverview,
  WorkspaceInvestigation,
  WorkspaceAssistant,
  WorkspaceGraph,
} from '../components/product';

export function ProductPage({ onHome, onPrivacy, onTerms }: { onHome: () => void; onPrivacy: () => void; onTerms: () => void }) {
  useEffect(() => { document.title = 'Segurara — Security Workspace'; }, []);
  return (
    <div className="site-shell product-page">
      <ProductHeader onHome={onHome} />
      <main>
        <section className="product-hero section-pad">
          <div className="product-hero-inner">
            <div className="eyebrow"><span className="pulse-dot" /> SEGURARA WORKSPACE</div>
            <h1>Investigate with full <em>security context.</em></h1>
            <p>Runtime, application, identity and AI-service signals connected into one coherent place to investigate.</p>
            <div className="product-hero-actions">
              <a className="primary-button" href="#overview">See the workspace <ChevronDown size={16} /></a>
              <span className="context-chip"><CircleDot size={12} /> Case CASE-2048</span>
            </div>
          </div>
        </section>

        <section id="overview" className="section-pad product-section">
          <div className="section-intro">
            <SectionLabel>OVERVIEW</SectionLabel>
            <h2>What deserves your attention <em>today.</em></h2>
            <p>Active cases, risk signals and telemetry health across your connected security sources.</p>
          </div>
          <WorkspaceOverview />
        </section>

        <section id="investigation" className="section-pad product-section">
          <div className="section-intro">
            <SectionLabel>INCIDENT INVESTIGATION</SectionLabel>
            <h2>Follow the <em>evidence.</em></h2>
            <p>Reconstruct the chronology of CASE-2048 and understand why it is elevated.</p>
          </div>
          <WorkspaceInvestigation />
        </section>

        <section id="assistant" className="section-pad product-section">
          <div className="section-intro">
            <SectionLabel>AI INVESTIGATION ASSISTANT</SectionLabel>
            <h2>Ask the <em>security context.</em></h2>
            <p>Get suggested, evidence-linked answers and explore the right next question.</p>
          </div>
          <WorkspaceAssistant />
        </section>

        <section id="relationships" className="section-pad product-section">
          <div className="section-intro">
            <SectionLabel>RELATIONSHIP GRAPH</SectionLabel>
            <h2>Follow the <em>relationship.</em></h2>
            <p>See how identities, applications, APIs and workloads connect inside the wider ecosystem.</p>
          </div>
          <WorkspaceGraph />
        </section>
      </main>
      <Footer onPrivacy={onPrivacy} onTerms={onTerms} />
    </div>
  );
}