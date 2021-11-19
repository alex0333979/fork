import { NextPage } from 'next';
import { AppLayout } from '@/components/index';
import React from 'react';
import Terms from '@/components/terms';

const TermsPage: NextPage = () => (
  <AppLayout>
    <Terms />
  </AppLayout>
);

export default TermsPage;
