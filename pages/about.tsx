import { NextPage } from 'next';
import { AppLayout } from '@/components/index';
import React from 'react';
import About from '@/components/about';

const AboutPage: NextPage = () => (
  <AppLayout>
    <About />
  </AppLayout>
);

export default AboutPage;
