import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';
import { AppLayout } from '../components';
import { NextSeo } from 'next-seo';
import { SEO } from '../constants';

const Home = dynamic(() => import('@/components/home'), { ssr: false });

const HomePage: NextPage = () => (
  <>
    <NextSeo title={SEO.home.title} description={SEO.home.description} />
    <AppLayout>
      <Home />
    </AppLayout>
  </>
);

export default HomePage;
