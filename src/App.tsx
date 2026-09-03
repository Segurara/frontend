import { useEffect, useState } from 'react';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';

type Route = 'home' | 'product' | 'privacy' | 'terms';

function App() {
  const [route, setRoute] = useState<Route>(window.location.pathname === '/product' ? 'product' : window.location.pathname === '/privacy' ? 'privacy' : window.location.pathname === '/terms' ? 'terms' : 'home');

  useEffect(() => {
    const onPopState = () => setRoute(window.location.pathname === '/product' ? 'product' : window.location.pathname === '/privacy' ? 'privacy' : window.location.pathname === '/terms' ? 'terms' : 'home');
    window.addEventListener('popstate', onPopState);
    window.scrollTo({ top: 0, behavior: 'instant' });
    return () => window.removeEventListener('popstate', onPopState);
  }, [route]);

  const navigate = (nextRoute: Route) => {
    const path = nextRoute === 'product' ? '/product' : nextRoute === 'privacy' ? '/privacy' : nextRoute === 'terms' ? '/terms' : '/';
    window.history.pushState({}, '', path);
    setRoute(nextRoute);
  };

  return route === 'product' ? <ProductPage onHome={() => navigate('home')} onPrivacy={() => navigate('privacy')} onTerms={() => navigate('terms')} /> : route === 'privacy' ? <PrivacyPage onHome={() => navigate('home')} /> : route === 'terms' ? <TermsPage onHome={() => navigate('home')} /> : <HomePage onProduct={() => navigate('product')} onHome={() => navigate('home')} onPrivacy={() => navigate('privacy')} onTerms={() => navigate('terms')} />;
}

export default App;
