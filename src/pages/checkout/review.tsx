import React from 'react'
import type { NextPage } from 'next'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { NextSeo } from 'next-seo'
import { ApolloQueryResult } from '@apollo/client'
import { Elements } from '@stripe/react-stripe-js'
import { SliceZone } from '@prismicio/react'

import { components } from 'slices'
import { createClient } from 'prismicio'
import { AppLayout } from '@/components'
import { getStripe } from '@/utils'
import { initializeApollo } from '@/apollo/client'
import { CartDocument, CartQuery, ShippingType } from '@/apollo'
import { PAGES, SEO } from '@/constants'
import { PageTypeHashes } from '@/constants/PageUIDHashes'
import { CheckoutProps } from './delivery-method'
import { withLocale } from '@/hocks'

const ReviewAndPayPage: NextPage<CheckoutProps> = ({ page }) => {
  const reviewAndPaySlice = page.data.slices.filter(
    (item: any) => item.slice_type === 'review_and_pay',
  )

  return (
    <>
      <NextSeo
        title={SEO.checkout.title}
        description={SEO.checkout.description}
      />
      <AppLayout showNav={false}>
        <Elements stripe={getStripe()}>
          <SliceZone slices={reviewAndPaySlice} components={components} />
        </Elements>
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
    const locale = context?.locale as string
    const page = await prismicClient.getSingle(PageTypeHashes.checkout_page, {
      lang: locale,
    })

    const result: ApolloQueryResult<CartQuery> = await client.query({
      query: CartDocument,
    })
    const cart = result.data.Cart.data

    if (cart?.items?.some((i) => i.isComplete)) {
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

export default withLocale(ReviewAndPayPage)
