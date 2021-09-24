import type { NextPage } from 'next';
import React from 'react';
import { AppLayout } from '../components';
import MainIntro from '@/components/home/mainIntro';
import WorkingProcess from '@/components/home/workingProcess';
import FaqForm from '@/components/home/faqForm';
import FaqSection from '@/components/home/faqSection';
import ReviewsPlatform from '@/components/home/reviewsPlatform';

const Home: NextPage = () => (
  <AppLayout>
    <MainIntro />
    <WorkingProcess />
    <ReviewsPlatform />
    <FaqSection />
    <FaqForm />
  </AppLayout>
);

export default Home;
