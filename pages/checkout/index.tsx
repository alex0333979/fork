import type { NextPage } from 'next'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import React from 'react'
import { AppLayout } from '../../components'
import DeliveryMethod from '@/components/checkout/deliveryMethod'
import { initializeApollo } from '@/lib/apolloClient'
import { ApolloQueryResult } from '@apollo/client'
import { CartDocument, CartQuery } from '@/generated/graphql'
import { PAGES, SEO } from '../../constants'
import { NextSeo } from 'next-seo'

const CheckoutPage: NextPage = () => (
  <>
    <NextSeo
      title={SEO.checkout.title}
      description={SEO.checkout.description}
    />
    <AppLayout>
      <DeliveryMethod />
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

export default CheckoutPage
