import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import React from 'react';
import { AuthProvider } from '@/lib/auth';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider pageProps={pageProps}>
      <Head>
        <title>Biometric Photos</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
      </Head>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
