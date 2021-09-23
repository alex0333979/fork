import type { NextPage } from 'next';
import React from 'react';
import { AppLayout } from '../components';
import MainIntro from '@/components/home/mainIntro';
import WorkingProcess from '@/components/home/workingProcess';

const Home: NextPage = () => (
  <AppLayout>
    <MainIntro />
    <WorkingProcess />
  </AppLayout>
);

export default Home;
