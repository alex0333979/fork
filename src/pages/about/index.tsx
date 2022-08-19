import React from 'react'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'

import { AppLayout } from '@/components/index'
import About from '@/modules/about'
import { SEO } from '@/constants'

const AboutPage: NextPage = () => (
  <>
    <NextSeo 
      title={SEO.about.title} 
      description={SEO.about.description} />
    <AppLayout>
      <About />
    </AppLayout>
  </>
)

export const getServerSideProps = async () => ({
  props: {}
})

export default AboutPage
