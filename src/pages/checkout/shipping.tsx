import React from 'react'
import type { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { ApolloQueryResult } from '@apollo/client'

import { initializeApollo } from '@/apollo/client'
import { CartDocument, CartQuery } from '@/apollo'

import { AppLayout } from '@/components'
import ShippingInformation from '@/modules/checkout/shippingInformation'
import { PAGES, SEO } from '@/constants'

const ShippingPage: NextPage = () => (
  <>
    <NextSeo
      title={SEO.checkout.title}
      description={SEO.checkout.description}
    />
    <AppLayout showNav={false}>
      <ShippingInformation />
    </AppLayout>
  </>
)

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  try {
    const client = initializeApollo(null, context)

    const result: ApolloQueryResult<CartQuery> = await client.query({
      query: CartDocument,
    })
    const cart = result.data.Cart.data

    if (cart?.items?.filter((i) => i.isComplete).length ?? 0 > 0) {
      return {
        props: {},
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

export default ShippingPage
