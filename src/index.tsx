import ReactDOM from 'react-dom/client';
import Setup from './boot/setup';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<Setup />);
