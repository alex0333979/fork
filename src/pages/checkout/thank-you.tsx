/* eslint-disable max-len */
import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { NextSeo } from 'next-seo'
import { useCookies } from 'react-cookie'

import { useCurrency } from '@/hooks'
import { AppLayout } from '@/components/index'
import ThankYou from '@/modules/checkout/thank-you'
import { useOrderSkusQuery } from '@/apollo'
import { SEO, TEMP_ORDER_NUM } from '@/constants'

const ThankYouPage: NextPage = () => {
  const [cookie, , removeCookie] = useCookies([TEMP_ORDER_NUM])
  const { currentCurrency } = useCurrency()

  const { data } = useOrderSkusQuery({
    variables: {
      orderNumber: +(cookie[TEMP_ORDER_NUM] || 0),
    },
    skip: isNaN(+cookie[TEMP_ORDER_NUM]) || +cookie[TEMP_ORDER_NUM] === 0,
    onCompleted: () => {
      removeCookie(TEMP_ORDER_NUM)
    },
  })

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
                `window.uetq.push('event', 'PRODUCT_PURCHASE', {"ecomm_prodid":"${sku}","ecomm_pagetype":"PURCHASE","revenue_value":1,"currency":"${currentCurrency.symbol}"});`,
            )}`,
            }}
          />
        )}
      </Head>
      <AppLayout showNav={false}>
        <ThankYou />
      </AppLayout>
    </>
  )
}

export default ThankYouPage
