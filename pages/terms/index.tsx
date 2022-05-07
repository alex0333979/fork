import { NextPage } from 'next'
import { AppLayout } from '@/components/index'
import React from 'react'
import Terms from '@/components/terms'
import { NextSeo } from 'next-seo'
import { SEO } from '../../constants'

const TermsPage: NextPage = () => (
  <>
    <NextSeo title={SEO.terms.title} description={SEO.terms.description} />
    <AppLayout>
      <Terms />
    </AppLayout>
  </>
)

export default TermsPage
