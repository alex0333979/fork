import React from 'react'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'

import { AppLayout } from '@/components'
import ContactUs from '@/modules/contactUs'
import { SEO } from '@/constants'

const ContactUsPage: NextPage = () => (
  <>
    <NextSeo
      title={SEO.contactUs.title}
      description={SEO.contactUs.description}
    />
    <AppLayout>
      <ContactUs />
    </AppLayout>
  </>
)

export const getServerSideProps = async () => ({
  props: {}
})

export default ContactUsPage
