import React from 'react'
import type { NextPage } from 'next'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { NextSeo } from 'next-seo'
import { ApolloQueryResult } from '@apollo/client'
import { SliceZone } from '@prismicio/react'

import { components } from 'slices'
import { createClient } from 'prismicio'
import { AppLayout } from '@/components'
import { initializeApollo } from '@/apollo/client'
import { CartDocument, CartQuery, ShippingType } from '@/apollo'
import { PAGES, SEO } from '@/constants'
import { PageTypeHashes } from '@/constants/PageUIDHashes'
import { withLocale } from '@/hocs'
import { CheckoutProps } from './delivery-method'

const PaymentInfoPage: NextPage<CheckoutProps> = ({ page }) => {
  const paymentInfoSlice = page?.data.slices.filter(
    (item: any) => item.slice_type === 'payment_information',
  )

  return (
    <>
      <NextSeo
        title={SEO.checkout.title}
        description={SEO.checkout.description}
      />
      <AppLayout showNav={false}>
        <SliceZone slices={paymentInfoSlice} components={components} />
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

export default withLocale(PaymentInfoPage)
