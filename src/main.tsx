import { createRoot } from 'react-dom/client';
import './i18n';
import App from './App';
import './styles.css';

createRoot(document.getElementById('root')!).render(<App />);

// Offline support: lets a village keep using the site after one visit on a weak connection.
if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
  navigator.serviceWorker.register('/sw.js').catch(() => { /* optional */ });
}
