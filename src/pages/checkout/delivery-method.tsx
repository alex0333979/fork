import React from 'react'
import type { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { ApolloQueryResult } from '@apollo/client'
import { PrismicDocument } from '@prismicio/types'

import { createClient } from 'prismicio'
import { initializeApollo } from '@/apollo/client'
import { CartDocument, CartQuery } from '@/apollo'
import { AppLayout } from '@/components'
import DeliveryMethod from '@/modules/checkout/deliveryMethod'
import { PAGES, SEO } from '@/constants'
import { PageTypeHashes } from '@/constants/PageUIDHashes'

export interface CheckoutProps {
  page: PrismicDocument<Record<string, any>, string, string>
}

export interface CheckoutSlice {
  slice: any
}

const DeliveryMethodPage: NextPage<CheckoutProps> = ({ page }) => (
  <>
    <NextSeo
      title={SEO.checkout.title}
      description={SEO.checkout.description}
    />
    <AppLayout showNav={false}>
      <DeliveryMethod page={page} />
    </AppLayout>
  </>
)

export const getServerSideProps: GetServerSideProps<CheckoutProps> = async (
  context: GetServerSidePropsContext,
) => {
  try {
    const client = initializeApollo(null, context)

    const result: ApolloQueryResult<CartQuery> = await client.query({
      query: CartDocument,
    })
    const cart = result.data.Cart.data

    const previewData = context.params?.previewData
    const prismicClient = createClient({ previewData })
    const page = await prismicClient.getSingle(PageTypeHashes.process_page)

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

export default DeliveryMethodPage
