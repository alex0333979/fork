import { NextPage } from 'next'
import { AppLayout } from '@/components/index'
import React from 'react'
import ContactUs from '@/components/contactUs'
import { NextSeo } from 'next-seo'
import { SEO } from '../../constants'

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

export default ContactUsPage
