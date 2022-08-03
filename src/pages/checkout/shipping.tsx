import type { NextPage } from 'next'
import React from 'react'
import { AppLayout } from '@/components'
import ShippingInformation from '@/components/checkout/shippingInformation'
import { NextSeo } from 'next-seo'
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
