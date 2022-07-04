/* eslint-disable max-len */
import type { NextPage } from 'next'
import ErrorPage from 'next/error'
import React, { useMemo } from 'react'
import { AppLayout } from '../components'
import { NextSeo } from 'next-seo'
import { SEO } from '../constants'
import Home from '@/components/home'
import { HomepageContent } from '@/components/home/constant'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { countries, ExtraPath } from '../constants'
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
  description?: any
  errorCode?: number
}

const HomePage: NextPage<HomePageProps> = ({
  country,
  document,
  extraPath,
  errorCode = 200,
}) => {
  const { title, description, seo } = useMemo(() => {
    let _title = HomepageContent.default.title
    let _desc = HomepageContent.default.description
    let _seo = HomepageContent.default.seo || []
    if (extraPath && ExtraPath.includes(extraPath)) {
      if (country?.countryCode === 'US') {
        _title = HomepageContent[extraPath].title
        _desc = HomepageContent[extraPath].description
        _seo = HomepageContent[extraPath].seo || []
      } else if (country?.countryCode === 'GB') {
        _title = HomepageContent[`${extraPath}-gb`].title
        _desc = HomepageContent[`${extraPath}-gb`].description
        _seo = HomepageContent[`${extraPath}-gb`].seo || []
      }
    } else {
      if (country && document) {
        _title = `Take Your ${country.country} ${document.type} Photos Online`
      } else if (country) {
        _title = `Take Your ${country.country} Passport and Visa Photos Online`
      }
    }

    return { title: _title, description: _desc, seo: _seo }
  }, [country, document, extraPath])

  if (errorCode === 404) {
    return <ErrorPage statusCode={errorCode} />
  }
  return (
    <>
      <NextSeo
        title={title}
        description={seo?.length ? seo.join(', ') : SEO.home.description}
      />
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

  if (extraPath && ExtraPath.includes(extraPath)) {
    const _props = {
      props: {
        country: null,
        document: null,
        extraPath,
        errorCode: 404,
      },
    }
    if (!countryCode) return _props

    if (countryCode !== 'united-states') {
      if (
        !(
          countryCode === 'united-kingdom' &&
          (extraPath.includes('take-passport-photos-at-home') ||
            extraPath.includes('order-passport-photos-online') ||
            extraPath.includes('take-your-own-passport-photo') ||
            extraPath.includes('take-your-passport-photo-with-your-phone') ||
            extraPath.includes('print-passport-photos-at-home') ||
            extraPath.includes('passport/passport-photo-app'))
        )
      ) {
        return _props
      }
    }
  }

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
        errorCode: 404,
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
