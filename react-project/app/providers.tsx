'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../src/context/ThemeContext/ThemeContext';
import { store } from '../src/store/store';

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <Provider store={store}>{children}</Provider>
    </ThemeProvider>
  );
}

export default Providers;
