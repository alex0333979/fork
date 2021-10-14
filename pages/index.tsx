import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';
import { AppLayout } from '../components';
import MainIntro from '@/components/home/mainIntro';
import WorkingProcess from '@/components/home/workingProcess';
import FaqForm from '@/components/home/faqForm';
import FaqSection from '@/components/home/faqSection';
const ReviewsPlatform = dynamic(() => import('@/components/home/reviewsPlatform'), { ssr: false });

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
