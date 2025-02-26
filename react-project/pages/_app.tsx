import type { AppProps } from 'next/app';
import React from 'react';
import '../styles/global.scss';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../src/context/ThemeContext/ThemeContext';
import { store } from '../src/store/store';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ThemeProvider>
  );
}
