import React from 'react'
import type { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { ApolloQueryResult } from '@apollo/client'
import { PrismicDocument } from '@prismicio/types'
import { SliceZone } from '@prismicio/react'

import { createClient } from 'prismicio'
import { components } from 'slices'
import { initializeApollo } from '@/apollo/client'
import { CartDocument, CartQuery } from '@/apollo'
import { AppLayout } from '@/components'
import { PAGES, SEO } from '@/constants'
import { PageTypeHashes } from '@/constants/PageUIDHashes'
import { withLocale } from '@/hocs'

export interface CheckoutProps {
  locale?: string
  page?: PrismicDocument<Record<string, any>, string, string>
}

export interface CheckoutSlice {
  slice: any
}

const DeliveryMethodPage: NextPage<CheckoutProps> = ({ page }) => {
  const delieverSlice = page?.data.slices.filter(
    (item: any) => item.slice_type === 'delivery_method',
  )

  return (
    <>
      <NextSeo
        title={SEO.checkout.title}
        description={SEO.checkout.description}
      />
      <AppLayout showNav={false}>
        <SliceZone slices={delieverSlice} components={components} />
      </AppLayout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<CheckoutProps> = async (
  context: GetServerSidePropsContext,
) => {
  try {
    const client = initializeApollo(null, context)
    const locale = context?.locale as string

    const result: ApolloQueryResult<CartQuery> = await client.query({
      query: CartDocument,
    })
    const cart = result.data.Cart.data

    const previewData = context.previewData
    const prismicClient = createClient({ previewData })
    const page = await prismicClient.getSingle(PageTypeHashes.checkout_page, {
      lang: locale,
    })

    if (cart?.items?.filter((i) => i.isComplete).length ?? 0 > 0) {
      return {
        props: {
          page,
        },
      }
    } else {
      return {
        redirect: {
          destination: PAGES.cart,
          permanent: false,
        },
      }
    }
  } catch (e) {
    return {
      redirect: {
        destination: PAGES.cart,
        permanent: false,
      },
    }
  }
}

export default withLocale(DeliveryMethodPage)
