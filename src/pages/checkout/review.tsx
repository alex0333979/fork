import type { NextPage } from 'next'
import React from 'react'
import { AppLayout } from '@/components'
import ReviewAndPay from '@/components/checkout/review'
import { Elements } from '@stripe/react-stripe-js'
import { getStripe } from '@/utils'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { initializeApollo } from '@/apollo/client'
import { ApolloQueryResult } from '@apollo/client'
import { CartDocument, CartQuery, ShippingType } from '@/apollo'
import { PAGES, SEO } from '@/constants'
import { NextSeo } from 'next-seo'

const ReviewAndPayPage: NextPage = () => (
  <>
    <NextSeo
      title={SEO.checkout.title}
      description={SEO.checkout.description}
    />
    <AppLayout>
      <Elements stripe={getStripe()}>
        <ReviewAndPay />
      </Elements>
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
      if (
        cart?.shippingType !== ShippingType.NoShipping &&
        !cart?.shippingAddress
      ) {
        return {
          redirect: {
            destination: PAGES.checkout.shipping,
            permanent: false,
          },
        }
      } else if (!cart?.billingAddress) {
        return {
          redirect: {
            destination: PAGES.checkout.payment,
            permanent: false,
          },
        }
      }
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

export default ReviewAndPayPage
