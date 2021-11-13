import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';
import { AppLayout } from '../components';
const Home = dynamic(() => import('@/components/home'), { ssr: false });

const HomePage: NextPage = () => (
  <AppLayout>
    <Home />
  </AppLayout>
);

export default HomePage;
