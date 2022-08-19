import React from 'react'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'

import { AppLayout } from '@/components/index'
import ShippingPolicy from '@/modules/shippingPolicy'
import { SEO } from '@/constants'

const ShippingPolicyPage: NextPage = () => (
  <>
    <NextSeo
      title={SEO.shippingPolicy.title}
      description={SEO.shippingPolicy.description}
    />
    <AppLayout>
      <ShippingPolicy />
    </AppLayout>
  </>
)

export const getServerSideProps = async () => ({
  props: {}
})

export default ShippingPolicyPage
