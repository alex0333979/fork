import React from 'react'
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { PrismicDocument } from '@prismicio/types'

import { PageTypeHashes, PageUIDHashes } from '@/constants/PageUIDHashes'
import { AppLayout } from '@/components'
import ContactUs from '@/modules/contactUs'
import { SEO } from '@/constants'

import { createClient } from '../../../prismicio'

export interface ContactUsPageProps {
  page?: PrismicDocument<Record<string, any>, string, string>
}

const ContactUsPage: NextPage<ContactUsPageProps> = ({ page }) => (
  <>
    <NextSeo
      title={SEO.contactUs.title}
      description={SEO.contactUs.description}
    />
    <AppLayout>
      <ContactUs page={page} />
    </AppLayout>
  </>
)

export default ContactUsPage

export const getServerSideProps: GetServerSideProps<
  ContactUsPageProps
> = async (context: GetServerSidePropsContext) => {
  const previewData = context.params?.previewData

  const client = createClient({ previewData })
  const page = await client.getByUID(
    PageTypeHashes.contactUs,
    PageUIDHashes.contactusPage,
  )

  return {
    props: {
      page,
    },
  }
}
