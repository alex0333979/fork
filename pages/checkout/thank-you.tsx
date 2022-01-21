import { NextPage } from 'next';
import { AppLayout } from '@/components/index';
import React from 'react';
import { NextSeo } from 'next-seo';
import { SEO } from '../../constants';
import ThankYou from '@/components/checkout/thank-you';

const ThankYouPage: NextPage = () => (
  <>
    <NextSeo title={SEO.thankYou.title} description={SEO.thankYou.description} />
    <AppLayout>
      <ThankYou />
    </AppLayout>
  </>
);

export default ThankYouPage;
