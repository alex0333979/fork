import React from 'react'
import type { NextPage } from 'next'
import { NextSeo } from 'next-seo'

import { AppLayout } from '@/components'
import ShippingInformation from '@/modules/checkout/shippingInformation'
import { SEO } from '@/constants'

const ShippingPage: NextPage = () => (
  <>
    <NextSeo
      title={SEO.checkout.title}
      description={SEO.checkout.description}
    />
    <AppLayout>
      <ShippingInformation />
    </AppLayout>
  </>
)

export { getServerSideProps } from './index'

export default ShippingPage
