/* eslint-disable max-len */
import React, { useMemo } from 'react'
import { InferGetServerSidePropsType, GetServerSideProps, GetServerSidePropsContext, GetStaticPathsContext, GetStaticPropsContext, PreviewData } from 'next'
import type { NextPage } from 'next'
import ErrorPage from 'next/error'
import { NextSeo } from 'next-seo'
import { ApolloQueryResult } from '@apollo/client'

import { createClient } from '../../prismicio'

import { AppLayout } from '@/components'
import Home from '@/modules/home'
import { HomepageContent } from '@/modules/home/constant'
import { SEO, countries, ExtraPathMap, AvailablePath } from '@/constants'
import { initializeApollo } from '@/apollo/client'
import {
  Country,
  DocumentsByCountryDocument,
  DocumentsByCountryQuery,
  PDocument,
} from '@/apollo'
import { ParsedUrlQuery } from 'querystring'
import { PageTypeHashes, PageUIDHashes } from '@/constants/PageUIDHashes'
import { PrismicDocument } from '@prismicio/types'

export type LandingPageProps = InferGetServerSidePropsType<typeof getServerSideProps>

export interface HomePageProps {
  country: Country | null
  document: PDocument | null
  extraPath: string | null
  title?: string
  buttonTitle?: string
  description?: any
  errorCode?: number
  onStart?: () => void
  page?: PrismicDocument<Record<string, any>, string, string>
}

const HomePage: NextPage<HomePageProps> = ({
  country,
  document,
  extraPath,
  errorCode = 200,
  page
}) => {
  const { title, description, seo, buttonTitle } = useMemo(() => {
    let countryName = ''
    if (country?.countryCode?.toLowerCase() === 'us') {
      countryName = 'US'
    } else if (country?.countryCode?.toLowerCase() === 'gb') {
      countryName = 'UK'
    } else if (country?.countryCode?.toLowerCase() === 'ca') {
      countryName = 'Canadian'
    }

    let _title = page?.data.title[0].text
    let _desc = HomepageContent.default.description
    let _seo = HomepageContent.default.seo || []
    let _buttonTitle = `Take Your ${countryName} ${
      document?.type || ''
    } Photo Now`

    if (extraPath && Object.values(ExtraPathMap).includes(extraPath)) {
      if (country?.countryCode === 'US') {
        _title = HomepageContent[extraPath].title
        _desc = HomepageContent[extraPath].description
        _seo = HomepageContent[extraPath].seo || []
      } else if (country?.countryCode === 'GB') {
        _title = HomepageContent[`${extraPath}-gb`].title
        _desc = HomepageContent[`${extraPath}-gb`].description
        _seo = HomepageContent[`${extraPath}-gb`].seo || []
      } else if (country?.countryCode === 'CA') {
        _title = HomepageContent[extraPath].title
        _desc = HomepageContent[extraPath].description
        _seo = HomepageContent[extraPath].seo || []
      }
    } else {
      if (country && document) {
        _title = `Take Your ${country.country} ${document.type} Photos Online`
      } else if (country) {
        _title = `Take Your ${country.country} Passport and Visa Photos Online`
      }
    }

    if (
      extraPath &&
      [
        ExtraPathMap.PrintMyPassportPhotoAtCvs,
        ExtraPathMap.PrintMyPassportPhotoAtWalgreens,
        ExtraPathMap.PassportPhotosNearMe,
      ].includes(extraPath)
    ) {
      _buttonTitle = 'Get Started'
    }

    return {
      title: _title,
      description: _desc,
      seo: _seo,
      buttonTitle: _buttonTitle,
    }
  }, [country, document, extraPath])

  if (errorCode === 404) {
    return <ErrorPage statusCode={errorCode} />
  }
  return (
    <>
      <NextSeo
        title={title || undefined}
        description={seo?.length ? seo.join(', ') : SEO.home.description}
      />
      <AppLayout>
        <Home
          page={page}
          country={country}
          document={document}
          extraPath={extraPath}
          title={title || undefined}
          description={description}
          buttonTitle={buttonTitle}
        />

      </AppLayout>
    </>
  )
}

export default HomePage

export const getServerSideProps: GetServerSideProps<HomePageProps> = async (
  context: GetServerSidePropsContext,
) => {
  const previewData = context.params?.previewData;
  const client = createClient({ previewData })
  const page = await client.getByUID(PageTypeHashes.usLandingPage, PageUIDHashes.homepage)
  const countryCode = context?.params?.country as string
  const documentType = context?.params?.documentType as string
  const extraPath = (context?.params?.extraPath as string) || null
  if (countryCode && documentType && extraPath) {
    const isValid = (AvailablePath[countryCode]?.[documentType] || []).includes(
      extraPath,
    )
    if (!isValid) {
      return {
        props: {
          country: null,
          document: null,
          extraPath: null,
          errorCode: 404,
          page
        },
      }
    }
  }

  if (!countryCode) {
    return {
      props: {
        country: null,
        document: null,
        extraPath,
        page
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
        page
      },
    }
  }
  if (!documentType) {
    return {
      props: {
        country,
        document: null,
        extraPath,
        page
      },
    }
  }
  try {
    const client = initializeApollo(null, context)
    const documentsResult: ApolloQueryResult<DocumentsByCountryQuery> =
      await client.query({
        query: DocumentsByCountryDocument,
        variables: { country: country.country },
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
        page
      },
    }
  } catch (e) {
    return {
      props: {
        country: null,
        document: null,
        extraPath: null,
        page
      },
    }
  }
}
