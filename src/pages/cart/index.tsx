import React from 'react'
import { NextPage, GetServerSideProps, GetServerSidePropsContext } from 'next'
import { NextSeo } from 'next-seo'
import { ApolloQueryResult } from '@apollo/client'
import { PrismicDocument } from '@prismicio/types'

import ShoppingCart from '@/modules/cart'
import { createClient } from 'prismicio'
import { AppLayout } from '@/components/index'
import { initializeApollo } from '@/apollo/client'
import { Cart, CartDocument, CartQuery } from '@/apollo'
import { PAGES, SEO } from '@/constants'
import { PageTypeHashes } from '@/constants/PageUIDHashes'
import { withLocale } from '@/hocs'

export interface CartPageProps {
  cart: Cart | null
  locale?: string
  page?: PrismicDocument<Record<string, any>, string, string>
}

const CartPage: NextPage<CartPageProps> = ({ cart, page }) => (
  <>
    <NextSeo
      title={SEO.shoppingCart.title}
      description={SEO.shoppingCart.description}
    />
    <AppLayout showNav={false}>
      <ShoppingCart cart={cart} page={page} />
    </AppLayout>
  </>
)

export const getServerSideProps: GetServerSideProps<CartPageProps> = async (
  context: GetServerSidePropsContext,
) => {
  try {
    const client = initializeApollo(null, context)

    const result: ApolloQueryResult<CartQuery> = await client.query({
      query: CartDocument,
    })

    const cart = result.data?.Cart.data || null
    const previewData = context.previewData
    const locale = context?.locale as string
    const prismicClient = createClient({ previewData })
    const page = await prismicClient.getSingle(PageTypeHashes.checkout_page, {
      lang: locale,
    })
    return {
      props: {
        cart,
        page,
      },
    }
  } catch (e) {
    return {
      redirect: {
        destination: PAGES.home,
        permanent: false,
      },
    }
  }
}

export default withLocale(CartPage)
