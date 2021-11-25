import type { NextPage } from 'next';
import React from 'react';
import { AppLayout } from '../components';
import { NextSeo } from 'next-seo';
import { SEO } from '../constants';
import Home from '@/components/home';

const HomePage: NextPage = () => (
  <>
    <NextSeo title={SEO.home.title} description={SEO.home.description} />
    <AppLayout>
      <Home />
    </AppLayout>
  </>
);

export default HomePage;
