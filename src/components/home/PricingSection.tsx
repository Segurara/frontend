import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check, LockKeyhole, X } from 'lucide-react';
import { SectionLabel } from '../../shared/SectionLabel';

interface PaypalActions {
  order: {
    create: (options: { purchase_units: unknown[] }) => Promise<unknown>;
    capture: () => Promise<unknown>;
  };
}
interface PaypalButton {
  render: (node: HTMLElement) => void;
  close: () => void;
}
interface PaypalSdk {
  Buttons: (config: {
    style: Record<string, string | number>;
    createOrder: (data: unknown, actions: PaypalActions) => Promise<unknown>;
    onApprove: (data: unknown, actions: PaypalActions) => void;
    onCancel: () => void;
    onError: (err: unknown) => void;
  }) => PaypalButton;
}

const plans = [
  { title: 'Platform Starter', desc: 'For teams exploring Segurara’s investigation approach.', price: '70.00', display: '$70', note: 'Introductory evaluation', cta: 'Explore the Platform', featured: false },
  { title: 'Professional Evaluation', desc: 'For teams assessing Segurara against a defined investigation use case.', price: '150.00', display: '$150', note: 'Defined evaluation scope', cta: 'Request an Evaluation', featured: true, recommended: true },
  { title: 'Enterprise Discussion', desc: 'For organizations with broader security, governance, and deployment requirements.', price: 'Custom', display: 'Custom', note: 'Designed around your environment', cta: 'Contact Our Team', featured: false },
];

const features: Record<string, string[]> = {
  'Platform Starter': ['Platform overview', 'Capability walkthrough', 'Example investigation workflow', 'Requirements discussion'],
  'Professional Evaluation': ['Use-case discovery', 'Technical requirements review', 'Guided interface demonstration', 'Evaluation-scope planning'],
  'Enterprise Discussion': ['Architecture discussion', 'Integration requirements', 'Governance considerations', 'Deployment-option review'],
};

export function PricingSection() {
  const [checkout, setCheckout] = useState<(typeof plans)[0] | null>(null);
  return <section id="pricing" className="section-pad pricing-section"><div className="section-intro centered"><SectionLabel>PRICING</SectionLabel><h2>Find the right starting point for your <em>security team.</em></h2><p>Discuss your security environment, investigation priorities, and technical requirements to identify an appropriate evaluation approach.</p></div><div className="pricing-grid">{plans.map((plan, i) => <div className={`price-card ${plan.featured ? 'featured' : ''}`} key={plan.title}><div className="price-top"><span>{plan.title}</span>{plan.recommended && <b>RECOMMENDED</b>}</div><p>{plan.desc}</p><strong className="price">{plan.display}</strong><span className="price-note">{plan.note}</span>{i === 2 ? <a className="secondary-button" href="#contact">{plan.cta} <ArrowUpRight size={15} /></a> : <button className={i === 1 ? 'primary-button' : 'secondary-button'} onClick={() => setCheckout(plan)}>{plan.cta} <ArrowUpRight size={15} /></button>}<div className="price-features">{(features[plan.title] || []).map((feature) => <span key={feature}><Check size={14} /> {feature}</span>)}</div></div>)}</div>{checkout && <PaymentModal plan={checkout.title} price={checkout.price === '0.00' ? '0.00' : checkout.price} free={checkout.price === '0.00'} onClose={() => setCheckout(null)} />}</section>;
}

function PaymentModal({ plan, price, free = false, onClose }: { plan: string; price: string; free?: boolean; onClose: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const win = window as unknown as { paypalSdk?: PaypalSdk };
    const node = containerRef.current;
    if (!win.paypalSdk || !win.paypalSdk.Buttons || !node || free) return;
    let rendered: PaypalButton | undefined;
    try {
      rendered = win.paypalSdk.Buttons({
        style: { layout: 'vertical', color: 'gold', shape: 'rect', label: 'paypal', height: 44 },
        createOrder: (_data, actions) => actions.order.create({
          purchase_units: [{ description: `Segurara ${plan} plan`, amount: { currency_code: 'USD', value: price } }],
        }),
        onApprove: (_data, actions) => actions.order.capture().then(() => { setStatus('success'); }),
        onCancel: () => { setStatus('idle'); },
        onError: (err) => { console.error('PayPal error', err); setStatus('error'); },
      });
      rendered.render(node);
    } catch (e) { console.error('PayPal render error', e); }
    return () => {
      if (rendered && rendered.close) { try { rendered.close(); } catch { /* noop */ } }
      if (node) node.innerHTML = '';
    };
  }, [plan, price, free]);

  return (
    <div className="payment-overlay" onClick={onClose}>
      <div className="payment-modal" onClick={(e) => e.stopPropagation()}>
        <button className="payment-close" onClick={onClose} aria-label="Close"><X size={16} /></button>
        <span className="overline">SEGURARA CHECKOUT</span>
        <h3>{plan} plan</h3>
        {status === 'success' ? (
          <>
            <strong className="payment-price green-text">{free ? 'Free' : '$' + price}</strong>
            <div className="payment-success"><Check size={18} /> Thank you! Your {plan} plan {free ? 'is active' : 'payment was successful'}.</div>
            <button className="primary-button" onClick={onClose}>Done <Check size={15} /></button>
          </>
        ) : free ? (
          <>
            <strong className="payment-price green-text">Free</strong>
            <p>The Starter plan is free — no payment required. Activate it instantly.</p>
            <button className="primary-button" onClick={() => setStatus('success')}>Activate free plan <Check size={15} /></button>
            <button className="payment-cancel" onClick={onClose}>Cancel</button>
          </>
        ) : (
          <>
            <strong className="payment-price">${price}<small>/month</small></strong>
            <p>Secure checkout powered by PayPal. Complete your payment below.</p>
            {status === 'error' && <div className="payment-error">Payment could not be completed. Please try again.</div>}
            <div ref={containerRef} className="paypal-container" />
            <div className="payment-secure"><LockKeyhole size={12} /> Payments are securely processed by PayPal.</div>
            <button className="payment-cancel" onClick={onClose}>Cancel</button>
          </>
        )}
      </div>
    </div>
  );
}
