import '../styles/index.scss';
import type { AppProps } from 'next/app';
import React, { useEffect } from 'react';
import { AuthProvider } from '@/lib/auth';
import Head from 'next/head';
import { CookiesProvider } from 'react-cookie';
import { useApollo } from '@/lib/apolloClient';
import { ApolloProvider } from '@apollo/client';
import Router from 'next/router';
import NProgress from 'nprogress';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignIn from '@/components/elements/signIn';
import SignUp from '@/components/elements/signUp';
import TagManager from 'react-gtm-module';
import { hotjar } from 'react-hotjar';
import Script from 'next/script';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const renderGoogleAnalytics1 = () => (
  <>
    <Script
      src="https://www.googletagmanager.com/gtag/js?id=AW-435888795"
      strategy="afterInteractive"
    />
    <Script id="google-analytics1" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'AW-435888795');
      `}
    </Script>
  </>
);

const renderGoogleAnalytics2 = () => (
  <>
    <Script
      src="https://www.googletagmanager.com/gtag/js?id=UA-180463623-1"
      strategy="afterInteractive"
    />
    <Script id="google-analytics2" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'UA-180463623-1');
      `}
    </Script>
  </>
);

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);
  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-5W3J7HM' });
    hotjar.initialize(2447433, 6);
  }, []);

  return (
    <>
      {renderGoogleAnalytics1()}
      {renderGoogleAnalytics2()}
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
            <SignIn />
            <SignUp />
            <Component {...pageProps} />
            <ToastContainer />
          </AuthProvider>
        </CookiesProvider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
