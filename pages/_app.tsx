import type { AppProps } from 'next/app'
import React, { useEffect } from 'react'
import { I18nextProvider } from 'react-i18next'
import { AuthProvider } from '@/lib/auth'
import Head from 'next/head'
import { CookiesProvider } from 'react-cookie'
import { useApollo } from '@/lib/apolloClient'
import { ApolloProvider } from '@apollo/client'
import Router from 'next/router'
import NProgress from 'nprogress'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import SignIn from '@/components/elements/signIn'
import SignUp from '@/components/elements/signUp'
import GoogledAdsScript from '@/components/scripts/googleAds'
import GoogledAnalyticsScript from '@/components/scripts/googleAnalytics'
import FacebookPixelScript from '@/components/scripts/fbPixel'
import { hotjar } from 'react-hotjar'
import i18n from '../i18n'
import { LocationProvider } from '@/hooks/useLocation'
import { CurrencyProvider } from '@/hooks/useCurrency'
import { ProductsProvider } from '@/hooks/useProducts'
import '../styles/index.scss'

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
      <GoogledAdsScript />
      <GoogledAnalyticsScript />
      <FacebookPixelScript />
      <ApolloProvider client={apolloClient}>
        <I18nextProvider i18n={i18n}>
          <CookiesProvider>
            <AuthProvider client={apolloClient}>
              <LocationProvider>
                <CurrencyProvider>
                  <ProductsProvider>
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
                  </ProductsProvider>
                </CurrencyProvider>
              </LocationProvider>
            </AuthProvider>
          </CookiesProvider>
        </I18nextProvider>
      </ApolloProvider>
    </>
  )
}

export default MyApp
