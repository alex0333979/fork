import React, { useEffect } from 'react'
import type { AppProps } from 'next/app'
import Router from 'next/router'
import Head from 'next/head'
import { ApolloProvider } from '@apollo/client'
import { CookiesProvider } from 'react-cookie'
import { ToastContainer } from 'react-toastify'
import { hotjar } from 'react-hotjar'
import NProgress from 'nprogress'
import { I18nextProvider } from 'react-i18next'

import i18n from '@/i18n'
import SignIn from '@/modules/auth/signIn'
import SignUp from '@/modules/auth/signUp'
import GoogledAdsScript from '@/scripts/googleAds'
import GoogledAnalyticsScript from '@/scripts/googleAnalytics'
import FacebookPixelScript from '@/scripts/fbPixel'
import MailChimpScript from '@/scripts/mailchimp'
import MicrosoftUETScript from '@/scripts/msUet'
import {
  AppProvider,
  AuthProvider,
  LocationProvider,
  CurrencyProvider,
  ProductsProvider,
} from '@/contexts'

import { useApollo } from '@/apollo/client'
import '@/assets/scss/index.scss'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps)

  useEffect(() => {
    hotjar.initialize(2447433, 6)
  }, [])

  return (
    <>
      <ApolloProvider client={apolloClient}>
        <I18nextProvider i18n={i18n}>
          <CookiesProvider>
            <AppProvider>
              <AuthProvider client={apolloClient}>
                <LocationProvider>
                  <CurrencyProvider>
                    <ProductsProvider>
                      <Head>
                        <meta
                          name="viewport"
                          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
                        />
                        <title>Passport Photos</title>
                      </Head>
                      <SignIn />
                      <SignUp />
                      <Component {...pageProps} />
                      <ToastContainer />
                    </ProductsProvider>
                  </CurrencyProvider>
                </LocationProvider>
              </AuthProvider>
            </AppProvider>
          </CookiesProvider>
        </I18nextProvider>
      </ApolloProvider>
      <MailChimpScript />
      <GoogledAdsScript />
      <GoogledAnalyticsScript />
      <FacebookPixelScript />
      <MicrosoftUETScript />
    </>
  )
}

export default MyApp
