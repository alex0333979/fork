/* eslint-disable max-len */
import { NextPage } from 'next'
import Head from 'next/head'
import { AppLayout } from '@/components/index'
import React from 'react'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useAuth } from '@/lib/auth'
import { SEO } from '../../constants'
import ThankYou from '@/components/checkout/thank-you'
import { useOrderSkusByOrderNumberQuery } from '@/generated/graphql'

const ThankYouPage: NextPage = () => {
  const router = useRouter()
  const { n } = router.query

  const { data } = useOrderSkusByOrderNumberQuery({
    variables: {
      orderNumber: +(n || 0),
    },
    skip: !n || isNaN(+n),
  })

  const {
    currency: { currency },
  } = useAuth()

  return (
    <>
      <NextSeo
        title={SEO.thankYou.title}
        description={SEO.thankYou.description}
      />
      <Head>
        {data?.OrderSkusByOrderNumber?.data?.length && (
          <script
            id="microsoft-ads-bing"
            dangerouslySetInnerHTML={{
              __html: `window.uetq = window.uetq || [];
            ${data?.OrderSkusByOrderNumber?.data?.map(
              (sku: string) =>
                `window.uetq.push('event', 'PRODUCT_PURCHASE', {"ecomm_prodid":"${sku}","ecomm_pagetype":"PURCHASE","revenue_value":1,"currency":"${currency}"});`,
            )}`,
            }}
          />
        )}
      </Head>
      <AppLayout>
        <ThankYou />
      </AppLayout>
    </>
  )
}

export default ThankYouPage
