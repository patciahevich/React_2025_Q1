import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
