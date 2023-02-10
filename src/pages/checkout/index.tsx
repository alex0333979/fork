import React from 'react'
import type { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { ApolloQueryResult } from '@apollo/client'
import { SliceZone } from '@prismicio/react'

import { components } from 'slices'
import { initializeApollo } from '@/apollo/client'
import { createClient } from 'prismicio'
import { CartDocument, CartQuery } from '@/apollo'
import { AppLayout } from '@/components'
import { PAGES, SEO } from '@/constants'
import { PageTypeHashes } from '@/constants/PageUIDHashes'
import { CheckoutProps } from './delivery-method'

const DeliveryMethodPage: NextPage<CheckoutProps> = ({ page }) => {
  const delieverSlice = page.data.slices.filter(
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

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  try {
    const client = initializeApollo(null, context)

    const previewData = context.params?.previewData
    const prismicClient = createClient({ previewData })
    const page = await prismicClient.getSingle(PageTypeHashes.checkout_page)
    const result: ApolloQueryResult<CartQuery> = await client.query({
      query: CartDocument,
    })
    const cart = result.data.Cart.data

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
