import '@styles/tailwind.css';

import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { ModuleProvider } from './context/ModuleContext';
import ReactQueryProvider from './lib/query-provider/ReactQueryProvider';

createRoot(document.getElementById('root')).render(
  <ReactQueryProvider>
    <BrowserRouter>
      <ModuleProvider>
        <App />
      </ModuleProvider>
    </BrowserRouter>
  </ReactQueryProvider>
);
