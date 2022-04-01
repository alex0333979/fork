import '../styles/index.scss';
import type { AppProps } from 'next/app';
import React, { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
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
import { hotjar } from 'react-hotjar';
import Script from 'next/script';
import i18n from '../i18n';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const renderGoogleAds = () => (
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

const renderGoogleAnalytics = () => (
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

const renderOribiTracking = () => (
  <Script id="oribi-tracking" strategy="afterInteractive">
    {`(function(b,o,n,g,s,r,c){if(b[s])return;b[s]={};b[s].scriptToken="XzE0ODc5MTkxNjI";
    b[s].callsQueue=[];b[s].api=function(){b[s].callsQueue.push(arguments);};r=o.createElement(n);
    c=o.getElementsByTagName(n)[0];r.async=1;r.src=g;r.id=s+n;c.parentNode.insertBefore(r,c);})
    (window,document,"script","https://cdn.oribi.io/XzE0ODc5MTkxNjI/oribi.js","ORIBI");`}
  </Script>
);

const renderFacebookPixel = () => (
  <>
    <Script id="facebook-pixel" strategy="afterInteractive">
      {`!function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '535055860956443');
        fbq('track', 'PageView');`}
    </Script>
    <noscript
      dangerouslySetInnerHTML={{
        __html: `<img height="1" width="1" style="display:none"
        src="https://www.facebook.com/tr?id=535055860956443&ev=PageView&noscript=1"
    />`
      }}
    />
  </>
);

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);
  useEffect(() => {
    hotjar.initialize(2447433, 6);
  }, []);

  return (
    <>
      {renderGoogleAds()}
      {renderGoogleAnalytics()}
      {renderOribiTracking()}
      {renderFacebookPixel()}
      <ApolloProvider client={apolloClient}>
        <I18nextProvider i18n={i18n}>
          <CookiesProvider>
            <AuthProvider client={apolloClient}>
              <Head>
                <title>{'Passport Photos'}</title>
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
        </I18nextProvider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
