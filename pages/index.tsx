/* eslint-disable max-len */
import type { NextPage } from 'next'
import React, { useMemo } from 'react'
import { AppLayout } from '../components'
import { NextSeo } from 'next-seo'
import { SEO } from '../constants'
import Home from '@/components/home'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { countries, EXTRA_PATH } from '../constants'
import { initializeApollo } from '@/lib/apolloClient'
import { ApolloQueryResult } from '@apollo/client'
import {
  Country,
  DocumentsByCountryDocument,
  DocumentsByCountryQuery,
  PDocument,
} from '@/generated/graphql'

export interface HomePageProps {
  country: Country | null
  document: PDocument | null
  extraPath: string | null
  title?: string
  description?: string
}

const HomePage: NextPage<HomePageProps> = ({
  country,
  document,
  extraPath,
}) => {
  const { title, description } = useMemo(() => {
    let _title = 'Take Your Passport and Visa Photos Online'
    let _desc = 'Get your perfect biometric photo (compliance guaranteed)'
    if (extraPath && EXTRA_PATH.includes(extraPath)) {
      if (extraPath === 'order-passport-photos-online') {
        _title =
          'Order Your Passport Photos Online With Our Simple Digital Tool'
        _desc =
          'Use your cell phone and order your passport photos online. We’ve made it easy. Our software makes sure it’s verified and you’ll receive it ready for your application.'
      } else if (extraPath === 'take-your-own-passport-photo') {
        _title = 'Yes! You Can Take Your Own Passport Photo.'
        _desc =
          'Take your own passport photo with your cell phone. We’ve made it easy. Our software makes sure it’s verified and you’ll receive it ready for your application.'
      } else if (extraPath === 'take-your-passport-photo-with-your-phone') {
        _title = 'Go Ahead, Take Your Passport Photo With Your Phone'
        _desc =
          'Take your passport photo with your cell phone, we’ve made it easy. Our software makes sure it’s verified and you’ll receive it ready for your application.'
      } else if (extraPath === 'take-passport-photos-at-home') {
        _title = 'Take Your Passport Photo at Home, With Our Simple to Tool'
        _desc =
          'From home or virtually anywhere, take your passport photo with your cell phone or desktop. We’ve made it easy. Our software makes sure it’s verified and you’ll receive it ready for your application.'
      } else if (extraPath === 'print-passport-photos-at-home') {
        _title = 'Print Your Passport Photo at Home, With Our Simple to Tool'
        _desc =
          'Use your cell phone and print your passport photo at home. We’ve made it easy. Our software makes sure it’s verified and you’ll receive it ready for your application.'
      }
    } else {
      _desc = 'Get your perfect biometric photo (compliance guaranteed)'
      if (country && document) {
        _title = `Take Your ${country.country} ${document.type} Photos Online`
      } else if (country) {
        _title = `Take Your ${country.country} Passport and Visa Photos Online`
      } else {
        _title = `Take Your Passport and Visa Photos Online`
      }
    }

    return { title: _title, description: _desc }
  }, [country, document, extraPath])

  return (
    <>
      <NextSeo title={title} description={SEO.home.description} />
      <AppLayout>
        <Home
          country={country}
          document={document}
          extraPath={extraPath}
          title={title}
          description={description}
        />
      </AppLayout>
    </>
  )
}

export default HomePage

export const getServerSideProps: GetServerSideProps<HomePageProps> = async (
  context: GetServerSidePropsContext,
) => {
  const countryCode = context?.params?.country as string
  const documentType = context?.params?.documentType as string
  const extraPath = (context?.params?.extraPath as string) || null

  if (!countryCode) {
    return {
      props: {
        country: null,
        document: null,
        extraPath,
      },
    }
  }
  const country = countries.find(
    (c) =>
      c.country.toLowerCase().replace(/\s/g, '-') === countryCode.toLowerCase(),
  )
  if (!country) {
    return {
      props: {
        country: null,
        document: null,
        extraPath,
      },
    }
  }
  if (!documentType) {
    return {
      props: {
        country,
        document: null,
        extraPath,
      },
    }
  }
  try {
    const client = initializeApollo(null, context)
    const documentsResult: ApolloQueryResult<DocumentsByCountryQuery> =
      await client.query({
        query: DocumentsByCountryDocument,
        variables: { country: country.country },
        fetchPolicy: 'no-cache',
      })
    const documents = documentsResult.data?.DocumentsByCountry.data
    const document = documents?.find(
      (d) =>
        d.type
          ?.toLowerCase()
          .replace(/[^\w\s]/gi, '')
          .replace(/\s/g, '-') ===
        documentType.toLowerCase().replace(/\s/g, '-'),
    )
    return {
      props: {
        country,
        document: document ?? null,
        extraPath,
      },
    }
  } catch (e) {
    return {
      props: {
        country: null,
        document: null,
        extraPath,
      },
    }
  }
}
