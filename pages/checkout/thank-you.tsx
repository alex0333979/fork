/* eslint-disable max-len */
import { NextPage } from 'next'
import Head from 'next/head'
import { useCookies } from 'react-cookie'
import { AppLayout } from '@/components/index'
import React from 'react'
import { NextSeo } from 'next-seo'
import { useAuth } from '@/lib/auth'
import { SEO } from '../../constants'
import ThankYou from '@/components/checkout/thank-you'
import { useOrderSkusQuery } from '@/generated/graphql'
import { TEMP_ORDER_NUM } from '@/lib/apolloClient'

const ThankYouPage: NextPage = () => {
  const [cookie, , removeCookie] = useCookies([TEMP_ORDER_NUM])

  const { data } = useOrderSkusQuery({
    variables: {
      orderNumber: +(cookie[TEMP_ORDER_NUM] || 0),
    },
    skip: isNaN(+cookie[TEMP_ORDER_NUM]),
    onCompleted: () => {
      removeCookie(TEMP_ORDER_NUM)
    },
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
        {data?.OrderByOrderNumber?.data?.skus?.length && (
          <script
            id="microsoft-ads-bing"
            dangerouslySetInnerHTML={{
              __html: `window.uetq = window.uetq || [];
            ${data.OrderByOrderNumber.data.skus?.map(
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
