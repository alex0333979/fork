import React from 'react'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { NextSeo } from 'next-seo'

import { AppLayout } from '@/components'
import { SEO } from '@/constants'
const ContactUs = dynamic(() => import('@/modules/contactUs'))

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
