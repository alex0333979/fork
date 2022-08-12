import React from 'react'
import type { NextPage } from 'next'
import { NextSeo } from 'next-seo'

import { AppLayout } from '@/components'
import Home from '@/modules/home'
import { HomepageContent } from '@/modules/home/constant'
import { SEO } from '@/constants'
import OneClick from '@/modules/oneClick'

const OneClickHomePage: NextPage = () => (
  <>
    <NextSeo
      title={HomepageContent.default.title}
      description={SEO.home.description}
    />
    <AppLayout>
      <Home
        country={null}
        document={null}
        extraPath={null}
        title={HomepageContent.default.title}
        description={HomepageContent.default.description}
        buttonTitle="Choose document"
      />
    </AppLayout>
    <OneClick />
  </>
)

export default OneClickHomePage
