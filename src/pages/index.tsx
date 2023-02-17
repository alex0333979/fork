/* eslint-disable max-len */
import React from 'react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import type { NextPage } from 'next'
import ErrorPage from 'next/error'
import { NextSeo } from 'next-seo'
import { ApolloQueryResult } from '@apollo/client'
import { PrismicDocument } from '@prismicio/types'
import * as prismicH from '@prismicio/helpers'

import { createClient } from '../../prismicio'

import { AppLayout } from '@/components'
import Home from '@/modules/home'
import { countries, AvailablePath } from '@/constants'
import { initializeApollo } from '@/apollo/client'
import {
  Country,
  DocumentsByCountryDocument,
  DocumentsByCountryQuery,
  PDocument,
} from '@/apollo'
import { PageTypeHashes, PageUIDHashes } from '@/constants/PageUIDHashes'
import { transformPrismic } from '@/utils/prismic'

export interface HomePageProps {
  country: Country | null
  document: PDocument | null
  errorCode?: number
  onStart?: () => void
  page?: PrismicDocument<Record<string, any>, string, string>
  extraPath?: string | null
  locale?: string
}

const HomePage: NextPage<HomePageProps> = ({
  country,
  document,
  errorCode = 200,
  page,
  extraPath,
}) => {
  if (errorCode === 404) {
    return <ErrorPage statusCode={errorCode} />
  }

  return (
    <>
      <NextSeo
        title={
          transformPrismic(prismicH.asText(page?.data.title), {
            country: country?.country,
            documentType: document?.type,
          }) || undefined
        }
      />
      <AppLayout>
        <Home
          page={page}
          country={country}
          document={document}
          extraPath={extraPath}
        />
      </AppLayout>
    </>
  )
}

export default HomePage

export const getServerSideProps: GetServerSideProps<HomePageProps> = async (
  context: GetServerSidePropsContext,
) => {
  const previewData = context.params?.previewData
  const documentType = context?.params?.documentType as string
  const countryCode = context?.params?.country as string
  const locale = context?.locale as string

  const client = createClient({ previewData })

  let page: any

  if (!countryCode && !documentType) {
    page = await client.getByUID(
      PageTypeHashes.landingPage,
      PageUIDHashes.homepage,
      { lang: locale },
    )
  } else if (countryCode && !documentType) {
    page = await client.getByUID(
      PageTypeHashes.landingPage,
      PageUIDHashes.dynamic_page,
      { lang: locale },
    )
  } else if (countryCode && documentType) {
    page = await client.getByUID(
      PageTypeHashes.landingPage,
      PageUIDHashes.document_page,
      { lang: locale },
    )
  }

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
          page,
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
        page,
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
        page,
      },
    }
  }
  if (!documentType) {
    return {
      props: {
        country,
        document: null,
        extraPath,
        page,
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
        page,
      },
    }
  } catch (e) {
    return {
      props: {
        country: null,
        document: null,
        extraPath: null,
        page,
      },
    }
  }
}
