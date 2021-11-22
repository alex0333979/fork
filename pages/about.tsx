import { NextPage } from 'next';
import { AppLayout } from '@/components/index';
import React from 'react';
import About from '@/components/about';
import { NextSeo } from 'next-seo';
import { SEO } from '../constants';

const AboutPage: NextPage = () => (
  <>
    <NextSeo title={SEO.about.title} description={SEO.about.description} />
    <AppLayout>
      <About />
    </AppLayout>
  </>
);

export default AboutPage;
