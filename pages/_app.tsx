import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import React from 'react';
import { AuthProvider } from '../lib/auth';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider pageProps={pageProps}>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
