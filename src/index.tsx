import './index.css';
import './portfolio.css';
import { createRoot } from 'react-dom/client';
import { App } from './App';

const root = document.getElementById('root');
if (!root) throw new Error('Portfolio root element is missing.');
createRoot(root).render(<App />);
