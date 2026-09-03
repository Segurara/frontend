import { useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import {
  Hero,
  ContextSection,
  PlatformSection,
  CapabilitiesSection,
  RuntimeSection,
  CorrelationSection,
  AssistantSection,
  GraphSection,
  DashboardPreview,
  AudienceSection,
  TestimonialSection,
  PricingSection,
  FaqSection,
  AboutContact,
  DocsSection,
  FinalCtaSection,
} from '../components/home';

export function HomePage({ onProduct, onHome, onPrivacy, onTerms }: { onProduct: () => void; onHome: () => void; onPrivacy: () => void; onTerms: () => void }) {
  useEffect(() => { document.title = 'Segurara — Security Intelligence for Modern Applications'; }, []);
  return (
    <div className="site-shell">
      <Header onProduct={onProduct} onHome={onHome} />
      <main>
        <Hero onProduct={onProduct} />
        <ContextSection />
        <PlatformSection />
        <CapabilitiesSection />
        <RuntimeSection />
        <CorrelationSection onProduct={onProduct} />
        <AssistantSection />
        <GraphSection onProduct={onProduct} />
        <DashboardPreview onProduct={onProduct} />
        <AudienceSection />
        <TestimonialSection />
        <PricingSection />
        <FaqSection />
        <AboutContact />
        <DocsSection />
        <FinalCtaSection onProduct={onProduct} />
      </main>
      <Footer onPrivacy={onPrivacy} onTerms={onTerms} />
    </div>
  );
}
