import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import React from 'react';
import { AuthProvider } from '@/lib/auth';
import Head from 'next/head';
import { CookiesProvider } from 'react-cookie';
import { useApollo } from '@/lib/apolloClient';
import { ApolloProvider } from '@apollo/client';
import Router from 'next/router';
import NProgress from 'nprogress';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from '@/components/elements/login';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <CookiesProvider>
        <AuthProvider client={apolloClient}>
          <Head>
            <title>{'Biometric Photos'}</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
            />
          </Head>
          <Login />
          <Component {...pageProps} />
          <ToastContainer />
        </AuthProvider>
      </CookiesProvider>
    </ApolloProvider>
  );
}

export default MyApp;
