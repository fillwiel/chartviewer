import React from 'react';
import {createRoot, Root} from 'react-dom/client';
import './index.css';
import App from './App';
import {register} from "./notification/serviceWorker";

const root : Root = createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <App/>
  </React.StrictMode>
);
register();