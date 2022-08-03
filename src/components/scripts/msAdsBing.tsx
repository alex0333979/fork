/* eslint-disable max-len */
import React from 'react'

const MicrosoftAdsBingScript: React.FC<{
  currency?: string
  skus?: string[] | null
}> = ({ currency, skus }) => {
  if (!skus?.length) return null

  return (
    <>
      <script
        id="microsoft-ads-bing"
        dangerouslySetInnerHTML={{
          __html: `window.uetq = window.uetq || [];
              ${skus?.map(
                (sku: string) =>
                  `window.uetq.push('event', 'PRODUCT_PURCHASE', {"ecomm_prodid":"${sku}","ecomm_pagetype":"PURCHASE","revenue_value":1,"currency":"${currency}"});`,
              )}`,
        }}
      />
    </>
  )
}

export default MicrosoftAdsBingScript
