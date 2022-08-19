import React from 'react'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'

import { AppLayout } from '@/components/index'
import Terms from '@/modules/terms'
import { SEO } from '@/constants'

const TermsPage: NextPage = () => (
  <>
    <NextSeo title={SEO.terms.title} description={SEO.terms.description} />
    <AppLayout>
      <Terms />
    </AppLayout>
  </>
)


export const getServerSideProps = async () => ({
  props: {}
})

export default TermsPage
