import type { AppProps } from 'next/app';
import React from 'react';
import '../styles/global.scss';
import { Provider } from 'react-redux';
import { store } from '../src/store/store';
import { ThemeProvider } from '../src/context/ThemeContext/ThemeContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <ThemeProvider>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
    </ThemeProvider>
  );
}
