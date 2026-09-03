import { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';

const STORAGE_KEY = 'segurara-cookie-consent';

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY)) {
        setVisible(false);
        return;
      }
    } catch { /* storage unavailable */ }
    const timer = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const accept = () => {
    try { localStorage.setItem(STORAGE_KEY, 'accepted'); } catch { /* noop */ }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookie consent">
      <div className="cookie-content">
        <div className="cookie-copy">
          <strong>We use cookies</strong>
          <p>We use cookies to improve your experience, analyze traffic, and support our security tooling. By clicking "Accept", you agree to our use of cookies. See our <a href="/privacy">Privacy Policy</a> for details.</p>
        </div>
        <div className="cookie-actions">
          <button className="cookie-accept" onClick={accept}><Check size={14} /> Accept</button>
          <button className="cookie-decline" onClick={accept}><X size={14} /> Decline</button>
        </div>
      </div>
    </div>
  );
}
