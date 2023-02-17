/* eslint-disable max-len */
import React, { useEffect, useState } from 'react'
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from 'next'
import Head from 'next/head'
import { NextSeo } from 'next-seo'
import { useCookies } from 'react-cookie'
import { createClient } from 'prismicio'

import { AppLayout } from '@/components'
import Home from '@/modules/home'
import { HomepageContent } from '@/modules/home/constant'
import { SEO, TEMP_ORDER_NUM } from '@/constants'
import { useCurrency } from '@/hooks'
import { useOrderSkusLazyQuery } from '@/apollo'
import OneClick from '@/modules/oneClick'
import { PhotoProps } from 'slices/proceed_to_checkout'
import { PageTypeHashes, PageUIDHashes } from '@/constants/PageUIDHashes'
import { withLocale } from '@/hocks'

const OneClickHomePage: NextPage<PhotoProps> = ({ page }) => {
  const [cookie, , removeCookie] = useCookies([TEMP_ORDER_NUM])
  const { currentCurrency } = useCurrency()
  const [skus, setSkus] = useState<string[]>([])
  const [startOneClick, setStartOneClick] = useState<boolean>(false)

  const [fetchSkus] = useOrderSkusLazyQuery({
    onCompleted: (res) => {
      setSkus(res.OrderByOrderNumber.data?.skus || [])
      removeCookie(TEMP_ORDER_NUM)
    },
  })

  useEffect(() => {
    if (!isNaN(+cookie[TEMP_ORDER_NUM]) && +cookie[TEMP_ORDER_NUM] !== 0) {
      fetchSkus({
        variables: {
          orderNumber: +(cookie[TEMP_ORDER_NUM] || 0),
        },
      })
    }
  }, [cookie, fetchSkus])

  return (
    <>
      <NextSeo
        title={HomepageContent.default.title}
        description={SEO.home.description}
      />
      {skus.length > 0 && (
        <Head>
          <script
            id="microsoft-ads-bing"
            dangerouslySetInnerHTML={{
              __html: `window.uetq = window.uetq || [];
            ${skus.map(
              (sku: string) =>
                `window.uetq.push('event', 'PRODUCT_PURCHASE', {"ecomm_prodid":"${sku}","ecomm_pagetype":"PURCHASE","revenue_value":1,"currency":"${currentCurrency.symbol}"});`,
            )}`,
            }}
          />
        </Head>
      )}
      <AppLayout>
        <Home
          country={null}
          document={null}
          page={page}
          onStart={() => setStartOneClick(true)}
        />
      </AppLayout>
      <OneClick
        open={startOneClick}
        onClose={() => setStartOneClick(false)}
        page={page}
      />
    </>
  )
}

export default withLocale(OneClickHomePage)

export const getServerSideProps: GetServerSideProps<PhotoProps> = async (
  context: GetServerSidePropsContext,
) => {
  const previewData = context.params?.previewData
  const client = createClient({ previewData })
  const locale = context?.locale as string
  const page = await client.getByUID(
    PageTypeHashes.landingPage,
    PageUIDHashes.homepage,
    { lang: locale },
  )

  return {
    props: {
      page,
    },
  }
}
