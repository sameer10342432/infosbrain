import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Support production API URL configuration via VITE_API_URL
const API_BASE = ((import.meta as any).env?.VITE_API_URL || '').replace(/\/$/, '');
if (API_BASE) {
  const origFetch = window.fetch;
  window.fetch = function (input: RequestInfo | URL, init?: RequestInit) {
    if (typeof input === 'string' && input.startsWith('/api')) {
      input = `${API_BASE}${input}`;
    } else if (input instanceof Request && input.url.startsWith('/api')) {
      input = new Request(`${API_BASE}${input.url}`, input);
    }
    return origFetch.call(this, input, init);
  };
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
