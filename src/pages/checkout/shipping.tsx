import React from 'react'
import type { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { ApolloQueryResult } from '@apollo/client'
import { SliceZone } from '@prismicio/react'

import { initializeApollo } from '@/apollo/client'
import { CartDocument, CartQuery } from '@/apollo'

import { components } from 'slices'
import { AppLayout } from '@/components'
import { createClient } from 'prismicio'
import { PAGES, SEO } from '@/constants'
import { PageTypeHashes } from '@/constants/PageUIDHashes'
import { withLocale } from '@/hocs'
import { CheckoutProps } from './delivery-method'

const ShippingPage: NextPage<CheckoutProps> = ({ page }) => {
  const shippingSlice = page?.data.slices.filter(
    (item: any) => item.slice_type === 'shipping_information',
  )

  return (
    <>
      <NextSeo
        title={SEO.checkout.title}
        description={SEO.checkout.description}
      />
      <AppLayout showNav={false}>
        <SliceZone slices={shippingSlice} components={components} />
      </AppLayout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  try {
    const client = initializeApollo(null, context)
    const previewData = context.previewData
    const prismicClient = createClient({ previewData })
    const locale = context?.locale as string
    const page = await prismicClient.getSingle(PageTypeHashes.checkoutPage, {
      lang: locale,
    })

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

export default withLocale(ShippingPage)
