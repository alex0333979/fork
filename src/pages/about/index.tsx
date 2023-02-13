import React from 'react'
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import { PrismicDocument } from '@prismicio/types'
import { NextSeo } from 'next-seo'

import { AppLayout } from '@/components/index'
import About from '@/modules/about'
import { SEO } from '@/constants'
import { createClient } from 'prismicio'
import { PageTypeHashes, PageUIDHashes } from '@/constants/PageUIDHashes'

export interface AboutProps {
  page?: PrismicDocument<Record<string, any>, string, string>
}

const AboutPage: NextPage<AboutProps> = ({ page }) => (
  <>
    <NextSeo title={SEO.about.title} description={SEO.about.description} />
    <AppLayout>
      <About page={page} />
    </AppLayout>
  </>
)

export const getServerSideProps: GetServerSideProps<AboutProps> = async (
  context: GetServerSidePropsContext,
) => {
  const previewData = context.params?.previewData

  const client = createClient({ previewData })
  const page = await client.getByUID(
    PageTypeHashes.about_page,
    PageUIDHashes.aboutPage,
  )

  return {
    props: {
      page,
    },
  }
}

export default AboutPage
