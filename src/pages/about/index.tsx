import React from 'react'
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import { PrismicDocument } from '@prismicio/types'
import { NextSeo } from 'next-seo'

import { AppLayout } from '@/components/index'
import About from '@/modules/about'
import { SEO } from '@/constants'
import { createClient } from 'prismicio'
import { PageTypeHashes, PageUIDHashes } from '@/constants/PageUIDHashes'
import { withLocale } from '@/hocks'

export interface AboutProps {
  locale?: string
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
  const locale = context?.locale as string

  const client = createClient({ previewData })
  const page = await client.getByUID(
    PageTypeHashes.about_page,
    PageUIDHashes.aboutPage,
    { lang: locale },
  )

  return {
    props: {
      page,
    },
  }
}

export default withLocale(AboutPage)
