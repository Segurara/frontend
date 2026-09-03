import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import faviconUrl from './assets/1.png';

const link = document.querySelector<HTMLLinkElement>("link[rel='icon']");
if (link) {
  link.href = faviconUrl;
  link.type = 'image/png';
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
